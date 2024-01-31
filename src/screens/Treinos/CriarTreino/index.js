import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ImageBackground,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

console.disableYellowBox = true;

export default function CriarTreino() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.top1}>
        <View>
          <Feather
            name="arrow-left-circle"
            size={30}
            color={"#fff"}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.mainTreino}>
          <TouchableOpacity
            style={styles.treinos}
            onPress={() => navigation.navigate("Peito")}
          >
            <ImageBackground
              source={require("../../../img/peito.jpg")}
              style={styles.image}
            >
              <Text style={styles.titulo}>Peitoral</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/*
          <TouchableOpacity
            style={styles.treinos}
            onPress={() => navigation.navigate("Ombro")}
          >
            <ImageBackground
              source={require("../../../img/ombro.jpg")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.titulo}>Ombro</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.treinos}
            onPress={() => navigation.navigate("Costas")}
          >
            <ImageBackground
              source={require("../../../img/costas.jpg")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.titulo}>Costas</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.treinos}
            onPress={() => navigation.navigate("Biceps")}
          >
            <ImageBackground
              source={require("../../../img/biceps.jpg")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.titulo}>Bíceps</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.treinos}
            onPress={() => navigation.navigate("Triceps")}
          >
            <ImageBackground
              source={require("../../../img/triceps.jpg")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.titulo}>Tríceps</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.treinos}
            onPress={() => navigation.navigate("Inferiores")}
          >
            <ImageBackground
              source={require("../../../img/perna.jpg")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.titulo}>Inferiores</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.treinos}
            onPress={() => navigation.navigate("Abdominal")}
          >
            <ImageBackground
              source={require("../../../img/abdominal.jpg")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.titulo}>Abdominal</Text>
            </ImageBackground>
          </TouchableOpacity>
  */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTreino: {
    height: "100%",
    display: "flex",
    width: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#FFF",
    marginTop: 30,
  },

  top1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
    textAlign: "center",
    padding: 10,
  },

  topTitulo: {
    color: "#000",
  },
  main: {
    width: "100%",
    maxHeight: "100%",
  },
  treinos: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",

    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: "100%",
    height: "12.45%",
  },

  titulo: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
  },

  image: {
    width: "30%",
    height: "100%",
    flex: 1,
  },
});
