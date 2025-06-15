import React, { useState, useEffect, useRef } from 'react';
import {View, Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Image,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';
import { fetchWithAuth } from '../utils/fetchWithAuth';

// Supprime toute référence à userNames et affiche simplement "Chat" ou "Conversation" dans l'en-tête
export default function ChatScreen() {
    const { conv_id, other_participant_id, other_participant_name } = useLocalSearchParams();
    console.log(`ChatScreen loaded with conv_id: ${conv_id}, other_participant_id: ${other_participant_id}`);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [modalImageUri, setModalImageUri] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const ws = useRef(null);
    // Récupère les messages de la conversation depuis l'API
    useEffect(() => {
        async function fetchMessages() {
            try {
                const token = await SecureStore.getItemAsync('access_token');
                const res = await fetchWithAuth(`http://${API_IP}/conversations/${conv_id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                if (!res.ok) {
                    setMessages([]);
                    return;
                }
                const data = await res.json();
                const user_id_val = await SecureStore.getItemAsync('user_id');
                // On ne récupère pas l'image ici, juste l'id de l'attachment
                const mapped = Array.isArray(data)
                    ? data.map(msg => ({
                        id: msg.id,
                        text: msg.content,
                        time: msg.timestamp,
                        sent: user_id_val && msg.from && msg.from.toString() === user_id_val.toString(),
                        attachmentId: msg.attachment && typeof msg.attachment === 'string' ? msg.attachment : null,
                    }))
                    : [];
                setMessages(mapped);
            } catch (e) {
                setMessages([]);
            }
        }
        fetchMessages();
    }, [conv_id]);

    useEffect(() => {
        let wsInstance = null;
        let isMounted = true;

        async function connectWS() {
            const token = await SecureStore.getItemAsync('access_token');
            const user_id_val = await SecureStore.getItemAsync('user_id');
            const wsUrl = `ws://${API_IP}/chat`;
            wsInstance = new WebSocket(wsUrl);
            ws.current = wsInstance;

            wsInstance.onopen = () => {
                if (!isMounted) return;
                if (token) {
                    wsInstance.send(JSON.stringify({ type: 'token', token }));
                }
            };
            wsInstance.onerror = (e) => {
                if (!isMounted) return;
                console.log('WebSocket error:', e.message);
            };
            wsInstance.onmessage = (e) => {
                if (!isMounted) return;
                try {
                    const data = JSON.parse(e.data);
                    // Vérifie que le message reçu concerne bien la conversation courante
                    const msgConvId = data.conv_id || data.conversation_id;
                    if (
                        data &&
                        (data.text || data.content || data.message) &&
                        (data.time || data.timestamp) &&
                        msgConvId?.toString() === conv_id?.toString()
                    ) {
                        const msgText = data.text || data.content || data.message;
                        const msgTime = data.time || data.timestamp;
                        const fromId = data.from || data.owner_id;
                        const isMine = user_id_val && fromId && fromId.toString() === user_id_val.toString();
                        setMessages(prev => [
                            {
                                id: data.id || Date.now().toString(),
                                text: msgText,
                                time: msgTime,
                                sent: isMine,
                            },
                            ...prev,
                        ]);
                    }
                } catch (err) {
                    // ignore invalid messages
                }
            };
            wsInstance.onclose = () => {
                // Optionnel: gestion de la fermeture
            };
        }

        connectWS();

        return () => {
            isMounted = false;
            wsInstance && wsInstance.close();
        };
    }, [conv_id]);

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const now = new Date();
            const isoTime = now.toISOString();
            const user_id = await SecureStore.getItemAsync('user_id');
            // N'ajoute plus le message localement ici, laisse le WebSocket gérer l'affichage
            setNewMessage('');
            if (ws.current && ws.current.readyState === 1) {
                ws.current.send(JSON.stringify({
                    type: 'text',
                    conv_id: conv_id,
                    message: newMessage,
                    from: user_id,
                    to: other_participant_id,
                    timestamp: isoTime,
                }));
            }
        }
    };

    // Fonction pour charger et afficher l'image en plein écran
    const handleShowAttachment = async (attachmentId) => {
        if (!attachmentId) return;
        setImageModalVisible(true);
        setModalImageUri(null);
        setModalLoading(true);
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const fileRes = await fetchWithAuth(`http://${API_IP}/files/${attachmentId}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (fileRes.ok) {
                const blob = await fileRes.blob();
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
                setModalImageUri(`data:image/jpeg;base64,${base64}`);
            }
        } catch {}
        setModalLoading(false);
    };

    const renderMessage = ({ item }) => {
        let displayTime = '';
        if (item.time) {
            try {
                const dateObj = new Date(item.time);
                displayTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } catch {
                displayTime = item.time;
            }
        }
        // Si c'est un message image uniquement (pas de texte), affiche juste le bouton visualiser hors bulle
        if (item.attachmentId && !item.text) {
            return (
                <View style={{ alignItems: item.sent ? 'flex-end' : 'flex-start', marginVertical: 8 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#eee',
                            borderRadius: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            marginBottom: 6,
                        }}
                        onPress={() => handleShowAttachment(item.attachmentId)}
                    >
                        <Text style={{ color: '#2196F3', fontWeight: 'bold' }}>Visualiser l'image</Text>
                    </TouchableOpacity>
                    <Text style={[styles.messageTime, { alignSelf: item.sent ? 'flex-end' : 'flex-start' }]}>{displayTime}</Text>
                </View>
            );
        }
        // Message texte ou mixte
        return (
            <View style={[styles.messageBubble, item.sent ? styles.sentMessage : styles.receivedMessage]}>
                {item.text ? (
                    <Text style={styles.messageText}>{item.text}</Text>
                ) : null}
                <Text style={styles.messageTime}>{displayTime}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.chatName}>
                    {other_participant_name || '...'}
                </Text>
                <TouchableOpacity onPress={() => router.push('/screens/UserDetailsScreen')}>
                    <Ionicons name="information-circle" size={24} color="#333" />
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={20}
            >
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={[styles.messagesContainer, { paddingBottom: 0 }]}
                    inverted
                    keyboardShouldPersistTaps="handled"
                />
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
            </KeyboardAvoidingView>
            {/* Modal d'affichage de l'image en plein écran */}
            {imageModalVisible && (
                <View style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 100,
                }}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 40,
                            right: 30,
                            zIndex: 101,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: 20,
                            padding: 8,
                        }}
                        onPress={() => {
                            setImageModalVisible(false);
                            setModalImageUri(null);
                            setModalLoading(false);
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold' }}>✕</Text>
                    </TouchableOpacity>
                    {modalLoading && (
                        <ActivityIndicator size="large" color="#fff" />
                    )}
                    {modalImageUri && (
                        <Image
                            source={{ uri: modalImageUri }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                        />
                    )}
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    chatName: { fontSize: 18, fontWeight: '600' },
    messagesContainer: { padding: 16 },
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
    messageText: { fontSize: 16, color: '#333' },
    messageTime: { fontSize: 12, color: '#666', marginTop: 4, alignSelf: 'flex-end' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8, // Réduit le padding
        paddingBottom: 0, // Supprime l'espace en bas
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
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