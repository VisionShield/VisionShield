import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';

const sharedDocs = [
  { id: '1', name: 'Contrat SGM.pdf' },
  { id: '2', name: 'Facture 2024.pdf' },
  { id: '3', name: 'Présentation Projet.pptx' },
];

export default function DocShareScreen() {
  const handleDocPress = () => {
    // Affiche l'image download.jpg (doit être dans assets ou accessible par URL)
    // Ici, on affiche l'image sous la liste
    setShowDownload(true);
  };

  const [showDownload, setShowDownload] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Documents partagés</Text>
      <FlatList
        data={sharedDocs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.docItem} onPress={handleDocPress}>
            <Text style={styles.docName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {showDownload && (
        <View style={styles.downloadContainer}>
          <Image
            source={require('../../assets/download.jpg')}
            style={styles.downloadImage}
            resizeMode="contain"
          />
          <Text style={styles.downloadText}>Téléchargement...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  docItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  docName: { fontSize: 16, color: '#333' },
  downloadContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  downloadImage: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  downloadText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});
