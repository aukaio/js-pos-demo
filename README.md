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
cordova platform add android
cordova plugin add org.apache.cordova.console
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
cordova build android
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

