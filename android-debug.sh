rm -rf ./android

npm run build

rm -rf ./bundle
mkdir bundle

npx cap add android
npx cap copy android

rm -rf ./build

npx capacitor-assets generate --android

cd android

./gradlew assembleDebug
mv app/build/outputs/apk/debug/app-debug.apk ../bundle/trips-debug.apk

cd ..
rm -rf ./android
