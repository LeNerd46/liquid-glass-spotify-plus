globalThis.__spotifyplus_worklet_bundle__ = 2;
"use strict";

// src/index.tsx
var import_react11 = require("react");
var import_spotifyplus8 = require("spotifyplus");
var import_react12 = require("spotifyplus/react");

// src/components.tsx
var import_spotifyplus2 = require("spotifyplus");
var import_react2 = require("spotifyplus/react");

// src/model.ts
var palette = {
  text: "#ffffff",
  secondary: "#d0ccdc",
  muted: "#a9a4bc",
  accent: "#88edb1",
  error: "#ffd3ce"
};
var describeError = (error) => error instanceof Error ? error.message : String(error);
var itemKind = (uri) => uri.split(":")[1] || "collection";
function artworkUrl(input) {
  if (!input) return "";
  if (/^spotify:image:[a-f\d]{40}$/i.test(input)) return `https://i.scdn.co/image/${input.slice(14)}`;
  return input.startsWith("https://") ? input : "";
}
function timeLabel(ms) {
  const seconds = Math.floor(Math.max(0, Number.isFinite(ms) ? ms : 0) / 1e3);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
function uniqueItems(items) {
  return [...new Map(items.map((item) => [item.uri, item])).values()];
}
function filterCollection(items, query, sort) {
  const filtered = items.filter((item) => item.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return sort === "name" ? [...filtered].sort((a, b) => a.name.localeCompare(b.name)) : filtered;
}
var screenTargets = ["home.page", "search.page", "library.page", "nowPlaying.page", "miniPlayer.root", "album.page", "playlist.page", "artist.page", "artist.discography.page", "navigation.drawer", "contextMenu.root"];

// src/state.ts
var import_react = require("react");
var import_spotifyplus = require("spotifyplus");

// src/playback-store.ts
function createPlaybackStore(api) {
  let snapshot = {
    position: 0,
    error: ""
  };
  const listeners2 = /* @__PURE__ */ new Set();
  let timer;
  let session = 0, inFlight = false, pending = false;
  let anchorPosition = 0, anchorTime = 0;
  const publish = (next) => {
    snapshot = next;
    listeners2.forEach((listener) => listener());
  };
  const refresh = () => {
    if (!listeners2.size) return;
    if (inFlight) {
      pending = true;
      return;
    }
    const generation = session;
    inFlight = true;
    try {
      const state = api.Player.getState();
      if (generation !== session || !listeners2.size) return;
      const candidate = api.Player.getCurrentTrack();
      const track = state.trackUri && candidate?.uri === state.trackUri ? candidate : void 0;
      anchorPosition = Math.max(0, state.positionMs || 0);
      anchorTime = Date.now();
      publish({
        state,
        track,
        position: anchorPosition,
        error: ""
      });
    } catch (error) {
      if (generation === session && listeners2.size) publish({
        ...snapshot,
        error: describeError(error)
      });
    } finally {
      inFlight = false;
      if (pending) {
        pending = false;
        void refresh();
      }
    }
  };
  const events = ["songChanged", "playPause", "trackSeeked", "shuffleChanged", "repeatChanged"];
  const onEvent = () => {
    void refresh();
  };
  return {
    getSnapshot: () => snapshot,
    refresh,
    subscribe(listener) {
      listeners2.add(listener);
      if (listeners2.size === 1) {
        session++;
        events.forEach((event) => api.Events.on(event, onEvent));
        void refresh();
        let ticks = 0;
        timer = setInterval(() => {
          const estimated = anchorPosition + (snapshot.state?.isPlaying && !snapshot.state.isBuffering ? Date.now() - anchorTime : 0);
          const duration = snapshot.track?.durationMs;
          publish({
            ...snapshot,
            position: duration ? Math.min(duration, estimated) : estimated
          });
          if (++ticks % 3 === 0) void refresh();
        }, 500);
      }
      return () => {
        listeners2.delete(listener);
        if (!listeners2.size) {
          session++;
          pending = false;
          if (timer) clearInterval(timer);
          events.forEach((event) => api.Events.off(event, onEvent));
        }
      };
    }
  };
}

// src/state.ts
var playback = createPlaybackStore(import_spotifyplus.SpotifyPlus);
var usePlayback = () => (0, import_react.useSyncExternalStore)(playback.subscribe, playback.getSnapshot);
var reduced = false;
var listeners = /* @__PURE__ */ new Set();
var useReducedMotion = () => (0, import_react.useSyncExternalStore)((listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}, () => reduced);
function setReducedMotion(value) {
  reduced = value;
  listeners.forEach((listener) => listener());
}
function useActions() {
  const [error, setError] = (0, import_react.useState)(""), [pending, setPending] = (0, import_react.useState)(false);
  const busy = (0, import_react.useRef)(false), mounted = (0, import_react.useRef)(true);
  (0, import_react.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const act = async (action) => {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError("");
    try {
      await action();
      await playback.refresh();
    } catch (error2) {
      if (mounted.current) setError(describeError(error2));
    } finally {
      busy.current = false;
      if (mounted.current) setPending(false);
    }
  };
  return {
    error,
    pending,
    act
  };
}

// src/components.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var NativeScene = (0, import_react2.createNativeComponent)("LiquidGlassScene");
var NativePanel = (0, import_react2.createNativeComponent)("LiquidGlassPanel");
var NativeArtwork = (0, import_react2.createNativeComponent)("LiquidGlassArtwork");
function Scene({
  children,
  compact = false,
  dim,
  artwork,
  ...props
}) {
  const {
    track
  } = usePlayback();
  const reduced2 = useReducedMotion();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeScene, { width: "100%", height: "100%", artwork: artworkUrl(artwork ?? track?.album?.image), animated: !compact, reduceMotion: reduced2, dim: dim ?? (compact ? 0.48 : 0.32), ...props, children });
}
function Glass({
  children,
  radius = 24,
  selected = false,
  tint = 0.14,
  ...props
}) {
  const reduced2 = useReducedMotion();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativePanel, { radius, tint, selected, reduceMotion: reduced2, ...props, children });
}
function Artwork({
  source,
  radius = 16,
  fadeBottom = false,
  ...props
}) {
  const reduced2 = useReducedMotion();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeArtwork, { artwork: artworkUrl(source), radius, fadeBottom, reduceMotion: reduced2, ...props });
}
function Icon({
  name,
  size = 24,
  color = palette.text,
  filled = false
}) {
  const nodes = [];
  const line = (x1, y1, x2, y2) => nodes.push({
    type: "line",
    x1,
    y1,
    x2,
    y2,
    color,
    strokeWidth: 1.8
  });
  const circle = (cx, cy, radius, fill = false) => nodes.push({
    type: "circle",
    cx,
    cy,
    radius,
    ...fill ? {
      fill: color
    } : {
      stroke: color,
      strokeWidth: 1.8
    }
  });
  const path = (points, fill = false, closed = false) => nodes.push({
    type: "path",
    commands: [...points.map(([x, y], i) => ({
      cmd: i ? "L" : "M",
      x,
      y
    })), ...closed ? [{
      cmd: "Z"
    }] : []],
    ...fill ? {
      fill: color
    } : {
      stroke: color,
      strokeWidth: 1.8
    }
  });
  const rect = (x, y, width, height, radius = 1) => nodes.push({
    type: "roundRect",
    x,
    y,
    width,
    height,
    radius,
    fill: color
  });
  switch (name) {
    case "play":
      path([[7, 4], [21, 12], [7, 20]], true, true);
      break;
    case "pause":
      rect(6, 4, 4, 16);
      rect(14, 4, 4, 16);
      break;
    case "next":
      path([[3, 5], [13, 12], [3, 19]], true, true);
      path([[13, 5], [23, 12], [13, 19]], true, true);
      break;
    case "previous":
      path([[21, 5], [11, 12], [21, 19]], true, true);
      path([[11, 5], [1, 12], [11, 19]], true, true);
      break;
    case "search":
      circle(10, 10, 7);
      line(15.2, 15.2, 22, 22);
      break;
    case "library":
      line(4, 4, 4, 21);
      line(10, 4, 10, 21);
      path([[15, 5], [18, 4], [22, 20], [19, 21]], false, true);
      break;
    case "home":
      path([[3, 11], [12, 3], [21, 11], [21, 21], [15, 21], [15, 14], [9, 14], [9, 21], [3, 21]], filled, true);
      break;
    case "heart":
      nodes.push({
        type: "path",
        commands: [{
          cmd: "M",
          x: 12,
          y: 21
        }, {
          cmd: "C",
          x1: 8,
          y1: 17,
          x2: 2,
          y2: 13,
          x: 2,
          y: 7
        }, {
          cmd: "C",
          x1: 2,
          y1: 1,
          x2: 10,
          y2: 1,
          x: 12,
          y: 6
        }, {
          cmd: "C",
          x1: 14,
          y1: 1,
          x2: 22,
          y2: 1,
          x: 22,
          y: 7
        }, {
          cmd: "C",
          x1: 22,
          y1: 13,
          x2: 16,
          y2: 17,
          x: 12,
          y: 21
        }, {
          cmd: "Z"
        }],
        ...filled ? {
          fill: color
        } : {
          stroke: color,
          strokeWidth: 1.6
        }
      });
      break;
    case "more":
      [5, 12, 19].forEach((x) => circle(x, 12, 1.5, true));
      break;
    case "down":
      path([[5, 9], [12, 16], [19, 9]]);
      break;
    case "back":
      path([[15, 4], [7, 12], [15, 20]]);
      break;
    case "info":
      circle(12, 12, 10);
      circle(12, 7, 1, true);
      line(12, 11, 12, 18);
      break;
    case "close":
      line(6, 6, 18, 18);
      line(18, 6, 6, 18);
      break;
    case "plus":
      line(12, 5, 12, 19);
      line(5, 12, 19, 12);
      break;
    case "arrow":
      path([[9, 5], [16, 12], [9, 19]]);
      break;
    case "shuffle":
      path([[3, 6], [6, 6], [18, 18], [22, 18]]);
      path([[3, 18], [6, 18], [18, 6], [22, 6]]);
      path([[18, 2], [22, 6], [18, 10]]);
      path([[18, 14], [22, 18], [18, 22]]);
      break;
    case "repeat":
      path([[3, 10], [3, 5], [20, 5], [20, 10]]);
      path([[17, 2], [21, 5], [17, 8]]);
      path([[21, 14], [21, 19], [4, 19], [4, 14]]);
      path([[7, 16], [3, 19], [7, 22]]);
      break;
    case "connect":
      path([[5, 17], [2, 17], [2, 3], [22, 3], [22, 17], [19, 17]]);
      path([[6, 22], [12, 13], [18, 22]], false, true);
      break;
    case "queue":
      [6, 12, 18].forEach((y) => {
        circle(3, y, 1, true);
        line(8, y, 22, y);
      });
      break;
    case "lyrics":
      path([[3, 3], [21, 3], [21, 17], [12, 17], [6, 22], [6, 17], [3, 17]], false, true);
      rect(7, 7, 3, 5);
      rect(14, 7, 3, 5);
      break;
    case "grid":
      [4, 14].forEach((x) => [4, 14].forEach((y) => rect(x, y, 6, 6, 1.5)));
      break;
    case "list":
      [5, 12, 19].forEach((y) => {
        rect(3, y - 2, 4, 4);
        line(11, y, 22, y);
      });
      break;
    case "sun":
      circle(12, 12, 4);
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        line(12 + Math.cos(a) * 7, 12 + Math.sin(a) * 7, 12 + Math.cos(a) * 10, 12 + Math.sin(a) * 10);
      }
      break;
    case "refresh":
      path([[21, 11], [21, 5], [15, 5]]);
      path([[20, 5], [16, 2], [8, 2], [3, 7], [3, 16], [8, 21], [16, 21], [21, 16]]);
      break;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.ScriptView, { width: size, height: size, nodes: [{
    type: "group",
    scale: size / 24,
    pivotX: 0,
    pivotY: 0,
    children: nodes
  }] });
}
function IconButton({
  name,
  label,
  onPress,
  active = false,
  size = 46,
  filled,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, { width: size, height: size, radius: size / 2, selected: active, alignItems: "center", justifyContent: "center", accessibilityLabel: label, onPress, ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name, color: active ? palette.accent : palette.text, filled, size: size > 54 ? 30 : 21 }) });
}
function Label({
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Text, { color: palette.text, fontSize: 15, includeFontPadding: false, ...props, children });
}
function Pill({
  children,
  selected,
  onPress
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, { radius: 22, selected, paddingHorizontal: 17, minHeight: 44, alignItems: "center", justifyContent: "center", onPress, accessibilityLabel: children, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { fontSize: 13, color: selected ? palette.accent : palette.secondary, children }) });
}
function Notice({
  message,
  onRetry
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { padding: 16, marginBottom: 16, radius: 18, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { color: palette.secondary, fontSize: 13, children: message }),
    onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.View, { onPress: onRetry, minHeight: 44, justifyContent: "center", accessibilityLabel: "Try again", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { color: palette.accent, children: "Try again" }) }) : null
  ] });
}
function Section({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.View, { marginTop: 26, width: "100%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { fontSize: 23, fontWeight: "600", marginBottom: subtitle ? 5 : 14, children: title }),
    subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { color: palette.secondary, fontSize: 13, marginBottom: 14, children: subtitle }) : null,
    children
  ] });
}
function openSpotify(uri) {
  if (!import_spotifyplus2.SpotifyPlus.Navigation.openSpotify(uri)) import_spotifyplus2.SpotifyPlus.toast("Spotify could not open this screen.");
}
function showMenu(uri) {
  void import_spotifyplus2.SpotifyPlus.ContextMenu.open(uri).catch((error) => import_spotifyplus2.SpotifyPlus.toast(String(error)));
}

