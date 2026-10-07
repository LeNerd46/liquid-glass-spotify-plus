import type { SpotifyPlusApi } from 'spotifyplus';
import { artworkUrl } from './model';

export type DetailKind = 'album' | 'playlist' | 'artist' | 'discography';
export interface DetailRow {
    key: string; uri: string; title: string; subtitle: string; image: string; duration?: number; explicit?: boolean; index: number;
}
export interface DetailData {
    name: string; image: string; subtitle: string; description: string;
    rows: DetailRow[]; total: number; nextOffset: number; releases: string[]; featured?: DetailRow;
}
const pageSize = 30;
export function detailUri(kind: DetailKind, route: string | null): string | null {
    if (!route) return null;
    const legacyPlaylist = /^spotify:user:[^:]+:playlist:([A-Za-z0-9]+)$/.exec(route);
    if (kind === 'playlist' && legacyPlaylist) return `spotify:playlist:${legacyPlaylist[1]}`;
    if (kind === 'discography') return /^spotify:artist:([A-Za-z0-9]+)(?::(?:releases|albums|singles|compilations)(?::[^:]+)*)?$/.exec(route)?.[1] ? route.split(':').slice(0, 3).join(':') : null;
    return new RegExp(`^spotify:${kind}:[A-Za-z0-9]+$`).test(route) ? route : null;
}

/** Keep duplicate playlist occurrences and their original playback indices. */
export async function loadDetail(api: Pick<SpotifyPlusApi, 'Internal' | 'Playlists'>, kind: DetailKind, uri: string, offset = 0): Promise<DetailData> {
    const result: DetailData = { name: '', image: '', subtitle: '', description: '', rows: [], total: 0, nextOffset: offset, releases: [] };
    let entries: Array<{ uri: string; key: string; title?: string }> = [];
    if (kind === 'album') {
        const album = await api.Internal.getAlbum(uri);
        if (!album) throw new Error('This album is unavailable.');
        result.name = album.name; result.image = album.image;
        result.subtitle = [album.artists.map(artist => artist.name).join(', '), album.date.year || '', 'Album'].filter(Boolean).join(' · ');
        const tracks = album.discs.flatMap(disc => disc.tracks);
        result.total = tracks.length;
        entries = tracks.slice(offset, offset + pageSize).map((uri, index) => ({ uri, key: String(offset + index) }));
    } else if (kind === 'playlist') {
        // The paginated API resolves artwork; playlist-v2 pictures are opaque encoded IDs.
        const [playlist, metadata] = await Promise.all([api.Playlists.get(uri, { offset, limit: pageSize }), api.Internal.getPlaylist(uri).catch(() => null)]);
        result.name = playlist.name; result.description = playlist.description;
        result.image = artworkUrl(playlist.imageUri) || artworkUrl(metadata?.picture);
        result.subtitle = [metadata?.ownerUsername, `${playlist.total} songs`, 'Playlist'].filter(Boolean).join(' · ');
        result.total = playlist.total;
        entries = playlist.items.map((item, index) => ({ uri: item.uri, key: `${offset + index}:${item.rowId}`, title: item.name }));
    } else {
        const artist = await api.Internal.getArtist(uri);
        if (!artist) throw new Error('This artist is unavailable.');
        result.name = artist.name; result.image = artist.image; result.subtitle = kind === 'discography' ? 'Discography' : 'Artist';
        result.releases = [...new Set([...artist.albums, ...artist.singles, ...artist.compilations, ...artist.appearsOn])];
        if (kind === 'artist' && result.releases.length) {
            try {
                const album = await api.Internal.getAlbum(artist.singles[0] || result.releases[0]);
                if (album) result.featured = { key: album.uri, uri: album.uri, title: album.name, image: album.image, index: 0,
                    subtitle: [album.date.year || '', album.type || 'Album', `${album.discs.reduce((count, disc) => count + disc.tracks.length, 0)} songs`].filter(Boolean).join(' · ') };
            } catch { /* A missing release never hides the artist's tracks. */ }
        }
        const tracks = artist.topTracks[0]?.tracks ?? [];
        const uris = kind === 'discography' ? result.releases : tracks;
        result.total = uris.length;
        entries = uris.slice(offset, offset + pageSize).map((uri, index) => ({ uri, key: String(offset + index) }));
    }
    result.nextOffset = offset + entries.length;
    if (!entries.length && offset < result.total) throw new Error('Spotify returned an empty page. Try again or open the original Spotify view.');
    const rows = new Array<DetailRow>(entries.length);
    let cursor = 0;
    await Promise.all(Array.from({ length: Math.min(3, entries.length) }, async () => {
        while (cursor < entries.length) {
            const index = cursor++, entry = entries[index];
            const row: DetailRow = { ...entry, title: entry.title || 'Unavailable item', subtitle: '', image: '', index: offset + index };
            try {
                if (kind === 'discography') {
                    const album = await api.Internal.getAlbum(entry.uri);
                    if (album) { row.title = album.name; row.subtitle = [album.date.year || '', album.type || 'Album'].filter(Boolean).join(' · '); row.image = album.image; }
                } else if (entry.uri.startsWith('spotify:track:')) {
                    const track = await api.Internal.getTrack(entry.uri);
                    if (track) { row.title = track.title; row.subtitle = kind === 'artist' ? track.album.title : track.artist; row.image = track.album.image; row.duration = track.durationMs; row.explicit = track.explicit; }
                }
            } catch { /* Preserve the row and playback position when one item lacks metadata. */ }
            rows[index] = row;
        }
    }));
    result.rows = rows;
    if (kind === 'playlist' && !result.image) result.image = rows.find(row => row.image)?.image || '';
    return result;
}
