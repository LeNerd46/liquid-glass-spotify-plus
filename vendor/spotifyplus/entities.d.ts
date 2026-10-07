import React from "react";
export interface SpotifyTrackData {
    title: string;
    trackNumber: number;
    durationMs: number;
    explicit: boolean;
    uri: string;
    artist: string;
    artists: string[];
    album: SpotifyAlbumData;
}
export interface SpotifyAlbumData {
    title: string;
    artist: string;
    release?: Date;
    image: string;
}
export declare class SpotifyAlbum {
    readonly title: string;
    readonly artist: string;
    readonly release?: Date;
    readonly image: string;
    constructor(title: string, artist: string, image: string, release?: Date);
    static from(data: SpotifyAlbumData): SpotifyAlbum;
    toJSON(): SpotifyAlbumData;
}
export declare class SpotifyTrack {
    readonly title: string;
    readonly trackNumber: number;
    readonly durationMs: number;
    readonly explicit: boolean;
    readonly uri: string;
    readonly id: string;
    readonly artist: string;
    readonly artists: string[];
    readonly album: SpotifyAlbumData;
    constructor(data: SpotifyTrackData);
    static from(data: SpotifyTrackData): SpotifyTrack;
    get displayName(): string;
    toJSON(): SpotifyTrackData;
}
export interface GetProgressData {
    position: number;
}
export interface MenuItemDefinition {
    id: string;
    title: string;
}
export interface MenuContext {
    type: string;
    track?: SpotifyTrackData;
    [key: string]: unknown;
}
export interface PlatformData {
    /** The current version of the Spotify app */
    clientVersion: string;
    /** The name of the operating system */
    osName: string;
    /** The current major version of Android */
    osVersion: string;
    /** The current Android SDK version or API level */
    sdkVersion: number;
}
export interface Session {
    /** The user's Spotify access token. This is used to authenticate requests to the Spotify API */
    accessToken: string;
}
export type ContextMenuRegister = (menu: ContextMenu) => void;
export type OnClickCallback = (uri: string) => void;
export type ContextMenuType = "track" | "artist" | "album" | "playlist";
export type ContextMenuTypes = ContextMenuType | readonly ContextMenuType[];
export type ShouldAddCallback = (uri: string, contextUri: string) => boolean;
export declare class ContextMenu {
    private readonly registerThing?;
    name: string;
    readonly onClick: OnClickCallback;
    readonly shouldAdd?: ShouldAddCallback;
    readonly types?: readonly ContextMenuType[];
    disabled: boolean;
    constructor(name: string, onClick: OnClickCallback, shouldAdd?: ShouldAddCallback, disabled?: boolean, registerThing?: ContextMenuRegister, types?: ContextMenuTypes);
    register(): this;
}
export type SideDrawerRegister = (drawer: SideDrawerItem) => void;
export type SideOnClickCallback = () => React.ReactElement | void;
export interface SideDrawerIcon {
    readonly type: "extension-asset";
    readonly uri: string;
    readonly mimeType: string;
    readonly name: string;
}
export declare class SideDrawerItem {
    private readonly registerThing?;
    name: string;
    readonly onClick: SideOnClickCallback;
    readonly icon?: SideDrawerIcon;
    constructor(name: string, onClick: SideOnClickCallback, icon?: SideDrawerIcon, registerThing?: SideDrawerRegister);
    register(): this;
}
export interface UriData {
    type: string;
    id?: string;
}
export declare class Uri {
    type: string;
    id?: string;
    constructor(type: string, props?: UriData);
    static from(data: UriData): Uri;
    toString(): string;
}
export type Surface = {
    id: string;
    type: string;
};
/** Normalized views of Spotify's internal metadata. The original response remains in raw. */
export interface MetadataImage {
    fileId: string;
    size: string;
    width: number;
    height: number;
    url: string;
}
export interface MetadataArtistRef {
    uri: string;
    name: string;
}
export interface MetadataDisc {
    number: number;
    tracks: string[];
}
export interface MetadataDate {
    year: number;
    month: number;
    day: number;
}
export interface MetadataAlbum {
    uri: string;
    name: string;
    image: string;
    images: MetadataImage[];
    artists: MetadataArtistRef[];
    label: string;
    type: string;
    popularity: number;
    date: MetadataDate;
    discs: MetadataDisc[];
    raw: Record<string, any>;
}
export interface MetadataArtist {
    uri: string;
    name: string;
    image: string;
    images: MetadataImage[];
    popularity: number;
    topTracks: Array<{
        country: string;
        tracks: string[];
    }>;
    albums: string[];
    singles: string[];
    compilations: string[];
    appearsOn: string[];
    raw: Record<string, any>;
}
export interface MetadataPlaylistItem {
    uri: string;
    addedBy: string;
    timestamp: string;
    itemId: string;
}
export interface MetadataPlaylist {
    uri: string;
    revision: string;
    name: string;
    picture: string;
    description: string;
    ownerUsername: string;
    length: number;
    position: number;
    truncated: boolean;
    timestamp: string;
    createdAt: string;
    isUserCreated: boolean;
    canEditItems: boolean;
    canEditMetadata: boolean;
    items: MetadataPlaylistItem[];
    raw: Record<string, any>;
}
/** Metadata uses 128-bit hexadecimal GIDs; extension consumers use Spotify base62 URIs. */
export declare function gidToUri(kind: 'track' | 'album' | 'artist', gid: unknown): string;
export declare function parseMetadataAlbum(raw: Record<string, any>, requestedUri: string): MetadataAlbum;
export declare function parseMetadataArtist(raw: Record<string, any>, requestedUri: string): MetadataArtist;
export declare function parseMetadataPlaylist(raw: Record<string, any>, requestedUri: string): MetadataPlaylist;
