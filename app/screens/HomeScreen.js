import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import Utilisateurs from '../constants/Utilisateurs';

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
        router.push({ pathname: '/screens/ChatScreen', params: { userId: user.id } });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/screens/SettingsScreen')}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.homeTitle}>Home</Text>
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            'Choose a list',
                            'Where do you want to go?',
                            [
                                {
                                    text: 'Users',
                                    onPress: () => router.push('/screens/UtilisateursListScreen'),
                                },
                                {
                                    text: 'Shared documents',
                                    onPress: () => router.push('/screens/DocShareScreen'),
                                },
                                { text: 'Cancel', style: 'cancel' },
                            ]
                        )
                    }
                >
                    <Text style={styles.moreIcon}>⋯</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.profileCard}>
                    <Image source={require('../../assets/iconeh.png')} style={{ width: 40, height: 40, marginRight: 15 }} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Neelesh Chaudhary</Text>
                        <Text style={styles.profileRole}>Designer</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="🔍 Search users"
                        placeholderTextColor="#999"
                        value={search}
                        onChangeText={handleSearch}
                        returnKeyType="search"
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>My users:</Text>
                        <View style={styles.sectionActions}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => setShowAddUser(true)}
                            >
                                <Text style={styles.actionIcon}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/screens/UtilisateursListScreen')}>
                                <Text style={styles.actionIcon}>☰</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Add user form */}
                    {showAddUser && (
                        <View style={{ backgroundColor: '#f0f4fa', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                            <TextInput
                                style={[styles.searchInput, { marginBottom: 8 }]}
                                placeholder="User name"
                                value={newUserName}
                                onChangeText={setNewUserName}
                            />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Role"
                                value={newUserRole}
                                onChangeText={setNewUserRole}
                            />
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <TouchableOpacity
                                    style={[styles.actionButton, { marginRight: 16 }]}
                                    onPress={handleAddUser}
                                >
                                    <Text style={styles.actionIcon}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => setShowAddUser(false)}
                                >
                                    <Text style={styles.actionIcon}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {filteredUsers.map((user) => (
                        <TouchableOpacity
                            key={user.id}
                            style={styles.userCard}
                            onPress={() => handleUserPress(user)}
                        >
                            <Image source={user.avatar} style={{ width: 40, height: 40, marginRight: 15 }} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{user.name}</Text>
                                <Text style={styles.userRole}>{user.role}</Text>
                                <Text style={styles.userStatus}>{user.status}</Text>
                            </View>
                            <View style={styles.userBadge}>
                                <Text style={styles.userType}>{user.type}</Text>
                            </View>
                            {/* Removed heart icon */}
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recently shared files:</Text>
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

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Image source={require('../../assets/home.png')} style={{ width: 28, height: 28 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/DocumentScanScreen')}>
                    <Text style={styles.navIcon}>📄</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/ChatListScreen')}>
                    <Text style={styles.navIcon}>💬</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}  onPress={() => router.push('/screens/UtilisateursListScreen')}>
                    <Text style={styles.navIcon}>👤</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/SettingsScreen')}>
                    <Text style={styles.navIcon}>🔧</Text>
                </TouchableOpacity>
            </View>
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
    profileAvatar: {
        fontSize: 40,
        marginRight: 15,
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
