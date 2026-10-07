import React, { useEffect, useRef, useState } from 'react';
import { SpotifyPlus } from 'spotifyplus';
import type { ConnectDevice, UIComponentProps, QueueSnapshot } from 'spotifyplus';
import { View, ScrollView, Slider, createNativeComponent } from 'spotifyplus/react';
import { Artwork, Glass, Icon, IconButton, Label, Notice, Scene, openSpotify } from './components';
import { describeError, palette, timeLabel } from './model';
import { playback, usePlayback, useActions } from './state';

const Volume = createNativeComponent('LiquidGlassVolume');
export function MiniPlayer() {
    const { track, state, position, error } = usePlayback();
    const action = useActions();
    const fraction = track?.durationMs ? Math.min(1, position / track.durationMs) : 0;
    return <Scene compact height={76}>
        <Glass width="100%" height={76} radius={38} padding={7} tint={.12}>
            <View flexDirection="row" alignItems="center" flex={1}>
                <View flexDirection="row" alignItems="center" flex={1} onPress={() => openSpotify('spotify:now-playing')} accessibilityLabel={`Open Now Playing: ${track?.title || 'Nothing playing'}`}>
                    <Artwork source={track?.album?.image} width={54} height={54} radius={27} />
                    <View flex={1} marginLeft={12} marginRight={8}><Label fontSize={15} fontWeight="600" numberOfLines={1}>{track?.title || (state?.trackUri ? 'Loading track…' : 'Nothing playing')}</Label>
                        <Label fontSize={12} color={action.error || error ? palette.error : palette.secondary} numberOfLines={1} marginTop={4}>{action.error || error || track?.artist || 'Choose something you love'}</Label></View>
                </View>
                <IconButton name={state?.isPlaying ? 'pause' : 'play'} size={48} label={state?.isPlaying ? 'Pause' : 'Play'} disabled={action.pending || !state?.trackUri} onPress={() => { void action.act(() => SpotifyPlus.Player.togglePlay()); }} marginRight={6} />
                <IconButton name="next" size={48} label="Next track" disabled={action.pending || !state?.trackUri} onPress={() => { void action.act(() => SpotifyPlus.Player.skipNext()); }} />
            </View>
            <View height={2} marginLeft={59} marginRight={15} marginBottom={2} backgroundColor="#33ffffff" borderRadius={1}>
                <View height={2} width={`${Math.round(fraction * 100)}%`} backgroundColor={palette.accent} borderRadius={1} />
            </View>
        </Glass>
    </Scene>;
}

function Sheet({ kind, onClose }: { kind: 'queue' | 'devices'; onClose: () => void }) {
    const [queue, setQueue] = useState<QueueSnapshot>(), [devices, setDevices] = useState<ConnectDevice[]>([]);
    const [status, setStatus] = useState('Loading…'), [error, setError] = useState('');
    const action = useActions();
    useEffect(() => {
        try {
            if (kind === 'queue') setQueue(SpotifyPlus.Queue.get());
            else setDevices(SpotifyPlus.Connect.getDevices());
            setError('');
        } catch (error) { setError(describeError(error)); }
        setStatus('');
    }, [kind]);
    return <View position="absolute" top={0} bottom={0} left={0} right={0} backgroundColor="#950a0c18" justifyContent="flex-end" padding={16}>
        <Glass radius={32} padding={22} width="100%" maxHeight="80%" tint={.24}>
            <View flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom={16}><Label fontSize={24} fontWeight="600">{kind === 'queue' ? 'Up next' : 'Listen everywhere'}</Label><IconButton name="close" label="Close panel" size={44} onPress={onClose} /></View>
            <ScrollView width="100%" maxHeight={400}><View width="100%">
                {status || error || action.error ? <Notice message={error || action.error || status} /> : null}
                {kind === 'queue' ? <>{queue?.next.slice(0, 30).map((entry, i) => <View key={entry.uid || `${entry.uri}:${i}`} paddingVertical={14} flexDirection="row" alignItems="center" onPress={() => openSpotify(entry.uri)}>
                    <Label color={palette.muted} width={28} fontSize={12}>{i + 1}</Label><View flex={1}><Label fontSize={15} numberOfLines={1}>{entry.metadata.title || entry.metadata.name || 'Track'}</Label><Label color={palette.secondary} fontSize={12} marginTop={4} numberOfLines={1}>{entry.metadata.artist_name || entry.metadata.artist || entry.uri}</Label></View>
                </View>)}{queue && !queue.next.length ? <Notice message="The queue is empty. Choose something to keep listening." /> : null}</> : <>
                    {devices.map(device => <Glass key={device.id} padding={16} marginBottom={10} radius={20} selected={device.isActive} disabled={device.isDisabled || action.pending}
                        onPress={() => { void action.act(async () => { await SpotifyPlus.Connect.transfer(device); onClose(); }); }} accessibilityLabel={`Listen on ${device.name}`}>
                        <Label fontSize={16} color={device.isActive ? palette.accent : palette.text}>{device.name}</Label><Label color={palette.secondary} fontSize={12} marginTop={5}>{device.isActive ? 'Currently listening here' : device.isDisabled ? 'Unavailable' : device.type}</Label>
                    </Glass>)}{!status && !devices.length && !error ? <Notice message="No available Spotify Connect devices." /> : null}
                </>}
            </View></ScrollView>
        </Glass>
    </View>;
}

