import type { UIApi } from "./target-api";
import type { ContextMenu, ContextMenuTypes, OnClickCallback, PlatformData, Session, ShouldAddCallback, SideDrawerItem, SideOnClickCallback, SpotifyTrack, MetadataAlbum, MetadataArtist, MetadataPlaylist } from "../entities";
import type { EventHandler, SurfaceRenderer } from "./script-registry";

export type ExtensionSettings = {
    extensionId: string;
    settings: ExtensionSettingSection[];
};

export type BaseExtensionSetting = {
    id: string;
    label: string;
    description?: string;
    disabled?: boolean;
};

export type ExtensionSettingSection = {
    title?: string;
    description?: string;
    items: ExtensionSettingItem[];
};

export type ExtensionToggle = BaseExtensionSetting & {
    type: 'toggle';
    value: boolean;
};

export type ExtensionSlider = BaseExtensionSetting & {
    type: 'slider';
    value: number;
    min: number;
    max: number;
    step?: number;
};

export type ExtensionText = BaseExtensionSetting & {
    type: 'text';
    value: string;
    placeholder?: string;
    maxLength?: number;
};

export type ExtensionNumber = BaseExtensionSetting & {
    type: 'number';
    value: number;
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
};

export type ExtensionSelect = BaseExtensionSetting & {
    type: 'select';
    value: string;
    options: ExtensionOption[];
};

export type ExtensionMultiSelect = BaseExtensionSetting & {
    type: 'multi-select';
    value: string[];
    options: ExtensionOption[];
};

export type ExtensionRadio = BaseExtensionSetting & {
    type: 'radio';
    value: string;
    options: ExtensionOption[];
};

export type ExtensionColor = BaseExtensionSetting & {
    type: 'color';
    value: string;
    alpha?: boolean;
};

export type ExtensionButton = BaseExtensionSetting & {
    type: 'button';
    buttonLabel?: string;
};

export type ExtensionDate = BaseExtensionSetting & {
    type: 'date';
    value: string;
    min?: string;
    max?: string;
};

export type ExtensionTime = BaseExtensionSetting & {
    type: 'time';
    value: string;
};

export type ExtensionRange = BaseExtensionSetting & {
    type: 'range';
    value: [number, number];
    min: number;
    max: number;
    step?: number;
};

export type ExtensionFile = BaseExtensionSetting & {
    type: 'file';
    value?: string;
    accept?: string[];
};

export type ExtensionDirectory = BaseExtensionSetting & {
    type: 'directory';
    value?: string;
};

export type ExtensionInfo = BaseExtensionSetting & {
    type: 'info';
    text: string;
};

export type ExtensionLink = BaseExtensionSetting & {
    type: 'link';
    url: string;
    linkLabel?: string;
};

export type ExtensionDivider = {
    type: 'divider';
};

export type ExtensionHeader = {
    type: 'header';
    label: string;
    description?: string;
};

export type ExtensionOption = {
    label: string;
    value: string;
    description?: string;
};

export type ExtensionSetting = ExtensionToggle | ExtensionSlider | ExtensionText | ExtensionNumber | ExtensionSelect | ExtensionMultiSelect | ExtensionRadio | ExtensionColor | ExtensionButton | ExtensionDate | ExtensionTime | ExtensionRange | ExtensionFile | ExtensionDirectory | ExtensionInfo | ExtensionLink;

export type ExtensionSettingItem = ExtensionSetting | ExtensionDivider | ExtensionHeader;

export type ExtensionAssetKind = 'asset' | 'font' | 'image';

export interface ExtensionAsset {
    readonly type: 'extension-asset';
    readonly uri: string;
    readonly mimeType: string;
    readonly name: string;
}

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FontStyle = 'normal' | 'italic';

export interface ExtensionFontAsset extends ExtensionAsset {
    readonly assetKind: 'font';
}

export interface ExtensionFontFace {
    source: string;
    weight?: FontWeight;
    style?: FontStyle;
}

