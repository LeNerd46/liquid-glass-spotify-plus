import type { PlaybackState, SpotifyPlusApi } from 'spotifyplus';
import type { SpotifyTrack } from 'spotifyplus/entities';
import { describeError } from './model';

export interface PlaybackSnapshot {
    track?: SpotifyTrack;
    state?: PlaybackState;
    position: number;
    error: string;
}
/** One player request stream for all mounted pages; stale requests cannot revive an idle store. */
export function createPlaybackStore(api: Pick<SpotifyPlusApi, 'Player' | 'Events'>) {
    let snapshot: PlaybackSnapshot = { position: 0, error: '' };
    const listeners = new Set<() => void>();
    let timer: ReturnType<typeof setInterval> | undefined;
    let session = 0, inFlight = false, pending = false;
    let anchorPosition = 0, anchorTime = 0;
    const publish = (next: PlaybackSnapshot) => { snapshot = next; listeners.forEach(listener => listener()); };
    const refresh = () => {
        if (!listeners.size) return;
        if (inFlight) { pending = true; return; }
        const generation = session;
        inFlight = true;
        try {
            const state = api.Player.getState();
            if (generation !== session || !listeners.size) return;
            const candidate = api.Player.getCurrentTrack();
            // Avoid showing the previous cover/title while Spotify is changing metadata.
            const track = state.trackUri && candidate?.uri === state.trackUri ? candidate : undefined;
            anchorPosition = Math.max(0, state.positionMs || 0); anchorTime = Date.now();
            publish({ state, track, position: anchorPosition, error: '' });
        } catch (error) {
            if (generation === session && listeners.size) publish({ ...snapshot, error: describeError(error) });
        } finally {
            inFlight = false;
            if (pending) { pending = false; void refresh(); }
        }
    };
    const events = ['songChanged', 'playPause', 'trackSeeked', 'shuffleChanged', 'repeatChanged'] as const;
    const onEvent = () => { void refresh(); };
    return {
        getSnapshot: () => snapshot,
        refresh,
        subscribe(listener: () => void) {
            listeners.add(listener);
            if (listeners.size === 1) {
                session++; events.forEach(event => api.Events.on(event, onEvent));
                void refresh();
                let ticks = 0;
                timer = setInterval(() => {
                    const estimated = anchorPosition + (snapshot.state?.isPlaying && !snapshot.state.isBuffering ? Date.now() - anchorTime : 0);
                    const duration = snapshot.track?.durationMs;
                    publish({ ...snapshot, position: duration ? Math.min(duration, estimated) : estimated });
                    if (++ticks % 3 === 0) void refresh();
                }, 500);
            }
            return () => {
                listeners.delete(listener);
                if (!listeners.size) {
                    session++; pending = false;
                    if (timer) clearInterval(timer);
                    events.forEach(event => api.Events.off(event, onEvent));
                }
            };
        },
    };
}
