import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function CheckingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        router.replace('/screens/SuccessScreen');
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressCircle}>
                        <View style={styles.progressInner}>
                            <Text style={styles.progressText}>{progress.toFixed(0)}%</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>Checking! Please wait...</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>We verify your facial match.</Text>
                    <Text style={styles.infoText}>Checking with the owner</Text>
                    <Text style={styles.infoText}>This process usually takes just a few seconds.</Text>
                </View>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/screens/HomeScreen')}
                >
                    <Text style={styles.backButtonText}>BACK TO HOME</Text>
                </TouchableOpacity>
            </View>

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
        backgroundColor: '#4A90E2',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    progressContainer: {
        marginBottom: 40,
    },
    progressCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressInner: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    infoContainer: {
        marginBottom: 60,
    },
    infoText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
        opacity: 0.9,
    },
    backButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
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
