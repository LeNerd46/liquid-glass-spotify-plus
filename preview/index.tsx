import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HomeScreen, SearchScreen, LibraryScreen } from '../src/collection-screens';
import { MiniPlayer, NowPlayingScreen } from '../src/player-screens';
import { AlbumScreen, PlaylistScreen, ArtistScreen, DiscographyScreen } from '../src/detail-screens';
import { DrawerScreen, ContextMenuScreen } from '../src/menu-screens';
import { Icon, Label } from '../src/components';
import { setReducedMotion } from '../src/state';
import { SpotifyPlus, previewContext } from './fixture';

const screens = {home:HomeScreen,search:SearchScreen,library:LibraryScreen,player:NowPlayingScreen,album:AlbumScreen,playlist:PlaylistScreen,artist:ArtistScreen,discography:DiscographyScreen,drawer:DrawerScreen,menu:ContextMenuScreen};
function App(){
    const [screen,setScreen]=useState<keyof typeof screens>('home'),[uri,setUri]=useState<string>(),[toast,setToast]=useState('');
    const [reduced,setReduced]=useState(false);
    const navigate=(value:keyof typeof screens)=>{setScreen(value);setUri(undefined);};
    useEffect(()=>{
        const navigate=(event:any)=>{setScreen(typeof event.detail==='string'?event.detail:event.detail.screen);setUri(event.detail.uri);};
        const notify=(event:any)=>{setToast(event.detail);setTimeout(()=>setToast(''),3000);};
        window.addEventListener('preview-screen',navigate);window.addEventListener('preview-toast',notify);
        return()=>{window.removeEventListener('preview-screen',navigate);window.removeEventListener('preview-toast',notify);};
    },[]);
    const Renderer=screens[screen];
    const overlay=screen==='drawer'||screen==='menu';
    return <main><aside><div className="eyebrow">SPOTIFY PLUS / A SEPARATE EXTENSION</div><h1>Music.<br/>In a different light.</h1><p>Soft edges. Living artwork. A quieter kind of interface.</p>
        <div className="caption">LIQUID GLASS · INTERACTIVE PREVIEW</div><div className="choices">{Object.keys(screens).map(value=><button className={screen===value?'selected':''} onClick={()=>navigate(value as keyof typeof screens)} key={value}>{value==='player'?'Now Playing':value==='menu'?'Context menu':value==='drawer'?'Side drawer':value[0].toUpperCase()+value.slice(1)}</button>)}</div>
        <div className="preview-actions"><button onClick={()=>SpotifyPlus.Player.skipNext()}>Change album artwork ↗</button><button onClick={()=>{setReduced(!reduced);setReducedMotion(!reduced);}}>{reduced?'Enable motion':'Reduce motion'}</button></div>
        <p className="note">This preview renders the extension’s React screens with sample music. Android uses the native Java glass views and your live Spotify data.</p></aside>
        <section className="phone"><div className="status"><span>9:41</span><span>••• ◔ ▰</span></div><div className="content"><Renderer context={previewContext(screen,uri)} Original={()=><div className="native-note">Spotify’s original view opens here on Android.</div>} NativePart={({id})=><Label>{id==='profile'?'Devon · View profile':id}</Label>} /></div>
        {screen!=='player'&&!overlay?<><div className="mini"><MiniPlayer/></div><nav>{(['home','search','library'] as const).map(value=><button className={screen===value?'active':''} key={value} onClick={()=>navigate(value)}><Icon name={value} color={screen===value?'#88edb1':'#ddd8e8'} size={23} filled={screen===value}/><span>{value[0].toUpperCase()+value.slice(1)}</span></button>)}</nav></>:null}<div className="home-indicator"/>{toast?<div className="toast">{toast}</div>:null}</section></main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