export interface ExtensionFontFamily {
    readonly type: 'extension-font-family';
    readonly faces: ReadonlyArray<{
        readonly source: ExtensionFontAsset;
        readonly weight: FontWeight;
        readonly style: FontStyle;
    }>;
}

export interface ExtensionAssetsApi {
    resolve(relativePath: string): ExtensionAsset;
    image(relativePath: string): ExtensionAsset;
    font(relativePath: string): ExtensionFontAsset;
    fontFamily(faces: ReadonlyArray<ExtensionFontFace>): ExtensionFontFamily;
    readText(relativePath: string): string;
    readJson<T = unknown>(relativePath: string): T;
    readBytes(relativePath: string): Uint8Array;
}

export interface NativeAssetRegistration {
    assetId: string;
    scriptId: string;
    generation: number;
    rootPath: string;
    manifestPath: string;
    filePath: string;
    mimeType: string;
    kind: ExtensionAssetKind;
}

export type ExtensionEventHandler<TPayload = unknown> = (payload: TPayload) => void | Promise<void>;

export type ExtensionEventErrorHandler = (eventName: string, error: unknown) => void;

export interface ScriptConsole {
    log: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
}

export interface ContextMenuConstructor {
    new (name: string, onClick: OnClickCallback, shouldAdd?: ShouldAddCallback, disabled?: boolean, types?: ContextMenuTypes): ContextMenu;
    /** Opens Spotify's native track, album, artist or playlist menu. */
    open(item: SpotifyUriInput, options?: ContextMenuOpenOptions): Promise<void>;
    /** Invokes the current Now Playing view's native menu action. */
    openNowPlaying(): Promise<void>;
}

export interface ContextMenuOpenOptions {
    /** Parent page URI, used by Spotify for context-dependent menu actions. */
    contextUri?: SpotifyUriInput;
}

export interface SideDrawerConstructor {
    /** Creates a side-drawer item. Transparent images work best for icons. */
    new (name: string, onClick: SideOnClickCallback, icon?: ExtensionAsset): SideDrawerItem;
    /** Opens Spotify's native drawer in the main activity. */
    open(): Promise<void>;
}

export type NavigationTarget = 'auto' | 'spotify' | 'external';

export type SpotifyUriInput = string | {
    uri: string;
};

export interface SearchResult {
    uri: string;
    text: string;
}

export interface SearchResponse {
    query: string;
    items: SearchResult[];
}

export interface SearchOptions {
    limit?: number;
    locale?: string;
}

export type RepeatMode = 'off' | 'repeat' | 'repeat-one';

export interface PlaybackState {
    contextUri: string;
    trackUri: string | null;
    isPlaying: boolean;
    isPaused: boolean;
    isBuffering: boolean;
    positionMs: number;
    shuffle: boolean;
    repeat: RepeatMode;
}

export interface ConnectDevice {
    id: string;
    name: string;
    type: string;
    isActive: boolean;
    isLocal: boolean;
    isDisabled: boolean;
    supportsVolume: boolean;
    /** Spotify's raw volume value (0–65535). */
    volume: number;
}

export interface SpotifyEvents {
    contextChanged: {
        uri: string;
        previousUri: string;
    };
    songChanged: {
        uri: string | null;
        previousUri: string | null;
    };
    playPause: {
        isPlaying: boolean;
        isPaused: boolean;
    };
    /** An acknowledged local seek, or a remote position discontinuity exceeding 1.5 seconds. */
    trackSeeked: {
        positionMs: number;
        previousPositionMs: number;
    };
    shuffleChanged: {
        enabled: boolean;
    };
    repeatChanged: {
        mode: RepeatMode;
    };
    deviceChanged: {
        device: ConnectDevice | null;
        previousDeviceId: string | null;
    };
}

export interface LibraryItem {
    uri: string;
    name: string;
    imageUri: string;
    pinned: boolean;
}

export interface SpotifyUser {
    username: string;
    displayName: string;
    uri: string;
    images: Array<{
        url: string;
        width: number;
        height: number;
    }>;
}

