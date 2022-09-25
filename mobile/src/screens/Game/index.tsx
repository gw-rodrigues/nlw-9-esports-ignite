import { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * Para podermos obter as informações de navegação e os params
 * teremos importar o useRoutes.
 *
 * Importaremos as tipagens do GameParams da navigation.d.ts
 */
import { useNavigation, useRoute } from "@react-navigation/native";

/**
 * Bibliotecas de icons
 */
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { THEME } from "../../theme";

import { GameParams } from "../../@types/navigation";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  useEffect(() => {
    try {
      fetch(`http://192.168.3.7:3333/games/${game.id}/ads`)
        .then((response) => response.json())
        .then((data) => {
          setDuos(data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Nao existem anúncios para este jogo.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
