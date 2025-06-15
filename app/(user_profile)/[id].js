import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';

export default function UserProfile() {
    // Expo Router fournit le paramètre sous le nom "id" (pas "user_id") pour [id].js
    const { id } = useLocalSearchParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [friendState, setFriendState] = useState('add'); // 'add' | 'pending'

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            try {
                const token = await SecureStore.getItemAsync('access_token');
                const res = await fetch(`http://${API_IP}/users/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                if (!res.ok) {
                    setProfile(null);
                } else {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch {
                setProfile(null);
            }
            setLoading(false);
        }
        fetchProfile();
    }, [id]);

    const handleAddFriend = async () => {
        setFriendState('pending');
        // Optionnel: requête pour envoyer la demande d'ami
        // await fetch(`http://${API_IP}/friends/request`, { ... });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#2196F3" />
            </SafeAreaView>
        );
    }

    if (!profile) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backButton}>←</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 40 }}>User not found.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileRow}>
                <Image
                    source={profile.pp_url ? { uri: profile.pp_url } : require('../../assets/profile.png')}
                    style={styles.profilePic}
                />
                <View style={styles.infoCol}>
                    <Text style={styles.fullName}>{profile.full_name || profile.username}</Text>
                    <Text style={styles.username}>@{profile.username}</Text>
                    <Text style={styles.friendsCount}>{profile.friends_count ?? 0} amis</Text>
                    <TouchableOpacity
                        style={[
                            styles.addButton,
                            friendState === 'pending' && styles.addButtonPending,
                        ]}
                        onPress={friendState === 'add' ? handleAddFriend : undefined}
                        disabled={friendState === 'pending'}
                    >
                        <Text style={styles.addButtonText}>
                            {friendState === 'pending' ? 'Demande d\'ami envoyée' : 'Ajouter en ami'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* ...la barre du bas reste affichée automatiquement si tu utilises un layout Tabs */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 16,
        paddingBottom: 8,
    },
    backButton: {
        fontSize: 28,
        color: '#2196F3',
        fontWeight: 'bold',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 32,
        paddingTop: 8,
    },
    profilePic: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#e0e0e0',
        marginRight: 24,
    },
    infoCol: {
        flex: 1,
        justifyContent: 'center',
    },
    fullName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 6,
    },
    username: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    friendsCount: {
        fontSize: 14,
        color: '#2196F3',
        marginBottom: 18,
    },
    addButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        alignItems: 'center',
    },
    addButtonPending: {
        backgroundColor: '#aaa',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

// Pour que la barre de navigation (tab bar) reste visible sur UserProfile :
// 1. Place ce fichier dans un dossier qui dépend du layout Tabs, par exemple : app/(dashboard)/(user_profile)/[id].js
// 2. Ne déclare PAS UserProfile dans la tab bar (Tabs.Screen), ni dans un layout séparé qui ne contient pas la tab bar.
// 3. Navigue vers ce profil avec : router.push('/(dashboard)/(user_profile)/123') (où 123 est l'id).

// Résumé : 
// - L'écran doit être enfant du layout qui contient la tab bar (ex : (dashboard)/_layout.tsx).
// - Ne pas ouvrir UserProfile comme modal ou dans un layout qui ne contient pas Tabs.
