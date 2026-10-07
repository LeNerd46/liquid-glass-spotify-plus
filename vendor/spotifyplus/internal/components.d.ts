import React from "react";
import type { AnimatedNodeLike as LegacyAnimatedNodeLike } from "./legacy-animated";
import type { NativeAnimatedNodeLike } from "./native-animation-core";
import type { CSSProperties } from "./native-animation-core";
import type { LayoutAnimation } from "./native-animation-core";
import type { NativeComponentRef, ScrollToEndOptions, ScrollToOptions } from "./renderer";
import type { ExtensionAsset, ExtensionFontAsset, ExtensionFontFamily } from "./script-api";
export type LayoutSize = number | `${number}dp` | `${number}px` | `${number}sp` | `${number}%` | "auto" | "match_parent" | "match" | "fill_parent" | "fill" | "wrap_content" | "wrap";
export type SizeValue = number | `${number}dp` | `${number}px` | `${number}sp` | `${number}%` | "auto";
export type ColorValue = string | number;
export type ViewShadow = {
    shadowColor?: AnimatedStyleValue<ColorValue>;
    shadowOpacity?: AnimatedStyleValue<number>;
    shadowRadius?: AnimatedStyleValue<SizeValue>;
    shadowOffset?: {
        width?: AnimatedStyleValue<SizeValue>;
        height?: AnimatedStyleValue<SizeValue>;
    };
};
export type VisibilityValue = "visible" | "invisible" | "gone";
export type DisplayValue = "flex" | "none";
export type FlexDirectionValue = "row" | "column" | "row-reverse" | "column-reverse";
export type JustifyContentValue = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
export type AlignItemsValue = "stretch" | "flex-start" | "center" | "flex-end" | "baseline" | "space-between" | "space-around";
export type AlignSelfValue = "auto" | "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
export type FlexWrapValue = "nowrap" | "wrap" | "wrap-reverse";
export type OverflowValue = "visible" | "hidden" | "scroll";
export type DirectionValue = "inherit" | "ltr" | "rtl";
export type FontWeightValue = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type FontStyleValue = "normal" | "italic";
export type TextAlignValue = "auto" | "left" | "center" | "right";
export type EllipsizeModeValue = "head" | "middle" | "tail" | "clip";
export type ResizeModeValue = "cover" | "contain" | "stretch" | "center";
export type KeyboardTypeValue = "default" | "email-address" | "numeric" | "decimal-pad" | "phone-pad";
export type ReturnKeyTypeValue = "done" | "go" | "next" | "search" | "send";
export type OrientationValue = "horizontal" | "vertical";
export type GravityValue = "center" | "center_horizontal" | "center_vertical" | "start" | "end" | "left" | "right" | "top" | "bottom" | `${string}|${string}`;
export type ShowDividersValue = "none" | "beginning" | "middle" | "end" | `${string}|${string}`;
export type OverScrollModeValue = "always" | "ifContentScrolls" | "never";
export type ScaleTypeValue = "centerCrop" | "center_crop" | "fitCenter" | "fit_center" | "fitXY" | "fit_xy" | "center" | "centerInside" | "center_inside" | "fitStart" | "fit_start" | "fitEnd" | "fit_end" | "matrix";
export type NativeNodeId = number;
export type ImageSource = string | ExtensionAsset | {
    uri: string;
};
export type FontFamilySource = string | ExtensionFontAsset | ExtensionFontFamily;
export type StyleProp<T> = T | null | undefined | false | ReadonlyArray<StyleProp<T>>;
export type AnimatedStyleValue<T> = T | LegacyAnimatedNodeLike | NativeAnimatedNodeLike;
type ReactChildren = React.ReactNode;
type HostProps = Record<string, unknown>;
export interface PressEvent {
    targetId: number;
    x: number;
    y: number;
}
export interface FocusEvent {
    targetId: number;
    hasFocus: boolean;
}
export interface ScrollEvent {
    targetId: number;
    x: number;
    y: number;
    oldX: number;
    oldY: number;
}
export interface VisibleRangeEvent {
    targetId: number;
    first: number;
    last: number;
    visibleFirst: number;
    visibleLast: number;
}
export interface ViewToken<ItemT = any> {
    item: ItemT;
    index: number;
    key: string;
    isViewable: boolean;
}
export interface ViewabilityChangeEvent<ItemT = any> {
    viewableItems: ViewToken<ItemT>[];
    changed: ViewToken<ItemT>[];
}
export interface SubmitEditingEvent {
    targetId: number;
    text: string;
    actionId: number;
}
export interface ImageErrorEvent {
    targetId: number;
    src: string;
    error: string;
}
export interface LayoutStyle {
    width?: LayoutSize;
    height?: LayoutSize;
    minWidth?: LayoutSize;
    minHeight?: LayoutSize;
    maxWidth?: LayoutSize;
    maxHeight?: LayoutSize;
    margin?: SizeValue;
    marginHorizontal?: SizeValue;
    marginVertical?: SizeValue;
    marginLeft?: SizeValue;
    marginRight?: SizeValue;
    marginTop?: SizeValue;
    marginBottom?: SizeValue;
    marginStart?: SizeValue;
    marginEnd?: SizeValue;
    padding?: SizeValue;
    paddingHorizontal?: SizeValue;
    paddingVertical?: SizeValue;
    paddingLeft?: SizeValue;
    paddingRight?: SizeValue;
    paddingTop?: SizeValue;
    paddingBottom?: SizeValue;
    paddingStart?: SizeValue;
    paddingEnd?: SizeValue;
    position?: "relative" | "absolute" | "static";
    top?: SizeValue;
    bottom?: SizeValue;
    left?: SizeValue;
    right?: SizeValue;
    start?: SizeValue;
    end?: SizeValue;
    display?: DisplayValue;
    flex?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: LayoutSize;
    flexDirection?: FlexDirectionValue;
    justifyContent?: JustifyContentValue;
    alignItems?: AlignItemsValue;
    alignSelf?: AlignSelfValue;
    flexWrap?: FlexWrapValue;
    overflow?: OverflowValue;
    direction?: DirectionValue;
    aspectRatio?: number;
    gap?: SizeValue;
    rowGap?: SizeValue;
    columnGap?: SizeValue;
}
export interface TransformStyle {
    opacity?: AnimatedStyleValue<number>;
    backgroundColor?: ColorValue;
    borderRadius?: SizeValue;
    borderTopLeftRadius?: SizeValue;
    borderTopRightRadius?: SizeValue;
    borderBottomLeftRadius?: SizeValue;
    borderBottomRightRadius?: SizeValue;
    borderWidth?: SizeValue;
    borderLeftWidth?: SizeValue;
    borderTopWidth?: SizeValue;
    borderRightWidth?: SizeValue;
    borderBottomWidth?: SizeValue;
    borderStartWidth?: SizeValue;
    borderEndWidth?: SizeValue;
    borderColor?: ColorValue;
    transform?: ReadonlyArray<{
        translateX?: AnimatedStyleValue<SizeValue>;
        translateY?: AnimatedStyleValue<SizeValue>;
        translateZ?: AnimatedStyleValue<SizeValue>;
        scale?: AnimatedStyleValue<number>;
        scaleX?: AnimatedStyleValue<number>;
        scaleY?: AnimatedStyleValue<number>;
        rotate?: AnimatedStyleValue<string | number>;
        rotateX?: AnimatedStyleValue<string | number>;
        rotateY?: AnimatedStyleValue<string | number>;
        rotation?: AnimatedStyleValue<string | number>;
    }>;
    elevation?: AnimatedStyleValue<SizeValue>;
    scaleX?: AnimatedStyleValue<number>;
    scaleY?: AnimatedStyleValue<number>;
    rotation?: AnimatedStyleValue<number>;
    rotationX?: AnimatedStyleValue<number>;
    rotationY?: AnimatedStyleValue<number>;
    translateX?: AnimatedStyleValue<SizeValue>;
    translateY?: AnimatedStyleValue<SizeValue>;
    translateZ?: AnimatedStyleValue<SizeValue>;
    clipToOutline?: boolean;
}
export interface TextStyle extends LayoutStyle, TransformStyle {
    color?: ColorValue;
    fontSize?: number;
    fontWeight?: FontWeightValue;
    fontStyle?: FontStyleValue;
    fontFamily?: FontFamilySource;
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
    textAlign?: TextAlignValue;
    lineHeight?: number;
    letterSpacing?: number;
    includeFontPadding?: boolean;
    textTransform?: "none" | "uppercase";
    textShadowColor?: ColorValue;
    textShadowOffset?: {
        width?: SizeValue;
        height?: SizeValue;
    };
    textShadowRadius?: SizeValue;
}
export interface ViewStyle extends LayoutStyle, TransformStyle {
    shadow?: ViewShadow;
}
export interface RelativeLayoutRuleProps {
    alignParentTop?: boolean;
    alignParentBottom?: boolean;
    alignParentStart?: boolean;
    alignParentEnd?: boolean;
    centerInParent?: boolean;
    centerHorizontal?: boolean;
    centerVertical?: boolean;
    above?: NativeNodeId;
    below?: NativeNodeId;
    toStartOf?: NativeNodeId;
    toEndOf?: NativeNodeId;
    alignStart?: NativeNodeId;
    alignEnd?: NativeNodeId;
    alignTop?: NativeNodeId;
    alignBottom?: NativeNodeId;
}
export interface CommonViewProps extends RelativeLayoutRuleProps {
    children?: ReactChildren;
    style?: StyleProp<ViewStyle | TextStyle>;
    width?: LayoutSize;
    height?: LayoutSize;
    minWidth?: LayoutSize;
    minHeight?: LayoutSize;
    maxWidth?: LayoutSize;
    maxHeight?: LayoutSize;
    visible?: boolean;
    visibility?: VisibilityValue;
    display?: DisplayValue;
    disabled?: boolean;
    sharedTransitionTag?: string;
    sharedTransitionStyle?: LayoutAnimation;
    enabled?: boolean;
    pointerEvents?: "none" | "auto" | "box-none" | "box-only";
    clickable?: boolean;
    longClickable?: boolean;
    focusable?: boolean;
    focusableInTouchMode?: boolean;
    selected?: boolean;
    activated?: boolean;
    duplicateParentStateEnabled?: boolean;
    hapticFeedbackEnabled?: boolean;
    soundEffectsEnabled?: boolean;
    opacity?: AnimatedStyleValue<number>;
    backgroundColor?: ColorValue;
    borderRadius?: SizeValue;
    borderTopLeftRadius?: SizeValue;
    borderTopRightRadius?: SizeValue;
    borderBottomLeftRadius?: SizeValue;
    borderBottomRightRadius?: SizeValue;
    borderWidth?: SizeValue;
    borderLeftWidth?: SizeValue;
    borderTopWidth?: SizeValue;
    borderRightWidth?: SizeValue;
    borderBottomWidth?: SizeValue;
    borderStartWidth?: SizeValue;
    borderEndWidth?: SizeValue;
    borderColor?: ColorValue;
    transform?: TransformStyle["transform"];
    clipToOutline?: boolean;
    elevation?: AnimatedStyleValue<SizeValue>;
    rotation?: AnimatedStyleValue<number>;
    rotationX?: AnimatedStyleValue<number>;
    rotationY?: AnimatedStyleValue<number>;
    scaleX?: AnimatedStyleValue<number>;
    scaleY?: AnimatedStyleValue<number>;
    translateX?: AnimatedStyleValue<SizeValue>;
    translateY?: AnimatedStyleValue<SizeValue>;
    translateZ?: AnimatedStyleValue<SizeValue>;
    shadow?: ViewShadow;
    accessibilityLabel?: string;
    contentDescription?: string;
    testID?: string;
    nativeID?: string;
    tag?: string | number | boolean;
    keepScreenOn?: boolean;
    fitsSystemWindows?: boolean;
    clipChildren?: boolean;
    clipToPadding?: boolean;
    margin?: SizeValue;
    marginHorizontal?: SizeValue;
    marginVertical?: SizeValue;
    marginLeft?: SizeValue;
    marginRight?: SizeValue;
    marginTop?: SizeValue;
    marginBottom?: SizeValue;
    marginStart?: SizeValue;
    marginEnd?: SizeValue;
    padding?: SizeValue;
    paddingHorizontal?: SizeValue;
    paddingVertical?: SizeValue;
    paddingLeft?: SizeValue;
    paddingRight?: SizeValue;
    paddingTop?: SizeValue;
    paddingBottom?: SizeValue;
    paddingStart?: SizeValue;
    paddingEnd?: SizeValue;
    flex?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: LayoutSize;
    flexDirection?: FlexDirectionValue;
    justifyContent?: JustifyContentValue;
    alignItems?: AlignItemsValue;
    alignSelf?: AlignSelfValue;
    flexWrap?: FlexWrapValue;
    overflow?: OverflowValue;
    direction?: DirectionValue;
    aspectRatio?: number;
    gap?: SizeValue;
    rowGap?: SizeValue;
    columnGap?: SizeValue;
    position?: "relative" | "absolute" | "static";
    top?: SizeValue;
    bottom?: SizeValue;
    left?: SizeValue;
    right?: SizeValue;
    start?: SizeValue;
    end?: SizeValue;
    layoutWeight?: number;
    orientation?: OrientationValue;
    gravity?: GravityValue;
    layoutGravity?: GravityValue;
    weightSum?: number;
    showDividers?: ShowDividersValue;
    dividerPadding?: SizeValue;
    baselineAligned?: boolean;
    onClick?: (event: PressEvent) => void;
    onLongClick?: (event: PressEvent) => void;
    onPress?: (event: PressEvent) => void;
    onLongPress?: (event: PressEvent) => void;
    onPressIn?: (event: PressEvent) => void;
    onPressOut?: (event: PressEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
}
export interface ViewProps extends CommonViewProps {
}
export interface FrameLayoutProps extends CommonViewProps {
}
export interface RelativeLayoutProps extends CommonViewProps {
}
export interface PlainViewProps extends CommonViewProps {
}
export interface TextProps extends CommonViewProps {
    style?: StyleProp<TextStyle | ViewStyle>;
    children?: ReactChildren;
    text?: string | number;
    color?: ColorValue;
    fontSize?: number;
    fontWeight?: FontWeightValue;
    fontStyle?: FontStyleValue;
    fontFamily?: FontFamilySource;
    textDecorationLine?: TextStyle['textDecorationLine'];
    textAlign?: TextAlignValue;
    lineHeight?: number;
    letterSpacing?: number;
    numberOfLines?: number;
    ellipsizeMode?: EllipsizeModeValue;
    selectable?: boolean;
    allowFontPadding?: boolean;
    textTransform?: "none" | "uppercase";
    textShadowColor?: ColorValue;
    textShadowOffset?: {
        width?: SizeValue;
        height?: SizeValue;
    };
    textShadowRadius?: SizeValue;
    hint?: string;
    hintColor?: ColorValue;
    textColor?: ColorValue;
    textSizeSp?: number;
    maxLines?: number;
    minLines?: number;
    lines?: number;
    singleLine?: boolean;
    allCaps?: boolean;
    includeFontPadding?: boolean;
    textStyle?: "normal" | "bold" | "italic" | "bold|italic" | "italic|bold";
    ellipsize?: "start" | "middle" | "end" | "marquee";
    textIsSelectable?: boolean;
    lineSpacingExtra?: number;
    lineSpacingMultiplier?: number;
    maxLength?: number;
}
export interface TextInputProps extends TextProps {
    value?: string | number;
    defaultValue?: string | number;
    placeholder?: string;
    placeholderTextColor?: ColorValue;
    keyboardType?: KeyboardTypeValue;
    secureTextEntry?: boolean;
    multiline?: boolean;
    returnKeyType?: ReturnKeyTypeValue;
    selectTextOnFocus?: boolean;
    caretHidden?: boolean;
    editable?: boolean;
    inputType?: string | number;
    imeOptions?: string | number;
    selectAllOnFocus?: boolean;
    cursorVisible?: boolean;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: (event: SubmitEditingEvent) => void;
}
export interface ImageProps extends CommonViewProps {
    style?: StyleProp<ViewStyle>;
    source?: ImageSource;
    src?: ImageSource;
    resizeMode?: ResizeModeValue;
    scaleType?: ScaleTypeValue;
    tintColor?: ColorValue;
    adjustViewBounds?: boolean;
    cropToPadding?: boolean;
    onError?: (event: ImageErrorEvent) => void;
}
export interface ButtonProps extends TextProps {
    title?: string;
}
export interface ProgressBarProps extends CommonViewProps {
    indeterminate?: boolean;
    min?: number;
    progress?: number;
    secondaryProgress?: number;
    max?: number;
    progressTintColor?: ColorValue;
    secondaryProgressTintColor?: ColorValue;
    progressBackgroundTintColor?: ColorValue;
    indeterminateTintColor?: ColorValue;
}
export interface ActivityIndicatorProps extends CommonViewProps {
    animating?: boolean;
    color?: ColorValue;
    hidesWhenStopped?: boolean;
}
export interface SliderProps extends ProgressBarProps {
    thumbTintColor?: ColorValue;
    tickMarkTintColor?: ColorValue;
    splitTrack?: boolean;
    onValueChange?: (value: number) => void;
    onSlidingStart?: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
}
export interface CompoundButtonProps extends TextProps {
    checked?: boolean;
    value?: boolean;
    buttonTintColor?: ColorValue;
    onValueChange?: (value: boolean) => void;
}
export interface SwitchProps extends CompoundButtonProps {
    thumbColor?: ColorValue;
    trackColor?: ColorValue;
    thumbTintColor?: ColorValue;
    trackTintColor?: ColorValue;
    textOn?: string;
    textOff?: string;
    showText?: boolean;
}
export interface ScrollViewProps extends CommonViewProps {
    style?: StyleProp<ViewStyle>;
    horizontal?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
    fillViewport?: boolean;
    smoothScrollingEnabled?: boolean;
    verticalScrollBarEnabled?: boolean;
    horizontalScrollBarEnabled?: boolean;
    showsVerticalScrollIndicator?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    overScrollMode?: OverScrollModeValue;
    onScroll?: (event: ScrollEvent) => void;
}
export interface HorizontalScrollViewProps extends ScrollViewProps {
}
export interface CheckBoxProps extends CompoundButtonProps {
}
export interface RadioButtonProps extends CompoundButtonProps {
}
export interface RadioGroupProps extends CommonViewProps {
    checkedId?: NativeNodeId | null;
    onValueChange?: (checkedId: NativeNodeId | null) => void;
}
export interface ImageButtonProps extends ImageProps {
}
export interface ToggleButtonProps extends CompoundButtonProps {
    textOn?: string;
    textOff?: string;
    disabledAlpha?: number;
}
export interface SpaceProps extends CommonViewProps {
}
export type ScriptViewLength = SizeValue | `${number}%`;
export type ScriptViewGradient = {
    type?: "linear" | "linearGradient" | "radial" | "radialGradient" | "sweep" | "sweepGradient";
    colors: ColorValue[];
    positions?: number[];
    startX?: ScriptViewLength;
    startY?: ScriptViewLength;
    endX?: ScriptViewLength;
    endY?: ScriptViewLength;
    centerX?: ScriptViewLength;
    centerY?: ScriptViewLength;
    radius?: ScriptViewLength;
};
export type ScriptViewFill = ColorValue | ScriptViewGradient;
export type ScriptViewShadow = {
    color?: ColorValue;
    radius?: number;
    dx?: number;
    dy?: number;
};
export interface ScriptViewBaseNode {
    id?: string | number;
    type: string;
    x?: ScriptViewLength;
    y?: ScriptViewLength;
    width?: ScriptViewLength;
    height?: ScriptViewLength;
    opacity?: number;
    alpha?: number;
    visible?: boolean;
    rotation?: number | string;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    translateX?: ScriptViewLength;
    translateY?: ScriptViewLength;
    pivotX?: ScriptViewLength;
    pivotY?: ScriptViewLength;
    clip?: boolean;
    clipRadius?: ScriptViewLength;
    blendMode?: string;
    shadow?: ScriptViewShadow;
}
export interface ScriptViewGroupNode extends ScriptViewBaseNode {
    type: "group" | "layer";
    children?: ScriptViewNode[];
}
export interface ScriptViewRectNode extends ScriptViewBaseNode {
    type: "rect" | "roundRect";
    fill?: ScriptViewFill;
    color?: ColorValue;
    stroke?: ColorValue;
    strokeColor?: ColorValue;
    strokeWidth?: ScriptViewLength;
    radius?: ScriptViewLength;
    borderRadius?: ScriptViewLength;
}
export interface ScriptViewCircleNode extends ScriptViewBaseNode {
    type: "circle" | "oval";
    fill?: ScriptViewFill;
    color?: ColorValue;
    stroke?: ColorValue;
    strokeColor?: ColorValue;
    strokeWidth?: ScriptViewLength;
    radius?: ScriptViewLength;
    cx?: ScriptViewLength;
    cy?: ScriptViewLength;
}
export interface ScriptViewLineNode extends ScriptViewBaseNode {
    type: "line";
    x1?: ScriptViewLength;
    y1?: ScriptViewLength;
    x2?: ScriptViewLength;
    y2?: ScriptViewLength;
    color?: ColorValue;
    stroke?: ColorValue;
    strokeColor?: ColorValue;
    strokeWidth?: ScriptViewLength;
}
export interface ScriptViewPathNode extends ScriptViewBaseNode {
    type: "path";
    commands?: Array<{
        cmd: "M" | "L" | "Q" | "C" | "Z" | "moveTo" | "lineTo" | "quadTo" | "cubicTo" | "close";
        x?: ScriptViewLength;
        y?: ScriptViewLength;
        x1?: ScriptViewLength;
        y1?: ScriptViewLength;
        x2?: ScriptViewLength;
        y2?: ScriptViewLength;
    }>;
    fill?: ScriptViewFill;
    color?: ColorValue;
    stroke?: ColorValue;
    strokeColor?: ColorValue;
    strokeWidth?: ScriptViewLength;
}
export interface ScriptViewImageNode extends ScriptViewBaseNode {
    type: "image";
    src?: ImageSource;
    uri?: ImageSource;
    resizeMode?: ResizeModeValue;
    scaleType?: ScaleTypeValue;
    blurRadius?: number;
    tintColor?: ColorValue;
    borderRadius?: ScriptViewLength;
}
export interface ScriptViewTextNode extends ScriptViewBaseNode {
    type: "text";
    text: string | number;
    color?: ColorValue;
    fill?: ScriptViewFill;
    fontSize?: number;
    textSizeSp?: number;
    fontWeight?: FontWeightValue;
    fontStyle?: FontStyleValue;
    fontFamily?: FontFamilySource;
    textAlign?: "left" | "center" | "right";
    lineHeight?: number;
    maxLines?: number;
    includeFontPadding?: boolean;
}
export type ScriptViewNode = ScriptViewGroupNode | ScriptViewRectNode | ScriptViewCircleNode | ScriptViewLineNode | ScriptViewPathNode | ScriptViewImageNode | ScriptViewTextNode | (ScriptViewBaseNode & Record<string, unknown>);
export interface ScriptViewFrameEvent {
    targetId: number;
    time: number;
    delta: number;
    width: number;
    height: number;
}
export interface ScriptViewSizeEvent {
    targetId: number;
    width: number;
    height: number;
    oldWidth: number;
    oldHeight: number;
}
export interface ScriptViewTouchEvent extends PressEvent {
    pageX: number;
    pageY: number;
    action: string;
    pointerId: number;
}
export interface ScriptViewImageEvent {
    targetId: number;
    src: string;
    width?: number;
    height?: number;
    error?: string;
}
export interface ScriptViewProps extends CommonViewProps {
    displayList?: ScriptViewNode[];
    nodes?: ScriptViewNode[];
    autoInvalidate?: boolean;
    softwareLayer?: boolean;
    renderEffectBlurRadius?: number;
    onFrame?: (event: ScriptViewFrameEvent) => void;
    onSizeChange?: (event: ScriptViewSizeEvent) => void;
    onTouchStart?: (event: ScriptViewTouchEvent) => void;
    onTouchMove?: (event: ScriptViewTouchEvent) => void;
    onTouchEnd?: (event: ScriptViewTouchEvent) => void;
    onTouchCancel?: (event: ScriptViewTouchEvent) => void;
    onImageLoad?: (event: ScriptViewImageEvent) => void;
    onImageError?: (event: ScriptViewImageEvent) => void;
    onAttached?: (event: {
        targetId: number;
    }) => void;
    onDetached?: (event: {
        targetId: number;
    }) => void;
}
export interface PressableStateCallbackType {
    pressed: boolean;
    focused: boolean;
}
export interface PressableProps extends Omit<ViewProps, "onClick" | "onLongClick" | "style" | "children"> {
    style?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
    children?: ReactChildren | ((state: PressableStateCallbackType) => ReactChildren);
    onPress?: (event: PressEvent) => void;
    onLongPress?: (event: PressEvent) => void;
    onPressIn?: (event: PressEvent) => void;
    onPressOut?: (event: PressEvent) => void;
}
export interface TouchableOpacityProps extends PressableProps {
    activeOpacity?: number;
}
export interface FlatListScrollToIndexParams {
    index: number;
    animated?: boolean;
    viewOffset?: number;
    viewPosition?: number;
}
export interface FlatListScrollToOffsetParams {
    offset: number;
    animated?: boolean;
}
export interface FlatListGetItemLayoutResult {
    length: number;
    offset: number;
    index: number;
}
export interface FlatListProps<ItemT> extends Omit<ScrollViewProps, "children"> {
    data?: readonly ItemT[] | null;
    renderItem: (info: {
        item: ItemT;
        index: number;
    }) => React.ReactNode;
    keyExtractor?: (item: ItemT, index: number) => string;
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
    ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
    ItemSeparatorComponent?: React.ComponentType<any> | React.ReactElement | null;
    initialNumToRender?: number;
    windowSize?: number;
    maxToRenderPerBatch?: number;
    estimatedItemSize?: number;
    getItemLayout?: (data: readonly ItemT[] | null | undefined, index: number) => FlatListGetItemLayoutResult;
    initialScrollIndex?: number;
    onViewableItemsChanged?: (event: ViewabilityChangeEvent<ItemT>) => void;
    itemLayoutAnimation?: LayoutAnimation;
}
export interface View extends NativeComponentRef {
}
export interface LinearLayout extends View {
}
export interface FrameLayout extends View {
}
export interface RelativeLayout extends View {
}
export interface PlainView extends View {
}
export interface Text extends TextView {
}
export interface TextView extends View {
}
export interface TextInput extends EditText {
}
export interface EditText extends TextView {
}
export interface Button extends TextView {
}
export interface ProgressBar extends View {
}
export interface ProgressBarHorizontal extends ProgressBar {
}
export interface ActivityIndicator extends ProgressBar {
}
export interface Slider extends View {
}
export interface SeekBar extends Slider {
}
export interface Image extends View {
}
export interface ImageView extends Image {
}
export interface ImageButton extends Image {
}
export interface Switch extends TextView {
}
export interface CheckBox extends TextView {
}
export interface RadioButton extends TextView {
}
export interface RadioGroup extends View {
}
export interface ToggleButton extends TextView {
}
export interface Space extends View {
}
export interface ScriptView extends View {
}
export interface RenderView extends ScriptView {
}
export interface CanvasView extends ScriptView {
}
export interface SafeAreaView extends View {
}
export interface ScrollView extends View {
    scrollTo(options?: ScrollToOptions | number, y?: number, animated?: boolean): void;
    scrollToEnd(options?: ScrollToEndOptions): void;
    flashScrollIndicators(): void;
}
export interface HorizontalScrollView extends ScrollView {
}
export interface Pressable extends View {
}
export interface TouchableOpacity extends Pressable {
}
export interface FlatList<ItemT = any> extends ScrollView {
    scrollToIndex(params: FlatListScrollToIndexParams): void;
    scrollToOffset(params: FlatListScrollToOffsetParams): void;
}
export interface HorizontalStackLayout extends View {
}
export interface VerticalStackLayout extends View {
}
export interface Row extends HorizontalStackLayout {
}
export interface Column extends VerticalStackLayout {
}
export type RNStyle = ViewStyle | TextStyle | CSSProperties;
export type RefableProps<P, R = NativeComponentRef> = P & {
    ref?: React.Ref<R>;
};
export interface SpotifyPlusComponent<P, R = NativeComponentRef> {
    (props: RefableProps<P, R>): React.ReactElement | null;
    displayName?: string;
}
export interface NativeViewProps extends CommonViewProps {
    [key: string]: any;
}
export type NativeViewOptions = {
    scriptId?: string;
};
export type NativeComponentProps<TProps extends object = {}> = TProps & CommonViewProps;
export declare function createNativeComponent<TProps extends object = {}>(name: string, options?: NativeViewOptions): SpotifyPlusComponent<NativeComponentProps<TProps>, View>;
export declare const NativeView: typeof createNativeComponent;
export declare const View: SpotifyPlusComponent<ViewProps, View>;
export declare const LinearLayout: SpotifyPlusComponent<ViewProps, LinearLayout>;
export declare const FrameLayout: SpotifyPlusComponent<FrameLayoutProps, FrameLayout>;
export declare const RelativeLayout: SpotifyPlusComponent<RelativeLayoutProps, RelativeLayout>;
export declare const PlainView: SpotifyPlusComponent<PlainViewProps, PlainView>;
export declare const Text: SpotifyPlusComponent<TextProps, Text>;
export declare const TextView: SpotifyPlusComponent<TextProps, TextView>;
export declare const TextInput: SpotifyPlusComponent<TextInputProps, TextInput>;
export declare const EditText: SpotifyPlusComponent<TextInputProps, EditText>;
export declare const Button: SpotifyPlusComponent<ButtonProps, Button>;
export declare const ProgressBar: SpotifyPlusComponent<ProgressBarProps, ProgressBar>;
export declare const ProgressBarHorizontal: SpotifyPlusComponent<ProgressBarProps, ProgressBarHorizontal>;
export declare const ActivityIndicator: SpotifyPlusComponent<ActivityIndicatorProps, ActivityIndicator>;
export declare const Slider: SpotifyPlusComponent<SliderProps, Slider>;
export declare const SeekBar: SpotifyPlusComponent<SliderProps, SeekBar>;
export declare const Image: SpotifyPlusComponent<ImageProps, Image>;
export declare const ImageView: SpotifyPlusComponent<ImageProps, ImageView>;
export declare const ImageButton: SpotifyPlusComponent<ImageButtonProps, ImageButton>;
export declare const Switch: SpotifyPlusComponent<SwitchProps, Switch>;
export declare const CheckBox: SpotifyPlusComponent<CheckBoxProps, CheckBox>;
export declare const RadioButton: SpotifyPlusComponent<RadioButtonProps, RadioButton>;
export declare const RadioGroup: SpotifyPlusComponent<RadioGroupProps, RadioGroup>;
export declare const ToggleButton: SpotifyPlusComponent<ToggleButtonProps, ToggleButton>;
export declare const Space: SpotifyPlusComponent<SpaceProps, Space>;
export declare const ScriptView: SpotifyPlusComponent<ScriptViewProps, ScriptView>;
export declare const RenderView: SpotifyPlusComponent<ScriptViewProps, RenderView>;
export declare const CanvasView: SpotifyPlusComponent<ScriptViewProps, CanvasView>;
export declare const SafeAreaView: SpotifyPlusComponent<ViewProps, SafeAreaView>;
export declare const ScrollView: SpotifyPlusComponent<ScrollViewProps, ScrollView>;
export declare const HorizontalScrollView: SpotifyPlusComponent<HorizontalScrollViewProps, HorizontalScrollView>;
export declare const Pressable: SpotifyPlusComponent<PressableProps, Pressable>;
export declare const TouchableOpacity: SpotifyPlusComponent<TouchableOpacityProps, TouchableOpacity>;
export interface FlatListComponent {
    <ItemT>(props: RefableProps<FlatListProps<ItemT>, FlatList<ItemT>>): React.ReactElement | null;
    displayName?: string;
}
export declare const FlatList: FlatListComponent;
export declare const HorizontalStackLayout: SpotifyPlusComponent<ViewProps, HorizontalStackLayout>;
export declare const VerticalStackLayout: SpotifyPlusComponent<ViewProps, VerticalStackLayout>;
export declare const Row: SpotifyPlusComponent<ViewProps, Row>;
export declare const Column: SpotifyPlusComponent<ViewProps, Column>;
export declare const StyleSheet: {
    create<T extends Record<string, RNStyle>>(styles: T): T;
    flatten(style: StyleProp<RNStyle>): HostProps;
    absoluteFillObject: {
        position: "absolute";
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    absoluteFill: {
        position: "absolute";
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
};
declare const _default: {
    View: SpotifyPlusComponent<ViewProps, View>;
    LinearLayout: SpotifyPlusComponent<ViewProps, LinearLayout>;
    FrameLayout: SpotifyPlusComponent<FrameLayoutProps, FrameLayout>;
    RelativeLayout: SpotifyPlusComponent<RelativeLayoutProps, RelativeLayout>;
    ScrollView: SpotifyPlusComponent<ScrollViewProps, ScrollView>;
    HorizontalScrollView: SpotifyPlusComponent<HorizontalScrollViewProps, HorizontalScrollView>;
    PlainView: SpotifyPlusComponent<PlainViewProps, PlainView>;
    Text: SpotifyPlusComponent<TextProps, Text>;
    TextView: SpotifyPlusComponent<TextProps, TextView>;
    TextInput: SpotifyPlusComponent<TextInputProps, TextInput>;
    EditText: SpotifyPlusComponent<TextInputProps, EditText>;
    Image: SpotifyPlusComponent<ImageProps, Image>;
    ImageView: SpotifyPlusComponent<ImageProps, ImageView>;
    ImageButton: SpotifyPlusComponent<ImageButtonProps, ImageButton>;
    Button: SpotifyPlusComponent<ButtonProps, Button>;
    ProgressBar: SpotifyPlusComponent<ProgressBarProps, ProgressBar>;
    ProgressBarHorizontal: SpotifyPlusComponent<ProgressBarProps, ProgressBarHorizontal>;
    ActivityIndicator: SpotifyPlusComponent<ActivityIndicatorProps, ActivityIndicator>;
    Slider: SpotifyPlusComponent<SliderProps, Slider>;
    SeekBar: SpotifyPlusComponent<SliderProps, SeekBar>;
    Switch: SpotifyPlusComponent<SwitchProps, Switch>;
    CheckBox: SpotifyPlusComponent<CheckBoxProps, CheckBox>;
    RadioButton: SpotifyPlusComponent<RadioButtonProps, RadioButton>;
    RadioGroup: SpotifyPlusComponent<RadioGroupProps, RadioGroup>;
    ToggleButton: SpotifyPlusComponent<ToggleButtonProps, ToggleButton>;
    Space: SpotifyPlusComponent<SpaceProps, Space>;
    ScriptView: SpotifyPlusComponent<ScriptViewProps, ScriptView>;
    RenderView: SpotifyPlusComponent<ScriptViewProps, RenderView>;
    CanvasView: SpotifyPlusComponent<ScriptViewProps, CanvasView>;
    SafeAreaView: SpotifyPlusComponent<ViewProps, SafeAreaView>;
    Pressable: SpotifyPlusComponent<PressableProps, Pressable>;
    TouchableOpacity: SpotifyPlusComponent<TouchableOpacityProps, TouchableOpacity>;
    FlatList: FlatListComponent;
    HorizontalStackLayout: SpotifyPlusComponent<ViewProps, HorizontalStackLayout>;
    VerticalStackLayout: SpotifyPlusComponent<ViewProps, VerticalStackLayout>;
    Row: SpotifyPlusComponent<ViewProps, Row>;
    Column: SpotifyPlusComponent<ViewProps, Column>;
    StyleSheet: {
        create<T extends Record<string, RNStyle>>(styles: T): T;
        flatten(style: StyleProp<RNStyle>): HostProps;
        absoluteFillObject: {
            position: "absolute";
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        absoluteFill: {
            position: "absolute";
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
    };
};
export default _default;
