import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function AuthScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.welcome}>Bienvenue sur</Text>
                <View style={styles.logoRow}>
                    <Text style={styles.logoIcon}>🛡️</Text>
                    <Text style={styles.logo}>Vision Shield</Text>
                </View>
                <Text style={styles.subtitle}>Votre lecture. Votre visage. Votre sécurité.</Text>

                <View style={styles.features}>
                    <View style={styles.featureRow}>
                        <Text style={styles.featureIcon}>🔒</Text>
                        <Text style={styles.featureText}>Protégez vos documents sensibles</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Text style={styles.featureIcon}>🧑‍💼</Text>
                        <Text style={styles.featureText}>Accès par reconnaissance faciale</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Text style={styles.featureIcon}>📄</Text>
                        <Text style={styles.featureText}>Lecture 100% privée et traçable</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.appleButton} onPress={() => router.push('/screens/FaceRecognitionScreen')}>
                    <Text style={styles.appleButtonText}>🍎 Sign in with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton} onPress={() => router.push('/screens/SignupScreen')}>
                    <Text style={styles.googleButtonText}>📧 Sign up with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/screens/SignupScreen')}>
                    <Text style={styles.signupButtonText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/screens/LoginScreen')}>
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
    logoIcon: { fontSize: 32, marginRight: 8 },
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
