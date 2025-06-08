import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure navigation context is ready
    const timer = setTimeout(() => {
      setIsReady(true);
      router.replace('/(auth)/AuthScreen');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
    );
  }

  return null;
}
