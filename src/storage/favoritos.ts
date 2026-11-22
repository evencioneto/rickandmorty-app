import AsyncStorage from "@react-native-async-storage/async-storage";
import { Personagem } from "@/types/personagem";

const CHAVE = "favoritos";

export async function lerFavoritos(): Promise<Personagem[]> {
  const texto = await AsyncStorage.getItem(CHAVE);
  return texto ? JSON.parse(texto) : [];
}

export async function salvarFavoritos(lista: Personagem[]) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}