import React from 'react';
import { SpotifyPlus } from 'spotifyplus';
import { View, Text, ScriptView, createNativeComponent } from 'spotifyplus/react';
import type { CommonViewProps, ScriptViewNode } from 'spotifyplus/react';
import { artworkUrl, palette } from './model';
import { usePlayback, useReducedMotion } from './state';

const NativeScene = createNativeComponent<{ artwork: string; animated: boolean; reduceMotion: boolean; dim: number }>('LiquidGlassScene');
const NativePanel = createNativeComponent<{ radius: number; tint: number; selected: boolean; reduceMotion: boolean }>('LiquidGlassPanel');
const NativeArtwork = createNativeComponent<{ artwork: string; radius: number; reduceMotion: boolean; fadeBottom: boolean }>('LiquidGlassArtwork');
export function Scene({ children, compact = false, dim, artwork, ...props }: CommonViewProps & { compact?: boolean; dim?: number; artwork?: string }) {
    const { track } = usePlayback();
    const reduced = useReducedMotion();
    return <NativeScene width="100%" height="100%" artwork={artworkUrl(artwork ?? track?.album?.image)} animated={!compact}
        reduceMotion={reduced} dim={dim ?? (compact ? .48 : .32)} {...props}>{children}</NativeScene>;
}
export function Glass({ children, radius = 24, selected = false, tint = .14, ...props }:
    CommonViewProps & { radius?: number; selected?: boolean; tint?: number }) {
    const reduced = useReducedMotion();
    return <NativePanel radius={radius} tint={tint} selected={selected} reduceMotion={reduced} {...props}>{children}</NativePanel>;
}
export function Artwork({ source, radius = 16, fadeBottom = false, ...props }:
    CommonViewProps & { source?: string; radius?: number; fadeBottom?: boolean }) {
    const reduced = useReducedMotion();
    return <NativeArtwork artwork={artworkUrl(source)} radius={radius} fadeBottom={fadeBottom} reduceMotion={reduced} {...props} />;
}
export type IconName = 'play' | 'pause' | 'next' | 'previous' | 'search' | 'library' | 'home' | 'heart' | 'more' |
    'down' | 'back' | 'info' | 'close' | 'shuffle' | 'repeat' | 'connect' | 'queue' | 'lyrics' | 'grid' | 'list' | 'plus' | 'arrow' | 'sun' | 'refresh';
