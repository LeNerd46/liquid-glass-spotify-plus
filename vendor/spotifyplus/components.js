"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// sdk/components.ts
var components_exports = {};
__export(components_exports, {
  ActivityIndicator: () => ActivityIndicator2,
  Button: () => Button2,
  CanvasView: () => CanvasView2,
  CheckBox: () => CheckBox2,
  Column: () => Column2,
  EditText: () => EditText2,
  FlatList: () => FlatList2,
  FrameLayout: () => FrameLayout2,
  HorizontalScrollView: () => HorizontalScrollView2,
  HorizontalStackLayout: () => HorizontalStackLayout2,
  Image: () => Image2,
  ImageButton: () => ImageButton2,
  ImageView: () => ImageView2,
  LinearLayout: () => LinearLayout2,
  NativeView: () => NativeView2,
  PlainView: () => PlainView2,
  Pressable: () => Pressable2,
  ProgressBar: () => ProgressBar2,
  ProgressBarHorizontal: () => ProgressBarHorizontal2,
  RadioButton: () => RadioButton2,
  RadioGroup: () => RadioGroup2,
  RelativeLayout: () => RelativeLayout2,
  RenderView: () => RenderView2,
  Row: () => Row2,
  SafeAreaView: () => SafeAreaView2,
  ScriptView: () => ScriptView2,
  ScrollView: () => ScrollView2,
  SeekBar: () => SeekBar2,
  Slider: () => Slider2,
  Space: () => Space2,
  StyleSheet: () => StyleSheet2,
  Switch: () => Switch2,
  Text: () => Text2,
  TextInput: () => TextInput2,
  TextView: () => TextView2,
  ToggleButton: () => ToggleButton2,
  TouchableOpacity: () => TouchableOpacity2,
  VerticalStackLayout: () => VerticalStackLayout2,
  View: () => View2,
  createNativeComponent: () => createNativeComponent2,
  default: () => components_default
});
module.exports = __toCommonJS(components_exports);

