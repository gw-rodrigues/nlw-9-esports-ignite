import { SafeAreaView } from "react-native-safe-area-context";
/**
 * Para podermos obter as informações de navegação e os params
 * teremos importar o useRoutes.
 *
 * Importaremos as tipagens do GameParams da navigation.d.ts
 */
import { useNavigation, useRoute } from "@react-navigation/native";

import logoImg from "../../assets/logo-nlw-esports.png";

import { GameParams } from "../../@types/navigation";

/**
 * Bibliotecas de icons
 */
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { TouchableOpacity, View, Image } from "react-native";
import { THEME } from "../../theme";
import { Background } from "../../components/Background";

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  console.log(game);

  const navigation = useNavigation();

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
        </View>
      </SafeAreaView>
    </Background>
  );
}
