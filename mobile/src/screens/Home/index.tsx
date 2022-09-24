import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
/**
 * NO LUGAR do -> View
 * SafeAreaView -> ajuda evitar areas view de diversos dispositivos, como botoes e cortes/design da tela.
 */
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { styles } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  useEffect(() => {
    try {
      fetch("http://192.168.3.7:3333/games")
        .then((response) => response.json())
        .then((data) => {
          setGames(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**
   * useNavigation() -> recebemos as rotas, e opções de navegação
   *  - navigation.navigate("game"); -> conseguimos navegar entre páginas
   */
  const navigation = useNavigation();
  /**
   * Consoante a navigation.d.ts, como definimos tipagem, teremos que passar os valores
   * na função handleOpenGame para poder receber na nova view/stack
   * passamos no navigation as informações necessária, como rota e params
   * -> navigation.nagigate("game", { id, title, bannerUrl });
   */
  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
