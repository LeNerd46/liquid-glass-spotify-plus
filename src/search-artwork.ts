import type { SearchResult, SpotifyPlusApi } from 'spotifyplus';
import { artworkUrl } from './model';

export interface ResultItem extends SearchResult { image?: string; subtitle?: string }
type Details = Pick<ResultItem, 'image' | 'subtitle'>;

/** Fetch every cover, with bounded work, deduplication and no stale-query updates. */
export function createSearchArtwork(api: Pick<SpotifyPlusApi, 'Internal'>) {
    const cache = new Map<string, Promise<Details>>();
    function details(uri: string): Promise<Details> {
        const cached = cache.get(uri);
        if (cached) { cache.delete(uri); cache.set(uri, cached); return cached; }
        const request = (async () => {
            const kind = uri.split(':')[1];
            let image = '', subtitle = '';
            if (kind === 'track') {
                const track = await api.Internal.getTrack(uri);
                image = artworkUrl(track?.album?.image); subtitle = track?.artist || '';
            } else if (kind === 'album') {
                const album = await api.Internal.getAlbum(uri);
                image = artworkUrl(album?.image) || artworkUrl(album?.images?.[0]?.url);
                subtitle = album?.artists.map(artist => artist.name).join(', ') || '';
            } else if (kind === 'artist') {
                const artist = await api.Internal.getArtist(uri);
                image = artworkUrl(artist?.image) || artworkUrl(artist?.images?.[0]?.url);
            } else if (kind === 'playlist') {
                // The API's encoded playlist picture is not a CDN URL.
                image = artworkUrl((await api.Internal.getPlaylist(uri))?.picture);
            }
            return { image, subtitle };
        })();
        cache.set(uri, request);
        if (cache.size > 180) cache.delete(cache.keys().next().value!);
        void request.then(value => { if (!value.image && cache.get(uri) === request) cache.delete(uri); }, () => {
            if (cache.get(uri) === request) cache.delete(uri);
        });
        return request;
    }
    return async (items: SearchResult[], active: () => boolean, publish: (item: ResultItem) => void) => {
        let cursor = 0;
        await Promise.all(Array.from({ length: Math.min(3, items.length) }, async () => {
            while (active() && cursor < items.length) {
                const item = items[cursor++];
                try { const extra = await details(item.uri); if (active()) publish({ ...item, ...extra }); }
                catch { /* One unavailable cover must not prevent the remaining results loading. */ }
            }
        }));
    };
}