export interface Page<T> {
    items: T[];
    offset: number;
    limit: number;
    total: number;
}

export interface PageOptions {
    offset?: number;
    limit?: number;
}

export interface PlaylistItem {
    uri: string;
    rowId: string;
    name: string;
    addedAt: number;
}

export interface PlaylistPage extends Page<PlaylistItem> {
    uri: string;
    name: string;
    description: string;
    ownedBySelf: boolean;
    imageUri?: string;
}

export interface PlaylistsApi {
    get(playlist: SpotifyUriInput, options?: PageOptions): Promise<PlaylistPage>;
    create(name: string): {
        uri: string;
        name: string;
    };
    /** Removes the playlist from your library, matching Spotify's delete action. */
    delete(playlist: SpotifyUriInput): void;
    /** Moves a playlist before another playlist in your library; omitted means first. */
    move(playlist: SpotifyUriInput, before?: SpotifyUriInput): void;
    addTracks(playlist: SpotifyUriInput, tracks: SpotifyUriInput[]): void;
    /** Row IDs identify individual occurrences and come from get().items. */
    removeTracks(playlist: SpotifyUriInput, rowIds: string[]): void;
    /** Moves rows before beforeRowId; omitted means the end of the playlist. */
    moveTracks(playlist: SpotifyUriInput, rowIds: string[], beforeRowId?: string): void;
}

export interface LibraryApi {
    list(options?: PageOptions & {
        type?: 'all' | 'playlist' | 'album' | 'artist';
    }): Promise<Page<LibraryItem>>;
    save(items: SpotifyUriInput | SpotifyUriInput[]): void;
    remove(items: SpotifyUriInput | SpotifyUriInput[]): void;
    contains(items: SpotifyUriInput[]): boolean[];
    like(track: SpotifyUriInput): void;
    unlike(track: SpotifyUriInput): void;
    isLiked(track: SpotifyUriInput): boolean;
}

export interface QueueEntry {
    uri: string;
    uid: string;
    metadata: Record<string, string>;
}

export interface QueueSnapshot {
    revision: string;
    current: QueueEntry | null;
    next: QueueEntry[];
    previous: QueueEntry[];
}

export interface QueueApi {
    get(): QueueSnapshot;
    add(items: SpotifyUriInput | SpotifyUriInput[]): void;
    /** Removes one occurrence from snapshot.next. Throws if the queue revision changed. */
    remove(snapshot: QueueSnapshot, index: number): void;
    /** toIndex is the item's final zero-based index in next. */
    move(snapshot: QueueSnapshot, index: number, toIndex: number): void;
    /** Clears upcoming tracks, preserving the current track and playback history. */
    clear(snapshot: QueueSnapshot): void;
}

export interface NavigationOptions {
    /** Selects which app should handle the URI. Defaults to the best available app. */
    target?: NavigationTarget;
}

export interface NavigationApi {
    /** Opens any absolute URI, including web, Spotify, mail, phone, and map links. */
    open(uri: string, options?: NavigationOptions): boolean;
    /** Opens a Spotify URI or web link inside Spotify. */
    openSpotify(uri: string): boolean;
    /** Opens an HTTP or HTTPS URL in the user's default web browser. */
    openExternal(url: string): boolean;
    /** Navigates back from the current Spotify destination or overlay. */
    back(): boolean;
}

export interface AndroidBackButtonEvent {
    /** The scripted surface that was active when Android's back button was pressed. */
    surfaceId: string;
    /** Whether the default behavior of closing the scripted surface has been prevented. */
    readonly defaultPrevented: boolean;
    /** Keeps the scripted surface open so the extension can handle its own back navigation. */
    preventDefault(): void;
}

export interface ScriptGlobals {
    SpotifyPlus: SpotifyPlusApi;
    Elevated?: ElevatedSpotifyPlusApi;
    console: ScriptConsole;
    setTimeout: typeof setTimeout;
    setInterval: typeof setInterval;
    clearTimeout: typeof clearTimeout;
    clearInterval: typeof clearInterval;
    global: unknown;
    globalThis: unknown;
}

