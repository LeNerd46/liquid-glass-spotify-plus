#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// tools/dev-cli.mjs
var import_node_child_process = require("node:child_process");
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_http = __toESM(require("node:http"), 1);
var import_node_path7 = __toESM(require("node:path"), 1);
var import_node_util = require("node:util");

// tools/cli-options.mjs
var import_node_path = __toESM(require("node:path"), 1);
var DEFAULT_DEV_PORT = 37846;
function parsePositiveInteger(value, name) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) throw new Error(`${name} must be a positive integer`);
  return parsed;
}
function parseCliArgs(argv, cwd = process.cwd()) {
  const args = [...argv];
  let command = "dev";
  if (["dev", "build", "create-native"].includes(args[0])) command = args.shift();
  else if (args[0] === "help") {
    args.shift();
    args.unshift("--help");
  }
  const options = {
    adb: process.env.ADB || "adb",
    command,
    debounceMs: 150,
    device: "",
    entryPath: void 0,
    help: false,
    minify: false,
    outfile: void 0,
    port: DEFAULT_DEV_PORT,
    scriptDir: cwd,
    sourcemap: false
  };
  const positional = [];
  if (command === "create-native") {
    for (const argument of args) {
      if (argument === "--help" || argument === "-h") options.help = true;
      else if (argument.startsWith("-")) throw new Error(`Unknown option ${argument}`);
      else positional.push(argument);
    }
    if (positional.length > 1) throw new Error("Expected at most one project directory");
    options.projectDir = positional[0] ? import_node_path.default.resolve(cwd, positional[0]) : void 0;
    return options;
  }
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === "--help" || argument === "-h") {
      options.help = true;
      continue;
    }
    if (argument === "--minify") {
      options.minify = true;
      continue;
    }
    if (argument === "--sourcemap") {
      options.sourcemap = true;
      continue;
    }
    if (!argument.startsWith("--")) {
      positional.push(argument);
      continue;
    }
    const separator = argument.indexOf("=");
    const rawName = separator === -1 ? argument.slice(2) : argument.slice(2, separator);
    const inlineValue = separator === -1 ? void 0 : argument.slice(separator + 1);
    const value = inlineValue ?? args[++index];
    if (value == null || value.startsWith("--")) throw new Error(`Missing value for --${rawName}`);
    switch (rawName) {
      case "adb":
        options.adb = value;
        break;
      case "debounce-ms":
        options.debounceMs = parsePositiveInteger(value, "--debounce-ms");
        break;
      case "device":
        options.device = value;
        break;
      case "entry":
        options.entryPath = value;
        break;
      case "outfile":
        options.outfile = value;
        break;
      case "port":
        options.port = parsePositiveInteger(value, "--port");
        break;
      default:
        throw new Error(`Unknown option --${rawName}`);
    }
  }
  if (positional.length > 1) throw new Error("Expected at most one extension directory");
  if (positional[0]) options.scriptDir = positional[0];
  options.scriptDir = import_node_path.default.resolve(cwd, options.scriptDir);
  if (command === "dev" && options.outfile) throw new Error("--outfile is only available with spotifyplus build");
  return options;
}

// tools/dev-source-map.mjs
var import_node_module = require("node:module");
var import_node_path2 = __toESM(require("node:path"), 1);
var import_node_url = require("node:url");
var INLINE_SOURCE_MAP_PATTERN = /sourceMappingURL=data:application\/json(?:;charset=[^;,]+)?;base64,([^\r\n]+)/;
var STACK_LOCATION_PATTERN = /((?:file:\/\/\/|\/|[A-Za-z]:[\\/])[^()\r\n]+?):(\d+):(\d+)/g;
var DEV_LOG_COLORS = {
  error: "\x1B[31m",
  log: "\x1B[36m",
  warn: "\x1B[33m"
};
var ANSI_RESET = "\x1B[0m";
function readInlineSourceMap(bundleSource) {
  const match = String(bundleSource).match(INLINE_SOURCE_MAP_PATTERN);
  if (!match) return null;
  try {
    return JSON.parse(Buffer.from(match[1], "base64").toString("utf8"));
  } catch {
    return null;
  }
}
function locationBasename(location) {
  let filePath = location;
  if (filePath.startsWith("file:///")) {
    try {
      filePath = (0, import_node_url.fileURLToPath)(filePath);
    } catch {
    }
  }
  return import_node_path2.default.posix.basename(filePath.replaceAll("\\", "/"));
}
function resolveOriginalSource(scriptDir, source) {
  if (source.startsWith("file:")) {
    try {
      return (0, import_node_url.fileURLToPath)(source);
    } catch {
    }
  }
  if (import_node_path2.default.isAbsolute(source)) return import_node_path2.default.normalize(source);
  return import_node_path2.default.resolve(scriptDir, source);
}
function createDevSourceMapper(bundleSource, scriptDir, generatedFile) {
  const payload = readInlineSourceMap(bundleSource);
  const generatedBasename = import_node_path2.default.basename(generatedFile);
  const sourceMap = payload ? new import_node_module.SourceMap(payload) : null;
  const mapLocation = (location, lineText, columnText) => {
    if (!sourceMap || locationBasename(location) !== generatedBasename) return null;
    const line = Number.parseInt(lineText, 10);
    const column = Number.parseInt(columnText, 10);
    if (!Number.isFinite(line) || !Number.isFinite(column) || line < 1 || column < 1) return null;
    const entry = sourceMap.findEntry(line - 1, column - 1);
    if (!entry.originalSource) return null;
    return `${resolveOriginalSource(scriptDir, entry.originalSource)}:${entry.originalLine + 1}:${entry.originalColumn + 1}`;
  };
  return {
    map(text) {
      return String(text).replace(
        STACK_LOCATION_PATTERN,
        (match, location, line, column) => mapLocation(location, line, column) ?? match
      );
    },
    firstOriginalLocation(text) {
      let firstLocation = null;
      String(text).replace(STACK_LOCATION_PATTERN, (match, location, line, column) => {
        firstLocation ?? (firstLocation = mapLocation(location, line, column));
        return match;
      });
      return firstLocation;
    }
  };
}
function formatDevLogEntry(entry, sourceMapper) {
  const prefix = entry.scriptId ? `[${entry.scriptId}]` : "[node]";
  const message = sourceMapper.map(entry.message ?? "");
  const originalLocation = sourceMapper.firstOriginalLocation(entry.stack ?? "");
  if (!originalLocation || message.includes(originalLocation)) return `${prefix} ${message}`;
  return `${prefix} ${message}
    at ${originalLocation}`;
}
function colorizeDevLogOutput(output, level, enabled) {
  if (!enabled) return output;
  const color = DEV_LOG_COLORS[level] ?? DEV_LOG_COLORS.log;
  return `${color}${output}${ANSI_RESET}`;
}

// tools/extension-build.mjs
var import_promises3 = __toESM(require("node:fs/promises"), 1);
var import_node_path5 = __toESM(require("node:path"), 1);
var import_esbuild = require("esbuild");

