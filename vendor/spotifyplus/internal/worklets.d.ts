import { type SerializedWorklet, type WorkletFunction, type WorkletMetadata, type WorkletRuntimeHandle } from "./types";
export declare class UnsupportedPlatformError extends Error {
    readonly feature: string;
    readonly adapterName?: string;
    constructor(feature: string, adapterName?: string);
}
export declare class WorkletValidationError extends Error {
    readonly apiName: string;
    constructor(apiName: string, detail: string);
}
export declare enum RuntimeKind {
    ReactNative = "reactNative",
    UI = "ui",
    Worker = "worker"
}
export declare function getWorkletMetadata(value: unknown): WorkletMetadata | null;
export declare function isWorkletFunction(value: unknown): value is WorkletFunction;
export declare function validateWorklet<T extends (...args: any[]) => any>(value: T, apiName: string): asserts value is WorkletFunction<T>;
export declare function serializeWorklet<T extends (...args: any[]) => any>(value: T, apiName: string): SerializedWorklet<T>;
/** Marks facade-owned helper functions. User code should rely on the build transform instead. */
export declare function createInternalWorklet<T extends (...args: any[]) => any>(fn: T, closure?: Readonly<Record<string, unknown>>, location?: string, globals?: Readonly<Record<string, string>>): WorkletFunction<T>;
export declare function isWorkletRuntime(value: unknown): value is WorkletRuntimeHandle;
export declare function getRuntimeKind(): RuntimeKind;
