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

// sdk/reanimated.ts
var reanimated_exports = {};
__export(reanimated_exports, {
  ANIMATED_PAYLOAD_KEY: () => ANIMATED_PAYLOAD_KEY,
  ANIMATION_MARKER_KEY: () => ANIMATION_MARKER_KEY,
  Animated: () => Animated,
  AnimatedRuntime: () => AnimatedRuntime,
  BaseGesture: () => BaseGesture,
  BounceIn: () => BounceIn,
  BounceInDown: () => BounceInDown,
  BounceInLeft: () => BounceInLeft,
  BounceInRight: () => BounceInRight,
  BounceInUp: () => BounceInUp,
  BounceOut: () => BounceOut,
  BounceOutDown: () => BounceOutDown,
  BounceOutLeft: () => BounceOutLeft,
  BounceOutRight: () => BounceOutRight,
  BounceOutUp: () => BounceOutUp,
  CSS: () => CSS,
  CSSAnimationEasing: () => CSSAnimationEasing,
  CanvasView: () => CanvasView,
  CurvedTransition: () => CurvedTransition,
  DefaultLayoutEasing: () => DefaultLayoutEasing,
  Directions: () => Directions,
  DynamicColorIOS: () => DynamicColorIOS,
  Easing: () => Easing,
  EntryExitTransition: () => EntryExitTransition,
  Extrapolation: () => Extrapolation,
  FadeIn: () => FadeIn,
  FadeInDown: () => FadeInDown,
  FadeInDownBig: () => FadeInDownBig,
  FadeInLeft: () => FadeInLeft,
  FadeInLeftBig: () => FadeInLeftBig,
  FadeInRight: () => FadeInRight,
  FadeInRightBig: () => FadeInRightBig,
  FadeInUp: () => FadeInUp,
  FadeInUpBig: () => FadeInUpBig,
  FadeOut: () => FadeOut,
  FadeOutDown: () => FadeOutDown,
  FadeOutDownBig: () => FadeOutDownBig,
  FadeOutLeft: () => FadeOutLeft,
  FadeOutLeftBig: () => FadeOutLeftBig,
  FadeOutRight: () => FadeOutRight,
  FadeOutRightBig: () => FadeOutRightBig,
  FadeOutUp: () => FadeOutUp,
  FadeOutUpBig: () => FadeOutUpBig,
  FadingTransition: () => FadingTransition,
  FlatList: () => FlatList,
  FlipInEasyX: () => FlipInEasyX,
  FlipInEasyY: () => FlipInEasyY,
  FlipInXDown: () => FlipInXDown,
  FlipInXUp: () => FlipInXUp,
  FlipInYLeft: () => FlipInYLeft,
  FlipInYRight: () => FlipInYRight,
  FlipOutEasyX: () => FlipOutEasyX,
  FlipOutEasyY: () => FlipOutEasyY,
  FlipOutXDown: () => FlipOutXDown,
  FlipOutXUp: () => FlipOutXUp,
  FlipOutYLeft: () => FlipOutYLeft,
  FlipOutYRight: () => FlipOutYRight,
  GESTURE_MARKER_KEY: () => GESTURE_MARKER_KEY,
  Gesture: () => Gesture,
  GestureDetector: () => GestureDetector2,
  GestureState: () => GestureState,
  IOSReferenceFrame: () => IOSReferenceFrame,
  Image: () => Image,
  JumpingTransition: () => JumpingTransition,
  KeyboardState: () => KeyboardState,
  Keyframe: () => Keyframe,
  Layout: () => Layout,
  LayoutAnimationBuilder: () => LayoutAnimationBuilder,
  LayoutAnimationConfig: () => LayoutAnimationConfig,
  LightSpeedInLeft: () => LightSpeedInLeft,
  LightSpeedInRight: () => LightSpeedInRight,
  LightSpeedOutLeft: () => LightSpeedOutLeft,
  LightSpeedOutRight: () => LightSpeedOutRight,
  LinearTransition: () => LinearTransition,
  MouseButton: () => MouseButton,
  PinwheelIn: () => PinwheelIn,
  PinwheelOut: () => PinwheelOut,
  ReanimatedLogLevel: () => ReanimatedLogLevel,
  ReduceMotion: () => ReduceMotion,
  ReducedMotionConfig: () => ReducedMotionConfig,
  RenderView: () => RenderView,
  RollInLeft: () => RollInLeft,
  RollInRight: () => RollInRight,
  RollOutLeft: () => RollOutLeft,
  RollOutRight: () => RollOutRight,
  RotateInDownLeft: () => RotateInDownLeft,
  RotateInDownRight: () => RotateInDownRight,
  RotateInUpLeft: () => RotateInUpLeft,
  RotateInUpRight: () => RotateInUpRight,
  RotateOutDownLeft: () => RotateOutDownLeft,
  RotateOutDownRight: () => RotateOutDownRight,
  RotateOutUpLeft: () => RotateOutUpLeft,
  RotateOutUpRight: () => RotateOutUpRight,
  RuntimeKind: () => RuntimeKind,
  SHARED_VALUE_KEY: () => SHARED_VALUE_KEY,
  ScriptView: () => ScriptView,
  ScrollView: () => ScrollView,
  SensorType: () => SensorType,
  SequencedTransition: () => SequencedTransition,
  SharedTransition: () => SharedTransition,
  SlideInDown: () => SlideInDown,
  SlideInLeft: () => SlideInLeft,
  SlideInRight: () => SlideInRight,
  SlideInUp: () => SlideInUp,
  SlideOutDown: () => SlideOutDown,
  SlideOutLeft: () => SlideOutLeft,
  SlideOutRight: () => SlideOutRight,
  SlideOutUp: () => SlideOutUp,
  StretchInX: () => StretchInX,
  StretchInY: () => StretchInY,
  StretchOutX: () => StretchOutX,
  StretchOutY: () => StretchOutY,
  Text: () => Text,
  UnsupportedPlatformError: () => UnsupportedPlatformError,
  View: () => View,
  WORKLET_GLOBALS_MANIFEST: () => WORKLET_GLOBALS_MANIFEST,
  WORKLET_GLOBAL_EXPORTS: () => WORKLET_GLOBAL_EXPORTS,
  WORKLET_METADATA_KEY: () => WORKLET_METADATA_KEY,
  WorkletValidationError: () => WorkletValidationError,
  ZoomIn: () => ZoomIn,
  ZoomInDown: () => ZoomInDown,
  ZoomInEasyDown: () => ZoomInEasyDown,
  ZoomInEasyUp: () => ZoomInEasyUp,
  ZoomInLeft: () => ZoomInLeft,
  ZoomInRight: () => ZoomInRight,
  ZoomInRotate: () => ZoomInRotate,
  ZoomInUp: () => ZoomInUp,
  ZoomOut: () => ZoomOut,
  ZoomOutDown: () => ZoomOutDown,
  ZoomOutEasyDown: () => ZoomOutEasyDown,
  ZoomOutEasyUp: () => ZoomOutEasyUp,
  ZoomOutLeft: () => ZoomOutLeft,
  ZoomOutRight: () => ZoomOutRight,
  ZoomOutRotate: () => ZoomOutRotate,
  ZoomOutUp: () => ZoomOutUp,
  callMicrotasks: () => callMicrotasks,
  cancelAnimation: () => cancelAnimation,
  clamp: () => clamp,
  configureReanimatedLogger: () => configureReanimatedLogger,
  contrastColor: () => contrastColor,
  convertToRGBA: () => convertToRGBA,
  createAnimatedComponent: () => createAnimatedComponent,
  createAnimatedModule: () => createAnimatedModule,
  createAnimatedPropAdapter: () => createAnimatedPropAdapter,
  createAnimatedRuntime: () => createAnimatedRuntime,
  createGestureDetector: () => createGestureDetector,
  createGestureModule: () => createGestureModule,
  createJavaScriptAnimationAdapter: () => createJavaScriptAnimationAdapter,
  createKeyframes: () => createKeyframes,
  createWorkletRuntime: () => createWorkletRuntime,
  cubicBezier: () => cubicBezier,
  default: () => Animated,
  defineAnimation: () => defineAnimation,
  dispatchCommand: () => dispatchCommand,
  enableLayoutAnimations: () => enableLayoutAnimations,
  executeOnUIRuntimeSync: () => executeOnUIRuntimeSync,
  getReanimatedLoggerConfig: () => getReanimatedLoggerConfig,
  getRelativeCoords: () => getRelativeCoords,
  getRuntimeKind: () => getRuntimeKind,
  getTimestamp: () => getTimestamp,
  getViewProp: () => getViewProp,
  getWorkletMetadata: () => getWorkletMetadata,
  installAnimatedComponents: () => installAnimatedComponents,
  interpolate: () => interpolate,
  interpolateColor: () => interpolateColor,
  isAllowedWorkletGlobal: () => isAllowedWorkletGlobal,
  isAnimatedEventHandler: () => isAnimatedEventHandler,
  isAnimatedNodeLike: () => isAnimatedNodeLike,
  isAnimatedPropsPayload: () => isAnimatedPropsPayload,
  isAnimatedStylePayload: () => isAnimatedStylePayload,
  isAnimation: () => isAnimation,
  isGesture: () => isGesture,
  isSharedValue: () => isSharedValue,
  isWorkletFunction: () => isWorkletFunction,
  isWorkletRuntime: () => isWorkletRuntime,
  linear: () => linear,
  makeMutable: () => makeMutable,
  measure: () => measure,
  processColor: () => processColor,
  runOnJS: () => runOnJS,
  runOnRNAsync: () => runOnRNAsync,
  runOnRuntime: () => runOnRuntime,
  runOnUI: () => runOnUI,
  runOnUIAsync: () => runOnUIAsync,
  runOnUISync: () => runOnUISync,
  scheduleOnRN: () => scheduleOnRN,
  scheduleOnRuntime: () => scheduleOnRuntime,
  scheduleOnUI: () => scheduleOnUI,
  scrollTo: () => scrollTo,
  scrollToOffset: () => scrollToOffset,
  serializeGesture: () => serializeGesture,
  serializeWorklet: () => serializeWorklet,
  setNativeProps: () => setNativeProps,
  steps: () => steps,
  useAnimatedKeyboard: () => useAnimatedKeyboard,
  useAnimatedProps: () => useAnimatedProps,
  useAnimatedReaction: () => useAnimatedReaction,
  useAnimatedRef: () => useAnimatedRef,
  useAnimatedScrollHandler: () => useAnimatedScrollHandler,
  useAnimatedSensor: () => useAnimatedSensor,
  useAnimatedStyle: () => useAnimatedStyle,
  useComposedEventHandler: () => useComposedEventHandler,
  useDerivedValue: () => useDerivedValue,
  useEvent: () => useEvent,
  useFrameCallback: () => useFrameCallback,
  useFrameTimestamp: () => useFrameTimestamp,
  useHandler: () => useHandler,
  useLayoutAnimationBoundary: () => useLayoutAnimationBoundary,
  usePlaybackClock: () => usePlaybackClock,
  useReducedMotion: () => useReducedMotion,
  useScrollOffset: () => useScrollOffset,
  useScrollViewOffset: () => useScrollViewOffset,
  useSharedValue: () => useSharedValue,
  useTimestamp: () => useTimestamp,
  useWorkletCallback: () => useWorkletCallback,
  validateWorklet: () => validateWorklet,
  withClamp: () => withClamp,
  withCustomAnimation: () => withCustomAnimation,
  withDecay: () => withDecay,
  withDelay: () => withDelay,
  withRepeat: () => withRepeat,
  withSequence: () => withSequence,
  withSpring: () => withSpring,
  withTiming: () => withTiming
});
module.exports = __toCommonJS(reanimated_exports);

// ui/native-animation/animations.ts
var animations_exports = {};
__export(animations_exports, {
  Easing: () => Easing,
  defineAnimation: () => defineAnimation,
  isAnimation: () => isAnimation,
  withClamp: () => withClamp,
  withCustomAnimation: () => withCustomAnimation,
  withDecay: () => withDecay,
  withDelay: () => withDelay,
  withRepeat: () => withRepeat,
  withSequence: () => withSequence,
  withSpring: () => withSpring,
  withTiming: () => withTiming
});

// ui/native-animation/types.ts
var types_exports = {};
__export(types_exports, {
  ANIMATED_PAYLOAD_KEY: () => ANIMATED_PAYLOAD_KEY,
  ANIMATION_MARKER_KEY: () => ANIMATION_MARKER_KEY,
  Extrapolation: () => Extrapolation,
  IOSReferenceFrame: () => IOSReferenceFrame,
  KeyboardState: () => KeyboardState,
  ReduceMotion: () => ReduceMotion,
  SHARED_VALUE_KEY: () => SHARED_VALUE_KEY,
  SensorType: () => SensorType,
  WORKLET_METADATA_KEY: () => WORKLET_METADATA_KEY
});
var ANIMATED_PAYLOAD_KEY = "__spotifyPlusAnimated";
var SHARED_VALUE_KEY = "__spotifyPlusSharedValue";
var WORKLET_METADATA_KEY = "__spotifyPlusWorklet";
var ANIMATION_MARKER_KEY = "__spotifyPlusAnimation";
var ReduceMotion = /* @__PURE__ */ ((ReduceMotion2) => {
  ReduceMotion2["System"] = "system";
  ReduceMotion2["Always"] = "always";
  ReduceMotion2["Never"] = "never";
  return ReduceMotion2;
})(ReduceMotion || {});
var Extrapolation = /* @__PURE__ */ ((Extrapolation2) => {
  Extrapolation2["IDENTITY"] = "identity";
  Extrapolation2["CLAMP"] = "clamp";
  Extrapolation2["EXTEND"] = "extend";
  return Extrapolation2;
})(Extrapolation || {});
var SensorType = /* @__PURE__ */ ((SensorType2) => {
  SensorType2[SensorType2["ACCELEROMETER"] = 1] = "ACCELEROMETER";
  SensorType2[SensorType2["GYROSCOPE"] = 2] = "GYROSCOPE";
  SensorType2[SensorType2["GRAVITY"] = 3] = "GRAVITY";
  SensorType2[SensorType2["MAGNETIC_FIELD"] = 4] = "MAGNETIC_FIELD";
  SensorType2[SensorType2["ROTATION"] = 5] = "ROTATION";
  SensorType2[SensorType2["USER_ACCELERATION"] = 6] = "USER_ACCELERATION";
  return SensorType2;
})(SensorType || {});
var IOSReferenceFrame = /* @__PURE__ */ ((IOSReferenceFrame2) => {
  IOSReferenceFrame2[IOSReferenceFrame2["XArbitraryZVertical"] = 1] = "XArbitraryZVertical";
  IOSReferenceFrame2[IOSReferenceFrame2["XArbitraryCorrectedZVertical"] = 2] = "XArbitraryCorrectedZVertical";
  IOSReferenceFrame2[IOSReferenceFrame2["XMagneticNorthZVertical"] = 4] = "XMagneticNorthZVertical";
  IOSReferenceFrame2[IOSReferenceFrame2["XTrueNorthZVertical"] = 8] = "XTrueNorthZVertical";
  IOSReferenceFrame2[IOSReferenceFrame2["Auto"] = 0] = "Auto";
  return IOSReferenceFrame2;
})(IOSReferenceFrame || {});
var KeyboardState = /* @__PURE__ */ ((KeyboardState2) => {
  KeyboardState2[KeyboardState2["UNKNOWN"] = 0] = "UNKNOWN";
  KeyboardState2[KeyboardState2["OPENING"] = 1] = "OPENING";
  KeyboardState2[KeyboardState2["OPEN"] = 2] = "OPEN";
  KeyboardState2[KeyboardState2["CLOSING"] = 3] = "CLOSING";
  KeyboardState2[KeyboardState2["CLOSED"] = 4] = "CLOSED";
  return KeyboardState2;
})(KeyboardState || {});

