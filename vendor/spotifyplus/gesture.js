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

// sdk/gesture.ts
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
module.exports = __toCommonJS(gesture_exports);

// ui/native-animation/gesture.ts
var import_react = __toESM(require("react"));

// ui/native-animation/types.ts
var WORKLET_METADATA_KEY = "__spotifyPlusWorklet";

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

// ui/native-animation/gesture.ts
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
  return function GestureDetector2({ gesture, children }) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseGesture,
  Directions,
  GESTURE_MARKER_KEY,
  Gesture,
  GestureDetector,
  GestureState,
  MouseButton,
  createGestureDetector,
  createGestureModule,
  isGesture,
  serializeGesture
});
