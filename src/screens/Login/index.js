import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Button,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import firebase from "../../config/firebaseConfig";

const Login = () => {
  const navigation = useNavigation();
  const [emailDoUsuario, setEmailDoUsuario] = useState("joao@gmail.com");
  const [senha, setSenha] = useState("123456");

  const loginSuccess = async () => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(emailDoUsuario, senha);

      if (response.user) {
        setEmailDoUsuario("");
        setSenha("");
        navigation.navigate("Tabs");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  const createAccount = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <View>
          <Image
            style={{ maxHeight: 130, maxWidth: 130, marginBottom: 40 }}
            source={require("../../img/BODY_IMG.png")}
          />
        </View>
        <View style={styles.inputUsuario}>
          <Ionicons
            name="person"
            id="input-usuario"
            size={32}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={emailDoUsuario}
            fontSize={16}
            placeholderTextColor={"#fff"}
            color={"#fff"}
            onChangeText={(text) => setEmailDoUsuario(text)}
          />
        </View>

        <View style={styles.inputUsuario}>
          <Ionicons
            name="lock-closed"
            id="input-senha"
            size={32}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={senha}
            fontSize={16}
            placeholderTextColor={"#fff"}
            color={"#fff"}
            onChangeText={(text) => setSenha(text)}
          />
        </View>
        <Button
          style={styles.button}
          title="Login"
          color="rgba(255, 57, 83, 1)"
          marginTop="50"
          onPress={loginSuccess}
        />

        <Button
          style={styles.buttonText}
          title="Não Possui uma conta?"
          color="transparent"
          marginTop="50"
          onPress={createAccount}
        />
      </SafeAreaView>
    </View>
  );
};

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
});

export default Login;
