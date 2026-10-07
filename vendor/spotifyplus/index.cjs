"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// sdk/index.ts
var index_exports = {};
__export(index_exports, {
  SpotifyPlus: () => SpotifyPlus
});
module.exports = __toCommonJS(index_exports);

// sdk/runtime.ts
function getSpotifyPlusApi() {
  const api = globalThis.__spotifyplus_api__;
  if (!api) throw new Error("SpotifyPlus API is not available in this environment!");
  return api;
}

// sdk/index.ts
var SpotifyPlus = getSpotifyPlusApi();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpotifyPlus
});