// src/collection-screens.tsx
var import_react4 = require("react");
var import_spotifyplus4 = require("spotifyplus");
var import_react5 = require("spotifyplus/react");

// src/data.ts
var import_react3 = require("react");
var import_spotifyplus3 = require("spotifyplus");

// src/search-artwork.ts
function createSearchArtwork(api) {
  const cache = /* @__PURE__ */ new Map();
  function details(uri) {
    const cached = cache.get(uri);
    if (cached) {
      cache.delete(uri);
      cache.set(uri, cached);
      return cached;
    }
    const request = (async () => {
      const kind = uri.split(":")[1];
      let image = "", subtitle = "";
      if (kind === "track") {
        const track = await api.Internal.getTrack(uri);
        image = artworkUrl(track?.album?.image);
        subtitle = track?.artist || "";
      } else if (kind === "album") {
        const album = await api.Internal.getAlbum(uri);
        image = artworkUrl(album?.image) || artworkUrl(album?.images?.[0]?.url);
        subtitle = album?.artists.map((artist) => artist.name).join(", ") || "";
      } else if (kind === "artist") {
        const artist = await api.Internal.getArtist(uri);
        image = artworkUrl(artist?.image) || artworkUrl(artist?.images?.[0]?.url);
      } else if (kind === "playlist") {
        image = artworkUrl((await api.Internal.getPlaylist(uri))?.picture);
      }
      return {
        image,
        subtitle
      };
    })();
    cache.set(uri, request);
    if (cache.size > 180) cache.delete(cache.keys().next().value);
    void request.then((value) => {
      if (!value.image && cache.get(uri) === request) cache.delete(uri);
    }, () => {
      if (cache.get(uri) === request) cache.delete(uri);
    });
    return request;
  }
  return async (items, active, publish) => {
    let cursor = 0;
    await Promise.all(Array.from({
      length: Math.min(3, items.length)
    }, async () => {
      while (active() && cursor < items.length) {
        const item = items[cursor++];
        try {
          const extra = await details(item.uri);
          if (active()) publish({
            ...item,
            ...extra
          });
        } catch {
        }
      }
    }));
  };
}

