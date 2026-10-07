package com.lenerd.liquidglass;

import android.content.Context;
import android.graphics.*;
import android.os.SystemClock;
import android.view.View;
import org.json.JSONObject;
import java.lang.ref.WeakReference;

public final class GlassArtworkView extends View {
    private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG | Paint.FILTER_BITMAP_FLAG);
    private final RectF rect = new RectF();
    private final Path clip = new Path();
    private ArtworkRepository.Artwork current, previous;
    private String source = "";
    private int generation;
    private long changedAt;
    private float radius = 16;
    private boolean reduceMotion, fadeBottom;
    public GlassArtworkView(Context context) { super(context); }
    void update(JSONObject props) {
        reduceMotion = props.optBoolean("reduceMotion", false);
        fadeBottom = props.optBoolean("fadeBottom", false);
        radius = (float) props.optDouble("radius", 16) * getResources().getDisplayMetrics().density;
        String next = ArtworkRepository.normalize(props.optString("artwork", ""));
        if (!source.equals(next)) {
            source = next; int request = ++generation;
            WeakReference<GlassArtworkView> reference = new WeakReference<>(this);
            ArtworkRepository.load(next, artwork -> {
                GlassArtworkView view = reference.get();
                if (view == null || request != view.generation) return;
                view.previous = view.motionAllowed() ? view.current : null;
                view.current = artwork; view.changedAt = SystemClock.uptimeMillis(); view.invalidate();
            });
        }
        if (!motionAllowed()) previous = null;
        invalidate();
    }
    private boolean motionAllowed() { return !reduceMotion && android.animation.ValueAnimator.areAnimatorsEnabled(); }
    @Override protected void onDraw(Canvas canvas) {
        rect.set(0, 0, getWidth(), getHeight()); clip.rewind(); clip.addRoundRect(rect, radius, radius, Path.Direction.CW);
        int save = canvas.save(); canvas.clipPath(clip);
        // The layer's DstIn alpha mask reveals the live scene beneath the hero artwork.
        int layer = fadeBottom ? canvas.saveLayer(rect, null) : -1;
        paint.setColor(0xff59546f); canvas.drawRect(rect, paint);
        float mix = motionAllowed() ? Math.min(1, (SystemClock.uptimeMillis() - changedAt) / 450f) : 1;
        if (previous != null) drawCover(canvas, previous.cover, 1 - mix);
        if (current != null) drawCover(canvas, current.cover, previous == null ? 1 : mix);
        if (fadeBottom) {
            paint.setShader(new LinearGradient(0, getHeight() * .5f, 0, getHeight(), new int[]{0xffffffff, 0x00ffffff}, null, Shader.TileMode.CLAMP));
            paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.DST_IN)); canvas.drawRect(rect, paint);
            paint.setXfermode(null); paint.setShader(null); canvas.restoreToCount(layer);
        }
        canvas.restoreToCount(save);
        if (mix < 1 && previous != null && isAttachedToWindow() && isShown()) postInvalidateDelayed(33);
        else previous = null;
    }
    private void drawCover(Canvas canvas, Bitmap cover, float alpha) {
        float scale = Math.max(getWidth() / (float) cover.getWidth(), getHeight() / (float) cover.getHeight());
        float width = cover.getWidth() * scale, height = cover.getHeight() * scale;
        RectF target = new RectF((getWidth() - width) / 2, (getHeight() - height) / 2, (getWidth() + width) / 2, (getHeight() + height) / 2);
        paint.setAlpha((int) (alpha * 255)); canvas.drawBitmap(cover, null, target, paint); paint.setAlpha(255);
    }
    void release() { generation++; previous = null; current = null; }
}
