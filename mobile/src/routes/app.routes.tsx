import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Game } from "../screens/Game";

/**
 * Vamos desestruturar -> createNativeStackNavigator
 * - Navigator: criar navegação
 * - Screen: dizer qual tal rota chamada qual componente devera ser renderizado
 * 
 *  -> Modos de usar:
 *  <Navigator>
      <Screen name="home" component={Home} options={{ headerShow: false }} />
      <Screen name="game" component={Game} />
    </Navigator>

    OU TODOS
    <Navigator screenOptions={{ headerShow: false }}>
      <Screen name="home" component={Home} />
      <Screen name="game" component={Game} />
    </Navigator>

 */
const { Navigator, Screen } = createNativeStackNavigator;

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShow: false }}>
      <Screen name="home" component={Home} />
      <Screen name="game" component={Game} />
    </Navigator>
  );
}
