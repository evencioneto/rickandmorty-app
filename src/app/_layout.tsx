import { router, Stack } from "expo-router";
import { IconButton, MD3DarkTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0b1220" },
          headerTintColor: "#97ce4c",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Rick and Morty",
            headerRight: () => (
              <IconButton
                icon="heart"
                iconColor="#97ce4c"
                onPress={() => router.push("/favoritos")}
              />
            ),
          }}
        />
        <Stack.Screen name="personagem/[id]" options={{ title: "Detalhes" }} />
        <Stack.Screen name="favoritos" options={{ title: "Favoritos" }} />
      </Stack>
    </PaperProvider>
  );
}