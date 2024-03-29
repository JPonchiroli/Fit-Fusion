import React, { forwardRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";

import Login from "./src/screens/Login";
import TabScreen from "./src/screens/TabScreen";
import CreateAccount from "./src/screens/CreateAccount";
import CriarTreino from "./src/screens/Treinos/CriarTreino";
import TreinoSelecionado from "./src/screens/Treinos/TreinoSelecionado";
import GrupoMuscular from "./src/screens/Treinos/CriarTreino/GrupoMuscular";
import ExercicioSelecionado from "./src/screens/Treinos/TreinoSelecionado/ExercicioSelecionado";
import DetalheExercicio from "./src/screens/Treinos/CriarTreino/GrupoMuscular/DetalheExercicio";

const Stack = createStackNavigator();

const ToastWithRef = forwardRef((props, ref) => {
  useEffect(() => {
    // Definindo a ref do Toast assim que o componente for montado
    if (ref) {
      ref.current = Toast;
    }
  }, [ref]);

  return <Toast {...props} />;
});

const App = () => {
  const toastRef = React.useRef(null);

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
      <ToastWithRef ref={toastRef} />
    </NavigationContainer>
  );
};

export default App;