export interface FileStorageOperations {
    write(path: string, value: string): void;
    write<T = any>(path: string, value: T): void;
    write(path: string, data: Uint8Array | ArrayBuffer): void;
    read<T = any>(path: string): T | string | Uint8Array | null;
    delete(path: string): void;
}

export interface StorageApi extends FileStorageOperations {
    set(key: string, value: any): void;
    get<T = any>(key: string): T | null;
    remove(key: string): void;
    /** Temporary, extension-scoped storage backed by Android's cache directory. */
    Cache: FileStorageOperations;
}

/** Spotify state events are broadcast to every extension. Custom emits stay local. */
export interface ExtensionEventEmitterApi {
    on<K extends keyof SpotifyEvents>(eventName: K, handler: ExtensionEventHandler<SpotifyEvents[K]>): void;
    on<TPayload = unknown>(eventName: string, handler: ExtensionEventHandler<TPayload>): void;
    once<K extends keyof SpotifyEvents>(eventName: K, handler: ExtensionEventHandler<SpotifyEvents[K]>): void;
    once<TPayload = unknown>(eventName: string, handler: ExtensionEventHandler<TPayload>): void;
    off<TPayload = unknown>(eventName: string, handler: ExtensionEventHandler<TPayload>): void;
    emit<TPayload = unknown>(eventName: string, payload?: TPayload): Promise<void>;
}

export interface LocalExtensionInfo {
    id: string;
    name: string;
    version?: string;
    description?: string;
    author?: string;
    path: string;
    installedAt: string;
}

export interface ExtensionInstallFile {
    path: string;
    data: Uint8Array | ArrayBuffer;
}

export interface ExtensionInstallRequest {
    manifest: unknown;
    files: ExtensionInstallFile[];
}

export interface ElevatedSpotifyPlusApi {
    getUIExtensions(): Array<{
        id: string;
        name: string;
    }>;
    setUIExtensionOrder(order: string[]): void;
    getDeveloperMode(): boolean;
    setDeveloperMode(enabled: boolean): void;
    pickLocalExtensionsFolder(): boolean;
    getLocalExtensionsFolderDisplayName(): string | null;
    listLocalExtensions(): LocalExtensionInfo[];
    refreshLocalExtensions(): LocalExtensionInfo[];
    listInstalledExtensions(): LocalExtensionInfo[];
    installExtension(request: ExtensionInstallRequest): LocalExtensionInfo;
    uninstallExtension(extensionId: string): LocalExtensionInfo;
    settingsTest(): string;
    getExtensionSettings(): ExtensionSettings[];
    emitToExtension(extensionId: string, eventName: string, payload?: unknown): void;
    settingsChanged(extensionId: string, setting: ExtensionSetting): void;
}

