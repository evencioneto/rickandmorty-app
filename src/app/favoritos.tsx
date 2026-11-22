import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, List, Text } from "react-native-paper";
import { Personagem } from "@/types/personagem";
import { lerFavoritos } from "@/storage/favoritos";

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState<Personagem[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function carregarFavoritos() {
        const lista = await lerFavoritos();
        setFavoritos(lista);
      }

      carregarFavoritos();
    }, [])
  );

  if (favoritos.length === 0) {
    return (
      <View style={styles.centro}>
        <Text variant="titleMedium">Você ainda não favoritou ninguém 💔</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.species}
            left={() => <Avatar.Image size={48} source={{ uri: item.image }} />}
            onPress={() =>
              router.push({ pathname: "/personagem/[id]", params: { id: item.id } })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b1220",
  },
});