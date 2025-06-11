import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';

export default function DocumentScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  // TODO: Si bug en lançant CameraScreen.js, vérifier que DocumentScanScreen est bien unmount

  const handleScan = async () => {
    const response = await requestPermission();
    if(response.granted) {
      console.log("TODO : Permission has been granted")
      setIsScanning(true);
    } else {
      setIsScanning(false)
      console.log("TODO: Gestion en cas de non permission")
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setIsScanning(false);
      Alert.alert('Success', 'Document scanned successfully!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.instruction}>Place the document in the frame</Text>

      <View style={styles.cameraContainer}>
        <View style={styles.documentFrame}>
          <View style={styles.documentPlaceholder}>
            {isScanning ? (
              !permission.granted ? (
                <Text style={styles.documentIcon}>Permission denied</Text>
              ) : (
                <CameraView
                  ref={cameraRef}
                  facing="back"
                  style={{ flex: 1, width: '100%', borderRadius: 12 }}
                  ratio="4:3"
                />
              )
            ) : photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
              />
            ) : (
              <Text style={styles.documentIcon}>📄</Text>
            )}
          </View>
          <View style={styles.corners}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>
      </View>

      {isScanning ? (
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.captureButton} onPress={handleScan}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222' },
  instruction: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 10,
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentFrame: {
    width: 280,
    height: 400,
    position: 'relative',
  },
  documentPlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  documentIcon: {
    fontSize: 40,
    color: '#fff',
  },
  corners: { ...StyleSheet.absoluteFillObject },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#4A90E2',
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  captureButton: {
    alignSelf: 'center',
    marginVertical: 30,
    marginBottom: 90, // Ajouté pour éloigner le bouton de la navbar
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ccc',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});