# purdue-ble-test
CROFFLE-MAKERS : BLE Test of Application

## Library

[react-native-ble-plx](https://www.npmjs.com/package/react-native-ble-plx): 2.0.3

## Before start

Add this code to MainApplication.java

```
import com.facebook.react.bridge.ReactMethod;

 @ReactMethod
  public void addListener(String eventName) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  public void removeListeners(Integer count) {
    // Keep: Required for RN built in Event Emitter Calls.
  }
```

On Android, Add a permmision to AndroidManifest.xml

```
<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
<uses-permission-sdk-23 android:name="android.permission.ACCESS_FINE_LOCATION"/>
```




