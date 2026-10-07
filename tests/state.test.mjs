import assert from 'node:assert/strict';
import test from 'node:test';
import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';

await mkdir('dist/tests', { recursive: true });
for (const name of ['model', 'playback-store', 'controller', 'search-artwork', 'detail-model']) await build({
    entryPoints: [`src/${name}.ts`], outfile: `dist/tests/${name}.mjs`, bundle: true, platform: 'node', format: 'esm',
});
const model = await import(pathToFileURL(`${process.cwd()}/dist/tests/model.mjs`));
const { createPlaybackStore } = await import(pathToFileURL(`${process.cwd()}/dist/tests/playback-store.mjs`));
const { createThemeController } = await import(pathToFileURL(`${process.cwd()}/dist/tests/controller.mjs`));
const { createSearchArtwork } = await import(pathToFileURL(`${process.cwd()}/dist/tests/search-artwork.mjs`));
const { loadDetail, detailUri } = await import(pathToFileURL(`${process.cwd()}/dist/tests/detail-model.mjs`));
const tick = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => { let resolve; const promise = new Promise(callback => { resolve = callback; }); return { promise, resolve }; };
const state = { trackUri: 'spotify:track:a', positionMs: 1234, isPlaying: false, repeat: 'off' };

test('search enriches all 30 results, limits concurrency, caches successes and isolates missing covers', async () => {
    let requests = 0, active = 0, peak = 0;
    const enrich = createSearchArtwork({ Internal: { getTrack: async uri => {
        requests++; peak = Math.max(peak, ++active); await tick(); active--;
        if (uri.endsWith(':7')) throw new Error('Unavailable');
        return { album: { image: 'spotify:image:' + 'a'.repeat(40) }, artist: 'Artist' };
    } } });
    const items = Array.from({ length: 30 }, (_, i) => ({ uri: `spotify:track:${i}`, text: String(i) }));
    const output = [];
    await enrich(items, () => true, item => output.push(item));
    assert.equal(requests, 30); assert.equal(peak, 3); assert.equal(output.length, 29);
    assert.ok(output.find(item => item.uri.endsWith(':29'))?.image.startsWith('https://'));
    await enrich(items, () => true, () => {}); assert.equal(requests, 31);
});

test('a changed search stops scheduling metadata and suppresses pending cover updates', async () => {
    const wait = deferred(); let live = true, requests = 0, published = 0;
    const enrich = createSearchArtwork({ Internal: { getTrack: async () => {
        requests++; await wait.promise; return { album: { image: 'https://example.com/cover' } };
    } } });
    const task = enrich(Array.from({ length: 30 }, (_, i) => ({ uri: `spotify:track:${i}`, text: '' })), () => live, () => published++);
    live = false; wait.resolve(); await task;
    assert.equal(requests, 3); assert.equal(published, 0);
});

