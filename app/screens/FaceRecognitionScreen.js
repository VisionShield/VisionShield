import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { router } from 'expo-router';

export default function FaceRecognitionScreen() {
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsScanning(true);
            setTimeout(() => {
                router.replace('/screens/CheckingScreen');
            }, 3000);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (Platform.OS === 'web') {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.webContainer}>
                    <Text style={styles.webText}>Camera features work on mobile devices only</Text>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => router.replace('/screens/CheckingScreen')}
                    >
                        <Text style={styles.continueButtonText}>Continue (Skip Camera)</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Face recognition</Text>
                <View style={styles.headerIcons}>
                    <Text style={styles.headerIcon}>🔍</Text>
                    <Text style={styles.headerIcon}>⏰</Text>
                    <Text style={styles.headerIcon}>⚡</Text>
                </View>
            </View>

            <Text style={styles.instruction}>Please point the camera at the ID card</Text>

            <View style={styles.cameraContainer}>
                <View style={styles.cameraPlaceholder}>
                    <View style={styles.faceFrame}>
                        <View style={styles.faceDetectionPoints}>
                            <View style={[styles.point, { top: 30, left: 50 }]} />
                            <View style={[styles.point, { top: 30, right: 50 }]} />
                            <View style={[styles.point, { top: 80, left: 70 }]} />
                            <View style={[styles.point, { top: 80, right: 70 }]} />
                            <View style={[styles.point, { bottom: 60, left: 60 }]} />
                            <View style={[styles.point, { bottom: 60, right: 60 }]} />
                            <View style={[styles.point, { bottom: 30, left: 90, right: 90 }]} />
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton}>
                    <Text style={styles.controlIcon}>🔴</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.captureButton}
                    onPress={() => router.replace('/screens/CheckingScreen')}
                >
                    <View style={styles.captureButtonInner} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <Text style={styles.controlIcon}>📤</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.scanningText}>
                {isScanning ? 'Scanning your face' : 'Position your face in the frame'}
            </Text>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>🔍</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>📄</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>📋</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>💬</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    webContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    webText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    continueButton: {
        backgroundColor: '#4A90E2',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        fontSize: 24,
        color: '#fff',
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerIcon: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 15,
    },
    instruction: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraPlaceholder: {
        width: 280,
        height: 350,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    faceFrame: {
        width: 220,
        height: 280,
        borderWidth: 2,
        borderColor: '#00ff00',
        borderRadius: 110,
        position: 'relative',
    },
    faceDetectionPoints: {
        flex: 1,
    },
    point: {
        position: 'absolute',
        width: 4,
        height: 4,
        backgroundColor: '#00ff00',
        borderRadius: 2,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 40,
    },
    controlButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlIcon: {
        fontSize: 24,
    },
    captureButton: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#ddd',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        backgroundColor: '#4A90E2',
        borderRadius: 30,
    },
    scanningText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingVertical: 15,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navIcon: {
        fontSize: 24,
    },
});
