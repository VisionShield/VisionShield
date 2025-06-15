import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';

export default function DocumentScanScreen() {
  const [isScanning, setIsScanning] = useState(false); // Par d├®faut false, le cadre n'est pas affich├®
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState('back'); // 'back' ou 'front'

  // Demande la permission d├¿s le montage
  React.useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  const handleScan = async () => {
    const response = await requestPermission();
    if(response.granted) {
      console.log("TODO : Permission has been granted")
      setIsScanning(true);
    } else {
      setIsScanning(false)
      console.log("TODO: Gestion en cas de non permission")
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setIsScanning(false);
      // Alert removed: Document scanned successfully!
    }
  };

  const handleSwitchCamera = () => {
    setCameraType((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const handleCancelPhoto = () => {
    setPhotoUri(null);
    setIsScanning(false);
  };

  const handleSendPhoto = () => {
    // Navigue vers la page ShareDocument en passant l'uri de la photo
    router.push({
      pathname: '/screens/ShareDocument',
      params: { photoUri }
    });
  };

  const handleSavePhoto = () => {
    // TODO: Enregistrer la photo localement (photoUri)
    Alert.alert('Enregistr├®', 'La photo a ├®t├® enregistr├®e dans le t├®l├®phone.');
    // Vous pouvez ajouter ici la logique pour sauvegarder dans la galerie si besoin
  };

  // Ajoute la gestion du double tap pour retourner la cam├®ra
  const lastTapRef = useRef(0);
  const handleCameraDoubleTap = () => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 300) {
      handleSwitchCamera();
    }
    lastTapRef.current = now;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      {/* Cam├®ra plein ├®cran */}
      <View style={{ flex: 1 }}>
        {photoUri ? (
          <>
            <Image
              source={{ uri: photoUri }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
              resizeMode="cover"
            />
            {/* Croix pour annuler */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 40,
                left: 20,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 20,
                padding: 8,
                zIndex: 20,
              }}
              onPress={handleCancelPhoto}
            >
              <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>Ô£ò</Text>
            </TouchableOpacity>
            {/* Bouton enregistrer */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 110, // remonte le bouton
                left: 30,
                backgroundColor: '#4CAF50',
                borderRadius: 24,
                paddingVertical: 14,
                paddingHorizontal: 28,
                zIndex: 20,
              }}
              onPress={handleSavePhoto}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>Enregistrer</Text>
            </TouchableOpacity>
            {/* Bouton envoyer */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 110, // remonte le bouton
                right: 30,
                backgroundColor: '#2196F3',
                borderRadius: 24,
                paddingVertical: 14,
                paddingHorizontal: 28,
                zIndex: 20,
              }}
              onPress={handleSendPhoto}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>Envoyer</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {permission?.granted ? (
              <TouchableOpacity
                activeOpacity={1}
                style={{ flex: 1, width: '100%' }}
                onPress={handleCameraDoubleTap}
              >
                <CameraView
                  ref={cameraRef}
                  facing={cameraType}
                  style={{ flex: 1, width: '100%' }}
                  ratio="4:3"
                />
              </TouchableOpacity>
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.documentIcon}>Permission denied</Text>
              </View>
            )}

            {/* Bouton pour changer de cam├®ra */}
            {permission?.granted && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 40,
                  right: 20,
                  backgroundColor: 'transparent',
                  borderRadius: 20,
                  padding: 0,
                  zIndex: 10,
                  elevation: 2,
                }}
                onPress={handleSwitchCamera}
              >
                <Image
                  source={require('../../assets/camchange.png')}
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: '#2196F3',
                  }}
                />
              </TouchableOpacity>
            )}

            {/* Bouton pour afficher/masquer le cadre */}
            {permission?.granted && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 40,
                  left: 20,
                  backgroundColor: 'transparent',
                  borderRadius: 20,
                  padding: 0,
                  zIndex: 10,
                  elevation: 2,
                }}
                onPress={() => setIsScanning((prev) => !prev)}
              >
                <Image
                  source={require('../../assets/cadre.png')}
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: isScanning ? '#2196F3' : '#fff',
                  }}
                />
              </TouchableOpacity>
            )}

            {/* Cadre de scan du document */}
            {isScanning && (
              <View style={styles.overlayContainer} pointerEvents="none">
                <View style={styles.cameraOverlay}>
                  <View style={styles.documentFrame}>
                    <View style={styles.corners}>
                      <View style={[styles.corner, styles.topLeft]} />
                      <View style={[styles.corner, styles.topRight]} />
                      <View style={[styles.corner, styles.bottomLeft]} />
                      <View style={[styles.corner, styles.bottomRight]} />
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Bouton de capture */}
            {permission?.granted && (
              <TouchableOpacity
                style={[styles.captureButton, { bottom: 110 }]} // remonte le bouton
                onPress={takePicture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222' },
  instruction: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 10,
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  cameraOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentFrame: {
    width: 280,
    height: 400,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentPlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  documentIcon: {
    fontSize: 40,
    color: '#fff',
  },
  corners: { ...StyleSheet.absoluteFillObject },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#4A90E2',
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  captureButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ccc',
    zIndex: 10,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
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
