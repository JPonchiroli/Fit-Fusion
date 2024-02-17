import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  confirmaEdicao,
  recuperaInfoUsuario,
} from "../../config/firebaseDatabase";
import { auth } from "../../config/firebaseConfig";

export default function Configuracoes() {
  const navigation = useNavigation();
  const uid = auth.currentUser.uid;
  const user = auth.currentUser;

  const [userInfo, setUserInfo] = useState({
    email: user.email,
    usuario: "",
    peso: "",
    altura: "",
  });
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [editavel, setEditavel] = useState(false);

  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  }, [navigation]);

  useEffect(() => {
    const loadUserInfo = async () => {
      const userData = await recuperaInfoUsuario(uid);
      
      setEmail(userData.email);
      setNomeCompleto(userData.nomeCompleto);
      setPeso(userData.peso);
      setAltura(userData.altura);
    };

    if (user) {
      loadUserInfo();
    }
  }, [user, uid]);

  const confirmaEdicaoCallback = async () => {
    try {
      await confirmaEdicao(uid, nomeCompleto, peso, altura);
      setEditavel(false);
    } catch (error) {
      console.error("Erro ao confirmar edição do perfil:", error.message);
    }
  };

  function atualizarPerfil() {
    setEditavel(!editavel);
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          width: "100%",
          height: "100%",
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[
          "#000",
          "#0f0f0f",
          "rgba(15, 15, 15, 0.88)",
          "#121212",
          "#252525",
        ]}
      >
        <LinearGradient
          style={{
            width: "100%",
            height: 110,

            borderRadius: 10,
            justifyContent: "center", // Align content in the center vertically
            padding: 20, // Add some padding for better appearance
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={[
            "rgba(245,90,110,1)",
            "rgba(244,72,94,1)",
            "rgba(219,64,84,1)",
          ]}
        >
          <View style={styles.header}>
            <Image
              source={require("./../../img/BODY_IMG.png")}
              style={styles.headerImage}
            />
          </View>
        </LinearGradient>

        <View style={styles.treinoss}>
          <Text style={styles.titleSection}>Minha conta</Text>
          <Text style={styles.subTitleSection}>
            Aqui está o status de sua conta
          </Text>
          <View style={styles.divider}></View>

          <View style={styles.AcountTextContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Email: </Text>
              <TextInput
                style={styles.title}
                value={email}
                onChangeText={(text) => setEmail(text)}
                editable={editavel}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.title}>Nome Completo: </Text>
              <TextInput
                style={
                  editavel ? styles.inputEditavel : styles.inputNaoEditavel
                }
                value={nomeCompleto}
                onChangeText={(text) => setNomeCompleto(text)}
                editable={editavel}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.title}>Peso (kg): </Text>
              <TextInput
                style={
                  editavel ? styles.inputEditavel : styles.inputNaoEditavel
                }
                keyboardType="numeric"
                value={peso}
                onChangeText={(text) => setPeso(text)}
                editable={editavel}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.title}>Altura (m): </Text>
              <TextInput
                style={
                  editavel ? styles.inputEditavel : styles.inputNaoEditavel
                }
                keyboardType="numeric"
                value={altura}
                onChangeText={(text) => setAltura(text)}
                editable={editavel}
              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            {editavel ? (
              <TouchableOpacity
                style={styles.botao}
                onPress={confirmaEdicaoCallback}
              >
                <Text style={styles.logoutText}>Confirmar Edição</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.botao} onPress={atualizarPerfil}>
                <Text style={styles.logoutText}>Editar Perfil</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.buttonsContainer}>
            {editavel ? (
              <TouchableOpacity style={styles.botao} onPress={atualizarPerfil}>
                <Text style={styles.logoutText}>Cancelar Edição</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.botao} onPress={logout}>
                <Text style={styles.logoutText}>LOGOUT</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingTop: 20,
  },
  headerImage: {
    width: "25%",
    height: "100%",
    marginBottom: 20,
  },
  treinoss: {
    padding: 20,
    margin: 10,
  },
  titleSection: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  subTitleSection: {
    color: "#d4d4d4",
    fontSize: 16,
  },
  divider: {
    borderBottomColor: "#d4d4d4", // Set the color of the divider line
    borderBottomWidth: 0.2, // Set the thickness of the divider line
    marginVertical: 10, // Adjust the vertical spacing as needed
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    color: "#FFF",
    textAlign: "center",
  },
  inputNaoEditavel: {
    color: "#FFF",
    textAlign: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 0,
    borderStyle: "solid",
    padding: 1,
  },
  inputEditavel: {
    color: "#FFF",
    textAlign: "center",
    borderBottomColor: "#FFF",
    borderBottomWidth: 2,
    borderStyle: "solid",
    padding: 1,
  },
  AcountTextContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    paddingTop: 30,
  },
  AcountContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  botao: {
    backgroundColor: "rgba(255, 57, 83, 1)",
    padding: 10,
    alignItems: "center",
    width: "40%",
    borderRadius: 30,
    marginBottom: 10,
  },
  logoutText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