// src/data.ts
var enrichArtwork = createSearchArtwork(import_spotifyplus3.SpotifyPlus);
function useCollection(type = "all", limit = 40) {
  const [items, setItems] = (0, import_react3.useState)([]);
  const [total, setTotal] = (0, import_react3.useState)(0);
  const [error, setError] = (0, import_react3.useState)("");
  const [loading, setLoading] = (0, import_react3.useState)(true);
  const [revision, setRevision] = (0, import_react3.useState)(0);
  const cursor = (0, import_react3.useRef)(0), busy = (0, import_react3.useRef)(false), generation = (0, import_react3.useRef)(0);
  const request = async (reset, version) => {
    if (busy.current && !reset) return;
    busy.current = true;
    setLoading(true);
    setError("");
    try {
      const page = await import_spotifyplus3.SpotifyPlus.Library.list({
        type,
        limit,
        offset: reset ? 0 : cursor.current
      });
      if (version !== generation.current) return;
      cursor.current = page.offset + page.items.length;
      setItems((previous) => uniqueItems(reset ? page.items : [...previous, ...page.items]));
      setTotal(page.items.length ? page.total : cursor.current);
    } catch (error2) {
      if (version === generation.current) setError(describeError(error2));
    } finally {
      if (version === generation.current) {
        busy.current = false;
        setLoading(false);
      }
    }
  };
  (0, import_react3.useEffect)(() => {
    const version = ++generation.current;
    cursor.current = 0;
    setItems([]);
    setTotal(0);
    void request(true, version);
    return () => {
      generation.current++;
      busy.current = false;
    };
  }, [type, limit, revision]);
  return {
    items,
    total,
    error,
    loading,
    hasMore: cursor.current < total,
    loadMore: () => {
      void request(false, generation.current);
    },
    retry: () => setRevision((value) => value + 1)
  };
}
function useSearch(query) {
  const [items, setItems] = (0, import_react3.useState)([]);
  const [loading, setLoading] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)("");
  const [revision, setRevision] = (0, import_react3.useState)(0);
  (0, import_react3.useEffect)(() => {
    let live = true;
    setItems([]);
    setError("");
    const value = query.trim();
    if (!value) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      import_spotifyplus3.SpotifyPlus.Search.search(value, {
        limit: 30
      }).then((response) => {
        if (!live) return;
        setItems(response.items);
        setLoading(false);
        void enrichArtwork(response.items, () => live, (item) => {
          setItems((previous) => previous.map((result) => result.uri === item.uri ? {
            ...result,
            ...item
          } : result));
        });
      }).catch((error2) => {
        if (live) {
          setLoading(false);
          setError(describeError(error2));
        }
      });
    }, 320);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [query, revision]);
  return {
    items,
    loading,
    error,
    retry: () => setRevision((value) => value + 1)
  };
}

