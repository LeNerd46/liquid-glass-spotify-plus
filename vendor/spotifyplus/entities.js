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

// sdk/entities.ts
var entities_exports = {};
__export(entities_exports, {
  ContextMenu: () => ContextMenu,
  SideDrawerItem: () => SideDrawerItem,
  SpotifyAlbum: () => SpotifyAlbum,
  SpotifyTrack: () => SpotifyTrack,
  Uri: () => Uri,
  gidToUri: () => gidToUri,
  parseMetadataAlbum: () => parseMetadataAlbum,
  parseMetadataArtist: () => parseMetadataArtist,
  parseMetadataPlaylist: () => parseMetadataPlaylist
});
module.exports = __toCommonJS(entities_exports);

// core/models.ts
var SpotifyAlbum = class _SpotifyAlbum {
  constructor(title, artist, image, release) {
    this.title = title;
    this.artist = artist;
    this.release = release;
    this.image = image;
  }
  static from(data) {
    return new _SpotifyAlbum(data.title, data.artist, data.image, data.release);
  }
  toJSON() {
    return {
      title: this.title,
      artist: this.artist,
      release: this.release,
      image: this.image
    };
  }
};
var SpotifyTrack = class _SpotifyTrack {
  constructor(data) {
    this.uri = data.uri;
    this.id = this.uri.split(":")[2];
    this.title = data.title;
    this.trackNumber = data.trackNumber;
    this.artist = data.artist;
    this.artists = data.artists;
    this.album = data.album;
    this.durationMs = data.durationMs;
    this.explicit = data.explicit;
  }
  static from(data) {
    return new _SpotifyTrack(data);
  }
  get displayName() {
    return `${this.title} - ${this.artist}`;
  }
  toJSON() {
    return {
      title: this.title,
      trackNumber: this.trackNumber,
      durationMs: this.durationMs,
      explicit: this.explicit,
      uri: this.uri,
      artist: this.artist,
      album: this.album,
      artists: this.artists
    };
  }
};
var ContextMenu = class {
  constructor(name, onClick, shouldAdd, disabled, registerThing, types) {
    this.name = name;
    this.onClick = onClick;
    this.shouldAdd = shouldAdd;
    const values = types === void 0 ? void 0 : typeof types === "string" ? [types] : [...types];
    if (values?.some((type) => !["track", "artist", "album", "playlist"].includes(type))) {
      throw new TypeError("Invalid context menu type");
    }
    this.types = values === void 0 ? void 0 : Object.freeze([...new Set(values)]);
    this.disabled = disabled ?? false;
    this.registerThing = registerThing;
  }
  register() {
    if (!this.registerThing) {
      throw new Error("ContextMenu register thing has not been initialized");
    }
    this.registerThing(this);
    return this;
  }
};
var SideDrawerItem = class {
  constructor(name, onClick, icon, registerThing) {
    this.name = name;
    this.onClick = onClick;
    this.icon = icon;
    this.registerThing = registerThing;
  }
  register() {
    if (!this.registerThing) {
      throw new Error("SideDrawer register thing has not been initialized");
    }
    this.registerThing(this);
    return this;
  }
};
var Uri = class _Uri {
  constructor(type, props) {
    this.type = type;
    this.id = props?.id;
  }
  static from(data) {
    return new _Uri(data.type, data);
  }
  toString() {
    return this.id ? `spotify:${this.type}:${this.id}` : `spotify:${this.type}`;
  }
};
var ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var list = (value) => Array.isArray(value) ? value : [];
var text = (value) => typeof value === "string" ? value : "";
function gidToUri(kind, gid) {
  if (typeof gid !== "string" || !/^[0-9a-fA-F]{32}$/.test(gid)) return "";
  let value = BigInt(`0x${gid}`);
  let id = "";
  do {
    id = ALPHABET[Number(value % 62n)] + id;
    value /= 62n;
  } while (value > 0n);
  return `spotify:${kind}:${id.padStart(22, "0")}`;
}
function images(group) {
  return list(group?.image).filter((image) => typeof image?.file_id === "string" && /^[a-fA-F0-9]{40}$/.test(image.file_id)).map((image) => ({
    fileId: image.file_id,
    size: text(image.size),
    width: Number(image.width) || 0,
    height: Number(image.height) || 0,
    url: `https://i.scdn.co/image/${image.file_id}`
  }));
}
function preferredImage(entries) {
  return (entries.find((image) => image.size === "LARGE") ?? entries[0])?.url ?? "";
}
function albumGroup(group) {
  return list(group).flatMap((item) => list(item?.album).map((album) => gidToUri("album", album?.gid)).filter(Boolean));
}
function parseMetadataAlbum(raw, requestedUri) {
  const artwork = images(raw.cover_group);
  return {
    uri: text(raw.canonical_uri) || requestedUri,
    name: text(raw.name),
    image: preferredImage(artwork),
    images: artwork,
    artists: list(raw.artist).map((artist) => ({ uri: gidToUri("artist", artist?.gid), name: text(artist?.name) })),
    label: text(raw.label),
    type: text(raw.type),
    popularity: Number(raw.popularity) || 0,
    date: { year: Number(raw.date?.year) || 0, month: Number(raw.date?.month) || 0, day: Number(raw.date?.day) || 0 },
    discs: list(raw.disc).map((disc) => ({ number: Number(disc?.number) || 0, tracks: list(disc?.track).map((track) => gidToUri("track", track?.gid)).filter(Boolean) })),
    raw
  };
}
function parseMetadataArtist(raw, requestedUri) {
  const artwork = images(raw.portrait_group);
  return {
    uri: requestedUri,
    name: text(raw.name),
    image: preferredImage(artwork),
    images: artwork,
    popularity: Number(raw.popularity) || 0,
    topTracks: list(raw.top_track).map((group) => ({ country: text(group?.country), tracks: list(group?.track).map((track) => gidToUri("track", track?.gid)).filter(Boolean) })),
    albums: albumGroup(raw.album_group),
    singles: albumGroup(raw.single_group),
    compilations: albumGroup(raw.compilation_group),
    appearsOn: albumGroup(raw.appears_on_group),
    raw
  };
}
function parseMetadataPlaylist(raw, requestedUri) {
  const attributes = raw.attributes ?? {};
  const contents = raw.contents ?? {};
  const capabilities = raw.capabilities ?? {};
  return {
    uri: requestedUri,
    revision: text(raw.revision),
    name: text(attributes.name),
    // This is an opaque encoded picture value, NOT an image URL.
    picture: text(attributes.picture),
    description: text(attributes.description),
    ownerUsername: text(raw.ownerUsername),
    length: Number(raw.length) || 0,
    position: Number(contents.pos) || 0,
    truncated: Boolean(contents.truncated),
    timestamp: text(raw.timestamp),
    createdAt: text(raw.createdAt),
    isUserCreated: Boolean(raw.isUserCreated),
    canEditItems: Boolean(capabilities.canEditItems),
    canEditMetadata: Boolean(capabilities.canEditMetadata),
    items: list(contents.items).map((item) => ({ uri: text(item?.uri), addedBy: text(item?.attributes?.addedBy), timestamp: text(item?.attributes?.timestamp), itemId: text(item?.attributes?.itemId) })),
    raw
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContextMenu,
  SideDrawerItem,
  SpotifyAlbum,
  SpotifyTrack,
  Uri,
  gidToUri,
  parseMetadataAlbum,
  parseMetadataArtist,
  parseMetadataPlaylist
});
