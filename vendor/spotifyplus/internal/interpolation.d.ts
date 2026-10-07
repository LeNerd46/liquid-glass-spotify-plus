import { type InterpolateOptions } from "./types";
export type ColorSpace = "RGB" | "HSV" | "LAB";
export interface InterpolateRGBOptions {
    gamma?: number;
}
export interface InterpolateHSVOptions {
    useCorrectedHSVInterpolation?: boolean;
}
export type InterpolateColorOptions = InterpolateRGBOptions & InterpolateHSVOptions;
export declare function clamp(value: number, minimum: number, maximum: number): number;
export declare function interpolate(value: number, inputRange: readonly number[], outputRange: readonly number[], options?: InterpolateOptions): number;
export declare function interpolateColor(value: number, inputRange: readonly number[], outputRange: readonly (string | number)[], colorSpace?: ColorSpace, options?: InterpolateColorOptions): string | number;
export declare function processColor(value: string | number): number | null;
export declare function convertToRGBA(value: string | number): readonly [number, number, number, number];
export declare function contrastColor(value: string | number): "white" | "black";
export interface DynamicColorIOSConfig {
    light: string | number;
    dark: string | number;
    highContrastLight?: string | number;
    highContrastDark?: string | number;
}
export declare function DynamicColorIOS(_config: DynamicColorIOSConfig): never;
