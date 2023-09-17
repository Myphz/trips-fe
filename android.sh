# SETUP: Arch Linux machine w/ JDK 17 and android-sdk-cmdline-tools-latest.

if [ -z "$1" ]
  then
    echo "No argument supplied! Enter version (e.g: 1.2.5)"
    exit
fi
rm -rf ./android

npm run build

rm -rf ./bundle
mkdir bundle

npx cap add android
npx cap copy android

rm -rf ./build

# cordova-res android --skip-config --copy

# Set build number
# build=$(cat buildnumber)
# newbuild=$(($build+1))
# node_modules/capacitor-set-version/bin/run set:android -v $1 -b $newbuild
# echo $newbuild > ../buildnumber

cd android
# To enable persistent cookies
# echo "package com.trips.app;
# import android.webkit.CookieManager;
# import com.getcapacitor.BridgeActivity;

# public class MainActivity extends BridgeActivity {
#   @Override
#   public void onPause() {
#     super.onPause();

#     CookieManager.getInstance().flush();
#   }
# }" > ./app/src/main/java/com/trips/app/MainActivity.java

# ANDROID_SDK_ROOT=/opt/android-sdk ./gradlew bundleRelease
# mv app/build/outputs/bundle/release/app-release.aab ../bundle/trips-unsigned.aab

# cd ..
# rm -rf ./android

# Sign bundle
# cd bundle
# jarsigner -sigalg SHA256withRSA -digestalg SHA-256 -keystore ~/keys/trips.jks -signedjar trips.aab trips-unsigned.aab trips
# rm trips-unsigned.aab