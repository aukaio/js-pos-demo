
start_in_browser: bower-exists cordova-exists ionic-exists ant-exists platforms/android/CordovaLib/build.xml plugins/org.apache.cordova.console
	ionic serve

%-exists: ; @which $* > /dev/null

install:
	cordova run android
	adb logcat -v time | grep Cordova

platforms/android/CordovaLib/build.xml:
	bower install
	cordova platform add android

plugins/org.apache.cordova.console:
	cordova plugin add org.apache.cordova.console


clean:
	git clean -f -d