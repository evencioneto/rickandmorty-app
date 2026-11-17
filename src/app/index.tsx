import { useState, useEffect } from "react";
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

type Personagem = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};
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
        <Text style={styles.mensagem}>{erro}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Rick and Morty</Text>
      <FlatList
        data={personagens}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.foto} />
            <Text style={styles.nome}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
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
  titulo: {
    color: "#97ce4c",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  card: {
    flex: 1,
    alignItems: "center",
    margin: 8,
    padding: 12,
    backgroundColor: "#1c2533",
    borderRadius: 12,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nome: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  mensagem: {
    color: "white",
  },
});