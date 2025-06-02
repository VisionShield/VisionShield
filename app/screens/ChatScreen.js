import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const messages = [
    { id: '1', text: 'Hey, did you review the contract?', sent: false, time: '10:30 AM' },
    { id: '2', text: 'Yes, I have some comments', sent: true, time: '10:31 AM' },
];

export default function ChatScreen() {
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim()) {
            // Add message logic
            setNewMessage('');
        }
    };

    const renderMessage = ({ item }) => (
        <View style={[styles.messageBubble, item.sent ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.chatName}>Olivia Turner</Text>
                <TouchableOpacity>
                    <Ionicons name="information-circle" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Messages List */}
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.messagesContainer}
                inverted
            />

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="send" size={24} color="white" />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    chatName: {
        fontSize: 18,
        fontWeight: '600',
    },
    messagesContainer: {
        padding: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginVertical: 8,
    },
    sentMessage: {
        backgroundColor: '#2196F3',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    receivedMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    sentMessageText: {
        color: 'white',
    },
    messageTime: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    input: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 12,
        maxHeight: 120,
    },
    sendButton: {
        backgroundColor: '#2196F3',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
