import React, { useEffect, useRef, useState } from 'react';
import { SpotifyPlus } from 'spotifyplus';
import type { UIComponentProps } from 'spotifyplus';
import { ScrollView, View } from 'spotifyplus/react';
import { Artwork, Glass, Icon, IconButton, Label, Notice, Pill, Scene, Section, openSpotify, showMenu } from './components';
import { DetailData, DetailKind, detailUri, loadDetail } from './detail-model';
import { describeError, palette, timeLabel } from './model';
import { useActions, usePlayback } from './state';

function DetailScreen({ kind, context, Original }: UIComponentProps & { kind: DetailKind }) {
    const route = context.pageUri || context.uri;
    const uri = detailUri(kind, route);
    // A fresh instance owns its requests and native fallback state.
    return <DetailSession key={`${kind}:${context.instanceId}:${uri}`} kind={kind} uri={uri} Original={Original} />;
}
function DetailSession({ kind, uri, Original }: { kind: DetailKind; uri: string | null; Original: UIComponentProps['Original'] }) {
    const [data, setData] = useState<DetailData>();
    const [loading, setLoading] = useState(true), [error, setError] = useState(''), [native, setNative] = useState(false);
    const [revision, setRevision] = useState(0);
    const [saved, setSaved] = useState(false), [saveReady, setSaveReady] = useState(false);
    const live = useRef(false), pending = useRef(false);
    const action = useActions();
    const { state } = usePlayback();
    const valid = !!uri;
    const request = async (offset = 0) => {
        if (!uri || !valid || pending.current) return;
        pending.current = true; setLoading(true); setError('');
        try {
            const next = await loadDetail(SpotifyPlus, kind, uri, offset);
            if (live.current) setData(previous => offset && previous ? { ...previous, rows: [...previous.rows, ...next.rows], total: next.total, nextOffset: next.nextOffset } : next);
        } catch (error) { if (live.current) setError(describeError(error)); }
        finally { pending.current = false; if (live.current) setLoading(false); }
    };
    useEffect(() => { live.current = true; void request(); return () => { live.current = false; }; }, [revision]);
    useEffect(() => {
        setSaveReady(false);
        if (valid) {
            try { const [value] = SpotifyPlus.Library.contains([uri!]); setSaved(value); setSaveReady(true); }
            catch { }
        }
    }, [uri, valid]);
    if (native || !valid) return <View width="100%" height="100%"><Original />{valid ? <Glass position="absolute" top={50} left={22} padding={14} onPress={() => setNative(false)}><Label color={palette.accent}>Return to glass</Label></Glass> : null}</View>;
    const play = (index = 0, trackUri?: string) => { void action.act(() => SpotifyPlus.Player.playContext(kind === 'artist' && trackUri ? trackUri : uri!, kind === 'artist' && trackUri ? 0 : index)); };
    const artist = kind === 'artist', discography = kind === 'discography';
    const toggleSaved = () => { void action.act(async () => {
        if (saved) SpotifyPlus.Library.remove(uri!); else SpotifyPlus.Library.save(uri!);
        if (live.current) setSaved(value => !value);
    }); };
    return <Scene artwork={data?.image} dim={.72}><ScrollView width="100%" flex={1} showsVerticalScrollIndicator={false} fillViewport>
        <View width="100%" paddingBottom={208}>
            <View width="100%">
                <Artwork source={data?.image} position="absolute" top={0} left={0} width="100%" height={artist ? 475 : 570} radius={0} fadeBottom />
                <View flexDirection="row" justifyContent="space-between" position="absolute" top={56} left={20} right={20}>
                    <IconButton name="back" label="Go back" onPress={() => SpotifyPlus.Navigation.back()} />
                    <Glass radius={28} paddingHorizontal={5} flexDirection="row" alignItems="center">
                        <View width={44} height={46} alignItems="center" justifyContent="center" onPress={() => setNative(true)} accessibilityLabel="Open original Spotify view"><Icon name="info" size={22} /></View>
                        <View width={44} height={46} alignItems="center" justifyContent="center" onPress={() => showMenu(uri!)} accessibilityLabel="More options, including sharing"><Icon name="more" size={23} /></View>
                    </Glass>
                </View>
                <View paddingHorizontal={22} paddingTop={artist ? 325 : 410} alignItems="center">
                    <Label textAlign="center" fontSize={artist ? 36 : 29} fontWeight="700">{data?.name || (loading ? 'Opening your music…' : 'Your music')}</Label>
                    {!artist ? <Label textAlign="center" marginTop={9} fontSize={14} color={palette.secondary}>{data?.subtitle || kind}</Label> : null}
                    {!discography ? <View flexDirection="row" alignItems="center" justifyContent="center" gap={16} marginTop={20} width="100%">
                        <IconButton name={artist ? 'info' : 'shuffle'} label={artist ? 'Artist information in Spotify' : 'Shuffle play'} size={48} disabled={action.pending || (!artist && !data?.rows.length)}
                            onPress={() => { if (artist) setNative(true); else void action.act(async () => { await SpotifyPlus.Player.playContext(uri!); SpotifyPlus.Player.setShuffle(true); }); }} />
                        <View backgroundColor="#ffffff" borderRadius={artist ? 40 : 30} width={artist ? 76 : '52%'} minHeight={artist ? 76 : 56}
                            flexDirection="row" gap={9} alignItems="center" justifyContent="center" opacity={action.pending || !data?.rows.length ? .5 : 1}
                            disabled={action.pending || !data?.rows.length} onPress={() => play()} accessibilityLabel={`Play ${data?.name || kind}`}>
                            <Icon name="play" size={artist ? 33 : 23} color="#30252a" />{!artist ? <Label color="#30252a" fontSize={18} fontWeight="600">Play</Label> : null}
                        </View>
                        <IconButton name={saved ? 'heart' : 'plus'} filled={saved} active={saved} label={saved ? 'Remove from your library' : artist ? 'Follow artist' : 'Save to your library'} size={48} disabled={!saveReady || action.pending} onPress={toggleSaved} />
                    </View> : null}
                </View>
            </View>
            <View paddingHorizontal={20} width="100%">
            {data?.description ? <Label marginTop={22} lineHeight={22} fontSize={14} color={palette.secondary}>{data.description}</Label> : null}
            {error || action.error ? <View marginTop={20}><Notice message={error || action.error} onRetry={() => { if (data) void request(data.nextOffset); else setRevision(value => value + 1); }} /></View> : null}
            {artist && data?.featured ? <Glass marginTop={26} padding={12} radius={29} flexDirection="row" alignItems="center" onPress={() => openSpotify(data.featured!.uri)} onLongPress={() => showMenu(data.featured!.uri)} accessibilityLabel={`Open ${data.featured.title}`}>
                <Artwork source={data.featured.image} width={88} height={88} radius={16} />
                <View flex={1} marginLeft={13}><Label color={palette.secondary} fontSize={11} marginBottom={7}>FEATURED RELEASE</Label><Label fontWeight="600" fontSize={15} numberOfLines={2}>{data.featured.title}</Label><Label color={palette.secondary} marginTop={6} fontSize={12}>{data.featured.subtitle}</Label></View>
                <Icon name="arrow" size={18} />
            </Glass> : null}
            <View marginTop={26} width="100%">
                {artist || discography ? <Label fontSize={23} fontWeight="600" marginBottom={14}>{discography ? 'Releases' : 'Top songs'}</Label> : <View height={1} width="100%" backgroundColor="#25ffffff" />}
                {loading ? <Notice message="Gathering your music…" /> : null}
                {data?.rows.map(row => <View key={row.key} paddingVertical={10} minHeight={60} flexDirection="row" alignItems="center" borderBottomWidth={1} borderColor="#20ffffff">
                    <View flex={1} flexDirection="row" alignItems="center" disabled={action.pending} onPress={() => kind === 'discography' || !row.uri.startsWith('spotify:track:') ? openSpotify(row.uri) : play(row.index, row.uri)} onLongPress={() => showMenu(row.uri)} accessibilityLabel={`${kind === 'discography' ? 'Open' : 'Play'} ${row.title}`}>
                        {kind === 'album' ? <Label width={28} fontSize={12} color={palette.secondary}>{row.index + 1}</Label> : <Artwork source={row.image} width={50} height={50} radius={12} />}
                        <View flex={1} marginLeft={kind === 'album' ? 0 : 12}>
                            <View flexDirection="row" alignItems="center" gap={6}><Label flexShrink={1} fontSize={16} numberOfLines={2} color={state?.trackUri === row.uri ? palette.accent : palette.text}>{row.title}</Label>{row.explicit ? <View backgroundColor="#70ffffff" borderRadius={3} width={13} height={13} alignItems="center" justifyContent="center" accessibilityLabel="Explicit"><Label fontSize={9} color="#30252a">E</Label></View> : null}</View>
                            {kind !== 'album' ? <Label fontSize={12} color={palette.secondary} marginTop={5} numberOfLines={1}>{row.subtitle || 'Metadata unavailable'}</Label> : null}
                        </View>
                        {row.duration ? <Label color={palette.muted} fontSize={11} marginLeft={8}>{timeLabel(row.duration)}</Label> : null}
                    </View><View width={44} height={44} alignItems="center" justifyContent="center" onPress={() => showMenu(row.uri)} accessibilityLabel={`More options for ${row.title}`}><Icon name="more" size={18} /></View>
                </View>)}
                {!loading && !error && data && !data.rows.length ? <Notice message="No music is available here yet." /> : null}
                {data && data.nextOffset < data.total ? <Pill onPress={() => { if (!loading) void request(data.nextOffset); }}>{loading ? 'Loading…' : 'Load more'}</Pill> : null}
            </View>
            {kind === 'artist' && data?.releases.length ? <Section title="Albums and releases"><Pill onPress={() => openSpotify(`${uri}:releases`)}>Explore discography</Pill></Section> : null}
            </View>
        </View>
    </ScrollView></Scene>;
}
export const AlbumScreen = (props: UIComponentProps) => <DetailScreen {...props} kind="album" />;
export const PlaylistScreen = (props: UIComponentProps) => <DetailScreen {...props} kind="playlist" />;
export const ArtistScreen = (props: UIComponentProps) => <DetailScreen {...props} kind="artist" />;
export const DiscographyScreen = (props: UIComponentProps) => <DetailScreen {...props} kind="discography" />;
