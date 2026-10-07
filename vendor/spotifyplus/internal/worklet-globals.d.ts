import type { WorkletGlobalsManifest } from "./types";
/**
 * Allowlist understood by the compiler and UI-runtime bootstrap. The native
 * adapter must install these names before evaluating worklets whose metadata
 * contains `globals`. This avoids attempting to serialize external SDK modules.
 */
export declare const WORKLET_GLOBAL_EXPORTS: readonly ["ReduceMotion", "Extrapolation", "RuntimeKind", "SensorType", "KeyboardState", "createAnimatedPropAdapter", "Easing", "clamp", "interpolate", "interpolateColor", "contrastColor", "processColor", "convertToRGBA", "DynamicColorIOS", "withTiming", "withSpring", "withDecay", "withDelay", "withRepeat", "withSequence", "withClamp", "defineAnimation", "withCustomAnimation", "isAnimation", "isSharedValue", "isWorkletFunction", "cancelAnimation", "scheduleOnRN", "runOnJS", "scheduleOnUI", "runOnUI", "scheduleOnRuntime", "measure", "scrollTo", "dispatchCommand", "setNativeProps", "getViewProp", "getRelativeCoords", "getTimestamp", "getRuntimeKind"];
export type WorkletGlobalExport = typeof WORKLET_GLOBAL_EXPORTS[number];
export declare const WORKLET_GLOBALS_MANIFEST: WorkletGlobalsManifest;
export declare function isAllowedWorkletGlobal(name: string): name is WorkletGlobalExport;
