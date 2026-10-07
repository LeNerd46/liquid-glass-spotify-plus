import type { NativeAnimationAdapter } from "./types";
/**
 * Deterministic JS fallback used by the SDK and tests. It provides live mutable
 * values and scheduling, but intentionally does not claim UI, event, or view support.
 */
export declare function createJavaScriptAnimationAdapter(): NativeAnimationAdapter;