export function NowPlayingScreen({ Original }: UIComponentProps) {
    const { track, state, position, error } = usePlayback();
    const action = useActions();
    const [liked, setLiked] = useState(false), [likeReady, setLikeReady] = useState(false);
    const [drag, setDrag] = useState<number | null>(null);
    const [sheet, setSheet] = useState<'queue' | 'devices' | null>(null);
    const [native, setNative] = useState(false);
    const currentUri = useRef(track?.uri); currentUri.current = track?.uri;
    const draggingUri = useRef<string | undefined>(undefined);
    useEffect(() => {
        setLikeReady(false); setLiked(false); setDrag(null);
        if (track?.uri) {
            try { setLiked(SpotifyPlus.Library.isLiked(track.uri)); setLikeReady(true); }
            catch { }
        }
    }, [track?.uri]);
    useEffect(() => {
        if (!sheet) return;
        const back = (event: { preventDefault(): void }) => { event.preventDefault(); setSheet(null); };
        SpotifyPlus.on('android.backPressed', back);
        return () => SpotifyPlus.off('android.backPressed', back);
    }, [sheet]);
    if (native) return <View width="100%" height="100%"><Original /><Glass position="absolute" top={50} left={22} padding={14} radius={23} onPress={() => setNative(false)} accessibilityLabel="Return to glass player"><Label color={palette.accent}>Return to glass</Label></Glass></View>;
    const duration = track?.durationMs || 0;
    const shown = drag ?? position;
    const disabled = action.pending || !state?.trackUri;
    return <Scene dim={.3}>
        <Artwork source={track?.album?.image} position="absolute" top={0} left={0} width="100%" height="68%" radius={0} fadeBottom />
        <ScrollView width="100%" height="100%" showsVerticalScrollIndicator={false} fillViewport>
            <View width="100%" minHeight={710} paddingHorizontal={26} paddingTop={52} paddingBottom={28}>
                <View flexDirection="row" alignItems="center" justifyContent="space-between">
                    <IconButton name="down" label="Close Now Playing" onPress={() => SpotifyPlus.Navigation.back()} />
                    <IconButton name="more" label="More song options" onPress={() => { void action.act(() => SpotifyPlus.ContextMenu.openNowPlaying()); }} />
                </View>
                <View minHeight={260} flex={1} />
                <View flexDirection="row" alignItems="center" marginTop={24} marginBottom={14}>
                    <View flex={1} marginRight={12}><Label fontSize={27} fontWeight="600" numberOfLines={2}>{track?.title || (state?.trackUri ? 'Loading track…' : 'Nothing playing')}</Label>
                        <Label fontSize={18} color={palette.secondary} marginTop={6} numberOfLines={2}>{track?.artist || 'Choose a song to begin'}</Label></View>
                    <IconButton name="heart" label={liked ? 'Remove from Liked Songs' : 'Add to Liked Songs'} active={liked} filled={liked} disabled={!track || !likeReady || action.pending}
                        onPress={() => { const uri = track?.uri; if (uri) void action.act(async () => { if (liked) SpotifyPlus.Library.unlike(uri); else SpotifyPlus.Library.like(uri); if (currentUri.current === uri) setLiked(value => !value); }); }} />
                </View>
                <Slider width="100%" height={44} min={0} max={Math.max(1, duration)} progress={Math.min(shown, duration || 1)} disabled={disabled || !duration}
                    progressTintColor="#dce9ec" progressBackgroundTintColor="#50ffffff" thumbTintColor="#dce9ec" accessibilityLabel="Playback position"
                    onSlidingStart={value => { draggingUri.current = track?.uri; setDrag(value); }} onValueChange={setDrag}
                    onSlidingComplete={value => { setDrag(null); if (track?.uri === draggingUri.current) void action.act(() => SpotifyPlus.Player.seek(Math.max(0, Math.min(duration, value)))); }} />
                <View flexDirection="row" justifyContent="space-between" marginTop={-5}><Label fontSize={12} color={palette.secondary}>{timeLabel(shown)}</Label><Label fontSize={12} color={palette.secondary}>{timeLabel(duration)}</Label></View>
                <View flexDirection="row" alignItems="center" justifyContent="space-between" marginTop={25} marginBottom={24}>
                    <IconButton name="shuffle" label={state?.shuffle ? 'Disable shuffle' : 'Enable shuffle'} active={state?.shuffle} size={44} disabled={disabled} onPress={() => { void action.act(() => SpotifyPlus.Player.toggleShuffle()); }} />
                    <IconButton name="previous" label="Previous track" size={52} disabled={disabled} onPress={() => { void action.act(() => SpotifyPlus.Player.skipPrevious()); }} />
                    <IconButton name={state?.isPlaying ? 'pause' : 'play'} label={state?.isPlaying ? 'Pause' : 'Play'} size={76} disabled={disabled} onPress={() => { void action.act(() => SpotifyPlus.Player.togglePlay()); }} />
                    <IconButton name="next" label="Next track" size={52} disabled={disabled} onPress={() => { void action.act(() => SpotifyPlus.Player.skipNext()); }} />
                    <View><IconButton name="repeat" label={`Repeat: ${state?.repeat || 'off'}. Change repeat mode`} active={!!state && state.repeat !== 'off'} size={44} disabled={disabled} onPress={() => { void action.act(() => SpotifyPlus.Player.cycleRepeat()); }} />
                        {state?.repeat === 'repeat-one' ? <Label position="absolute" top={15} left={18} fontSize={10} color={palette.accent}>1</Label> : null}</View>
                </View>
                <Glass radius={24} paddingHorizontal={14} paddingVertical={5} tint={.1}><View flexDirection="row" alignItems="center">
                    <Label fontSize={13} color={palette.secondary}>−</Label><Volume flex={1} height={44} marginHorizontal={8} /><Label fontSize={18} color={palette.secondary}>+</Label>
                </View><Label textAlign="center" color={palette.muted} fontSize={10} marginBottom={4}>This device’s volume</Label></Glass>
                <View flexDirection="row" justifyContent="space-between" marginTop={18} paddingHorizontal={18}>
                    <IconButton name="lyrics" label="Open Spotify player for lyrics" onPress={() => setNative(true)} />
                    <IconButton name="connect" label="Choose a Spotify Connect device" active={sheet === 'devices'} onPress={() => setSheet('devices')} />
                    <IconButton name="queue" label="Show queue" active={sheet === 'queue'} onPress={() => setSheet('queue')} />
                </View>
                {state?.isBuffering ? <Label textAlign="center" color={palette.secondary} fontSize={12} marginTop={14}>Buffering…</Label> : null}
                {error || action.error ? <View marginTop={16}><Notice message={action.error || error} onRetry={() => { void playback.refresh(); }} /></View> : null}
            </View>
        </ScrollView>
        {sheet ? <Sheet kind={sheet} onClose={() => setSheet(null)} /> : null}
    </Scene>;
}
