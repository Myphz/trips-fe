npm run build

rm -rf ./bundle
mkdir bundle

npx cap sync

rm -rf ./build
npx capacitor-assets generate --android

cd android

./gradlew assembleDebug
mv app/build/outputs/apk/debug/app-debug.apk ../bundle/trips-debug.apk

