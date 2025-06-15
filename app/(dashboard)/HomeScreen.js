import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import Utilisateurs from '../constants/Utilisateurs';
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function HomeScreen() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Olivia Turner, M.D.',
            role: 'LinkQ Project Manager',
            status: 'Great access',
            avatar: require('../../assets/iconef.png'),
            type: 'Manager'
        },
        {
            id: 2,
            name: 'Dr. Alexander Bennett, Ph.D.',
            role: 'Lead Lawyer',
            status: 'Great access',
            avatar: require('../../assets/iconeh.png'),
            type: 'Lawyer'
        }
    ]);

    const files = [
        { id: 1, name: 'SGM Contract', date: 'November 22 2020', icon: '📄' },
        { id: 2, name: 'JIP Contract', date: 'November 22 2020', icon: '📄' }
    ];

    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    // Ajout utilisateur
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserRole, setNewUserRole] = useState('');

    const handleAddUser = () => {
        if (newUserName.trim() && newUserRole.trim()) {
            const newUser = {
                id: Date.now(),
                name: newUserName,
                role: newUserRole,
                status: 'New access',
                avatar: '👤',
                type: 'User'
            };
            const updatedUsers = [newUser, ...users];
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
            setShowAddUser(false);
            setNewUserName('');
            setNewUserRole('');
        }
    };

    const handleSearch = (text) => {
        setSearch(text);
        if (text.trim() === '') {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(
                users.filter(u =>
                    u.name.toLowerCase().includes(text.toLowerCase()) ||
                    u.role.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };

    const handleUserPress = (user) => {
        // Naviguer vers la conversation de l'utilisateur
        router.push({ pathname: '/(chat)/ChatScreen', params: { userId: user.id } });
    };

    // Ajout pour le profil utilisateur connecté
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const token = await SecureStore.getItemAsync('access_token');
                const res = await fetchWithAuth(`http://${API_IP}/users/me`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                if (!res.ok) return;
                const data = await res.json();
                setProfile(data);
            } catch {
                setProfile(null);
            }
        }
        fetchProfile();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => router.push('/screens/FriendRequest')}
                        style={{ marginRight: 10 }}
                    >
                        <Image source={require('../../assets/friend_request.png')} style={{ width: 28, height: 28 }} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.homeTitle}>Home</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => router.push('/screens/SettingsScreen')}
                    >
                        <Image source={require('../../assets/settings.png')} style={{ width: 28, height: 28 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.profileCard}>
                    {profile && profile.pp_url ? (
                        <View style={styles.profilePicWrapper}>
                            <Image
                                source={{ uri: profile.pp_url }}
                                style={styles.profilePic}
                            />
                        </View>
                    ) : (
                        <View style={styles.profilePicWrapper}>
                            <Image
                                source={require('../../assets/profile.png')}
                                style={styles.profilePic}
                            />
                        </View>
                    )}
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{profile?.full_name || '...'}</Text>
                        <Text style={styles.profileRole}>{profile?.username || ''}</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="🔍 Search documents"
                        placeholderTextColor="#999"
                        value={search}
                        onChangeText={handleSearch}
                        returnKeyType="search"
                    />
                </View>

                {/* Affiche uniquement la section des fichiers */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>My documents:</Text>
                        <View style={styles.sectionActions}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => router.push('/screens/DocumentScanScreen')}
                            >
                                <Text style={styles.actionIcon}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => router.push('/screens/DocShareScreen')}
                            >
                                <Text style={styles.actionIcon}>☰</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {files.map((file) => (
                        <TouchableOpacity
                            key={file.id}
                            style={styles.fileCard}
                            onPress={() => router.push({ pathname: '/screens/FileFolderScreen', params: { fileId: file.id } })}
                        >
                            <Text style={styles.fileIcon}>{file.icon}</Text>
                            <View style={styles.fileInfo}>
                                <Text style={styles.fileName}>{file.name}</Text>
                                <Text style={styles.fileDate}>{file.date}</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.moreIcon}>⋯</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    menuIcon: {
        fontSize: 24,
        color: '#333',
    },
    homeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    moreIcon: {
        fontSize: 24,
        color: '#333',
    },
    profileSection: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4A90E2',
        padding: 20,
        borderRadius: 12,
    },
    profilePicWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        backgroundColor: '#e0e0e0',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePic: {
        width: 44,
        height: 44,
        borderRadius: 22,
        resizeMode: 'cover',
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    profileRole: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchContainer: {
        marginVertical: 20,
    },
    searchInput: {
        backgroundColor: '#E8F4FD',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    sectionActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 15,
    },
    actionIcon: {
        fontSize: 18,
        color: '#4A90E2',
    },
    userCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userAvatar: {
        fontSize: 40,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 3,
    },
    userRole: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    userStatus: {
        fontSize: 12,
        color: '#4A90E2',
    },
    userBadge: {
        backgroundColor: '#4A90E2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 10,
    },
    userType: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
    },
    fileCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    fileIcon: {
        fontSize: 30,
        marginRight: 15,
    },
    fileInfo: {
        flex: 1,
    },
    fileName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 3,
    },
    fileDate: {
        fontSize: 14,
        color: '#666',
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
