package com.lenerd.liquidglass;

import android.content.Context;
import android.graphics.*;
import android.view.ViewParent;
import org.json.JSONObject;

/** Samples the ancestor's diffuse artwork; tint and highlights never blur the text. */
public final class GlassPanelView extends GlassLayout {
    private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final RectF bounds = new RectF();
    private final Path clip = new Path();
    private final int[] sceneLocation = new int[2], location = new int[2];
    private float radius = 24, tint = .14f;
    private boolean selected;
    public GlassPanelView(Context context) { super(context); }
    void update(JSONObject props) {
        radius = (float) props.optDouble("radius", 24) * getResources().getDisplayMetrics().density;
        tint = Math.max(.06f, Math.min(.5f, (float) props.optDouble("tint", .14)));
        selected = props.optBoolean("selected", false); reduceMotion = props.optBoolean("reduceMotion", false);
        invalidate();
    }
    @Override protected void onDraw(Canvas canvas) {
        bounds.set(1, 1, getWidth() - 1, getHeight() - 1);
        clip.rewind(); clip.addRoundRect(bounds, radius, radius, Path.Direction.CW);
        int save = canvas.save(); canvas.clipPath(clip);
        ViewParent parent = getParent();
        while (parent != null && !(parent instanceof GlassSceneView)) parent = parent.getParent();
        if (parent instanceof GlassSceneView scene) {
            getLocationInWindow(location); scene.getLocationInWindow(sceneLocation);
            int backdrop = canvas.save(); canvas.translate(sceneLocation[0] - location[0], sceneLocation[1] - location[1]);
            scene.drawBackdrop(canvas, scene.getWidth(), scene.getHeight()); canvas.restoreToCount(backdrop);
        }
        paint.setColor(selected ? 0x307ce6ab : Color.argb((int) (255 * tint), 236, 232, 255));
        canvas.drawRoundRect(bounds, radius, radius, paint);
        paint.setShader(new LinearGradient(0, 0, getWidth() * .8f, getHeight(), new int[]{0x28ffffff, 0x03ffffff, 0x10080816}, null, Shader.TileMode.CLAMP));
        canvas.drawRoundRect(bounds, radius, radius, paint); paint.setShader(null); canvas.restoreToCount(save);
        paint.setStyle(Paint.Style.STROKE); paint.setStrokeWidth(getResources().getDisplayMetrics().density * .8f);
        paint.setShader(new LinearGradient(0, 0, getWidth(), getHeight(), new int[]{0x9fffffff, 0x20ffffff, 0x50ffffff}, null, Shader.TileMode.CLAMP));
        canvas.drawRoundRect(bounds, radius, radius, paint); paint.setShader(null); paint.setStyle(Paint.Style.FILL);
    }
}
