import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from '@expo/vector-icons';
import { registerUser } from "../../config/firebaseAuth";
import { useNavigation } from "@react-navigation/native";

console.disableYellowBox = true;

export default function Home() {
  const navigation = useNavigation()

  const [email, setEmail] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [senha, setSenha] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function handleCadastro() {
    if (
      senha === "" &&
      confirmarSenha === "" &&
      nomeCompleto === "" &&
      email === ""
    ) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "Senha e Confirmar Senha devem ser iguais");
      return;
    }

    if (senha === "") {
      Alert.alert("Erro", "Senha deve ser preenchida");
      return;
    }

    if (confirmarSenha === "") {
      Alert.alert("Erro", "Confirmação da senha deve ser preenchida");
      return;
    }

    if (nomeCompleto === "") {
      Alert.alert("Erro", "Nome deve ser preenchido");
      return;
    }

    if (email === "") {
      Alert.alert("Erro", "Email deve ser preenchido");
      return;
    }

    if (peso === "") {
      Alert.alert("Erro", "Peso deve ser preenchido");
      return;
    }

    if (altura === "") {
      Alert.alert("Erro", "Altura deve ser preenchido");
      return;
    }

    try {
      await registerUser(email, nomeCompleto, senha, altura, peso);
      navigation.goBack()
    } catch (error) {
      // Lida com erros de registro
    }
  }

  function hasAccount() {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <View></View>

        <View style={styles.inputUsuario}>
          <Ionicons
            name="mail"
            size={32}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            fontSize={16}
            placeholderTextColor={"#fff"}
            color={"#fff"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputUsuario}>
          <Ionicons
            name="person"
            size={32}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            fontSize={16}
            placeholderTextColor={"#fff"}
            color={"#fff"}
            value={nomeCompleto}
            onChangeText={(text) => setNomeCompleto(text)}
          />
        </View>

        <View style={styles.inputUsuario}>
          <MaterialIcons
            name="fitness-center"
            size={32}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Peso (kg)"
            keyboardType="numeric"
            fontSize={16}
            placeholderTextColor={"#fff"}
            color={"#fff"}
            value={peso}
            onChangeText={(text) => setPeso(text)}
          />
        </View>

        <View style={styles.inputUsuario}>
          <Ionicons
            name="today"
            size={32}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Altura (m)"
            keyboardType="numeric"
            fontSize={16}
            placeholderTextColor={"#fff"}
            color={"#fff"}
            value={altura}
            onChangeText={(text) => setAltura(text)}
          />
        </View>

        <View style={styles.inputUsuario}>
          <Ionicons
            name="lock-closed"
            size={32}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            fontSize={16}
            placeholderTextColor={"#fff"}
            color={"#fff"}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>
        <View style={styles.inputUsuario}>
          <Ionicons
            name="lock-closed"
            size={32}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            fontSize={16}
            placeholderTextColor={"#fff"}
            color={"#fff"}
            value={confirmarSenha}
            onChangeText={(text) => setConfirmarSenha(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.text1}>CADASTRAR</Text>
        </TouchableOpacity>

        <Button
          style={styles.buttonText}
          title="Já tem uma conta?"
          color="transparent"
          marginTop="50"
          onPress={hasAccount}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 300,
    width: 280,
    borderRadius: 15,
    maxHeight: "100vh",
    maxWidth: "100vw",
  },
  button: {
    backgroundColor: "rgba(255, 57, 83, 1)",
    padding: 10,
    borderRadius: 5,
  },
  text1: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    color: "rgba(255, 255, 255, 0.24)",
    borderStyle: "solid",
    borderColor: "rgba(255, 57, 83, 1)",
    borderWidth: 1,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    width: 200,
    fontSize: 20,
    marginBottom: 30,
    padding: 9.5,
  },

  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputUsuario: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    backgroundColor: "rgba(255, 57, 83, 1)",
    height: 49,
    paddingBottom: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingLeft: 5,
  },
  text: {
    color: "white",
  },
});
