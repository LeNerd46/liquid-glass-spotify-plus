import React, { useState, useSyncExternalStore } from 'react';
import { SpotifyPlus } from 'spotifyplus';
import { View } from 'spotifyplus/react';
import { Glass, IconButton, Label, Notice, Pill, Section, openSpotify } from './components';
import { HomeScreen, SearchScreen, LibraryScreen, Page } from './collection-screens';
import { NowPlayingScreen, MiniPlayer } from './player-screens';
import { AlbumScreen, PlaylistScreen, ArtistScreen, DiscographyScreen } from './detail-screens';
import { DrawerScreen, ContextMenuScreen } from './menu-screens';
import type { UITargetContext } from 'spotifyplus';
import { createThemeController, ScreenTarget } from './controller';
import { describeError, palette, screenTargets } from './model';
import { useReducedMotion, setReducedMotion } from './state';

const renderers = {
    'home.page': HomeScreen, 'search.page': SearchScreen, 'library.page': LibraryScreen,
    'nowPlaying.page': NowPlayingScreen, 'miniPlayer.root': MiniPlayer,
    'album.page': AlbumScreen, 'playlist.page': PlaylistScreen, 'artist.page': ArtistScreen,
    'artist.discography.page': DiscographyScreen, 'navigation.drawer': DrawerScreen, 'contextMenu.root': ContextMenuScreen,
};
const controller = createThemeController(SpotifyPlus.UI, renderers);
const names: Record<ScreenTarget, string> = {
    'home.page': 'Home', 'search.page': 'Search', 'library.page': 'Library',
    'nowPlaying.page': 'Now Playing', 'miniPlayer.root': 'Mini-player',
    'album.page': 'Albums', 'playlist.page': 'Playlists', 'artist.page': 'Artists',
    'artist.discography.page': 'Discography', 'navigation.drawer': 'Side drawer', 'contextMenu.root': 'Context menus',
};
function Controls() {
    const enabled = useSyncExternalStore(controller.subscribe, controller.getSnapshot);
    const reduced = useReducedMotion();
    const [status, setStatus] = useState('');
    const [busy, setBusy] = useState(false);
    const [preview, setPreview] = useState<{ target: ScreenTarget; context: UITargetContext } | null>(null);
    const inspect = async () => {
        const results = await Promise.all(screenTargets.map(target => SpotifyPlus.UI.inspect(target)));
        const unavailable = results.filter(info => !info.available || !info.operations.includes('replace'));
        const conflicts = results.filter(info => info.conflicts.some(conflict => conflict.winner !== SpotifyPlus.scriptId));
        return { unavailable, conflicts, supported: results.filter(info => info.available && info.operations.includes('replace')).map(info => info.name as ScreenTarget) };
    };
    const enable = async () => {
        setBusy(true); setStatus('');
        try {
            const { unavailable, supported } = await inspect();
            controller.enable(supported);
            const { conflicts } = await inspect();
            setStatus((conflicts.length ? 'Another extension owns some views. Restore the other showcase or change UI extension order in Spotify Plus settings.' : 'Available glass views are enabled for this session. Close this view to explore Spotify.') + (unavailable.length ? `\nUnavailable on this build: ${unavailable.map(info => names[info.name as ScreenTarget]).join(', ')}.` : ''));
        } catch (error) { setStatus(describeError(error)); }
        finally { setBusy(false); }
    };
    const toggle = async (target: ScreenTarget) => {
        if (busy) return;
        setBusy(true);
        try {
            if (!enabled.includes(target)) {
                const info = await SpotifyPlus.UI.inspect(target);
                if (!info.available || !info.operations.includes('replace')) { setStatus(info.reason || `${names[target]} is unavailable on this Spotify build.`); return; }
            }
            controller.toggle(target);
        } catch (error) { setStatus(describeError(error)); }
        finally { setBusy(false); }
    };
    const showPreview = async (target: ScreenTarget) => {
        if (busy) return;
        setBusy(true);
        try {
            let uri: string | null = null;
            const kind = target === 'artist.discography.page' ? 'artist' : target.split('.')[0];
            if (['album', 'playlist', 'artist'].includes(kind)) {
                const instance = (await SpotifyPlus.UI.listInstances(target))[0];
                uri = instance?.context.pageUri || instance?.context.uri || null;
                if (!uri) uri = (await SpotifyPlus.Library.list({ type: kind as 'album' | 'playlist' | 'artist', limit: 1 })).items[0]?.uri || null;
                if (!uri) { setStatus(`Open a ${kind} in Spotify or save one to your library to preview this view.`); return; }
            }
            setPreview({ target, context: { instanceId: 'glass-preview', uri, pageUri: uri } });
        } catch (error) { setStatus(describeError(error)); }
        finally { setBusy(false); }
    };
    if (preview) {
        const Renderer = renderers[preview.target];
        const content = <Renderer context={preview.context} Original={() => <Notice message="Open this view in Spotify with the theme enabled to use its native content." />} NativePart={() => null} />;
        return <View width="100%" height="100%">{content}<IconButton name="close" label="Close preview" position="absolute" top={8} right={12} size={44} onPress={() => setPreview(null)} /></View>;
    }
    return <Page>
        <View flexDirection="row" alignItems="center" justifyContent="space-between"><View flex={1}>
            <Label fontSize={37} fontWeight="600">Liquid Glass</Label></View><IconButton name="close" label="Close theme controls" onPress={() => SpotifyPlus.Surfaces.close()} /></View>
        <Label fontSize={16} color={palette.secondary} lineHeight={24} marginTop={14} marginBottom={22}>Your music, in a different light. Flowing artwork, soft glass and a little room to breathe.</Label>
        <Glass padding={22} radius={30} selected marginBottom={16}>
            <Label fontSize={21} fontWeight="600">{enabled.length ? `${enabled.length} glass views active` : 'Make it yours'}</Label>
            <Label color={palette.secondary} fontSize={13} marginTop={10} marginBottom={18}>This theme has its own controls. Enable it for this session or preview each screen below.</Label>
            <View flexDirection="row" gap={10}><Pill selected onPress={() => { if (!busy) void enable(); }}>{busy ? 'Checking…' : 'Enable all screens'}</Pill>
                {enabled.length ? <Pill onPress={() => { controller.disable(); setStatus('Spotify screens restored.'); }}>Restore Spotify</Pill> : null}</View>
        </Glass>
        {status ? <Notice message={status} /> : null}
        <Section title="Your music, through glass">
            {screenTargets.map(target => <Glass key={target} padding={17} radius={23} marginBottom={10}>
                <View flexDirection="row" alignItems="center" justifyContent="space-between" gap={8}><Label flex={1} flexShrink={1} numberOfLines={2} fontSize={16}>{names[target]}</Label>
                    <View flexDirection="row" gap={8}>{target !== 'navigation.drawer' && target !== 'contextMenu.root' ? <Pill onPress={() => { void showPreview(target); }}>Preview</Pill> : null}<Pill selected={enabled.includes(target)} onPress={() => { void toggle(target); }}>{enabled.includes(target) ? 'On' : 'Off'}</Pill></View>
                </View>
            </Glass>)}
        </Section>
        <Section title="Set the pace"><Glass padding={18} radius={24} flexDirection="row" alignItems="center" justifyContent="space-between">
            <View flex={1} marginRight={16}><Label>Reduced motion</Label><Label fontSize={12} color={palette.secondary} marginTop={6}>A still background and instant artwork changes.</Label></View><Pill selected={reduced} onPress={() => setReducedMotion(!reduced)}>{reduced ? 'On' : 'Off'}</Pill>
        </Glass></Section>
        <View marginTop={24}><Pill onPress={() => openSpotify('spotify:home')}>Go to Home</Pill></View>
    </Page>;
}
new SpotifyPlus.SideDrawer('Liquid Glass', () => <Controls />).register();
