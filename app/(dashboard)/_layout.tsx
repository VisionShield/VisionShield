import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3479e3",
        tabBarInactiveTintColor: "#444",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: "#f7f7fa",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/home.png")}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#3479e3" : "#444",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="DocumentScanScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/scan.png")}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#3479e3" : "#444",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/search.png")}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#3479e3" : "#444",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ChatListScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/convs.png")}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#3479e3" : "#444",
              }}
            />
          ),
        }}
      />
      {/* ⚠️ Assure-toi qu'il n'y a PAS de fichier index.js, index.tsx, UserProfile.js, UserProfile.tsx, ou [id].js directement dans app/(dashboard)/ */}
      {/* ⚠️ Vérifie que tu n'as pas de _layout.tsx dans app/(dashboard)/(user_profile)/ */}
      {/* ⚠️ Le fichier du profil doit être UNIQUEMENT dans app/(dashboard)/(user_profile)/[id].js */}
      {/* ⚠️ Si tu as un fichier app/(dashboard)/(user_profile)/index.js ou app/(dashboard)/(user_profile)/UserProfile.js, SUPPRIME-LE */}
      {/* ⚠️ Après avoir fait ces vérifications, fais un "npx expo start -c" pour vider le cache Expo Router */}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default DashboardLayout;