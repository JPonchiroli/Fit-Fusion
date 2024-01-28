import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  recuperaTreinosDoUsuario,
  recuperaInfoUsuario,
} from "../../config/firebaseAuth";
import { auth } from "../../config/firebaseConfig";
import { Feather } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [treinosDoUsuario, setTreinosDoUsuario] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserInfo(user);

        // Substitua a chamada da função recuperaTreinosDoUsuario
        recuperaTreinosDoUsuario(user.uid, setTreinosDoUsuario);
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
          <Text style={styles.titleSection}>Meus Treinos</Text>
          <Text style={styles.subTitleSection}>
            Aqui está listado todos os seus treinos
          </Text>

          <View style={styles.divider}></View>
          <ScrollView style={styles.scrollViewMenu}>
            {treinosDoUsuario.length > 0 ? (
              treinosDoUsuario.map((treino) => (
                //console.log(treino.nomeTreino),
                <TouchableOpacity
                  style={styles.touchable}
                  key={treino.uid}
                  onPress={() =>
                    navigation.navigate("TreinoSelecionado", { treino })
                  }
                >
                  <Text style={styles.titleNumber}>1</Text>
                  <Text style={styles.title}>{treino.nomeTreino}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>Não há treinos disponíveis.</Text>
            )}
          </ScrollView>
          <View style={styles.touchable2}>
            <TouchableOpacity
              onPress={() => setNomeTreinoContainerVisible(true)}
            >
              <Feather
                style={styles.criarTreinoButton}
                name="plus"
                size={30}
                color={"rgba(255, 57, 83, 1)"}
              />
              <Text>asdasd</Text>
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
  titleSection: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  subTitleSection: {
    color: "#d4d4d4",
    fontSize: 16,
  },
  treinoss: {
    padding: 20,
    margin: 10,
  },
  divider: {
    borderBottomColor: "#d4d4d4", // Set the color of the divider line
    borderBottomWidth: 0.2, // Set the thickness of the divider line
    marginVertical: 10, // Adjust the vertical spacing as needed
  },
  scrollViewMenu: {
    flexDirection: "column",
    height: 500
  },
  nomeTreinoContainerHidden: {
    display: "none",
  },

  nomeTreinoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 57,
    backgroundColor: "#000",
    borderColor: "rgba(255, 57, 83, 1)",
    borderWidth: 2,
    borderRadius: 10,
    zIndex: 99,
    padding: 30,
  },
  nomeTreinoTitle: {
    color: "#FFF",
    padding: 10,
  },
  nomeTreinoInput: {
    borderBottomColor: "rgba(255, 57, 83, 1)",
    borderWidth: 2,
    padding: 5,
  },
  nomeTreinoTouchable: {
    backgroundColor: "rgba(255, 57, 83, 1)",
    borderColor: "rgba(255, 57, 83, 1)",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 20,
  },
  titleNumber: {
    color: "#fff",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 57, 83, 1)",
    padding: 15,
    borderRadius: 250,
    fontWeight: "bold",
    width: "18%",
    textAlign: "center",
    justifyContent: "center",
  },
  touchable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 3,
    borderColor: "#fff",
    margin: 5,
    padding: 30,
    width: 300,
  },
  touchable2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    margin: 5,
    padding: 30,
    position: "absolute",
    top: '87%',
    left: '10%'
  },
  criarTreinoButton: {
    backgroundColor: "#fff",
    borderRadius: 150,
    padding: 10,
  },
  title: {
    color: "#FFF",
  },
});
