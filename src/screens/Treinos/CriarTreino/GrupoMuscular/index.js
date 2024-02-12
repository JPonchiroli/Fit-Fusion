import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../../../config/firebaseConfig";
import { recuperaExerciciosDoUsuario } from "../../../../config/firebaseDatabase";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function GrupoMuscular() {
  const route = useRoute();
  const [exercicios, setExercicios] = useState([]);
  const [exerciciosCarregados, setExerciciosCarregados] = useState(false);
  const navigation = useNavigation();

  const { grupoMuscular } = route.params;
  const { treinoUID } = route.params;

  useEffect(() => {
    if (!exerciciosCarregados) {
      recuperaExerciciosDoUsuario(grupoMuscular, setExercicios);
      setExerciciosCarregados(true);
    }
  }, [grupoMuscular, exerciciosCarregados]);

  
  const handleExerciseClick = (item) => {
    navigation.navigate("DetalheExercicio", {
      exercicio: item,
      treinoUID: treinoUID,
      grupoMuscular: grupoMuscular,
    });
  };

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleExerciseClick(item)}>
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseDetails}>
          <Text style={styles.exerciseName}>{item.nome}</Text>
          <Feather name="chevron-right" size={20} color="#fff" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="arrow-left-circle"
          size={30}
          color={"#fff"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={exercicios}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={renderExerciseItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: "8%",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  flatList: {
    width: "100%",
  },

  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },

  exerciseImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },

  exerciseDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  exerciseName: {
    color: "#fff",
    fontSize: 16,
  },
});