test('artwork accepts Spotify image identifiers and HTTPS; malformed inputs have a neutral fallback', () => {
    assert.equal(model.artworkUrl('spotify:image:' + 'a'.repeat(40)), 'https://i.scdn.co/image/' + 'a'.repeat(40));
    for (const bad of ['spotify:image:short', 'file:///data/private', 'http://example.com/cover', undefined]) assert.equal(model.artworkUrl(bad), '');
    assert.equal(model.timeLabel(-500), '0:00'); assert.equal(model.timeLabel(125999), '2:05');
});
test('collection filtering and sorting preserve Spotify order and deduplicate page overlaps', () => {
    const items = [{ uri: 'a', name: 'Zebra' }, { uri: 'b', name: 'Amber' }];
    assert.deepEqual(model.filterCollection(items, '', 'recent'), items);
    assert.deepEqual(model.filterCollection(items, ' AM ', 'name'), [items[1]]);
    assert.deepEqual(model.filterCollection(items, '', 'name'), [items[1], items[0]]);
    assert.deepEqual(model.uniqueItems([...items, items[0]]), items);
});
test('two screens share one playback request and fully release polling/events on last unsubscribe', async () => {
    let requests = 0;
    const handlers = new Map();
    const store = createPlaybackStore({
        Player: { getState: () => { requests++; return state; }, getCurrentTrack: () => ({ uri: state.trackUri, durationMs: 4000 }) },
        Events: { on: (name, handler) => handlers.set(name, handler), off: name => handlers.delete(name) },
    });
    const one = store.subscribe(() => {}), two = store.subscribe(() => {});
    await tick(); assert.equal(requests, 1); assert.equal(handlers.size, 5);
    one(); assert.equal(handlers.size, 5);
    two(); assert.equal(handlers.size, 0);
    await store.refresh(); assert.equal(requests, 1);
});
test('remounted playback reads the new local state before returning', () => {
    let currentState = state, requests = 0;
    const store = createPlaybackStore({
        Player: { getState: () => { requests++; return currentState; }, getCurrentTrack: () => ({ uri: currentState.trackUri, durationMs: 9000 }) },
        Events: { on() {}, off() {} },
    });
    const old = store.subscribe(() => {});
    assert.equal(store.getSnapshot().track.uri, state.trackUri);
    old();
    currentState = { ...state, trackUri: 'spotify:track:b', positionMs: 7000 };
    const current = store.subscribe(() => {});
    assert.equal(requests, 2);
    assert.equal(store.getSnapshot().track.uri, 'spotify:track:b'); assert.equal(store.getSnapshot().position, 7000);
    current();
});
test('old metadata is not displayed under a new playback URI', async () => {
    const store = createPlaybackStore({
        Player: { getState: () => state, getCurrentTrack: () => ({ uri: 'spotify:track:old' }) },
        Events: { on() {}, off() {} },
    });
    const unsubscribe = store.subscribe(() => {}); await tick();
    assert.equal(store.getSnapshot().track, undefined); unsubscribe();
});
test('theme enable/restore touches only its own registrations and enable is idempotent', () => {
    const calls = [], removed = [];
    const ui = { replace: target => { calls.push(target); return { dispose: () => removed.push(target) }; } };
    const controller = createThemeController(ui, {});
    assert.deepEqual(controller.getSnapshot(), []);
    controller.enable(); controller.enable(); assert.deepEqual(calls, model.screenTargets);
    controller.toggle('search.page'); assert.deepEqual(removed, ['search.page']);
    controller.disable(); assert.equal(removed.length, model.screenTargets.length); assert.deepEqual(controller.getSnapshot(), []);
});

test('enabling only available boundaries does not block the rest of the theme', () => {
    const calls = [];
    const controller = createThemeController({ replace: target => { calls.push(target); return {dispose() {}}; } }, {});
    controller.enable(['album.page', 'navigation.drawer']);
    assert.deepEqual(calls, ['album.page', 'navigation.drawer']);
    assert.deepEqual(controller.getSnapshot(), calls);
});

test('detail routes canonicalize legacy playlists and artist release pages without guessing other pages', () => {
    assert.equal(detailUri('playlist','spotify:user:devon:playlist:abc123'),'spotify:playlist:abc123');
    assert.equal(detailUri('discography','spotify:artist:abc123:releases:albums'),'spotify:artist:abc123');
    assert.equal(detailUri('album','spotify:artist:abc123'),null);
    assert.equal(detailUri('artist','spotify:artist:abc123:related'),null);
    assert.equal(detailUri('album',null),null);
});

