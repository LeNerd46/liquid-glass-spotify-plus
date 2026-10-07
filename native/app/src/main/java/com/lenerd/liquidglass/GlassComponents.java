package com.lenerd.liquidglass;

import android.content.Context;
import android.view.View;
import com.lenerd.spotifyplus.sdk.SpotifyPlusComponent;
import com.lenerd.spotifyplus.sdk.SpotifyPlusRegistry;
import com.lenerd.spotifyplus.sdk.spotify.SpotifyPlusContext;
import org.json.JSONObject;

/** Extension-owned primitives registered through the public Java SDK. */
public final class GlassComponents {
    private GlassComponents() { }
    public static void register(SpotifyPlusRegistry registry) {
        registry.registerComponent(new SpotifyPlusComponent<GlassSceneView>() {
            public String getName() { return "LiquidGlassScene"; }
            public GlassSceneView createView(Context context, SpotifyPlusContext spotify) { return new GlassSceneView(context); }
            public void updateProps(GlassSceneView view, JSONObject old, JSONObject props) { view.update(props); }
            public void onDropView(View view) { ((GlassSceneView) view).release(); }
        });
        registry.registerComponent(new SpotifyPlusComponent<GlassPanelView>() {
            public String getName() { return "LiquidGlassPanel"; }
            public GlassPanelView createView(Context context, SpotifyPlusContext spotify) { return new GlassPanelView(context); }
            public void updateProps(GlassPanelView view, JSONObject old, JSONObject props) { view.update(props); }
            public void onDropView(View view) { ((GlassPanelView) view).release(); }
        });
        registry.registerComponent(new SpotifyPlusComponent<GlassArtworkView>() {
            public String getName() { return "LiquidGlassArtwork"; }
            public GlassArtworkView createView(Context context, SpotifyPlusContext spotify) { return new GlassArtworkView(context); }
            public void updateProps(GlassArtworkView view, JSONObject old, JSONObject props) { view.update(props); }
            public void onDropView(View view) { ((GlassArtworkView) view).release(); }
        });
        registry.registerComponent(new SpotifyPlusComponent<GlassVolumeView>() {
            public String getName() { return "LiquidGlassVolume"; }
            public GlassVolumeView createView(Context context, SpotifyPlusContext spotify) { return new GlassVolumeView(context); }
            public void updateProps(GlassVolumeView view, JSONObject old, JSONObject props) { view.bind(); }
            public void onDropView(View view) { ((GlassVolumeView) view).release(); }
        });
    }
}
