import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function UserDetailsScreen() {
  const user = {
    firstName: 'Neelesh',
    lastName: 'Chaudary',
    age: 29,
    phone: '+33 6 12 34 56 78',
    email: 'neelesh.chaudary@email.com',
    job: 'Designer',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>User Information</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>First name:</Text>
        <Text style={styles.value}>{user.firstName}</Text>

        <Text style={styles.label}>Last name:</Text>
        <Text style={styles.value}>{user.lastName}</Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{user.age} years</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Job:</Text>
        <Text style={styles.value}>{user.job}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  back: {
    fontSize: 24,
    marginRight: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
