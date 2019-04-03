
import React, { useState } from 'react';

import {
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet
} from 'react-native';

import { CameraKitCameraScreen, } from 'react-native-camera-kit';


const Scanner = () => {
  const [qrValue, setQrValue] = useState('')
  const [openScanner, setOpenScanner] = useState(false)

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA, {
          'title': 'App Camera Permission',
          'message': 'App needs access to your camera'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) setOpenScanner(true)
      else Alert.alert("Camera permission denied");
    } catch (err) {
      Alert.alert("Camera permission err", err);
    }
  }

  const onOpenlink = () => Linking.openURL(qrValue)

  const onBarcodeScan = qrValue => {
    setQrValue(qrValue)
    setOpenScanner(false)
  }

  const onOpenScanner = () => {
    if (Platform.OS === 'android') requestCameraPermission()
    else setOpenScanner(true)
  }

  if (!openScanner) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>QR Platzi</Text>
        <Text style={styles.simpleText}>{qrValue ? `Scanned QR Code: ${qrValue}` : ''}</Text>
        {qrValue.includes("http") ?
          <TouchableHighlight onPress={() => onOpenlink()} style={styles.button}>
            <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open Link</Text>
          </TouchableHighlight>
          : null
        }
        <TouchableHighlight onPress={() => onOpenScanner()} style={styles.button}>
          <Text style={{ color: '#FFFFFF', fontSize: 12 }}> Open QR Scanner </Text>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraKitCameraScreen
        showFrame={false}
        scanBarcode={true}
        laserColor={'blue'}
        frameColor={'yellow'}
        colorForScannerFrame={'black'}
        onReadCode={event => onBarcodeScan(event.nativeEvent.codeStringValue)}
      />
    </View>
  );
}

export default Scanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width: 300,
    marginTop: 16
  },
  heading: {
    color: 'black',
    fontSize: 24,
    alignSelf: 'center',
    padding: 10,
    marginTop: 30
  },
  simpleText: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
    marginTop: 16
  }
});
