package com.lenerd.liquidglass;

import com.lenerd.spotifyplus.sdk.SpotifyPlusPlugin;
import com.lenerd.spotifyplus.sdk.SpotifyPlusRegistry;
import com.lenerd.spotifyplus.sdk.spotify.SpotifyPlusContext;

public final class NativePlugin implements SpotifyPlusPlugin {
    @Override public void register(SpotifyPlusRegistry registry, SpotifyPlusContext context) {
        GlassComponents.register(registry);
    }
}
