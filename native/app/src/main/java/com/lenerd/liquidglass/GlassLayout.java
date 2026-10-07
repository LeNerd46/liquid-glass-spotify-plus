package com.lenerd.liquidglass;

import android.content.Context;
import android.animation.ValueAnimator;
import android.view.MotionEvent;
import android.view.ViewGroup;
import android.view.animation.DecelerateInterpolator;

/** Yoga owns child measurement/layout; a FrameLayout would overwrite its positions. */
class GlassLayout extends ViewGroup {
    boolean reduceMotion;
    GlassLayout(Context context) {
        super(context); setWillNotDraw(false); setClipChildren(false);
    }
    @Override protected void onMeasure(int width, int height) {
        setMeasuredDimension(MeasureSpec.getSize(width), MeasureSpec.getSize(height));
    }
    @Override protected void onLayout(boolean changed, int l, int t, int r, int b) { }
    boolean motionAllowed() { return !reduceMotion && ValueAnimator.areAnimatorsEnabled(); }
    @Override public boolean dispatchTouchEvent(MotionEvent event) {
        // Native touch response remains smooth even while JavaScript is handling a request.
        if (isClickable() && isEnabled() && motionAllowed()) {
            if (event.getActionMasked() == MotionEvent.ACTION_DOWN) {
                animate().scaleX(.965f).scaleY(.965f).setDuration(110).start();
            } else if (event.getActionMasked() == MotionEvent.ACTION_UP || event.getActionMasked() == MotionEvent.ACTION_CANCEL) {
                animate().scaleX(1).scaleY(1).setDuration(220).setInterpolator(new DecelerateInterpolator()).start();
            }
        }
        return super.dispatchTouchEvent(event);
    }
    void release() { animate().cancel(); }
    @Override protected void onDetachedFromWindow() { release(); super.onDetachedFromWindow(); }
}