// tools/unicode-regex.mjs
var import_promises = __toESM(require("node:fs/promises"), 1);
var import_node_path3 = __toESM(require("node:path"), 1);
var import_core = require("@babel/core");
var import_plugin_transform_unicode_property_regex = __toESM(require("@babel/plugin-transform-unicode-property-regex"), 1);
var unicodePropertyRegex = import_plugin_transform_unicode_property_regex.default.default ?? import_plugin_transform_unicode_property_regex.default;
function spotifyPlusDependencyRegexPlugin() {
  return {
    name: "spotifyplus-dependency-regex",
    setup(build2) {
      build2.onLoad({ filter: /[/\\]node_modules[/\\].*\.[cm]?js$/ }, async (args) => {
        const source = await import_promises.default.readFile(args.path, "utf8");
        if (!/\\[pP]\{/.test(source)) return null;
        const result = await (0, import_core.transformAsync)(source, {
          babelrc: false,
          configFile: false,
          filename: args.path,
          plugins: [unicodePropertyRegex],
          sourceMaps: "inline"
        });
        return { contents: result.code, loader: "js", resolveDir: import_node_path3.default.dirname(args.path), watchFiles: [args.path] };
      });
    }
  };
}

// tools/worklet-transform.mjs
var import_node_crypto = __toESM(require("node:crypto"), 1);
var import_promises2 = __toESM(require("node:fs/promises"), 1);
var import_node_path4 = __toESM(require("node:path"), 1);
var import_core2 = require("@babel/core");
var import_generator = __toESM(require("@babel/generator"), 1);
var import_plugin_transform_typescript = __toESM(require("@babel/plugin-transform-typescript"), 1);
var generate = import_generator.default.default ?? import_generator.default;
var transformTypeScript = import_plugin_transform_typescript.default.default ?? import_plugin_transform_typescript.default;
var SPOTIFYPLUS_WORKLET_VERSION = 2;
var SPOTIFYPLUS_WORKLET_BUNDLE_MARKER = "globalThis.__spotifyplus_worklet_bundle__ = 2;";
var SPOTIFYPLUS_ANIMATED_MODULE = "spotifyplus/react/reanimated";
var SPOTIFYPLUS_GESTURE_MODULE = "spotifyplus/react/Gesture";
var LEGACY_SPOTIFYPLUS_ANIMATED_MODULE = "spotifyplus/react/Animated";
function isSpotifyPlusAnimatedModule(moduleName) {
  return moduleName === SPOTIFYPLUS_ANIMATED_MODULE || moduleName === LEGACY_SPOTIFYPLUS_ANIMATED_MODULE;
}
var AUTO_WORKLET_ARGUMENTS = /* @__PURE__ */ new Map([
  ["createAnimatedPropAdapter", [0]],
  ["createWorkletRuntime", [1]],
  ["executeOnUIRuntimeSync", [0]],
  ["onBegin", [0]],
  ["onChange", [0]],
  ["onEnd", [0]],
  ["onFinalize", [0]],
  ["onStart", [0]],
  ["onTouchesCancelled", [0]],
  ["onTouchesDown", [0]],
  ["onTouchesMove", [0]],
  ["onTouchesUp", [0]],
  ["onUpdate", [0]],
  ["runOnRuntime", [1]],
  ["runOnRuntimeAsync", [1]],
  ["runOnRuntimeSync", [1]],
  ["runOnUI", [0]],
  ["runOnUIAsync", [0]],
  ["runOnUISync", [0]],
  ["scheduleOnRuntime", [1]],
  ["scheduleOnUI", [0]],
  ["useAnimatedProps", [0]],
  ["useAnimatedReaction", [0, 1]],
  ["useAnimatedGestureHandler", [0]],
  ["useAnimatedScrollHandler", [0]],
  ["useAnimatedStyle", [0]],
  ["useDerivedValue", [0]],
  ["useEvent", [0]],
  ["useFrameCallback", [0]],
  ["useWorkletCallback", [0]],
  ["withDecay", [1]],
  ["withRepeat", [3]],
  ["withSpring", [2]],
  ["withTiming", [2]],
  ["withCallback", [0]]
]);
var AUTO_WORKLET_OBJECT_ARGUMENTS = /* @__PURE__ */ new Set([
  "useAnimatedGestureHandler",
  "useAnimatedScrollHandler"
]);
var ANIMATED_METHOD_CALLBACKS = /* @__PURE__ */ new Set([
  "onBegin",
  "onChange",
  "onEnd",
  "onFinalize",
  "onStart",
  "onTouchesCancelled",
  "onTouchesDown",
  "onTouchesMove",
  "onTouchesUp",
  "onUpdate",
  "withCallback"
]);
var DEFAULT_WORKLET_GLOBALS = /* @__PURE__ */ new Set([
  "Array",
  "ArrayBuffer",
  "AggregateError",
  "Atomics",
  "BigInt",
  "BigInt64Array",
  "BigUint64Array",
  "Boolean",
  "DataView",
  "Date",
  "Error",
  "EvalError",
  "Float32Array",
  "Float64Array",
  "FinalizationRegistry",
  "Infinity",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Intl",
  "JSON",
  "Map",
  "Math",
  "NaN",
  "Number",
  "Object",
  "Promise",
  "Proxy",
  "RangeError",
  "ReferenceError",
  "Reflect",
  "RegExp",
  "Set",
  "SharedArrayBuffer",
  "String",
  "Symbol",
  "SyntaxError",
  "TypeError",
  "URIError",
  "Uint16Array",
  "Uint32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "URL",
  "URLSearchParams",
  "WeakRef",
  "WebAssembly",
  "WeakMap",
  "WeakSet",
  "console",
  "atob",
  "btoa",
  "cancelAnimationFrame",
  "clearInterval",
  "clearTimeout",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "global",
  "globalThis",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "performance",
  "queueMicrotask",
  "requestAnimationFrame",
  "self",
  "setInterval",
  "setTimeout",
  "structuredClone",
  "undefined",
  "unescape"
]);
function unwrapExpressionPath(inputPath) {
  let current = inputPath;
  while (current) {
    if (current.isTSAsExpression?.() || current.isTSSatisfiesExpression?.() || current.isTSNonNullExpression?.() || current.isTypeCastExpression?.() || current.isParenthesizedExpression?.()) {
      current = current.get("expression");
      continue;
    }
    return current;
  }
  return inputPath;
}
function importedName(importPath) {
  const imported = importPath.node.imported;
  if (!imported) return null;
  return imported.name ?? imported.value ?? null;
}
function resolveCanonicalCalleeName(inputPath, seenBindings = /* @__PURE__ */ new Set()) {
  const calleePath = unwrapExpressionPath(inputPath);
  if (calleePath.isSequenceExpression?.()) {
    const expressions = calleePath.get("expressions");
    return expressions.length > 0 ? resolveCanonicalCalleeName(expressions[expressions.length - 1], seenBindings) : null;
  }
  if (calleePath.isMemberExpression?.() || calleePath.isOptionalMemberExpression?.()) {
    const propertyPath = calleePath.get("property");
    if (!calleePath.node.computed && propertyPath.isIdentifier()) return propertyPath.node.name;
    if (calleePath.node.computed && propertyPath.isStringLiteral()) return propertyPath.node.value;
    return null;
  }
  if (!calleePath.isIdentifier?.()) return null;
  const localName = calleePath.node.name;
  const binding = calleePath.scope.getBinding(localName);
  if (!binding || seenBindings.has(binding)) return localName;
  seenBindings.add(binding);
  if (binding.path.isImportSpecifier()) return importedName(binding.path) ?? localName;
  if (binding.path.isImportDefaultSpecifier() || binding.path.isImportNamespaceSpecifier()) return localName;
  if (binding.path.isVariableDeclarator()) {
    const initializer = binding.path.get("init");
    if (initializer?.node) return resolveCanonicalCalleeName(initializer, seenBindings) ?? localName;
  }
  return localName;
}
function resolveReferencedFunction(inputPath, seenBindings = /* @__PURE__ */ new Set()) {
  const candidatePath = unwrapExpressionPath(inputPath);
  if (candidatePath.isArrowFunctionExpression?.() || candidatePath.isFunctionExpression?.() || candidatePath.isObjectMethod?.()) {
    return candidatePath;
  }
  if (!candidatePath.isIdentifier?.()) return null;
  const binding = candidatePath.scope.getBinding(candidatePath.node.name);
  if (!binding || seenBindings.has(binding)) return null;
  seenBindings.add(binding);
  if (binding.path.isFunctionDeclaration()) return binding.path;
  if (binding.path.isVariableDeclarator()) {
    const initializer = binding.path.get("init");
    if (initializer?.node) return resolveReferencedFunction(initializer, seenBindings);
  }
  for (const violation of binding.constantViolations ?? []) {
    if (!violation.isAssignmentExpression()) continue;
    const right = violation.get("right");
    const resolved = resolveReferencedFunction(right, seenBindings);
    if (resolved) return resolved;
  }
  return null;
}
function resolveReferencedObject(inputPath, seenBindings = /* @__PURE__ */ new Set()) {
  const candidatePath = unwrapExpressionPath(inputPath);
  if (candidatePath.isObjectExpression?.()) return candidatePath;
  if (!candidatePath.isIdentifier?.()) return null;
  const binding = candidatePath.scope.getBinding(candidatePath.node.name);
  if (!binding || seenBindings.has(binding)) return null;
  seenBindings.add(binding);
  if (!binding.path.isVariableDeclarator()) return null;
  const initializer = binding.path.get("init");
  return initializer?.node ? resolveReferencedObject(initializer, seenBindings) : null;
}
function isAnimatedOwnedExpression(inputPath, seenBindings = /* @__PURE__ */ new Set()) {
  const candidatePath = unwrapExpressionPath(inputPath);
  if (!candidatePath?.node) return false;
  if (candidatePath.isIdentifier()) {
    const binding = candidatePath.scope.getBinding(candidatePath.node.name);
    if (!binding || seenBindings.has(binding)) return false;
    if (resolveAnimatedBinding(binding, candidatePath.node.name)) return true;
    const importSource = importDeclarationFor(binding.path)?.node.source.value;
    if (importSource === SPOTIFYPLUS_GESTURE_MODULE) return true;
    seenBindings.add(binding);
    if (!binding.path.isVariableDeclarator()) return false;
    const initializerPath = binding.path.get("init");
    if (requireModuleName(initializerPath) === SPOTIFYPLUS_GESTURE_MODULE) return true;
    return initializerPath?.node ? isAnimatedOwnedExpression(initializerPath, seenBindings) : false;
  }
  if (candidatePath.isCallExpression() || candidatePath.isOptionalCallExpression?.()) {
    return isAnimatedOwnedExpression(candidatePath.get("callee"), seenBindings);
  }
  if (candidatePath.isMemberExpression() || candidatePath.isOptionalMemberExpression()) {
    return isAnimatedOwnedExpression(candidatePath.get("object"), seenBindings);
  }
  return false;
}
function markObjectWorklets(objectPath, state) {
  for (const propertyPath of objectPath.get("properties")) {
    if (propertyPath.isObjectMethod()) {
      state.spotifyPlusAutoWorklets.add(propertyPath.node);
      continue;
    }
    if (!propertyPath.isObjectProperty()) continue;
    const functionPath = resolveReferencedFunction(propertyPath.get("value"));
    if (functionPath?.node) state.spotifyPlusAutoWorklets.add(functionPath.node);
  }
}
function markAutomaticWorklets(programPath, state) {
  programPath.traverse({
    CallExpression(callPath) {
      const canonicalName = resolveCanonicalCalleeName(callPath.get("callee"));
      const argumentIndices = canonicalName ? AUTO_WORKLET_ARGUMENTS.get(canonicalName) : null;
      if (!argumentIndices) return;
      if (ANIMATED_METHOD_CALLBACKS.has(canonicalName)) {
        const calleePath = unwrapExpressionPath(callPath.get("callee"));
        if (!(calleePath.isMemberExpression() || calleePath.isOptionalMemberExpression()) || !isAnimatedOwnedExpression(calleePath.get("object"))) {
          return;
        }
      }
      const argumentPaths = callPath.get("arguments");
      for (const index of argumentIndices) {
        const argumentPath = argumentPaths[index];
        if (!argumentPath?.node) continue;
        const functionPath = resolveReferencedFunction(argumentPath);
        if (functionPath?.node) {
          state.spotifyPlusAutoWorklets.add(functionPath.node);
          continue;
        }
        if (!AUTO_WORKLET_OBJECT_ARGUMENTS.has(canonicalName)) continue;
        const objectPath = resolveReferencedObject(argumentPath);
        if (objectPath) markObjectWorklets(objectPath, state);
      }
    }
  });
}
function hasWorkletDirective(functionPath) {
  const directives = functionPath.node.body?.directives;
  return Array.isArray(directives) && directives.some((directive) => directive.value?.value === "worklet");
}
function removeWorkletDirective(node) {
  if (!Array.isArray(node.body?.directives)) return;
  node.body.directives = node.body.directives.filter((directive) => directive.value?.value !== "worklet");
}
function isTypeOnlyReference(referencePath) {
  return !!referencePath.findParent((parentPath) => parentPath.isTSType?.() || parentPath.isTSTypeAnnotation?.() || parentPath.isTSTypeParameter?.() || parentPath.isTSTypeParameterDeclaration?.() || parentPath.isTSTypeParameterInstantiation?.() || parentPath.isTSInterfaceDeclaration?.() || parentPath.isTSTypeAliasDeclaration?.());
}
function isPathInside(candidatePath, ancestorPath) {
  let current = candidatePath;
  while (current) {
    if (current === ancestorPath) return true;
    current = current.parentPath;
  }
  return false;
}
function importDeclarationFor(bindingPath) {
  return bindingPath.findParent?.((parentPath) => parentPath.isImportDeclaration?.()) ?? null;
}
function isAnimatedImport(bindingPath) {
  return isSpotifyPlusAnimatedModule(importDeclarationFor(bindingPath)?.node.source.value);
}
function staticMemberName(memberPath) {
  if (!memberPath?.node) return null;
  const propertyPath = memberPath.get("property");
  if (!memberPath.node.computed && propertyPath.isIdentifier()) return propertyPath.node.name;
  if (memberPath.node.computed && propertyPath.isStringLiteral()) return propertyPath.node.value;
  return null;
}
function requireModuleName(expressionPath) {
  const candidatePath = unwrapExpressionPath(expressionPath);
  if (!candidatePath?.isCallExpression?.()) return null;
  const calleePath = candidatePath.get("callee");
  const argumentPaths = candidatePath.get("arguments");
  if (argumentPaths.length !== 1) return null;
  if (calleePath.isIdentifier({ name: "require" })) {
    return argumentPaths[0].isStringLiteral() ? argumentPaths[0].node.value : null;
  }
  const wrapperName = calleePath.isIdentifier() ? calleePath.node.name : null;
  if ([
    "__importDefault",
    "__importStar",
    "__toESM",
    "_interopRequireDefault",
    "_interopRequireWildcard"
  ].includes(wrapperName)) {
    return requireModuleName(argumentPaths[0]);
  }
  return null;
}
function objectPatternExportName(patternPath, localName) {
  for (const propertyPath of patternPath.get("properties")) {
    if (!propertyPath.isObjectProperty()) continue;
    const valuePath = propertyPath.get("value");
    const localIdentifier = valuePath.isAssignmentPattern() ? valuePath.get("left") : valuePath;
    if (!localIdentifier.isIdentifier({ name: localName })) continue;
    const keyPath = propertyPath.get("key");
    if (!propertyPath.node.computed && keyPath.isIdentifier()) return keyPath.node.name;
    if (keyPath.isStringLiteral()) return keyPath.node.value;
  }
  return null;
}
function resolveAnimatedBinding(binding, localName, seenBindings = /* @__PURE__ */ new Set()) {
  if (!binding || seenBindings.has(binding)) return null;
  seenBindings.add(binding);
  const bindingPath = binding.path;
  if (bindingPath.isImportSpecifier() && isAnimatedImport(bindingPath)) {
    return {
      exportName: importedName(bindingPath) ?? localName,
      kind: "direct"
    };
  }
  if ((bindingPath.isImportNamespaceSpecifier() || bindingPath.isImportDefaultSpecifier()) && isAnimatedImport(bindingPath)) {
    return { kind: "namespace" };
  }
  if (!bindingPath.isVariableDeclarator()) return null;
  const idPath = bindingPath.get("id");
  const initializerPath = unwrapExpressionPath(bindingPath.get("init"));
  if (!initializerPath?.node) return null;
  if (idPath.isObjectPattern()) {
    const exportName = objectPatternExportName(idPath, localName);
    if (!exportName) return null;
    const initializerModule = requireModuleName(initializerPath);
    if (isSpotifyPlusAnimatedModule(initializerModule)) return { exportName, kind: "direct" };
    if (initializerPath.isIdentifier()) {
      const sourceBinding = initializerPath.scope.getBinding(initializerPath.node.name);
      const source = resolveAnimatedBinding(sourceBinding, initializerPath.node.name, seenBindings);
      if (source?.kind === "namespace") return { exportName, kind: "direct" };
    }
    return null;
  }
  if (!idPath.isIdentifier({ name: localName })) return null;
  if (isSpotifyPlusAnimatedModule(requireModuleName(initializerPath))) return { kind: "namespace" };
  if (initializerPath.isIdentifier()) {
    const sourceBinding = initializerPath.scope.getBinding(initializerPath.node.name);
    return resolveAnimatedBinding(sourceBinding, initializerPath.node.name, seenBindings);
  }
  if (initializerPath.isMemberExpression() || initializerPath.isOptionalMemberExpression()) {
    const exportName = staticMemberName(initializerPath);
    const objectPath = unwrapExpressionPath(initializerPath.get("object"));
    if (!exportName || !objectPath.isIdentifier()) return null;
    const sourceBinding = objectPath.scope.getBinding(objectPath.node.name);
    const source = resolveAnimatedBinding(sourceBinding, objectPath.node.name, seenBindings);
    if (source?.kind === "namespace") return { exportName, kind: "direct" };
  }
  return null;
}
function resolveAnimatedReference(referencePath) {
  const binding = referencePath.scope.getBinding(referencePath.node.name);
  const resolved = resolveAnimatedBinding(binding, referencePath.node.name);
  if (!resolved) return null;
  if (resolved.kind === "direct") return resolved;
  const parentPath = referencePath.parentPath;
  if ((parentPath?.isMemberExpression() || parentPath?.isOptionalMemberExpression()) && parentPath.get("object") === referencePath) {
    const exportName = staticMemberName(parentPath);
    if (exportName) return {
      exportName,
      kind: "namespace"
    };
  }
  throw referencePath.buildCodeFrameError(
    `Animated namespace '${referencePath.node.name}' must use a static member inside a worklet. Use a named import for dynamic access.`
  );
}
function getDeclaredWorkletName(functionPath, types, state) {
  if (functionPath.node.id?.name) return functionPath.node.id.name;
  const parentPath = functionPath.parentPath;
  if (parentPath?.isVariableDeclarator() && parentPath.get("id").isIdentifier()) {
    return parentPath.node.id.name;
  }
  if (parentPath?.isAssignmentExpression() && parentPath.get("left").isIdentifier()) {
    return parentPath.node.left.name;
  }
  if (parentPath?.isObjectProperty() && !parentPath.node.computed) {
    const key = parentPath.node.key;
    if (types.isIdentifier(key)) return key.name;
    if (types.isStringLiteral(key)) return types.toIdentifier(key.value);
  }
  if (functionPath.isObjectMethod() && !functionPath.node.computed) {
    const key = functionPath.node.key;
    if (types.isIdentifier(key)) return key.name;
    if (types.isStringLiteral(key)) return types.toIdentifier(key.value);
  }
  const start = functionPath.node.loc?.start;
  const line = start?.line ?? 0;
  const column = (start?.column ?? 0) + 1;
  const index = state.spotifyPlusWorkletIndex++;
  return `worklet_${line}_${column}_${index}`;
}
function collectClosureCaptures(functionPath, workletName, globals) {
  const captures = /* @__PURE__ */ new Map();
  const ownBinding = functionPath.scope.getBinding(workletName);
  functionPath.traverse({
    ReferencedIdentifier(referencePath) {
      if (isTypeOnlyReference(referencePath)) return;
      const name = referencePath.node.name;
      if (globals.has(name)) return;
      const binding = referencePath.scope.getBinding(name);
      if (binding && isPathInside(binding.path, functionPath)) return;
      if (name === workletName && binding && binding === ownBinding) return;
      if (name === workletName && binding && functionPath.parentPath?.isVariableDeclarator() && binding.path === functionPath.parentPath) {
        return;
      }
      const animatedReference = resolveAnimatedReference(referencePath);
      const existing = captures.get(name);
      if (animatedReference?.kind === "direct") {
        captures.set(name, {
          global: animatedReference.exportName,
          name
        });
        return;
      }
      if (animatedReference?.kind === "namespace") {
        const namespace = existing?.namespace ?? /* @__PURE__ */ new Map();
        namespace.set(animatedReference.exportName, animatedReference.exportName);
        captures.set(name, {
          name,
          namespace
        });
        return;
      }
      if (!existing) captures.set(name, { name });
    }
  });
  return [...captures.values()].sort((left, right) => left.name.localeCompare(right.name));
}
function createFunctionExpression(functionPath, types, workletName, includeClosure, closureNames) {
  const sourceNode = functionPath.node;
  let body;
  if (types.isBlockStatement(sourceNode.body)) {
    body = types.cloneNode(sourceNode.body, true);
  } else {
    body = types.blockStatement([
      types.returnStatement(types.cloneNode(sourceNode.body, true))
    ]);
  }
  removeWorkletDirective({ body });
  if (includeClosure && closureNames.length > 0) {
    const properties = closureNames.map((name) => types.objectProperty(
      types.identifier(name),
      types.identifier(name),
      false,
      true
    ));
    const closureDeclaration = types.variableDeclaration("const", [
      types.variableDeclarator(
        types.objectPattern(properties),
        types.memberExpression(types.thisExpression(), types.identifier("__closure"))
      )
    ]);
    body.body.unshift(closureDeclaration);
  }
  const functionExpression = types.functionExpression(
    types.identifier(types.toIdentifier(workletName)),
    sourceNode.params.map((parameter) => types.cloneNode(parameter, true)),
    body,
    sourceNode.generator === true,
    sourceNode.async === true
  );
  functionExpression.returnType = sourceNode.returnType ? types.cloneNode(sourceNode.returnType, true) : null;
  functionExpression.typeParameters = sourceNode.typeParameters ? types.cloneNode(sourceNode.typeParameters, true) : null;
  return functionExpression;
}
function stripTypesFromFunction(functionNode, types, filename, sourceCode) {
  const holderName = "__spotifyPlusWorkletFunction";
  const holder = types.variableDeclaration("const", [
    types.variableDeclarator(types.identifier(holderName), functionNode)
  ]);
  const file = types.file(types.program([holder]));
  const extension = import_node_path4.default.extname(filename).toLowerCase();
  const isTSX = extension === ".tsx" || extension === ".mtsx" || extension === ".ctsx";
  const transformed = (0, import_core2.transformFromAstSync)(file, sourceCode, {
    ast: true,
    babelrc: false,
    cloneInputAst: true,
    code: false,
    configFile: false,
    filename,
    plugins: [[transformTypeScript, {
      allExtensions: true,
      allowDeclareFields: true,
      allowNamespaces: true,
      isTSX
    }]]
  });
  const declaration = transformed?.ast?.program?.body?.[0];
  const result = declaration?.declarations?.[0]?.init;
  if (!result) throw new Error(`Could not strip TypeScript syntax from worklet in ${filename}`);
  return result;
}
function normalizeLocation(filename, rootDir, functionPath) {
  const absoluteFilename = import_node_path4.default.resolve(filename);
  const absoluteRoot = import_node_path4.default.resolve(rootDir ?? process.cwd());
  let relative = import_node_path4.default.relative(absoluteRoot, absoluteFilename);
  if (!relative || relative.startsWith(`..${import_node_path4.default.sep}`) || import_node_path4.default.isAbsolute(relative)) {
    relative = import_node_path4.default.basename(absoluteFilename);
  }
  const start = functionPath.node.loc?.start;
  const suffix = start ? `:${start.line}:${start.column + 1}` : "";
  return `${relative.split(import_node_path4.default.sep).join("/")}${suffix}`;
}
function createWorkletSource(functionPath, types, workletName, closureNames, state) {
  let hasJSX = false;
  functionPath.traverse({
    JSXElement(jsxPath) {
      hasJSX = true;
      jsxPath.stop();
    },
    JSXFragment(jsxPath) {
      hasJSX = true;
      jsxPath.stop();
    }
  });
  if (hasJSX) {
    throw functionPath.buildCodeFrameError("SpotifyPlus worklets cannot contain JSX. Move React rendering outside the worklet.");
  }
  const filename = state.file.opts.filename ?? "unknown.js";
  const sourceCode = state.file.code ?? "";
  const rawFunction = createFunctionExpression(functionPath, types, workletName, true, closureNames);
  const javascriptFunction = stripTypesFromFunction(rawFunction, types, filename, sourceCode);
  const relativeSource = normalizeLocation(filename, state.opts.rootDir, functionPath).replace(/:\d+:\d+$/, "");
  const generated = generate(javascriptFunction, {
    comments: false,
    sourceFileName: relativeSource,
    sourceMaps: true
  }, sourceCode);
  const code = generated.code;
  const hash = import_node_crypto.default.createHash("sha256").update(code).digest("hex");
  const location = normalizeLocation(filename, state.opts.rootDir, functionPath);
  const sourceMap = generated.map ? JSON.stringify(generated.map) : void 0;
  return {
    code,
    hash,
    location,
    sourceMap
  };
}
function globalsForCaptures(captures) {
  const globals = /* @__PURE__ */ new Map();
  for (const capture of captures) {
    if (capture.global) globals.set(capture.name, capture.global);
    for (const [propertyName, exportName] of capture.namespace ?? []) {
      globals.set(`${capture.name}.${propertyName}`, exportName);
    }
  }
  return globals;
}
function createGlobalsObject(types, globals) {
  return types.objectExpression([...globals].map(([localName, exportName]) => types.objectProperty(
    types.stringLiteral(localName),
    types.stringLiteral(exportName)
  )));
}
function createWorkletGlobalMarker(types, exportName) {
  return types.objectExpression([
    types.objectProperty(types.identifier("__spotifyPlusShareable"), types.stringLiteral("workletGlobal")),
    types.objectProperty(types.identifier("module"), types.stringLiteral(SPOTIFYPLUS_ANIMATED_MODULE)),
    types.objectProperty(types.identifier("name"), types.stringLiteral(exportName))
  ]);
}
function createCaptureValue(types, capture) {
  if (capture.global) return createWorkletGlobalMarker(types, capture.global);
  if (capture.namespace) {
    return types.objectExpression([...capture.namespace].map(([propertyName, exportName]) => types.objectProperty(
      types.isValidIdentifier(propertyName) ? types.identifier(propertyName) : types.stringLiteral(propertyName),
      createWorkletGlobalMarker(types, exportName)
    )));
  }
  return types.identifier(capture.name);
}
function createDataObject(types, source, globals) {
  const properties = [
    types.objectProperty(types.identifier("code"), types.stringLiteral(source.code)),
    types.objectProperty(types.identifier("location"), types.stringLiteral(source.location))
  ];
  if (source.sourceMap) {
    properties.push(types.objectProperty(types.identifier("sourceMap"), types.stringLiteral(source.sourceMap)));
  }
  if (globals.size > 0) {
    properties.push(types.objectProperty(types.identifier("globals"), createGlobalsObject(types, globals)));
  }
  return types.objectExpression(properties);
}
function createAttachmentStatements(types, scope, target, captures, source) {
  const closureIdentifier = scope.generateUidIdentifier("spotifyPlusClosure");
  const initDataIdentifier = scope.generateUidIdentifier("spotifyPlusInitData");
  const globals = globalsForCaptures(captures);
  const closureProperties = captures.map((capture) => types.objectProperty(
    types.identifier(capture.name),
    createCaptureValue(types, capture)
  ));
  const statements = [
    types.variableDeclaration("const", [
      types.variableDeclarator(closureIdentifier, types.objectExpression(closureProperties))
    ]),
    types.variableDeclaration("const", [
      types.variableDeclarator(initDataIdentifier, createDataObject(types, source, globals))
    ]),
    types.expressionStatement(types.assignmentExpression(
      "=",
      types.memberExpression(types.cloneNode(target), types.identifier("__spotifyPlusWorklet")),
      types.objectExpression([
        types.objectProperty(types.identifier("version"), types.numericLiteral(SPOTIFYPLUS_WORKLET_VERSION)),
        types.objectProperty(types.identifier("hash"), types.stringLiteral(source.hash)),
        types.objectProperty(types.identifier("code"), types.stringLiteral(source.code)),
        types.objectProperty(types.identifier("closure"), types.cloneNode(closureIdentifier)),
        types.objectProperty(types.identifier("location"), types.stringLiteral(source.location)),
        ...source.sourceMap ? [types.objectProperty(types.identifier("sourceMap"), types.stringLiteral(source.sourceMap))] : [],
        ...globals.size > 0 ? [types.objectProperty(types.identifier("globals"), createGlobalsObject(types, globals))] : []
      ])
    )),
    types.expressionStatement(types.assignmentExpression(
      "=",
      types.memberExpression(types.cloneNode(target), types.identifier("__workletHash")),
      types.stringLiteral(source.hash)
    )),
    types.expressionStatement(types.assignmentExpression(
      "=",
      types.memberExpression(types.cloneNode(target), types.identifier("__closure")),
      types.cloneNode(closureIdentifier)
    )),
    types.expressionStatement(types.assignmentExpression(
      "=",
      types.memberExpression(types.cloneNode(target), types.identifier("__initData")),
      types.cloneNode(initDataIdentifier)
    ))
  ];
  return statements;
}
function createFactoryCall(functionPath, types, workletName, captures, source) {
  const workletIdentifier = functionPath.scope.generateUidIdentifier("spotifyPlusWorklet");
  const originalFunction = createFunctionExpression(functionPath, types, workletName, false, []);
  const body = [
    types.variableDeclaration("const", [
      types.variableDeclarator(workletIdentifier, originalFunction)
    ]),
    ...createAttachmentStatements(types, functionPath.scope, workletIdentifier, captures, source),
    types.returnStatement(types.cloneNode(workletIdentifier))
  ];
  return types.callExpression(types.arrowFunctionExpression([], types.blockStatement(body)), []);
}
function attachToFunctionDeclaration(functionPath, types, captures, source) {
  const identifier = functionPath.node.id;
  if (!identifier) return false;
  const statements = createAttachmentStatements(types, functionPath.scope, identifier, captures, source);
  const parentPath = functionPath.parentPath;
  const insertionPath = parentPath?.isExportNamedDeclaration() || parentPath?.isExportDefaultDeclaration() ? parentPath : functionPath;
  insertionPath.insertAfter(statements);
  return true;
}
function processWorklet(functionPath, state, types) {
  if (state.spotifyPlusProcessedWorklets.has(functionPath.node)) return;
  if (!functionPath.node.body) return;
  if (functionPath.isClassMethod?.() || functionPath.isClassPrivateMethod?.()) {
    throw functionPath.buildCodeFrameError("SpotifyPlus worklets do not support class methods. Use a function declaration or arrow function.");
  }
  const workletName = getDeclaredWorkletName(functionPath, types, state);
  const globals = /* @__PURE__ */ new Set([
    ...DEFAULT_WORKLET_GLOBALS,
    ...state.opts.globals ?? []
  ]);
  const captures = collectClosureCaptures(functionPath, workletName, globals);
  const closureNames = captures.map((capture) => capture.name);
  const source = createWorkletSource(functionPath, types, workletName, closureNames, state);
  state.spotifyPlusProcessedWorklets.add(functionPath.node);
  removeWorkletDirective(functionPath.node);
  if (functionPath.isFunctionDeclaration() && attachToFunctionDeclaration(functionPath, types, captures, source)) {
    state.opts.onWorklet?.({
      closureNames,
      globals: Object.fromEntries(globalsForCaptures(captures)),
      ...source
    });
    return;
  }
  const factoryCall = createFactoryCall(functionPath, types, workletName, captures, source);
  if (functionPath.isObjectMethod()) {
    functionPath.replaceWith(types.objectProperty(
      types.cloneNode(functionPath.node.key, true),
      factoryCall,
      functionPath.node.computed === true,
      false
    ));
  } else {
    functionPath.replaceWith(factoryCall);
  }
  functionPath.skip();
  state.opts.onWorklet?.({
    closureNames,
    globals: Object.fromEntries(globalsForCaptures(captures)),
    ...source
  });
}
function spotifyPlusWorkletsBabelPlugin({ types }) {
  return {
    name: "spotifyplus-worklets",
    pre() {
      this.spotifyPlusAutoWorklets = /* @__PURE__ */ new WeakSet();
      this.spotifyPlusProcessedWorklets = /* @__PURE__ */ new WeakSet();
      this.spotifyPlusWorkletIndex = 0;
    },
    visitor: {
      Program: {
        enter(programPath, state) {
          markAutomaticWorklets(programPath, state);
        }
      },
      Function: {
        exit(functionPath, state) {
          if (hasWorkletDirective(functionPath) || state.spotifyPlusAutoWorklets.has(functionPath.node)) {
            processWorklet(functionPath, state, types);
          }
        }
      }
    }
  };
}
function parserPluginsFor(filename) {
  const extension = import_node_path4.default.extname(filename).toLowerCase();
  const plugins = [];
  if ([".ts", ".tsx", ".mts", ".cts", ".mtsx", ".ctsx"].includes(extension)) {
    plugins.push("typescript");
  }
  if ([".jsx", ".tsx", ".mtsx", ".ctsx"].includes(extension)) plugins.push("jsx");
  plugins.push("decorators-legacy");
  return plugins;
}
async function transformWorklets(source, options = {}) {
  const filename = import_node_path4.default.resolve(options.filename ?? "worklet.js");
  const extension = import_node_path4.default.extname(filename).toLowerCase();
  const isTypeScript = [".ts", ".tsx", ".mts", ".cts", ".mtsx", ".ctsx"].includes(extension);
  const isTSX = [".tsx", ".mtsx", ".ctsx"].includes(extension);
  let workletCount = 0;
  const worklets = [];
  const result = await (0, import_core2.transformAsync)(source, {
    ast: false,
    babelrc: false,
    code: true,
    configFile: false,
    filename,
    parserOpts: {
      plugins: parserPluginsFor(filename),
      sourceType: "unambiguous"
    },
    plugins: [
      [spotifyPlusWorkletsBabelPlugin, {
        globals: options.globals ?? [],
        onWorklet(worklet) {
          workletCount++;
          worklets.push(worklet);
          options.onWorklet?.(worklet);
        },
        rootDir: options.rootDir ?? import_node_path4.default.dirname(filename)
      }],
      ...isTypeScript ? [[transformTypeScript, {
        allExtensions: true,
        allowDeclareFields: true,
        allowNamespaces: true,
        isTSX
      }]] : []
    ],
    sourceFileName: import_node_path4.default.basename(filename),
    sourceMaps: true
  });
  if (typeof result?.code !== "string") throw new Error(`Babel did not produce output for ${filename}`);
  let code = result.code;
  if (options.inlineSourceMap !== false && result.map) {
    const encodedMap = Buffer.from(JSON.stringify(result.map), "utf8").toString("base64");
    code += `
//# sourceMappingURL=data:application/json;charset=utf-8;base64,${encodedMap}`;
  }
  return {
    code,
    map: result.map ?? null,
    workletCount,
    worklets
  };
}
function loaderForFile(filename) {
  const extension = import_node_path4.default.extname(filename).toLowerCase();
  if ([".ts", ".mts", ".cts"].includes(extension)) return "ts";
  if ([".tsx", ".mtsx", ".ctsx"].includes(extension)) return "tsx";
  if (extension === ".jsx") return "jsx";
  return "js";
}
function isTransformableSource(filename, rootDir, transformDependencies) {
  const relative = import_node_path4.default.relative(rootDir, filename);
  if (relative.startsWith(`..${import_node_path4.default.sep}`) || import_node_path4.default.isAbsolute(relative)) return false;
  if (!transformDependencies && relative.split(import_node_path4.default.sep).includes("node_modules")) return false;
  return true;
}
function spotifyPlusWorkletsPlugin(options = {}) {
  const rootDir = import_node_path4.default.resolve(options.rootDir ?? process.cwd());
  return {
    name: "spotifyplus-worklets",
    setup(build2) {
      build2.onLoad({ filter: /\.[cm]?[jt]sx?$/ }, async (args) => {
        if (!isTransformableSource(args.path, rootDir, options.transformDependencies === true)) return null;
        const source = await import_promises2.default.readFile(args.path, "utf8");
        const transformed = await transformWorklets(source, {
          filename: args.path,
          globals: options.globals,
          inlineSourceMap: true,
          rootDir
        });
        return {
          contents: transformed.code,
          loader: loaderForFile(args.path),
          resolveDir: import_node_path4.default.dirname(args.path),
          watchFiles: [args.path]
        };
      });
    }
  };
}

// tools/extension-build.mjs
var SOURCE_CANDIDATES = [
  "src/index.tsx",
  "src/index.ts",
  "src/index.jsx",
  "src/index.js",
  "index.tsx",
  "index.ts",
  "index.jsx",
  "index.js"
];
var DEFAULT_EXTERNALS = [
  "react",
  "react/*",
  "spotifyplus",
  "spotifyplus/*"
];
var BLOCKED_USER_NODE_MODULES = /* @__PURE__ */ new Set([
  "child_process",
  "cluster",
  "dgram",
  "fs",
  "fs/promises",
  "inspector",
  "module",
  "net",
  "process",
  "repl",
  "tls",
  "vm",
  "worker_threads"
]);
function userModulePermissionsPlugin() {
  return {
    name: "spotifyplus-user-module-permissions",
    setup(buildContext) {
      buildContext.onResolve({ filter: /.*/ }, (args) => {
        const normalized = args.path.startsWith("node:") ? args.path.slice(5) : args.path;
        if (!BLOCKED_USER_NODE_MODULES.has(normalized)) return null;
        return {
          errors: [{
            text: `User extensions cannot import privileged Node module '${args.path}'. Use SpotifyPlus APIs or injected platform globals instead.`
          }]
        };
      });
    }
  };
}
async function isFile(filePath) {
  try {
    return (await import_promises3.default.stat(filePath)).isFile();
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}
function resolveFromScriptDir(scriptDir, candidate) {
  return import_node_path5.default.isAbsolute(candidate) ? import_node_path5.default.normalize(candidate) : import_node_path5.default.resolve(scriptDir, candidate);
}
function manifestApi(manifest) {
  const api = manifest.api ?? 1;
  if (!Number.isInteger(api) || api < 1) throw new Error("manifest.api must be a positive integer when provided");
  return api;
}
function normalizeAssetPath(value, fieldName) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} must be a non-empty string`);
  }
  if (import_node_path5.default.isAbsolute(value) || /^[a-zA-Z]:/.test(value)) {
    throw new Error(`${fieldName} must be relative to the extension directory`);
  }
  const normalized = value.trim().replaceAll("\\", "/").replace(/^\.\//, "");
  const segments = normalized.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) {
    throw new Error(`${fieldName} cannot escape the extension directory`);
  }
  return normalized;
}
function assetPatternRegExp(pattern) {
  let expression = "";
  for (let index = 0; index < pattern.length; index += 1) {
    const character = pattern[index];
    if (character === "*" && pattern[index + 1] === "*") {
      const followedBySlash = pattern[index + 2] === "/";
      expression += followedBySlash ? "(?:.*/)?" : ".*";
      index += followedBySlash ? 2 : 1;
      continue;
    }
    if (character === "*") {
      expression += "[^/]*";
      continue;
    }
    if (character === "?") {
      expression += "[^/]";
      continue;
    }
    expression += /[.+^${}()|[\]\\]/.test(character) ? `\\${character}` : character;
  }
  return new RegExp(`^${expression}$`);
}
async function collectFiles(directory, root = directory) {
  const files = [];
  for (const entry of await import_promises3.default.readdir(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const absolutePath = import_node_path5.default.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error(`Extension assets cannot be symbolic links: ${absolutePath}`);
    }
    if (entry.isDirectory()) files.push(...await collectFiles(absolutePath, root));
    else if (entry.isFile()) files.push({
      absolutePath,
      relativePath: import_node_path5.default.relative(root, absolutePath).replaceAll(import_node_path5.default.sep, "/")
    });
  }
  return files;
}
async function collectPatternFiles(scriptDir, patterns) {
  const candidates = /* @__PURE__ */ new Map();
  for (const item of patterns) {
    const segments = item.pattern.split("/");
    const literalSegments = [];
    for (const segment of segments) {
      if (/[*?]/.test(segment)) break;
      literalSegments.push(segment);
    }
    const searchPath = literalSegments.length > 0 ? import_node_path5.default.join(scriptDir, ...literalSegments) : scriptDir;
    let stat;
    try {
      stat = await import_promises3.default.stat(searchPath);
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      throw error;
    }
    if (stat.isFile()) {
      candidates.set(searchPath, {
        absolutePath: searchPath,
        relativePath: import_node_path5.default.relative(scriptDir, searchPath).replaceAll(import_node_path5.default.sep, "/")
      });
      continue;
    }
    if (!stat.isDirectory()) continue;
    for (const file of await collectFiles(searchPath, scriptDir)) {
      candidates.set(file.absolutePath, file);
    }
  }
  return [...candidates.values()];
}
async function resolveDeclaredAssetFiles(scriptDir, manifest) {
  if (manifest.assets === void 0) return [];
  if (!Array.isArray(manifest.assets)) throw new Error("manifest.assets must be an array of relative glob patterns");
  const patterns = manifest.assets.map((pattern, index) => ({
    pattern: normalizeAssetPath(pattern, `manifest.assets[${index}]`),
    expression: null,
    matches: 0
  }));
  for (const item of patterns) item.expression = assetPatternRegExp(item.pattern);
  const includedFiles = [];
  for (const file of await collectPatternFiles(scriptDir, patterns)) {
    let included = false;
    for (const item of patterns) {
      if (!item.expression.test(file.relativePath)) continue;
      item.matches += 1;
      included = true;
    }
    if (!included) continue;
    includedFiles.push(file);
  }
  const unmatched = patterns.filter((item) => item.matches === 0).map((item) => item.pattern);
  if (unmatched.length > 0) {
    throw new Error(`manifest.assets patterns matched no files: ${unmatched.join(", ")}`);
  }
  return includedFiles;
}
async function copyDeclaredAssets(scriptDir, outputDirectory, manifest) {
  const copied = [];
  for (const file of await resolveDeclaredAssetFiles(scriptDir, manifest)) {
    const destination = import_node_path5.default.join(outputDirectory, ...file.relativePath.split("/"));
    if (import_node_path5.default.resolve(destination) !== import_node_path5.default.resolve(file.absolutePath)) {
      await import_promises3.default.mkdir(import_node_path5.default.dirname(destination), { recursive: true });
      await import_promises3.default.copyFile(file.absolutePath, destination);
    }
    copied.push(destination);
  }
  return copied;
}
async function copyNativePackage(scriptDir, outputDirectory, manifest) {
  if (manifest.native === void 0) return null;
  if (!manifest.native || typeof manifest.native !== "object" || Array.isArray(manifest.native)) {
    throw new Error("manifest.native must be an object");
  }
  const relativePath = normalizeAssetPath(manifest.native.apk, "manifest.native.apk");
  const source = import_node_path5.default.join(scriptDir, ...relativePath.split("/"));
  if (!await isFile(source)) {
    throw new Error(`Native APK file not found: ${source}`);
  }
  const destination = import_node_path5.default.join(outputDirectory, ...relativePath.split("/"));
  if (import_node_path5.default.resolve(destination) !== import_node_path5.default.resolve(source)) {
    await import_promises3.default.mkdir(import_node_path5.default.dirname(destination), { recursive: true });
    await import_promises3.default.copyFile(source, destination);
  }
  return destination;
}
async function readDeclaredAssets(scriptDir, manifest) {
  const assets = [];
  for (const file of await resolveDeclaredAssetFiles(import_node_path5.default.resolve(scriptDir), manifest)) {
    const data = await import_promises3.default.readFile(file.absolutePath);
    assets.push({
      path: file.relativePath,
      data: data.toString("base64"),
      size: data.byteLength
    });
  }
  return assets;
}
async function readManifest(scriptDir) {
  const absoluteScriptDir = import_node_path5.default.resolve(scriptDir);
  const manifestPath = import_node_path5.default.join(absoluteScriptDir, "manifest.json");
  let manifest;
  try {
    manifest = JSON.parse(await import_promises3.default.readFile(manifestPath, "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error(`${manifestPath} is not valid JSON: ${error.message}`);
    if (error?.code === "ENOENT") throw new Error(`Missing extension manifest: ${manifestPath}`);
    throw error;
  }
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new Error(`${manifestPath} must contain a JSON object`);
  }
  if (typeof manifest.id !== "string" || manifest.id.trim().length === 0) {
    throw new Error("manifest.id must be a non-empty string");
  }
  if (typeof manifest.main !== "string" || manifest.main.trim().length === 0) {
    throw new Error("manifest.main must be a non-empty string");
  }
  manifestApi(manifest);
  if (manifest.assets !== void 0 && !Array.isArray(manifest.assets)) {
    throw new Error("manifest.assets must be an array of relative glob patterns");
  }
  return manifest;
}
async function resolveExtensionEntry(scriptDir, manifest, explicitEntry) {
  const absoluteScriptDir = import_node_path5.default.resolve(scriptDir);
  const candidates = [];
  if (explicitEntry) candidates.push(explicitEntry);
  else {
    if (typeof manifest.source === "string" && manifest.source.trim()) candidates.push(manifest.source);
    candidates.push(...SOURCE_CANDIDATES, manifest.main);
  }
  for (const candidate of [...new Set(candidates)]) {
    const candidatePath = resolveFromScriptDir(absoluteScriptDir, candidate);
    if (await isFile(candidatePath)) return candidatePath;
  }
  if (explicitEntry) {
    throw new Error(`Extension entry does not exist: ${resolveFromScriptDir(absoluteScriptDir, explicitEntry)}`);
  }
  throw new Error(
    `Could not find an extension entry in ${absoluteScriptDir}. Add src/index.tsx, set manifest.source, or pass --entry.`
  );
}
function resolveExtensionOutput(scriptDir, manifest, explicitOutfile) {
  return resolveFromScriptDir(import_node_path5.default.resolve(scriptDir), explicitOutfile ?? manifest.main);
}
async function bundleExtension(options = {}) {
  const scriptDir = import_node_path5.default.resolve(options.scriptDir ?? process.cwd());
  const manifest = options.manifest ?? await readManifest(scriptDir);
  const api = manifestApi(manifest);
  const entryPath = await resolveExtensionEntry(scriptDir, manifest, options.entryPath);
  const write = options.write !== false;
  const outfile = resolveExtensionOutput(scriptDir, manifest, options.outfile);
  const isApi2 = api >= 2;
  const plugins = [...options.plugins ?? []];
  plugins.unshift(userModulePermissionsPlugin());
  plugins.push(spotifyPlusDependencyRegexPlugin());
  if (isApi2) {
    plugins.unshift(spotifyPlusWorkletsPlugin({
      globals: options.workletGlobals,
      rootDir: scriptDir,
      transformDependencies: options.transformDependencies === true
    }));
  }
  const result = await (0, import_esbuild.build)({
    absWorkingDir: scriptDir,
    banner: isApi2 ? { js: SPOTIFYPLUS_WORKLET_BUNDLE_MARKER } : void 0,
    bundle: true,
    entryPoints: [entryPath],
    external: [
      ...DEFAULT_EXTERNALS,
      ...options.external ?? []
    ],
    format: "cjs",
    jsx: "automatic",
    logLevel: options.logLevel ?? "silent",
    minify: options.minify === true,
    outfile,
    platform: "node",
    plugins,
    sourcemap: options.sourcemap ?? false,
    target: options.target ?? "es2020",
    write
  });
  let assetOutfiles = [];
  let nativeOutfile = null;
  if (write) {
    assetOutfiles = await copyDeclaredAssets(scriptDir, import_node_path5.default.dirname(outfile), manifest);
    nativeOutfile = await copyNativePackage(scriptDir, import_node_path5.default.dirname(outfile), manifest);
  }
  const source = write ? null : result.outputFiles?.find((file) => file.path === outfile)?.text ?? result.outputFiles?.[0]?.text ?? null;
  if (!write && !source) throw new Error("esbuild did not produce an in-memory extension bundle");
  return {
    api,
    buildId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    entryPath,
    manifest,
    manifestOutfile: null,
    assetOutfiles,
    nativeOutfile,
    outfile,
    result,
    source,
    scriptDir
  };
}

// tools/create-native.mjs
var import_promises4 = __toESM(require("node:fs/promises"), 1);
var import_node_path6 = __toESM(require("node:path"), 1);
var import_node_url2 = require("node:url");
var NATIVE_SDK_URL = "https://github.com/LeNerd46/SpotifyPlus/releases/latest/download/spotifyplus-sdk.aar";
var RESERVED_WORDS = new Set("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while true false null _ as fun in is object typealias typeof val var when".split(" "));
function validateNamespace(value) {
  const parts = String(value).trim().split(".");
  return parts.length >= 2 && parts.every((part) => /^[A-Za-z][A-Za-z0-9_]*$/.test(part) && !RESERVED_WORDS.has(part)) || "Use a namespace such as com.example.myplugin, with valid Java/Kotlin identifiers.";
}
async function validateProjectDirectory(directory) {
  if (!String(directory).trim()) return "Enter a new project directory.";
  try {
    await import_promises4.default.lstat(import_node_path6.default.resolve(directory));
    return "That path already exists. Choose a new project directory.";
  } catch (error) {
    if (error.code === "ENOENT") return true;
    throw error;
  }
}
function javaSources(namespace) {
  return {
    "NativePlugin.java": `package ${namespace};

import com.lenerd.spotifyplus.sdk.SpotifyPlusPlugin;
import com.lenerd.spotifyplus.sdk.SpotifyPlusRegistry;
import com.lenerd.spotifyplus.sdk.spotify.SpotifyPlusContext;

public class NativePlugin implements SpotifyPlusPlugin {
    @Override
    public void register(SpotifyPlusRegistry registry, SpotifyPlusContext context) {
        registry.registerComponent(new ExampleComponent());
    }
}
`,
    "ExampleComponent.java": `package ${namespace};

import android.content.Context;
import com.lenerd.spotifyplus.sdk.SpotifyPlusComponent;
import com.lenerd.spotifyplus.sdk.spotify.SpotifyPlusContext;
import org.json.JSONObject;

public class ExampleComponent extends SpotifyPlusComponent<ExampleView> {
    @Override
    public String getName() {
        return "ExampleComponent";
    }

    @Override
    public ExampleView createView(Context context, SpotifyPlusContext spotifyPlusContext) {
        return new ExampleView(context);
    }

    @Override
    public void updateProps(ExampleView view, JSONObject oldProps, JSONObject newProps) {
        if (newProps.has("text")) {
            view.setText(String.valueOf(newProps.opt("text")));
        }
    }
}
`,
    "ExampleView.java": `package ${namespace};

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.widget.TextView;

@SuppressLint("AppCompatCustomView")
public class ExampleView extends TextView {
    public ExampleView(Context context) {
        super(context);
    }

    public ExampleView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public ExampleView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
    }
}
`
  };
}
function kotlinSources(namespace) {
  return {
    "NativePlugin.kt": `package ${namespace}

