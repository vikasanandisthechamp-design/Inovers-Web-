plugins {
    id("com.android.application")
    id("kotlin-android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.sportgod.app"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_11.toString()
    }

    signingConfigs {
        // Release signing — reads from env vars (CI) or local key.properties (dev).
        // Never commit key.properties or release.jks to git.
        create("release") {
            val ciKeystore    = file("release.jks")          // written by CI from ANDROID_KEYSTORE_BASE64
            val localKeyProps = file("../../key.properties") // gitignored local dev file

            when {
                ciKeystore.exists() -> {
                    storeFile     = ciKeystore
                    storePassword = System.getenv("ANDROID_STORE_PASSWORD") ?: ""
                    keyAlias      = System.getenv("ANDROID_KEY_ALIAS")      ?: ""
                    keyPassword   = System.getenv("ANDROID_KEY_PASSWORD")   ?: ""
                }
                localKeyProps.exists() -> {
                    val props = java.util.Properties().apply { load(localKeyProps.inputStream()) }
                    storeFile     = file(props.getProperty("storeFile", ""))
                    storePassword = props.getProperty("storePassword", "")
                    keyAlias      = props.getProperty("keyAlias", "")
                    keyPassword   = props.getProperty("keyPassword", "")
                }
            }
        }
    }

    defaultConfig {
        applicationId = "com.sportgod.app"
        minSdk = 24
        targetSdk = 34
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    buildTypes {
        release {
            val releaseCfg = signingConfigs.getByName("release")
            signingConfig = if (releaseCfg.storeFile != null && releaseCfg.storeFile!!.exists())
                releaseCfg
            else
                signingConfigs.getByName("debug")

            isMinifyEnabled   = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}

flutter {
    source = "../.."
}
