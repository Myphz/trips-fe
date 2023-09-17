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

./gradlew assembleDebug
mv app/build/outputs/apk/debug/app-debug.apk ../bundle/trips-debug.apk

cd ..
rm -rf ./android
