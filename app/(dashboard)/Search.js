import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function SearchScreen() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const [showCancel, setShowCancel] = useState(false);

    // Ajoute un état pour stocker les friendRequestId par user_id
    const [friendRequestMap, setFriendRequestMap] = useState({});
    const [incomingRequestMap, setIncomingRequestMap] = useState({});
    const [friendsMap, setFriendsMap] = useState({});

    // Rafraîchit le friendRequestMap, incomingRequestMap et friendsMap à chaque focus sur la barre de recherche
    const refreshFriendRequestsForResults = async (users) => {
        const token = await SecureStore.getItemAsync('access_token');
        const map = {};
        const incomingMap = {};
        const friends = {};
        await Promise.all(
            users.map(async (user) => {
                // Vérifie si j'ai envoyé une demande à cet utilisateur
                try {
                    const reqRes = await fetchWithAuth(`http://${API_IP}/friendrequests?to=${user.id}`, {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    });
                    if (reqRes.ok) {
                        const reqData = await reqRes.json();
                        if (reqData && reqData.id) {
                            map[user.id] = reqData.id;
                        }
                    }
                } catch {}
                // Vérifie si cet utilisateur m'a envoyé une demande
                try {
                    const reqRes = await fetchWithAuth(`http://${API_IP}/friendrequests?from=${user.id}`, {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    });
                    if (reqRes.ok) {
                        const reqData = await reqRes.json();
                        if (reqData && reqData.id) {
                            incomingMap[user.id] = reqData.id;
                        }
                    }
                } catch {}
                // Vérifie si cet utilisateur est déjà ami
                try {
                    const res = await fetchWithAuth(`http://${API_IP}/friends/${user.id}`, {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    });
                    if (res.ok) {
                        const friendData = await res.json();
                        if (friendData && friendData.id) {
                            friends[user.id] = true;
                        }
                    }
                } catch {
                    // ignore
                }
            })
        );
        setFriendRequestMap(map);
        setIncomingRequestMap(incomingMap);
        setFriendsMap(friends);
    };

    // Rafraîchit le friendRequestMap à chaque focus sur la barre de recherche
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const token = await SecureStore.getItemAsync('access_token');
                if (!token) return;
                try {
                    const reqRes = await fetchWithAuth(`http://${API_IP}/friendrequests`, {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    });
                    if (reqRes.ok) {
                        const reqData = await reqRes.json();
                        if (Array.isArray(reqData)) {
                            const map = {};
                            reqData.forEach((req) => {
                                if (req.to_user_id) {
                                    map[req.to_user_id] = req.id;
                                }
                            });
                            setFriendRequestMap(map);
                        }
                    }
                } catch (e) {
                    console.error('Error fetching friend requests:', e);
                }
            };

            fetchData();
        }, [])
    );

    useEffect(() => {
        // Lance la recherche à chaque modification de search (sauf si vide)
        const delayDebounce = setTimeout(() => {
            if (search.trim().length > 0) {
                handleSearch(search);
            } else {
                setResults([]);
                setFriendRequestMap({});
            }
        }, 200); // debounce pour éviter trop de requêtes

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handleSearch = async (query) => {
        setLoading(true);
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const res = await fetchWithAuth(`http://${API_IP}/users?search=${encodeURIComponent(query)}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!res.ok) {
                setResults([]);
                setFriendRequestMap({});
                setIncomingRequestMap({});
                setFriendsMap({});
                setLoading(false);
                return;
            }
            let data = await res.json();
            if (!Array.isArray(data)) data = [];

            // Pour chaque user, récupère la friendrequest éventuelle (to) et entrante (from) et s'ils sont amis
            const map = {};
            const incomingMap = {};
            const friends = {};
            await Promise.all(
                data.map(async (user) => {
                    try {
                        const reqRes = await fetchWithAuth(`http://${API_IP}/friendrequests?to=${user.id}`, {
                            headers: token ? { Authorization: `Bearer ${token}` } : {},
                        });
                        if (reqRes.ok) {
                            const reqData = await reqRes.json();
                            if (reqData && reqData.id) {
                                map[user.id] = reqData.id;
                            }
                        }
                    } catch {}
                    try {
                        const reqRes = await fetchWithAuth(`http://${API_IP}/friendrequests?from=${user.id}`, {
                            headers: token ? { Authorization: `Bearer ${token}` } : {},
                        });
                        if (reqRes.ok) {
                            const reqData = await reqRes.json();
                            if (reqData && reqData.id) {
                                incomingMap[user.id] = reqData.id;
                            }
                        }
                    } catch {}
                    try {
                        const res = await fetchWithAuth(`http://${API_IP}/friends/${user.id}`, {
                            headers: token ? { Authorization: `Bearer ${token}` } : {},
                        });
                        if (res.ok) {
                            const friendData = await res.json();
                            if (friendData && friendData.id) {
                                friends[user.id] = true;
                            }
                        }
                    } catch {
                        // ignore
                    }
                })
            );
            setFriendRequestMap(map);
            setIncomingRequestMap(incomingMap);
            setFriendsMap(friends);

            // Trie les résultats : d'abord ceux qui m'ont envoyé une demande, puis les autres
            const lowerSearch = query.trim().toLowerCase();
            data.sort((a, b) => {
                const aIncoming = incomingMap[a.id] ? -1 : 1;
                const bIncoming = incomingMap[b.id] ? -1 : 1;
                if (aIncoming !== bIncoming) return aIncoming - bIncoming;
                // Ensuite, trie par pertinence de recherche
                const aMatch = (a.username || a.name || '').toLowerCase().startsWith(lowerSearch) ? -1 : 1;
                const bMatch = (b.username || b.name || '').toLowerCase().startsWith(lowerSearch) ? -1 : 1;
                if (aMatch !== bMatch) return aMatch - bMatch;
                // Sinon, trie par username alphabétique
                return (a.username || a.name || '').localeCompare(b.username || b.name || '');
            });
            setResults(data);
        } catch {
            setResults([]);
            setFriendRequestMap({});
            setIncomingRequestMap({});
            setFriendsMap({});
        }
        setLoading(false);
    };

    // Déplace le composant UserRow en dehors de SearchScreen pour utiliser les hooks correctement
    function UserRow({ item }) {
        // Utilise le friendRequestMap pour déterminer l'état initial
        const initialState = friendRequestMap[item.id] ? 'pending' : 'add';
        const [friendState, setFriendState] = useState(initialState);
        const [friendRequestId, setFriendRequestId] = useState(friendRequestMap[item.id] || null);
        const [incomingRequestId, setIncomingRequestId] = useState(incomingRequestMap?.[item.id] || null);
        const [isFriend, setIsFriend] = useState(friendsMap?.[item.id] || false);

        // Met à jour l'état si le friendRequestMap change (ex: nouvelle recherche)
        useEffect(() => {
            setFriendState(friendRequestMap[item.id] ? 'pending' : 'add');
            setFriendRequestId(friendRequestMap[item.id] || null);
            setIncomingRequestId(incomingRequestMap?.[item.id] || null);
            setIsFriend(friendsMap?.[item.id] || false);
        }, [friendRequestMap, incomingRequestMap, friendsMap, item.id]);

        const handleAddFriend = async (e) => {
            e.stopPropagation && e.stopPropagation();
            if (friendState === 'add') {
                setFriendState('pending');
                try {
                    const token = await SecureStore.getItemAsync('access_token');
                    const res = await fetchWithAuth(`http://${API_IP}/friendrequests`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        },
                        body: JSON.stringify({ user_id: item.id }),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (data.id) setFriendRequestId(data.id);
                    }
                } catch(e) {
                    console.error('Error sending friend request:', e);
                    // Optionnel: gestion d'erreur
                }
            } else if (friendState === 'pending') {
                setFriendState('add');
                try {
                    if (friendRequestId) {
                        await fetchWithAuth(`http://${API_IP}/friendrequests/${friendRequestId}`, {
                            method: 'DELETE',
                        });
                        setFriendRequestId(null);
                    }
                } catch(e) {
                    console.error('Error cancelling friend request:', e);
                    // Optionnel: gestion d'erreur
                }
            }
        };

        const handleAccept = async (e) => {
            e.stopPropagation && e.stopPropagation();
            try {
                const token = await SecureStore.getItemAsync('access_token');
                const res = await fetchWithAuth(`http://${API_IP}/friendrequests/${incomingRequestId}/accept`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });
                if (res.ok) {
                    setFriendState('pending');
                    // Optionnel: mettre à jour localement l'état de l'ami
                }
            } catch (e) {
                console.error('Error accepting friend request:', e);
            }
        };

        const handleRefuse = async (e) => {
            e.stopPropagation && e.stopPropagation();
            try {
                const token = await SecureStore.getItemAsync('access_token');
                const res = await fetchWithAuth(`http://${API_IP}/friendrequests/${incomingRequestId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });
                if (res.ok) {
                    setIncomingRequestId(null);
                    // Optionnel: mettre à jour localement l'état de l'ami
                }
            } catch (e) {
                console.error('Error refusing friend request:', e);
            }
        };

        return (
            <View style={styles.userItem}>
                <View style={{
                    marginRight: 12,
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: '#e0e0e0',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={item.pp_url ? { uri: item.pp_url } : require('../../assets/profile.png')}
                        style={{ width: 36, height: 36, borderRadius: 18 }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>{item.username}</Text>
                    <Text style={styles.userFullName}>{item.full_name}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                </View>
                {isFriend ? (
                    <View style={{ marginLeft: 8, alignSelf: 'center' }}>
                        <Text style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: 13 }}>Ami(e)</Text>
                    </View>
                ) : incomingRequestId ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                        <Text style={{ color: '#2196F3', fontWeight: 'bold', fontSize: 12 }}>
                            Vous a envoyé une demande
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={{
                            backgroundColor: friendState === 'pending' ? '#aaa' : '#2196F3',
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            borderRadius: 16,
                            marginLeft: 8,
                            alignSelf: 'center',
                        }}
                        onPress={handleAddFriend}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>
                            {friendState === 'pending' ? "Demande envoyée" : "Ajouter"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Search Users</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        ref={inputRef}
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Search for users..."
                        value={search}
                        onChangeText={setSearch}
                        autoCapitalize="none"
                        onFocus={async () => {
                            setShowCancel(true);
                            // Rafraîchit le friendRequestMap pour tous les utilisateurs affichés
                            if (results.length > 0) {
                                await refreshFriendRequestsForResults(results);
                            }
                        }}
                        onBlur={() => setShowCancel(false)}
                    />
                    {(showCancel || search.length > 0) && (
                        <TouchableOpacity
                            onPress={() => {
                                setSearch('');
                                inputRef.current && inputRef.current.blur();
                                setShowCancel(false);
                            }}
                            style={{
                                marginLeft: 8,
                                backgroundColor: '#eee',
                                borderRadius: 16,
                                paddingVertical: 6,
                                paddingHorizontal: 14,
                            }}
                        >
                            <Text style={{ color: '#888', fontWeight: 'bold', fontSize: 14 }}>Annuler</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <FlatList
                data={results}
                keyExtractor={item => item.id?.toString() || item.email}
                renderItem={({ item }) => <UserRow item={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    !loading && search.length > 0 ? (
                        <Text style={styles.emptyText}>No users found.</Text>
                    ) : null
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 20, fontWeight: '600' },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 40,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
    },
    userFullName: {
        fontSize: 13,
        color: '#888',
        marginBottom: 1,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 24,
    },
});
