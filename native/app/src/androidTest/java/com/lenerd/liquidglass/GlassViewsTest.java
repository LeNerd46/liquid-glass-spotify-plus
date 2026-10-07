package com.lenerd.liquidglass;

import android.graphics.*;
import android.view.View;
import android.widget.TextView;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import com.lenerd.spotifyplus.sdk.SpotifyPlusComponent;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
public class GlassViewsTest {
    @Test public void ambientFramesMoveAndReducedMotionIsStable() {
        InstrumentationRegistry.getInstrumentation().runOnMainSync(() -> {
            try {
                var context = InstrumentationRegistry.getInstrumentation().getTargetContext();
                GlassSceneView scene = new GlassSceneView(context);
                Bitmap first = Bitmap.createBitmap(240, 400, Bitmap.Config.ARGB_8888);
                Bitmap second = Bitmap.createBitmap(240, 400, Bitmap.Config.ARGB_8888);
                scene.update(new JSONObject("{animated:true,reduceMotion:false}"));
                scene.drawBackdropAt(new Canvas(first), 240, 400, 0);
                scene.drawBackdropAt(new Canvas(second), 240, 400, 9000);
                if (android.animation.ValueAnimator.areAnimatorsEnabled()) assertFalse("Ambient colors should visibly flow", first.sameAs(second));
                scene.update(new JSONObject("{animated:true,reduceMotion:true}"));
                scene.drawBackdropAt(new Canvas(first), 240, 400, 0);
                scene.drawBackdropAt(new Canvas(second), 240, 400, 9000);
                assertTrue("Reduced motion must hold the background still", first.sameAs(second));
                scene.release(); first.recycle(); second.recycle();
            } catch (Exception exception) { throw new RuntimeException(exception); }
        });
    }
    @Test public void pluginRegistersItsOwnComponentsAndDrawingPreservesYogaChildPositions() {
        InstrumentationRegistry.getInstrumentation().runOnMainSync(() -> {
            try {
                List<SpotifyPlusComponent<?>> components = new ArrayList<>();
                new NativePlugin().register(components::add, null);
                assertEquals(4, components.size());
                var context = InstrumentationRegistry.getInstrumentation().getTargetContext();
                GlassSceneView scene = new GlassSceneView(context);
                scene.update(new JSONObject("{reduceMotion:true}"));
                GlassPanelView panel = new GlassPanelView(context);
                panel.update(new JSONObject("{radius:24}"));
                scene.addView(panel);
                TextView label = new TextView(context); label.setText("Clear text on frosted glass"); label.setTextColor(Color.WHITE);
                panel.addView(label);
                scene.measure(View.MeasureSpec.makeMeasureSpec(480, View.MeasureSpec.EXACTLY), View.MeasureSpec.makeMeasureSpec(800, View.MeasureSpec.EXACTLY));
                scene.layout(0, 0, 480, 800);
                panel.measure(View.MeasureSpec.makeMeasureSpec(400, View.MeasureSpec.EXACTLY), View.MeasureSpec.makeMeasureSpec(140, View.MeasureSpec.EXACTLY));
                panel.layout(40, 100, 440, 240);
                label.measure(View.MeasureSpec.makeMeasureSpec(320, View.MeasureSpec.EXACTLY), View.MeasureSpec.makeMeasureSpec(60, View.MeasureSpec.EXACTLY));
                label.layout(24, 36, 344, 96);
                panel.layout(40, 100, 440, 240);
                assertEquals(24, label.getLeft()); assertEquals(36, label.getTop());
                Bitmap bitmap = Bitmap.createBitmap(480, 800, Bitmap.Config.ARGB_8888);
                scene.draw(new Canvas(bitmap));
                assertNotEquals("Frosted panel should differ from the scene", bitmap.getPixel(48, 180), bitmap.getPixel(200, 180));
                assertEquals(255, Color.alpha(bitmap.getPixel(240, 400)));
                scene.release(); panel.release(); bitmap.recycle();
            } catch (Exception exception) { throw new RuntimeException(exception); }
        });
    }
    @Test public void artworkDiffusionRetainsAlbumColorsWithoutKeepingSharpDetails() {
        Bitmap input = Bitmap.createBitmap(256, 256, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(input); Paint paint = new Paint();
        paint.setColor(Color.BLUE); canvas.drawRect(0, 0, 128, 256, paint);
        paint.setColor(Color.RED); canvas.drawRect(128, 0, 256, 256, paint);
        ArtworkRepository.Artwork artwork = new ArtworkRepository.Artwork(input);
        int edge = artwork.frost.getPixel(15, 16);
        assertTrue(Color.red(edge) > 0 && Color.blue(edge) > 0);
        assertEquals(32, artwork.frost.getWidth());
        assertEquals("https://i.scdn.co/image/" + "a".repeat(40), ArtworkRepository.normalize("spotify:image:" + "a".repeat(40)));
        input.recycle(); artwork.frost.recycle();
    }
}
