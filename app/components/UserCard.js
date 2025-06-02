import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import UserCard from '../components/UserCard';

const users = [
    { id: '1', avatar: '👩‍⚕️', name: 'Olivia Turner, M.D.', subtitle: "Manager of Link's Project", status: 'online' },
    { id: '2', avatar: '👨‍💼', name: 'Dr. Alexander Bennett, Ph.D.', subtitle: "Lawyer in charge", status: 'offline' },
];

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mes utilisateurs :</Text>
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <UserCard
                        avatar={item.avatar}
                        name={item.name}
                        subtitle={item.subtitle}
                        status={item.status}
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
    title: { fontWeight: 'bold', fontSize: 18, marginBottom: 12, color: '#1a1a1a' },
});
