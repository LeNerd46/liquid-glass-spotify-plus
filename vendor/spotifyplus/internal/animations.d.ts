import { type AnimatableValue, type Animation, type AnimationCallback, type AnimationDefinition, type ClampConfig, type DecayConfig, type EasingFunction, type ReduceMotionSetting, type SerializedWorklet, type SpringConfig, type TimingConfig, type WorkletFunctionLike } from "./types";
export declare const Easing: {
    linear: EasingFunction;
    ease: EasingFunction;
    quad: EasingFunction;
    cubic: EasingFunction;
    poly(power: number): EasingFunction;
    sin: EasingFunction;
    circle: EasingFunction;
    exp: EasingFunction;
    elastic(bounciness?: number): EasingFunction;
    back(overshoot?: number): EasingFunction;
    bounce: EasingFunction;
    bezier(x1: number, y1: number, x2: number, y2: number): EasingFunction;
    bezierFn(x1: number, y1: number, x2: number, y2: number): EasingFunction;
    steps(count: number, roundToNextStep?: boolean): EasingFunction;
    in(value: EasingFunction): EasingFunction;
    out(value: EasingFunction): EasingFunction;
    inOut(value: EasingFunction): EasingFunction;
};
export declare function isAnimation(value: unknown): value is AnimationDefinition;
export declare function withTiming<Value extends AnimatableValue>(toValue: Value, config?: TimingConfig, callback?: WorkletFunctionLike<AnimationCallback>): Value;
export declare function withSpring<Value extends AnimatableValue>(toValue: Value, config?: SpringConfig, callback?: WorkletFunctionLike<AnimationCallback>): Value;
export declare function withDecay(config?: DecayConfig, callback?: WorkletFunctionLike<AnimationCallback>): number;
export declare function withDelay<Value extends AnimatableValue>(delayMs: number, delayedAnimation: Value, reduceMotion?: ReduceMotionSetting): Value;
export declare function withRepeat<Value extends AnimatableValue>(repeatedAnimation: Value, numberOfReps?: number, reverse?: boolean, callback?: WorkletFunctionLike<AnimationCallback>, reduceMotion?: ReduceMotionSetting): Value;
export declare function withSequence<Value extends AnimatableValue>(...animations: Value[]): Value;
export declare function withSequence<Value extends AnimatableValue>(reduceMotion: ReduceMotionSetting, ...animations: Value[]): Value;
export declare function withClamp<Value extends AnimatableValue>(config: ClampConfig, clampedAnimation: Value): Value;
export interface CustomAnimationState<Value extends AnimatableValue> {
    current: Value;
    callback?: SerializedWorklet<AnimationCallback>;
    onStart?: WorkletFunctionLike<(animation: CustomAnimationState<Value>, value: Value, now: number, previousAnimation: CustomAnimationState<Value> | null) => void>;
    onFrame: WorkletFunctionLike<(animation: CustomAnimationState<Value>, now: number) => boolean>;
}
export declare function defineAnimation<Value extends AnimatableValue>(startingValue: Value, factory: WorkletFunctionLike<() => CustomAnimationState<Value>>): Animation<Value>;
export declare function withCustomAnimation<Value extends AnimatableValue>(startingValue: Value, factory: WorkletFunctionLike<() => CustomAnimationState<Value>>): Animation<Value>;
