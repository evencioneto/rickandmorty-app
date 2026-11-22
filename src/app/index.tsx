import { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { Personagem } from "@/types/personagem";
import { router } from "expo-router";

export default function HomeScreen() {
  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscarPersonagens() {
      try {
        const resposta = await fetch("https://rickandmortyapi.com/api/character");
        if (!resposta.ok) {
          throw new Error("Erro " + resposta.status);
        }
        const dados = await resposta.json();
        setPersonagens(dados.results);
      } catch (e) {
        console.log(e);
        setErro("Não foi possível carregar os personagens");
      } finally {
        setCarregando(false)
      }
    }

    buscarPersonagens();
  }, []);
  
  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={personagens}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push({ pathname: "/personagem/[id]", params: { id: item.id } })
          }>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Title title={item.name} subtitle={item.species} />
          </Card>
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
  card: {
    flex: 1,
    margin: 8,
  },
});