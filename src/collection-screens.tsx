import React, { useEffect, useState } from 'react';
import { SpotifyPlus } from 'spotifyplus';
import type { LibraryItem, SpotifyUser } from 'spotifyplus';
import { View, TextInput, ScrollView, HorizontalScrollView } from 'spotifyplus/react';
import { Artwork, Glass, Icon, IconButton, Label, Notice, Pill, Scene, Section, openSpotify, showMenu } from './components';
import { filterCollection, itemKind, palette } from './model';
import { useCollection, useSearch, CollectionType } from './data';
import { usePlayback, useReducedMotion, setReducedMotion } from './state';

function Header({ title, subtitle, home = false }: { title: string; subtitle?: string; home?: boolean }) {
    const reduced = useReducedMotion();
    return <View flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom={24}>
        <View flex={1}>
            <Label fontSize={32} fontWeight="600">{title}</Label>{subtitle ? <Label color={palette.secondary} fontSize={14} marginTop={6}>{subtitle}</Label> : null}</View>
        {home ? <IconButton name="sun" label={reduced ? 'Enable background motion' : 'Reduce background motion'} onPress={() => setReducedMotion(!reduced)} marginRight={8} /> : null}
        <IconButton name="more" label="Open Spotify drawer and theme controls" onPress={() => { void SpotifyPlus.SideDrawer.open().catch(error => SpotifyPlus.toast(String(error))); }} />
    </View>;
}
export function Page({ children }: { children?: React.ReactNode }) {
    return <Scene><ScrollView width="100%" flex={1} showsVerticalScrollIndicator={false} fillViewport>
        <View width="100%" paddingHorizontal={22} paddingTop={62} paddingBottom={208}>{children}</View>
    </ScrollView></Scene>;
}
function Cover({ source, size = 56, artist = false }: { source?: string; size?: number; artist?: boolean }) {
    return source ? <Artwork source={source} width={size} height={size} radius={artist ? size / 2 : 13} /> :
        <Glass width={size} height={size} radius={artist ? size / 2 : 13} selected alignItems="center" justifyContent="center"><Icon name={artist ? 'sun' : 'library'} size={24} /></Glass>;
}
function CollectionCard({ item, wide = false }: { item: LibraryItem; wide?: boolean }) {
    const artist = itemKind(item.uri) === 'artist';
    return <View width={wide ? 148 : '48%'} marginBottom={12} marginRight={wide ? 16 : 0}>
        <Glass radius={artist ? 80 : 26} padding={wide ? 6 : 9} flexDirection={wide ? 'column' : 'row'} alignItems="center"
            onPress={() => openSpotify(item.uri)} onLongPress={() => showMenu(item.uri)} accessibilityLabel={`Open ${item.name}`}>
            <Cover source={item.imageUri} size={wide ? 136 : 44} artist={artist} />
            {!wide ? <Label flex={1} fontSize={13} marginLeft={10} numberOfLines={2}>{item.name || 'Untitled collection'}</Label> : null}
        </Glass>
        {wide ? <View paddingHorizontal={3} marginTop={10}><Label fontSize={15} numberOfLines={1}>{item.name}</Label><Label fontSize={12} marginTop={5} color={palette.secondary}>{artist ? 'Artist' : itemKind(item.uri) === 'playlist' ? 'Playlist' : 'Album'}</Label></View> : null}
    </View>;
}
function Shelf({ items }: { items: LibraryItem[] }) {
    return <HorizontalScrollView width="100%" showsHorizontalScrollIndicator={false}><View flexDirection="row">{items.map(item => <CollectionCard key={item.uri} item={item} wide />)}</View></HorizontalScrollView>;
}
export function HomeScreen() {
    const library = useCollection('all', 30);
    const { track } = usePlayback();
    const [user, setUser] = useState<SpotifyUser>();
    useEffect(() => { let live = true; SpotifyPlus.User.getCurrent().then(user => { if (live) setUser(user); }).catch(() => {}); return () => { live = false; }; }, []);
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const quick = [...library.items.filter(item => item.pinned), ...library.items.filter(item => !item.pinned)].slice(0, 5);
    const artists = library.items.filter(item => itemKind(item.uri) === 'artist');
    const collections = library.items.filter(item => itemKind(item.uri) !== 'artist');
    return <Page><Header title={greeting} subtitle={user?.displayName || 'Make yourself at home.'} home />
        <View flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            <Glass width="48%" minHeight={66} padding={9} radius={24} marginBottom={12} flexDirection="row" alignItems="center"
                onPress={() => openSpotify('spotify:collection:tracks')} accessibilityLabel="Open Liked Songs">
                <Glass width={44} height={44} radius={13} selected alignItems="center" justifyContent="center"><Icon name="heart" filled size={22} /></Glass>
                <Label color={palette.accent} fontSize={13} flex={1} marginLeft={10}>Liked Songs</Label>
            </Glass>{quick.map(item => <CollectionCard key={item.uri} item={item} />)}
        </View>
        {library.loading ? <Notice message="Finding your favorites…" /> : library.error ? <Notice message={library.error} onRetry={library.retry} /> : null}
        {track ? <Section title="Stay in the moment" subtitle="Your current soundtrack">
            <Glass radius={28} padding={16} flexDirection="row" alignItems="center" onPress={() => openSpotify('spotify:now-playing')}>
                <Artwork source={track.album.image} width={76} height={76} radius={18} /><View flex={1} marginLeft={16}>
                    <Label fontSize={18} fontWeight="600" numberOfLines={1}>{track.title}</Label><Label color={palette.secondary} fontSize={13} numberOfLines={1} marginTop={6}>{track.artist}</Label>
                </View><Icon name="arrow" size={18} />
            </Glass>
        </Section> : null}
        {collections.length ? <Section title="Made for your mood" subtitle="Albums and playlists from your collection"><Shelf items={collections.slice(0, 12)} /></Section> : null}
        {artists.length ? <Section title="Your artists"><Shelf items={artists} /></Section> : null}
        {!library.loading && !library.error && !library.items.length ? <Section title="A little room for discovery"><Notice message="Save an album, artist or playlist in Spotify to make this space yours." /></Section> : null}
        <Section title="Something new?" subtitle="Find your next favorite."><Glass padding={18} radius={24} flexDirection="row" alignItems="center" onPress={() => openSpotify('spotify:search')}>
            <Icon name="search" /><Label flex={1} marginLeft={14}>Explore music</Label><Icon name="arrow" size={18} />
        </Glass></Section>
    </Page>;
}