// src/collection-screens.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Header({
  title,
  subtitle,
  home = false
}) {
  const reduced2 = useReducedMotion();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flex: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { fontSize: 32, fontWeight: "600", children: title }),
      subtitle ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { color: palette.secondary, fontSize: 14, marginTop: 6, children: subtitle }) : null
    ] }),
    home ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconButton, { name: "sun", label: reduced2 ? "Enable background motion" : "Reduce background motion", onPress: () => setReducedMotion(!reduced2), marginRight: 8 }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconButton, { name: "more", label: "Open Spotify drawer and theme controls", onPress: () => {
      void import_spotifyplus4.SpotifyPlus.SideDrawer.open().catch((error) => import_spotifyplus4.SpotifyPlus.toast(String(error)));
    } })
  ] });
}
function Page({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Scene, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.ScrollView, { width: "100%", flex: 1, showsVerticalScrollIndicator: false, fillViewport: true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { width: "100%", paddingHorizontal: 22, paddingTop: 62, paddingBottom: 208, children }) }) });
}
function Cover({
  source,
  size = 56,
  artist = false
}) {
  return source ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Artwork, { source, width: size, height: size, radius: artist ? size / 2 : 13 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Glass, { width: size, height: size, radius: artist ? size / 2 : 13, selected: true, alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: artist ? "sun" : "library", size: 24 }) });
}
function CollectionCard({
  item,
  wide = false
}) {
  const artist = itemKind(item.uri) === "artist";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { width: wide ? 148 : "48%", marginBottom: 12, marginRight: wide ? 16 : 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { radius: artist ? 80 : 26, padding: wide ? 6 : 9, flexDirection: wide ? "column" : "row", alignItems: "center", onPress: () => openSpotify(item.uri), onLongPress: () => showMenu(item.uri), accessibilityLabel: `Open ${item.name}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Cover, { source: item.imageUri, size: wide ? 136 : 44, artist }),
      !wide ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { flex: 1, fontSize: 13, marginLeft: 10, numberOfLines: 2, children: item.name || "Untitled collection" }) : null
    ] }),
    wide ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { paddingHorizontal: 3, marginTop: 10, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { fontSize: 15, numberOfLines: 1, children: item.name }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { fontSize: 12, marginTop: 5, color: palette.secondary, children: artist ? "Artist" : itemKind(item.uri) === "playlist" ? "Playlist" : "Album" })
    ] }) : null
  ] });
}
function Shelf({
  items
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.HorizontalScrollView, { width: "100%", showsHorizontalScrollIndicator: false, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { flexDirection: "row", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CollectionCard, { item, wide: true }, item.uri)) }) });
}
function HomeScreen() {
  const library = useCollection("all", 30);
  const {
    track
  } = usePlayback();
  const [user, setUser] = (0, import_react4.useState)();
  (0, import_react4.useEffect)(() => {
    let live = true;
    import_spotifyplus4.SpotifyPlus.User.getCurrent().then((user2) => {
      if (live) setUser(user2);
    }).catch(() => {
    });
    return () => {
      live = false;
    };
  }, []);
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const quick = [...library.items.filter((item) => item.pinned), ...library.items.filter((item) => !item.pinned)].slice(0, 5);
  const artists = library.items.filter((item) => itemKind(item.uri) === "artist");
  const collections = library.items.filter((item) => itemKind(item.uri) !== "artist");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: greeting, subtitle: user?.displayName || "Make yourself at home.", home: true }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { width: "48%", minHeight: 66, padding: 9, radius: 24, marginBottom: 12, flexDirection: "row", alignItems: "center", onPress: () => openSpotify("spotify:collection:tracks"), accessibilityLabel: "Open Liked Songs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Glass, { width: 44, height: 44, radius: 13, selected: true, alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "heart", filled: true, size: 22 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { color: palette.accent, fontSize: 13, flex: 1, marginLeft: 10, children: "Liked Songs" })
      ] }),
      quick.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CollectionCard, { item }, item.uri))
    ] }),
    library.loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { message: "Finding your favorites\u2026" }) : library.error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { message: library.error, onRetry: library.retry }) : null,
    track ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Section, { title: "Stay in the moment", subtitle: "Your current soundtrack", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { radius: 28, padding: 16, flexDirection: "row", alignItems: "center", onPress: () => openSpotify("spotify:now-playing"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Artwork, { source: track.album.image, width: 76, height: 76, radius: 18 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flex: 1, marginLeft: 16, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { fontSize: 18, fontWeight: "600", numberOfLines: 1, children: track.title }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { color: palette.secondary, fontSize: 13, numberOfLines: 1, marginTop: 6, children: track.artist })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "arrow", size: 18 })
    ] }) }) : null,
    collections.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Section, { title: "Made for your mood", subtitle: "Albums and playlists from your collection", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Shelf, { items: collections.slice(0, 12) }) }) : null,
    artists.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Section, { title: "Your artists", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Shelf, { items: artists }) }) : null,
    !library.loading && !library.error && !library.items.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Section, { title: "A little room for discovery", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { message: "Save an album, artist or playlist in Spotify to make this space yours." }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Section, { title: "Something new?", subtitle: "Find your next favorite.", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { padding: 18, radius: 24, flexDirection: "row", alignItems: "center", onPress: () => openSpotify("spotify:search"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "search" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { flex: 1, marginLeft: 14, children: "Explore music" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "arrow", size: 18 })
    ] }) })
  ] });
}
function SearchScreen() {
  const [query, setQuery] = (0, import_react4.useState)("");
  const [filter, setFilter] = (0, import_react4.useState)("all");
  const results = useSearch(query);
  const filters = [["all", "All"], ["track", "Songs"], ["artist", "Artists"], ["album", "Albums"], ["playlist", "Playlists"]];
  const filtered = results.items.filter((item) => filter === "all" || itemKind(item.uri) === filter);
  const browse = [["Late night", "late night"], ["Feel good", "feel good"], ["Focus flow", "focus"], ["Fresh finds", "new music"], ["Slow Sunday", "chill"], ["On the move", "workout"]];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: "Find your sound", subtitle: "A song for every version of you." }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { radius: 25, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", marginBottom: 16, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "search", color: palette.secondary, size: 21 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.TextInput, { flex: 1, minHeight: 54, text: query, hint: "Songs, artists, albums\u2026", color: palette.text, hintColor: palette.secondary, backgroundColor: "#00000000", fontSize: 15, marginLeft: 10, padding: 0, singleLine: true, returnKeyType: "search", onChangeText: setQuery, accessibilityLabel: "Search Spotify" }),
      query ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { width: 44, height: 44, alignItems: "center", justifyContent: "center", onPress: () => setQuery(""), accessibilityLabel: "Clear search", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "close", size: 18 }) }) : null
    ] }),
    query.trim() ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.HorizontalScrollView, { showsHorizontalScrollIndicator: false, width: "100%", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { flexDirection: "row", gap: 8, children: filters.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Pill, { selected: filter === value, onPress: () => setFilter(value), children: label }, value)) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Section, { title: "Search results", subtitle: results.loading ? "Searching\u2026" : `${filtered.length} matches`, children: [
        results.error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { message: results.error, onRetry: results.retry }) : null,
        !results.loading && !results.error && !filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { message: "No matches here. Try another name or filter." }) : null,
        filtered.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { padding: 12, radius: 22, marginBottom: 10, flexDirection: "row", alignItems: "center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flex: 1, flexDirection: "row", alignItems: "center", onPress: () => openSpotify(item.uri), onLongPress: () => showMenu(item.uri), accessibilityLabel: `Open ${item.text}`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Cover, { source: item.image, artist: itemKind(item.uri) === "artist", size: 54 }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flex: 1, marginLeft: 14, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { fontSize: 15, numberOfLines: 1, children: item.text }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { color: palette.secondary, fontSize: 12, numberOfLines: 1, marginTop: 5, children: item.subtitle || itemKind(item.uri) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { width: 44, height: 44, alignItems: "center", justifyContent: "center", onPress: () => showMenu(item.uri), accessibilityLabel: `More options for ${item.text}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "more", size: 20 }) })
        ] }, `${item.uri}:${index}`))
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Section, { title: "Where will you go?", subtitle: "Start with a feeling.", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", children: browse.map(([label, term], index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { width: "48%", minHeight: 120, padding: 18, radius: 27, marginBottom: 14, selected: index === 1 || index === 4, onPress: () => setQuery(term), accessibilityLabel: `Search ${label}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: ["sun", "heart", "library", "shuffle", "lyrics", "play"][index], size: 26, color: index === 1 || index === 4 ? palette.accent : palette.secondary }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { fontSize: 18, fontWeight: "600", marginTop: 22, children: label })
    ] }, label)) }) })
  ] });
}
function LibraryScreen() {
  const [type, setType] = (0, import_react4.useState)("all");
  const [query, setQuery] = (0, import_react4.useState)("");
  const [sort, setSort] = (0, import_react4.useState)("recent");
  const [grid, setGrid] = (0, import_react4.useState)(false);
  const library = useCollection(type);
  const items = filterCollection(library.items, query, sort);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: "Your library", subtitle: "Everything you keep coming back to." }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.HorizontalScrollView, { width: "100%", showsHorizontalScrollIndicator: false, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { flexDirection: "row", gap: 8, children: [["all", "All"], ["playlist", "Playlists"], ["album", "Albums"], ["artist", "Artists"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Pill, { selected: type === value, onPress: () => setType(value), children: label }, value)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { marginTop: 18, radius: 22, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "search", size: 18, color: palette.secondary }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.TextInput, { flex: 1, minHeight: 48, text: query, hint: "Find in your collection", color: palette.text, hintColor: palette.secondary, backgroundColor: "#00000000", padding: 0, marginLeft: 10, fontSize: 14, singleLine: true, onChangeText: setQuery, accessibilityLabel: "Filter loaded library items" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { marginTop: 18, marginBottom: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flexDirection: "row", alignItems: "center", minHeight: 44, onPress: () => setSort(sort === "name" ? "recent" : "name"), accessibilityLabel: "Change library sort order", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "list", size: 17, color: palette.secondary }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { fontSize: 13, color: palette.secondary, marginLeft: 9, children: sort === "name" ? "Alphabetical" : "Library order" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flexDirection: "row", gap: 8, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconButton, { size: 44, name: "refresh", label: "Refresh library", onPress: library.retry }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconButton, { size: 44, name: grid ? "list" : "grid", label: grid ? "Show list" : "Show grid", onPress: () => setGrid(!grid) })
      ] })
    ] }),
    library.error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { message: library.error, onRetry: library.retry }) : null,
    library.loading && !items.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { message: "Opening your collection\u2026" }) : null,
    grid ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { width: "48%", marginBottom: 20, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Glass, { padding: 6, radius: 24, onPress: () => openSpotify(item.uri), onLongPress: () => showMenu(item.uri), accessibilityLabel: `Open ${item.name}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Artwork, { source: item.imageUri, width: "100%", aspectRatio: 1, radius: itemKind(item.uri) === "artist" ? 90 : 19 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { marginTop: 10, fontSize: 14, numberOfLines: 1, children: item.name }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { color: palette.secondary, fontSize: 12, marginTop: 4, children: itemKind(item.uri) })
    ] }, item.uri)) }) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Glass, { padding: 12, radius: 23, marginBottom: 11, flexDirection: "row", alignItems: "center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flex: 1, flexDirection: "row", alignItems: "center", onPress: () => openSpotify(item.uri), onLongPress: () => showMenu(item.uri), accessibilityLabel: `Open ${item.name}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Cover, { source: item.imageUri, artist: itemKind(item.uri) === "artist" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.View, { flex: 1, marginLeft: 14, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Label, { numberOfLines: 1, fontSize: 16, children: item.name }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Label, { fontSize: 12, color: palette.secondary, marginTop: 6, children: [
            item.pinned ? "Pinned \xB7 " : "",
            itemKind(item.uri)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react5.View, { width: 44, height: 44, alignItems: "center", justifyContent: "center", onPress: () => showMenu(item.uri), accessibilityLabel: `More options for ${item.name}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "more", size: 21 }) })
    ] }, item.uri)),
    !library.loading && !items.length && !library.error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { message: query ? "No matches in the items loaded so far." : "Your collection starts with the music you save." }) : null,
    library.hasMore ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Pill, { onPress: library.loadMore, children: library.loading ? "Loading\u2026" : `Load more \xB7 ${library.items.length} of ${library.total}` }) : null
  ] });
}

// src/player-screens.tsx
var import_react6 = require("react");
var import_spotifyplus5 = require("spotifyplus");
var import_react7 = require("spotifyplus/react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Volume = (0, import_react7.createNativeComponent)("LiquidGlassVolume");
function MiniPlayer() {
  const {
    track,
    state,
    position,
    error
  } = usePlayback();
  const action = useActions();
  const fraction = track?.durationMs ? Math.min(1, position / track.durationMs) : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Scene, { compact: true, height: 76, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Glass, { width: "100%", height: 76, radius: 38, padding: 7, tint: 0.12, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", alignItems: "center", flex: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", alignItems: "center", flex: 1, onPress: () => openSpotify("spotify:now-playing"), accessibilityLabel: `Open Now Playing: ${track?.title || "Nothing playing"}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Artwork, { source: track?.album?.image, width: 54, height: 54, radius: 27 }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flex: 1, marginLeft: 12, marginRight: 8, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 15, fontWeight: "600", numberOfLines: 1, children: track?.title || (state?.trackUri ? "Loading track\u2026" : "Nothing playing") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 12, color: action.error || error ? palette.error : palette.secondary, numberOfLines: 1, marginTop: 4, children: action.error || error || track?.artist || "Choose something you love" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: state?.isPlaying ? "pause" : "play", size: 48, label: state?.isPlaying ? "Pause" : "Play", disabled: action.pending || !state?.trackUri, onPress: () => {
        void action.act(() => import_spotifyplus5.SpotifyPlus.Player.togglePlay());
      }, marginRight: 6 }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "next", size: 48, label: "Next track", disabled: action.pending || !state?.trackUri, onPress: () => {
        void action.act(() => import_spotifyplus5.SpotifyPlus.Player.skipNext());
      } })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react7.View, { height: 2, marginLeft: 59, marginRight: 15, marginBottom: 2, backgroundColor: "#33ffffff", borderRadius: 1, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react7.View, { height: 2, width: `${Math.round(fraction * 100)}%`, backgroundColor: palette.accent, borderRadius: 1 }) })
  ] }) });
}
function Sheet({
  kind,
  onClose
}) {
  const [queue, setQueue] = (0, import_react6.useState)(), [devices, setDevices] = (0, import_react6.useState)([]);
  const [status, setStatus] = (0, import_react6.useState)("Loading\u2026"), [error, setError] = (0, import_react6.useState)("");
  const action = useActions();
  (0, import_react6.useEffect)(() => {
    try {
      if (kind === "queue") setQueue(import_spotifyplus5.SpotifyPlus.Queue.get());
      else setDevices(import_spotifyplus5.SpotifyPlus.Connect.getDevices());
      setError("");
    } catch (error2) {
      setError(describeError(error2));
    }
    setStatus("");
  }, [kind]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react7.View, { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#950a0c18", justifyContent: "flex-end", padding: 16, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Glass, { radius: 32, padding: 22, width: "100%", maxHeight: "80%", tint: 0.24, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 24, fontWeight: "600", children: kind === "queue" ? "Up next" : "Listen everywhere" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "close", label: "Close panel", size: 44, onPress: onClose })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react7.ScrollView, { width: "100%", maxHeight: 400, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { width: "100%", children: [
      status || error || action.error ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Notice, { message: error || action.error || status }) : null,
      kind === "queue" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        queue?.next.slice(0, 30).map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { paddingVertical: 14, flexDirection: "row", alignItems: "center", onPress: () => openSpotify(entry.uri), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { color: palette.muted, width: 28, fontSize: 12, children: i + 1 }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flex: 1, children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 15, numberOfLines: 1, children: entry.metadata.title || entry.metadata.name || "Track" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { color: palette.secondary, fontSize: 12, marginTop: 4, numberOfLines: 1, children: entry.metadata.artist_name || entry.metadata.artist || entry.uri })
          ] })
        ] }, entry.uid || `${entry.uri}:${i}`)),
        queue && !queue.next.length ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Notice, { message: "The queue is empty. Choose something to keep listening." }) : null
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Glass, { padding: 16, marginBottom: 10, radius: 20, selected: device.isActive, disabled: device.isDisabled || action.pending, onPress: () => {
          void action.act(async () => {
            await import_spotifyplus5.SpotifyPlus.Connect.transfer(device);
            onClose();
          });
        }, accessibilityLabel: `Listen on ${device.name}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 16, color: device.isActive ? palette.accent : palette.text, children: device.name }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { color: palette.secondary, fontSize: 12, marginTop: 5, children: device.isActive ? "Currently listening here" : device.isDisabled ? "Unavailable" : device.type })
        ] }, device.id)),
        !status && !devices.length && !error ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Notice, { message: "No available Spotify Connect devices." }) : null
      ] })
    ] }) })
  ] }) });
}
function NowPlayingScreen({
  Original
}) {
  const {
    track,
    state,
    position,
    error
  } = usePlayback();
  const action = useActions();
  const [liked, setLiked] = (0, import_react6.useState)(false), [likeReady, setLikeReady] = (0, import_react6.useState)(false);
  const [drag, setDrag] = (0, import_react6.useState)(null);
  const [sheet, setSheet] = (0, import_react6.useState)(null);
  const [native, setNative] = (0, import_react6.useState)(false);
  const currentUri = (0, import_react6.useRef)(track?.uri);
  currentUri.current = track?.uri;
  const draggingUri = (0, import_react6.useRef)(void 0);
  (0, import_react6.useEffect)(() => {
    setLikeReady(false);
    setLiked(false);
    setDrag(null);
    if (track?.uri) {
      try {
        setLiked(import_spotifyplus5.SpotifyPlus.Library.isLiked(track.uri));
        setLikeReady(true);
      } catch {
      }
    }
  }, [track?.uri]);
  (0, import_react6.useEffect)(() => {
    if (!sheet) return;
    const back = (event) => {
      event.preventDefault();
      setSheet(null);
    };
    import_spotifyplus5.SpotifyPlus.on("android.backPressed", back);
    return () => import_spotifyplus5.SpotifyPlus.off("android.backPressed", back);
  }, [sheet]);
  if (native) return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { width: "100%", height: "100%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Original, {}),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Glass, { position: "absolute", top: 50, left: 22, padding: 14, radius: 23, onPress: () => setNative(false), accessibilityLabel: "Return to glass player", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { color: palette.accent, children: "Return to glass" }) })
  ] });
  const duration = track?.durationMs || 0;
  const shown = drag ?? position;
  const disabled = action.pending || !state?.trackUri;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Scene, { dim: 0.3, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Artwork, { source: track?.album?.image, position: "absolute", top: 0, left: 0, width: "100%", height: "68%", radius: 0, fadeBottom: true }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react7.ScrollView, { width: "100%", height: "100%", showsVerticalScrollIndicator: false, fillViewport: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { width: "100%", minHeight: 710, paddingHorizontal: 26, paddingTop: 52, paddingBottom: 28, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "down", label: "Close Now Playing", onPress: () => import_spotifyplus5.SpotifyPlus.Navigation.back() }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "more", label: "More song options", onPress: () => {
          void action.act(() => import_spotifyplus5.SpotifyPlus.ContextMenu.openNowPlaying());
        } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react7.View, { minHeight: 260, flex: 1 }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", alignItems: "center", marginTop: 24, marginBottom: 14, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flex: 1, marginRight: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 27, fontWeight: "600", numberOfLines: 2, children: track?.title || (state?.trackUri ? "Loading track\u2026" : "Nothing playing") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 18, color: palette.secondary, marginTop: 6, numberOfLines: 2, children: track?.artist || "Choose a song to begin" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "heart", label: liked ? "Remove from Liked Songs" : "Add to Liked Songs", active: liked, filled: liked, disabled: !track || !likeReady || action.pending, onPress: () => {
          const uri = track?.uri;
          if (uri) void action.act(async () => {
            if (liked) import_spotifyplus5.SpotifyPlus.Library.unlike(uri);
            else import_spotifyplus5.SpotifyPlus.Library.like(uri);
            if (currentUri.current === uri) setLiked((value) => !value);
          });
        } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react7.Slider, { width: "100%", height: 44, min: 0, max: Math.max(1, duration), progress: Math.min(shown, duration || 1), disabled: disabled || !duration, progressTintColor: "#dce9ec", progressBackgroundTintColor: "#50ffffff", thumbTintColor: "#dce9ec", accessibilityLabel: "Playback position", onSlidingStart: (value) => {
        draggingUri.current = track?.uri;
        setDrag(value);
      }, onValueChange: setDrag, onSlidingComplete: (value) => {
        setDrag(null);
        if (track?.uri === draggingUri.current) void action.act(() => import_spotifyplus5.SpotifyPlus.Player.seek(Math.max(0, Math.min(duration, value))));
      } }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", justifyContent: "space-between", marginTop: -5, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 12, color: palette.secondary, children: timeLabel(shown) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 12, color: palette.secondary, children: timeLabel(duration) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 25, marginBottom: 24, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "shuffle", label: state?.shuffle ? "Disable shuffle" : "Enable shuffle", active: state?.shuffle, size: 44, disabled, onPress: () => {
          void action.act(() => import_spotifyplus5.SpotifyPlus.Player.toggleShuffle());
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "previous", label: "Previous track", size: 52, disabled, onPress: () => {
          void action.act(() => import_spotifyplus5.SpotifyPlus.Player.skipPrevious());
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: state?.isPlaying ? "pause" : "play", label: state?.isPlaying ? "Pause" : "Play", size: 76, disabled, onPress: () => {
          void action.act(() => import_spotifyplus5.SpotifyPlus.Player.togglePlay());
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "next", label: "Next track", size: 52, disabled, onPress: () => {
          void action.act(() => import_spotifyplus5.SpotifyPlus.Player.skipNext());
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "repeat", label: `Repeat: ${state?.repeat || "off"}. Change repeat mode`, active: !!state && state.repeat !== "off", size: 44, disabled, onPress: () => {
            void action.act(() => import_spotifyplus5.SpotifyPlus.Player.cycleRepeat());
          } }),
          state?.repeat === "repeat-one" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { position: "absolute", top: 15, left: 18, fontSize: 10, color: palette.accent, children: "1" }) : null
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Glass, { radius: 24, paddingHorizontal: 14, paddingVertical: 5, tint: 0.1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", alignItems: "center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 13, color: palette.secondary, children: "\u2212" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Volume, { flex: 1, height: 44, marginHorizontal: 8 }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { fontSize: 18, color: palette.secondary, children: "+" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { textAlign: "center", color: palette.muted, fontSize: 10, marginBottom: 4, children: "This device\u2019s volume" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.View, { flexDirection: "row", justifyContent: "space-between", marginTop: 18, paddingHorizontal: 18, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "lyrics", label: "Open Spotify player for lyrics", onPress: () => setNative(true) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "connect", label: "Choose a Spotify Connect device", active: sheet === "devices", onPress: () => setSheet("devices") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { name: "queue", label: "Show queue", active: sheet === "queue", onPress: () => setSheet("queue") })
      ] }),
      state?.isBuffering ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Label, { textAlign: "center", color: palette.secondary, fontSize: 12, marginTop: 14, children: "Buffering\u2026" }) : null,
      error || action.error ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react7.View, { marginTop: 16, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Notice, { message: action.error || error, onRetry: () => {
        void playback.refresh();
      } }) }) : null
    ] }) }),
    sheet ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Sheet, { kind: sheet, onClose: () => setSheet(null) }) : null
  ] });
}

// src/detail-screens.tsx
var import_react8 = require("react");
var import_spotifyplus6 = require("spotifyplus");
var import_react9 = require("spotifyplus/react");

// src/detail-model.ts
var pageSize = 30;
function detailUri(kind, route) {
  if (!route) return null;
  const legacyPlaylist = /^spotify:user:[^:]+:playlist:([A-Za-z0-9]+)$/.exec(route);
  if (kind === "playlist" && legacyPlaylist) return `spotify:playlist:${legacyPlaylist[1]}`;
  if (kind === "discography") return /^spotify:artist:([A-Za-z0-9]+)(?::(?:releases|albums|singles|compilations)(?::[^:]+)*)?$/.exec(route)?.[1] ? route.split(":").slice(0, 3).join(":") : null;
  return new RegExp(`^spotify:${kind}:[A-Za-z0-9]+$`).test(route) ? route : null;
}
async function loadDetail(api, kind, uri, offset = 0) {
  const result = {
    name: "",
    image: "",
    subtitle: "",
    description: "",
    rows: [],
    total: 0,
    nextOffset: offset,
    releases: []
  };
  let entries = [];
  if (kind === "album") {
    const album = await api.Internal.getAlbum(uri);
    if (!album) throw new Error("This album is unavailable.");
    result.name = album.name;
    result.image = album.image;
    result.subtitle = [album.artists.map((artist) => artist.name).join(", "), album.date.year || "", "Album"].filter(Boolean).join(" \xB7 ");
    const tracks = album.discs.flatMap((disc) => disc.tracks);
    result.total = tracks.length;
    entries = tracks.slice(offset, offset + pageSize).map((uri2, index) => ({
      uri: uri2,
      key: String(offset + index)
    }));
  } else if (kind === "playlist") {
    const [playlist, metadata] = await Promise.all([api.Playlists.get(uri, {
      offset,
      limit: pageSize
    }), api.Internal.getPlaylist(uri).catch(() => null)]);
    result.name = playlist.name;
    result.description = playlist.description;
    result.image = artworkUrl(playlist.imageUri) || artworkUrl(metadata?.picture);
    result.subtitle = [metadata?.ownerUsername, `${playlist.total} songs`, "Playlist"].filter(Boolean).join(" \xB7 ");
    result.total = playlist.total;
    entries = playlist.items.map((item, index) => ({
      uri: item.uri,
      key: `${offset + index}:${item.rowId}`,
      title: item.name
    }));
  } else {
    const artist = await api.Internal.getArtist(uri);
    if (!artist) throw new Error("This artist is unavailable.");
    result.name = artist.name;
    result.image = artist.image;
    result.subtitle = kind === "discography" ? "Discography" : "Artist";
    result.releases = [.../* @__PURE__ */ new Set([...artist.albums, ...artist.singles, ...artist.compilations, ...artist.appearsOn])];
    if (kind === "artist" && result.releases.length) {
      try {
        const album = await api.Internal.getAlbum(artist.singles[0] || result.releases[0]);
        if (album) result.featured = {
          key: album.uri,
          uri: album.uri,
          title: album.name,
          image: album.image,
          index: 0,
          subtitle: [album.date.year || "", album.type || "Album", `${album.discs.reduce((count, disc) => count + disc.tracks.length, 0)} songs`].filter(Boolean).join(" \xB7 ")
        };
      } catch {
      }
    }
    const tracks = artist.topTracks[0]?.tracks ?? [];
    const uris = kind === "discography" ? result.releases : tracks;
    result.total = uris.length;
    entries = uris.slice(offset, offset + pageSize).map((uri2, index) => ({
      uri: uri2,
      key: String(offset + index)
    }));
  }
  result.nextOffset = offset + entries.length;
  if (!entries.length && offset < result.total) throw new Error("Spotify returned an empty page. Try again or open the original Spotify view.");
  const rows = new Array(entries.length);
  let cursor = 0;
  await Promise.all(Array.from({
    length: Math.min(3, entries.length)
  }, async () => {
    while (cursor < entries.length) {
      const index = cursor++, entry = entries[index];
      const row = {
        ...entry,
        title: entry.title || "Unavailable item",
        subtitle: "",
        image: "",
        index: offset + index
      };
      try {
        if (kind === "discography") {
          const album = await api.Internal.getAlbum(entry.uri);
          if (album) {
            row.title = album.name;
            row.subtitle = [album.date.year || "", album.type || "Album"].filter(Boolean).join(" \xB7 ");
            row.image = album.image;
          }
        } else if (entry.uri.startsWith("spotify:track:")) {
          const track = await api.Internal.getTrack(entry.uri);
          if (track) {
            row.title = track.title;
            row.subtitle = kind === "artist" ? track.album.title : track.artist;
            row.image = track.album.image;
            row.duration = track.durationMs;
            row.explicit = track.explicit;
          }
        }
      } catch {
      }
      rows[index] = row;
    }
  }));
  result.rows = rows;
  if (kind === "playlist" && !result.image) result.image = rows.find((row) => row.image)?.image || "";
  return result;
}

// src/detail-screens.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function DetailScreen({
  kind,
  context,
  Original
}) {
  const route = context.pageUri || context.uri;
  const uri = detailUri(kind, route);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DetailSession, { kind, uri, Original }, `${kind}:${context.instanceId}:${uri}`);
}
function DetailSession({
  kind,
  uri,
  Original
}) {
  const [data, setData] = (0, import_react8.useState)();
  const [loading, setLoading] = (0, import_react8.useState)(true), [error, setError] = (0, import_react8.useState)(""), [native, setNative] = (0, import_react8.useState)(false);
  const [revision, setRevision] = (0, import_react8.useState)(0);
  const [saved, setSaved] = (0, import_react8.useState)(false), [saveReady, setSaveReady] = (0, import_react8.useState)(false);
  const live = (0, import_react8.useRef)(false), pending = (0, import_react8.useRef)(false);
  const action = useActions();
  const {
    state
  } = usePlayback();
  const valid = !!uri;
  const request = async (offset = 0) => {
    if (!uri || !valid || pending.current) return;
    pending.current = true;
    setLoading(true);
    setError("");
    try {
      const next = await loadDetail(import_spotifyplus6.SpotifyPlus, kind, uri, offset);
      if (live.current) setData((previous) => offset && previous ? {
        ...previous,
        rows: [...previous.rows, ...next.rows],
        total: next.total,
        nextOffset: next.nextOffset
      } : next);
    } catch (error2) {
      if (live.current) setError(describeError(error2));
    } finally {
      pending.current = false;
      if (live.current) setLoading(false);
    }
  };
  (0, import_react8.useEffect)(() => {
    live.current = true;
    void request();
    return () => {
      live.current = false;
    };
  }, [revision]);
  (0, import_react8.useEffect)(() => {
    setSaveReady(false);
    if (valid) {
      try {
        const [value] = import_spotifyplus6.SpotifyPlus.Library.contains([uri]);
        setSaved(value);
        setSaveReady(true);
      } catch {
      }
    }
  }, [uri, valid]);
  if (native || !valid) return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { width: "100%", height: "100%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Original, {}),
    valid ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Glass, { position: "absolute", top: 50, left: 22, padding: 14, onPress: () => setNative(false), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { color: palette.accent, children: "Return to glass" }) }) : null
  ] });
  const play = (index = 0, trackUri) => {
    void action.act(() => import_spotifyplus6.SpotifyPlus.Player.playContext(kind === "artist" && trackUri ? trackUri : uri, kind === "artist" && trackUri ? 0 : index));
  };
  const artist = kind === "artist", discography = kind === "discography";
  const toggleSaved = () => {
    void action.act(async () => {
      if (saved) import_spotifyplus6.SpotifyPlus.Library.remove(uri);
      else import_spotifyplus6.SpotifyPlus.Library.save(uri);
      if (live.current) setSaved((value) => !value);
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Scene, { artwork: data?.image, dim: 0.72, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react9.ScrollView, { width: "100%", flex: 1, showsVerticalScrollIndicator: false, fillViewport: true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { width: "100%", paddingBottom: 208, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { width: "100%", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Artwork, { source: data?.image, position: "absolute", top: 0, left: 0, width: "100%", height: artist ? 475 : 570, radius: 0, fadeBottom: true }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { flexDirection: "row", justifyContent: "space-between", position: "absolute", top: 56, left: 20, right: 20, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(IconButton, { name: "back", label: "Go back", onPress: () => import_spotifyplus6.SpotifyPlus.Navigation.back() }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Glass, { radius: 28, paddingHorizontal: 5, flexDirection: "row", alignItems: "center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react9.View, { width: 44, height: 46, alignItems: "center", justifyContent: "center", onPress: () => setNative(true), accessibilityLabel: "Open original Spotify view", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "info", size: 22 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react9.View, { width: 44, height: 46, alignItems: "center", justifyContent: "center", onPress: () => showMenu(uri), accessibilityLabel: "More options, including sharing", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "more", size: 23 }) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { paddingHorizontal: 22, paddingTop: artist ? 325 : 410, alignItems: "center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { textAlign: "center", fontSize: artist ? 36 : 29, fontWeight: "700", children: data?.name || (loading ? "Opening your music\u2026" : "Your music") }),
        !artist ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { textAlign: "center", marginTop: 9, fontSize: 14, color: palette.secondary, children: data?.subtitle || kind }) : null,
        !discography ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20, width: "100%", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(IconButton, { name: artist ? "info" : "shuffle", label: artist ? "Artist information in Spotify" : "Shuffle play", size: 48, disabled: action.pending || !artist && !data?.rows.length, onPress: () => {
            if (artist) setNative(true);
            else void action.act(async () => {
              await import_spotifyplus6.SpotifyPlus.Player.playContext(uri);
              import_spotifyplus6.SpotifyPlus.Player.setShuffle(true);
            });
          } }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { backgroundColor: "#ffffff", borderRadius: artist ? 40 : 30, width: artist ? 76 : "52%", minHeight: artist ? 76 : 56, flexDirection: "row", gap: 9, alignItems: "center", justifyContent: "center", opacity: action.pending || !data?.rows.length ? 0.5 : 1, disabled: action.pending || !data?.rows.length, onPress: () => play(), accessibilityLabel: `Play ${data?.name || kind}`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "play", size: artist ? 33 : 23, color: "#30252a" }),
            !artist ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { color: "#30252a", fontSize: 18, fontWeight: "600", children: "Play" }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(IconButton, { name: saved ? "heart" : "plus", filled: saved, active: saved, label: saved ? "Remove from your library" : artist ? "Follow artist" : "Save to your library", size: 48, disabled: !saveReady || action.pending, onPress: toggleSaved })
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { paddingHorizontal: 20, width: "100%", children: [
      data?.description ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { marginTop: 22, lineHeight: 22, fontSize: 14, color: palette.secondary, children: data.description }) : null,
      error || action.error ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react9.View, { marginTop: 20, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Notice, { message: error || action.error, onRetry: () => {
        if (data) void request(data.nextOffset);
        else setRevision((value) => value + 1);
      } }) }) : null,
      artist && data?.featured ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Glass, { marginTop: 26, padding: 12, radius: 29, flexDirection: "row", alignItems: "center", onPress: () => openSpotify(data.featured.uri), onLongPress: () => showMenu(data.featured.uri), accessibilityLabel: `Open ${data.featured.title}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Artwork, { source: data.featured.image, width: 88, height: 88, radius: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { flex: 1, marginLeft: 13, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { color: palette.secondary, fontSize: 11, marginBottom: 7, children: "FEATURED RELEASE" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { fontWeight: "600", fontSize: 15, numberOfLines: 2, children: data.featured.title }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { color: palette.secondary, marginTop: 6, fontSize: 12, children: data.featured.subtitle })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "arrow", size: 18 })
      ] }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { marginTop: 26, width: "100%", children: [
        artist || discography ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { fontSize: 23, fontWeight: "600", marginBottom: 14, children: discography ? "Releases" : "Top songs" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react9.View, { height: 1, width: "100%", backgroundColor: "#25ffffff" }),
        loading ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Notice, { message: "Gathering your music\u2026" }) : null,
        data?.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { paddingVertical: 10, minHeight: 60, flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderColor: "#20ffffff", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { flex: 1, flexDirection: "row", alignItems: "center", disabled: action.pending, onPress: () => kind === "discography" || !row.uri.startsWith("spotify:track:") ? openSpotify(row.uri) : play(row.index, row.uri), onLongPress: () => showMenu(row.uri), accessibilityLabel: `${kind === "discography" ? "Open" : "Play"} ${row.title}`, children: [
            kind === "album" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { width: 28, fontSize: 12, color: palette.secondary, children: row.index + 1 }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Artwork, { source: row.image, width: 50, height: 50, radius: 12 }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { flex: 1, marginLeft: kind === "album" ? 0 : 12, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react9.View, { flexDirection: "row", alignItems: "center", gap: 6, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { flexShrink: 1, fontSize: 16, numberOfLines: 2, color: state?.trackUri === row.uri ? palette.accent : palette.text, children: row.title }),
                row.explicit ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react9.View, { backgroundColor: "#70ffffff", borderRadius: 3, width: 13, height: 13, alignItems: "center", justifyContent: "center", accessibilityLabel: "Explicit", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { fontSize: 9, color: "#30252a", children: "E" }) }) : null
              ] }),
              kind !== "album" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { fontSize: 12, color: palette.secondary, marginTop: 5, numberOfLines: 1, children: row.subtitle || "Metadata unavailable" }) : null
            ] }),
            row.duration ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Label, { color: palette.muted, fontSize: 11, marginLeft: 8, children: timeLabel(row.duration) }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react9.View, { width: 44, height: 44, alignItems: "center", justifyContent: "center", onPress: () => showMenu(row.uri), accessibilityLabel: `More options for ${row.title}`, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "more", size: 18 }) })
        ] }, row.key)),
        !loading && !error && data && !data.rows.length ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Notice, { message: "No music is available here yet." }) : null,
        data && data.nextOffset < data.total ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Pill, { onPress: () => {
          if (!loading) void request(data.nextOffset);
        }, children: loading ? "Loading\u2026" : "Load more" }) : null
      ] }),
      kind === "artist" && data?.releases.length ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Section, { title: "Albums and releases", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Pill, { onPress: () => openSpotify(`${uri}:releases`), children: "Explore discography" }) }) : null
    ] })
  ] }) }) });
}
var AlbumScreen = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DetailScreen, { ...props, kind: "album" });
var PlaylistScreen = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DetailScreen, { ...props, kind: "playlist" });
var ArtistScreen = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DetailScreen, { ...props, kind: "artist" });
var DiscographyScreen = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DetailScreen, { ...props, kind: "discography" });

