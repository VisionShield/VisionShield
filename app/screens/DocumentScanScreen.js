import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

export default function DocumentScanScreen() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Info', 'Scanning only works on mobile');
      return;
    }

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert('Success', 'Document scanned successfully!');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/screens/HomeScreen')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document scanning</Text>
      </View>

      <Text style={styles.instruction}>Place the document in the frame</Text>

      <View style={styles.cameraContainer}>
        <View style={styles.documentFrame}>
          <View style={styles.documentPlaceholder}>
            <Text style={styles.documentIcon}>
              {isScanning ? '📄 Scanning...' : '📄'}
            </Text>
          </View>
          <View style={styles.corners}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.captureButton} onPress={handleScan}>
        <View style={styles.captureButtonInner} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333',
  },
  backButton: { fontSize: 24, color: '#fff', marginRight: 16 },
  headerTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
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
});
