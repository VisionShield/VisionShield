import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';
import { useFocusEffect } from '@react-navigation/native';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function ChatListScreen() {
    const [search, setSearch] = useState('');
    const [conversations, setConversations] = useState([]);

    // Remplace useEffect par useFocusEffect pour recharger à chaque focus
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            async function fetchConversations() {
                try {
                    const res = await fetchWithAuth(`http://${API_IP}/conversations`);
                    if (!res.ok) {
                        const text = await res.text();
                        console.error('HTTP error:', res.status, text);
                        if (isActive) setConversations([]);
                        return;
                    }
                    const data = await res.json();
                    const mapped = Array.isArray(data)
                        ? data.map(conv => ({
                            ...conv,
                            last_message: conv.last_message || '',
                        }))
                        : [];
                    mapped.forEach(conv => {
                        console.log(`Conversation ${conv.conv_id || conv.id}: last_message = "${conv.last_message}"`);
                    });
                    if (isActive) setConversations(mapped);
                } catch (e) {
                    if (isActive) setConversations([]);
                    console.error('Error fetching conversations:', e);
                }
            }
            fetchConversations();
            return () => { isActive = false; };
        }, [])
    );

    const filteredChats = (conversations || []).filter(chat =>
        chat.other_participant_name?.toLowerCase().includes(search.toLowerCase()) ||
        (chat.last_message && chat.last_message.toLowerCase().includes(search.toLowerCase()))
    );

    const renderChat = ({ item }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
                router.push({
                    pathname: '/(chat)/ChatScreen',
                    params: { conv_id: item.conv_id, other_participant_id: item.other_participant_id , other_participant_name: item.other_participant_name },
                })
            }
        >
            <View style={styles.avatar}>
                <Image
                    source={
                        item.pp_url
                            ? { uri: item.pp_url }
                            : require('../../assets/profile.png')
                    }
                    style={{ width: 32, height: 32, borderRadius: 16 }}
                />
            </View>
            <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.other_participant_name}</Text>
                <Text
                    style={styles.lastMessage}
                    numberOfLines={1}
                >
                    {item.last_message_is_your ? `Vous : ${item.last_message}` : item.last_message}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Messages</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={{
                            backgroundColor: '#f0f0f0',
                            borderRadius: 20,
                            paddingHorizontal: 12,
                            height: 36,
                            width: 160,
                        }}
                        placeholder="🔍 Search"
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            <FlatList
                data={filteredChats}
                keyExtractor={item => item.id?.toString() || item.other_participant_name}
                renderItem={renderChat}
                contentContainerStyle={styles.listContent}
            />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 16,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    chatInfo: {
        flex: 1,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    lastMessage: {
        fontSize: 14,
        color: '#666',
    },
    unreadMessage: {
        fontWeight: '500',
        color: '#333',
    },
    chatMeta: {
        alignItems: 'flex-end',
    },
    time: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    unreadBadge: {
        backgroundColor: '#2196F3',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
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
