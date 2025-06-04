import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function ProfilePictureScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  // Simulate taking a photo using a default image
  const takePicture = () => {
    setPhotoUri('https://randomuser.me/api/portraits/men/1.jpg');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile picture</Text>
      </View>
      <View style={styles.cameraContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.profileImage} />
        ) : (
          <View style={[styles.camera, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#fff', fontSize: 32 }}>📷</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.captureButtonText}>Take a photo</Text>
      </TouchableOpacity>
      {photoUri && (
        <TouchableOpacity style={styles.captureButton} onPress={() => setPhotoUri(null)}>
          <Text style={styles.captureButtonText}>Retake</Text>
        </TouchableOpacity>
      )}
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
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  profileImage: {
    width: 280,
    height: 280,
    borderRadius: 140,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  captureButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignSelf: 'center',
    marginVertical: 16,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
