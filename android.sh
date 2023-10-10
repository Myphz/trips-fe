# SETUP: Arch Linux machine w/ JDK 17 and android-sdk-cmdline-tools-latest.
if [ -z "$1" ]
  then
    echo "No argument supplied! Enter version (e.g: 1.2.5)"
    exit
fi


npm run build

rm -rf ./bundle
mkdir bundle

npx cap sync

rm -rf ./build
npx capacitor-assets generate --android

# Set build number
build=$(cat buildnumber)
newbuild=$(($build+1))
node_modules/capacitor-set-version/bin/run set:android -v $1 -b $newbuild
echo $newbuild > buildnumber

cd android


./gradlew bundleRelease
mv app/build/outputs/bundle/release/app-release.aab ../bundle/trips-unsigned.aab


# Sign bundle
cd ../bundle
jarsigner -sigalg SHA256withRSA -digestalg SHA-256 -keystore ~/keys/trips.jks -signedjar trips.aab trips-unsigned.aab trips
rm trips-unsigned.aab