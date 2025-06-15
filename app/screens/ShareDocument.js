import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '../constants/config';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function ShareDocument() {
  // photoUri est le chemin local (URI) de la photo prise par la caméra, passé en paramètre de navigation depuis la page précédente.
  const { photoUri } = useLocalSearchParams();
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        const res = await fetchWithAuth(`http://${API_IP}/friends`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          // Pour chaque friend, récupérer les infos utilisateur
          const users = await Promise.all(
            (Array.isArray(data) ? data : []).map(async (friend) => {
              try {
                const userRes = await fetchWithAuth(`http://${API_IP}/users/${friend.user_id}`, {
                  headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                if (userRes.ok) {
                  const userData = await userRes.json();
                  return {
                    id: friend.user_id,
                    username: userData.username,
                    full_name: userData.full_name,
                    pp_url: userData.pp_url,
                    email: userData.email,
                  };
                }
              } catch {}
              // fallback minimal
              return { id: friend.user_id };
            })
          );
          setFriends(users);
        }
      } catch {
        setFriends([]);
      }
    };
    fetchFriends();
  }, []);

  const handleToggleFriend = (id) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleConfirmSend = async () => {
    setLoading(true);
    try {
      // 1. Upload le fichier avec MultipartFormData natif (fetch, pas fetchWithAuth)
      const formData = new FormData();
      // Le backend attend "files" (avec un S) comme clé pour le champ fichier !
      formData.append('files', {
        uri: photoUri,
        name: 'document.jpg',
        type: 'image/jpeg',
      });

      const token = await SecureStore.getItemAsync('access_token');
      // Utilise fetch natif pour l'upload multipart (ne pas passer Content-Type, laisser React Native le gérer)
      const uploadRes = await fetchWithAuth(`http://${API_IP}/files`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!uploadRes.ok) {
        setLoading(false);
        Alert.alert('Erreur', "L'envoi du fichier a échoué.");
        return;
      }

      const uploadData = await uploadRes.json();
      const files = Array.isArray(uploadData) ? uploadData : [uploadData];

      // 2. Pour chaque fichier, partage avec les amis sélectionnés
      for (const file of files) {
        if (file.id) {
          await fetchWithAuth(`http://${API_IP}/files/${file.id}/share`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ userIds: selectedFriends }),
          });
        }
      }

      setLoading(false);
      Alert.alert('Envoyé', `La photo a été envoyée à ${selectedFriends.length} ami(s).`);
      // Supprime la visualisation de la photo prise après envoi
      router.replace('/(dashboard)/DocumentScanScreen');
    } catch (e) {
      setLoading(false);
      Alert.alert('Erreur', "Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#222', padding: 24 }}>
      {/* Affiche la roue de chargement pendant l'envoi */}
      {loading && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Text style={{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 18,
        marginTop: 30 // Ajoute un espace en haut
      }}>
        Choisissez les amis à qui envoyer
      </Text>
      <ScrollView style={{ flex: 1 }}>
        {friends.length === 0 ? (
          <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 40 }}>
            Aucun ami trouvé.
          </Text>
        ) : (
          friends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#333',
              }}
              onPress={() => handleToggleFriend(friend.id)}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: '#eee',
                  marginRight: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                {friend.pp_url ? (
                  <Image
                    source={{ uri: friend.pp_url }}
                    style={{ width: 28, height: 28, borderRadius: 14 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      overflow: 'hidden',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#eee',
                    }}
                  >
                    <Image
                      source={require('../../assets/profile.png')}
                      style={{ width: 28, height: 28, borderRadius: 14, resizeMode: 'cover' }}
                    />
                  </View>
                )}
              </View>
              <Text style={{ color: '#fff', fontSize: 16, flex: 1 }}>
                {friend.full_name || friend.username || friend.email}
              </Text>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  borderWidth: 2,
                  borderColor: selectedFriends.includes(friend.id) ? '#2196F3' : '#888',
                  backgroundColor: selectedFriends.includes(friend.id) ? '#2196F3' : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {selectedFriends.includes(friend.id) && (
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#aaa',
            borderRadius: 20,
            paddingVertical: 12,
            paddingHorizontal: 28,
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectedFriends.length > 0 ? '#2196F3' : '#555',
            borderRadius: 20,
            paddingVertical: 12,
            paddingHorizontal: 28,
          }}
          onPress={handleConfirmSend}
          disabled={selectedFriends.length === 0}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
