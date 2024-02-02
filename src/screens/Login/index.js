import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Button,
  SafeAreaView,
  TextInput,
  Image,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { login } from "../../config/firebaseAuth";

const Login = () => {
  const navigation = useNavigation();
  const [emailDoUsuario, setEmailDoUsuario] = useState("joao@gmail.com");
  const [senha, setSenha] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);

  const loginSuccess = async () => {
    try {
      const user = await login(emailDoUsuario, senha);

      if (user) {
        setEmailDoUsuario("");
        setSenha("");
        setPasswordError(false);
        setShowErrorText(false);
        navigation.navigate("Tabs");
      }
    } catch (error) {
      setPasswordError(true);
      setShowErrorText(true);
      console.log(error.message);
      setTimeout(() => {
        setShowErrorText(false);
        setPasswordError(false);
      }, 1000);
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
            style={[
              passwordError ? styles.input2 : styles.input,
                passwordError && {
                  borderColor: "rgba(255, 57, 83, 1)",
                  backgroundColor: "rgba(255, 57, 83, 1)",
                  marginBottom: 30,
                },
              ]}
            value={emailDoUsuario}
            fontSize={16}
            placeholder="Email"
            placeholderTextColor="#fff"
            color="#fff"
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
           style={[
            passwordError ? styles.input2 : styles.input,
              passwordError && {
                borderColor: "rgba(255, 57, 83, 1)",
                backgroundColor: "rgba(255, 57, 83, 1)",
              },
            ]}
            value={senha}
            fontSize={16}
            placeholder="Senha"
            placeholderTextColor="#fff"
            color="#fff"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setSenha(text)}
          />
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            id="toggle-password"
            size={24}
            color="#fff"
            style={styles.icon2}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        {showErrorText && (
          <Text style={styles.errorText}>Usuário / Senha incorreta. Tente novamente.</Text>
        )}

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
  errorText: {
    color: "rgba(255, 57, 83, 1)",
    marginBottom: 30,
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

  input2: {
    color: "rgba(255, 255, 255, 0.24)",
    borderStyle: "solid",
    borderColor: "rgba(255, 57, 83, 1)",
    borderWidth: 1,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    width: 200,
    fontSize: 20,
    marginBottom: 5,
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

  icon2: {
    backgroundColor: "rgba(255, 57, 83, 1)",
    height: 49,
    paddingBottom: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: '4%',
    paddingLeft: 5,
    paddingRight: 5,
  },

});

export default Login;
