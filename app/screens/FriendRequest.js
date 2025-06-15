import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function FriendRequest() {
    const [tab, setTab] = useState('received'); // 'received' | 'sent'
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    // Récupère les infos utilisateur pour chaque demande
    async function enrichRequests(requests, type) {
        return Promise.all(
            requests.map(async req => {
                let userId;
                let time;
                if (type === 'received') {
                    userId = req.from;
                    time = req.created_at;
                } else {
                    userId = req.to || req.user_id || req.id;
                    time = req.time || req.created_at;
                }
                if (!userId) return req;
                try {
                    const res = await fetchWithAuth(`http://${API_IP}/users/${userId}`);
                    if (!res.ok) return { ...req, time };
                    const user = await res.json();
                    return {
                        ...req,
                        pp_url: user.pp_url,
                        username: user.username,
                        full_name: user.full_name,
                        time: time,
                    };
                } catch {
                    return { ...req, time };
                }
            })
        );
    }

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const token = await SecureStore.getItemAsync('access_token');
                if (!token) {
                    setReceivedRequests([]);
                    setSentRequests([]);
                    setLoading(false);
                    return;
                }
                const [receivedRes, sentRes] = await Promise.all([
                    fetchWithAuth(`http://${API_IP}/friendrequests?type=received`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetchWithAuth(`http://${API_IP}/friendrequests?type=sent`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                ]);
                const receivedData = receivedRes.ok ? await receivedRes.json() : [];
                const sentData = sentRes.ok ? await sentRes.json() : [];
                // Enrichir les demandes avec les infos utilisateur
                const [enrichedReceived, enrichedSent] = await Promise.all([
                    enrichRequests(Array.isArray(receivedData) ? receivedData : [], 'received'),
                    enrichRequests(Array.isArray(sentData) ? sentData : [], 'sent'),
                ]);
                setReceivedRequests(enrichedReceived);
                setSentRequests(enrichedSent);
            } catch {
                setReceivedRequests([]);
                setSentRequests([]);
            }
            setLoading(false);
        };
        fetchRequests();
    }, []);

    const renderRequest = ({ item }) => {
        // Format l'heure en HH:mm
        let displayTime = '';
        if (item.time) {
            try {
                const dateObj = new Date(item.time);
                displayTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } catch {
                displayTime = item.time;
            }
        }

        // Actions pour accepter/refuser
        const handleAccept = async () => {
            try {
                await fetchWithAuth(`http://${API_IP}/friendrequests/${item.id}/accept`, {
                    method: 'PUT',
                });
                // Optionnel: retirer la demande de la liste après acceptation
                setReceivedRequests(prev => prev.filter(req => req.id !== item.id));
            } catch {}
        };

        const handleRefuse = async () => {
            try {
                await fetchWithAuth(`http://${API_IP}/friendrequests/${item.id}`, {
                    method: 'DELETE',
                });
                // Optionnel: retirer la demande de la liste après refus
                setReceivedRequests(prev => prev.filter(req => req.id !== item.id));
            } catch {}
        };

        const handleCancel = async () => {
            try {
                await fetchWithAuth(`http://${API_IP}/friendrequests/${item.id}`, {
                    method: 'DELETE',
                });
                setSentRequests(prev => prev.filter(req => req.id !== item.id));
            } catch {}
        };

        return (
            <View style={{ marginBottom: 18 }}>
                <View style={styles.requestItem}>
                    <View style={styles.avatar}>
                        <Image
                            source={item.pp_url ? { uri: item.pp_url } : require('../../assets/profile.png')}
                            style={{ width: 28, height: 28, borderRadius: 14 }}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {tab === 'received' && (
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={styles.timeText}>{displayTime}</Text>
                            </View>
                        )}
                        <Text style={styles.name}>{item.full_name || ''}</Text>
                        <Text style={styles.username}>@{item.username || ''}</Text>
                        {tab === 'received' && (
                            <View style={[styles.actionRow, { marginTop: 18 }]}>
                                <TouchableOpacity
                                    style={[styles.actionButton, { backgroundColor: '#2196F3', marginRight: 8 }]}
                                    onPress={handleAccept}
                                >
                                    <Text style={styles.actionButtonText}>Accepter</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={handleRefuse}
                                >
                                    <Text style={styles.actionButtonText}>Refuser</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    {tab === 'sent' && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.actionButton} onPress={handleCancel}>
                                <Text style={styles.actionButtonText}>Annuler</Text>
                            </TouchableOpacity>
                            {/* L'heure n'est plus affichée ici */}
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Demandes d'amis</Text>
            </View>
            <View style={styles.tabRow}>
                <TouchableOpacity
                    style={[styles.tabButton, tab === 'received' && styles.tabActive]}
                    onPress={() => setTab('received')}
                >
                    <Text style={[styles.tabText, tab === 'received' && styles.tabTextActive]}>
                        Reçues
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, tab === 'sent' && styles.tabActive]}
                    onPress={() => setTab('sent')}
                >
                    <Text style={[styles.tabText, tab === 'sent' && styles.tabTextActive]}>
                        Envoyées
                    </Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#2196F3" />
            ) : (
                <FlatList
                    data={tab === 'received' ? receivedRequests : sentRequests}
                    keyExtractor={item => item.id?.toString()}
                    renderItem={renderRequest}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={styles.emptyText}>Aucune demande</Text>}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        marginRight: 10,
        padding: 6,
    },
    backButtonText: {
        fontSize: 28,
        color: '#2196F3',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        flex: 1,
    },
    tabRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#2196F3',
    },
    tabText: {
        fontSize: 16,
        color: '#888',
        fontWeight: 'bold',
    },
    tabTextActive: {
        color: '#2196F3',
    },
    listContent: {
        padding: 20,
    },
    requestItem: {
        backgroundColor: '#f7f7fa',
        borderRadius: 10,
        padding: 16,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    },
    username: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    actionButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginLeft: 12,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    emptyText: {
        textAlign: 'center',
        color: '#aaa',
        marginTop: 40,
        fontSize: 16,
    },
    timeText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 4,
        marginBottom: 2,
    },
    actionRow: {
        flexDirection: 'row',
        marginTop: 4,
    },
});
