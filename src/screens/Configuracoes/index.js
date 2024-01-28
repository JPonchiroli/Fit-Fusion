import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { recuperaInfoUsuario } from "../../config/firebaseAuth";
import { auth } from "../../config/firebaseConfig";
import { auth as firebaseAuth1 } from "../../config/firebaseConfig";

export default function Configuracoes() {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    email: "",
    usuario: "",
    kg: "",
    altura: "",
  });
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [kg, setKg] = useState("");
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
    const unsubscribe = firebaseAuth1.onAuthStateChanged(async (user) => {
      if (user) {
        setUserInfo(user);

        // Substitua o código abaixo para usar as novas funções
        recuperaInfoUsuario(user.uid, setUserInfo);
      }
    });
  }, []);

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
          <Text style={styles.subTitleSection}>Aqui está o status de sua conta</Text>
          <View style={styles.divider}></View>
        

        <View style={styles.AcountTextContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Nome Completo: </Text>
            <TextInput
              style={editavel ? styles.inputEditavel : styles.inputNaoEditavel}
              value={userInfo.usuario}
              onChangeText={(text) => setNomeCompleto(text)}
              editable={editavel}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Email: </Text>
            <TextInput
              style={styles.title}
              value={userInfo.email}
              onChangeText={(text) => setEmail(text)}
              editable={editavel}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Peso (kg): </Text>
            <TextInput
              style={editavel ? styles.inputEditavel : styles.inputNaoEditavel}
              value={userInfo.kg}
              onChangeText={(text) => setKg(text)}
              editable={editavel}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Altura (m): </Text>
            <TextInput
              style={editavel ? styles.inputEditavel : styles.inputNaoEditavel}
              value={userInfo.altura}
              onChangeText={(text) => setAltura(text)}
              editable={editavel}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.botao, styles.logoutButton]}
            onPress={logout}
          >
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 20
  },
  headerImage: {
    width: '25%',
    height: '100%',
    marginBottom: 20,
  }, 
  treinoss: {
    padding: 20,
    margin: 10,
  },
  titleSection: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  subTitleSection: {
    color: '#d4d4d4',
    fontSize: 16,
  },
  divider: {
    borderBottomColor: '#d4d4d4', // Set the color of the divider line
    borderBottomWidth: 0.2,     // Set the thickness of the divider line
    marginVertical: 10,       // Adjust the vertical spacing as needed
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
    borderBottomStyle: "solid",
    padding: 1,
  },
  inputEditavel: {
    color: "#FFF",
    textAlign: "center",
    borderBottomColor: "#FFF",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
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
