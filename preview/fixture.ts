// This adapter is confined to the browser preview; Android always uses the live Spotify API.
const handlers = new Map<string, Set<() => void>>();
export const sampleArt = (index: number) => `https://liquid-glass.preview/cover/${index}`;
const library = [
    ['Moonlight drive', 'playlist', 0], ['Soft focus', 'playlist', 1], ['Blue Hour', 'album', 2],
    ['Slow mornings', 'playlist', 3], ['Afterglow', 'album', 4], ['Glasshouse', 'artist', 5],
    ['A quieter place', 'album', 1], ['Sunday tapes', 'playlist', 3], ['Elena Reed', 'artist', 2],
].map(([name, kind, index], i) => ({ uri: `spotify:${kind}:${String(i).padStart(22, '0')}`, name: String(name), imageUri: sampleArt(Number(index)), pinned: i < 2 }));
const tracks = [
    { uri:'spotify:track:0000000000000000000001', title:'Blue Hour', artist:'Elena Reed', album:{title:'Blue Hour', image:sampleArt(2)}, durationMs:247000 },
    { uri:'spotify:track:0000000000000000000002', title:'Afterglow', artist:'Glasshouse', album:{title:'Afterglow', image:sampleArt(4)}, durationMs:215000 },
    { uri:'spotify:track:0000000000000000000003', title:'A quieter place', artist:'Elena Reed', album:{title:'A quieter place', image:sampleArt(1)}, durationMs:198000 },
];
let index = 0, playing = true, position = 81000, shuffle = false, repeat = 'off', liked = false;
const emit = (event: string) => handlers.get(event)?.forEach(handler => handler());
export const SpotifyPlus: any = {
    scriptId:'com.lenerd.liquid-glass',
    Events: { on(name: string, handler: () => void) { if (!handlers.has(name)) handlers.set(name, new Set()); handlers.get(name)!.add(handler); }, off(name: string, handler: () => void) { handlers.get(name)?.delete(handler); } },
    Player: {
        async getState() { return {trackUri:tracks[index].uri, contextUri:'spotify:album:sample', isPlaying:playing, isPaused:!playing, positionMs:position, shuffle, repeat}; },
        getCurrentTrack: () => tracks[index],
        async togglePlay() { playing = !playing; emit('playPause'); },
        async skipNext() { index = (index + 1) % tracks.length; position = 0; emit('songChanged'); },
        async skipPrevious() { index = (index + tracks.length - 1) % tracks.length; position = 0; emit('songChanged'); },
        async toggleShuffle() { shuffle = !shuffle; emit('shuffleChanged'); },
        async cycleRepeat() { repeat = repeat === 'off' ? 'repeat' : repeat === 'repeat' ? 'repeat-one' : 'off'; emit('repeatChanged'); },
        async seek(value: number) { position = value; emit('trackSeeked'); },
        async playContext(_uri: string, row = 0) { index = row % tracks.length; playing = true; position = 0; emit('songChanged'); },
        async setShuffle(value: boolean) { shuffle = value; emit('shuffleChanged'); },
    },
    Library: { async list({type = 'all', offset = 0, limit = 40} = {}) { const items = library.filter(item => type === 'all' || item.uri.split(':')[1] === type); return {items:items.slice(offset,offset+limit),total:items.length,offset,limit}; }, async contains(){return [liked];},async save(){liked=true;},async remove(){liked=false;},async isLiked(){return liked;},async like(){liked=true;},async unlike(){liked=false;} },
    User: { async getCurrent() {return {displayName:'Devon',images:[]};} },
    Search: { async search(query: string) { await new Promise(resolve => setTimeout(resolve, 220)); const items = [...tracks.map(track => ({uri:track.uri,text:track.title})),...library.map(item => ({uri:item.uri,text:item.name}))]; return {items:items.filter(item => item.text.toLowerCase().includes(query.toLowerCase()))}; } },
    Internal: {
        async getTrack(uri: string){return tracks.find(track => track.uri === uri);},
        async getAlbum(uri: string){const item=library.find(item=>item.uri===uri);return {uri,name:item?.name || 'Blue Hour',image:item?.imageUri || sampleArt(2),artists:[{uri:previewUri('artist'),name:'Elena Reed'}],date:{year:2026,month:4,day:30},type:'Album',discs:[{number:1,tracks:tracks.map(track=>track.uri)}]};},
        async getArtist(uri: string){const item=library.find(item=>item.uri===uri);return {uri,name:item?.name || 'Elena Reed',image:item?.imageUri || sampleArt(5),topTracks:[{country:'US',tracks:tracks.map(track=>track.uri)}],albums:library.filter(item=>item.uri.startsWith('spotify:album:')).map(item=>item.uri),singles:[],compilations:[],appearsOn:[]};},
        async getPlaylist(uri: string){return {picture:library.find(item=>item.uri===uri)?.imageUri,ownerUsername:'Devon'};}
    },
    Playlists: { async get(uri: string, {offset=0,limit=30}={}) { return {uri,name:library.find(item=>item.uri===uri)?.name || 'Moonlight drive',description:'A little space to slow down. Songs for the long way home.',total:tracks.length,items:tracks.slice(offset,offset+limit).map((track,i)=>({uri:track.uri,name:track.title,rowId:String(offset+i)}))}; } },
    UI: { async invokeAction(_instance: string, part: string) { SpotifyPlus.toast(`Sample action: ${part}`); } },
    Connect: { async getDevices(){return [{id:'phone',name:'This phone',type:'Smartphone',isActive:true},{id:'speaker',name:'Living room',type:'Speaker',isActive:false}];},async transfer(){SpotifyPlus.toast('Sample device selected');} },
    Queue: { async get(){return {next:tracks.map(track=>({uri:track.uri,uid:track.uri,metadata:{title:track.title,artist_name:track.artist}}))};} },
    Navigation: { openSpotify(uri: string) { const screen=uri==='spotify:now-playing'?'player':uri.includes(':releases')?'discography':uri.split(':')[1]; if(['home','search','library','album','playlist','artist','discography','player'].includes(screen))window.dispatchEvent(new CustomEvent('preview-screen',{detail:{screen,uri}})); else SpotifyPlus.toast('This opens Spotify on Android.');return true; }, back(){window.dispatchEvent(new CustomEvent('preview-screen',{detail:'home'}));return true;} },
    ContextMenu: {async open(){window.dispatchEvent(new CustomEvent('preview-screen',{detail:'menu'}));},async openNowPlaying(){window.dispatchEvent(new CustomEvent('preview-screen',{detail:'menu'}));}},
    SideDrawer:{async open(){window.dispatchEvent(new CustomEvent('preview-screen',{detail:'drawer'}));}},
    on(name:string,handler:()=>void){this.Events.on(name,handler);},off(name:string,handler:()=>void){this.Events.off(name,handler);},
    toast(message:string){window.dispatchEvent(new CustomEvent('preview-toast',{detail:message}));},
};
export function previewUri(kind: string) { return library.find(item=>item.uri.startsWith(`spotify:${kind}:`))?.uri || ''; }
export function previewContext(screen: string, uri?: string) {
    return {instanceId:'preview',uri:uri || previewUri(screen==='discography'?'artist':screen),pageUri:uri || previewUri(screen==='discography'?'artist':screen),title:'Blue Hour',subtitle:'Elena Reed',parts:
        screen==='drawer' ? [{id:'profile',semanticId:'profile',kind:'content' as const,title:null,enabled:true}, ...['Your library','Settings','Liquid Glass','Marketplace'].map(title=>({id:title,semanticId:title,kind:'action' as const,title,enabled:true}))] :
        screen==='menu' ? ['Add to queue','Save to your library','Go to artist','Share','Unavailable action'].map((title,i)=>({id:title,semanticId:title,kind:'action' as const,title,enabled:i!==4})) : []};
}

