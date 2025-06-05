// CameraScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back); // Caméra par défaut : arrière
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
        const data = await cameraRef.current.takePictureAsync();
        setPhoto(data.uri);
    }
    };

    const switchCamera = () => {
        setType(prev => (prev === CameraType.back ? CameraType.front : CameraType.back));
    };

    if (hasPermission === null) return <View />;
    if (hasPermission === false) return <Text>No access to camera</Text>;

    return (
        <View style={styles.container}>
        {!photo ? (
            <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.topControls}>
                <TouchableOpacity onPress={switchCamera} style={styles.switchButton}>
                <Ionicons name="camera-reverse-outline" size={32} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomControls}>
                <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                <Ionicons name="camera" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </Camera>
        ) : (
            <View style={styles.previewContainer}>
            <Image source={{ uri: photo }} style={styles.preview} />
            <TouchableOpacity onPress={() => setPhoto(null)} style={styles.captureButton}>
                <Text style={styles.buttonText}>Reprendre</Text>
            </TouchableOpacity>
            </View>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1, justifyContent: 'space-between' },
    topControls: {
        marginTop: 50,
        alignItems: 'flex-end',
        paddingHorizontal: 20,
    },
    switchButton: {
        backgroundColor: '#00000088',
        padding: 10,
        borderRadius: 25,
    },
    bottomControls: {
        marginBottom: 30,
        alignItems: 'center',
    },
    captureButton: {
        backgroundColor: '#00000088',
        padding: 15,
        borderRadius: 30,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: '100%',
        height: '80%',
        resizeMode: 'cover',
    },
    buttonText: { color: '#fff', fontWeight: 'bold', marginTop: 10 },
});
