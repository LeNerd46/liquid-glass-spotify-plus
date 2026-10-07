import React from "react";
export type EndCallback = (result: {
    finished: boolean;
}) => void;
export type EasingFunction = (value: number) => number;
export type ExtrapolateType = "extend" | "clamp" | "identity";
export type AnimatedNodeLike = AnimatedNode;
export type ListenerCallback = (state: {
    value: number;
}) => void;
export type AnimationConfig = {
    useNativeDriver?: boolean;
    isInteraction?: boolean;
    delay?: number;
};
export type TimingAnimationConfig = AnimationConfig & {
    toValue: number | Value;
    duration?: number;
    easing?: EasingFunction;
};
export type SpringAnimationConfig = AnimationConfig & {
    toValue: number | Value;
    velocity?: number;
    tension?: number;
    friction?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
    overshootClamping?: boolean;
    restSpeedThreshold?: number;
    restDisplacementThreshold?: number;
    duration?: number;
};
export type DecayAnimationConfig = AnimationConfig & {
    velocity: number;
    deceleration?: number;
};
export type InterpolationConfig = {
    inputRange: number[];
    outputRange: Array<number | string>;
    easing?: EasingFunction;
    extrapolate?: ExtrapolateType;
    extrapolateLeft?: ExtrapolateType;
    extrapolateRight?: ExtrapolateType;
};
export type CompositeAnimation = {
    start(callback?: EndCallback): void;
    stop(): void;
    reset(): void;
};
type Binding = {
    id: number;
    nodeId: number;
    prop: string;
    node: AnimatedNode;
};
type RunningAnimation = {
    stop(): void;
    reset?(): void;
};
export declare abstract class AnimatedNode {
    readonly __isSpotifyPlusAnimatedNode = true;
    protected bindings: Set<Binding>;
    protected children: Set<AnimatedNode>;
    protected listeners: Map<string, ListenerCallback>;
    abstract __getValue(): any;
    __attachChild(child: AnimatedNode): void;
    __detachChild(child: AnimatedNode): void;
    __addBinding(binding: Binding): void;
    __removeBinding(binding: Binding): void;
    __getValueAtRoot(root: Value, rootValue: number): any;
    __collectBindings(out: Binding[]): void;
    __notify(): void;
    addListener(callback: ListenerCallback): string;
    removeListener(id: string): void;
    removeAllListeners(): void;
    interpolate(config: InterpolationConfig): AnimatedInterpolation;
}
export declare class Value extends AnimatedNode {
    private value;
    private offset;
    private animation;
    constructor(value: number);
    __getValue(): number;
    __getOffset(): number;
    __setValue(value: number, notify?: boolean): void;
    __getValueAtRoot(root: Value, rootValue: number): any;
    __stopCurrentAnimation(): void;
    __setRunningAnimation(animation: RunningAnimation | null): void;
    setValue(value: number): void;
    setOffset(offset: number): void;
    flattenOffset(): void;
    extractOffset(): void;
    stopAnimation(callback?: (value: number) => void): void;
    resetAnimation(callback?: (value: number) => void): void;
}
declare class AnimatedInterpolation extends AnimatedNode {
    private parent;
    private config;
    constructor(parent: AnimatedNode, config: InterpolationConfig);
    __getValue(): string | number;
    __getValueAtRoot(root: Value, rootValue: number): any;
}
declare class AnimatedBinaryOp extends AnimatedNode {
    private left;
    private right;
    private op;
    constructor(left: number | AnimatedNode, right: number | AnimatedNode, op: (a: number, b: number) => number);
    __getValue(): number;
    __getValueAtRoot(root: Value, rootValue: number): any;
}
export declare class ValueXY {
    x: Value;
    y: Value;
    constructor(value?: {
        x?: number;
        y?: number;
    });
    setValue(value: {
        x: number;
        y: number;
    }): void;
    setOffset(value: {
        x: number;
        y: number;
    }): void;
    flattenOffset(): void;
    extractOffset(): void;
    stopAnimation(callback?: (value: {
        x: number;
        y: number;
    }) => void): void;
    getLayout(): {
        left: Value;
        top: Value;
    };
    getTranslateTransform(): ({
        translateX: Value;
        translateY?: undefined;
    } | {
        translateY: Value;
        translateX?: undefined;
    })[];
}
export declare const Easing: {
    linear: (t: number) => number;
    ease: (t: number) => number;
    quad: (t: number) => number;
    cubic: (t: number) => number;
    sin: (t: number) => number;
    circle: (t: number) => number;
    exp: (t: number) => number;
    back: (s?: number) => (t: number) => number;
    bounce: (t: number) => number;
    in: (easing: EasingFunction) => (t: number) => number;
    out: (easing: EasingFunction) => (t: number) => number;
    inOut: (easing: EasingFunction) => (t: number) => number;
};
export declare function timing(value: Value, config: TimingAnimationConfig): CompositeAnimation;
export declare function spring(value: Value, config: SpringAnimationConfig): CompositeAnimation;
export declare function decay(value: Value, config: DecayAnimationConfig): CompositeAnimation;
export declare function delay(time: number): CompositeAnimation;
export declare function sequence(animations: CompositeAnimation[]): CompositeAnimation;
export declare function parallel(animations: CompositeAnimation[], config?: {
    stopTogether?: boolean;
}): CompositeAnimation;
export declare function stagger(time: number, animations: CompositeAnimation[]): CompositeAnimation;
export declare function loop(animation: CompositeAnimation, config?: {
    iterations?: number;
}): CompositeAnimation;
export declare function add(a: number | AnimatedNode, b: number | AnimatedNode): AnimatedBinaryOp;
export declare function subtract(a: number | AnimatedNode, b: number | AnimatedNode): AnimatedBinaryOp;
export declare function multiply(a: number | AnimatedNode, b: number | AnimatedNode): AnimatedBinaryOp;
export declare function divide(a: number | AnimatedNode, b: number | AnimatedNode): AnimatedBinaryOp;
export declare function modulo(a: number | AnimatedNode, b: number | AnimatedNode): AnimatedBinaryOp;
export declare function event(mapping: any[], config?: {
    listener?: (...args: any[]) => void;
}): (...args: any[]) => void;
export type AnimatedComponentProps<Props> = Omit<Props, "style"> & {
    style?: any;
};
export declare function createAnimatedComponent<P extends {
    style?: any;
}>(Component: React.ComponentType<P>): React.ComponentType<AnimatedComponentProps<P>>;
export declare function useAnimatedValue(initialValue: number): Value;
declare const AnimatedCore: {
    Value: typeof Value;
    ValueXY: typeof ValueXY;
    timing: typeof timing;
    spring: typeof spring;
    decay: typeof decay;
    delay: typeof delay;
    sequence: typeof sequence;
    parallel: typeof parallel;
    stagger: typeof stagger;
    loop: typeof loop;
    add: typeof add;
    subtract: typeof subtract;
    multiply: typeof multiply;
    divide: typeof divide;
    modulo: typeof modulo;
    event: typeof event;
    createAnimatedComponent: typeof createAnimatedComponent;
    useAnimatedValue: typeof useAnimatedValue;
    Easing: {
        linear: (t: number) => number;
        ease: (t: number) => number;
        quad: (t: number) => number;
        cubic: (t: number) => number;
        sin: (t: number) => number;
        circle: (t: number) => number;
        exp: (t: number) => number;
        back: (s?: number) => (t: number) => number;
        bounce: (t: number) => number;
        in: (easing: EasingFunction) => (t: number) => number;
        out: (easing: EasingFunction) => (t: number) => number;
        inOut: (easing: EasingFunction) => (t: number) => number;
    };
};
export type AnimatedHostComponents = Readonly<Record<string, React.ComponentType<any> | undefined>>;
export type AnimatedComponents<Hosts extends AnimatedHostComponents> = {
    readonly [Name in keyof Hosts]: Hosts[Name] extends React.ComponentType<infer Props> ? React.ComponentType<AnimatedComponentProps<Props>> : never;
};
export declare function createAnimatedModule<const Hosts extends AnimatedHostComponents = {}>(hosts?: Hosts): Readonly<typeof AnimatedCore & AnimatedComponents<Hosts>>;
declare const Animated: Readonly<{
    Value: typeof Value;
    ValueXY: typeof ValueXY;
    timing: typeof timing;
    spring: typeof spring;
    decay: typeof decay;
    delay: typeof delay;
    sequence: typeof sequence;
    parallel: typeof parallel;
    stagger: typeof stagger;
    loop: typeof loop;
    add: typeof add;
    subtract: typeof subtract;
    multiply: typeof multiply;
    divide: typeof divide;
    modulo: typeof modulo;
    event: typeof event;
    createAnimatedComponent: typeof createAnimatedComponent;
    useAnimatedValue: typeof useAnimatedValue;
    Easing: {
        linear: (t: number) => number;
        ease: (t: number) => number;
        quad: (t: number) => number;
        cubic: (t: number) => number;
        sin: (t: number) => number;
        circle: (t: number) => number;
        exp: (t: number) => number;
        back: (s?: number) => (t: number) => number;
        bounce: (t: number) => number;
        in: (easing: EasingFunction) => (t: number) => number;
        out: (easing: EasingFunction) => (t: number) => number;
        inOut: (easing: EasingFunction) => (t: number) => number;
    };
}>;
export default Animated;
