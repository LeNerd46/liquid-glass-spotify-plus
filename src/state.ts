import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { SpotifyPlus } from 'spotifyplus';
import { createPlaybackStore } from './playback-store';
import { describeError } from './model';

export const playback = createPlaybackStore(SpotifyPlus);
export const usePlayback = () => useSyncExternalStore(playback.subscribe, playback.getSnapshot);
let reduced = false;
const listeners = new Set<() => void>();
export const useReducedMotion = () => useSyncExternalStore(
    listener => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    () => reduced,
);
export function setReducedMotion(value: boolean) { reduced = value; listeners.forEach(listener => listener()); }
export function useActions() {
    const [error, setError] = useState(''), [pending, setPending] = useState(false);
    const busy = useRef(false), mounted = useRef(true);
    useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
    const act = async (action: () => unknown) => {
        if (busy.current) return;
        busy.current = true; setPending(true); setError('');
        try { await action(); await playback.refresh(); }
        catch (error) { if (mounted.current) setError(describeError(error)); }
        finally { busy.current = false; if (mounted.current) setPending(false); }
    };
    return { error, pending, act };
}
