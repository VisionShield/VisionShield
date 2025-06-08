// app/screens/UtilisateursListScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Utilisateurs from '../constants/Utilisateurs';

export default function UtilisateursListScreen() {
  const handlePress = (userId) => {
    router.push({ pathname: '/(chat)/ChatScreen', params: { userId } });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handlePress(item.id)}>
      {item.avatar === '👩‍⚕️' || item.avatar === '👩' || item.avatar === '👩‍💼' ? (
        <Image source={require('../../assets/iconef.png')} style={{ width: 30, height: 30, marginRight: 16 }} />
      ) : (
        <Image source={require('../../assets/iconeh.png')} style={{ width: 30, height: 30, marginRight: 16 }} />
      )}
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Users</Text>
      </View>
      <FlatList
        data={Utilisateurs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
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
    backgroundColor: '#f5f5f5',
  },
  title: { fontSize: 20, fontWeight: '600' },
  list: { padding: 16 },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: { fontSize: 30, marginRight: 16 },
  userInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500', marginBottom: 2 },
  lastMessage: { fontSize: 14, color: '#666' },
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