// ui/native-animation/worklet-globals.ts
var WORKLET_GLOBAL_EXPORTS = Object.freeze([
  "ReduceMotion",
  "Extrapolation",
  "RuntimeKind",
  "SensorType",
  "KeyboardState",
  "createAnimatedPropAdapter",
  "Easing",
  "clamp",
  "interpolate",
  "interpolateColor",
  "contrastColor",
  "processColor",
  "convertToRGBA",
  "DynamicColorIOS",
  "withTiming",
  "withSpring",
  "withDecay",
  "withDelay",
  "withRepeat",
  "withSequence",
  "withClamp",
  "defineAnimation",
  "withCustomAnimation",
  "isAnimation",
  "isSharedValue",
  "isWorkletFunction",
  "cancelAnimation",
  "scheduleOnRN",
  "runOnJS",
  "scheduleOnUI",
  "runOnUI",
  "scheduleOnRuntime",
  "measure",
  "scrollTo",
  "dispatchCommand",
  "setNativeProps",
  "getViewProp",
  "getRelativeCoords",
  "getTimestamp",
  "getRuntimeKind"
]);
var WORKLET_GLOBALS_MANIFEST = Object.freeze({
  version: 2,
  exports: WORKLET_GLOBAL_EXPORTS
});
function isAllowedWorkletGlobal(name) {
  return WORKLET_GLOBAL_EXPORTS.includes(name);
}

