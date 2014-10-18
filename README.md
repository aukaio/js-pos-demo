studentbar
==========

Javascript browser-side mCASH POS

Dependencies
---------

For Mac OS X

```bash
brew install node
npm install bower
npm install -g cordova
npm install -g ionic
brew install ant
```

Get started
---------
```bash
bower install
cordova platform add android
cordova plugin add org.apache.cordova.console
```

Run the app in your browser
----------------------
```bash
ionic serve
```

Build and install the app on your Android device
-------------------------------
Plug in the usb cable and type
```bash
cordova run android
```

View the log with
```bash
adb logcat -v time | grep Cordova
```