import com.lenerd.spotifyplus.sdk.SpotifyPlusPlugin
import com.lenerd.spotifyplus.sdk.SpotifyPlusRegistry
import com.lenerd.spotifyplus.sdk.spotify.SpotifyPlusContext

class NativePlugin : SpotifyPlusPlugin {
    override fun register(registry: SpotifyPlusRegistry, context: SpotifyPlusContext) {
        registry.registerComponent(ExampleComponent())
    }
}
`,
    "ExampleComponent.kt": `package ${namespace}

import android.content.Context
import com.lenerd.spotifyplus.sdk.SpotifyPlusComponent
import com.lenerd.spotifyplus.sdk.spotify.SpotifyPlusContext
import org.json.JSONObject

class ExampleComponent : SpotifyPlusComponent<ExampleView>() {
    override fun getName(): String = "ExampleComponent"

    override fun createView(context: Context, spotifyPlusContext: SpotifyPlusContext): ExampleView {
        return ExampleView(context)
    }

    override fun updateProps(view: ExampleView, oldProps: JSONObject, newProps: JSONObject) {
        if (newProps.has("text")) {
            view.text = newProps.opt("text")?.toString() ?: "null"
        }
    }
}
`,
    "ExampleView.kt": `package ${namespace}

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Canvas
import android.util.AttributeSet
import android.widget.TextView

