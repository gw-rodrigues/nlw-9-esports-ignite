import { TouchableOpacity, View, Image } from "react-native";
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

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  console.log(game);

  const navigation = useNavigation();

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

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
      </SafeAreaView>
    </Background>
  );
}
