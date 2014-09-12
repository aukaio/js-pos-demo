studentbar
==========

Javascript browser-side mCASH POS

Dependencies
---------
```bash
brew install node
npm install bower
sudo npm install -g cordova
brew install ant
cd studentbar
cordova platform add ios
cordova platform add android
```

Get started
---------
```bash
cd studentbar
bower install
cd www
python -m SimpleHTTPServer
#Start browser 
http://localhost:8000/
```


Build the app
----------
```bash
cd studentbar
cordova build
cordova build ios
cordova build android
```

Install the app on your Android device
-------------------------------
Plug in the usb cable and type
```bash
adb install ./platforms/android/ant-build/StudentBar-debug.apk
```