@SuppressLint("AppCompatCustomView")
class ExampleView : TextView {
    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, defStyle: Int) : super(context, attrs, defStyle)

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
    }
}
`
  };
}
function projectFiles(language, namespace, projectName) {
  const kotlin = language === "kotlin";
  const files = {
    "settings.gradle.kts": `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = ${JSON.stringify(projectName).replaceAll("$", "\\$")}
include(":app")
`,
    "build.gradle.kts": `plugins {
    id("com.android.application") version "8.10.0" apply false
${kotlin ? '    id("org.jetbrains.kotlin.android") version "2.1.20" apply false\n' : ""}}
`,
    "app/build.gradle.kts": `plugins {
    id("com.android.application")
${kotlin ? '    id("org.jetbrains.kotlin.android")\n' : ""}}

android {
    namespace = "${namespace}"
    compileSdk = 35

    defaultConfig {
        applicationId = "${namespace}"
        minSdk = 30
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }
${kotlin ? '\n    kotlinOptions {\n        jvmTarget = "21"\n    }\n' : ""}}

dependencies {
    compileOnly(files("$rootDir/lib/spotifyplus-sdk.aar"))
}
`,
    "app/src/main/AndroidManifest.xml": `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application android:label="Native Plugin" android:allowBackup="false" />
