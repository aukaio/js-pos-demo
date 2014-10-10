studentbar
==========

Javascript browser-side mCASH POS

Dependencies
---------

For Mac OS X

```bash
brew install node
sudo npm install bower
sudo npm install -g cordova
sudo npm install -g ionic
brew install ant
```

Get started
---------
```bash
bower install
ionic platform add android
ionic plugin add org.apache.cordova.console
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
ionic run android
```

View the log with
```bash
adb logcat -v time | grep Cordova
```