export function SearchScreen() {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const results = useSearch(query);
    const filters = [['all', 'All'], ['track', 'Songs'], ['artist', 'Artists'], ['album', 'Albums'], ['playlist', 'Playlists']];
    const filtered = results.items.filter(item => filter === 'all' || itemKind(item.uri) === filter);
    const browse = [['Late night', 'late night'], ['Feel good', 'feel good'], ['Focus flow', 'focus'], ['Fresh finds', 'new music'], ['Slow Sunday', 'chill'], ['On the move', 'workout']];
    return <Page><Header title="Find your sound" subtitle="A song for every version of you." />
        <Glass radius={25} paddingHorizontal={16} flexDirection="row" alignItems="center" marginBottom={16}>
            <Icon name="search" color={palette.secondary} size={21} />
            <TextInput flex={1} minHeight={54} text={query} hint="Songs, artists, albums…" color={palette.text} hintColor={palette.secondary}
                backgroundColor="#00000000" fontSize={15} marginLeft={10} padding={0} singleLine returnKeyType="search" onChangeText={setQuery} accessibilityLabel="Search Spotify" />
            {query ? <View width={44} height={44} alignItems="center" justifyContent="center" onPress={() => setQuery('')} accessibilityLabel="Clear search"><Icon name="close" size={18} /></View> : null}
        </Glass>
        {query.trim() ? <><HorizontalScrollView showsHorizontalScrollIndicator={false} width="100%"><View flexDirection="row" gap={8}>{filters.map(([value, label]) => <Pill key={value} selected={filter === value} onPress={() => setFilter(value)}>{label}</Pill>)}</View></HorizontalScrollView>
            <Section title="Search results" subtitle={results.loading ? 'Searching…' : `${filtered.length} matches`}>
                {results.error ? <Notice message={results.error} onRetry={results.retry} /> : null}
                {!results.loading && !results.error && !filtered.length ? <Notice message="No matches here. Try another name or filter." /> : null}
                {filtered.map((item, index) => <Glass key={`${item.uri}:${index}`} padding={12} radius={22} marginBottom={10} flexDirection="row" alignItems="center">
                    <View flex={1} flexDirection="row" alignItems="center" onPress={() => openSpotify(item.uri)} onLongPress={() => showMenu(item.uri)} accessibilityLabel={`Open ${item.text}`}>
                        <Cover source={item.image} artist={itemKind(item.uri) === 'artist'} size={54} /><View flex={1} marginLeft={14}>
                            <Label fontSize={15} numberOfLines={1}>{item.text}</Label><Label color={palette.secondary} fontSize={12} numberOfLines={1} marginTop={5}>{item.subtitle || itemKind(item.uri)}</Label>
                        </View>
                    </View><View width={44} height={44} alignItems="center" justifyContent="center" onPress={() => showMenu(item.uri)} accessibilityLabel={`More options for ${item.text}`}><Icon name="more" size={20} /></View>
                </Glass>)}
            </Section></> : <Section title="Where will you go?" subtitle="Start with a feeling."><View flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                {browse.map(([label, term], index) => <Glass key={label} width="48%" minHeight={120} padding={18} radius={27} marginBottom={14} selected={index === 1 || index === 4} onPress={() => setQuery(term)} accessibilityLabel={`Search ${label}`}>
                    <Icon name={(['sun', 'heart', 'library', 'shuffle', 'lyrics', 'play'] as const)[index]} size={26} color={index === 1 || index === 4 ? palette.accent : palette.secondary} />
                    <Label fontSize={18} fontWeight="600" marginTop={22}>{label}</Label>
                </Glass>)}
            </View></Section>}
    </Page>;
}