export interface SpotifyPlusApi {
    UI: UIApi;
    Search: {
        search(query: string, options?: SearchOptions): Promise<SearchResponse>;
    };
    Connect: {
        getDevices(): ConnectDevice[];
        getCurrentDevice(): ConnectDevice | null;
        transfer(device: string | ConnectDevice): Promise<void>;
    };
    Playlists: PlaylistsApi;
    User: {
        getCurrent(): Promise<SpotifyUser>;
    };
    Library: LibraryApi;
    /** Queue entries retain Spotify's occurrence IDs, including duplicate tracks. */
    Queue: QueueApi;
    readonly scriptId: string;
    readonly version: number;
    log(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
    /** Handles the Android back button for this extension's active scripted surface. */
    on(eventName: 'android.backPressed', handler: (event: AndroidBackButtonEvent) => void | Promise<void>): void;
    on(eventName: string, handler: EventHandler): void;
    off(eventName: 'android.backPressed', handler: (event: AndroidBackButtonEvent) => void | Promise<void>): void;
    off(eventName: string, handler: EventHandler): void;
    request<TPayload = unknown>(name: string, payload?: unknown): Promise<TPayload>;
    toast(text: string, length?: 'short' | 'long'): void;
    /** @deprecated Use Navigation.open(uri) instead. */
    openUri(uri: string): void;
    emit(eventName: string, payload?: unknown): void;
    /** Receives Spotify state changes; custom events emitted here stay in this extension. */
    readonly Events: ExtensionEventEmitterApi;
    /** Resolves files bundled inside this extension. */
    Assets: ExtensionAssetsApi;
    /** Navigates within Spotify or hands links to another app. */
    Navigation: NavigationApi;
    /** Interacts with the user's device */
    Platform: {
        /** Android may return null while Spotify is not focused. */
        Clipboard: {
            readText(): string | null;
            writeText(text: string): void;
            clear(): void;
        };
        /** Contains information about the user's device and the current Spotify version */
        PlatformData: PlatformData;
        /** Contains information about the user's current Spotify session */
        Session: Session;
        /** Interacts with your script's storage and preferences */
        Storage: StorageApi;
    };
    /** Make internal Spotify API requests */
    Internal: {
        /**
         * Gets information about a track
         * @param uri The URI of the song
         * @async
         */
        getTrack(uri: string): Promise<SpotifyTrack | null>;
        /** Returns normalized album metadata, including artwork, discs and track URIs. */
        getAlbum(uri: SpotifyUriInput): Promise<MetadataAlbum | null>;
        /** Returns normalized artist metadata, including top-track and release URIs. */
        getArtist(uri: SpotifyUriInput): Promise<MetadataArtist | null>;
        /** Reads playlist-v2 metadata independently of Playlists.get() pagination. */
        getPlaylist(uri: SpotifyUriInput): Promise<MetadataPlaylist | null>;
    };
    /** Interacts with the Spotify player */
    Player: {
        /** Starts an album, playlist or artist at a zero-based index, or plays a track. */
        playContext(context: SpotifyUriInput, index?: number): Promise<void>;
        getState(): PlaybackState;
        setShuffle(enabled: boolean): void;
        toggleShuffle(): void;
        /** Cycles off -> context -> track -> off. */
        cycleRepeat(): void;
        setRepeat(mode: RepeatMode): void;
        /**
         * Gets the current track
         *
         * Not all information is available when using this method.
         *
         * Artists will always contain one element containing just the main artists
         *
         * Explicit will always return false
         *
         * Refer to the documentation at https://www.spotifyplus.dev/docs/script-basics/player for more information
         */
        getCurrentTrack(): SpotifyTrack;
        /** Gets the current playback position in milliseconds */
        getProgress(): number;
        /**
         * Skips to a given position in the song
         * @param position The position in the song to skip to in milliseconds
         */
        seek(position: number): void;
        /** Resumes playback of the current song */
        play(): void;
        /** Pauses playback of the current song */
        pause(): void;
        /** Toggles playback of the current song */
        togglePlay(): void;
        /**
         * Skips to the next song in the queue
         *
         * Available once Spotify's core player is initialized.
         * */
        skipNext(): void;
        /**
         * Skips to the beginning of the track or the previous song in the queue
         *
         * Available once Spotify's core player is initialized.
         */
        skipPrevious(): void;
    };
    /** Create custom UI using React */
    Surfaces: {
        /**
         * Register your React component inside of Spotify
         * @param surfaceType The surface that should trigger your React component to appear
         * @param renderer I honestly don't know what this is for
         */
        register(surfaceType: string, renderer: SurfaceRenderer<any>): void;
        /** Closes the scripted view currently shown by this extension. */
        close(): boolean;
    };
    Settings: {
        test(message: string): void;
        registerSetting(setting: ExtensionSettingSection): void;
        registerSettings(settings: ExtensionSettingSection[]): void;
    };
    ContextMenu: ContextMenuConstructor;
    SideDrawer: SideDrawerConstructor;
}

export declare const SpotifyPlus: SpotifyPlusApi;
