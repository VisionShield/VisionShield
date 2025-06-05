import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { router } from 'expo-router';

export default function SignupScreen() {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Mobbin');
    const [email, setEmail] = useState('jon.mobbin@gmail.com');
    const [password, setPassword] = useState('password123');
    const [passwordStrength, setPasswordStrength] = useState('Great!');

    const handleCreateAccount = () => {
        router.replace('/screens/HomeScreen');
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 'Great!') return '#4CAF50';
        if (passwordStrength === 'Good') return '#FFC107';
        return '#F44336';
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.backButton}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Account</Text>
            </View>

            <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.appleButton}>
                <Text style={styles.appleButtonText}>🍎 Sign in with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleButtonText}>📧 Sign up with Google</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Account Information</Text>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                />
                </View>

                <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                />
                <View style={styles.passwordStrengthContainer}>
                    <View style={[styles.strengthBar, { backgroundColor: '#E0E0E0' }]}>
                    <View
                        style={[
                        styles.strengthProgress,
                        {
                            backgroundColor: getPasswordStrengthColor(),
                            width: '80%',
                        },
                        ]}
                    />
                </View>
                <Text style={[styles.strengthText, { color: getPasswordStrengthColor() }]}>
                    {passwordStrength}
                </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
                <Text style={styles.createButtonText}>Create Account</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        fontSize: 16,
        color: '#4A90E2',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginRight: 50,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    socialButtons: {
        marginTop: 30,
        marginBottom: 40,
    },
    appleButton: {
        backgroundColor: '#000',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    appleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    googleButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    formContainer: {
        paddingBottom: 40,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    passwordStrengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    strengthBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        marginRight: 10,
    },
    strengthProgress: {
        height: '100%',
        borderRadius: 2,
    },
    strengthText: {
        fontSize: 14,
        fontWeight: '500',
    },
    createButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
