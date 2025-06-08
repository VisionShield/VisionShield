import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3479e3", // bleu doux pour l'icône active
        tabBarInactiveTintColor: "#444", // gris foncé pour l'icône inactive
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: "#f7f7fa", // gris très clair
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
      <Tabs.Screen
        name="SettingsScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/settings.png")}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#3479e3" : "#444",
              }}
            />
          ),
        }}
      />
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