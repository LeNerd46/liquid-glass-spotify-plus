package com.lenerd.liquidglass;

import android.content.Context;
import android.graphics.*;
import android.os.SystemClock;
import android.view.View;
import org.json.JSONObject;
import java.lang.ref.WeakReference;

/** Saturated artwork diffusion, flowing color clouds and a 700 ms album crossfade. */
public final class GlassSceneView extends GlassLayout {
    private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG | Paint.FILTER_BITMAP_FLAG);
    private final RectF rect = new RectF();
    private final ColorMatrixColorFilter saturation;
    private final Shader[] fallbackClouds = new Shader[3];
    private ArtworkRepository.Artwork current, previous;
    private String source = "";
    private int generation;
    private long changedAt;
    private boolean ambient = true;
    private float dim = .32f;
    private final Runnable frame = new Runnable() {
        @Override public void run() {
            if (isAttachedToWindow() && isShown() && getWindowVisibility() == VISIBLE && motionAllowed()) {
                invalidate(); invalidatePanels(GlassSceneView.this);
                if (ambient || previous != null) postDelayed(this, 33);
            }
        }
    };
    public GlassSceneView(Context context) {
        super(context);
        ColorMatrix colors = new ColorMatrix(); colors.setSaturation(1.65f);
        saturation = new ColorMatrixColorFilter(colors);
        int[] colorsFallback = {0xff9944b4, 0xffde5477, 0xff368eaa};
        for (int i = 0; i < fallbackClouds.length; i++) fallbackClouds[i] = new RadialGradient(0, 0, 1,
                new int[]{colorsFallback[i], colorsFallback[i] & 0x00ffffff}, null, Shader.TileMode.CLAMP);
    }
    void update(JSONObject props) {
        reduceMotion = props.optBoolean("reduceMotion", false);
        ambient = props.optBoolean("animated", true);
        dim = Math.max(0, Math.min(.8f, (float) props.optDouble("dim", .32)));
        String next = ArtworkRepository.normalize(props.optString("artwork", ""));
        if (!source.equals(next)) {
            source = next; int request = ++generation;
            WeakReference<GlassSceneView> reference = new WeakReference<>(this);
            ArtworkRepository.load(next, artwork -> {
                GlassSceneView view = reference.get();
                if (view == null || request != view.generation) return;
                view.previous = view.motionAllowed() ? view.current : null;
                view.current = artwork; view.changedAt = SystemClock.uptimeMillis();
                view.invalidate(); view.schedule();
            });
        }
        if (!motionAllowed()) previous = null;
        invalidate(); schedule();
    }
    private void schedule() {
        removeCallbacks(frame);
        if (isAttachedToWindow() && isShown() && getWindowVisibility() == VISIBLE && motionAllowed() && (ambient || previous != null)) post(frame);
    }
    @Override protected void onAttachedToWindow() { super.onAttachedToWindow(); schedule(); }
    @Override protected void onVisibilityChanged(View changed, int visibility) { super.onVisibilityChanged(changed, visibility); if (frame != null) schedule(); }
    @Override protected void onWindowVisibilityChanged(int visibility) { super.onWindowVisibilityChanged(visibility); if (frame != null) schedule(); }
    @Override void release() { super.release(); removeCallbacks(frame); }
    @Override protected void onDraw(Canvas canvas) { drawBackdrop(canvas, getWidth(), getHeight()); }
    void drawBackdrop(Canvas canvas, int width, int height) {
        drawBackdropAt(canvas, width, height, SystemClock.uptimeMillis());
    }
    void drawBackdropAt(Canvas canvas, int width, int height, long time) {
        if (width <= 0 || height <= 0) return;
        paint.setShader(new LinearGradient(0, 0, width, height, new int[]{0xff391440, 0xff573749, 0xff142c3b}, null, Shader.TileMode.CLAMP));
        paint.setAlpha(255); canvas.drawRect(0, 0, width, height, paint); paint.setShader(null);
        float mix = !motionAllowed() ? 1 : Math.max(0, Math.min(1, (time - changedAt) / 700f));
        if (previous != null) drawArtwork(canvas, previous, width, height, 1 - mix, time);
        if (current != null) drawArtwork(canvas, current, width, height, previous == null ? 1 : mix, time);
        if (current == null && previous == null) drawClouds(canvas, fallbackClouds, width, height, 1, time);
        if (mix >= 1) previous = null;
        paint.setColor(Color.argb((int) (255 * dim), 10, 12, 24)); canvas.drawRect(0, 0, width, height, paint);
        paint.setShader(new LinearGradient(0, 0, 0, height, new int[]{0x08000000, 0x180e1020, 0xa6080c18}, null, Shader.TileMode.CLAMP));
        paint.setAlpha(255);
        canvas.drawRect(0, 0, width, height, paint); paint.setShader(null);
    }
    private void drawArtwork(Canvas canvas, ArtworkRepository.Artwork artwork, int width, int height, float alpha, long time) {
        float phase = ambient && motionAllowed() ? time / 6000f : 0;
        float side = Math.max(width, height) * 1.55f;
        float x = (width - side) / 2 + (float) Math.sin(phase) * width * .22f;
        float y = (height - side) / 2 + (float) Math.cos(phase * .73f) * height * .14f;
        rect.set(x, y, x + side, y + side); paint.setAlpha((int) (255 * alpha));
        paint.setColorFilter(saturation);
        canvas.drawBitmap(artwork.frost, null, rect, paint);
        paint.setColorFilter(null); paint.setAlpha(255);
        drawClouds(canvas, artwork.clouds, width, height, alpha, time);
    }
    private void drawClouds(Canvas canvas, Shader[] clouds, int width, int height, float alpha, long time) {
        float phase = ambient && motionAllowed() ? time / 6000f : 0;
        for (int i = 0; i < clouds.length; i++) {
            float x = width * (.5f + .38f * (float) Math.sin(phase * (1 + i * .16f) + i * 2.1f));
            float y = height * (.45f + .32f * (float) Math.cos(phase * .8f + i * 1.7f));
            float radius = Math.max(width, height) * (.65f + .08f * (float) Math.sin(phase + i));
            int save = canvas.save(); canvas.translate(x, y); canvas.scale(radius, radius);
            paint.setShader(clouds[i]); paint.setAlpha((int) (alpha * 112));
            canvas.drawCircle(0, 0, 1, paint); canvas.restoreToCount(save);
        }
        paint.setShader(null); paint.setAlpha(255);
    }
    private static void invalidatePanels(android.view.ViewGroup group) {
        for (int i = 0; i < group.getChildCount(); i++) {
            View child = group.getChildAt(i);
            if (child instanceof GlassPanelView) child.invalidate();
            if (child instanceof android.view.ViewGroup nested) invalidatePanels(nested);
        }
    }
}
