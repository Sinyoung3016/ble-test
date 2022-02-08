import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

export default function App() {
  const [services, setServices] = useState([]);
  const [char, setChar] = useState([]);
  const [vals, setVals] = useState([]);

  const manager = new BleManager();

  useEffect(() => {
    console.log('start');
    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('error', error);
            return;
          }
          if (device.name === 'TestBLE') {
            manager.stopDeviceScan();

            const getDeviceInformations = async () => {
              const connectedDevice = await device.connect();
              console.log('connect success');

              const allServicesAndCharacteristics =
                await connectedDevice.discoverAllServicesAndCharacteristics();
              console.log('discoverAll');

              const Services = await allServicesAndCharacteristics.services();

              Promise.all(
                Services.map(async s => {
                  const characteristic = await s.characteristics();
                  Promise.all(
                    characteristic.map(async c => {
                      const cr = await c.read();
                      setServices(services => [...services, cr.serviceUUID]);
                      setChar(char => [...char, cr.uuid]);
                      setVals(vals => [...vals, cr.value]);
                    }),
                  );
                }),
              );
            };

            getDeviceInformations();
          }
        });

        console.log('power on');
        subscription.remove();
      }
    }, true);
  }, []);

  function returnFunc(n) {
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(
        <View key={i}>
          <Text style={{fontSize: 20}}>{i + 1}번째</Text>
          <Text style={{fontSize: 20}}>services : {services[i]}</Text>
          <Text style={{fontSize: 20}}>char : {char[i]}</Text>
          <Text style={{fontSize: 20}}>vals : {vals[i]}</Text>
        </View>,
      );
    }
    return result;
  }

  return <View>{returnFunc(3)}</View>;
}
