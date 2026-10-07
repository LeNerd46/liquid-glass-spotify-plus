import type { LibraryItem } from 'spotifyplus';

export const palette = { text: '#ffffff', secondary: '#d0ccdc', muted: '#a9a4bc', accent: '#88edb1', error: '#ffd3ce' };
export const describeError = (error: unknown) => error instanceof Error ? error.message : String(error);
export const itemKind = (uri: string) => uri.split(':')[1] || 'collection';
export function artworkUrl(input?: string): string {
    if (!input) return '';
    if (/^spotify:image:[a-f\d]{40}$/i.test(input)) return `https://i.scdn.co/image/${input.slice(14)}`;
    return input.startsWith('https://') ? input : '';
}
export function timeLabel(ms: number): string {
    const seconds = Math.floor(Math.max(0, Number.isFinite(ms) ? ms : 0) / 1000);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
export function uniqueItems(items: LibraryItem[]): LibraryItem[] {
    return [...new Map(items.map(item => [item.uri, item])).values()];
}
export function filterCollection(items: LibraryItem[], query: string, sort: 'recent' | 'name'): LibraryItem[] {
    const filtered = items.filter(item => item.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
    return sort === 'name' ? [...filtered].sort((a, b) => a.name.localeCompare(b.name)) : filtered;
}
export const screenTargets = ['home.page', 'search.page', 'library.page', 'nowPlaying.page', 'miniPlayer.root',
    'album.page', 'playlist.page', 'artist.page', 'artist.discography.page', 'navigation.drawer', 'contextMenu.root'] as const;