// src/menu-screens.tsx
var import_spotifyplus7 = require("spotifyplus");
var import_react10 = require("spotifyplus/react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function MenuScreen({
  context,
  Original,
  NativePart,
  drawer = false
}) {
  const action = useActions();
  if (!context.parts?.length) return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Original, {});
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Scene, { compact: true, dim: 0.5, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react10.ScrollView, { width: "100%", flex: 1, fillViewport: true, showsVerticalScrollIndicator: false, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_react10.View, { paddingHorizontal: 18, paddingTop: drawer ? 54 : 24, paddingBottom: 40, width: "100%", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { fontSize: drawer ? 30 : 23, fontWeight: "600", marginBottom: 8, children: drawer ? "Your space" : context.title || "More options" }),
    context.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { color: palette.secondary, fontSize: 13, marginBottom: 18, children: context.subtitle }) : null,
    action.error ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Notice, { message: action.error }) : null,
    context.parts.map((part) => part.kind === "action" && part.title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Glass, { paddingHorizontal: 18, paddingVertical: 15, radius: 22, marginTop: 9, minHeight: 56, flexDirection: "row", alignItems: "center", disabled: !part.enabled || action.pending, opacity: part.enabled ? 1 : 0.45, accessibilityLabel: part.title, onPress: () => {
      void action.act(() => import_spotifyplus7.SpotifyPlus.UI.invokeAction(context.instanceId, part.id));
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Label, { flex: 1, fontSize: 15, children: part.title }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "arrow", size: 17, color: palette.secondary })
    ] }, part.id) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Glass, { radius: 24, padding: 8, marginTop: 10, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(NativePart, { id: part.id }) }, part.id))
  ] }) }) });
}
var DrawerScreen = (props) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MenuScreen, { ...props, drawer: true });
var ContextMenuScreen = (props) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MenuScreen, { ...props });

