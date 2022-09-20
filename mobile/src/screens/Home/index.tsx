import { useEffect, useState } from "react";
import { View, Image, FlatList } from "react-native";
import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";

import { GAMES } from "../../utils/games";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  useEffect(() => {
    try {
      fetch("http://localhost:3333/games")
        .then((response) => response.json())
        .then((data) => setGames(data));
    } catch (error) {
      console.log(error);
    }
    setGames(GAMES);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
