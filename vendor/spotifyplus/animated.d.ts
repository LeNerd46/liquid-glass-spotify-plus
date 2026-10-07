import * as Components from './components';
export * from '../ui/animated';
declare const Animated: Readonly<{
    Value: typeof import("./internal/legacy-animated").Value;
    ValueXY: typeof import("./internal/legacy-animated").ValueXY;
    timing: typeof import("./internal/legacy-animated").timing;
    spring: typeof import("./internal/legacy-animated").spring;
    decay: typeof import("./internal/legacy-animated").decay;
    delay: typeof import("./internal/legacy-animated").delay;
    sequence: typeof import("./internal/legacy-animated").sequence;
    parallel: typeof import("./internal/legacy-animated").parallel;
    stagger: typeof import("./internal/legacy-animated").stagger;
    loop: typeof import("./internal/legacy-animated").loop;
    add: typeof import("./internal/legacy-animated").add;
    subtract: typeof import("./internal/legacy-animated").subtract;
    multiply: typeof import("./internal/legacy-animated").multiply;
    divide: typeof import("./internal/legacy-animated").divide;
    modulo: typeof import("./internal/legacy-animated").modulo;
    event: typeof import("./internal/legacy-animated").event;
    createAnimatedComponent: typeof import("./internal/legacy-animated").createAnimatedComponent;
    useAnimatedValue: typeof import("./internal/legacy-animated").useAnimatedValue;
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
        in: (easing: import("./internal/legacy-animated").EasingFunction) => (t: number) => number;
        out: (easing: import("./internal/legacy-animated").EasingFunction) => (t: number) => number;
        inOut: (easing: import("./internal/legacy-animated").EasingFunction) => (t: number) => number;
    };
} & import("./internal/legacy-animated").AnimatedComponents<{
    readonly View: Components.SpotifyPlusComponent<Components.ViewProps, import("./internal/components").View>;
    readonly Text: Components.SpotifyPlusComponent<Components.TextProps, import("./internal/components").Text>;
    readonly Image: Components.SpotifyPlusComponent<Components.ImageProps, import("./internal/components").Image>;
    readonly ScriptView: Components.SpotifyPlusComponent<Components.ScriptViewProps, import("./internal/components").ScriptView>;
    readonly RenderView: Components.SpotifyPlusComponent<Components.ScriptViewProps, import("./internal/components").RenderView>;
    readonly CanvasView: Components.SpotifyPlusComponent<Components.ScriptViewProps, import("./internal/components").CanvasView>;
    readonly ScrollView: Components.SpotifyPlusComponent<Components.ScrollViewProps, import("./internal/components").ScrollView>;
    readonly FlatList: Components.FlatListComponent;
}>>;
export declare const View: import("react").ComponentType<import("./internal/legacy-animated").AnimatedComponentProps<Components.ViewProps & {
    ref?: import("react").Ref<import("./internal/components").View> | undefined;
}>>;
export declare const Text: import("react").ComponentType<import("./internal/legacy-animated").AnimatedComponentProps<Components.TextProps & {
    ref?: import("react").Ref<import("./internal/components").Text> | undefined;
}>>;
export declare const Image: import("react").ComponentType<import("./internal/legacy-animated").AnimatedComponentProps<Components.ImageProps & {
    ref?: import("react").Ref<import("./internal/components").Image> | undefined;
}>>;
export declare const ScriptView: import("react").ComponentType<import("./internal/legacy-animated").AnimatedComponentProps<Components.ScriptViewProps & {
    ref?: import("react").Ref<import("./internal/components").ScriptView> | undefined;
}>>;
export declare const RenderView: import("react").ComponentType<import("./internal/legacy-animated").AnimatedComponentProps<Components.ScriptViewProps & {
    ref?: import("react").Ref<import("./internal/components").RenderView> | undefined;
}>>;
export declare const CanvasView: import("react").ComponentType<import("./internal/legacy-animated").AnimatedComponentProps<Components.ScriptViewProps & {
    ref?: import("react").Ref<import("./internal/components").CanvasView> | undefined;
}>>;
export declare const ScrollView: import("react").ComponentType<import("./internal/legacy-animated").AnimatedComponentProps<Components.ScrollViewProps & {
    ref?: import("react").Ref<import("./internal/components").ScrollView> | undefined;
}>>;
export declare const FlatList: import("react").ComponentType<import("./internal/legacy-animated").AnimatedComponentProps<Components.FlatListProps<unknown> & {
    ref?: import("react").Ref<import("./internal/components").FlatList<unknown>> | undefined;
}>>;
export default Animated;