export function LibraryScreen() {
    const [type, setType] = useState<CollectionType>('all');
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState<'recent' | 'name'>('recent');
    const [grid, setGrid] = useState(false);
    const library = useCollection(type);
    const items = filterCollection(library.items, query, sort);
    return <Page><Header title="Your library" subtitle="Everything you keep coming back to." />
        <HorizontalScrollView width="100%" showsHorizontalScrollIndicator={false}><View flexDirection="row" gap={8}>
            {([['all', 'All'], ['playlist', 'Playlists'], ['album', 'Albums'], ['artist', 'Artists']] as const).map(([value, label]) => <Pill key={value} selected={type === value} onPress={() => setType(value)}>{label}</Pill>)}
        </View></HorizontalScrollView>
        <Glass marginTop={18} radius={22} paddingHorizontal={14} flexDirection="row" alignItems="center"><Icon name="search" size={18} color={palette.secondary} />
            <TextInput flex={1} minHeight={48} text={query} hint="Find in your collection" color={palette.text} hintColor={palette.secondary} backgroundColor="#00000000" padding={0} marginLeft={10} fontSize={14} singleLine onChangeText={setQuery} accessibilityLabel="Filter loaded library items" />
        </Glass>
        <View marginTop={18} marginBottom={18} flexDirection="row" alignItems="center" justifyContent="space-between">
            <View flexDirection="row" alignItems="center" minHeight={44} onPress={() => setSort(sort === 'name' ? 'recent' : 'name')} accessibilityLabel="Change library sort order"><Icon name="list" size={17} color={palette.secondary} /><Label fontSize={13} color={palette.secondary} marginLeft={9}>{sort === 'name' ? 'Alphabetical' : 'Library order'}</Label></View>
            <View flexDirection="row" gap={8}><IconButton size={44} name="refresh" label="Refresh library" onPress={library.retry} /><IconButton size={44} name={grid ? 'list' : 'grid'} label={grid ? 'Show list' : 'Show grid'} onPress={() => setGrid(!grid)} /></View>
        </View>
        {library.error ? <Notice message={library.error} onRetry={library.retry} /> : null}
        {library.loading && !items.length ? <Notice message="Opening your collection…" /> : null}
        {grid ? <View flexDirection="row" flexWrap="wrap" justifyContent="space-between">{items.map(item => <View key={item.uri} width="48%" marginBottom={20}>
            <Glass padding={6} radius={24} onPress={() => openSpotify(item.uri)} onLongPress={() => showMenu(item.uri)} accessibilityLabel={`Open ${item.name}`}>
                <Artwork source={item.imageUri} width="100%" aspectRatio={1} radius={itemKind(item.uri) === 'artist' ? 90 : 19} />
            </Glass><Label marginTop={10} fontSize={14} numberOfLines={1}>{item.name}</Label><Label color={palette.secondary} fontSize={12} marginTop={4}>{itemKind(item.uri)}</Label>
        </View>)}</View> : items.map(item => <Glass key={item.uri} padding={12} radius={23} marginBottom={11} flexDirection="row" alignItems="center">
            <View flex={1} flexDirection="row" alignItems="center" onPress={() => openSpotify(item.uri)} onLongPress={() => showMenu(item.uri)} accessibilityLabel={`Open ${item.name}`}>
                <Cover source={item.imageUri} artist={itemKind(item.uri) === 'artist'} /><View flex={1} marginLeft={14}><Label numberOfLines={1} fontSize={16}>{item.name}</Label><Label fontSize={12} color={palette.secondary} marginTop={6}>{item.pinned ? 'Pinned · ' : ''}{itemKind(item.uri)}</Label></View>
            </View><View width={44} height={44} alignItems="center" justifyContent="center" onPress={() => showMenu(item.uri)} accessibilityLabel={`More options for ${item.name}`}><Icon name="more" size={21} /></View>
        </Glass>)}
        {!library.loading && !items.length && !library.error ? <Notice message={query ? 'No matches in the items loaded so far.' : 'Your collection starts with the music you save.'} /> : null}
        {library.hasMore ? <Pill onPress={library.loadMore}>{library.loading ? 'Loading…' : `Load more · ${library.items.length} of ${library.total}`}</Pill> : null}
    </Page>;
}
