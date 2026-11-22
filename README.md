# Rick and Morty App 🛸

Aplicativo mobile feito com **React Native + Expo** que consome a [Rick and Morty API](https://rickandmortyapi.com), mostra os personagens da série, abre os detalhes de cada um e permite **favoritar** personagens, que ficam salvos no celular.

> Projeto acadêmico do curso de **Análise e Desenvolvimento de Sistemas (ADS), 3º período**.

## 📋 Enunciados

| Atividade | Enunciado | Versão |
|---|---|---|
| **Atividade 1** | *"Desenvolva um app em React Native + Expo que consuma dados de uma API e exiba em tela."* | tag [`atividade-1`](https://github.com/evencioneto/rickandmorty-app/tree/atividade-1) |
| **Atividade 2** | *"Desenvolva um app em React Native + Expo que consuma dados de uma API e exiba em tela (pode utilizar o da atividade anterior). Além disso, monte uma estratégia de navegação entre telas/componentes, utilize o React Native Paper para estilizar a aplicação e o AsyncStorage para armazenar algo localmente."* | branch `main` (esta versão) |

### ✅ Como cada requisito da atividade 2 foi atendido

| Requisito | Solução |
|---|---|
| Consumir uma API e exibir em tela | Lista de personagens (`GET /api/character`) e detalhes de um personagem (`GET /api/character/{id}`) |
| Navegação entre telas | **Expo Router** com navegação em pilha (**Stack**) entre 3 telas: lista → detalhes, lista → favoritos → detalhes |
| Estilizar com React Native Paper | `PaperProvider` com tema escuro `MD3DarkTheme` e componentes `Card`, `Avatar`, `Chip`, `Button`, `IconButton`, `List.Item`, `Text` e `ActivityIndicator` |
| Armazenar algo localmente com AsyncStorage | Os **personagens favoritos** são salvos no aparelho e continuam lá depois de fechar o app |

---

## 📱 Telas

```
┌──────────────────┐   toque no   ┌──────────────────┐
│ Rick and Morty ❤️│   cartão     │  ← Detalhes      │
│  ┌────┐ ┌────┐   │ ───────────► │   (foto)         │
│  │Rick│ │Mort│   │              │  Rick Sanchez    │
│  └────┘ └────┘   │              │  [Alive]         │
└──────────────────┘              │  Espécie, gênero │
         │ toque no ❤️            │  origem, local   │
         ▼                        │  [❤️ Favoritar]  │ ──► salva no
┌──────────────────┐   toque no   └──────────────────┘     AsyncStorage
│  ← Favoritos     │   favorito          ▲
│  (o) Rick        │ ────────────────────┘
└──────────────────┘ ◄── lê do AsyncStorage
```

| Tela | Arquivo | O que faz |
|---|---|---|
| **Lista** | `src/app/index.tsx` | Busca os personagens na API e mostra uma grade de 2 colunas com `Card` (foto, nome e espécie). O ❤️ do cabeçalho abre os favoritos |
| **Detalhes** | `src/app/personagem/[id].tsx` | Busca um personagem pelo `id` e mostra foto, nome, status, espécie, gênero, origem e local atual. Tem o botão **Favoritar / Remover dos favoritos** |
| **Favoritos** | `src/app/favoritos.tsx` | Lista os personagens salvos no AsyncStorage. Tocar em um abre os detalhes. Se não houver nenhum, mostra uma mensagem |

## ✨ Funcionalidades

- Lista de personagens em grade de 2 colunas, com foto, nome e espécie
- Tela de detalhes de cada personagem
- Favoritar e desfavoritar personagens, com os dados **salvos no aparelho**
- Tela de favoritos que se atualiza sempre que é aberta
- Indicador de carregamento enquanto os dados são baixados
- Mensagem de erro se não for possível buscar os dados (sem internet ou erro da API)
- Tema escuro próprio, independente do modo claro ou escuro do celular

## 🧰 Tecnologias

| Tecnologia | Para que foi usada |
|---|---|
| [React Native](https://reactnative.dev) | Construir a interface do app |
| [Expo](https://expo.dev) (SDK 58) | Criar, rodar e testar o projeto (Expo Go) |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Navegação entre telas baseada em arquivos (Stack) |
| [React Native Paper](https://callstack.github.io/react-native-paper/) | Componentes visuais prontos no padrão Material Design 3 |
| [@expo/vector-icons](https://docs.expo.dev/guides/icons/) | Ícones usados pelo Paper (coração, status) |
| [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/) | Guardar os favoritos no aparelho |
| [TypeScript](https://www.typescriptlang.org) | Tipagem dos dados (tipo `Personagem`) |

## 🌐 API utilizada

| Endpoint | Uso |
|---|---|
| `GET https://rickandmortyapi.com/api/character` | Lista de personagens (o app usa o campo `results`) |
| `GET https://rickandmortyapi.com/api/character/{id}` | Um personagem específico (a resposta já é o próprio personagem) |

Exemplo de personagem:

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "gender": "Male",
  "origin": { "name": "Earth (C-137)" },
  "location": { "name": "Citadel of Ricks" },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
}
```

## ▶️ Como rodar o projeto

**Pré-requisitos:** [Node.js](https://nodejs.org) instalado e o app **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)).

```bash
# 1. Clonar o repositório
git clone https://github.com/evencioneto/rickandmorty-app.git
cd rickandmorty-app

# 2. Instalar as dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npx expo start
```

Depois, escaneie o QR code com o Expo Go (Android) ou com a câmera (iOS). Para abrir no navegador, aperte `w` no terminal.

> 💡 Se o app mostrar uma versão antiga ou um erro estranho do Metro, reinicie limpando o cache: `npx expo start -c`

Para ver a versão da atividade 1: `git checkout atividade-1`

## 📁 Estrutura do projeto

```
src/
├── app/                      # telas (cada arquivo aqui é uma rota do Expo Router)
│   ├── _layout.tsx           # navegação Stack, tema do Paper e botão ❤️ do cabeçalho
│   ├── index.tsx             # tela da lista de personagens
│   ├── favoritos.tsx         # tela de favoritos
│   └── personagem/
│       └── [id].tsx          # tela de detalhes (rota dinâmica)
├── storage/
│   └── favoritos.ts          # funções que leem e salvam os favoritos no AsyncStorage
└── types/
    └── personagem.ts         # tipo Personagem, compartilhado entre as telas
```

Código que **não é tela** (tipos e armazenamento) fica fora de `src/app/`, porque tudo dentro dessa pasta vira uma rota.

---

## 🛠️ Como foi feito

### 1. Navegação com Expo Router (Stack)

No Expo Router, **cada arquivo em `src/app/` é uma tela** e o nome do arquivo vira o endereço. O `_layout.tsx` define **como** as telas se organizam. Foi usada uma **Stack** (pilha): cada tela nova é empilhada por cima da anterior, e o botão voltar ← tira a de cima.

```tsx
<PaperProvider theme={MD3DarkTheme}>
  <Stack screenOptions={{ headerStyle: { backgroundColor: "#0b1220" }, headerTintColor: "#97ce4c" }}>
    <Stack.Screen
      name="index"
      options={{
        title: "Rick and Morty",
        headerRight: () => (
          <IconButton icon="heart" iconColor="#97ce4c" onPress={() => router.push("/favoritos")} />
        ),
      }}
    />
    <Stack.Screen name="personagem/[id]" options={{ title: "Detalhes" }} />
    <Stack.Screen name="favoritos" options={{ title: "Favoritos" }} />
  </Stack>
</PaperProvider>
```

**Rota dinâmica:** o arquivo `personagem/[id].tsx` serve para **todos** os personagens. Os colchetes indicam que essa parte do endereço muda (`/personagem/1`, `/personagem/2`...). A tela lê o valor com `useLocalSearchParams`:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
```

E para navegar até ela, ao tocar num cartão:

```tsx
router.push({ pathname: "/personagem/[id]", params: { id: item.id } });
```

> O projeto usa **rotas tipadas** (`typedRoutes`), então o formato com `pathname` + `params` permite que o TypeScript avise se o nome da tela estiver errado.

### 2. Estilização com React Native Paper

O `PaperProvider` no `_layout.tsx` fornece o tema (`MD3DarkTheme`) para todo o app. Assim, os textos e componentes já vêm com as cores certas, sem precisar definir `color` em cada `Text`.

```tsx
<Card style={styles.card} onPress={...}>
  <Card.Cover source={{ uri: item.image }} />
  <Card.Title title={item.name} subtitle={item.species} />
</Card>
```

Componentes usados: `Card`, `Avatar.Image`, `Chip`, `Button`, `IconButton`, `List.Item`, `Text` (com `variant`) e `ActivityIndicator`.

> No Expo SDK 58 os ícones **não vêm mais incluídos** no Expo, então foi preciso instalar `@expo/vector-icons` (`npx expo install @expo/vector-icons`) para o Paper conseguir desenhar os ícones.

### 3. Busca na API (`useEffect` + `fetch`)

O mesmo padrão é usado na lista e nos detalhes: três estados (`dados`, `carregando`, `erro`) e uma busca dentro do `useEffect`.

```tsx
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
```

- **`[id]`** no final faz a busca rodar quando a tela abre e de novo se o `id` mudar
- **`if (!resposta.ok)`**: o `fetch` só falha sozinho quando não alcança o servidor; se a API responder com erro (404, 500), o erro é lançado com `throw` para cair no `catch`
- Antes do `return` principal, a tela mostra o `ActivityIndicator` enquanto `carregando` e a mensagem se houver `erro` (*early return*)

### 4. Favoritos com AsyncStorage

O AsyncStorage guarda dados no aparelho em pares **chave → valor**, e **só aceita texto**. Por isso a lista de favoritos é convertida com `JSON.stringify` para salvar e `JSON.parse` para ler. Essas funções ficam em `src/storage/favoritos.ts`, para serem reaproveitadas pelas telas:

```tsx
const CHAVE = "favoritos";

export async function lerFavoritos(): Promise<Personagem[]> {
  const texto = await AsyncStorage.getItem(CHAVE);
  return texto ? JSON.parse(texto) : [];
}

export async function salvarFavoritos(lista: Personagem[]) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}
```

Na tela de detalhes, o botão adiciona ou remove o personagem da lista:

```tsx
async function alternarFavorito() {
  if (!personagem) return;

  const favoritos = await lerFavoritos();
  let novaLista: Personagem[];

  if (favorito) {
    novaLista = favoritos.filter((p) => p.id !== personagem.id); // remove
  } else {
    novaLista = [...favoritos, personagem];                      // adiciona
  }

  await salvarFavoritos(novaLista);
  setFavorito(!favorito);
}
```

Ao abrir os detalhes, `favoritos.some((p) => p.id === dados.id)` verifica se o personagem já é favorito, para mostrar o botão certo.

### 5. Tela de favoritos (`useFocusEffect`)

Com a Stack, ao voltar para uma tela ela **não é recriada**, então um `useEffect` com `[]` não rodaria de novo. A tela de favoritos usa o **`useFocusEffect`**, que roda **toda vez que a tela fica visível**. Assim, se um personagem for removido nos detalhes, ele some da lista ao voltar:

```tsx
useFocusEffect(
  useCallback(() => {
    async function carregarFavoritos() {
      const lista = await lerFavoritos();
      setFavoritos(lista);
    }
    carregarFavoritos();
  }, [])
);
```

### 6. Tipo compartilhado

O tipo `Personagem` fica em `src/types/personagem.ts` com `export`, e é importado pelas três telas e pelo arquivo de armazenamento (`import { Personagem } from "@/types/personagem"`). O `@/` é um atalho para a pasta `src/`.

## 🧪 Como testar

1. **Navegação:** toque num personagem e veja os detalhes; use ← para voltar
2. **Favoritar:** nos detalhes, toque em **Favoritar**; o botão muda para **Remover dos favoritos**
3. **Tela de favoritos:** toque no ❤️ do cabeçalho da lista; o personagem aparece lá
4. **Armazenamento local:** feche o app completamente e abra de novo; o favorito continua salvo
5. **Atualização ao voltar:** nos favoritos, abra um personagem, remova-o e volte; ele some da lista
6. **Erro:** troque a URL da API por uma inválida e recarregue; aparece a mensagem de erro

## ✅ Qualidade de código

```bash
npx tsc --noEmit   # verificação de tipos (TypeScript)
npx expo lint      # verificação de boas práticas (ESLint)
```

## 📚 O que aprendi

**Atividade 1:** consumir API com `fetch`, `async`/`await` e `try`/`catch`/`finally`; estados com `useState` e efeitos com `useEffect`; tipagem com TypeScript; listas com `FlatList`; estilos com `StyleSheet` e Flexbox.

**Atividade 2:**
- Navegação com Expo Router: Stack, rotas dinâmicas (`[id]`), `router.push`, `useLocalSearchParams` e botões no cabeçalho
- Componentes e temas do React Native Paper
- Armazenamento local com AsyncStorage e conversão com `JSON.stringify` / `JSON.parse`
- Métodos de lista: `some`, `filter` e o operador spread (`...`)
- `useFocusEffect` para atualizar uma tela ao voltar para ela
- Organizar o código em pastas (`types`, `storage`) e compartilhar com `export` / `import`
- Usar `git tag` para guardar a versão de uma entrega
- Investigar problemas de ambiente (cache do Metro, biblioteca de ícones ausente)

## 👤 Autor

**Evencio Neto**, estudante de Análise e Desenvolvimento de Sistemas, 3º período.

Dados e imagens fornecidos pela [Rick and Morty API](https://rickandmortyapi.com). *Rick and Morty* é uma marca de seus respectivos donos; este é um projeto acadêmico sem fins comerciais.
