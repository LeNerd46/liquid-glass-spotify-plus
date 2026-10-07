package com.lenerd.liquidglass;

import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.RadialGradient;
import android.graphics.Shader;
import android.graphics.BitmapFactory;
import android.os.Handler;
import android.os.Looper;
import android.util.LruCache;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.function.Consumer;

/** One bounded cache and deduplicated download pipeline shared by every glass surface. */
final class ArtworkRepository {
    static final class Artwork {
        final Bitmap cover;
        final Bitmap frost;
        final Shader[] clouds = new Shader[3];
        Artwork(Bitmap cover) {
            this.cover = cover;
            // A small, filtered image is deliberately blurred before being enlarged on Canvas.
            Bitmap small = Bitmap.createScaledBitmap(cover, 32, 32, true);
            int[] source = new int[1024], pixels = new int[1024];
            small.getPixels(source, 0, 32, 0, 0, 32, 32);
            for (int y = 0; y < 32; y++) for (int x = 0; x < 32; x++) {
                int r = 0, g = 0, b = 0, count = 0;
                for (int dy = -3; dy <= 3; dy++) for (int dx = -3; dx <= 3; dx++) {
                    int c = source[Math.max(0, Math.min(31, y + dy)) * 32 + Math.max(0, Math.min(31, x + dx))];
                    r += (c >> 16) & 255; g += (c >> 8) & 255; b += c & 255; count++;
                }
                pixels[y * 32 + x] = 0xff000000 | (r / count << 16) | (g / count << 8) | b / count;
            }
            frost = Bitmap.createBitmap(pixels, 32, 32, Bitmap.Config.ARGB_8888);
            // Sample different regions so the flowing highlights belong to this album.
            for (int i = 0; i < clouds.length; i++) {
                int color = pixels[(8 + i * 8) * 32 + (8 + i * 7)];
                float[] hsv = new float[3]; Color.colorToHSV(color, hsv);
                hsv[1] = Math.min(1, hsv[1] * 1.4f);
                hsv[2] = Math.min(.88f, Math.max(.34f, hsv[2] * 1.35f));
                int vivid = Color.HSVToColor(hsv);
                clouds[i] = new RadialGradient(0, 0, 1, new int[]{vivid, vivid & 0x00ffffff}, null, Shader.TileMode.CLAMP);
            }
            if (small != cover) small.recycle();
        }
    }
    private static final Handler MAIN = new Handler(Looper.getMainLooper());
    private static final ExecutorService WORKER = Executors.newFixedThreadPool(2);
    private static final LruCache<String, Artwork> CACHE = new LruCache<>(12 * 1024 * 1024) {
        @Override protected int sizeOf(String key, Artwork value) {
            return value.cover.getAllocationByteCount() + value.frost.getAllocationByteCount();
        }
    };
    private static final Map<String, List<Consumer<Artwork>>> PENDING = new HashMap<>();

    static String normalize(String input) {
        if (input == null) return "";
        if (input.matches("spotify:image:[a-fA-F0-9]{40}")) return "https://i.scdn.co/image/" + input.substring(14);
        return input.startsWith("https://") ? input : "";
    }
    // Invoked on the UI thread. Null is a completed failure, never an unhandled callback.
    static void load(String input, Consumer<Artwork> callback) {
        String url = normalize(input);
        if (url.isEmpty()) { callback.accept(null); return; }
        Artwork cached = CACHE.get(url);
        if (cached != null) { callback.accept(cached); return; }
        List<Consumer<Artwork>> waiting = PENDING.get(url);
        if (waiting != null) { waiting.add(callback); return; }
        waiting = new ArrayList<>(); waiting.add(callback); PENDING.put(url, waiting);
        WORKER.execute(() -> {
            Artwork artwork = null;
            HttpURLConnection connection = null;
            try {
                connection = (HttpURLConnection) new URL(url).openConnection();
                connection.setConnectTimeout(6000); connection.setReadTimeout(6000);
                if (connection.getResponseCode() == 200) {
                    // Limit input bytes before decoding. Cover dimensions are sampled to <= 1024.
                    byte[] data;
                    try (InputStream inputStream = connection.getInputStream()) {
                        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
                        byte[] buffer = new byte[8192]; int count;
                        while ((count = inputStream.read(buffer)) != -1 && bytes.size() <= 8 * 1024 * 1024) bytes.write(buffer, 0, count);
                        data = bytes.toByteArray();
                    }
                    if (data.length <= 8 * 1024 * 1024) {
                        BitmapFactory.Options bounds = new BitmapFactory.Options(); bounds.inJustDecodeBounds = true;
                        BitmapFactory.decodeByteArray(data, 0, data.length, bounds);
                        BitmapFactory.Options options = new BitmapFactory.Options(); options.inSampleSize = 1;
                        while (Math.max(bounds.outWidth, bounds.outHeight) / options.inSampleSize > 1024) options.inSampleSize *= 2;
                        Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0, data.length, options);
                        if (bitmap != null) artwork = new Artwork(bitmap);
                    }
                }
            } catch (Exception ignored) { /* Neutral artwork remains available offline. */ }
            finally { if (connection != null) connection.disconnect(); }
            Artwork result = artwork;
            MAIN.post(() -> {
                if (result != null) CACHE.put(url, result);
                List<Consumer<Artwork>> callbacks = PENDING.remove(url);
                if (callbacks != null) for (Consumer<Artwork> consumer : callbacks) consumer.accept(result);
            });
        });
    }
}
