import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from "@expo/vector-icons";

const CriarTreino = () => {
  const navigation = useNavigation();
  const musculoEscolhido = [
    { nome: "Peito", imagem: require("../../../img/peito.jpg") },
    { nome: "Ombro", imagem: require("../../../img/ombro.jpg") },
    { nome: "Costas", imagem: require("../../../img/costas.jpg") },
    { nome: "Biceps", imagem: require("../../../img/biceps.jpg") },
    { nome: "Triceps", imagem: require("../../../img/triceps.jpg") },
    { nome: "Perna", imagem: require("../../../img/perna.jpg") },
    { nome: "Abdominal", imagem: require("../../../img/abdominal.jpg") },
  ];

  const handleMusclePress = (muscle) => {
    navigation.navigate("GrupoMuscular", { grupoMuscular: muscle.nome });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          width: '100%',
          flex: 1,
          height: '100%',
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={['#000', '#0f0f0f', 'rgba(15, 15, 15, 0.88)', '#121212', '#252525']}
      >
      <View style={styles.header}>
        <Feather
          name="arrow-left-circle"
          size={30}
          color={"#fff"}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.muscleContainer}>
          {musculoEscolhido.map((muscle, index) => (
            <TouchableOpacity
              key={index}
              style={styles.muscleCard}
              onPress={() => handleMusclePress(muscle)}
            >
              <Image
                source={muscle.imagem}
                style={styles.image}
              />
              <View style={styles.overlay}>
                <Text style={styles.title}>{muscle.nome}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  muscleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  muscleCard: {
    width: "45%",
    aspectRatio: 1, // To maintain a square aspect ratio
    marginBottom: 20,
    overflow: "hidden",
    borderRadius: 15,
    position: "relative",
  },
  image: {
    flex: 1,
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CriarTreino;
