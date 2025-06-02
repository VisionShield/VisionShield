import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function SuccessScreen() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/screens/HomeScreen');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.successContainer}>
                    <View style={styles.checkmarkContainer}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>

                    <Text style={styles.title}>Congratulations!</Text>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Match complete</Text>
                        <Text style={styles.infoText}>Owner authorization</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.openButton}
                    onPress={() => router.push('/screens/HomeScreen')}
                >
                    <Text style={styles.openButtonText}>TAP HERE TO OPEN THE DOCUMENT</Text>
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
        backgroundColor: '#E8F5E8',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    successContainer: {
        alignItems: 'center',
        marginBottom: 80,
    },
    checkmarkContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkmark: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    infoContainer: {
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    openButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#45a049',
    },
    openButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navIcon: {
        fontSize: 24,
    },
});