</manifest>
`,
    "gradle.properties": "org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8\nandroid.useAndroidX=true\n",
    "gradle/wrapper/gradle-wrapper.properties": `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.11.1-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`,
    ".gitignore": ".gradle/\n.idea/\nlocal.properties\n**/build/\n*.iml\n",
    "README.md": `# Native SpotifyPlus plugin

This ${kotlin ? "Kotlin" : "Java"} Android project contains NativePlugin, ExampleComponent, and ExampleView. It has no activity.

Open this directory in Android Studio, use JDK 21, and install Android SDK Platform 35. Set your SDK location in local.properties (sdk.dir) or ANDROID_HOME.

Build the plugin APK:

\`\`\`sh
./gradlew :app:assembleDebug
\`\`\`

On Windows, use \`gradlew.bat :app:assembleDebug\`.
The APK is written to \`app/build/outputs/apk/debug/app-debug.apk\`.

Copy the APK into your SpotifyPlus extension and add this to its manifest.json:

\`\`\`json
"native": {
    "apk": "native.apk",
    "pluginClass": "${namespace}.NativePlugin"
}
\`\`\`

Name the copied APK \`native.apk\`, or update the manifest path to match.
The SDK in \`lib/spotifyplus-sdk.aar\` is a compile-only dependency; SpotifyPlus provides it at runtime.
`
  };
  for (const [name, source] of Object.entries(kotlin ? kotlinSources(namespace) : javaSources(namespace))) {
    files[`app/src/main/java/${namespace.replaceAll(".", "/")}/${name}`] = source;
  }
  return files;
}
async function downloadSdk(fetchImpl) {
  try {
    const response = await fetchImpl(NATIVE_SDK_URL, { signal: AbortSignal.timeout(3e4) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 4 || !bytes.subarray(0, 4).equals(Buffer.from([80, 75, 3, 4]))) {
      throw new Error("The response is not an AAR/ZIP archive");
    }
    return bytes;
  } catch (error) {
    throw new Error(`Could not download the SpotifyPlus SDK from ${NATIVE_SDK_URL}: ${error.message}`);
  }
}
async function createNativeProject({ projectDir, language, namespace }, { fetchImpl = globalThis.fetch } = {}) {
  if (!["java", "kotlin"].includes(language)) throw new Error("Choose Java or Kotlin.");
  namespace = String(namespace).trim();
  const validation = validateNamespace(namespace);
  if (validation !== true) throw new Error(validation);
  if (!projectDir) throw new Error("Enter a new project directory.");
  projectDir = import_node_path6.default.resolve(projectDir);
  const directoryValidation = await validateProjectDirectory(projectDir);
  if (directoryValidation !== true) throw new Error(directoryValidation);
  const templateDir = import_node_path6.default.join(
    typeof __dirname === "string" ? __dirname : import_node_path6.default.dirname((0, import_node_url2.fileURLToPath)(void 0)),
    "native-template"
  );
  const files = projectFiles(language, namespace, import_node_path6.default.basename(projectDir));
  for (const name of ["gradlew", "gradlew.bat", "gradle/wrapper/gradle-wrapper.jar"]) {
    files[name] = await import_promises4.default.readFile(import_node_path6.default.join(templateDir, name));
  }
  files["lib/spotifyplus-sdk.aar"] = await downloadSdk(fetchImpl);
  const parentDir = import_node_path6.default.dirname(projectDir);
  await import_promises4.default.mkdir(parentDir, { recursive: true });
  const stagingDir = await import_promises4.default.mkdtemp(import_node_path6.default.join(parentDir, ".spotifyplus-native-"));
  try {
    for (const [name, contents] of Object.entries(files)) {
      const destination = import_node_path6.default.join(stagingDir, name);
      await import_promises4.default.mkdir(import_node_path6.default.dirname(destination), { recursive: true });
      await import_promises4.default.writeFile(destination, contents);
    }
    await import_promises4.default.chmod(import_node_path6.default.join(stagingDir, "gradlew"), 493);
    const finalValidation = await validateProjectDirectory(projectDir);
    if (finalValidation !== true) throw new Error(finalValidation);
    await import_promises4.default.rename(stagingDir, projectDir);
  } finally {
    await import_promises4.default.rm(stagingDir, { recursive: true, force: true });
  }
  return projectDir;
}
async function runCreateNative(options, { prompt, fetchImpl, log = console.log } = {}) {
  if (!prompt) {
    const { default: inquirer } = await import("inquirer");
    prompt = (questions) => inquirer.prompt(questions);
  }
  const answers = await prompt([
    {
      type: "list",
      name: "language",
      message: "Which language would you like to use?",
      choices: [{ name: "Java", value: "java" }, { name: "Kotlin", value: "kotlin" }]
    },
    {
      type: "input",
      name: "namespace",
      message: "What should the Android namespace be?",
      default: "com.example.myplugin",
      filter: (value) => value.trim(),
      validate: validateNamespace
    },
    ...options.projectDir ? [] : [{
      type: "input",
      name: "projectDir",
      message: "Where should the project be created?",
      default: "native",
      filter: (value) => value.trim(),
      validate: validateProjectDirectory
    }]
  ]);
  log("[spotifyplus] downloading the native SDK and creating the project...");
  const projectDir = await createNativeProject({
    ...answers,
    projectDir: options.projectDir ?? answers.projectDir
  }, { fetchImpl });
  log(`[spotifyplus] created ${answers.language} native plugin in ${projectDir}`);
  log(`[spotifyplus] open it in Android Studio with JDK 21, or run ${process.platform === "win32" ? "gradlew.bat" : "./gradlew"} :app:assembleDebug from that directory`);
  return projectDir;
}

// tools/dev-cli.mjs
var execFile = (0, import_node_util.promisify)(import_node_child_process.execFile);
var RUNTIME_PORT = 37846;
var WATCH_EXTENSIONS = /* @__PURE__ */ new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".ttf",
  ".otf",
  ".ttc",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".bmp",
  ".svg",
  ".txt",
  ".xml",
  ".mp3",
  ".ogg",
  ".wav",
  ".m4a",
  ".mp4",
  ".webm"
]);
var IGNORED_DIRECTORIES = /* @__PURE__ */ new Set(["node_modules", ".git", "dist", "build", ".gradle"]);
function shouldColorizeOutput() {
  if (Object.hasOwn(process.env, "FORCE_COLOR")) return process.env.FORCE_COLOR !== "0";
  if (Object.hasOwn(process.env, "NO_COLOR")) return false;
  return process.stdout.isTTY === true || process.stderr.isTTY === true;
}
function printHelp() {
  console.log(`Usage:
  spotifyplus dev [extensionDir] [options]
  spotifyplus build [extensionDir] [options]
  spotifyplus create-native [projectDir]

Create native:
  Prompts for Java or Kotlin, an Android namespace, and a new project directory.
  Downloads the SpotifyPlus SDK and creates an Android plugin project.

Build options:
  --entry <path>          source entry, relative to the extension directory
  --outfile <path>        output bundle, relative to the extension directory
  --minify                minify the output bundle
  --sourcemap             write an external source map

Dev options:
  --adb <path>            adb executable to use (default: adb)
  --device <serial>       adb device serial
  --port <port>           forwarded hot reload port (default: ${DEFAULT_DEV_PORT})
  --debounce-ms <ms>      file change debounce (default: 150)

All commands:
  --help, -h              show this help
`);
}
async function adb(options, args) {
  const fullArgs = [];
  if (options.device) fullArgs.push("-s", options.device);
  fullArgs.push(...args);
  try {
    return await execFile(options.adb, fullArgs, { windowsHide: true });
  } catch (error) {
    const stderr = error?.stderr ? String(error.stderr).trim() : "";
    const stdout = error?.stdout ? String(error.stdout).trim() : "";
    const details = stderr || stdout || error?.message || "adb command failed";
    throw new Error(`${options.adb} ${fullArgs.join(" ")} failed: ${details}`);
  }
}
async function postHotReloadBundle(port, buildInfo) {
  const assets = await readDeclaredAssets(buildInfo.scriptDir, buildInfo.manifest);
  const body = JSON.stringify({
    buildId: buildInfo.buildId,
    manifest: buildInfo.manifest,
    source: buildInfo.source,
    assets
  });
  return new Promise((resolve, reject) => {
    const request = import_node_http.default.request({
      headers: {
        "content-length": Buffer.byteLength(body),
        "content-type": "application/json; charset=utf-8"
      },
      host: "127.0.0.1",
      method: "POST",
      path: "/hot-reload",
      port
    }, (response) => {
      response.setEncoding("utf8");
      let responseBody = "";
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        const status = response.statusCode ?? 0;
        if (status >= 200 && status < 300) {
          resolve(responseBody);
          return;
        }
        let responsePayload = null;
        try {
          responsePayload = JSON.parse(responseBody);
        } catch {
        }
        const error = new Error(
          responsePayload?.error ? `SpotifyPlus runtime returned HTTP ${status}: ${responsePayload.error}` : `SpotifyPlus runtime returned HTTP ${status}: ${responseBody}`
        );
        error.runtimeStack = responsePayload?.stack;
        reject(error);
      });
    });
    request.on("error", (error) => {
      const connectionError = new Error(
        `Could not reach SpotifyPlus runtime on forwarded port ${port}. Open Spotify and wait for the script runtime to start, then try again. ${error.message}`
      );
      connectionError.runtimeUnavailable = true;
      reject(connectionError);
    });
    request.setTimeout(5e3, () => {
      request.destroy(new Error(`Timed out connecting to SpotifyPlus runtime on forwarded port ${port}`));
    });
    request.end(body);
  });
}
function startDevLogStream(port, onEntry) {
  let stopped = false;
  let activeRequest = null;
  let reconnectHandle = null;
  let unsupportedWarningShown = false;
  const scheduleReconnect = () => {
    if (stopped || reconnectHandle) return;
    reconnectHandle = setTimeout(() => {
      reconnectHandle = null;
      connect();
    }, 500);
  };
  const connect = () => {
    if (stopped) return;
    let reconnectScheduled = false;
    const reconnect = () => {
      if (reconnectScheduled) return;
      reconnectScheduled = true;
      scheduleReconnect();
    };
    const request = import_node_http.default.request({
      headers: {
        accept: "text/event-stream"
      },
      host: "127.0.0.1",
      method: "GET",
      path: "/dev-logs",
      port
    }, (response) => {
      if (response.statusCode !== 200) {
        response.resume();
        if (!unsupportedWarningShown) {
          unsupportedWarningShown = true;
          console.warn(
            `[spotifyplus] runtime log streaming is unavailable (HTTP ${response.statusCode ?? 0}); install the current debug build to mirror console output`
          );
        }
        reconnect();
        return;
      }
      unsupportedWarningShown = false;
      response.setEncoding("utf8");
      let buffer = "";
      response.on("data", (chunk) => {
        buffer += chunk;
        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() ?? "";
        for (const event of events) {
          const data = event.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n");
          if (!data) continue;
          try {
            onEntry(JSON.parse(data));
          } catch (error) {
            console.warn(`[spotifyplus] ignored malformed runtime log entry: ${error.message}`);
          }
        }
      });
      response.on("end", reconnect);
      response.on("error", reconnect);
    });
    activeRequest = request;
    request.on("error", reconnect);
    request.end();
  };
  connect();
  return () => {
    stopped = true;
    clearTimeout(reconnectHandle);
    activeRequest?.destroy();
  };
}
async function notifyDevice(options, buildInfo) {
  await adb(options, ["forward", `tcp:${options.port}`, `tcp:${RUNTIME_PORT}`]);
  await postHotReloadBundle(options.port, buildInfo);
}
function shouldWatchFile(filePath) {
  return WATCH_EXTENSIONS.has(import_node_path7.default.extname(filePath).toLowerCase());
}
function watchRecursively(root, onChange) {
  const watchers = [];
  const watchDirectory = (directory) => {
    const watcher = import_node_fs.default.watch(directory, (eventType, fileName) => {
      const changedPath = fileName ? import_node_path7.default.join(directory, fileName.toString()) : directory;
      if (shouldWatchFile(changedPath)) onChange(eventType, changedPath);
      import_node_fs.default.promises.stat(changedPath).then((stats) => {
        if (stats.isDirectory() && !IGNORED_DIRECTORIES.has(import_node_path7.default.basename(changedPath))) {
          watchDirectory(changedPath);
        }
      }).catch(() => {
      });
    });
    watchers.push(watcher);
  };
  const walk = (directory) => {
    watchDirectory(directory);
    for (const entry of import_node_fs.default.readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isDirectory() || IGNORED_DIRECTORIES.has(entry.name)) continue;
      walk(import_node_path7.default.join(directory, entry.name));
    }
  };
  try {
    watchers.push(import_node_fs.default.watch(root, { recursive: true }, (eventType, fileName) => {
      const changedPath = fileName ? import_node_path7.default.join(root, fileName.toString()) : root;
      if (shouldWatchFile(changedPath)) onChange(eventType, changedPath);
    }));
  } catch {
    walk(root);
  }
  return () => {
    for (const watcher of watchers) watcher.close();
  };
}
async function runBuild(options) {
  const buildInfo = await bundleExtension({
    entryPath: options.entryPath,
    logLevel: "info",
    minify: options.minify,
    outfile: options.outfile,
    scriptDir: options.scriptDir,
    sourcemap: options.sourcemap,
    write: true
  });
  console.log(`[spotifyplus] built ${buildInfo.manifest.id} -> ${buildInfo.outfile}`);
}
async function runDev(options) {
  await adb(options, ["forward", `tcp:${options.port}`, `tcp:${RUNTIME_PORT}`]);
  console.log(`[spotifyplus] forwarding http://127.0.0.1:${options.port} to the SpotifyPlus runtime`);
  console.log(`[spotifyplus] watching ${options.scriptDir}`);
  let buildInFlight = false;
  let pendingBuild = false;
  let reconnectBuildHandle = null;
  let runtimeUnavailableReported = false;
  let activeScriptId = null;
  let sourceMapper = createDevSourceMapper("", options.scriptDir, "index.js");
  const colorizeOutput = shouldColorizeOutput();
  const closeLogStream = startDevLogStream(options.port, (entry) => {
    const mapper = !entry.scriptId || entry.scriptId === activeScriptId ? sourceMapper : createDevSourceMapper("", options.scriptDir, "index.js");
    const output = colorizeDevLogOutput(
      formatDevLogEntry(entry, mapper),
      entry.level,
      colorizeOutput
    );
    if (entry.level === "error") console.error(output);
    else if (entry.level === "warn") console.warn(output);
    else console.log(output);
  });
  const rebuild = async (reason) => {
    if (buildInFlight) {
      pendingBuild = true;
      return;
    }
    buildInFlight = true;
    clearTimeout(reconnectBuildHandle);
    reconnectBuildHandle = null;
    try {
      const buildInfo = await bundleExtension({
        entryPath: options.entryPath,
        scriptDir: options.scriptDir,
        sourcemap: "inline",
        write: false
      });
      activeScriptId = buildInfo.manifest.id;
      sourceMapper = createDevSourceMapper(
        buildInfo.source,
        buildInfo.scriptDir,
        buildInfo.manifest.main
      );
      await notifyDevice(options, buildInfo);
      runtimeUnavailableReported = false;
      console.log(`[spotifyplus] reloaded ${buildInfo.manifest.id} (${buildInfo.buildId})`);
    } catch (error) {
      const runtimeUnavailable = error?.runtimeUnavailable === true;
      if (!runtimeUnavailable || !runtimeUnavailableReported) {
        console.error(`[spotifyplus] ${reason} failed`);
        console.error(sourceMapper.map(error?.runtimeStack ?? error?.message ?? error));
        if (runtimeUnavailable) console.error("[spotifyplus] retrying when the runtime is available...");
        if (Array.isArray(error?.errors)) {
          for (const item of error.errors) console.error(item.text ?? item);
        }
      }
      runtimeUnavailableReported = runtimeUnavailable;
      if (runtimeUnavailable) reconnectBuildHandle = setTimeout(
        () => rebuild("runtime connection retry"),
        1e3
      );
    } finally {
      buildInFlight = false;
      if (pendingBuild) {
        pendingBuild = false;
        await rebuild("queued rebuild");
      }
    }
  };
  let debounceHandle = null;
  const scheduleRebuild = (_eventType, filePath) => {
    clearTimeout(debounceHandle);
    debounceHandle = setTimeout(
      () => rebuild(`rebuild after ${import_node_path7.default.relative(options.scriptDir, filePath)}`),
      options.debounceMs
    );
  };
  const closeWatchers = watchRecursively(options.scriptDir, scheduleRebuild);
  await rebuild("initial build");
  const close = () => {
    clearTimeout(reconnectBuildHandle);
    closeLogStream();
    closeWatchers();
    process.exit(0);
  };
  process.on("SIGINT", close);
  process.on("SIGTERM", close);
}
async function run() {
  const options = parseCliArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (options.command === "create-native") {
    await runCreateNative(options);
    return;
  }
  if (options.command === "build") {
    await runBuild(options);
    return;
  }
  await runDev(options);
}
run().catch((error) => {
  console.error(error?.stack ?? error);
  process.exit(1);
});