// src/controller.ts
function createThemeController(ui, renderers2) {
  const registrations = /* @__PURE__ */ new Map();
  const listeners2 = /* @__PURE__ */ new Set();
  let snapshot = [];
  const publish = () => {
    snapshot = [...registrations.keys()];
    listeners2.forEach((listener) => listener());
  };
  return {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      listeners2.add(listener);
      return () => {
        listeners2.delete(listener);
      };
    },
    toggle(target) {
      const existing = registrations.get(target);
      if (existing) {
        existing.dispose();
        registrations.delete(target);
      } else registrations.set(target, ui.replace(target, renderers2[target]));
      publish();
    },
    enable(targets = screenTargets) {
      const created = [];
      try {
        for (const target of targets) if (!registrations.has(target)) {
          registrations.set(target, ui.replace(target, renderers2[target]));
          created.push(target);
        }
      } catch (error) {
        for (const target of created) {
          registrations.get(target)?.dispose();
          registrations.delete(target);
        }
        throw error;
      } finally {
        publish();
      }
    },
    disable() {
      registrations.forEach((registration) => registration.dispose());
      registrations.clear();
      publish();
    }
  };
}

// src/index.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var renderers = {
  "home.page": HomeScreen,
  "search.page": SearchScreen,
  "library.page": LibraryScreen,
  "nowPlaying.page": NowPlayingScreen,
  "miniPlayer.root": MiniPlayer,
  "album.page": AlbumScreen,
  "playlist.page": PlaylistScreen,
  "artist.page": ArtistScreen,
  "artist.discography.page": DiscographyScreen,
  "navigation.drawer": DrawerScreen,
  "contextMenu.root": ContextMenuScreen
};
var controller = createThemeController(import_spotifyplus8.SpotifyPlus.UI, renderers);
var names = {
  "home.page": "Home",
  "search.page": "Search",
  "library.page": "Library",
  "nowPlaying.page": "Now Playing",
  "miniPlayer.root": "Mini-player",
  "album.page": "Albums",
  "playlist.page": "Playlists",
  "artist.page": "Artists",
  "artist.discography.page": "Discography",
  "navigation.drawer": "Side drawer",
  "contextMenu.root": "Context menus"
};
function Controls() {
  const enabled = (0, import_react11.useSyncExternalStore)(controller.subscribe, controller.getSnapshot);
  const reduced2 = useReducedMotion();
  const [status, setStatus] = (0, import_react11.useState)("");
  const [busy, setBusy] = (0, import_react11.useState)(false);
  const [preview, setPreview] = (0, import_react11.useState)(null);
  const inspect = async () => {
    const results = await Promise.all(screenTargets.map((target) => import_spotifyplus8.SpotifyPlus.UI.inspect(target)));
    const unavailable = results.filter((info) => !info.available || !info.operations.includes("replace"));
    const conflicts = results.filter((info) => info.conflicts.some((conflict) => conflict.winner !== import_spotifyplus8.SpotifyPlus.scriptId));
    return {
      unavailable,
      conflicts,
      supported: results.filter((info) => info.available && info.operations.includes("replace")).map((info) => info.name)
    };
  };
  const enable = async () => {
    setBusy(true);
    setStatus("");
    try {
      const {
        unavailable,
        supported
      } = await inspect();
      controller.enable(supported);
      const {
        conflicts
      } = await inspect();
      setStatus((conflicts.length ? "Another extension owns some views. Restore the other showcase or change UI extension order in Spotify Plus settings." : "Available glass views are enabled for this session. Close this view to explore Spotify.") + (unavailable.length ? `
Unavailable on this build: ${unavailable.map((info) => names[info.name]).join(", ")}.` : ""));
    } catch (error) {
      setStatus(describeError(error));
    } finally {
      setBusy(false);
    }
  };
  const toggle = async (target) => {
    if (busy) return;
    setBusy(true);
    try {
      if (!enabled.includes(target)) {
        const info = await import_spotifyplus8.SpotifyPlus.UI.inspect(target);
        if (!info.available || !info.operations.includes("replace")) {
          setStatus(info.reason || `${names[target]} is unavailable on this Spotify build.`);
          return;
        }
      }
      controller.toggle(target);
    } catch (error) {
      setStatus(describeError(error));
    } finally {
      setBusy(false);
    }
  };
  const showPreview = async (target) => {
    if (busy) return;
    setBusy(true);
    try {
      let uri = null;
      const kind = target === "artist.discography.page" ? "artist" : target.split(".")[0];
      if (["album", "playlist", "artist"].includes(kind)) {
        const instance = (await import_spotifyplus8.SpotifyPlus.UI.listInstances(target))[0];
        uri = instance?.context.pageUri || instance?.context.uri || null;
        if (!uri) uri = (await import_spotifyplus8.SpotifyPlus.Library.list({
          type: kind,
          limit: 1
        })).items[0]?.uri || null;
        if (!uri) {
          setStatus(`Open a ${kind} in Spotify or save one to your library to preview this view.`);
          return;
        }
      }
      setPreview({
        target,
        context: {
          instanceId: "glass-preview",
          uri,
          pageUri: uri
        }
      });
    } catch (error) {
      setStatus(describeError(error));
    } finally {
      setBusy(false);
    }
  };
  if (preview) {
    const Renderer = renderers[preview.target];
    const content = /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Renderer, { context: preview.context, Original: () => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Notice, { message: "Open this view in Spotify with the theme enabled to use its native content." }), NativePart: () => null });
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react12.View, { width: "100%", height: "100%", children: [
      content,
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconButton, { name: "close", label: "Close preview", position: "absolute", top: 8, right: 12, size: 44, onPress: () => setPreview(null) })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react12.View, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react12.View, { flex: 1, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { fontSize: 37, fontWeight: "600", children: "Liquid Glass" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IconButton, { name: "close", label: "Close theme controls", onPress: () => import_spotifyplus8.SpotifyPlus.Surfaces.close() })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { fontSize: 16, color: palette.secondary, lineHeight: 24, marginTop: 14, marginBottom: 22, children: "Your music, in a different light. Flowing artwork, soft glass and a little room to breathe." }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Glass, { padding: 22, radius: 30, selected: true, marginBottom: 16, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { fontSize: 21, fontWeight: "600", children: enabled.length ? `${enabled.length} glass views active` : "Make it yours" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { color: palette.secondary, fontSize: 13, marginTop: 10, marginBottom: 18, children: "This theme has its own controls. Enable it for this session or preview each screen below." }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react12.View, { flexDirection: "row", gap: 10, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Pill, { selected: true, onPress: () => {
          if (!busy) void enable();
        }, children: busy ? "Checking\u2026" : "Enable all screens" }),
        enabled.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Pill, { onPress: () => {
          controller.disable();
          setStatus("Spotify screens restored.");
        }, children: "Restore Spotify" }) : null
      ] })
    ] }),
    status ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Notice, { message: status }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Section, { title: "Your music, through glass", children: screenTargets.map((target) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Glass, { padding: 17, radius: 23, marginBottom: 10, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react12.View, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { flex: 1, flexShrink: 1, numberOfLines: 2, fontSize: 16, children: names[target] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react12.View, { flexDirection: "row", gap: 8, children: [
        target !== "navigation.drawer" && target !== "contextMenu.root" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Pill, { onPress: () => {
          void showPreview(target);
        }, children: "Preview" }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Pill, { selected: enabled.includes(target), onPress: () => {
          void toggle(target);
        }, children: enabled.includes(target) ? "On" : "Off" })
      ] })
    ] }) }, target)) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Section, { title: "Set the pace", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Glass, { padding: 18, radius: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react12.View, { flex: 1, marginRight: 16, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { children: "Reduced motion" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Label, { fontSize: 12, color: palette.secondary, marginTop: 6, children: "A still background and instant artwork changes." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Pill, { selected: reduced2, onPress: () => setReducedMotion(!reduced2), children: reduced2 ? "On" : "Off" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react12.View, { marginTop: 24, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Pill, { onPress: () => openSpotify("spotify:home"), children: "Go to Home" }) })
  ] });
}
new import_spotifyplus8.SpotifyPlus.SideDrawer("Liquid Glass", () => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Controls, {})).register();