const colors = [['#4a0b55','#dd477b','#58385a'],['#1b5557','#95ac9f','#23392a'],['#111e55','#768fbe','#354977'],['#a54b34','#eec2a2','#573032'],['#5d1457','#cd769a','#342b68'],['#1e4646','#bfbc70','#131e2b']];
export function cover(source:string) {
    const i = Number(source.split('/').pop()) || 0;
    const [a,b,c] = colors[i%colors.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><defs><linearGradient id="g" x2=".5" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${c}"/></linearGradient><radialGradient id="r"><stop stop-color="${b}"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></radialGradient><filter id="b"><feGaussianBlur stdDeviation="22"/></filter></defs><rect width="600" height="600" fill="url(#g)"/><ellipse cx="380" cy="220" rx="280" ry="250" fill="url(#r)"/><path d="M-50 520 C100 180 180 610 320 200 S500 330 670 -20" stroke="${b}" stroke-width="60" fill="none" opacity=".35" filter="url(#b)"/><circle cx="300" cy="250" r="102" fill="none" stroke="${b}" stroke-width=".9"/><circle cx="300" cy="250" r="88" fill="none" stroke="${b}" stroke-width=".5"/><path d="M160 360 Q300 160 440 360 Q300 290 160 360" fill="${b}" opacity=".3"/><text x="300" y="485" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" letter-spacing="10" fill="#fff" opacity=".9">${['MOONLIGHT','SOFT FOCUS','BLUE HOUR','SLOW DAYS','AFTERGLOW','GLASSHOUSE'][i%6]}</text><text x="300" y="517" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" letter-spacing="5" fill="#fff" opacity=".5">LIQUID GLASS • SAMPLE ARTWORK</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
