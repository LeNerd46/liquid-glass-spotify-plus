import React from 'react';
import { cover } from './fixture';
const keys = ['width','height','minWidth','minHeight','maxWidth','maxHeight','flex','flexGrow','flexShrink','flexBasis','flexDirection','justifyContent','alignItems','alignSelf','flexWrap','position','top','left','right','bottom','opacity','backgroundColor','borderRadius','borderWidth','borderBottomWidth','borderColor','margin','marginTop','marginBottom','marginLeft','marginRight','padding','paddingTop','paddingBottom','paddingLeft','paddingRight','gap','aspectRatio','fontSize','fontWeight','letterSpacing','lineHeight','textAlign'];
function style(props:any):any {
    const output:any = {boxSizing:'border-box',minWidth:0,position:'relative'};
    keys.forEach(key => {if(props[key]!==undefined) output[key]=props[key];});
    for(const kind of ['padding','margin']) for(const [axis,ends] of [['Horizontal',['Left','Right']],['Vertical',['Top','Bottom']]] as const) if(props[kind+axis]!==undefined) ends.forEach(end=>output[kind+end]=props[kind+axis]);
    if(props.color)output.color=props.color;
    if(output.lineHeight)output.lineHeight=`${output.lineHeight}px`;
    if(output.borderWidth || output.borderBottomWidth)output.borderStyle='solid';
    if(output.borderBottomWidth && !output.borderWidth) { output.borderTopWidth=0; output.borderLeftWidth=0; output.borderRightWidth=0; }
    for (const key of ['color','backgroundColor','borderColor']) {
        const value=output[key];
        if(typeof value==='string' && /^#[a-f\d]{8}$/i.test(value))output[key]=`#${value.slice(3)}${value.slice(1,3)}`;
    }
    return {...output,...props.style};
}
const events=(props:any)=>({onClick:props.disabled?undefined:props.onPress,'aria-label':props.accessibilityLabel,onContextMenu:props.onLongPress?(event:any)=>{event.preventDefault();props.onLongPress();}:undefined});
export function View(props:any){return <div style={{display:'flex',flexDirection:'column',flexShrink:0,...style(props)}} {...events(props)}>{props.children}</div>;}
export function Text(props:any){return <div style={{flexShrink:0,...style(props),...(props.numberOfLines?{overflow:'hidden',display:'-webkit-box',WebkitLineClamp:props.numberOfLines,WebkitBoxOrient:'vertical'}:{})}}>{props.children??props.text}</div>;}
export function TextInput(props:any){return <input value={props.text} placeholder={props.hint} onChange={event=>props.onChangeText?.(event.target.value)} aria-label={props.accessibilityLabel} style={{outline:0,border:0,fontFamily:'inherit',...style(props)}}/>;}
export function ScrollView(props:any){return <div style={{display:'flex',flexDirection:'column',overflowY:'auto',...style(props)}}>{props.children}</div>;}
export function HorizontalScrollView(props:any){return <div style={{overflowX:'auto',flexShrink:0,...style(props)}}>{props.children}</div>;}
export function Slider(props:any){return <input type="range" min={props.min} max={props.max} value={props.progress} disabled={props.disabled} aria-label={props.accessibilityLabel} onPointerDown={()=>props.onSlidingStart?.(props.progress)} onChange={event=>props.onValueChange?.(Number(event.target.value))} onPointerUp={event=>props.onSlidingComplete?.(Number((event.target as HTMLInputElement).value))} style={{accentColor:'#dce9ec',...style(props)}}/>;}
export function ScriptView(props:any){
    const nodes=props.nodes?.[0]?.children||[];
    return <svg viewBox="0 0 24 24" style={{width:props.width,height:props.height,flexShrink:0}} fill="none" strokeLinecap="round" strokeLinejoin="round">{nodes.map((node:any,i:number)=>{
        const base={key:i,fill:node.fill||'none',stroke:node.stroke||node.color,strokeWidth:node.strokeWidth||0};
        if(node.type==='line')return <line {...base} x1={node.x1} y1={node.y1} x2={node.x2} y2={node.y2}/>;
        if(node.type==='circle')return <circle {...base} cx={node.cx} cy={node.cy} r={node.radius}/>;
        if(node.type==='roundRect')return <rect {...base} x={node.x} y={node.y} width={node.width} height={node.height} rx={node.radius}/>;
        if(node.type==='path'){const d=node.commands.map((c:any)=>c.cmd==='Z'?'Z':c.cmd==='C'?`C ${c.x1} ${c.y1} ${c.x2} ${c.y2} ${c.x} ${c.y}`:`${c.cmd} ${c.x} ${c.y}`).join(' ');return <path {...base} d={d}/>;}return null;
    })}</svg>;
}
export function createNativeComponent(name:string){return function Native(props:any){
    if(name==='LiquidGlassScene')return <div className={`scene ${props.reduceMotion?'still':''}`} style={{display:'flex',flexDirection:'column',isolation:'isolate',...style(props)}}><div className="ambient" style={{backgroundImage:`url("${cover(props.artwork)}")`}}/><div style={{position:'absolute',inset:0,zIndex:-1,background:`rgba(8,10,23,${props.dim})`}}/>{props.children}</div>;
    if(name==='LiquidGlassPanel')return <div className="glass" style={{display:'flex',flexDirection:'column',flexShrink:0,borderRadius:props.radius,background:props.selected?'rgba(132,239,179,.13)':`rgba(240,234,255,${props.tint})`,opacity:props.disabled?.4:1,...style(props)}} {...events(props)}>{props.children}</div>;
    if(name==='LiquidGlassArtwork')return <div style={{overflow:'hidden',flexShrink:0,background:'#57506a',...style(props),borderRadius:props.radius,maskImage:props.fadeBottom?'linear-gradient(black 50%, transparent)':undefined}}><img src={cover(props.artwork)} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>;
    if(name==='LiquidGlassVolume')return <input aria-label="Sample device volume" type="range" defaultValue={45} style={{accentColor:'#e1e8ed',...style(props)}}/>;
    return <View {...props}/>;
};}
