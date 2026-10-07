import type { AnimatedRuntimeScope, Animation, DerivedValue, MeasuredDimensions, NativeAnimationAdapter, NativeSourceRegistration, NativeViewBinding, NativeWorkletRegistration, SharedValue, WorkletFunctionLike, WorkletRuntimeHandle } from "./types";
import { SHARED_VALUE_KEY, type SharedValueMarker } from "./types";
export declare class MutableValue<Value> implements SharedValue<Value> {
    readonly id: number;
    private readonly runtime;
    readonly [SHARED_VALUE_KEY]: SharedValueMarker;
    private current;
    private readonly listeners;
    private nativeSubscription?;
    private disposed;
    constructor(id: number, runtime: AnimatedRuntime, initial: Value);
    get value(): Value;
    set value(next: Value | Animation<Value>);
    get(): Value;
    set(next: Value | Animation<Value> | ((current: Value) => Value)): void;
    modify(modifier?: (current: Value) => Value, forceUpdate?: boolean): void;
    addListener(listenerId: number, listener: (value: Value) => void): void;
    removeListener(listenerId: number): void;
    dispose(): void;
    private ensureNativeSubscription;
    private notify;
    private assertActive;
}
export declare class DerivedValueView<Value> implements DerivedValue<Value> {
    readonly mutable: MutableValue<Value>;
    readonly [SHARED_VALUE_KEY]: SharedValueMarker & {
        readonly derived: true;
    };
    constructor(mutable: MutableValue<Value>);
    get value(): Value;
    get(): Value;
    addListener(listenerId: number, listener: (value: Value) => void): void;
    removeListener(listenerId: number): void;
}
export declare class AnimatedRuntime {
    readonly adapter: NativeAnimationAdapter;
    readonly scope: AnimatedRuntimeScope;
    readonly runtimeId: string;
    private readonly mutableIds;
    private readonly workletIds;
    private readonly sourceIds;
    private readonly customRuntimes;
    private disposed;
    constructor(adapter: NativeAnimationAdapter, scope: AnimatedRuntimeScope);
    allocateId(): number;
    makeMutable<Value>(initial: Value): MutableValue<Value>;
    releaseMutable(id: number): void;
    registerWorklet(registration: NativeWorkletRegistration): void;
    updateWorklet(registration: NativeWorkletRegistration): void;
    unregisterWorklet(id: number): void;
    setWorkletActive(id: number, active: boolean): void;
    registerSource(registration: NativeSourceRegistration): void;
    unregisterSource(id: number): void;
    bindView(binding: NativeViewBinding): void;
    unbindView(viewTag: number): void;
    resolveViewTag(ref: unknown): number | null;
    scheduleOnUI<Args extends unknown[]>(worklet: WorkletFunctionLike<(...args: Args) => unknown>, args: Args): void;
    executeOnUISync<Args extends unknown[], Result>(worklet: WorkletFunctionLike<(...args: Args) => Result>, args: Args): Result;
    scheduleOnRN<Args extends unknown[]>(fn: (...args: Args) => unknown, args: Args): void;
    cancelAnimation<Value>(sharedValue: SharedValue<Value>): void;
    getTimestamp(): number;
    measure(ref: unknown): MeasuredDimensions | null;
    scrollTo(ref: unknown, x: number, y: number, animated: boolean): void;
    dispatchCommand(ref: unknown, command: string, args?: readonly unknown[]): void;
    setNativeProps(ref: unknown, props: Readonly<Record<string, unknown>>): void;
    getViewProp<Value>(ref: unknown, propName: string): Value;
    createWorkletRuntime(name: string, initializer?: WorkletFunctionLike<() => void>): WorkletRuntimeHandle;
    scheduleOnRuntime<Args extends unknown[]>(runtime: WorkletRuntimeHandle, worklet: WorkletFunctionLike<(...args: Args) => unknown>, args: Args): void;
    enableLayoutAnimations(enabled?: boolean): void;
    dispose(): void;
    private requireViewTag;
    private assertWorkletGlobals;
    private getMutableId;
    assertActive(): void;
}
export declare function createAnimatedRuntime(adapter: NativeAnimationAdapter, scope: AnimatedRuntimeScope): AnimatedRuntime;
