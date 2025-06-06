import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { router } from 'expo-router';

export default function SettingsScreen() {
    const [syncEnabled, setSyncEnabled] = useState(true);
    const [twoStepEnabled, setTwoStepEnabled] = useState(true);

    const menuItems = [
        { title: 'Change Password', onPress: () => router.push('/screens/ChangePasswordScreen') },
        { title: 'Change Language', onPress: () => router.push('/screens/ChooseLanguageScreen') },
        { title: 'User details', onPress: () => router.push('/screens/UserDetailsScreen') },
        { title: 'Profile Picture', onPress: () => router.push('/screens/ProfilePictureScreen') },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView style={styles.content}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                        <Text style={styles.menuItemText}>{item.title}</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                ))}

                <View style={styles.switchItem}>
                    <Text style={styles.menuItemText}>Enable Sync</Text>
                    <Switch
                        value={syncEnabled}
                        onValueChange={setSyncEnabled}
                        trackColor={{ false: '#767577', true: '#4A90E2' }}
                        thumbColor={syncEnabled ? '#fff' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.switchItem}>
                    <Text style={styles.menuItemText}>Enable 2 Step Verification</Text>
                    <Switch
                        value={twoStepEnabled}
                        onValueChange={setTwoStepEnabled}
                        trackColor={{ false: '#767577', true: '#4A90E2' }}
                        thumbColor={twoStepEnabled ? '#fff' : '#f4f3f4'}
                    />
                </View>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push('/screens/TermsScreen')}
                >
                    <Text style={styles.menuItemText}>Terms of Service</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.bottomNav}>
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => router.push('/screens/HomeScreen')}
                >
                  <Image
                    source={require('../../assets/home.png')}
                    style={{ width: 28, height: 28 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => router.push('/screens/DocumentScanScreen')}
                >
                  <Text style={styles.navIcon}>📄</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => router.push('/screens/ChatListScreen')}
                >
                  <Text style={styles.navIcon}>💬</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => router.push('/screens/UtilisateursListScreen')}
                >
                  <Text style={styles.navIcon}>👤</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => {}}
                >
                  <Text style={styles.navIcon}>🔧</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        fontSize: 24,
        color: '#333',
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    content: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
    chevron: {
        fontSize: 18,
        color: '#ccc',
    },
    switchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navIcon: {
        fontSize: 24,
    },
});
