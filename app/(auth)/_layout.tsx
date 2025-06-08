import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {

  return (
    <>

        <Stack screenOptions={{
            headerShown: false,
            
            }}>
            <Stack.Screen
                name="(auth)/login"
                options={{
                    title: "Login",
                    //headerShown: false,
                }}
            />
            <Stack.Screen
                name="(auth)/register"
                options={{
                    title: "Register",
                    //headerShown: false,
                }}
            />
            <Stack.Screen
                name="(dashboard)"
                options={{

                  headerShown: false,
                }}
            />
            <Stack.Screen
                name="index"
                options={{
                    title: "Back",
                    headerShown: false,
                }}
            />
        </Stack>
    </>
  );
}

export default RootLayout;