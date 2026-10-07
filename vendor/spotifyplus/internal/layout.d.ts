import React from "react";
import { type EasingFunction, type LayoutAnimation, type ReduceMotionSetting, type WorkletFunctionLike } from "./types";
export type LayoutAnimationCallback = (finished: boolean) => void;
export declare class LayoutAnimationBuilder implements LayoutAnimation {
    readonly name: string;
    readonly config: Readonly<Record<string, unknown>>;
    readonly __spotifyPlusLayoutAnimation: true;
    constructor(name: string, config?: Readonly<Record<string, unknown>>);
    private withConfig;
    duration(durationMs: number): LayoutAnimationBuilder;
    delay(delayMs: number): LayoutAnimationBuilder;
    randomDelay(maxDelayMs?: number): LayoutAnimationBuilder;
    easing(value: EasingFunction): LayoutAnimationBuilder;
    easingX(value: EasingFunction): LayoutAnimationBuilder;
    easingY(value: EasingFunction): LayoutAnimationBuilder;
    easingWidth(value: EasingFunction): LayoutAnimationBuilder;
    easingHeight(value: EasingFunction): LayoutAnimationBuilder;
    springify(durationMs?: number): LayoutAnimationBuilder;
    damping(value: number): LayoutAnimationBuilder;
    dampingRatio(value: number): LayoutAnimationBuilder;
    mass(value: number): LayoutAnimationBuilder;
    stiffness(value: number): LayoutAnimationBuilder;
    overshootClamping(value?: boolean): LayoutAnimationBuilder;
    energyThreshold(value: number): LayoutAnimationBuilder;
    rotate(degrees: string | number): LayoutAnimationBuilder;
    perspective(value: number): LayoutAnimationBuilder;
    reverse(value?: boolean): LayoutAnimationBuilder;
    entering(value: LayoutAnimation): LayoutAnimationBuilder;
    exiting(value: LayoutAnimation): LayoutAnimationBuilder;
    reduceMotion(value: ReduceMotionSetting): LayoutAnimationBuilder;
    withInitialValues(values: Readonly<Record<string, unknown>>): LayoutAnimationBuilder;
    withCallback(callback: WorkletFunctionLike<LayoutAnimationCallback>): LayoutAnimationBuilder;
    build(): this;
}
export declare class Keyframe extends LayoutAnimationBuilder {
    constructor(definitions: Readonly<Record<string, Readonly<Record<string, unknown>>>>);
}
export declare const BounceIn: LayoutAnimationBuilder;
export declare const BounceInDown: LayoutAnimationBuilder;
export declare const BounceInLeft: LayoutAnimationBuilder;
export declare const BounceInRight: LayoutAnimationBuilder;
export declare const BounceInUp: LayoutAnimationBuilder;
export declare const BounceOut: LayoutAnimationBuilder;
export declare const BounceOutDown: LayoutAnimationBuilder;
export declare const BounceOutLeft: LayoutAnimationBuilder;
export declare const BounceOutRight: LayoutAnimationBuilder;
export declare const BounceOutUp: LayoutAnimationBuilder;
export declare const FadeIn: LayoutAnimationBuilder;
export declare const FadeInDown: LayoutAnimationBuilder;
export declare const FadeInDownBig: LayoutAnimationBuilder;
export declare const FadeInLeft: LayoutAnimationBuilder;
export declare const FadeInLeftBig: LayoutAnimationBuilder;
export declare const FadeInRight: LayoutAnimationBuilder;
export declare const FadeInRightBig: LayoutAnimationBuilder;
export declare const FadeInUp: LayoutAnimationBuilder;
export declare const FadeInUpBig: LayoutAnimationBuilder;
export declare const FadeOut: LayoutAnimationBuilder;
export declare const FadeOutDown: LayoutAnimationBuilder;
export declare const FadeOutDownBig: LayoutAnimationBuilder;
export declare const FadeOutLeft: LayoutAnimationBuilder;
export declare const FadeOutLeftBig: LayoutAnimationBuilder;
export declare const FadeOutRight: LayoutAnimationBuilder;
export declare const FadeOutRightBig: LayoutAnimationBuilder;
export declare const FadeOutUp: LayoutAnimationBuilder;
export declare const FadeOutUpBig: LayoutAnimationBuilder;
export declare const FlipInEasyX: LayoutAnimationBuilder;
export declare const FlipInEasyY: LayoutAnimationBuilder;
export declare const FlipInXDown: LayoutAnimationBuilder;
export declare const FlipInXUp: LayoutAnimationBuilder;
export declare const FlipInYLeft: LayoutAnimationBuilder;
export declare const FlipInYRight: LayoutAnimationBuilder;
export declare const FlipOutEasyX: LayoutAnimationBuilder;
export declare const FlipOutEasyY: LayoutAnimationBuilder;
export declare const FlipOutXDown: LayoutAnimationBuilder;
export declare const FlipOutXUp: LayoutAnimationBuilder;
export declare const FlipOutYLeft: LayoutAnimationBuilder;
export declare const FlipOutYRight: LayoutAnimationBuilder;
export declare const LightSpeedInLeft: LayoutAnimationBuilder;
export declare const LightSpeedInRight: LayoutAnimationBuilder;
export declare const LightSpeedOutLeft: LayoutAnimationBuilder;
export declare const LightSpeedOutRight: LayoutAnimationBuilder;
export declare const PinwheelIn: LayoutAnimationBuilder;
export declare const PinwheelOut: LayoutAnimationBuilder;
export declare const RollInLeft: LayoutAnimationBuilder;
export declare const RollInRight: LayoutAnimationBuilder;
export declare const RollOutLeft: LayoutAnimationBuilder;
export declare const RollOutRight: LayoutAnimationBuilder;
export declare const RotateInDownLeft: LayoutAnimationBuilder;
export declare const RotateInDownRight: LayoutAnimationBuilder;
export declare const RotateInUpLeft: LayoutAnimationBuilder;
export declare const RotateInUpRight: LayoutAnimationBuilder;
export declare const RotateOutDownLeft: LayoutAnimationBuilder;
export declare const RotateOutDownRight: LayoutAnimationBuilder;
export declare const RotateOutUpLeft: LayoutAnimationBuilder;
export declare const RotateOutUpRight: LayoutAnimationBuilder;
export declare const SlideInDown: LayoutAnimationBuilder;
export declare const SlideInLeft: LayoutAnimationBuilder;
export declare const SlideInRight: LayoutAnimationBuilder;
export declare const SlideInUp: LayoutAnimationBuilder;
export declare const SlideOutDown: LayoutAnimationBuilder;
export declare const SlideOutLeft: LayoutAnimationBuilder;
export declare const SlideOutRight: LayoutAnimationBuilder;
export declare const SlideOutUp: LayoutAnimationBuilder;
export declare const StretchInX: LayoutAnimationBuilder;
export declare const StretchInY: LayoutAnimationBuilder;
export declare const StretchOutX: LayoutAnimationBuilder;
export declare const StretchOutY: LayoutAnimationBuilder;
export declare const ZoomIn: LayoutAnimationBuilder;
export declare const ZoomInDown: LayoutAnimationBuilder;
export declare const ZoomInEasyDown: LayoutAnimationBuilder;
export declare const ZoomInEasyUp: LayoutAnimationBuilder;
export declare const ZoomInLeft: LayoutAnimationBuilder;
export declare const ZoomInRight: LayoutAnimationBuilder;
export declare const ZoomInRotate: LayoutAnimationBuilder;
export declare const ZoomInUp: LayoutAnimationBuilder;
export declare const ZoomOut: LayoutAnimationBuilder;
export declare const ZoomOutDown: LayoutAnimationBuilder;
export declare const ZoomOutEasyDown: LayoutAnimationBuilder;
export declare const ZoomOutEasyUp: LayoutAnimationBuilder;
export declare const ZoomOutLeft: LayoutAnimationBuilder;
export declare const ZoomOutRight: LayoutAnimationBuilder;
export declare const ZoomOutRotate: LayoutAnimationBuilder;
export declare const ZoomOutUp: LayoutAnimationBuilder;
export declare const Layout: LayoutAnimationBuilder;
export declare const LinearTransition: LayoutAnimationBuilder;
export declare const SequencedTransition: LayoutAnimationBuilder;
export declare const FadingTransition: LayoutAnimationBuilder;
export declare const JumpingTransition: LayoutAnimationBuilder;
export declare const CurvedTransition: LayoutAnimationBuilder;
export declare const EntryExitTransition: LayoutAnimationBuilder;
export declare const SharedTransition: LayoutAnimationBuilder;
export interface LayoutAnimationConfigProps {
    children?: React.ReactNode;
    skipEntering?: boolean;
    skipExiting?: boolean;
}
export interface LayoutAnimationBoundary {
    readonly skipEntering: boolean;
    readonly skipExiting: boolean;
}
export declare function LayoutAnimationConfig({ children, skipEntering, skipExiting, }: LayoutAnimationConfigProps): React.FunctionComponentElement<React.ProviderProps<LayoutAnimationBoundary>>;
export declare function useLayoutAnimationBoundary(): LayoutAnimationBoundary;
export type CSSKeyframeSelector = "from" | "to" | `${number}%`;
export type CSSAnimationKeyframes = Readonly<Partial<Record<CSSKeyframeSelector, Readonly<Record<string, unknown>>>>>;
export interface CSSKeyframesRule {
    readonly __spotifyPlusCSSKeyframes: true;
    readonly frames: CSSAnimationKeyframes;
}
export interface CSSAnimationProperties {
    animationName?: CSSKeyframesRule | string | readonly (CSSKeyframesRule | string)[];
    animationDuration?: number | string | readonly (number | string)[];
    animationDelay?: number | string | readonly (number | string)[];
    animationTimingFunction?: CSSTimingFunction | readonly CSSTimingFunction[];
    animationIterationCount?: number | "infinite" | readonly (number | "infinite")[];
    animationDirection?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    animationFillMode?: "none" | "forwards" | "backwards" | "both";
    animationPlayState?: "running" | "paused";
}
export interface CSSTransitionProperties {
    transitionProperty?: string | readonly string[] | "all" | "none";
    transitionDuration?: number | string | readonly (number | string)[];
    transitionDelay?: number | string | readonly (number | string)[];
    transitionTimingFunction?: CSSTimingFunction | readonly CSSTimingFunction[];
    transitionBehavior?: "normal" | "allow-discrete";
}
export type CSSProperties = CSSAnimationProperties & CSSTransitionProperties & Readonly<Record<string, unknown>>;
export interface CSSTimingFunction {
    readonly type: "linear" | "cubicBezier" | "steps";
    readonly values: readonly number[];
    readonly stepPosition?: "jump-start" | "jump-end" | "jump-none" | "jump-both" | "start" | "end";
}
export declare function createKeyframes(frames: CSSAnimationKeyframes): CSSKeyframesRule;
export declare function cubicBezier(x1: number, y1: number, x2: number, y2: number): CSSTimingFunction;
export declare function linear(...points: number[]): CSSTimingFunction;
export declare function steps(count: number, position?: CSSTimingFunction["stepPosition"]): CSSTimingFunction;
export declare const CSS: {
    keyframes: typeof createKeyframes;
    cubicBezier: typeof cubicBezier;
    linear: typeof linear;
    steps: typeof steps;
};
export declare const CSSAnimationEasing: {
    linear: CSSTimingFunction;
    ease: CSSTimingFunction;
    easeIn: CSSTimingFunction;
    easeOut: CSSTimingFunction;
    easeInOut: CSSTimingFunction;
};
export declare const DefaultLayoutEasing: EasingFunction;
