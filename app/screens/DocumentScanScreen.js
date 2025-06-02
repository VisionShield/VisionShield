import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';

export default function DocumentScanScreen() {
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        if (Platform.OS === 'web') {
            Alert.alert('Info', 'Document scanning works on mobile devices only');
            return;
        }

        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            Alert.alert('Success', 'Document scanned successfully!');
        }, 3000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Numérisation des documents</Text>
            </View>

            <Text style={styles.instruction}>Please point the camera at the document</Text>

            <View style={styles.cameraContainer}>
                <View style={styles.documentFrame}>
                    <View style={styles.documentPlaceholder}>
                        {isScanning ? (
                            <Text style={styles.scanningText}>📄 Scanning...</Text>
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

            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton}>
                    <Text style={styles.controlIcon}>🔴</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.captureButton}
                    onPress={handleScan}
                >
                    <View style={styles.captureButtonInner} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <Text style={styles.controlIcon}>📤</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/HomeScreen')}>
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
        backgroundColor: '#333',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        fontSize: 24,
        color: '#fff',
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    instruction: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    documentFrame: {
        width: 280,
        height: 400,
        position: 'relative',
    },
    documentPlaceholder: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderStyle: 'dashed',
    },
    documentIcon: {
        fontSize: 80,
        color: '#fff',
    },
    scanningText: {
        fontSize: 24,
        color: '#4CAF50',
    },
    corners: {
        ...StyleSheet.absoluteFillObject,
    },
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
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#444',
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
