import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";

import Login from "./src/screens/Login";
import CreateAccount from "./src/screens/CreateAccount";
import TabScreen from "./src/screens/TabScreen";
import CriarTreino from "./src/screens/Treinos/CriarTreino";
import GrupoMuscular from './src/screens/Treinos/CriarTreino/GrupoMuscular';
import DetalheExercicio from './src/screens/Treinos/CriarTreino/GrupoMuscular/DetalheExercicio';
import TreinoSelecionado from "./src/screens/Treinos/TreinoSelecionado";
import ExercicioSelecionado from "./src/screens/Treinos/TreinoSelecionado/ExercicioSelecionado";

const Stack = createStackNavigator();

console.disableYellowBox = true;
console.disableRedBox = true;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TreinoSelecionado"
          component={TreinoSelecionado}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExercicioSelecionado"
          component={ExercicioSelecionado}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="CriarTreino"
          component={CriarTreino}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GrupoMuscular"
          component={GrupoMuscular}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetalheExercicio"
          component={DetalheExercicio}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;
