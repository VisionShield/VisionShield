import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ta', label: 'தமிழ்' },
];

const ChooseLanguageScreen = ({ navigation, route }) => {
  const handleLanguageSelect = (langCode) => {
    // TODO: Save selected language (e.g., AsyncStorage, context, redux, etc.)
    // Example: navigation.navigate('NextScreen', { language: langCode });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your language</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={styles.button}
          onPress={() => handleLanguageSelect(lang.code)}
        >
          <Text style={styles.buttonText}>{lang.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ChooseLanguageScreen;
