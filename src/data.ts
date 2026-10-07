import { useEffect, useRef, useState } from 'react';
import { SpotifyPlus } from 'spotifyplus';
import type { LibraryItem } from 'spotifyplus';
import { describeError, uniqueItems } from './model';
import { createSearchArtwork, ResultItem } from './search-artwork';
const enrichArtwork = createSearchArtwork(SpotifyPlus);

export type CollectionType = 'all' | 'playlist' | 'album' | 'artist';
export function useCollection(type: CollectionType = 'all', limit = 40) {
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [revision, setRevision] = useState(0);
    const cursor = useRef(0), busy = useRef(false), generation = useRef(0);
    const request = async (reset: boolean, version: number) => {
        if (busy.current && !reset) return;
        busy.current = true; setLoading(true); setError('');
        try {
            const page = await SpotifyPlus.Library.list({ type, limit, offset: reset ? 0 : cursor.current });
            if (version !== generation.current) return;
            cursor.current = page.offset + page.items.length;
            setItems(previous => uniqueItems(reset ? page.items : [...previous, ...page.items]));
            setTotal(page.items.length ? page.total : cursor.current);
        } catch (error) { if (version === generation.current) setError(describeError(error)); }
        finally { if (version === generation.current) { busy.current = false; setLoading(false); } }
    };
    useEffect(() => {
        const version = ++generation.current;
        cursor.current = 0; setItems([]); setTotal(0);
        void request(true, version);
        return () => { generation.current++; busy.current = false; };
    }, [type, limit, revision]);
    return { items, total, error, loading, hasMore: cursor.current < total,
        loadMore: () => { void request(false, generation.current); }, retry: () => setRevision(value => value + 1) };
}

export function useSearch(query: string) {
    const [items, setItems] = useState<ResultItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [revision, setRevision] = useState(0);
    useEffect(() => {
        let live = true;
        setItems([]); setError('');
        const value = query.trim();
        if (!value) { setLoading(false); return; }
        setLoading(true);
        const timer = setTimeout(() => {
            SpotifyPlus.Search.search(value, { limit: 30 }).then(response => {
                if (!live) return;
                setItems(response.items); setLoading(false);
                void enrichArtwork(response.items, () => live, item => {
                    setItems(previous => previous.map(result => result.uri === item.uri ? { ...result, ...item } : result));
                });
            }).catch(error => { if (live) { setLoading(false); setError(describeError(error)); } });
        }, 320);
        return () => { live = false; clearTimeout(timer); };
    }, [query, revision]);
    return { items, loading, error, retry: () => setRevision(value => value + 1) };
}
