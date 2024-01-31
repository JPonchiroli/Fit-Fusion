import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";

import Login from "./src/screens/Login";
import CreateAccount from "./src/screens/CreateAccount";
import TabScreen from "./src/screens/TabScreen";
import CriarTreino from "./src/screens/Treinos/CriarTreino";
import Peito from './src/screens/Treinos/CriarTreino/Peito';
import Ombro from './src/screens/Treinos/CriarTreino/Ombro';
import Costas from './src/screens/Treinos/CriarTreino/Costas';
import Biceps from './src/screens/Treinos/CriarTreino/Biceps';
import Triceps from './src/screens/Treinos/CriarTreino/Triceps';
import Inferiores from './src/screens/Treinos/CriarTreino/Inferiores';
import Abdominal from './src/screens/Treinos/CriarTreino/Abdominal';

//import DetalheExercicio from './src/screens/Treinos/CriarTreino/DetalheExercicio';

import TreinoSelecionado from "./src/screens/Treinos/TreinoSelecionado";
import ExercicioSelecionado from "./src/screens/Treinos/TreinoSelecionado/ExercicioSelecionado";

const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();

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
          name="Peito"
          component={Peito}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ombro"
          component={Ombro}
          options={{ headerShown: false }}
        />      
        <Stack.Screen
          name="Costas"
          component={Costas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Biceps"
          component={Biceps}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Triceps"
          component={Triceps}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inferiores"
          component={Inferiores}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Abdominal"
          component={Abdominal}
          options={{ headerShown: false }}
        />
         {/*
        <Stack.Screen
          name="DetalheExercicio"
          component={DetalheExercicio}
          options={{ headerShown: false }}
        />*/}
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;