test('playlist pages preserve duplicate occurrences and playback offsets when metadata fails', async () => {
    let options;
    const api = {
        Playlists: { get: async (_uri, value) => { options = value; return {name:'Mix',description:'',total:34,items:[
            {uri:'spotify:track:same',rowId:'a',name:'First'}, {uri:'spotify:track:same',rowId:'b',name:'Second'},
            {uri:'spotify:track:missing',rowId:'c',name:'Missing'}]}; } },
        Internal: { getPlaylist: async () => { throw Error('No metadata'); }, getTrack: async uri => {
            if (uri.endsWith('missing')) throw Error('Unavailable');
            return {title:'Song',artist:'Artist',album:{image:'https://example.com/cover'},durationMs:3000};
        } },
    };
    const result = await loadDetail(api, 'playlist', 'spotify:playlist:mix', 30);
    assert.deepEqual(options, {offset:30,limit:30});
    assert.deepEqual(result.rows.map(row=>row.index), [30,31,32]);
    assert.equal(new Set(result.rows.map(row=>row.key)).size, 3);
    assert.equal(result.rows[2].title, 'Missing');
    assert.equal(result.nextOffset, 33); assert.equal(result.total, 34);
    assert.equal(result.image, 'https://example.com/cover');
});

test('album enrichment bounds concurrency and paginates across disc boundaries', async () => {
    let active=0, peak=0;
    const uris=Array.from({length:42},(_,i)=>`spotify:track:${i}`);
    const result=await loadDetail({Internal:{
        getAlbum:async()=>({name:'Album',image:'',artists:[],date:{year:2026},discs:[{tracks:uris.slice(0,20)},{tracks:uris.slice(20)}]}),
        getTrack:async uri=>{ peak=Math.max(peak,++active);await tick();active--;return {title:uri,artist:'',album:{image:''}}; },
    }}, 'album', 'spotify:album:one', 30);
    assert.equal(peak,3);assert.equal(result.total,42);assert.equal(result.nextOffset,42);
    assert.equal(result.rows[0].index,30);assert.equal(result.rows[0].uri,uris[30]);
});

test('playlist hero prefers its resolved cover over opaque metadata and track artwork', async () => {
    const cover = 'spotify:image:' + 'a'.repeat(40);
    const result = await loadDetail({
        Playlists: { get: async () => ({name:'Custom cover',description:'',imageUri:cover,total:1,items:[{uri:'spotify:track:one',rowId:'a',name:'Song'}]}) },
        Internal: {
            getPlaylist: async () => ({picture:'q2dwbAAA2oS7hudx/lipyP8NhkY=',ownerUsername:'Owner'}),
            getTrack: async () => ({title:'Song',artist:'Artist',album:{image:'https://example.com/track'}}),
        },
    }, 'playlist', 'spotify:playlist:one');
    assert.equal(result.image, 'https://i.scdn.co/image/' + 'a'.repeat(40));
    assert.equal(result.name, 'Custom cover');
    assert.equal(result.total, 1);
});

test('artist releases deduplicate while a missing featured album leaves top tracks usable', async () => {
    const result=await loadDetail({Internal:{
        getArtist:async()=>({name:'Artist',image:'',albums:['spotify:album:a'],singles:['spotify:album:a','spotify:album:b'],compilations:[],appearsOn:[],topTracks:[{tracks:['spotify:track:a']}]}),
        getAlbum:async()=>{throw Error('Missing release');},
        getTrack:async()=>({title:'Top song',artist:'Artist',album:{title:'Release',image:''}}),
    }},'artist','spotify:artist:a');
    assert.deepEqual(result.releases,['spotify:album:a','spotify:album:b']);
    assert.equal(result.rows[0].title,'Top song');assert.equal(result.featured,undefined);
});
test('failed registration rolls back newly created contributions while preserving earlier individual choices', () => {
    let fail = false; const removed = [];
    const controller = createThemeController({ replace: target => {
        if (fail && target === 'library.page') throw new Error('Unavailable');
        return { dispose: () => removed.push(target) };
    } }, {});
    controller.toggle('miniPlayer.root'); fail = true;
    assert.throws(() => controller.enable(), /Unavailable/);
    assert.deepEqual(controller.getSnapshot(), ['miniPlayer.root']);
    assert.deepEqual(removed, ['home.page', 'search.page']); controller.disable();
});
