import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';

export default function AuthScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
            >
                <Text style={styles.welcome}>Welcome to</Text>
                <View style={styles.logoRow}>
                    <Image
                        source={require('../../assets/logo.jpg')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.logo}>Vision Shield</Text>
                </View>
                <Text style={styles.subtitle}>Your reading. Your face. Your security.</Text>

                <View style={styles.features}>
                    <View style={styles.featureRow}>
                        <Text style={styles.featureIcon}>🔒</Text>
                        <Text style={styles.featureText}>Protect your sensitive documents</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Image
                            source={require('../../assets/icone1.png')}
                            style={{ width: 24, height: 24, marginRight: 12 }}
                        />
                        <Text style={styles.featureText}>Access by facial recognition</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Text style={styles.featureIcon}>📄</Text>
                        <Text style={styles.featureText}>100% private and traceable reading</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.appleButton} onPress={() => router.push('../(dashboard)/HomeScreen')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../assets/apple.png')}
                            style={{ width: 22, height: 22, marginRight: 8 }}
                            resizeMode="contain"
                        />
                        <Text style={styles.appleButtonText}>Sign in with Apple</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton} onPress={() => router.push('SignupScreen')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../assets/google.png')}
                            style={{ width: 22, height: 22, marginRight: 8 }}
                            resizeMode="contain"
                        />
                        <Text style={styles.googleButtonText}>Sign up with Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={() => router.push('SignupScreen')}>
                    <Text style={styles.signupButtonText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('LoginScreen')}>
                    <Text style={styles.loginText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { padding: 24, alignItems: 'center', justifyContent: 'center' },
    welcome: { fontSize: 16, color: '#666', marginBottom: 8 },
    logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    logoImage: { width: 40, height: 40, marginRight: 8 },
    logo: { fontSize: 28, fontWeight: 'bold', color: '#3479e3' },
    subtitle: { fontSize: 15, color: '#888', marginBottom: 32, textAlign: 'center' },
    features: { width: '100%', marginBottom: 32 },
    featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    featureIcon: { fontSize: 22, marginRight: 12 },
    featureText: { fontSize: 15, color: '#333' },
    appleButton: { backgroundColor: '#000', borderRadius: 8, height: 48, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 15 },
    appleButtonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
    googleButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, height: 48, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 15 },
    googleButtonText: { color: '#333', fontSize: 16, fontWeight: '500' },
    signupButton: { backgroundColor: '#3479e3', borderRadius: 8, height: 48, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 20 },
    signupButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    loginText: { color: '#3479e3', fontSize: 15, marginTop: 10 },
});