export function Icon({ name, size = 24, color = palette.text, filled = false }: { name: IconName; size?: number; color?: string; filled?: boolean }) {
    const nodes: ScriptViewNode[] = [];
    const line = (x1: number, y1: number, x2: number, y2: number) => nodes.push({ type: 'line', x1, y1, x2, y2, color, strokeWidth: 1.8 });
    const circle = (cx: number, cy: number, radius: number, fill = false) => nodes.push({ type: 'circle', cx, cy, radius, ...(fill ? { fill: color } : { stroke: color, strokeWidth: 1.8 }) });
    const path = (points: number[][], fill = false, closed = false) => nodes.push({ type: 'path',
        commands: [...points.map(([x, y], i) => ({ cmd: (i ? 'L' : 'M') as 'M' | 'L', x, y })), ...(closed ? [{ cmd: 'Z' as const }] : [])],
        ...(fill ? { fill: color } : { stroke: color, strokeWidth: 1.8 }) });
    const rect = (x: number, y: number, width: number, height: number, radius = 1) => nodes.push({ type: 'roundRect', x, y, width, height, radius, fill: color });
    switch (name) {
        case 'play': path([[7, 4], [21, 12], [7, 20]], true, true); break;
        case 'pause': rect(6, 4, 4, 16); rect(14, 4, 4, 16); break;
        case 'next': path([[3, 5], [13, 12], [3, 19]], true, true); path([[13, 5], [23, 12], [13, 19]], true, true); break;
        case 'previous': path([[21, 5], [11, 12], [21, 19]], true, true); path([[11, 5], [1, 12], [11, 19]], true, true); break;
        case 'search': circle(10, 10, 7); line(15.2, 15.2, 22, 22); break;
        case 'library': line(4, 4, 4, 21); line(10, 4, 10, 21); path([[15, 5], [18, 4], [22, 20], [19, 21]], false, true); break;
        case 'home': path([[3, 11], [12, 3], [21, 11], [21, 21], [15, 21], [15, 14], [9, 14], [9, 21], [3, 21]], filled, true); break;
        case 'heart': nodes.push({ type: 'path', commands: [{cmd:'M',x:12,y:21},{cmd:'C',x1:8,y1:17,x2:2,y2:13,x:2,y:7},{cmd:'C',x1:2,y1:1,x2:10,y2:1,x:12,y:6},{cmd:'C',x1:14,y1:1,x2:22,y2:1,x:22,y:7},{cmd:'C',x1:22,y1:13,x2:16,y2:17,x:12,y:21},{cmd:'Z'}], ...(filled ? {fill:color} : {stroke:color,strokeWidth:1.6}) }); break;
        case 'more': [5, 12, 19].forEach(x => circle(x, 12, 1.5, true)); break;
        case 'down': path([[5, 9], [12, 16], [19, 9]]); break;
        case 'back': path([[15, 4], [7, 12], [15, 20]]); break;
        case 'info': circle(12, 12, 10); circle(12, 7, 1, true); line(12, 11, 12, 18); break;
        case 'close': line(6, 6, 18, 18); line(18, 6, 6, 18); break;
        case 'plus': line(12, 5, 12, 19); line(5, 12, 19, 12); break;
        case 'arrow': path([[9, 5], [16, 12], [9, 19]]); break;
        case 'shuffle': path([[3, 6], [6, 6], [18, 18], [22, 18]]); path([[3, 18], [6, 18], [18, 6], [22, 6]]); path([[18, 2], [22, 6], [18, 10]]); path([[18, 14], [22, 18], [18, 22]]); break;
        case 'repeat': path([[3, 10], [3, 5], [20, 5], [20, 10]]); path([[17, 2], [21, 5], [17, 8]]); path([[21, 14], [21, 19], [4, 19], [4, 14]]); path([[7, 16], [3, 19], [7, 22]]); break;
        case 'connect': path([[5, 17], [2, 17], [2, 3], [22, 3], [22, 17], [19, 17]]); path([[6, 22], [12, 13], [18, 22]], false, true); break;
        case 'queue': [6, 12, 18].forEach(y => { circle(3, y, 1, true); line(8, y, 22, y); }); break;
        case 'lyrics': path([[3, 3], [21, 3], [21, 17], [12, 17], [6, 22], [6, 17], [3, 17]], false, true); rect(7, 7, 3, 5); rect(14, 7, 3, 5); break;
        case 'grid': [4, 14].forEach(x => [4, 14].forEach(y => rect(x, y, 6, 6, 1.5))); break;
        case 'list': [5, 12, 19].forEach(y => { rect(3, y - 2, 4, 4); line(11, y, 22, y); }); break;
        case 'sun': circle(12, 12, 4); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(12 + Math.cos(a) * 7, 12 + Math.sin(a) * 7, 12 + Math.cos(a) * 10, 12 + Math.sin(a) * 10); } break;
        case 'refresh': path([[21, 11], [21, 5], [15, 5]]); path([[20, 5], [16, 2], [8, 2], [3, 7], [3, 16], [8, 21], [16, 21], [21, 16]]); break;
    }
    return <ScriptView width={size} height={size} nodes={[{ type: 'group', scale: size / 24, pivotX: 0, pivotY: 0, children: nodes }]} />;
}
export function IconButton({ name, label, onPress, active = false, size = 46, filled, ...props }:
    CommonViewProps & { name: IconName; label: string; active?: boolean; size?: number; filled?: boolean }) {
    return <Glass width={size} height={size} radius={size / 2} selected={active} alignItems="center" justifyContent="center"
        accessibilityLabel={label} onPress={onPress} {...props}><Icon name={name} color={active ? palette.accent : palette.text} filled={filled} size={size > 54 ? 30 : 21} /></Glass>;
}
export function Label({ children, ...props }: React.ComponentProps<typeof Text>) {
    return <Text color={palette.text} fontSize={15} includeFontPadding={false} {...props}>{children}</Text>;
}
export function Pill({ children, selected, onPress }: { children: string; selected?: boolean; onPress?: () => void }) {
    return <Glass radius={22} selected={selected} paddingHorizontal={17} minHeight={44} alignItems="center" justifyContent="center" onPress={onPress} accessibilityLabel={children}>
        <Label fontSize={13} color={selected ? palette.accent : palette.secondary}>{children}</Label>
    </Glass>;
}
export function Notice({ message, onRetry }: { message: string; onRetry?: () => void }) {
    return <Glass padding={16} marginBottom={16} radius={18}>
        <Label color={palette.secondary} fontSize={13}>{message}</Label>
        {onRetry ? <View onPress={onRetry} minHeight={44} justifyContent="center" accessibilityLabel="Try again"><Label color={palette.accent}>Try again</Label></View> : null}
    </Glass>;
}
export function Section({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
    return <View marginTop={26} width="100%"><Label fontSize={23} fontWeight="600" marginBottom={subtitle ? 5 : 14}>{title}</Label>
        {subtitle ? <Label color={palette.secondary} fontSize={13} marginBottom={14}>{subtitle}</Label> : null}{children}</View>;
}
export function openSpotify(uri: string) {
    if (!SpotifyPlus.Navigation.openSpotify(uri)) SpotifyPlus.toast('Spotify could not open this screen.');
}
export function showMenu(uri: string) { void SpotifyPlus.ContextMenu.open(uri).catch(error => SpotifyPlus.toast(String(error))); }
