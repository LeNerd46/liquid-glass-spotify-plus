import * as Internal from "./internal/components";
export type * from "./internal/components";
export interface View extends Internal.View {
}
export interface LinearLayout extends Internal.LinearLayout {
}
export interface FrameLayout extends Internal.FrameLayout {
}
export interface RelativeLayout extends Internal.RelativeLayout {
}
export interface PlainView extends Internal.PlainView {
}
export interface Text extends Internal.Text {
}
export interface TextView extends Internal.TextView {
}
export interface TextInput extends Internal.TextInput {
}
export interface Button extends Internal.Button {
}
export interface ProgressBar extends Internal.ProgressBar {
}
export interface ProgressBarHorizontal extends Internal.ProgressBarHorizontal {
}
export interface ActivityIndicator extends Internal.ActivityIndicator {
}
export interface Slider extends Internal.Slider {
}
export interface Image extends Internal.Image {
}
export interface ImageButton extends Internal.ImageButton {
}
export interface Switch extends Internal.Switch {
}
export interface CheckBox extends Internal.CheckBox {
}
export interface RadioButton extends Internal.RadioButton {
}
export interface RadioGroup extends Internal.RadioGroup {
}
export interface ToggleButton extends Internal.ToggleButton {
}
export interface Space extends Internal.Space {
}
export interface ScriptView extends Internal.ScriptView {
}
export interface EditText extends Internal.EditText {
}
export interface SeekBar extends Internal.SeekBar {
}
export interface ImageView extends Internal.ImageView {
}
export interface RenderView extends Internal.RenderView {
}
export interface CanvasView extends Internal.CanvasView {
}
export interface SafeAreaView extends Internal.SafeAreaView {
}
export interface ScrollView extends Internal.ScrollView {
}
export interface HorizontalScrollView extends Internal.HorizontalScrollView {
}
export interface Pressable extends Internal.Pressable {
}
export interface TouchableOpacity extends Internal.TouchableOpacity {
}
export interface FlatList<ItemT = any> extends Internal.FlatList<ItemT> {
}
export interface HorizontalStackLayout extends Internal.HorizontalStackLayout {
}
export interface VerticalStackLayout extends Internal.VerticalStackLayout {
}
export interface Row extends Internal.Row {
}
export interface Column extends Internal.Column {
}
export declare const createNativeComponent: typeof Internal.createNativeComponent;
export declare const NativeView: typeof Internal.NativeView;
export declare const View: typeof Internal.View;
export declare const LinearLayout: typeof Internal.LinearLayout;
export declare const FrameLayout: typeof Internal.FrameLayout;
export declare const RelativeLayout: typeof Internal.RelativeLayout;
export declare const PlainView: typeof Internal.PlainView;
export declare const Text: typeof Internal.Text;
export declare const TextView: typeof Internal.TextView;
export declare const TextInput: typeof Internal.TextInput;
export declare const Button: typeof Internal.Button;
export declare const ProgressBar: typeof Internal.ProgressBar;
export declare const ProgressBarHorizontal: typeof Internal.ProgressBarHorizontal;
export declare const ActivityIndicator: typeof Internal.ActivityIndicator;
export declare const Slider: typeof Internal.Slider;
export declare const Image: typeof Internal.Image;
export declare const ImageButton: typeof Internal.ImageButton;
export declare const Switch: typeof Internal.Switch;
export declare const CheckBox: typeof Internal.CheckBox;
export declare const RadioButton: typeof Internal.RadioButton;
export declare const RadioGroup: typeof Internal.RadioGroup;
export declare const ToggleButton: typeof Internal.ToggleButton;
export declare const Space: typeof Internal.Space;
export declare const ScriptView: typeof Internal.ScriptView;
export declare const EditText: typeof Internal.EditText;
export declare const SeekBar: typeof Internal.SeekBar;
export declare const ImageView: typeof Internal.ImageView;
export declare const RenderView: typeof Internal.RenderView;
export declare const CanvasView: typeof Internal.CanvasView;
export declare const SafeAreaView: typeof Internal.SafeAreaView;
export declare const ScrollView: typeof Internal.ScrollView;
export declare const HorizontalScrollView: typeof Internal.HorizontalScrollView;
export declare const Pressable: typeof Internal.Pressable;
export declare const TouchableOpacity: typeof Internal.TouchableOpacity;
export declare const FlatList: typeof Internal.FlatList;
export declare const HorizontalStackLayout: typeof Internal.HorizontalStackLayout;
export declare const VerticalStackLayout: typeof Internal.VerticalStackLayout;
export declare const Row: typeof Internal.Row;
export declare const Column: typeof Internal.Column;
export declare const StyleSheet: typeof Internal.StyleSheet;
declare const _default: {
    createNativeComponent: typeof Internal.createNativeComponent;
    NativeView: typeof Internal.createNativeComponent;
    View: Internal.SpotifyPlusComponent<Internal.ViewProps, Internal.View>;
    LinearLayout: Internal.SpotifyPlusComponent<Internal.ViewProps, Internal.LinearLayout>;
    FrameLayout: Internal.SpotifyPlusComponent<Internal.FrameLayoutProps, Internal.FrameLayout>;
    RelativeLayout: Internal.SpotifyPlusComponent<Internal.RelativeLayoutProps, Internal.RelativeLayout>;
    PlainView: Internal.SpotifyPlusComponent<Internal.PlainViewProps, Internal.PlainView>;
    Text: Internal.SpotifyPlusComponent<Internal.TextProps, Internal.Text>;
    TextView: Internal.SpotifyPlusComponent<Internal.TextProps, Internal.TextView>;
    TextInput: Internal.SpotifyPlusComponent<Internal.TextInputProps, Internal.TextInput>;
    Button: Internal.SpotifyPlusComponent<Internal.ButtonProps, Internal.Button>;
    ProgressBar: Internal.SpotifyPlusComponent<Internal.ProgressBarProps, Internal.ProgressBar>;
    ProgressBarHorizontal: Internal.SpotifyPlusComponent<Internal.ProgressBarProps, Internal.ProgressBarHorizontal>;
    ActivityIndicator: Internal.SpotifyPlusComponent<Internal.ActivityIndicatorProps, Internal.ActivityIndicator>;
    Slider: Internal.SpotifyPlusComponent<Internal.SliderProps, Internal.Slider>;
    Image: Internal.SpotifyPlusComponent<Internal.ImageProps, Internal.Image>;
    ImageButton: Internal.SpotifyPlusComponent<Internal.ImageButtonProps, Internal.ImageButton>;
    Switch: Internal.SpotifyPlusComponent<Internal.SwitchProps, Internal.Switch>;
    CheckBox: Internal.SpotifyPlusComponent<Internal.CheckBoxProps, Internal.CheckBox>;
    RadioButton: Internal.SpotifyPlusComponent<Internal.RadioButtonProps, Internal.RadioButton>;
    RadioGroup: Internal.SpotifyPlusComponent<Internal.RadioGroupProps, Internal.RadioGroup>;
    ToggleButton: Internal.SpotifyPlusComponent<Internal.ToggleButtonProps, Internal.ToggleButton>;
    Space: Internal.SpotifyPlusComponent<Internal.SpaceProps, Internal.Space>;
    ScriptView: Internal.SpotifyPlusComponent<Internal.ScriptViewProps, Internal.ScriptView>;
    EditText: Internal.SpotifyPlusComponent<Internal.TextInputProps, Internal.EditText>;
    SeekBar: Internal.SpotifyPlusComponent<Internal.SliderProps, Internal.SeekBar>;
    ImageView: Internal.SpotifyPlusComponent<Internal.ImageProps, Internal.ImageView>;
    RenderView: Internal.SpotifyPlusComponent<Internal.ScriptViewProps, Internal.RenderView>;
    CanvasView: Internal.SpotifyPlusComponent<Internal.ScriptViewProps, Internal.CanvasView>;
    SafeAreaView: Internal.SpotifyPlusComponent<Internal.ViewProps, Internal.SafeAreaView>;
    ScrollView: Internal.SpotifyPlusComponent<Internal.ScrollViewProps, Internal.ScrollView>;
    HorizontalScrollView: Internal.SpotifyPlusComponent<Internal.HorizontalScrollViewProps, Internal.HorizontalScrollView>;
    Pressable: Internal.SpotifyPlusComponent<Internal.PressableProps, Internal.Pressable>;
    TouchableOpacity: Internal.SpotifyPlusComponent<Internal.TouchableOpacityProps, Internal.TouchableOpacity>;
    FlatList: Internal.FlatListComponent;
    HorizontalStackLayout: Internal.SpotifyPlusComponent<Internal.ViewProps, Internal.HorizontalStackLayout>;
    VerticalStackLayout: Internal.SpotifyPlusComponent<Internal.ViewProps, Internal.VerticalStackLayout>;
    Row: Internal.SpotifyPlusComponent<Internal.ViewProps, Internal.Row>;
    Column: Internal.SpotifyPlusComponent<Internal.ViewProps, Internal.Column>;
    StyleSheet: {
        create<T extends Record<string, Internal.RNStyle>>(styles: T): T;
        flatten(style: Internal.StyleProp<Internal.RNStyle>): {
            [x: string]: unknown;
        };
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
