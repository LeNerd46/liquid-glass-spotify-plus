package com.lenerd.liquidglass;

import android.content.Context;
import android.content.res.ColorStateList;
import android.database.ContentObserver;
import android.media.AudioManager;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.widget.SeekBar;

/** Local media volume only. Spotify Connect remote volume is not exposed by the public SDK. */
final class GlassVolumeView extends SeekBar {
    private final AudioManager audio;
    private boolean registered;
    private final ContentObserver observer = new ContentObserver(new Handler(Looper.getMainLooper())) {
        @Override public void onChange(boolean selfChange) { sync(); }
    };
    GlassVolumeView(Context context) {
        super(context);
        audio = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
        setProgressTintList(ColorStateList.valueOf(0xffe1e8ed));
        setProgressBackgroundTintList(ColorStateList.valueOf(0x55ffffff));
        setThumbTintList(ColorStateList.valueOf(0xffe1e8ed));
        setContentDescription("This device's media volume");
        sync();
        bind();
    }
    // The React host applies generic SeekBar props first; restore our native listener afterward.
    void bind() {
        setOnSeekBarChangeListener(new OnSeekBarChangeListener() {
            public void onStartTrackingTouch(SeekBar bar) { }
            public void onStopTrackingTouch(SeekBar bar) { sync(); }
            public void onProgressChanged(SeekBar bar, int value, boolean fromUser) {
                if (fromUser && audio != null) {
                    try { audio.setStreamVolume(AudioManager.STREAM_MUSIC, value, 0); }
                    catch (SecurityException ignored) { sync(); }
                }
            }
        });
    }
    private void sync() {
        if (audio == null) { setEnabled(false); return; }
        setMax(audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC));
        setProgress(audio.getStreamVolume(AudioManager.STREAM_MUSIC));
        setEnabled(!audio.isVolumeFixed());
    }
    @Override protected void onAttachedToWindow() {
        super.onAttachedToWindow(); sync();
        getContext().getContentResolver().registerContentObserver(Settings.System.CONTENT_URI, true, observer);
        registered = true;
    }
    @Override protected void onDetachedFromWindow() { release(); super.onDetachedFromWindow(); }
    void release() {
        if (registered) getContext().getContentResolver().unregisterContentObserver(observer);
        registered = false;
    }
}