// ui/native-animation/worklets.ts
var UnsupportedPlatformError = class extends Error {
  constructor(feature, adapterName) {
    super(
      adapterName ? `${feature} is not supported by the ${adapterName} animation adapter.` : `${feature} is unavailable because no native animation adapter is installed.`
    );
    this.name = "UnsupportedPlatformError";
    this.feature = feature;
    this.adapterName = adapterName;
  }
};
var WorkletValidationError = class extends Error {
  constructor(apiName, detail) {
    super(`${apiName} expected a compiled worklet. ${detail}`);
    this.name = "WorkletValidationError";
    this.apiName = apiName;
  }
};
var RuntimeKind = /* @__PURE__ */ ((RuntimeKind2) => {
  RuntimeKind2["ReactNative"] = "reactNative";
  RuntimeKind2["UI"] = "ui";
  RuntimeKind2["Worker"] = "worker";
  return RuntimeKind2;
})(RuntimeKind || {});
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function hasCanonicalMetadata(value) {
  return isRecord(value) && value.version === 2 && typeof value.hash === "string" && value.hash.length > 0 && typeof value.code === "string" && value.code.length > 0 && isRecord(value.closure);
}
function normalizeCompatibilityMetadata(fn) {
  if (fn.__workletHash === void 0 || !fn.__initData?.code) {
    return null;
  }
  return {
    version: 2,
    hash: String(fn.__workletHash),
    code: fn.__initData.code,
    closure: fn.__closure ?? {},
    ...fn.__initData.globals ? { globals: fn.__initData.globals } : {},
    ...fn.__initData.location ? { location: fn.__initData.location } : {},
    ...fn.__initData.sourceMap ? { sourceMap: fn.__initData.sourceMap } : {}
  };
}
function getWorkletMetadata(value) {
  if (typeof value !== "function") {
    return null;
  }
  const fn = value;
  const canonical = fn[WORKLET_METADATA_KEY];
  if (hasCanonicalMetadata(canonical)) {
    return canonical;
  }
  return normalizeCompatibilityMetadata(fn);
}
function isWorkletFunction(value) {
  return getWorkletMetadata(value) !== null;
}
function validateWorklet(value, apiName) {
  if (typeof value !== "function") {
    throw new WorkletValidationError(apiName, `Received ${typeof value} instead of a function.`);
  }
  const rawMetadata = value[WORKLET_METADATA_KEY];
  if (rawMetadata && rawMetadata.version !== 2) {
    throw new WorkletValidationError(
      apiName,
      `Metadata version ${String(rawMetadata.version)} is incompatible with API 2. Rebuild the script with the current SpotifyPlus compiler.`
    );
  }
  const metadata = getWorkletMetadata(value);
  if (metadata) {
    for (const [identifier, exportName] of Object.entries(metadata.globals ?? {})) {
      if (!identifier || typeof exportName !== "string" || !isAllowedWorkletGlobal(exportName)) {
        throw new WorkletValidationError(
          apiName,
          `The imported worklet global ${identifier || "<empty>"} -> ${String(exportName)} is not in the API-2 allowlist.`
        );
      }
    }
    return;
  }
  const source = Function.prototype.toString.call(value);
  const hasDirective = /(?:^|[{;]\s*)["']worklet["']\s*;/.test(source);
  if (hasDirective) {
    throw new WorkletValidationError(
      apiName,
      "The function contains a worklet directive but has no serialized metadata. Build the script with the SpotifyPlus worklet transform."
    );
  }
  throw new WorkletValidationError(
    apiName,
    "Use a `worklet` directive or pass the function directly to an auto-workletized API, then rebuild with the SpotifyPlus worklet transform."
  );
}
function serializeWorklet(value, apiName) {
  validateWorklet(value, apiName);
  return {
    metadata: getWorkletMetadata(value),
    callable: value
  };
}
function stableHash(source) {
  let hash = 2166136261;
  for (let index = 0; index < source.length; index++) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `internal-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}
function createInternalWorklet(fn, closure = {}, location = "spotifyplus:animated-internal", globals) {
  const worklet = fn;
  const code = Function.prototype.toString.call(fn);
  worklet[WORKLET_METADATA_KEY] = {
    version: 2,
    hash: stableHash(`${location}:${code}`),
    code,
    closure,
    ...globals ? { globals } : {},
    location
  };
  return worklet;
}
function isWorkletRuntime(value) {
  return isRecord(value) && (typeof value.id === "string" || typeof value.id === "number") && typeof value.name === "string";
}
function getRuntimeKind() {
  const globalValue = globalThis;
  if (globalValue.__spotifyPlusRuntimeKind) {
    return globalValue.__spotifyPlusRuntimeKind;
  }
  return globalValue._WORKLET === true ? "ui" /* UI */ : "reactNative" /* ReactNative */;
}

// ui/native-animation/animations.ts
function clampUnit(value) {
  return Math.min(1, Math.max(0, value));
}
function easing(type, evaluator, config = {}) {
  const fn = ((value) => evaluator(clampUnit(value)));
  Object.defineProperty(fn, "__spotifyPlusEasing", {
    value: { type, ...config },
    enumerable: true
  });
  return fn;
}
function normalizeEasing(value) {
  if (!value) {
    return Easing.inOut(Easing.quad).__spotifyPlusEasing;
  }
  if (value.__spotifyPlusEasing) {
    return value.__spotifyPlusEasing;
  }
  return serializeWorklet(value, "withTiming(config.easing)");
}
var Easing = {
  linear: easing("linear", (value) => value),
  ease: easing("bezier", (value) => value * value * (3 - 2 * value), {
    x1: 0.42,
    y1: 0,
    x2: 1,
    y2: 1
  }),
  quad: easing("quad", (value) => value * value),
  cubic: easing("cubic", (value) => value * value * value),
  poly(power) {
    return easing("poly", (value) => value ** power, { power });
  },
  sin: easing("sin", (value) => 1 - Math.cos(value * Math.PI / 2)),
  circle: easing("circle", (value) => 1 - Math.sqrt(1 - value * value)),
  exp: easing("exp", (value) => value === 0 ? 0 : 2 ** (10 * (value - 1))),
  elastic(bounciness = 1) {
    return easing(
      "elastic",
      (value) => 1 - Math.cos(value * Math.PI / 2) ** 3 * Math.cos(value * bounciness * Math.PI),
      { bounciness }
    );
  },
  back(overshoot = 1.70158) {
    return easing("back", (value) => value * value * ((overshoot + 1) * value - overshoot), { overshoot });
  },
  bounce: easing("bounce", (value) => {
    if (value < 1 / 2.75) {
      return 7.5625 * value * value;
    }
    if (value < 2 / 2.75) {
      const shifted2 = value - 1.5 / 2.75;
      return 7.5625 * shifted2 * shifted2 + 0.75;
    }
    if (value < 2.5 / 2.75) {
      const shifted2 = value - 2.25 / 2.75;
      return 7.5625 * shifted2 * shifted2 + 0.9375;
    }
    const shifted = value - 2.625 / 2.75;
    return 7.5625 * shifted * shifted + 0.984375;
  }),
  bezier(x1, y1, x2, y2) {
    return easing("bezier", (value) => cubicBezierAt(value, x1, y1, x2, y2), { x1, y1, x2, y2 });
  },
  bezierFn(x1, y1, x2, y2) {
    return Easing.bezier(x1, y1, x2, y2);
  },
  steps(count, roundToNextStep = false) {
    if (!Number.isFinite(count) || count <= 0) {
      throw new RangeError("Easing.steps count must be a positive finite number.");
    }
    const safeCount = Math.floor(count);
    return easing(
      "steps",
      (value) => (roundToNextStep ? Math.ceil(value * safeCount) : Math.floor(value * safeCount)) / safeCount,
      { count: safeCount, roundToNextStep }
    );
  },
  in(value) {
    return easing("in", (progress) => value(progress), { easing: value.__spotifyPlusEasing ?? value });
  },
  out(value) {
    return easing("out", (progress) => 1 - value(1 - progress), { easing: value.__spotifyPlusEasing ?? value });
  },
  inOut(value) {
    return easing(
      "inOut",
      (progress) => progress < 0.5 ? value(progress * 2) / 2 : 1 - value((1 - progress) * 2) / 2,
      { easing: value.__spotifyPlusEasing ?? value }
    );
  }
};
function cubicBezierAt(value, x1, y1, x2, y2) {
  const coordinate = (time2, first, second) => {
    const inverse = 1 - time2;
    return 3 * inverse * inverse * time2 * first + 3 * inverse * time2 * time2 * second + time2 ** 3;
  };
  let low = 0;
  let high = 1;
  let time = value;
  for (let iteration = 0; iteration < 14; iteration++) {
    time = (low + high) / 2;
    if (coordinate(time, x1, x2) < value) {
      low = time;
    } else {
      high = time;
    }
  }
  return coordinate(time, y1, y2);
}
function animation(type, toValue, config, children, callback) {
  return {
    [ANIMATION_MARKER_KEY]: true,
    type,
    ...toValue !== void 0 ? { toValue } : {},
    ...config ? { config } : {},
    ...children ? { children } : {},
    ...callback ? { callback: serializeWorklet(callback, `${type} callback`) } : {}
  };
}
function isAnimation(value) {
  return value !== null && typeof value === "object" && value[ANIMATION_MARKER_KEY] === true;
}
function withTiming(toValue, config = {}, callback) {
  return animation(
    "timing",
    toValue,
    {
      duration: config.duration ?? 300,
      easing: normalizeEasing(config.easing),
      reduceMotion: config.reduceMotion ?? "system" /* System */
    },
    void 0,
    callback
  );
}
function withSpring(toValue, config = {}, callback) {
  return animation(
    "spring",
    toValue,
    {
      ...config,
      reduceMotion: config.reduceMotion ?? "system" /* System */
    },
    void 0,
    callback
  );
}
function withDecay(config = {}, callback) {
  return animation(
    "decay",
    void 0,
    {
      velocity: config.velocity ?? 0,
      deceleration: config.deceleration ?? 0.998,
      velocityFactor: config.velocityFactor ?? 1,
      rubberBandEffect: config.rubberBandEffect ?? false,
      rubberBandFactor: config.rubberBandFactor ?? 0.6,
      clamp: config.clamp,
      reduceMotion: config.reduceMotion ?? "system" /* System */
    },
    void 0,
    callback
  );
}
function withDelay(delayMs, delayedAnimation, reduceMotion = "system" /* System */) {
  const descriptor = delayedAnimation;
  return animation("delay", descriptor.toValue, { delayMs, reduceMotion }, [descriptor]);
}
function withRepeat(repeatedAnimation, numberOfReps = 2, reverse = false, callback, reduceMotion = "system" /* System */) {
  const descriptor = repeatedAnimation;
  return animation(
    "repeat",
    descriptor.toValue,
    { numberOfReps, reverse, reduceMotion },
    [descriptor],
    callback
  );
}
function withSequence(first, ...rest) {
  if (first === void 0) {
    return animation("sequence", void 0, { reduceMotion: "system" /* System */ }, []);
  }
  const hasReduceMotion = typeof first === "string";
  const values = hasReduceMotion ? rest : [first, ...rest];
  const children = values.map((value) => value);
  const reduceMotion = hasReduceMotion ? first : "system" /* System */;
  return animation(
    "sequence",
    children[children.length - 1]?.toValue,
    { reduceMotion },
    children
  );
}
function withClamp(config, clampedAnimation) {
  const descriptor = clampedAnimation;
  return animation("clamp", descriptor.toValue, { ...config }, [descriptor]);
}
function defineAnimation(startingValue, factory) {
  return animation("custom", startingValue, {
    factory: serializeWorklet(factory, "defineAnimation")
  });
}
function withCustomAnimation(startingValue, factory) {
  return defineAnimation(startingValue, factory);
}

// ui/native-animation/gesture.ts
var gesture_exports = {};
__export(gesture_exports, {
  BaseGesture: () => BaseGesture,
  Directions: () => Directions,
  GESTURE_MARKER_KEY: () => GESTURE_MARKER_KEY,
  Gesture: () => Gesture,
  GestureDetector: () => GestureDetector,
  GestureState: () => GestureState,
  MouseButton: () => MouseButton,
  createGestureDetector: () => createGestureDetector,
  createGestureModule: () => createGestureModule,
  isGesture: () => isGesture,
  serializeGesture: () => serializeGesture
});
var import_react = __toESM(require("react"));
var GESTURE_MARKER_KEY = "__spotifyPlusGesture";
var Directions = /* @__PURE__ */ ((Directions2) => {
  Directions2[Directions2["RIGHT"] = 1] = "RIGHT";
  Directions2[Directions2["LEFT"] = 2] = "LEFT";
  Directions2[Directions2["UP"] = 4] = "UP";
  Directions2[Directions2["DOWN"] = 8] = "DOWN";
  return Directions2;
})(Directions || {});
var MouseButton = /* @__PURE__ */ ((MouseButton2) => {
  MouseButton2[MouseButton2["LEFT"] = 1] = "LEFT";
  MouseButton2[MouseButton2["RIGHT"] = 2] = "RIGHT";
  MouseButton2[MouseButton2["MIDDLE"] = 4] = "MIDDLE";
  MouseButton2[MouseButton2["BUTTON_4"] = 8] = "BUTTON_4";
  MouseButton2[MouseButton2["BUTTON_5"] = 16] = "BUTTON_5";
  MouseButton2[MouseButton2["ALL"] = 31] = "ALL";
  return MouseButton2;
})(MouseButton || {});
var GestureState = /* @__PURE__ */ ((GestureState2) => {
  GestureState2[GestureState2["UNDETERMINED"] = 0] = "UNDETERMINED";
  GestureState2[GestureState2["FAILED"] = 1] = "FAILED";
  GestureState2[GestureState2["BEGAN"] = 2] = "BEGAN";
  GestureState2[GestureState2["CANCELLED"] = 3] = "CANCELLED";
  GestureState2[GestureState2["ACTIVE"] = 4] = "ACTIVE";
  GestureState2[GestureState2["END"] = 5] = "END";
  return GestureState2;
})(GestureState || {});
var _a;
_a = GESTURE_MARKER_KEY;
var BaseGesture = class {
  constructor(type) {
    this.type = type;
    this[_a] = true;
    this.gestureConfig = {};
    this.gestureCallbacks = /* @__PURE__ */ new Map();
  }
  enabled(value) {
    this.gestureConfig.enabled = value;
    return this;
  }
  shouldCancelWhenOutside(value) {
    this.gestureConfig.shouldCancelWhenOutside = value;
    return this;
  }
  hitSlop(value) {
    this.gestureConfig.hitSlop = value;
    return this;
  }
  runOnJS(value) {
    this.gestureConfig.runOnJS = value;
    return this;
  }
  withTestId(testId) {
    this.gestureConfig.testId = testId;
    return this;
  }
  cancelsTouchesInView(value) {
    this.gestureConfig.cancelsTouchesInView = value;
    return this;
  }
  simultaneousWithExternalGesture(...gestures) {
    this.gestureConfig.simultaneousWith = gestures;
    return this;
  }
  requireExternalGestureToFail(...gestures) {
    this.gestureConfig.requireToFail = gestures;
    return this;
  }
  blocksExternalGesture(...gestures) {
    this.gestureConfig.blocks = gestures;
    return this;
  }
  onBegin(callback) {
    return this.callback("onBegin", callback);
  }
  onStart(callback) {
    return this.callback("onStart", callback);
  }
  onUpdate(callback) {
    return this.callback("onUpdate", callback);
  }
  onChange(callback) {
    return this.callback("onChange", callback);
  }
  onEnd(callback) {
    return this.callback("onEnd", callback);
  }
  onFinalize(callback) {
    return this.callback("onFinalize", callback);
  }
  onTouchesDown(callback) {
    return this.callback("onTouchesDown", callback);
  }
  onTouchesMove(callback) {
    return this.callback("onTouchesMove", callback);
  }
  onTouchesUp(callback) {
    return this.callback("onTouchesUp", callback);
  }
  onTouchesCancelled(callback) {
    return this.callback("onTouchesCancelled", callback);
  }
  option(name, value) {
    this.gestureConfig[name] = value;
    return this;
  }
  callback(name, callback) {
    this.gestureCallbacks.set(name, callback);
    return this;
  }
  serialize() {
    const callbacks = {};
    for (const [name, callback] of this.gestureCallbacks) {
      callbacks[name] = serializeWorklet(callback, `Gesture.${this.type}.${name}`);
    }
    return {
      [GESTURE_MARKER_KEY]: true,
      type: this.type,
      config: sanitizeGestureConfig(this.gestureConfig),
      callbacks
    };
  }
};
var TapGesture = class extends BaseGesture {
  constructor() {
    super("tap");
  }
  minPointers(value) {
    return this.option("minPointers", value);
  }
  maxDuration(value) {
    return this.option("maxDuration", value);
  }
  maxDelay(value) {
    return this.option("maxDelay", value);
  }
  numberOfTaps(value) {
    return this.option("numberOfTaps", value);
  }
  maxDistance(value) {
    return this.option("maxDistance", value);
  }
  maxDeltaX(value) {
    return this.option("maxDeltaX", value);
  }
  maxDeltaY(value) {
    return this.option("maxDeltaY", value);
  }
};
var PanGesture = class extends BaseGesture {
  constructor() {
    super("pan");
  }
  minDistance(value) {
    return this.option("minDistance", value);
  }
  minPointers(value) {
    return this.option("minPointers", value);
  }
  maxPointers(value) {
    return this.option("maxPointers", value);
  }
  activeOffsetX(value) {
    return this.option("activeOffsetX", value);
  }
  activeOffsetY(value) {
    return this.option("activeOffsetY", value);
  }
  failOffsetX(value) {
    return this.option("failOffsetX", value);
  }
  failOffsetY(value) {
    return this.option("failOffsetY", value);
  }
  averageTouches(value) {
    return this.option("averageTouches", value);
  }
  enableTrackpadTwoFingerGesture(value) {
    return this.option("enableTrackpadTwoFingerGesture", value);
  }
  activateAfterLongPress(value) {
    return this.option("activateAfterLongPress", value);
  }
  mouseButton(value) {
    return this.option("mouseButton", value);
  }
};
var LongPressGesture = class extends BaseGesture {
  constructor() {
    super("longPress");
  }
  minDuration(value) {
    return this.option("minDuration", value);
  }
  maxDistance(value) {
    return this.option("maxDistance", value);
  }
  numberOfPointers(value) {
    return this.option("numberOfPointers", value);
  }
  mouseButton(value) {
    return this.option("mouseButton", value);
  }
};
var FlingGesture = class extends BaseGesture {
  constructor() {
    super("fling");
  }
  direction(value) {
    return this.option("direction", value);
  }
  numberOfPointers(value) {
    return this.option("numberOfPointers", value);
  }
  mouseButton(value) {
    return this.option("mouseButton", value);
  }
};
var PinchGesture = class extends BaseGesture {
  constructor() {
    super("pinch");
  }
};
var RotationGesture = class extends BaseGesture {
  constructor() {
    super("rotation");
  }
};
var NativeGesture = class extends BaseGesture {
  constructor() {
    super("native");
  }
  shouldActivateOnStart(value) {
    return this.option("shouldActivateOnStart", value);
  }
  disallowInterruption(value) {
    return this.option("disallowInterruption", value);
  }
};
var ManualGesture = class extends BaseGesture {
  constructor() {
    super("manual");
  }
};
var ComposedGesture = class extends BaseGesture {
  constructor(type, gestures) {
    super(type);
    this.gestures = gestures;
  }
  serialize() {
    const serialized = super.serialize();
    return { ...serialized, children: this.gestures.map((gesture) => gesture.serialize()) };
  }
};
function sanitizeGestureConfig(config) {
  const output = {};
  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value) && value.every((item) => item instanceof BaseGesture)) {
      output[key] = value.map((item) => item.serialize());
    } else {
      output[key] = value;
    }
  }
  return output;
}
function isGesture(value) {
  return value !== null && typeof value === "object" && value[GESTURE_MARKER_KEY] === true;
}
function serializeGesture(value) {
  return value instanceof BaseGesture ? value.serialize() : value;
}
var Gesture = {
  Tap: () => new TapGesture(),
  Pan: () => new PanGesture(),
  LongPress: () => new LongPressGesture(),
  Fling: () => new FlingGesture(),
  Pinch: () => new PinchGesture(),
  Rotation: () => new RotationGesture(),
  Native: () => new NativeGesture(),
  Manual: () => new ManualGesture(),
  Race: (...gestures) => new ComposedGesture("race", gestures),
  Simultaneous: (...gestures) => new ComposedGesture("simultaneous", gestures),
  Exclusive: (...gestures) => new ComposedGesture("exclusive", gestures)
};
function createGestureDetector(adapter, scope, allocateId = createStandaloneGestureId) {
  if (adapter.capabilities?.gestures !== true) {
    return function UnsupportedGestureDetector() {
      throw new UnsupportedPlatformError("GestureDetector", adapter.name);
    };
  }
  return function GestureDetector3({ gesture, children }) {
    const serialized = import_react.default.useMemo(() => serializeGesture(gesture), [gesture]);
    const registrationId = import_react.default.useRef(null);
    if (registrationId.current === null) {
      registrationId.current = allocateId();
    }
    const id = registrationId.current;
    const worklets = import_react.default.useMemo(() => collectGestureWorklets(serialized), [serialized]);
    import_react.default.useEffect(() => {
      adapter.registerWorklet(scope, {
        id,
        kind: "gesture",
        worklets,
        options: { gesture: gestureShape(serialized) }
      });
      return () => adapter.unregisterWorklet(scope, id);
    }, [adapter, scope, id, serialized]);
    const registeredGesture = import_react.default.useMemo(() => ({
      ...serialized,
      registration: {
        version: 2,
        scriptId: scope.scriptId,
        generation: scope.generation,
        id
      }
    }), [serialized, scope.scriptId, scope.generation, id]);
    return import_react.default.cloneElement(children, {
      [GESTURE_MARKER_KEY]: registeredGesture
    });
  };
}
var GestureDetector = function HostlessGestureDetector() {
  throw new UnsupportedPlatformError("GestureDetector");
};
function createGestureModule(adapter, scope) {
  return {
    Gesture,
    GestureDetector: createGestureDetector(adapter, scope),
    Directions,
    MouseButton,
    GestureState
  };
}
var nextStandaloneGestureId = -1;
function createStandaloneGestureId() {
  return nextStandaloneGestureId--;
}
function collectGestureWorklets(gesture, prefix = "gesture", output = {}) {
  for (const [name, worklet] of Object.entries(gesture.callbacks)) {
    output[`${prefix}.${name}`] = worklet;
  }
  gesture.children?.forEach((child, index) => {
    collectGestureWorklets(child, `${prefix}.${index}`, output);
  });
  return output;
}
function gestureShape(gesture) {
  return {
    type: gesture.type,
    config: bridgeSafeGestureValue(gesture.config),
    callbackNames: Object.keys(gesture.callbacks),
    children: gesture.children?.map(gestureShape)
  };
}
function bridgeSafeGestureValue(value) {
  if (Array.isArray(value)) {
    return value.map(bridgeSafeGestureValue);
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  if (value[GESTURE_MARKER_KEY] === true) {
    return gestureShape(value);
  }
  const output = {};
  for (const [key, child] of Object.entries(value)) {
    output[key] = bridgeSafeGestureValue(child);
  }
  return output;
}

// ui/native-animation/hooks.ts
var import_react3 = __toESM(require("react"));

// ui/native-animation/layout.ts
var layout_exports = {};
__export(layout_exports, {
  BounceIn: () => BounceIn,
  BounceInDown: () => BounceInDown,
  BounceInLeft: () => BounceInLeft,
  BounceInRight: () => BounceInRight,
  BounceInUp: () => BounceInUp,
  BounceOut: () => BounceOut,
  BounceOutDown: () => BounceOutDown,
  BounceOutLeft: () => BounceOutLeft,
  BounceOutRight: () => BounceOutRight,
  BounceOutUp: () => BounceOutUp,
  CSS: () => CSS,
  CSSAnimationEasing: () => CSSAnimationEasing,
  CurvedTransition: () => CurvedTransition,
  DefaultLayoutEasing: () => DefaultLayoutEasing,
  EntryExitTransition: () => EntryExitTransition,
  FadeIn: () => FadeIn,
  FadeInDown: () => FadeInDown,
  FadeInDownBig: () => FadeInDownBig,
  FadeInLeft: () => FadeInLeft,
  FadeInLeftBig: () => FadeInLeftBig,
  FadeInRight: () => FadeInRight,
  FadeInRightBig: () => FadeInRightBig,
  FadeInUp: () => FadeInUp,
  FadeInUpBig: () => FadeInUpBig,
  FadeOut: () => FadeOut,
  FadeOutDown: () => FadeOutDown,
  FadeOutDownBig: () => FadeOutDownBig,
  FadeOutLeft: () => FadeOutLeft,
  FadeOutLeftBig: () => FadeOutLeftBig,
  FadeOutRight: () => FadeOutRight,
  FadeOutRightBig: () => FadeOutRightBig,
  FadeOutUp: () => FadeOutUp,
  FadeOutUpBig: () => FadeOutUpBig,
  FadingTransition: () => FadingTransition,
  FlipInEasyX: () => FlipInEasyX,
  FlipInEasyY: () => FlipInEasyY,
  FlipInXDown: () => FlipInXDown,
  FlipInXUp: () => FlipInXUp,
  FlipInYLeft: () => FlipInYLeft,
  FlipInYRight: () => FlipInYRight,
  FlipOutEasyX: () => FlipOutEasyX,
  FlipOutEasyY: () => FlipOutEasyY,
  FlipOutXDown: () => FlipOutXDown,
  FlipOutXUp: () => FlipOutXUp,
  FlipOutYLeft: () => FlipOutYLeft,
  FlipOutYRight: () => FlipOutYRight,
  JumpingTransition: () => JumpingTransition,
  Keyframe: () => Keyframe,
  Layout: () => Layout,
  LayoutAnimationBuilder: () => LayoutAnimationBuilder,
  LayoutAnimationConfig: () => LayoutAnimationConfig,
  LightSpeedInLeft: () => LightSpeedInLeft,
  LightSpeedInRight: () => LightSpeedInRight,
  LightSpeedOutLeft: () => LightSpeedOutLeft,
  LightSpeedOutRight: () => LightSpeedOutRight,
  LinearTransition: () => LinearTransition,
  PinwheelIn: () => PinwheelIn,
  PinwheelOut: () => PinwheelOut,
  RollInLeft: () => RollInLeft,
  RollInRight: () => RollInRight,
  RollOutLeft: () => RollOutLeft,
  RollOutRight: () => RollOutRight,
  RotateInDownLeft: () => RotateInDownLeft,
  RotateInDownRight: () => RotateInDownRight,
  RotateInUpLeft: () => RotateInUpLeft,
  RotateInUpRight: () => RotateInUpRight,
  RotateOutDownLeft: () => RotateOutDownLeft,
  RotateOutDownRight: () => RotateOutDownRight,
  RotateOutUpLeft: () => RotateOutUpLeft,
  RotateOutUpRight: () => RotateOutUpRight,
  SequencedTransition: () => SequencedTransition,
  SharedTransition: () => SharedTransition,
  SlideInDown: () => SlideInDown,
  SlideInLeft: () => SlideInLeft,
  SlideInRight: () => SlideInRight,
  SlideInUp: () => SlideInUp,
  SlideOutDown: () => SlideOutDown,
  SlideOutLeft: () => SlideOutLeft,
  SlideOutRight: () => SlideOutRight,
  SlideOutUp: () => SlideOutUp,
  StretchInX: () => StretchInX,
  StretchInY: () => StretchInY,
  StretchOutX: () => StretchOutX,
  StretchOutY: () => StretchOutY,
  ZoomIn: () => ZoomIn,
  ZoomInDown: () => ZoomInDown,
  ZoomInEasyDown: () => ZoomInEasyDown,
  ZoomInEasyUp: () => ZoomInEasyUp,
  ZoomInLeft: () => ZoomInLeft,
  ZoomInRight: () => ZoomInRight,
  ZoomInRotate: () => ZoomInRotate,
  ZoomInUp: () => ZoomInUp,
  ZoomOut: () => ZoomOut,
  ZoomOutDown: () => ZoomOutDown,
  ZoomOutEasyDown: () => ZoomOutEasyDown,
  ZoomOutEasyUp: () => ZoomOutEasyUp,
  ZoomOutLeft: () => ZoomOutLeft,
  ZoomOutRight: () => ZoomOutRight,
  ZoomOutRotate: () => ZoomOutRotate,
  ZoomOutUp: () => ZoomOutUp,
  createKeyframes: () => createKeyframes,
  cubicBezier: () => cubicBezier,
  linear: () => linear,
  steps: () => steps,
  useLayoutAnimationBoundary: () => useLayoutAnimationBoundary
});
var import_react2 = __toESM(require("react"));
var LayoutAnimationBuilder = class _LayoutAnimationBuilder {
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
    this.__spotifyPlusLayoutAnimation = true;
  }
  withConfig(next) {
    return new _LayoutAnimationBuilder(this.name, { ...this.config, ...next });
  }
  duration(durationMs) {
    return this.withConfig({ duration: durationMs });
  }
  delay(delayMs) {
    return this.withConfig({ delay: delayMs });
  }
  randomDelay(maxDelayMs = 1e3) {
    return this.withConfig({ randomDelay: maxDelayMs });
  }
  easing(value) {
    return this.withConfig({ easing: value.__spotifyPlusEasing ?? serializeWorklet(value, `${this.name}.easing`) });
  }
  easingX(value) {
    return this.withConfig({ easingX: value.__spotifyPlusEasing ?? serializeWorklet(value, `${this.name}.easingX`) });
  }
  easingY(value) {
    return this.withConfig({ easingY: value.__spotifyPlusEasing ?? serializeWorklet(value, `${this.name}.easingY`) });
  }
  easingWidth(value) {
    return this.withConfig({ easingWidth: value.__spotifyPlusEasing ?? serializeWorklet(value, `${this.name}.easingWidth`) });
  }
  easingHeight(value) {
    return this.withConfig({ easingHeight: value.__spotifyPlusEasing ?? serializeWorklet(value, `${this.name}.easingHeight`) });
  }
  springify(durationMs) {
    return this.withConfig({ animation: "spring", ...durationMs === void 0 ? {} : { duration: durationMs } });
  }
  damping(value) {
    return this.withConfig({ damping: value });
  }
  dampingRatio(value) {
    return this.withConfig({ dampingRatio: value });
  }
  mass(value) {
    return this.withConfig({ mass: value });
  }
  stiffness(value) {
    return this.withConfig({ stiffness: value });
  }
  overshootClamping(value = true) {
    return this.withConfig({ overshootClamping: value });
  }
  energyThreshold(value) {
    return this.withConfig({ energyThreshold: value });
  }
  rotate(degrees) {
    return this.withConfig({ rotate: degrees });
  }
  perspective(value) {
    return this.withConfig({ perspective: value });
  }
  reverse(value = true) {
    return this.withConfig({ reverse: value });
  }
  entering(value) {
    return this.withConfig({ entering: value });
  }
  exiting(value) {
    return this.withConfig({ exiting: value });
  }
  reduceMotion(value) {
    return this.withConfig({ reduceMotion: value });
  }
  withInitialValues(values) {
    return this.withConfig({ initialValues: values });
  }
  withCallback(callback) {
    return this.withConfig({ callback: serializeWorklet(callback, `${this.name}.withCallback`) });
  }
  build() {
    return this;
  }
};
function preset(name) {
  return new LayoutAnimationBuilder(name, { reduceMotion: "system" /* System */ });
}
var Keyframe = class extends LayoutAnimationBuilder {
  constructor(definitions) {
    super("Keyframe", { definitions });
  }
};
var BounceIn = preset("BounceIn");
var BounceInDown = preset("BounceInDown");
var BounceInLeft = preset("BounceInLeft");
var BounceInRight = preset("BounceInRight");
var BounceInUp = preset("BounceInUp");
var BounceOut = preset("BounceOut");
var BounceOutDown = preset("BounceOutDown");
var BounceOutLeft = preset("BounceOutLeft");
var BounceOutRight = preset("BounceOutRight");
var BounceOutUp = preset("BounceOutUp");
var FadeIn = preset("FadeIn");
var FadeInDown = preset("FadeInDown");
var FadeInDownBig = preset("FadeInDownBig");
var FadeInLeft = preset("FadeInLeft");
var FadeInLeftBig = preset("FadeInLeftBig");
var FadeInRight = preset("FadeInRight");
var FadeInRightBig = preset("FadeInRightBig");
var FadeInUp = preset("FadeInUp");
var FadeInUpBig = preset("FadeInUpBig");
var FadeOut = preset("FadeOut");
var FadeOutDown = preset("FadeOutDown");
var FadeOutDownBig = preset("FadeOutDownBig");
var FadeOutLeft = preset("FadeOutLeft");
var FadeOutLeftBig = preset("FadeOutLeftBig");
var FadeOutRight = preset("FadeOutRight");
var FadeOutRightBig = preset("FadeOutRightBig");
var FadeOutUp = preset("FadeOutUp");
var FadeOutUpBig = preset("FadeOutUpBig");
var FlipInEasyX = preset("FlipInEasyX");
var FlipInEasyY = preset("FlipInEasyY");
var FlipInXDown = preset("FlipInXDown");
var FlipInXUp = preset("FlipInXUp");
var FlipInYLeft = preset("FlipInYLeft");
var FlipInYRight = preset("FlipInYRight");
var FlipOutEasyX = preset("FlipOutEasyX");
var FlipOutEasyY = preset("FlipOutEasyY");
var FlipOutXDown = preset("FlipOutXDown");
var FlipOutXUp = preset("FlipOutXUp");
var FlipOutYLeft = preset("FlipOutYLeft");
var FlipOutYRight = preset("FlipOutYRight");
var LightSpeedInLeft = preset("LightSpeedInLeft");
var LightSpeedInRight = preset("LightSpeedInRight");
var LightSpeedOutLeft = preset("LightSpeedOutLeft");
var LightSpeedOutRight = preset("LightSpeedOutRight");
var PinwheelIn = preset("PinwheelIn");
var PinwheelOut = preset("PinwheelOut");
var RollInLeft = preset("RollInLeft");
var RollInRight = preset("RollInRight");
var RollOutLeft = preset("RollOutLeft");
var RollOutRight = preset("RollOutRight");
var RotateInDownLeft = preset("RotateInDownLeft");
var RotateInDownRight = preset("RotateInDownRight");
var RotateInUpLeft = preset("RotateInUpLeft");
var RotateInUpRight = preset("RotateInUpRight");
var RotateOutDownLeft = preset("RotateOutDownLeft");
var RotateOutDownRight = preset("RotateOutDownRight");
var RotateOutUpLeft = preset("RotateOutUpLeft");
var RotateOutUpRight = preset("RotateOutUpRight");
var SlideInDown = preset("SlideInDown");
var SlideInLeft = preset("SlideInLeft");
var SlideInRight = preset("SlideInRight");
var SlideInUp = preset("SlideInUp");
var SlideOutDown = preset("SlideOutDown");
var SlideOutLeft = preset("SlideOutLeft");
var SlideOutRight = preset("SlideOutRight");
var SlideOutUp = preset("SlideOutUp");
var StretchInX = preset("StretchInX");
var StretchInY = preset("StretchInY");
var StretchOutX = preset("StretchOutX");
var StretchOutY = preset("StretchOutY");
var ZoomIn = preset("ZoomIn");
var ZoomInDown = preset("ZoomInDown");
var ZoomInEasyDown = preset("ZoomInEasyDown");
var ZoomInEasyUp = preset("ZoomInEasyUp");
var ZoomInLeft = preset("ZoomInLeft");
var ZoomInRight = preset("ZoomInRight");
var ZoomInRotate = preset("ZoomInRotate");
var ZoomInUp = preset("ZoomInUp");
var ZoomOut = preset("ZoomOut");
var ZoomOutDown = preset("ZoomOutDown");
var ZoomOutEasyDown = preset("ZoomOutEasyDown");
var ZoomOutEasyUp = preset("ZoomOutEasyUp");
var ZoomOutLeft = preset("ZoomOutLeft");
var ZoomOutRight = preset("ZoomOutRight");
var ZoomOutRotate = preset("ZoomOutRotate");
var ZoomOutUp = preset("ZoomOutUp");
var Layout = preset("Layout");
var LinearTransition = preset("LinearTransition");
var SequencedTransition = preset("SequencedTransition");
var FadingTransition = preset("FadingTransition");
var JumpingTransition = preset("JumpingTransition");
var CurvedTransition = preset("CurvedTransition");
var EntryExitTransition = preset("EntryExitTransition");
var SharedTransition = preset("SharedTransition");
var LayoutAnimationBoundaryContext = import_react2.default.createContext({
  skipEntering: false,
  skipExiting: false
});
function LayoutAnimationConfig({
  children,
  skipEntering = false,
  skipExiting = false
}) {
  return import_react2.default.createElement(
    LayoutAnimationBoundaryContext.Provider,
    { value: { skipEntering, skipExiting } },
    children
  );
}
function useLayoutAnimationBoundary() {
  return import_react2.default.useContext(LayoutAnimationBoundaryContext);
}
function createKeyframes(frames) {
  return { __spotifyPlusCSSKeyframes: true, frames };
}
function cubicBezier(x1, y1, x2, y2) {
  return { type: "cubicBezier", values: [x1, y1, x2, y2] };
}
function linear(...points) {
  return { type: "linear", values: points.length === 0 ? [0, 1] : points };
}
function steps(count, position = "end") {
  return { type: "steps", values: [count], stepPosition: position };
}
var CSS = {
  keyframes: createKeyframes,
  cubicBezier,
  linear,
  steps
};
var CSSAnimationEasing = {
  linear: linear(0, 1),
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  easeIn: cubicBezier(0.42, 0, 1, 1),
  easeOut: cubicBezier(0, 0, 0.58, 1),
  easeInOut: cubicBezier(0.42, 0, 0.58, 1)
};
var DefaultLayoutEasing = Easing.inOut(Easing.quad);

// ui/native-animation/runtime.ts
var nextRuntimeId = 1;
var nextObjectId = 1;
function createRuntimeId(scope) {
  const suffix = nextRuntimeId++;
  return `${scope.scriptId}:${scope.generation}:${suffix}`;
}
function getFallbackViewTag(ref) {
  if (typeof ref === "number" && Number.isFinite(ref)) {
    return ref;
  }
  if (!ref || typeof ref !== "object") {
    return null;
  }
  const candidate = ref;
  if (candidate.current && candidate.current !== candidate) {
    return getFallbackViewTag(candidate.current);
  }
  const raw = typeof candidate.getTag === "function" ? candidate.getTag() : typeof candidate.getNativeNodeId === "function" ? candidate.getNativeNodeId() : candidate.nodeId ?? candidate.id;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : null;
}
SHARED_VALUE_KEY;
var MutableValue = class {
  constructor(id, runtime, initial) {
    this.id = id;
    this.runtime = runtime;
    this.listeners = /* @__PURE__ */ new Map();
    this.disposed = false;
    this.current = initial;
    this[SHARED_VALUE_KEY] = Object.freeze({
      version: 2,
      scriptId: runtime.scope.scriptId,
      generation: runtime.scope.generation,
      runtimeId: runtime.runtimeId,
      id
    });
    runtime.adapter.createMutable(runtime.scope, { id, initial });
  }
  get value() {
    return this.get();
  }
  set value(next) {
    this.set(next);
  }
  get() {
    this.assertActive();
    if (this.runtime.adapter.readMutable) {
      this.current = this.runtime.adapter.readMutable(this.runtime.scope, this.id);
    }
    return this.current;
  }
  set(next) {
    this.assertActive();
    const resolved = typeof next === "function" ? next(this.get()) : next;
    if (!isAnimation(resolved)) {
      this.current = resolved;
    }
    this.runtime.adapter.writeMutable(this.runtime.scope, {
      id: this.id,
      value: resolved
    });
    if (!this.nativeSubscription && !isAnimation(resolved)) {
      this.notify(this.current);
    }
  }
  modify(modifier, forceUpdate = true) {
    const current = this.get();
    const next = modifier ? modifier(current) : current;
    if (forceUpdate || !Object.is(current, next)) {
      this.set(next);
    }
  }
  addListener(listenerId, listener) {
    this.assertActive();
    this.listeners.set(listenerId, listener);
    this.ensureNativeSubscription();
  }
  removeListener(listenerId) {
    this.listeners.delete(listenerId);
    if (this.listeners.size === 0) {
      this.nativeSubscription?.();
      this.nativeSubscription = void 0;
    }
  }
  dispose() {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    this.nativeSubscription?.();
    this.nativeSubscription = void 0;
    this.listeners.clear();
    this.runtime.releaseMutable(this.id);
  }
  ensureNativeSubscription() {
    if (this.nativeSubscription || !this.runtime.adapter.subscribeMutable) {
      return;
    }
    this.nativeSubscription = this.runtime.adapter.subscribeMutable(
      this.runtime.scope,
      this.id,
      (value) => {
        this.current = value;
        this.notify(value);
      }
    );
  }
  notify(value) {
    for (const listener of this.listeners.values()) {
      listener(value);
    }
  }
  assertActive() {
    this.runtime.assertActive();
    if (this.disposed) {
      throw new Error("This SharedValue has been released with its animated runtime.");
    }
  }
};
SHARED_VALUE_KEY;
var DerivedValueView = class {
  constructor(mutable) {
    this.mutable = mutable;
    this[SHARED_VALUE_KEY] = Object.freeze({
      ...mutable[SHARED_VALUE_KEY],
      derived: true
    });
  }
  get value() {
    return this.mutable.value;
  }
  get() {
    return this.mutable.get();
  }
  addListener(listenerId, listener) {
    this.mutable.addListener(listenerId, listener);
  }
  removeListener(listenerId) {
    this.mutable.removeListener(listenerId);
  }
};
var AnimatedRuntime = class {
  constructor(adapter, scope) {
    this.adapter = adapter;
    this.scope = scope;
    this.mutableIds = /* @__PURE__ */ new Set();
    this.workletIds = /* @__PURE__ */ new Set();
    this.sourceIds = /* @__PURE__ */ new Set();
    this.customRuntimes = /* @__PURE__ */ new Set();
    this.disposed = false;
    this.runtimeId = createRuntimeId(scope);
    this.scope = Object.freeze({ ...scope });
    this.adapter.installWorkletGlobals?.(this.scope, WORKLET_GLOBALS_MANIFEST);
  }
  allocateId() {
    this.assertActive();
    return nextObjectId++;
  }
  makeMutable(initial) {
    const mutable = new MutableValue(this.allocateId(), this, initial);
    this.mutableIds.add(mutable.id);
    return mutable;
  }
  releaseMutable(id) {
    if (!this.mutableIds.delete(id)) {
      return;
    }
    this.adapter.releaseMutable?.(this.scope, id);
  }
  registerWorklet(registration) {
    this.assertActive();
    this.assertWorkletGlobals(Object.values(registration.worklets));
    this.adapter.registerWorklet(this.scope, registration);
    this.workletIds.add(registration.id);
  }
  updateWorklet(registration) {
    this.assertActive();
    this.assertWorkletGlobals(Object.values(registration.worklets));
    if (this.adapter.updateWorklet) {
      this.adapter.updateWorklet(this.scope, registration);
    } else {
      this.adapter.unregisterWorklet(this.scope, registration.id);
      this.adapter.registerWorklet(this.scope, registration);
    }
    this.workletIds.add(registration.id);
  }
  unregisterWorklet(id) {
    if (!this.workletIds.delete(id)) {
      return;
    }
    this.adapter.unregisterWorklet(this.scope, id);
  }
  setWorkletActive(id, active) {
    if (!this.adapter.setWorkletActive) {
      throw new UnsupportedPlatformError("Frame callback activation", this.adapter.name);
    }
    this.adapter.setWorkletActive(this.scope, id, active);
  }
  registerSource(registration) {
    if (!this.adapter.registerSource) {
      throw new UnsupportedPlatformError(`${registration.kind} source`, this.adapter.name);
    }
    this.adapter.registerSource(this.scope, registration);
    this.sourceIds.add(registration.id);
  }
  unregisterSource(id) {
    if (!this.sourceIds.delete(id)) {
      return;
    }
    this.adapter.unregisterSource?.(this.scope, id);
  }
  bindView(binding) {
    if (!this.adapter.bindView) {
      throw new UnsupportedPlatformError("Animated view bindings", this.adapter.name);
    }
    this.adapter.bindView(this.scope, binding);
  }
  unbindView(viewTag) {
    this.adapter.unbindView?.(this.scope, viewTag);
  }
  resolveViewTag(ref) {
    return this.adapter.resolveViewTag?.(this.scope, ref) ?? getFallbackViewTag(ref);
  }
  scheduleOnUI(worklet, args) {
    const serialized = serializeWorklet(worklet, "scheduleOnUI");
    this.assertWorkletGlobals([serialized]);
    this.adapter.scheduleOnUI(this.scope, serialized, args);
  }
  executeOnUISync(worklet, args) {
    if (!this.adapter.executeOnUISync) {
      throw new UnsupportedPlatformError("executeOnUIRuntimeSync", this.adapter.name);
    }
    const serialized = serializeWorklet(worklet, "executeOnUIRuntimeSync");
    this.assertWorkletGlobals([serialized]);
    return this.adapter.executeOnUISync(this.scope, serialized, args);
  }
  scheduleOnRN(fn, args) {
    this.adapter.scheduleOnRN(this.scope, fn, args);
  }
  cancelAnimation(sharedValue) {
    const id = this.getMutableId(sharedValue);
    this.adapter.cancelAnimation(this.scope, id);
  }
  getTimestamp() {
    return this.adapter.getTimestamp?.(this.scope) ?? (typeof performance === "undefined" ? Date.now() : performance.now());
  }
  measure(ref) {
    const viewTag = this.requireViewTag(ref, "measure");
    if (!this.adapter.measure) {
      throw new UnsupportedPlatformError("measure", this.adapter.name);
    }
    return this.adapter.measure(this.scope, viewTag);
  }
  scrollTo(ref, x, y, animated) {
    const viewTag = this.requireViewTag(ref, "scrollTo");
    if (!this.adapter.scrollTo) {
      throw new UnsupportedPlatformError("scrollTo", this.adapter.name);
    }
    this.adapter.scrollTo(this.scope, { viewTag, x, y, animated });
  }
  dispatchCommand(ref, command, args = []) {
    const viewTag = this.requireViewTag(ref, "dispatchCommand");
    if (!this.adapter.dispatchCommand) {
      throw new UnsupportedPlatformError("dispatchCommand", this.adapter.name);
    }
    this.adapter.dispatchCommand(this.scope, viewTag, command, args);
  }
  setNativeProps(ref, props) {
    const viewTag = this.requireViewTag(ref, "setNativeProps");
    if (!this.adapter.setNativeProps) {
      throw new UnsupportedPlatformError("setNativeProps", this.adapter.name);
    }
    this.adapter.setNativeProps(this.scope, viewTag, props);
  }
  getViewProp(ref, propName) {
    const viewTag = this.requireViewTag(ref, "getViewProp");
    if (!this.adapter.getViewProp) {
      throw new UnsupportedPlatformError("getViewProp", this.adapter.name);
    }
    return this.adapter.getViewProp(this.scope, viewTag, propName);
  }
  createWorkletRuntime(name, initializer) {
    if (!this.adapter.createWorkletRuntime) {
      throw new UnsupportedPlatformError("createWorkletRuntime", this.adapter.name);
    }
    const serializedInitializer = initializer ? serializeWorklet(initializer, "createWorkletRuntime") : void 0;
    if (serializedInitializer) {
      this.assertWorkletGlobals([serializedInitializer]);
    }
    const handle = this.adapter.createWorkletRuntime(
      this.scope,
      name,
      serializedInitializer
    );
    this.customRuntimes.add(handle);
    return handle;
  }
  scheduleOnRuntime(runtime, worklet, args) {
    if (!this.adapter.scheduleOnRuntime) {
      throw new UnsupportedPlatformError("runOnRuntime", this.adapter.name);
    }
    const serialized = serializeWorklet(worklet, "runOnRuntime");
    this.assertWorkletGlobals([serialized]);
    this.adapter.scheduleOnRuntime(
      this.scope,
      runtime,
      serialized,
      args
    );
  }
  enableLayoutAnimations(enabled = true) {
    if (!this.adapter.configureLayoutAnimations) {
      throw new UnsupportedPlatformError("Layout animations", this.adapter.name);
    }
    this.adapter.configureLayoutAnimations(this.scope, enabled);
  }
  dispose() {
    if (this.disposed) {
      return;
    }
    for (const id of this.workletIds) {
      this.adapter.unregisterWorklet(this.scope, id);
    }
    for (const id of this.sourceIds) {
      this.adapter.unregisterSource?.(this.scope, id);
    }
    for (const id of this.mutableIds) {
      this.adapter.releaseMutable?.(this.scope, id);
    }
    for (const runtime of this.customRuntimes) {
      this.adapter.releaseWorkletRuntime?.(this.scope, runtime);
    }
    this.workletIds.clear();
    this.sourceIds.clear();
    this.mutableIds.clear();
    this.customRuntimes.clear();
    this.adapter.disposeRuntimeScope?.(this.scope);
    this.disposed = true;
  }
  requireViewTag(ref, operation) {
    const tag = this.resolveViewTag(ref);
    if (tag === null) {
      throw new Error(`${operation} received an animated ref that is not attached to a native view.`);
    }
    return tag;
  }
  assertWorkletGlobals(worklets) {
    const requiresGlobals = worklets.some((worklet) => Object.keys(worklet.metadata.globals ?? {}).length > 0);
    if (requiresGlobals && this.adapter.capabilities?.workletGlobals !== true) {
      throw new UnsupportedPlatformError("Imported Animated worklet globals", this.adapter.name);
    }
  }
  getMutableId(value) {
    const marker2 = value?.[SHARED_VALUE_KEY];
    if (!marker2 || marker2.runtimeId !== this.runtimeId) {
      throw new TypeError("The SharedValue belongs to another animation runtime.");
    }
    return marker2.id;
  }
  assertActive() {
    if (this.disposed) {
      throw new Error(`Animated runtime ${this.runtimeId} has already been disposed.`);
    }
  }
};
function createAnimatedRuntime(adapter, scope) {
  if (!adapter || typeof adapter !== "object") {
    throw new TypeError("createAnimatedRuntime requires a NativeAnimationAdapter.");
  }
  if (!scope?.scriptId || scope.generation === void 0 || scope.generation === null) {
    throw new TypeError("createAnimatedRuntime requires an immutable scriptId and generation scope.");
  }
  return new AnimatedRuntime(adapter, scope);
}

// ui/native-animation/hooks.ts
var useAnimatedBindingEffect = import_react3.default.useLayoutEffect ?? import_react3.default.useEffect;
function marker(runtime, kind, id) {
  return {
    version: 2,
    kind,
    scriptId: runtime.scope.scriptId,
    generation: runtime.scope.generation,
    runtimeId: runtime.runtimeId,
    id
  };
}
function getPayloadMarker(value) {
  if (typeof value !== "object" && typeof value !== "function" || value === null) {
    return null;
  }
  const candidate = value[ANIMATED_PAYLOAD_KEY];
  if (!candidate || typeof candidate !== "object") {
    return null;
  }
  const payload = candidate;
  return payload.version === 2 && (payload.kind === "style" || payload.kind === "props" || payload.kind === "event") && typeof payload.scriptId === "string" && (typeof payload.generation === "string" || typeof payload.generation === "number") && typeof payload.runtimeId === "string" && typeof payload.id === "number" ? payload : null;
}
function isAnimatedStylePayload(value) {
  return getPayloadMarker(value)?.kind === "style";
}
function isAnimatedPropsPayload(value) {
  return getPayloadMarker(value)?.kind === "props";
}
function isAnimatedEventHandler(value) {
  return getPayloadMarker(value)?.kind === "event";
}
function isAnimatedNodeLike(value) {
  if (typeof value !== "object" && typeof value !== "function" || value === null) {
    return false;
  }
  const marker2 = value[SHARED_VALUE_KEY];
  if (!marker2 || typeof marker2 !== "object") {
    return false;
  }
  const candidate = marker2;
  return candidate.version === 2 && typeof candidate.scriptId === "string" && (typeof candidate.generation === "string" || typeof candidate.generation === "number") && typeof candidate.runtimeId === "string" && typeof candidate.id === "number";
}
function useStableId(runtime) {
  const id = import_react3.default.useRef(null);
  if (id.current === null) {
    id.current = runtime.allocateId();
  }
  return id.current;
}
function useMutableLifecycle(mutable) {
  const mounted = import_react3.default.useRef(false);
  import_react3.default.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      const release = () => {
        if (!mounted.current) {
          mutable.dispose();
        }
      };
      if (typeof queueMicrotask === "function") {
        queueMicrotask(release);
      } else {
        Promise.resolve().then(release);
      }
    };
  }, [mutable]);
}
function useRuntimeMutable(runtime, initial) {
  const ref = import_react3.default.useRef(null);
  if (ref.current === null) {
    ref.current = runtime.makeMutable(initial);
  }
  useMutableLifecycle(ref.current);
  return ref.current;
}
function initialWorkletValue(worklet, apiName) {
  try {
    return worklet();
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`${apiName} could not evaluate its initial value on the script thread: ${reason}`);
  }
}
function initialDerivedValue(worklet, apiName) {
  const initialValue = initialWorkletValue(worklet, apiName);
  if (isAnimation(initialValue)) {
    return initialValue.toValue;
  }
  return initialValue;
}
function useWorkletRegistration(runtime, registration, dependencies) {
  import_react3.default.useEffect(() => {
    runtime.registerWorklet(registration);
    return () => runtime.unregisterWorklet(registration.id);
  }, [runtime, registration.id, ...dependencies]);
}
function makeMutableForRuntime(runtime, initial) {
  return runtime.makeMutable(initial);
}
function useSharedValueForRuntime(runtime, initial) {
  return useRuntimeMutable(runtime, initial);
}
function useDerivedValueForRuntime(runtime, updater, dependencies = []) {
  const worklet = serializeWorklet(updater, "useDerivedValue");
  const mutable = useRuntimeMutable(runtime, initialDerivedValue(updater, "useDerivedValue"));
  const registrationId = useStableId(runtime);
  useWorkletRegistration(runtime, {
    id: registrationId,
    kind: "derived",
    worklets: { updater: worklet },
    targetMutableIds: [mutable.id],
    dependencies
  }, [updater, ...dependencies]);
  return import_react3.default.useMemo(() => new DerivedValueView(mutable), [mutable]);
}
function useAnimatedStyleForRuntime(runtime, updater, dependencies = []) {
  const worklet = serializeWorklet(updater, "useAnimatedStyle");
  const id = useStableId(runtime);
  const initialValue = initialWorkletValue(updater, "useAnimatedStyle");
  useWorkletRegistration(runtime, {
    id,
    kind: "style",
    worklets: { updater: worklet },
    dependencies
  }, [updater, ...dependencies]);
  return import_react3.default.useMemo(() => ({
    [ANIMATED_PAYLOAD_KEY]: marker(runtime, "style", id),
    initialValue
  }), [runtime, id, initialValue]);
}
function useAnimatedPropsForRuntime(runtime, updater, dependencies = [], adapters = []) {
  const effectiveUpdater = adapters.length === 0 ? updater : createInternalWorklet(
    () => {
      const props = updater();
      for (const adapter of adapters) {
        adapter(props);
      }
      return props;
    },
    { adapters, updater },
    "spotifyplus:useAnimatedProps:adapters"
  );
  const worklet = serializeWorklet(effectiveUpdater, "useAnimatedProps");
  const id = useStableId(runtime);
  const initialValue = initialWorkletValue(effectiveUpdater, "useAnimatedProps");
  useWorkletRegistration(runtime, {
    id,
    kind: "props",
    worklets: { updater: worklet },
    dependencies
  }, [updater, ...adapters, ...dependencies]);
  return import_react3.default.useMemo(() => ({
    [ANIMATED_PAYLOAD_KEY]: marker(runtime, "props", id),
    initialValue
  }), [runtime, id, initialValue]);
}
function createAnimatedPropAdapter(adapter, nativeProps = []) {
  validateWorklet(adapter, "createAnimatedPropAdapter");
  Object.defineProperty(adapter, "nativeProps", {
    value: Object.freeze([...nativeProps]),
    enumerable: true
  });
  return adapter;
}
function useAnimatedReactionForRuntime(runtime, prepare, react, dependencies = []) {
  const id = useStableId(runtime);
  const registration = {
    id,
    kind: "reaction",
    worklets: {
      prepare: serializeWorklet(prepare, "useAnimatedReaction prepare"),
      react: serializeWorklet(react, "useAnimatedReaction react")
    },
    dependencies
  };
  useWorkletRegistration(runtime, registration, [prepare, react, ...dependencies]);
}
function useFrameCallbackForRuntime(runtime, callback, autostart = true) {
  if (runtime.adapter.capabilities?.frameCallbacks !== true) {
    throw new UnsupportedPlatformError("useFrameCallback", runtime.adapter.name);
  }
  const id = useStableId(runtime);
  const active = import_react3.default.useRef(autostart);
  useWorkletRegistration(runtime, {
    id,
    kind: "frame",
    worklets: { callback: serializeWorklet(callback, "useFrameCallback") },
    options: { active: autostart }
  }, [callback, autostart]);
  return import_react3.default.useMemo(() => ({
    setActive(next) {
      active.current = next;
      runtime.setWorkletActive(id, next);
    },
    get isActive() {
      return active.current;
    }
  }), [runtime, id]);
}
function useFrameTimestampForRuntime(runtime) {
  const timestamp = useRuntimeMutable(runtime, runtime.getTimestamp());
  const callback = import_react3.default.useMemo(() => createInternalWorklet(
    (frame) => {
      timestamp.value = frame.timestamp;
    },
    { timestamp },
    "spotifyplus:useFrameTimestamp"
  ), [timestamp]);
  useFrameCallbackForRuntime(runtime, callback);
  return timestamp;
}
function useTimestampForRuntime(runtime, isActive = true) {
  const timestamp = useRuntimeMutable(runtime, 0);
  const state = import_react3.default.useMemo(() => ({ start: null }), []);
  if (!isActive) {
    state.start = null;
  }
  const callback = import_react3.default.useMemo(() => createInternalWorklet(
    (frame) => {
      if (state.start === null) {
        state.start = frame.timestamp;
      }
      timestamp.value = frame.timestamp - state.start;
    },
    { state, timestamp },
    "spotifyplus:useTimestamp"
  ), [state, timestamp]);
  useFrameCallbackForRuntime(runtime, callback, isActive);
  return timestamp;
}
function useAnimatedRefForRuntime(runtime) {
  const id = useStableId(runtime);
  const ref = import_react3.default.useRef(null);
  if (ref.current === null) {
    const animatedRef = function(component) {
      if (arguments.length > 0) {
        animatedRef.current = component ?? null;
      }
      return runtime.resolveViewTag(animatedRef.current);
    };
    animatedRef.current = null;
    Object.defineProperty(animatedRef, "__animatedRefId", { value: id, enumerable: true });
    animatedRef.getTag = () => runtime.resolveViewTag(animatedRef.current);
    ref.current = animatedRef;
  }
  return ref.current;
}
function useEventForRuntime(runtime, handler, eventNames = [], rebuild = false) {
  const id = useStableId(runtime);
  const worklet = serializeWorklet(handler, "useEvent");
  useWorkletRegistration(runtime, {
    id,
    kind: "event",
    worklets: { handler: worklet },
    eventNames,
    options: { rebuild }
  }, [handler, rebuild, ...eventNames]);
  return import_react3.default.useMemo(() => {
    const eventHandler = ((event) => handler(event));
    Object.defineProperty(eventHandler, ANIMATED_PAYLOAD_KEY, {
      value: marker(runtime, "event", id),
      enumerable: true
    });
    Object.defineProperty(eventHandler, "eventNames", {
      value: Object.freeze([...eventNames]),
      enumerable: true
    });
    return eventHandler;
  }, [runtime, id, handler, ...eventNames]);
}
function useAnimatedScrollHandlerForRuntime(runtime, handlers, dependencies = []) {
  const id = useStableId(runtime);
  const context = import_react3.default.useRef({});
  const normalized = typeof handlers === "function" ? { onScroll: handlers } : handlers;
  const worklets = {};
  for (const [name, handler] of Object.entries(normalized)) {
    if (handler) {
      worklets[name] = serializeWorklet(handler, `useAnimatedScrollHandler.${name}`);
    }
  }
  const eventNames = Object.keys(worklets);
  useWorkletRegistration(runtime, {
    id,
    kind: "event",
    worklets,
    eventNames,
    dependencies,
    options: { eventType: "scroll" }
  }, [handlers, ...dependencies]);
  return import_react3.default.useMemo(() => {
    const eventHandler = ((event) => {
      const eventName = event.eventName ?? "onScroll";
      const handler = normalized[eventName] ?? normalized.onScroll;
      handler?.(event, context.current);
    });
    Object.defineProperty(eventHandler, ANIMATED_PAYLOAD_KEY, {
      value: marker(runtime, "event", id),
      enumerable: true
    });
    Object.defineProperty(eventHandler, "eventNames", {
      value: Object.freeze(eventNames),
      enumerable: true
    });
    return eventHandler;
  }, [runtime, id, handlers]);
}
function useComposedEventHandlerForRuntime(runtime, handlers) {
  const id = useStableId(runtime);
  const activeHandlers = handlers.filter((handler) => !!handler);
  const eventNames = Array.from(new Set(activeHandlers.flatMap((handler) => [...handler.eventNames])));
  const composedIds = activeHandlers.map((handler) => handler[ANIMATED_PAYLOAD_KEY].id);
  useWorkletRegistration(runtime, {
    id,
    kind: "event",
    worklets: {},
    eventNames,
    options: { composedEventIds: composedIds }
  }, [...composedIds, ...eventNames]);
  return import_react3.default.useMemo(() => {
    const eventHandler = ((event) => {
      for (const handler of activeHandlers) {
        handler(event);
      }
    });
    Object.defineProperty(eventHandler, ANIMATED_PAYLOAD_KEY, {
      value: marker(runtime, "event", id),
      enumerable: true
    });
    Object.defineProperty(eventHandler, "eventNames", {
      value: Object.freeze(eventNames),
      enumerable: true
    });
    return eventHandler;
  }, [runtime, id, ...activeHandlers]);
}
function useHandler(_handlers, dependencies = []) {
  const context = import_react3.default.useRef({});
  const previousDependencies = import_react3.default.useRef(null);
  const doDependenciesDiffer = previousDependencies.current === null || dependencies.length !== previousDependencies.current.length || dependencies.some((dependency, index) => !Object.is(dependency, previousDependencies.current?.[index]));
  previousDependencies.current = dependencies;
  return { context: context.current, doDependenciesDiffer, useWeb: false };
}
function useScrollOffsetForRuntime(runtime, animatedRef, providedOffset) {
  if (runtime.adapter.capabilities?.scroll !== true || !runtime.adapter.registerSource) {
    throw new UnsupportedPlatformError("useScrollOffset", runtime.adapter.name);
  }
  const fallbackOffset = useRuntimeMutable(runtime, 0);
  const offset = providedOffset ?? fallbackOffset;
  const sourceId = useStableId(runtime);
  import_react3.default.useLayoutEffect(() => {
    const viewTag = runtime.resolveViewTag(animatedRef);
    if (viewTag === null) {
      throw new Error("useScrollOffset received an animated ref that is not attached to a scroll view.");
    }
    const marker2 = offset[SHARED_VALUE_KEY];
    if (marker2.runtimeId !== runtime.runtimeId) {
      throw new Error("useScrollOffset cannot update a SharedValue from another animated runtime.");
    }
    runtime.registerSource({
      id: sourceId,
      kind: "scrollOffset",
      targetMutableIds: { offset: marker2.id },
      config: { viewTag }
    });
    return () => runtime.unregisterSource(sourceId);
  }, [runtime, animatedRef, offset, sourceId]);
  return offset;
}
function sensorInitialValue(sensorType) {
  const common = { x: 0, y: 0, z: 0, interfaceOrientation: 0 };
  if (sensorType !== 5 /* ROTATION */) {
    return common;
  }
  const rotation = {
    ...common,
    qw: 1,
    qx: 0,
    qy: 0,
    qz: 0,
    yaw: 0,
    pitch: 0,
    roll: 0
  };
  return rotation;
}
function useAnimatedSensorForRuntime(runtime, sensorType, config = {}) {
  if (runtime.adapter.capabilities?.sensors !== true || !runtime.adapter.registerSource) {
    throw new UnsupportedPlatformError("useAnimatedSensor", runtime.adapter.name);
  }
  const sensor = useRuntimeMutable(runtime, sensorInitialValue(sensorType));
  const sourceId = useStableId(runtime);
  const registered = import_react3.default.useRef(true);
  import_react3.default.useEffect(() => {
    runtime.registerSource({
      id: sourceId,
      kind: "sensor",
      targetMutableIds: { sensor: sensor.id },
      config: { sensorType, ...config }
    });
    registered.current = true;
    return () => {
      registered.current = false;
      runtime.unregisterSource(sourceId);
    };
  }, [runtime, sourceId, sensorType, config.interval, config.adjustToInterfaceOrientation, config.iosReferenceFrame]);
  return import_react3.default.useMemo(() => ({
    sensor,
    isAvailable: true,
    config,
    unregister() {
      if (registered.current) {
        registered.current = false;
        runtime.unregisterSource(sourceId);
      }
    }
  }), [runtime, sensor, sourceId, config]);
}
function useAnimatedKeyboardForRuntime(runtime, options = {}) {
  if (runtime.adapter.capabilities?.keyboard !== true || !runtime.adapter.registerSource) {
    throw new UnsupportedPlatformError("useAnimatedKeyboard", runtime.adapter.name);
  }
  const height = useRuntimeMutable(runtime, 0);
  const state = useRuntimeMutable(runtime, 4 /* CLOSED */);
  const sourceId = useStableId(runtime);
  import_react3.default.useEffect(() => {
    runtime.registerSource({
      id: sourceId,
      kind: "keyboard",
      targetMutableIds: { height: height.id, state: state.id },
      config: { ...options }
    });
    return () => runtime.unregisterSource(sourceId);
  }, [
    runtime,
    sourceId,
    options.isStatusBarTranslucentAndroid,
    options.isNavigationBarTranslucentAndroid
  ]);
  return import_react3.default.useMemo(() => ({ height, state }), [height, state]);
}
function usePlaybackClockForRuntime(runtime, options = {}) {
  if (runtime.adapter.capabilities?.playbackClock !== true || !runtime.adapter.registerSource) {
    throw new UnsupportedPlatformError("usePlaybackClock", runtime.adapter.name);
  }
  const value = useRuntimeMutable(runtime, options.offset ?? 0);
  const sourceId = useStableId(runtime);
  import_react3.default.useEffect(() => {
    runtime.registerSource({
      id: sourceId,
      kind: "playbackClock",
      targetMutableIds: { value: value.id },
      config: {
        unit: options.unit ?? "ms",
        offset: options.offset ?? 0
      }
    });
    return () => runtime.unregisterSource(sourceId);
  }, [runtime, sourceId, options.unit, options.offset]);
  return value;
}
function useReducedMotionForRuntime(runtime) {
  if (!runtime.adapter.getReducedMotion) {
    throw new UnsupportedPlatformError("useReducedMotion", runtime.adapter.name);
  }
  const [reduced, setReduced] = import_react3.default.useState(() => runtime.adapter.getReducedMotion(runtime.scope));
  import_react3.default.useEffect(() => runtime.adapter.subscribeReducedMotion?.(runtime.scope, setReduced), [runtime]);
  return reduced;
}
function createReducedMotionConfig(runtime) {
  return function ReducedMotionConfig2({ mode = "system" /* System */, children }) {
    if (!runtime.adapter.setReducedMotionOverride) {
      throw new UnsupportedPlatformError("ReducedMotionConfig", runtime.adapter.name);
    }
    import_react3.default.useEffect(() => {
      runtime.adapter.setReducedMotionOverride(runtime.scope, mode);
      return () => runtime.adapter.setReducedMotionOverride(runtime.scope, null);
    }, [mode]);
    return import_react3.default.createElement(import_react3.default.Fragment, null, children);
  };
}
function collectStyle(style, runtime) {
  if (isAnimatedStylePayload(style)) {
    const payload = style[ANIMATED_PAYLOAD_KEY];
    if (payload.runtimeId !== runtime.runtimeId) {
      throw new Error("Animated styles cannot be shared across script-bound animated runtimes.");
    }
    return { regularStyle: style.initialValue, styleIds: [payload.id] };
  }
  if (!Array.isArray(style)) {
    return { regularStyle: style, styleIds: [] };
  }
  const regularStyle = [];
  const styleIds = [];
  for (const entry of style) {
    const collected = collectStyle(entry, runtime);
    if (collected.regularStyle !== void 0 && collected.regularStyle !== null && collected.regularStyle !== false) {
      regularStyle.push(collected.regularStyle);
    }
    styleIds.push(...collected.styleIds);
  }
  return { regularStyle, styleIds };
}
function collectEventIds(props, runtime) {
  const eventIds = {};
  for (const [name, value] of Object.entries(props)) {
    if (!isAnimatedEventHandler(value)) {
      continue;
    }
    const payload = value[ANIMATED_PAYLOAD_KEY];
    if (payload.runtimeId !== runtime.runtimeId) {
      throw new Error("Animated event handlers cannot be shared across script-bound animated runtimes.");
    }
    eventIds[name] = payload.id;
  }
  return eventIds;
}
function createAnimatedComponentForRuntime(runtime, Component) {
  const AnimatedComponent = import_react3.default.forwardRef((props, forwardedRef) => {
    const hostRef = import_react3.default.useRef(null);
    const layoutBoundary = useLayoutAnimationBoundary();
    const {
      animatedProps,
      entering,
      exiting,
      layout,
      style,
      ...rest
    } = props;
    const effectiveEntering = layoutBoundary.skipEntering ? void 0 : entering;
    const effectiveExiting = layoutBoundary.skipExiting ? void 0 : exiting;
    const collectedStyle = collectStyle(style, runtime);
    const propsId = animatedProps?.[ANIMATED_PAYLOAD_KEY].id;
    if (animatedProps && animatedProps[ANIMATED_PAYLOAD_KEY].runtimeId !== runtime.runtimeId) {
      throw new Error("Animated props cannot be shared across script-bound animated runtimes.");
    }
    const initialAnimatedProps = animatedProps?.initialValue ?? {};
    const hostProps = {
      ...rest,
      ...initialAnimatedProps,
      style: collectedStyle.regularStyle,
      ref: hostRef
    };
    const eventIds = collectEventIds(rest, runtime);
    const bindingKey = JSON.stringify({
      styleIds: collectedStyle.styleIds,
      propsId,
      eventIds,
      entering: effectiveEntering,
      exiting: effectiveExiting,
      layout
    });
    import_react3.default.useImperativeHandle(forwardedRef, () => hostRef.current, []);
    useAnimatedBindingEffect(() => {
      const hasBindings = collectedStyle.styleIds.length > 0 || propsId !== void 0 || Object.keys(eventIds).length > 0 || effectiveEntering !== void 0 || effectiveExiting !== void 0 || layout !== void 0;
      if (!hasBindings) {
        return;
      }
      const viewTag = runtime.resolveViewTag(hostRef.current);
      if (viewTag === null) {
        throw new Error("Animated component did not expose a native view tag.");
      }
      runtime.bindView({
        viewTag,
        styleIds: collectedStyle.styleIds,
        propsIds: propsId === void 0 ? [] : [propsId],
        eventIds,
        entering: effectiveEntering,
        exiting: effectiveExiting,
        layout
      });
      return () => runtime.unbindView(viewTag);
    }, [runtime, bindingKey]);
    return import_react3.default.createElement(Component, hostProps);
  });
  AnimatedComponent.displayName = `Animated.${Component.displayName ?? Component.name ?? "Component"}`;
  return AnimatedComponent;
}
function unsupportedHost(name, adapterName) {
  const Component = function UnsupportedAnimatedHost() {
    throw new UnsupportedPlatformError(`Animated.${name}`, adapterName);
  };
  Component.displayName = `Animated.${name}`;
  return Component;
}
function installAnimatedComponents(runtime, hosts = {}) {
  const install = (name) => {
    const Host = hosts[name];
    return Host ? createAnimatedComponentForRuntime(runtime, Host) : unsupportedHost(name, runtime.adapter.name);
  };
  return {
    View: install("View"),
    Text: install("Text"),
    Image: install("Image"),
    ScriptView: install("ScriptView"),
    RenderView: install("RenderView"),
    CanvasView: install("CanvasView"),
    ScrollView: install("ScrollView"),
    FlatList: install("FlatList")
  };
}
function createRuntimeBindings(runtime, hosts) {
  const components = installAnimatedComponents(runtime, hosts);
  const GestureDetector3 = createGestureDetector(
    runtime.adapter,
    runtime.scope,
    () => runtime.allocateId()
  );
  return {
    runtime,
    dispose: () => runtime.dispose(),
    makeMutable: (initial) => makeMutableForRuntime(runtime, initial),
    useSharedValue: (initial) => useSharedValueForRuntime(runtime, initial),
    useDerivedValue: (updater, dependencies) => useDerivedValueForRuntime(runtime, updater, dependencies),
    useAnimatedStyle: (updater, dependencies) => useAnimatedStyleForRuntime(runtime, updater, dependencies),
    useAnimatedProps: (updater, dependencies, adapters) => useAnimatedPropsForRuntime(runtime, updater, dependencies, adapters),
    useAnimatedReaction: (prepare, react, dependencies) => useAnimatedReactionForRuntime(runtime, prepare, react, dependencies),
    useFrameCallback: (callback, autostart) => useFrameCallbackForRuntime(runtime, callback, autostart),
    useFrameTimestamp: () => useFrameTimestampForRuntime(runtime),
    useTimestamp: (isActive = true) => useTimestampForRuntime(runtime, isActive),
    useAnimatedRef: () => useAnimatedRefForRuntime(runtime),
    useEvent: (handler, eventNames, rebuild) => useEventForRuntime(runtime, handler, eventNames, rebuild),
    useAnimatedScrollHandler: (handlers, dependencies) => useAnimatedScrollHandlerForRuntime(runtime, handlers, dependencies),
    useComposedEventHandler: (handlers) => useComposedEventHandlerForRuntime(runtime, handlers),
    useScrollOffset: (ref, providedOffset) => useScrollOffsetForRuntime(runtime, ref, providedOffset),
    useScrollViewOffset: (ref, providedOffset) => useScrollOffsetForRuntime(runtime, ref, providedOffset),
    useAnimatedSensor: (sensorType, config) => useAnimatedSensorForRuntime(runtime, sensorType, config),
    useAnimatedKeyboard: (options) => useAnimatedKeyboardForRuntime(runtime, options),
    usePlaybackClock: (options) => usePlaybackClockForRuntime(runtime, options),
    useReducedMotion: () => useReducedMotionForRuntime(runtime),
    useWorkletCallback: (callback, dependencies = []) => {
      validateWorklet(callback, "useWorkletCallback");
      return import_react3.default.useCallback(callback, [callback, ...dependencies]);
    },
    ReducedMotionConfig: createReducedMotionConfig(runtime),
    createAnimatedComponent: (Component) => createAnimatedComponentForRuntime(runtime, Component),
    cancelAnimation: (sharedValue) => runtime.cancelAnimation(sharedValue),
    scheduleOnUI: (worklet, ...args) => runtime.scheduleOnUI(worklet, args),
    runOnUI: (worklet) => ((...args) => runtime.scheduleOnUI(worklet, args)),
    runOnUIAsync: (worklet) => (...args) => new Promise((resolve, reject) => {
      const complete = (succeeded, value) => {
        if (succeeded) {
          resolve(value);
        } else {
          reject(value);
        }
      };
      Object.defineProperty(complete, "__spotifyPlusOneShotRNCallback", {
        value: true,
        enumerable: false
      });
      const task = createInternalWorklet(
        () => {
          try {
            complete(true, worklet(...args));
          } catch (error) {
            const failure = error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : { name: "Error", message: String(error) };
            complete(false, failure);
          }
        },
        { args, complete, worklet },
        "spotifyplus:runOnUIAsync"
      );
      runtime.scheduleOnUI(task, []);
    }),
    executeOnUIRuntimeSync: (worklet) => (...args) => runtime.executeOnUISync(worklet, args),
    runOnUISync: (worklet) => (...args) => runtime.executeOnUISync(worklet, args),
    scheduleOnRN: (fn, ...args) => runtime.scheduleOnRN(fn, args),
    runOnRNAsync: (fn, ...args) => new Promise((resolve, reject) => {
      runtime.scheduleOnRN(() => {
        try {
          resolve(fn(...args));
        } catch (error) {
          reject(error);
        }
      }, []);
    }),
    runOnJS: (fn) => ((...args) => runtime.scheduleOnRN(fn, args)),
    createWorkletRuntime: (name, initializer) => runtime.createWorkletRuntime(name, initializer),
    runOnRuntime: (workletRuntime, worklet) => (...args) => runtime.scheduleOnRuntime(workletRuntime, worklet, args),
    scheduleOnRuntime: (workletRuntime, worklet, ...args) => runtime.scheduleOnRuntime(workletRuntime, worklet, args),
    measure: (ref) => runtime.measure(ref),
    scrollTo: (ref, x, y, animated = false) => runtime.scrollTo(ref, x, y, animated),
    scrollToOffset: (ref, options) => runtime.scrollTo(ref, 0, options.offset, options.animated ?? false),
    dispatchCommand: (ref, command, args) => runtime.dispatchCommand(ref, command, args),
    setNativeProps: (ref, props) => runtime.setNativeProps(ref, props),
    getViewProp: (ref, propName) => runtime.getViewProp(ref, propName),
    getRelativeCoords: (ref, absoluteX, absoluteY) => {
      const measured = runtime.measure(ref);
      return measured ? { x: absoluteX - measured.pageX, y: absoluteY - measured.pageY } : null;
    },
    enableLayoutAnimations: (enabled = true) => runtime.enableLayoutAnimations(enabled),
    getTimestamp: () => runtime.getTimestamp(),
    callMicrotasks: () => Promise.resolve(),
    isSharedValue: isAnimatedNodeLike,
    Gesture,
    GestureDetector: GestureDetector3,
    ...components
  };
}

// ui/native-animation/interpolation.ts
var interpolation_exports = {};
__export(interpolation_exports, {
  DynamicColorIOS: () => DynamicColorIOS,
  clamp: () => clamp,
  contrastColor: () => contrastColor,
  convertToRGBA: () => convertToRGBA,
  interpolate: () => interpolate,
  interpolateColor: () => interpolateColor,
  processColor: () => processColor
});
var NAMED_COLORS = {
  transparent: "#00000000",
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  green: "#008000",
  blue: "#0000ff",
  yellow: "#ffff00",
  cyan: "#00ffff",
  magenta: "#ff00ff",
  gray: "#808080",
  grey: "#808080"
};
function clamp(value, minimum, maximum) {
  if (minimum > maximum) {
    throw new RangeError("clamp minimum cannot be greater than maximum.");
  }
  return Math.min(maximum, Math.max(minimum, value));
}
function normalizeExtrapolation(options) {
  if (typeof options === "string") {
    return { extrapolateLeft: options, extrapolateRight: options };
  }
  return {
    extrapolateLeft: options?.extrapolateLeft ?? "extend" /* EXTEND */,
    extrapolateRight: options?.extrapolateRight ?? "extend" /* EXTEND */
  };
}
function validateRanges(inputRange, outputRange) {
  if (inputRange.length < 2 || inputRange.length !== outputRange.length) {
    throw new RangeError("Interpolation ranges must have the same length and contain at least two values.");
  }
  for (let index = 1; index < inputRange.length; index++) {
    if (inputRange[index] < inputRange[index - 1]) {
      throw new RangeError("The input range must be monotonically increasing.");
    }
  }
}
function findSegment(value, inputRange) {
  if (value <= inputRange[0]) {
    return 0;
  }
  for (let index = 1; index < inputRange.length; index++) {
    if (value <= inputRange[index]) {
      return index - 1;
    }
  }
  return inputRange.length - 2;
}
function applyExtrapolation(value, edge, outputEdge, mode) {
  if (mode === "identity" /* IDENTITY */) {
    return value;
  }
  if (mode === "clamp" /* CLAMP */) {
    return outputEdge;
  }
  return null;
}
function interpolate(value, inputRange, outputRange, options) {
  validateRanges(inputRange, outputRange);
  const extrapolation = normalizeExtrapolation(options);
  if (value < inputRange[0]) {
    const extrapolated = applyExtrapolation(
      value,
      inputRange[0],
      outputRange[0],
      extrapolation.extrapolateLeft
    );
    if (extrapolated !== null) {
      return extrapolated;
    }
  }
  const finalIndex = inputRange.length - 1;
  if (value > inputRange[finalIndex]) {
    const extrapolated = applyExtrapolation(
      value,
      inputRange[finalIndex],
      outputRange[finalIndex],
      extrapolation.extrapolateRight
    );
    if (extrapolated !== null) {
      return extrapolated;
    }
  }
  const index = findSegment(value, inputRange);
  const inputStart = inputRange[index];
  const inputEnd = inputRange[index + 1];
  const outputStart = outputRange[index];
  const outputEnd = outputRange[index + 1];
  if (inputEnd === inputStart) {
    return outputEnd;
  }
  const progress = (value - inputStart) / (inputEnd - inputStart);
  return outputStart + progress * (outputEnd - outputStart);
}
function parseHex(value) {
  const hex = value.slice(1);
  if (![3, 4, 6, 8].includes(hex.length) || !/^[0-9a-f]+$/i.test(hex)) {
    return null;
  }
  const expanded = hex.length <= 4 ? hex.split("").map((character) => character + character).join("") : hex;
  const hasAlpha = expanded.length === 8;
  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
    a: hasAlpha ? parseInt(expanded.slice(6, 8), 16) / 255 : 1
  };
}
function parseRgb(value) {
  const match = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (!match) {
    return null;
  }
  return {
    r: clamp(Number(match[1]), 0, 255),
    g: clamp(Number(match[2]), 0, 255),
    b: clamp(Number(match[3]), 0, 255),
    a: clamp(match[4] === void 0 ? 1 : Number(match[4]), 0, 1)
  };
}
function parseColor(value) {
  if (typeof value === "number") {
    const color = value >>> 0;
    const hasExplicitAlpha = color > 16777215 || value < 0;
    return {
      a: hasExplicitAlpha ? (color >>> 24 & 255) / 255 : 1,
      r: color >>> 16 & 255,
      g: color >>> 8 & 255,
      b: color & 255
    };
  }
  const normalized = value.trim().toLowerCase();
  const resolved = NAMED_COLORS[normalized] ?? normalized;
  const parsed = resolved.startsWith("#") ? parseHex(resolved) : parseRgb(resolved);
  if (!parsed) {
    throw new TypeError(`Unsupported color value: ${value}`);
  }
  return parsed;
}
function rgbaToString(value) {
  const r = Math.round(clamp(value.r, 0, 255));
  const g = Math.round(clamp(value.g, 0, 255));
  const b = Math.round(clamp(value.b, 0, 255));
  const a = Math.round(clamp(value.a, 0, 1) * 1e4) / 1e4;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function rgbaToNumber(value) {
  const alpha = Math.round(clamp(value.a, 0, 1) * 255);
  return alpha << 24 | Math.round(clamp(value.r, 0, 255)) << 16 | Math.round(clamp(value.g, 0, 255)) << 8 | Math.round(clamp(value.b, 0, 255));
}
function rgbToHsv({ r, g, b, a }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  let hue = 0;
  if (delta !== 0) {
    if (maximum === red) hue = 60 * ((green - blue) / delta % 6);
    else if (maximum === green) hue = 60 * ((blue - red) / delta + 2);
    else hue = 60 * ((red - green) / delta + 4);
  }
  if (hue < 0) hue += 360;
  return { h: hue, s: maximum === 0 ? 0 : delta / maximum, v: maximum, a };
}
function hsvToRgb(h, s, v, a) {
  const chroma = v * s;
  const hue = (h % 360 + 360) % 360;
  const section = hue / 60;
  const x = chroma * (1 - Math.abs(section % 2 - 1));
  let red = 0;
  let green = 0;
  let blue = 0;
  if (section < 1) [red, green] = [chroma, x];
  else if (section < 2) [red, green] = [x, chroma];
  else if (section < 3) [green, blue] = [chroma, x];
  else if (section < 4) [green, blue] = [x, chroma];
  else if (section < 5) [red, blue] = [x, chroma];
  else [red, blue] = [chroma, x];
  const offset = v - chroma;
  return { r: (red + offset) * 255, g: (green + offset) * 255, b: (blue + offset) * 255, a };
}
function rgbToLab(value) {
  const linear2 = [value.r, value.g, value.b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  const x = (linear2[0] * 0.4124 + linear2[1] * 0.3576 + linear2[2] * 0.1805) / 0.95047;
  const y = linear2[0] * 0.2126 + linear2[1] * 0.7152 + linear2[2] * 0.0722;
  const z = (linear2[0] * 0.0193 + linear2[1] * 0.1192 + linear2[2] * 0.9505) / 1.08883;
  const convert = (component) => component > 8856e-6 ? component ** (1 / 3) : 7.787 * component + 16 / 116;
  const fx = convert(x);
  const fy = convert(y);
  const fz = convert(z);
  return { l: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz), alpha: value.a };
}
function labToRgb(l, a, b, alpha) {
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  const convert = (component) => {
    const cubed = component ** 3;
    return cubed > 8856e-6 ? cubed : (component - 16 / 116) / 7.787;
  };
  const x = 0.95047 * convert(fx);
  const y = convert(fy);
  const z = 1.08883 * convert(fz);
  const linear2 = [
    x * 3.2406 + y * -1.5372 + z * -0.4986,
    x * -0.9689 + y * 1.8758 + z * 0.0415,
    x * 0.0557 + y * -0.204 + z * 1.057
  ];
  const convertChannel = (channel) => 255 * (channel <= 31308e-7 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055);
  return {
    r: convertChannel(linear2[0]),
    g: convertChannel(linear2[1]),
    b: convertChannel(linear2[2]),
    a: alpha
  };
}
function mix(start, end, progress) {
  return start + (end - start) * progress;
}
function interpolatePair(start, end, progress, colorSpace, options) {
  if (colorSpace === "HSV") {
    const from = rgbToHsv(start);
    const to = rgbToHsv(end);
    let delta = to.h - from.h;
    if (options.useCorrectedHSVInterpolation !== false && Math.abs(delta) > 180) {
      delta -= Math.sign(delta) * 360;
    }
    return hsvToRgb(
      from.h + delta * progress,
      mix(from.s, to.s, progress),
      mix(from.v, to.v, progress),
      mix(from.a, to.a, progress)
    );
  }
  if (colorSpace === "LAB") {
    const from = rgbToLab(start);
    const to = rgbToLab(end);
    return labToRgb(
      mix(from.l, to.l, progress),
      mix(from.a, to.a, progress),
      mix(from.b, to.b, progress),
      mix(from.alpha, to.alpha, progress)
    );
  }
  const gamma = options.gamma ?? 2.2;
  const interpolateChannel = (from, to) => mix((from / 255) ** gamma, (to / 255) ** gamma, progress) ** (1 / gamma) * 255;
  return {
    r: interpolateChannel(start.r, end.r),
    g: interpolateChannel(start.g, end.g),
    b: interpolateChannel(start.b, end.b),
    a: mix(start.a, end.a, progress)
  };
}
function interpolateColor(value, inputRange, outputRange, colorSpace = "RGB", options = {}) {
  validateRanges(inputRange, outputRange);
  const index = findSegment(value, inputRange);
  const startInput = inputRange[index];
  const endInput = inputRange[index + 1];
  const progress = endInput === startInput ? 1 : clamp((value - startInput) / (endInput - startInput), 0, 1);
  const result = interpolatePair(
    parseColor(outputRange[index]),
    parseColor(outputRange[index + 1]),
    progress,
    colorSpace,
    options
  );
  return outputRange.every((color) => typeof color === "number") ? rgbaToNumber(result) : rgbaToString(result);
}
function processColor(value) {
  try {
    return rgbaToNumber(parseColor(value));
  } catch {
    return null;
  }
}
function convertToRGBA(value) {
  const color = parseColor(value);
  return [color.r, color.g, color.b, color.a];
}
function contrastColor(value) {
  let color;
  try {
    color = parseColor(value);
  } catch {
    return "white";
  }
  const linearChannel = (channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * linearChannel(color.r) + 0.7152 * linearChannel(color.g) + 0.0722 * linearChannel(color.b);
  const contrastWithBlack = (luminance + 0.05) / 0.05;
  const contrastWithWhite = 1.05 / (luminance + 0.05);
  return contrastWithBlack > contrastWithWhite ? "black" : "white";
}
function DynamicColorIOS(_config) {
  throw new UnsupportedPlatformError("DynamicColorIOS", "SpotifyPlus Android UI V8");
}

// ui/native-animation/local-adapter.ts
function scopeKey(scope) {
  return `${scope.scriptId}\0${scope.generation}\0${scope.surfaceId ?? ""}`;
}
function schedule(callback) {
  if (typeof queueMicrotask === "function") {
    queueMicrotask(callback);
  } else {
    Promise.resolve().then(callback);
  }
}
function createJavaScriptAnimationAdapter() {
  const mutables = /* @__PURE__ */ new Map();
  const registrations = /* @__PURE__ */ new Map();
  const mutableKey = (scope, id) => `${scopeKey(scope)}\0mutable:${id}`;
  const registrationKey = (scope, id) => `${scopeKey(scope)}\0worklet:${id}`;
  return {
    name: "JavaScript fallback",
    capabilities: {
      worklets: true,
      workletGlobals: true
    },
    createMutable(scope, request) {
      mutables.set(mutableKey(scope, request.id), {
        value: request.initial,
        listeners: /* @__PURE__ */ new Set()
      });
    },
    readMutable(scope, id) {
      return mutables.get(mutableKey(scope, id))?.value;
    },
    writeMutable(scope, request) {
      const key = mutableKey(scope, request.id);
      const record = mutables.get(key);
      if (!record) {
        return;
      }
      const next = isAnimation(request.value) ? request.value.toValue ?? record.value : request.value;
      record.value = next;
      for (const listener of record.listeners) {
        listener(next);
      }
    },
    subscribeMutable(scope, id, listener) {
      const record = mutables.get(mutableKey(scope, id));
      if (!record) {
        return () => void 0;
      }
      const typedListener = listener;
      record.listeners.add(typedListener);
      return () => record.listeners.delete(typedListener);
    },
    releaseMutable(scope, id) {
      mutables.delete(mutableKey(scope, id));
    },
    registerWorklet(scope, registration) {
      registrations.set(registrationKey(scope, registration.id), registration);
    },
    updateWorklet(scope, registration) {
      registrations.set(registrationKey(scope, registration.id), registration);
    },
    unregisterWorklet(scope, id) {
      registrations.delete(registrationKey(scope, id));
    },
    setWorkletActive() {
    },
    scheduleOnUI(_scope, worklet, args) {
      schedule(() => worklet.callable(...args));
    },
    executeOnUISync(_scope, worklet, args) {
      return worklet.callable(...args);
    },
    scheduleOnRN(_scope, fn, args) {
      schedule(() => fn(...args));
    },
    cancelAnimation() {
    },
    getTimestamp() {
      return typeof performance !== "undefined" ? performance.now() : Date.now();
    }
  };
}

// ui/native-animation/core.ts
var ReanimatedLogLevel = /* @__PURE__ */ ((ReanimatedLogLevel2) => {
  ReanimatedLogLevel2[ReanimatedLogLevel2["warn"] = 1] = "warn";
  ReanimatedLogLevel2[ReanimatedLogLevel2["error"] = 2] = "error";
  return ReanimatedLogLevel2;
})(ReanimatedLogLevel || {});
var loggerConfig = {
  level: 1 /* warn */,
  strict: true
};
function configureReanimatedLogger(config) {
  loggerConfig = {
    level: config.level ?? 1 /* warn */,
    strict: config.strict ?? true
  };
}
function getReanimatedLoggerConfig() {
  return { ...loggerConfig };
}
var STATIC_API = {
  ...types_exports,
  ...animations_exports,
  ...interpolation_exports,
  ...layout_exports,
  ...gesture_exports,
  ReanimatedLogLevel,
  RuntimeKind,
  UnsupportedPlatformError,
  WorkletValidationError,
  WORKLET_GLOBAL_EXPORTS,
  WORKLET_GLOBALS_MANIFEST,
  createAnimatedRuntime,
  createAnimatedPropAdapter,
  createJavaScriptAnimationAdapter,
  configureReanimatedLogger,
  getReanimatedLoggerConfig,
  getRuntimeKind,
  getWorkletMetadata,
  isAllowedWorkletGlobal,
  isAnimatedEventHandler,
  isAnimatedNodeLike,
  isAnimatedPropsPayload,
  isAnimatedStylePayload,
  isWorkletFunction,
  isWorkletRuntime,
  serializeWorklet,
  useHandler,
  validateWorklet
};
function createAnimatedModule(adapter, scope, hosts) {
  const runtime = createAnimatedRuntime(adapter, scope);
  const bindings = createRuntimeBindings(runtime, hosts);
  return Object.freeze({
    ...STATIC_API,
    ...bindings,
    createAnimatedModule,
    createAnimatedRuntime
  });
}
var defaultAdapter = createJavaScriptAnimationAdapter();
var defaultRuntime = createAnimatedRuntime(defaultAdapter, {
  scriptId: "spotifyplus:animated-hostless",
  generation: 0
});
var defaultBindings = createRuntimeBindings(defaultRuntime);
var makeMutable = defaultBindings.makeMutable;
var useSharedValue = defaultBindings.useSharedValue;
var useDerivedValue = defaultBindings.useDerivedValue;
var useAnimatedStyle = defaultBindings.useAnimatedStyle;
var useAnimatedProps = defaultBindings.useAnimatedProps;
var useAnimatedReaction = defaultBindings.useAnimatedReaction;
var useFrameCallback = defaultBindings.useFrameCallback;
var useFrameTimestamp = defaultBindings.useFrameTimestamp;
var useTimestamp = defaultBindings.useTimestamp;
var useAnimatedRef = defaultBindings.useAnimatedRef;
var useEvent = defaultBindings.useEvent;
var useAnimatedScrollHandler = defaultBindings.useAnimatedScrollHandler;
var useComposedEventHandler = defaultBindings.useComposedEventHandler;
var useScrollOffset = defaultBindings.useScrollOffset;
var useScrollViewOffset = defaultBindings.useScrollViewOffset;
var useAnimatedSensor = defaultBindings.useAnimatedSensor;
var useAnimatedKeyboard = defaultBindings.useAnimatedKeyboard;
var usePlaybackClock = defaultBindings.usePlaybackClock;
var useReducedMotion = defaultBindings.useReducedMotion;
var ReducedMotionConfig = defaultBindings.ReducedMotionConfig;
var createAnimatedComponent = defaultBindings.createAnimatedComponent;
var cancelAnimation = defaultBindings.cancelAnimation;
var scheduleOnUI = defaultBindings.scheduleOnUI;
var runOnUI = defaultBindings.runOnUI;
var runOnUIAsync = defaultBindings.runOnUIAsync;
var executeOnUIRuntimeSync = defaultBindings.executeOnUIRuntimeSync;
var runOnUISync = defaultBindings.runOnUISync;
var scheduleOnRN = defaultBindings.scheduleOnRN;
var runOnRNAsync = defaultBindings.runOnRNAsync;
var runOnJS = defaultBindings.runOnJS;
var createWorkletRuntime = defaultBindings.createWorkletRuntime;
var runOnRuntime = defaultBindings.runOnRuntime;
var scheduleOnRuntime = defaultBindings.scheduleOnRuntime;
var measure = defaultBindings.measure;
var scrollTo = defaultBindings.scrollTo;
var scrollToOffset = defaultBindings.scrollToOffset;
var dispatchCommand = defaultBindings.dispatchCommand;
var setNativeProps = defaultBindings.setNativeProps;
var getViewProp = defaultBindings.getViewProp;
var getRelativeCoords = defaultBindings.getRelativeCoords;
var enableLayoutAnimations = defaultBindings.enableLayoutAnimations;
var GestureDetector2 = defaultBindings.GestureDetector;
var View = defaultBindings.View;
var Text = defaultBindings.Text;
var Image = defaultBindings.Image;
var ScriptView = defaultBindings.ScriptView;
var RenderView = defaultBindings.RenderView;
var CanvasView = defaultBindings.CanvasView;
var ScrollView = defaultBindings.ScrollView;
var FlatList = defaultBindings.FlatList;
var useWorkletCallback = defaultBindings.useWorkletCallback;
var getTimestamp = defaultBindings.getTimestamp;
var callMicrotasks = defaultBindings.callMicrotasks;
var isSharedValue = defaultBindings.isSharedValue;
var Animated = Object.freeze({
  ...STATIC_API,
  ...defaultBindings,
  createAnimatedModule,
  createAnimatedRuntime,
  useWorkletCallback,
  getTimestamp,
  callMicrotasks,
  isSharedValue,
  View,
  Text,
  Image,
  ScriptView,
  RenderView,
  CanvasView,
  ScrollView,
  FlatList
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ANIMATED_PAYLOAD_KEY,
  ANIMATION_MARKER_KEY,
  Animated,
  AnimatedRuntime,
  BaseGesture,
  BounceIn,
  BounceInDown,
  BounceInLeft,
  BounceInRight,
  BounceInUp,
  BounceOut,
  BounceOutDown,
  BounceOutLeft,
  BounceOutRight,
  BounceOutUp,
  CSS,
  CSSAnimationEasing,
  CanvasView,
  CurvedTransition,
  DefaultLayoutEasing,
  Directions,
  DynamicColorIOS,
  Easing,
  EntryExitTransition,
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeInDownBig,
  FadeInLeft,
  FadeInLeftBig,
  FadeInRight,
  FadeInRightBig,
  FadeInUp,
  FadeInUpBig,
  FadeOut,
  FadeOutDown,
  FadeOutDownBig,
  FadeOutLeft,
  FadeOutLeftBig,
  FadeOutRight,
  FadeOutRightBig,
  FadeOutUp,
  FadeOutUpBig,
  FadingTransition,
  FlatList,
  FlipInEasyX,
  FlipInEasyY,
  FlipInXDown,
  FlipInXUp,
  FlipInYLeft,
  FlipInYRight,
  FlipOutEasyX,
  FlipOutEasyY,
  FlipOutXDown,
  FlipOutXUp,
  FlipOutYLeft,
  FlipOutYRight,
  GESTURE_MARKER_KEY,
  Gesture,
  GestureDetector,
  GestureState,
  IOSReferenceFrame,
  Image,
  JumpingTransition,
  KeyboardState,
  Keyframe,
  Layout,
  LayoutAnimationBuilder,
  LayoutAnimationConfig,
  LightSpeedInLeft,
  LightSpeedInRight,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  LinearTransition,
  MouseButton,
  PinwheelIn,
  PinwheelOut,
  ReanimatedLogLevel,
  ReduceMotion,
  ReducedMotionConfig,
  RenderView,
  RollInLeft,
  RollInRight,
  RollOutLeft,
  RollOutRight,
  RotateInDownLeft,
  RotateInDownRight,
  RotateInUpLeft,
  RotateInUpRight,
  RotateOutDownLeft,
  RotateOutDownRight,
  RotateOutUpLeft,
  RotateOutUpRight,
  RuntimeKind,
  SHARED_VALUE_KEY,
  ScriptView,
  ScrollView,
  SensorType,
  SequencedTransition,
  SharedTransition,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  StretchInX,
  StretchInY,
  StretchOutX,
  StretchOutY,
  Text,
  UnsupportedPlatformError,
  View,
  WORKLET_GLOBALS_MANIFEST,
  WORKLET_GLOBAL_EXPORTS,
  WORKLET_METADATA_KEY,
  WorkletValidationError,
  ZoomIn,
  ZoomInDown,
  ZoomInEasyDown,
  ZoomInEasyUp,
  ZoomInLeft,
  ZoomInRight,
  ZoomInRotate,
  ZoomInUp,
  ZoomOut,
  ZoomOutDown,
  ZoomOutEasyDown,
  ZoomOutEasyUp,
  ZoomOutLeft,
  ZoomOutRight,
  ZoomOutRotate,
  ZoomOutUp,
  callMicrotasks,
  cancelAnimation,
  clamp,
  configureReanimatedLogger,
  contrastColor,
  convertToRGBA,
  createAnimatedComponent,
  createAnimatedModule,
  createAnimatedPropAdapter,
  createAnimatedRuntime,
  createGestureDetector,
  createGestureModule,
  createJavaScriptAnimationAdapter,
  createKeyframes,
  createWorkletRuntime,
  cubicBezier,
  defineAnimation,
  dispatchCommand,
  enableLayoutAnimations,
  executeOnUIRuntimeSync,
  getReanimatedLoggerConfig,
  getRelativeCoords,
  getRuntimeKind,
  getTimestamp,
  getViewProp,
  getWorkletMetadata,
  installAnimatedComponents,
  interpolate,
  interpolateColor,
  isAllowedWorkletGlobal,
  isAnimatedEventHandler,
  isAnimatedNodeLike,
  isAnimatedPropsPayload,
  isAnimatedStylePayload,
  isAnimation,
  isGesture,
  isSharedValue,
  isWorkletFunction,
  isWorkletRuntime,
  linear,
  makeMutable,
  measure,
  processColor,
  runOnJS,
  runOnRNAsync,
  runOnRuntime,
  runOnUI,
  runOnUIAsync,
  runOnUISync,
  scheduleOnRN,
  scheduleOnRuntime,
  scheduleOnUI,
  scrollTo,
  scrollToOffset,
  serializeGesture,
  serializeWorklet,
  setNativeProps,
  steps,
  useAnimatedKeyboard,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedSensor,
  useAnimatedStyle,
  useComposedEventHandler,
  useDerivedValue,
  useEvent,
  useFrameCallback,
  useFrameTimestamp,
  useHandler,
  useLayoutAnimationBoundary,
  usePlaybackClock,
  useReducedMotion,
  useScrollOffset,
  useScrollViewOffset,
  useSharedValue,
  useTimestamp,
  useWorkletCallback,
  validateWorklet,
  withClamp,
  withCustomAnimation,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
});
