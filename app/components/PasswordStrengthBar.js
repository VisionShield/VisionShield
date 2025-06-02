import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PasswordStrengthBar from '../components/PasswordStrengthBar';

export default function AuthScreen() {
    const [password, setPassword] = useState('');

    // Simple password strength logic
    const calculateStrength = (pwd) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (pwd.match(/[A-Z]/)) strength++;
        if (pwd.match(/[0-9]/)) strength++;
        if (pwd.match(/[^A-Za-z0-9]/)) strength++;
        return strength;
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <PasswordStrengthBar strength={calculateStrength(password)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24 },
    input: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16, fontSize: 16 },
});
