import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";

/**
 * Para podermos obter as informações de navegação e os params
 * teremos importar o useRoutes.
 *
 * Importaremos as tipagens do GameParams da navigation.d.ts
 */
import { useRoute } from "@react-navigation/native";
import { GameParams } from "../../@types/navigation";

/**
 * Bibliotecas de icons
 */
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { TouchableOpacity, View } from "react-native";

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </SafeAreaView>
      ;
    </Background>
  );
}
