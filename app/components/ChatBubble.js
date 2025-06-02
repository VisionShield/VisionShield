import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import ChatBubble from '../components/ChatBubble';

const messages = [
    { id: '1', text: 'Hey, did you review the contract?', sent: false },
    { id: '2', text: 'Yes, I have some comments', sent: true },
];

export default function ChatScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ChatBubble text={item.text} sent={item.sent} />
                )}
                contentContainerStyle={{ padding: 16 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
});
