import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const chats = [
    {
        id: '1',
        name: 'Olivia Turner',
        lastMessage: 'Hey, did you review the contract?',
        time: '10:30 AM',
        unread: 2,
        avatar: '👩⚕️',
    },
    {
        id: '2',
        name: 'Legal Team',
        lastMessage: 'Important security update',
        time: '9:45 AM',
        unread: 0,
        avatar: '👨💼',
    },
];

export default function ChatListScreen() {
    const [search, setSearch] = useState('');
    const [filteredChats, setFilteredChats] = useState(chats);

    const handleSearch = (text) => {
        setSearch(text);
        if (text.trim() === '') {
            setFilteredChats(chats);
        } else {
            setFilteredChats(
                chats.filter(c =>
                    c.name.toLowerCase().includes(text.toLowerCase()) ||
                    c.lastMessage.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };

    const renderChat = ({ item }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
                router.push({
                    pathname: '/screens/FaceRecognitionScreen',
                    params: { target: '/screens/ChatScreen', userId: item.id },
                })
            }
        >
            <View style={styles.avatar}>
                <Text style={{ fontSize: 24 }}>{item.avatar}</Text>
            </View>
            <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text
                    style={[styles.lastMessage, item.unread > 0 && styles.unreadMessage]}
                    numberOfLines={1}
                >
                    {item.lastMessage}
                </Text>
            </View>
            <View style={styles.chatMeta}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                )}
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
                            // marginRight: 8, // plus besoin de marge
                        }}
                        placeholder="🔍 Rechercher"
                        value={search}
                        onChangeText={handleSearch}
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            <FlatList
                data={filteredChats}
                keyExtractor={item => item.id}
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
});
