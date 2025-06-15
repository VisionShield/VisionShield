import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';
// Fonction utilitaire pour fetch avec Authorization


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://${API_IP}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // pour accepter le cookie httpOnly
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            // data.access_token attendu, refresh token dans cookie httpOnly
            if (data.user_id) {
                await SecureStore.setItemAsync('user_id', data.user_id.toString());
            }
            if (data.access_token) {
                // Stocke le token de façon sécurisée
                await SecureStore.setItemAsync('access_token', data.access_token);
                // Stocke aussi le userId si présent

                Alert.alert('Success', 'You are logged in!');
                router.replace('/(dashboard)/HomeScreen');
                //router.replace('/(chat)/ChatScreen'); // Redirige vers l'écran de chat
            } else {
                throw new Error('No access token received');
            }
        } catch (err) {
            console.error('Login error:', err);
            Alert.alert('Error', 'Invalid credentials or server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>← Back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                        <Text style={styles.loginButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.push('/screens/SignupScreen')}>
                        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        fontSize: 16,
        color: '#4A90E2',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    formContainer: {
        marginBottom: 40,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#fafafa',
    },
    loginButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 8,
        paddingVertical: 15,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    forgotPassword: {
        color: '#4A90E2',
        fontSize: 14,
        textAlign: 'center',
    },
    footer: {
        alignItems: 'center',
    },
    signupText: {
        color: '#4A90E2',
        fontSize: 16,
    },
});
