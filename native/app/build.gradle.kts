plugins { id("com.android.application") }
android {
    namespace = "com.lenerd.liquidglass"
    compileSdk = 36
    defaultConfig {
        applicationId = "com.lenerd.liquidglass"
        minSdk = 30
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes { release { isMinifyEnabled = false } }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }
}
dependencies {
    // Spotify Plus supplies these classes at runtime; never package another SDK copy.
    compileOnly(files("${rootDir}/lib/spotifyplus-sdk.aar"))
    androidTestImplementation("androidx.test.ext:junit:1.3.0")
    androidTestImplementation("androidx.test:runner:1.7.0")
    // Standalone instrumentation can load the public SDK; release remains compileOnly.
    debugImplementation(files("${rootDir}/lib/spotifyplus-sdk.aar"))
}
