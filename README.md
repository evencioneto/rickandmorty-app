# Rick and Morty App 🛸

Aplicativo mobile de **uma tela**, feito com **React Native + Expo**, que consome a [Rick and Morty API](https://rickandmortyapi.com) e mostra os personagens da série em uma grade com foto e nome.

> Projeto desenvolvido para a disciplina de desenvolvimento mobile do curso de **Análise e Desenvolvimento de Sistemas (ADS), 3º período**.
> Enunciado: *"Desenvolva um app em React Native + Expo que consuma dados de uma API e exiba em tela."*

---

## ✨ Funcionalidades

- Busca a lista de personagens na API pública do Rick and Morty (sem chave de acesso)
- Exibe os personagens em **2 colunas**, cada um num cartão com **foto redonda e nome**
- Mostra um **indicador de carregamento** enquanto os dados são baixados
- Mostra uma **mensagem de erro** se não for possível buscar os dados (por exemplo, sem internet)
- Título centralizado, respeitando a área segura da tela (relógio, câmera e notch)
- Tema escuro próprio, independente do modo claro ou escuro do celular

## 🧰 Tecnologias

| Tecnologia | Para que foi usada |
|---|---|
| [React Native](https://reactnative.dev) | Construir a interface do app |
| [Expo](https://expo.dev) (SDK 58) | Criar, rodar e testar o projeto (Expo Go) |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Roteamento baseado em arquivos (`src/app/index.tsx` é a tela) |
| [TypeScript](https://www.typescriptlang.org) | Tipagem dos dados (tipo `Personagem`) |
| [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) | Exibir as fotos com cache |
| [react-native-safe-area-context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/) | Evitar que o conteúdo fique embaixo da barra de status |

## 🌐 API utilizada

**Endpoint:** `GET https://rickandmortyapi.com/api/character`

A resposta tem duas partes:

```json
{
  "info": { "count": 826, "pages": 42, "next": "...", "prev": null },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  ]
}
```

O app usa a lista `results`, que traz os 20 personagens da primeira página.

## ▶️ Como rodar o projeto

**Pré-requisitos:** [Node.js](https://nodejs.org) instalado e o app **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)).

```bash
# 1. Clonar o repositório
git clone <url-deste-repositorio>
cd rickyandmorty.app

# 2. Instalar as dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npx expo start
```

Depois, escaneie o QR code com o Expo Go (Android) ou com a câmera (iOS). Para abrir no navegador, aperte `w` no terminal.

> 💡 Se o app mostrar uma versão antiga ou um erro estranho do Metro, reinicie limpando o cache: `npx expo start -c`

## 📁 Estrutura principal

```
src/
└── app/
    ├── _layout.tsx   # layout raiz (gerado pelo template do Expo)
    └── index.tsx     # ⭐ a tela do app: busca na API, lista e estilos
```

Todo o código do trabalho está em [`src/app/index.tsx`](src/app/index.tsx).

## 🛠️ Como foi feito (passo a passo)

### 1. Criação do projeto
O projeto foi criado com `npx create-expo-app@latest`, e o conteúdo de exemplo da tela inicial foi apagado para começar do zero.

### 2. Estados com `useState`
A tela guarda três informações que mudam com o tempo. Quando uma delas muda, a tela é redesenhada:

```tsx
const [personagens, setPersonagens] = useState<Personagem[]>([]); // a lista vinda da API
const [carregando, setCarregando] = useState(true);               // se ainda está buscando
const [erro, setErro] = useState<string | null>(null);            // mensagem de erro, se houver
```

### 3. Tipagem com TypeScript
Foi criado o tipo `Personagem` descrevendo os campos usados da API. Assim o editor sugere os campos e aponta erros de digitação:

```tsx
type Personagem = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};
```

### 4. Busca na API com `useEffect` + `fetch`
A busca acontece dentro de um `useEffect` com `[]`, ou seja, **uma única vez, quando a tela abre**. A função é `async` porque buscar dados na internet demora, e o `await` espera cada etapa terminar:

```tsx
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
      setCarregando(false);
    }
  }
  buscarPersonagens();
}, []);
```

- **`try`**: tenta buscar e guardar os personagens
- **`if (!resposta.ok)`**: o `fetch` só falha sozinho quando não alcança o servidor. Se a API responder com erro (ex.: 404 ou 500), lançamos o erro com `throw` para cair no `catch`
- **`catch`**: se der erro, registra no console e guarda uma mensagem amigável
- **`finally`**: dando certo ou errado, marca que terminou de carregar

### 5. Carregamento e erro (early return)
Antes do `return` principal, a tela verifica as situações especiais e devolve outra interface:

- `carregando` verdadeiro → mostra um `ActivityIndicator` (rodinha) no centro
- `erro` preenchido → mostra a mensagem de erro no centro
- senão → mostra a lista

### 6. Lista com `FlatList`
A `FlatList` só desenha os itens visíveis na tela, o que deixa o app leve mesmo com listas grandes:

```tsx
<FlatList
  data={personagens}                        // a lista a ser exibida
  keyExtractor={(item) => String(item.id)}  // identificador único de cada item
  numColumns={2}                            // grade de 2 colunas
  renderItem={({ item }) => (               // como desenhar cada personagem
    <View style={styles.card}>
      <Image source={item.image} style={styles.foto} />
      <Text style={styles.nome}>{item.name}</Text>
    </View>
  )}
/>
```

### 7. Estilização com `StyleSheet`
Os estilos ficam organizados em um `StyleSheet.create` no fim do arquivo. Destaques:

- `SafeAreaView` para o título não ficar embaixo da barra de status
- `flex: 1` nos cartões para dividirem cada linha meio a meio
- `borderRadius` igual à metade do tamanho da foto para deixá-la redonda
- Cores próprias (fundo `#0b1220` e título no verde do portal, `#97ce4c`), para o app não depender do tema claro ou escuro do celular

## 🧪 Como testar o tratamento de erro

1. Em `src/app/index.tsx`, troque a URL por uma inválida:
   - servidor inexistente (ex.: `rickandmortyapiXXX.com`), que cai direto no `catch`
   - página inexistente (ex.: `/api/characterXXX`), em que a API responde 404 e o `if (!resposta.ok)` lança o erro
2. Recarregue o app: a mensagem **"Não foi possível carregar os personagens"** deve aparecer
3. Volte a URL ao normal

## ✅ Qualidade de código

```bash
npx tsc --noEmit   # verificação de tipos (TypeScript)
npx eslint src     # verificação de boas práticas (ESLint)
```

## 📚 O que aprendi

- Consumir uma API REST com `fetch`, `async`/`await` e `try`/`catch`/`finally`
- Controlar o estado da tela com `useState` e efeitos com `useEffect`
- Tipar dados com TypeScript
- Exibir listas performáticas com `FlatList`
- Pensar na experiência do usuário: carregamento, erro e área segura
- Organizar estilos com `StyleSheet` e montar layouts com Flexbox
- Resolver problemas de ferramenta (cache do Metro com `npx expo start -c`)

## 👤 Autor

**Evencio Neto**, estudante de Análise e Desenvolvimento de Sistemas, 3º período.

Dados e imagens fornecidos pela [Rick and Morty API](https://rickandmortyapi.com). *Rick and Morty* é uma marca de seus respectivos donos; este é um projeto acadêmico sem fins comerciais.