// ui/components.ts
var import_react = __toESM(require("react"));
function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function flattenStyle(style) {
  if (!style) return {};
  if (Array.isArray(style)) {
    const result = {};
    for (const entry of style)
      Object.assign(result, flattenStyle(entry));
    return result;
  }
  return isPlainObject(style) ? { ...style } : {};
}
function normalizeLayoutSize(value) {
  if (value === "match_parent" || value === "match" || value === "fill_parent" || value === "fill")
    return "100%";
  if (value === "wrap_content" || value === "wrap") return "auto";
  return value;
}
function normalizeSizeInput(input) {
  const output = { ...input };
  const keys = [
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "flexBasis",
    "margin",
    "marginHorizontal",
    "marginVertical",
    "marginLeft",
    "marginRight",
    "marginTop",
    "marginBottom",
    "marginStart",
    "marginEnd",
    "padding",
    "paddingHorizontal",
    "paddingVertical",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom",
    "paddingStart",
    "paddingEnd",
    "top",
    "bottom",
    "left",
    "right",
    "start",
    "end",
    "translateX",
    "translateY",
    "translateZ",
    "elevation",
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderWidth",
    "borderLeftWidth",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderStartWidth",
    "borderEndWidth",
    "gap",
    "rowGap",
    "columnGap",
    "dividerPadding"
  ];
  for (const key of keys)
    if (output[key] !== void 0)
      output[key] = normalizeLayoutSize(output[key]);
  return output;
}
function mergeTextStyle(fontWeight, fontStyle) {
  const isBold = typeof fontWeight === "number" ? fontWeight >= 600 : fontWeight === "bold" || fontWeight === "600" || fontWeight === "700" || fontWeight === "800" || fontWeight === "900";
  const isItalic = fontStyle === "italic";
  if (isBold && isItalic) return { textStyle: "bold|italic" };
  if (isBold) return { textStyle: "bold" };
  if (isItalic) return { textStyle: "italic" };
  return {};
}
function mapDisplay(display, visible, explicitVisibility) {
  const output = {};
  if (display !== void 0) output.display = display;
  if (explicitVisibility) output.visibility = explicitVisibility;
  else if (visible === false) output.visibility = "gone";
  else if (visible === true) output.visibility = "visible";
  if (display === "none" && output.visibility === void 0)
    output.visibility = "gone";
  return output;
}
function mapDisabled(disabled, enabled) {
  if (disabled != null) return { enabled: !disabled };
  if (enabled != null) return { enabled };
  return {};
}
function mapPointerEvents(pointerEvents, clickable) {
  if (pointerEvents === "none" || pointerEvents === "box-none")
    return { clickable: false, longClickable: false, focusable: false };
  if (pointerEvents === "auto" || pointerEvents === "box-only")
    return { clickable: true };
  if (clickable != null) return { clickable };
  return {};
}
function normalizeAngle(value) {
  if (typeof value !== "string") return value;
  const text = value.trim().toLowerCase();
  if (text.endsWith("deg")) return parseFloat(text);
  if (text.endsWith("rad")) return parseFloat(text) * 180 / Math.PI;
  return value;
}
function mapTransform(transform) {
  const output = {};
  if (!Array.isArray(transform)) return output;
  for (const item of transform) {
    if (!isPlainObject(item)) continue;
    for (const [key, value] of Object.entries(item)) {
      if (key === "translateX" && output.translationX === void 0)
        output.translationX = normalizeLayoutSize(value);
      else if (key === "translateY" && output.translationY === void 0)
        output.translationY = normalizeLayoutSize(value);
      else if (key === "translateZ" && output.translationZ === void 0)
        output.translationZ = normalizeLayoutSize(value);
      else if (key === "scale") {
        if (output.scaleX === void 0) output.scaleX = value;
        if (output.scaleY === void 0) output.scaleY = value;
      } else if (key === "scaleX" && output.scaleX === void 0)
        output.scaleX = value;
      else if (key === "scaleY" && output.scaleY === void 0)
        output.scaleY = value;
      else if ((key === "rotate" || key === "rotation") && output.rotation === void 0)
        output.rotation = normalizeAngle(value);
      else if (key === "rotateX" && output.rotationX === void 0)
        output.rotationX = normalizeAngle(value);
      else if (key === "rotateY" && output.rotationY === void 0)
        output.rotationY = normalizeAngle(value);
    }
  }
  return output;
}
function mapCommonProps(input) {
  const output = {
    ...mapDisplay(
      input.display,
      input.visible,
      input.visibility
    ),
    ...mapDisabled(
      input.disabled,
      input.enabled
    ),
    ...mapPointerEvents(
      input.pointerEvents,
      input.clickable
    ),
    ...mapTransform(input.transform)
  };
  if (input.opacity !== void 0 && input.alpha === void 0)
    output.alpha = input.opacity;
  if (input.translateX !== void 0 && input.translationX === void 0)
    output.translationX = normalizeLayoutSize(input.translateX);
  if (input.translateY !== void 0 && input.translationY === void 0)
    output.translationY = normalizeLayoutSize(input.translateY);
  if (input.translateZ !== void 0 && input.translationZ === void 0)
    output.translationZ = normalizeLayoutSize(input.translateZ);
  if (input.accessibilityLabel !== void 0 && input.contentDescription === void 0)
    output.contentDescription = input.accessibilityLabel;
  if (input.testID !== void 0 && input.tag === void 0)
    output.tag = input.testID;
  if (input.nativeID !== void 0 && input.tag === void 0)
    output.tag = input.nativeID;
  if (input.layoutWeight !== void 0 && input.flex === void 0 && input.flexGrow === void 0)
    output.flexGrow = input.layoutWeight;
  if (input.orientation !== void 0 && input.flexDirection === void 0)
    output.flexDirection = input.orientation === "horizontal" ? "row" : "column";
  return output;
}
function mapTextAlign(textAlign) {
  if (!textAlign || textAlign === "auto") return {};
  if (textAlign === "center")
    return { gravity: "center_horizontal", textAlignment: "center" };
  if (textAlign === "right")
    return { gravity: "right", textAlignment: "viewEnd" };
  return { gravity: "left", textAlignment: "viewStart" };
}
function mapEllipsizeMode(value) {
  if (!value || value === "clip") return {};
  if (value === "head") return { ellipsize: "start" };
  if (value === "middle") return { ellipsize: "middle" };
  return { ellipsize: "end" };
}
function mapTextProps(input) {
  const output = {
    ...mergeTextStyle(
      input.fontWeight,
      input.fontStyle
    ),
    ...mapTextAlign(input.textAlign),
    ...mapEllipsizeMode(input.ellipsizeMode)
  };
  if (input.color !== void 0 && input.textColor === void 0)
    output.textColor = input.color;
  if (input.fontSize !== void 0 && input.textSizeSp === void 0)
    output.textSizeSp = input.fontSize;
  if (input.selectable !== void 0 && input.textIsSelectable === void 0)
    output.textIsSelectable = input.selectable;
  if (input.allowFontPadding !== void 0 && input.includeFontPadding === void 0)
    output.includeFontPadding = input.allowFontPadding;
  if (input.numberOfLines !== void 0) {
    output.maxLines = input.numberOfLines;
    if (input.numberOfLines === 1) output.singleLine = true;
  }
  if (input.textTransform === "uppercase" && input.allCaps === void 0)
    output.allCaps = true;
  if (input.lineHeight !== void 0 && input.fontSize !== void 0 && input.lineSpacingExtra === void 0) {
    output.lineSpacingExtra = Math.max(
      0,
      Number(input.lineHeight) - Number(input.fontSize)
    );
    output.lineSpacingMultiplier = 1;
  }
  return output;
}
function mapKeyboardType(value, secureTextEntry, multiline) {
  if (secureTextEntry) return "password";
  if (multiline) return "multiline";
  if (value === "email-address") return "email";
  if (value === "numeric") return "number";
  if (value === "decimal-pad") return "decimal";
  if (value === "phone-pad") return "phone";
  return "text";
}
function mapReturnKeyType(value) {
  if (value === "done") return "done";
  if (value === "go") return "go";
  if (value === "next") return "next";
  if (value === "search") return "search";
  if (value === "send") return "send";
  return void 0;
}
function mapTextInputProps(input) {
  const output = {};
  if (input.value !== void 0 && input.text === void 0)
    output.text = String(input.value);
  else if (input.defaultValue !== void 0 && input.text === void 0)
    output.text = String(input.defaultValue);
  if (input.placeholder !== void 0 && input.hint === void 0)
    output.hint = input.placeholder;
  if (input.placeholderTextColor !== void 0 && input.hintColor === void 0)
    output.hintColor = input.placeholderTextColor;
  if (input.selectTextOnFocus !== void 0 && input.selectAllOnFocus === void 0)
    output.selectAllOnFocus = input.selectTextOnFocus;
  if (input.caretHidden !== void 0 && input.cursorVisible === void 0)
    output.cursorVisible = !input.caretHidden;
  if (input.editable !== void 0 && input.enabled === void 0)
    output.enabled = input.editable;
  const inputType = mapKeyboardType(
    input.keyboardType,
    input.secureTextEntry,
    input.multiline
  );
  if (inputType !== void 0 && input.inputType === void 0)
    output.inputType = inputType;
  const imeOptions = mapReturnKeyType(
    input.returnKeyType
  );
  if (imeOptions !== void 0 && input.imeOptions === void 0)
    output.imeOptions = imeOptions;
  return output;
}
function mapResizeMode(value) {
  switch (value) {
    case "cover":
      return "centerCrop";
    case "contain":
      return "fitCenter";
    case "stretch":
      return "fitXY";
    case "center":
      return "center";
    default:
      return void 0;
  }
}
function mapButtonProps(input) {
  const output = {};
  if (input.title !== void 0 && input.text === void 0)
    output.text = input.title;
  return output;
}
function mapCompoundButtonProps(input) {
  const output = {};
  if (input.value !== void 0 && input.checked === void 0)
    output.checked = input.value;
  return output;
}
function mapSwitchProps(input) {
  const output = {};
  if (input.thumbColor !== void 0 && input.thumbTintColor === void 0)
    output.thumbTintColor = input.thumbColor;
  if (input.trackColor !== void 0 && input.trackTintColor === void 0)
    output.trackTintColor = input.trackColor;
  return output;
}
function mapActivityIndicatorProps(input) {
  const output = {};
  if (input.animating !== void 0 && input.indeterminate === void 0)
    output.indeterminate = input.animating;
  if (input.color !== void 0 && input.progressTintColor === void 0)
    output.progressTintColor = input.color;
  if (input.hidesWhenStopped === true && input.animating === false) {
    output.display = "none";
    output.visibility = "gone";
  }
  return output;
}
function mapImageSource(source) {
  if (typeof source === "string") return source;
  if (source && typeof source === "object" && source.type === "extension-asset") return source;
  if (source && typeof source === "object" && typeof source.uri === "string")
    return source.uri;
  return void 0;
}
function mapImageProps(input) {
  const output = {};
  const src = mapImageSource(input.src) ?? mapImageSource(input.source);
  if (src !== void 0) output.src = src;
  const scaleType = mapResizeMode(
    input.resizeMode
  );
  if (scaleType !== void 0 && input.scaleType === void 0)
    output.scaleType = scaleType;
  if (input.tintColor !== void 0) output.tintColor = input.tintColor;
  if (input.adjustViewBounds !== void 0)
    output.adjustViewBounds = input.adjustViewBounds;
  if (input.cropToPadding !== void 0)
    output.cropToPadding = input.cropToPadding;
  return output;
}
function cleanUndefined(object) {
  for (const key of Object.keys(object))
    if (object[key] === void 0) delete object[key];
}
function normalizeProps(props, mapper) {
  if (!props) return {};
  const { style, children, ref, ...rest } = props;
  const merged = normalizeSizeInput({
    ...flattenStyle(style),
    ...rest
  });
  const normalized = {
    ...merged,
    ...mapCommonProps(merged),
    ...mapper ? mapper(merged) : {}
  };
  cleanUndefined(normalized);
  delete normalized.visible;
  delete normalized.disabled;
  delete normalized.pointerEvents;
  delete normalized.opacity;
  delete normalized.translateX;
  delete normalized.translateY;
  delete normalized.translateZ;
  delete normalized.accessibilityLabel;
  delete normalized.testID;
  delete normalized.nativeID;
  delete normalized.layoutWeight;
  delete normalized.orientation;
  delete normalized.transform;
  delete normalized.title;
  delete normalized.color;
  delete normalized.fontSize;
  delete normalized.textAlign;
  delete normalized.lineHeight;
  delete normalized.allowFontPadding;
  delete normalized.ellipsizeMode;
  delete normalized.numberOfLines;
  delete normalized.selectable;
  delete normalized.placeholder;
  delete normalized.placeholderTextColor;
  delete normalized.keyboardType;
  delete normalized.secureTextEntry;
  delete normalized.multiline;
  delete normalized.returnKeyType;
  delete normalized.selectTextOnFocus;
  delete normalized.caretHidden;
  delete normalized.editable;
  delete normalized.defaultValue;
  delete normalized.source;
  delete normalized.resizeMode;
  delete normalized.thumbColor;
  delete normalized.trackColor;
  delete normalized.animating;
  delete normalized.hidesWhenStopped;
  delete normalized.horizontal;
  delete normalized.contentContainerStyle;
  delete normalized.showsVerticalScrollIndicator;
  delete normalized.showsHorizontalScrollIndicator;
  if (children !== void 0) normalized.children = children;
  return normalized;
}
function createMappedRef(nativeRef, mapper) {
  if (!nativeRef) return null;
  return {
    get nodeId() {
      return nativeRef.nodeId;
    },
    get type() {
      return nativeRef.type;
    },
    get mounted() {
      return nativeRef.mounted;
    },
    getNativeNodeId() {
      return nativeRef.getNativeNodeId();
    },
    setNativeProps(props) {
      nativeRef.setNativeProps(normalizeProps(props, mapper));
    },
    focus() {
      nativeRef.focus();
    },
    blur() {
      nativeRef.blur();
    },
    measure(callback) {
      nativeRef.measure(callback);
    },
    measureInWindow(callback) {
      nativeRef.measureInWindow(callback);
    },
    scrollTo(options, y, animated) {
      nativeRef.scrollTo(options, y, animated);
    },
    scrollToEnd(options) {
      nativeRef.scrollToEnd(options);
    },
    flashScrollIndicators() {
      nativeRef.flashScrollIndicators();
    },
    dispatchCommand(command, args, callback) {
      nativeRef.dispatchCommand(command, args, callback);
    },
    command(command, args, callback) {
      nativeRef.command(command, args, callback);
    }
  };
}
function createNativeComponent(name, options) {
  const type = options?.scriptId ? `native:${options.scriptId}/${name}` : `native:${name}`;
  return createHostComponent(type, mapViewLike);
}
var NativeView = createNativeComponent;
function createHostComponent(type, mapper) {
  const Component = import_react.default.forwardRef((props, ref) => {
    const nativeRef = import_react.default.useRef(null);
    import_react.default.useImperativeHandle(ref, () => createMappedRef(nativeRef.current, mapper), [mapper]);
    return import_react.default.createElement(type, { ...normalizeProps(props, mapper), ref: nativeRef });
  });
  Component.displayName = type;
  return Component;
}
var mapViewLike = (input) => input;
var mapTextLike = (input) => mapTextProps(input);
var mapTextInputLike = (input) => ({
  ...mapTextProps(input),
  ...mapTextInputProps(input)
});
var mapImageLike = (input) => mapImageProps(input);
var mapButtonLike = (input) => ({
  ...mapTextProps(input),
  ...mapButtonProps(input)
});
var mapCompoundButtonLike = (input) => ({
  ...mapTextProps(input),
  ...mapCompoundButtonProps(input)
});
var mapSwitchLike = (input) => ({
  ...mapTextProps(input),
  ...mapCompoundButtonProps(input),
  ...mapSwitchProps(input)
});
var mapProgressLike = (input) => input;
var mapActivityIndicatorLike = (input) => mapActivityIndicatorProps(input);
var mapSliderLike = (input) => input;
function resolvePressableStyle(style, state) {
  return typeof style === "function" ? style(state) : style;
}
function resolvePressableChildren(children, state) {
  return typeof children === "function" ? children(state) : children;
}
function renderComponentOrElement(component, props) {
  if (!component) return null;
  if (import_react.default.isValidElement(component)) return component;
  return import_react.default.createElement(component, props ?? {});
}
var NativeScrollView = createHostComponent("ScrollView", mapViewLike);
var NativeHorizontalScrollView = createHostComponent("HorizontalScrollView", mapViewLike);
var NativeVirtualizedList = createHostComponent(
  "VirtualizedList",
  mapViewLike
);
var VirtualizedCell = createHostComponent(
  "VirtualizedCell",
  mapViewLike
);
var View = createHostComponent("View", mapViewLike);
var LinearLayout = createHostComponent(
  "LinearLayout",
  mapViewLike
);
var FrameLayout = createHostComponent(
  "FrameLayout",
  mapViewLike
);
var RelativeLayout = createHostComponent(
  "RelativeLayout",
  mapViewLike
);
var PlainView = createHostComponent(
  "PlainView",
  mapViewLike
);
var Text = createHostComponent("Text", mapTextLike);
var TextView = createHostComponent("TextView", mapTextLike);
var TextInput = createHostComponent(
  "EditText",
  mapTextInputLike
);
var EditText = TextInput;
var Button = createHostComponent("Button", mapButtonLike);
var ProgressBar = createHostComponent(
  "ProgressBar",
  mapProgressLike
);
var ProgressBarHorizontal = createHostComponent(
  "ProgressBarHorizontal",
  mapProgressLike
);
var ActivityIndicator = createHostComponent(
  "ProgressBar",
  mapActivityIndicatorLike
);
var Slider = createHostComponent(
  "SeekBar",
  mapSliderLike
);
var SeekBar = Slider;
var Image = createHostComponent("Image", mapImageLike);
var ImageView = Image;
var ImageButton = createHostComponent(
  "ImageButton",
  mapImageLike
);
var Switch = createHostComponent("Switch", mapSwitchLike);
var CheckBox = createHostComponent(
  "CheckBox",
  mapCompoundButtonLike
);
var RadioButton = createHostComponent(
  "RadioButton",
  mapCompoundButtonLike
);
var RadioGroup = createHostComponent(
  "RadioGroup",
  mapViewLike
);
var ToggleButton = createHostComponent(
  "ToggleButton",
  mapCompoundButtonLike
);
var Space = createHostComponent("Space", mapViewLike);
var ScriptView = createHostComponent("ScriptView", mapViewLike);
var RenderView = ScriptView;
var CanvasView = ScriptView;
var SafeAreaView = View;
var ScrollView = import_react.default.forwardRef((props, ref) => {
  const {
    horizontal,
    contentContainerStyle,
    showsVerticalScrollIndicator,
    showsHorizontalScrollIndicator,
    children,
    ...rest
  } = props;
  const hostProps = { ...rest };
  if (showsVerticalScrollIndicator !== void 0 && hostProps.verticalScrollBarEnabled === void 0)
    hostProps.verticalScrollBarEnabled = showsVerticalScrollIndicator;
  if (showsHorizontalScrollIndicator !== void 0 && hostProps.horizontalScrollBarEnabled === void 0)
    hostProps.horizontalScrollBarEnabled = showsHorizontalScrollIndicator;
  const HostComponent = horizontal ? NativeHorizontalScrollView : NativeScrollView;
  const contentStyle = horizontal ? [{ flexDirection: "row" }, contentContainerStyle] : contentContainerStyle;
  const content = contentStyle ? import_react.default.createElement(View, { style: contentStyle }, children) : children;
  return import_react.default.createElement(HostComponent, { ...hostProps, ref }, content);
});
ScrollView.displayName = "ScrollView";
var HorizontalScrollView = import_react.default.forwardRef(
  (props, ref) => import_react.default.createElement(ScrollView, { ...props, horizontal: true, ref })
);
HorizontalScrollView.displayName = "HorizontalScrollView";
var Pressable = import_react.default.forwardRef((props, ref) => {
  const { style, children, onPressIn, onPressOut, onFocus, onBlur, ...rest } = props;
  const [pressed, setPressed] = import_react.default.useState(false);
  const [focused, setFocused] = import_react.default.useState(false);
  const state = { pressed, focused };
  return import_react.default.createElement(
    View,
    {
      ...rest,
      ref,
      style: resolvePressableStyle(style, state),
      onPressIn: (event) => {
        setPressed(true);
        onPressIn?.(event);
      },
      onPressOut: (event) => {
        setPressed(false);
        onPressOut?.(event);
      },
      onFocus: (event) => {
        setFocused(true);
        onFocus?.(event);
      },
      onBlur: (event) => {
        setFocused(false);
        setPressed(false);
        onBlur?.(event);
      }
    },
    resolvePressableChildren(children, state)
  );
});
Pressable.displayName = "Pressable";
var TouchableOpacity = import_react.default.forwardRef((props, ref) => {
  const { activeOpacity = 0.2, style, ...rest } = props;
  return import_react.default.createElement(Pressable, {
    ...rest,
    ref,
    style: (state) => [
      resolvePressableStyle(style, state),
      state.pressed ? { opacity: activeOpacity } : null
    ]
  });
});
TouchableOpacity.displayName = "TouchableOpacity";
function clampRange(first, last, itemCount) {
  if (itemCount <= 0) return { first: 0, last: -1 };
  return {
    first: Math.max(0, Math.min(first, itemCount - 1)),
    last: Math.max(0, Math.min(last, itemCount - 1))
  };
}
function renderFlatListRow(row, renderItem, ListHeaderComponent, ListFooterComponent, ListEmptyComponent, ItemSeparatorComponent) {
  switch (row.kind) {
    case "header":
      return renderComponentOrElement(ListHeaderComponent);
    case "footer":
      return renderComponentOrElement(ListFooterComponent);
    case "empty":
      return renderComponentOrElement(ListEmptyComponent);
    case "separator":
      return renderComponentOrElement(ItemSeparatorComponent, {
        leadingItem: row.leadingItem,
        leadingIndex: row.dataIndex
      });
    case "item":
      return renderItem({ item: row.item, index: row.dataIndex });
  }
}
var FlatList = import_react.default.forwardRef(function FlatListInner(props, ref) {
  const {
    data,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    ListFooterComponent,
    ListEmptyComponent,
    ItemSeparatorComponent,
    initialNumToRender = 10,
    windowSize = 5,
    maxToRenderPerBatch,
    estimatedItemSize = 64,
    getItemLayout,
    initialScrollIndex,
    onViewableItemsChanged,
    itemLayoutAnimation,
    ...listProps
  } = props;
  const items = data ?? [];
  const nativeRef = import_react.default.useRef(null);
  const rows = import_react.default.useMemo(() => {
    const output = [];
    if (ListHeaderComponent) output.push({ kind: "header", key: "$header" });
    if (items.length === 0) {
      if (ListEmptyComponent) output.push({ kind: "empty", key: "$empty" });
    } else {
      items.forEach((item, index) => {
        const key = keyExtractor ? keyExtractor(item, index) : String(index);
        output.push({ kind: "item", key, item, dataIndex: index });
        if (ItemSeparatorComponent && index < items.length - 1)
          output.push({ kind: "separator", key: `${key}:separator`, leadingItem: item, dataIndex: index });
      });
    }
    if (ListFooterComponent) output.push({ kind: "footer", key: "$footer" });
    return output;
  }, [ItemSeparatorComponent, ListEmptyComponent, ListFooterComponent, ListHeaderComponent, items, keyExtractor]);
  const dataIndexToRowIndex = import_react.default.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    rows.forEach((row, index) => {
      if (row.kind === "item") map.set(row.dataIndex, index);
    });
    return map;
  }, [rows]);
  const initialRange = import_react.default.useMemo(() => {
    const targetRow = initialScrollIndex != null ? dataIndexToRowIndex.get(initialScrollIndex) ?? 0 : 0;
    return clampRange(targetRow, targetRow + Math.max(1, initialNumToRender) - 1, rows.length);
  }, [dataIndexToRowIndex, initialNumToRender, initialScrollIndex, rows.length]);
  const [visibleRange, setVisibleRange] = import_react.default.useState(initialRange);
  import_react.default.useEffect(() => {
    setVisibleRange(initialRange);
  }, [initialRange.first, initialRange.last]);
  import_react.default.useImperativeHandle(ref, () => {
    const base = createMappedRef(nativeRef.current, mapViewLike) ?? {};
    return {
      ...base,
      scrollToIndex(params) {
        const rowIndex = dataIndexToRowIndex.get(params.index);
        if (rowIndex == null) return;
        const layout = getItemLayout?.(data, params.index);
        nativeRef.current?.dispatchCommand("scrollToIndex", {
          index: rowIndex,
          animated: params.animated !== false,
          viewOffset: params.viewOffset ?? 0,
          viewPosition: params.viewPosition ?? 0,
          offset: layout?.offset
        });
      },
      scrollToOffset(params) {
        nativeRef.current?.dispatchCommand("scrollToOffset", {
          offset: params.offset,
          animated: params.animated !== false
        });
      }
    };
  }, [data, dataIndexToRowIndex, getItemLayout]);
  const renderedRows = rows.slice(visibleRange.first, visibleRange.last + 1);
  return import_react.default.createElement(
    NativeVirtualizedList,
    {
      ...listProps,
      ref: nativeRef,
      itemCount: rows.length,
      estimatedItemSize,
      initialNumToRender,
      windowSize,
      initialScrollIndex: initialScrollIndex != null ? dataIndexToRowIndex.get(initialScrollIndex) ?? 0 : void 0,
      onVisibleRangeChange: (event) => {
        const next = clampRange(event.first, event.last, rows.length);
        setVisibleRange(next);
        if (onViewableItemsChanged) {
          const viewableItems = rows.slice(Math.max(0, event.visibleFirst), Math.min(rows.length, event.visibleLast + 1)).filter((row) => row.kind === "item").map((row) => ({ item: row.item, index: row.dataIndex, key: row.key, isViewable: true }));
          onViewableItemsChanged({ viewableItems, changed: viewableItems });
        }
      }
    },
    renderedRows.map(
      (row, offset) => import_react.default.createElement(
        VirtualizedCell,
        {
          key: row.key,
          itemIndex: visibleRange.first + offset,
          itemLayoutAnimation,
          style: { width: "100%" }
        },
        renderFlatListRow(row, renderItem, ListHeaderComponent, ListFooterComponent, ListEmptyComponent, ItemSeparatorComponent)
      )
    )
  );
});
FlatList.displayName = "FlatList";
var HorizontalStackLayout = import_react.default.forwardRef(
  (props, ref) => import_react.default.createElement(View, { ...props, ref, style: [{ flexDirection: "row" }, props.style] })
);
HorizontalStackLayout.displayName = "HorizontalStackLayout";
var VerticalStackLayout = import_react.default.forwardRef(
  (props, ref) => import_react.default.createElement(View, { ...props, ref, style: [{ flexDirection: "column" }, props.style] })
);
VerticalStackLayout.displayName = "VerticalStackLayout";
var Row = HorizontalStackLayout;
var Column = VerticalStackLayout;
var StyleSheet = {
  create(styles) {
    return styles;
  },
  flatten(style) {
    return flattenStyle(style);
  },
  absoluteFillObject: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

// sdk/components.ts
var createNativeComponent2 = createNativeComponent;
var NativeView2 = NativeView;
var View2 = View;
var LinearLayout2 = LinearLayout;
var FrameLayout2 = FrameLayout;
var RelativeLayout2 = RelativeLayout;
var PlainView2 = PlainView;
var Text2 = Text;
var TextView2 = TextView;
var TextInput2 = TextInput;
var Button2 = Button;
var ProgressBar2 = ProgressBar;
var ProgressBarHorizontal2 = ProgressBarHorizontal;
var ActivityIndicator2 = ActivityIndicator;
var Slider2 = Slider;
var Image2 = Image;
var ImageButton2 = ImageButton;
var Switch2 = Switch;
var CheckBox2 = CheckBox;
var RadioButton2 = RadioButton;
var RadioGroup2 = RadioGroup;
var ToggleButton2 = ToggleButton;
var Space2 = Space;
var ScriptView2 = ScriptView;
var EditText2 = EditText;
var SeekBar2 = SeekBar;
var ImageView2 = ImageView;
var RenderView2 = RenderView;
var CanvasView2 = CanvasView;
var SafeAreaView2 = SafeAreaView;
var ScrollView2 = ScrollView;
var HorizontalScrollView2 = HorizontalScrollView;
var Pressable2 = Pressable;
var TouchableOpacity2 = TouchableOpacity;
var FlatList2 = FlatList;
var HorizontalStackLayout2 = HorizontalStackLayout;
var VerticalStackLayout2 = VerticalStackLayout;
var Row2 = Row;
var Column2 = Column;
var StyleSheet2 = StyleSheet;
var components_default = {
  createNativeComponent: createNativeComponent2,
  NativeView: NativeView2,
  View: View2,
  LinearLayout: LinearLayout2,
  FrameLayout: FrameLayout2,
  RelativeLayout: RelativeLayout2,
  PlainView: PlainView2,
  Text: Text2,
  TextView: TextView2,
  TextInput: TextInput2,
  Button: Button2,
  ProgressBar: ProgressBar2,
  ProgressBarHorizontal: ProgressBarHorizontal2,
  ActivityIndicator: ActivityIndicator2,
  Slider: Slider2,
  Image: Image2,
  ImageButton: ImageButton2,
  Switch: Switch2,
  CheckBox: CheckBox2,
  RadioButton: RadioButton2,
  RadioGroup: RadioGroup2,
  ToggleButton: ToggleButton2,
  Space: Space2,
  ScriptView: ScriptView2,
  EditText: EditText2,
  SeekBar: SeekBar2,
  ImageView: ImageView2,
  RenderView: RenderView2,
  CanvasView: CanvasView2,
  SafeAreaView: SafeAreaView2,
  ScrollView: ScrollView2,
  HorizontalScrollView: HorizontalScrollView2,
  Pressable: Pressable2,
  TouchableOpacity: TouchableOpacity2,
  FlatList: FlatList2,
  HorizontalStackLayout: HorizontalStackLayout2,
  VerticalStackLayout: VerticalStackLayout2,
  Row: Row2,
  Column: Column2,
  StyleSheet: StyleSheet2
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActivityIndicator,
  Button,
  CanvasView,
  CheckBox,
  Column,
  EditText,
  FlatList,
  FrameLayout,
  HorizontalScrollView,
  HorizontalStackLayout,
  Image,
  ImageButton,
  ImageView,
  LinearLayout,
  NativeView,
  PlainView,
  Pressable,
  ProgressBar,
  ProgressBarHorizontal,
  RadioButton,
  RadioGroup,
  RelativeLayout,
  RenderView,
  Row,
  SafeAreaView,
  ScriptView,
  ScrollView,
  SeekBar,
  Slider,
  Space,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TextView,
  ToggleButton,
  TouchableOpacity,
  VerticalStackLayout,
  View,
  createNativeComponent
});
