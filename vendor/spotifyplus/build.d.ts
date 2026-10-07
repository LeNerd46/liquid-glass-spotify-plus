import type { Plugin } from "esbuild";

export interface SpotifyPlusWorkletTransformOptions {
    filename?: string;
    globals?: readonly string[];
    inlineSourceMap?: boolean;
    rootDir?: string;
    onWorklet?: (metadata: Readonly<Record<string, unknown>>) => void;
}

export interface SpotifyPlusWorkletsPluginOptions {
    globals?: readonly string[];
    rootDir?: string;
    transformDependencies?: boolean;
}

export declare const SPOTIFYPLUS_WORKLET_VERSION: 2;
export declare const SPOTIFYPLUS_WORKLET_BUNDLE_MARKER: string;
export declare const SPOTIFYPLUS_ANIMATED_MODULE: string;
export declare const SPOTIFYPLUS_GESTURE_MODULE: string;
export declare function transformWorklets(source: string, options?: SpotifyPlusWorkletTransformOptions): Promise<{
    code: string;
    map: Record<string, unknown> | null;
    workletCount: number;
    worklets: readonly Readonly<Record<string, unknown>>[];
}>;
export declare function spotifyPlusWorkletsPlugin(options?: SpotifyPlusWorkletsPluginOptions): Plugin;
