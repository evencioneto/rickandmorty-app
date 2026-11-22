import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Card, Chip, Text } from "react-native-paper";
import { Personagem } from "@/types/personagem";

export default function DetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [personagem, setPersonagem] = useState<Personagem | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscarPersonagem() {
      try {
        const resposta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!resposta.ok) {
          throw new Error("Erro " + resposta.status);
        }
        const dados = await resposta.json();
        setPersonagem(dados);
      } catch (e) {
        console.log(e);
        setErro("Não foi possível carregar o personagem");
      } finally {
        setCarregando(false);
      }
    }

    buscarPersonagem();
  }, [id]);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (erro || !personagem) {
    return (
      <View style={styles.centro}>
        <Text>{erro}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Avatar.Image size={200} source={{ uri: personagem.image }} />
      <Text variant="headlineMedium">{personagem.name}</Text>
      <Chip icon="heart-pulse">{personagem.status}</Chip>

      <Card style={styles.info}>
        <Card.Content>
          <Text variant="bodyLarge">Espécie: {personagem.species}</Text>
          <Text variant="bodyLarge">Gênero: {personagem.gender}</Text>
          <Text variant="bodyLarge">Origem: {personagem.origin.name}</Text>
          <Text variant="bodyLarge">Local atual: {personagem.location.name}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
  },
  conteudo: {
    alignItems: "center",
    gap: 16,
    padding: 24,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b1220",
  },
  info: {
    alignSelf: "stretch",
  },
});