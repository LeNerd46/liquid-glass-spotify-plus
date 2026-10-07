import React from "react";
import type { AnimatedRuntimeScope, NativeAnimationAdapter, SerializedWorklet, WorkletFunctionLike } from "./types";
export declare const GESTURE_MARKER_KEY: "__spotifyPlusGesture";
export declare enum Directions {
    RIGHT = 1,
    LEFT = 2,
    UP = 4,
    DOWN = 8
}
export declare enum MouseButton {
    LEFT = 1,
    RIGHT = 2,
    MIDDLE = 4,
    BUTTON_4 = 8,
    BUTTON_5 = 16,
    ALL = 31
}
export declare enum GestureState {
    UNDETERMINED = 0,
    FAILED = 1,
    BEGAN = 2,
    CANCELLED = 3,
    ACTIVE = 4,
    END = 5
}
export interface GestureTouchEvent {
    id: number;
    x: number;
    y: number;
    absoluteX: number;
    absoluteY: number;
}
export interface GestureEvent {
    handlerTag: number;
    state: GestureState;
    numberOfPointers: number;
    x: number;
    y: number;
    absoluteX: number;
    absoluteY: number;
    velocityX?: number;
    velocityY?: number;
    translationX?: number;
    translationY?: number;
    scale?: number;
    focalX?: number;
    focalY?: number;
    rotation?: number;
    anchorX?: number;
    anchorY?: number;
    duration?: number;
}
export type GestureCallback<Event extends GestureEvent = GestureEvent> = (event: Event) => void;
export type GestureEndCallback<Event extends GestureEvent = GestureEvent> = (event: Event, success: boolean) => void;
type GestureCallbackName = "onBegin" | "onStart" | "onUpdate" | "onChange" | "onEnd" | "onFinalize" | "onTouchesDown" | "onTouchesMove" | "onTouchesUp" | "onTouchesCancelled";
export interface SerializedGesture {
    readonly [GESTURE_MARKER_KEY]: true;
    readonly type: string;
    readonly config: Readonly<Record<string, unknown>>;
    readonly callbacks: Readonly<Record<string, SerializedWorklet>>;
    readonly children?: readonly SerializedGesture[];
    readonly registration?: {
        readonly version: 2;
        readonly scriptId: string;
        readonly generation: string | number;
        readonly id: number;
    };
}
export declare abstract class BaseGesture<Event extends GestureEvent = GestureEvent> {
    readonly type: string;
    readonly [GESTURE_MARKER_KEY]: true;
    readonly gestureConfig: Record<string, unknown>;
    readonly gestureCallbacks: Map<GestureCallbackName, any>;
    protected constructor(type: string);
    enabled(value: boolean): this;
    shouldCancelWhenOutside(value: boolean): this;
    hitSlop(value: number | Readonly<Record<string, number>>): this;
    runOnJS(value: boolean): this;
    withTestId(testId: string): this;
    cancelsTouchesInView(value: boolean): this;
    simultaneousWithExternalGesture(...gestures: BaseGesture[]): this;
    requireExternalGestureToFail(...gestures: BaseGesture[]): this;
    blocksExternalGesture(...gestures: BaseGesture[]): this;
    onBegin(callback: WorkletFunctionLike<GestureCallback<Event>>): this;
    onStart(callback: WorkletFunctionLike<GestureCallback<Event>>): this;
    onUpdate(callback: WorkletFunctionLike<GestureCallback<Event>>): this;
    onChange(callback: WorkletFunctionLike<GestureCallback<Event>>): this;
    onEnd(callback: WorkletFunctionLike<GestureEndCallback<Event>>): this;
    onFinalize(callback: WorkletFunctionLike<GestureEndCallback<Event>>): this;
    onTouchesDown(callback: WorkletFunctionLike<GestureCallback<Event>>): this;
    onTouchesMove(callback: WorkletFunctionLike<GestureCallback<Event>>): this;
    onTouchesUp(callback: WorkletFunctionLike<GestureCallback<Event>>): this;
    onTouchesCancelled(callback: WorkletFunctionLike<GestureCallback<Event>>): this;
    option(name: string, value: unknown): this;
    callback(name: GestureCallbackName, callback: WorkletFunctionLike<any>): this;
    serialize(): SerializedGesture;
}
declare class TapGesture extends BaseGesture {
    constructor();
    minPointers(value: number): this;
    maxDuration(value: number): this;
    maxDelay(value: number): this;
    numberOfTaps(value: number): this;
    maxDistance(value: number): this;
    maxDeltaX(value: number): this;
    maxDeltaY(value: number): this;
}
declare class PanGesture extends BaseGesture {
    constructor();
    minDistance(value: number): this;
    minPointers(value: number): this;
    maxPointers(value: number): this;
    activeOffsetX(value: number | readonly [number, number]): this;
    activeOffsetY(value: number | readonly [number, number]): this;
    failOffsetX(value: number | readonly [number, number]): this;
    failOffsetY(value: number | readonly [number, number]): this;
    averageTouches(value: boolean): this;
    enableTrackpadTwoFingerGesture(value: boolean): this;
    activateAfterLongPress(value: number): this;
    mouseButton(value: MouseButton): this;
}
declare class LongPressGesture extends BaseGesture {
    constructor();
    minDuration(value: number): this;
    maxDistance(value: number): this;
    numberOfPointers(value: number): this;
    mouseButton(value: MouseButton): this;
}
declare class FlingGesture extends BaseGesture {
    constructor();
    direction(value: Directions): this;
    numberOfPointers(value: number): this;
    mouseButton(value: MouseButton): this;
}
declare class PinchGesture extends BaseGesture {
    constructor();
}
declare class RotationGesture extends BaseGesture {
    constructor();
}
declare class NativeGesture extends BaseGesture {
    constructor();
    shouldActivateOnStart(value: boolean): this;
    disallowInterruption(value: boolean): this;
}
declare class ManualGesture extends BaseGesture {
    constructor();
}
declare class ComposedGesture extends BaseGesture {
    readonly gestures: readonly BaseGesture[];
    constructor(type: "race" | "simultaneous" | "exclusive", gestures: readonly BaseGesture[]);
    serialize(): SerializedGesture;
}
export declare function isGesture(value: unknown): value is BaseGesture | SerializedGesture;
export declare function serializeGesture(value: BaseGesture | SerializedGesture): SerializedGesture;
export declare const Gesture: {
    Tap: () => TapGesture;
    Pan: () => PanGesture;
    LongPress: () => LongPressGesture;
    Fling: () => FlingGesture;
    Pinch: () => PinchGesture;
    Rotation: () => RotationGesture;
    Native: () => NativeGesture;
    Manual: () => ManualGesture;
    Race: (...gestures: BaseGesture[]) => ComposedGesture;
    Simultaneous: (...gestures: BaseGesture[]) => ComposedGesture;
    Exclusive: (...gestures: BaseGesture[]) => ComposedGesture;
};
export interface GestureDetectorProps {
    gesture: BaseGesture | SerializedGesture;
    children: React.ReactElement;
}
export type GestureDetectorComponent = React.ComponentType<GestureDetectorProps>;
export declare function createGestureDetector(adapter: NativeAnimationAdapter, scope: AnimatedRuntimeScope, allocateId?: () => number): GestureDetectorComponent;
export declare const GestureDetector: GestureDetectorComponent;
export declare function createGestureModule(adapter: NativeAnimationAdapter, scope: AnimatedRuntimeScope): {
    Gesture: {
        Tap: () => TapGesture;
        Pan: () => PanGesture;
        LongPress: () => LongPressGesture;
        Fling: () => FlingGesture;
        Pinch: () => PinchGesture;
        Rotation: () => RotationGesture;
        Native: () => NativeGesture;
        Manual: () => ManualGesture;
        Race: (...gestures: BaseGesture[]) => ComposedGesture;
        Simultaneous: (...gestures: BaseGesture[]) => ComposedGesture;
        Exclusive: (...gestures: BaseGesture[]) => ComposedGesture;
    };
    GestureDetector: GestureDetectorComponent;
    Directions: typeof Directions;
    MouseButton: typeof MouseButton;
    GestureState: typeof GestureState;
};
export {};
