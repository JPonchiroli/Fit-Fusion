import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDownloadURL, ref } from "@firebase/storage";
import { auth, storage } from "../../../../../config/firebaseConfig";
import { adicionarExercicio } from "../../../../../config/firebaseDatabase";
import Toast from "react-native-toast-message";

export default function DetalhesExercicio() {
  const route = useRoute();
  const navigation = useNavigation();
  const [urlImagem, setUrlImagem] = useState(null);
  const { exercicio } = route.params || {};
  const { treinoUID } = route.params;
  const { grupoMuscular } = route.params;
  const usuarioUID = auth.currentUser.uid;
  const treinoUid = treinoUID.treinoUID;
  const idImagem = exercicio.idImagem;
  const nomeExercicio = exercicio.nome;

  useEffect(() => {
    const carregarImagemExercicio = async () => {
      try {
        const caminhoRelativo = `${grupoMuscular}/${exercicio.idImagem}`;
        const url = await getDownloadURL(
          ref(storage, `Exercicios/${caminhoRelativo}`)
        );
        setUrlImagem(url);
      } catch (error) {
        console.error(
          `Erro ao carregar imagem para o exercício ${exercicio.codigoExercicio}: ${error.message}`
        );
        setUrlImagem(null);
      }
    };
    carregarImagemExercicio();
  }, []);

  function handleAdicionarExercicio() {
    adicionarExercicio(usuarioUID, treinoUid, idImagem, nomeExercicio);

    Toast.show({
      type: "success",
      position: "top",
      text1: "Exercicio adicionado!",
      theme: "dark",
      progress: undefined,
      visibilityTime: 2000,
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Feather
          name="arrow-left-circle"
          size={30}
          color={"#fff"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.exerciseName}>{exercicio.nome}</Text>

      {urlImagem ? (
        <Image source={{ uri: urlImagem }} style={styles.image} />
      ) : (
        <Text>Erro ao carregar imagem</Text>
      )}
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{exercicio.ativacao}</Text>
        <Text style={styles.description}>{exercicio.execucao}</Text>
      </ScrollView>
      <TouchableOpacity
        onPress={handleAdicionarExercicio}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Adicionar Exercício</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    marginTop: 30,
  },
  topBar: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginTop: "2%",
    marginBottom: "2%",
  },
  exerciseName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: "3%",
    borderBottomWidth: 4,
    paddingBottom: "1%",
    marginBottom: "2%",
    borderColor: "rgba(255, 57, 83, 1)",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 2,
    marginTop: "3%",
  },
  descriptionContainer: {
    flex: 1,
    marginBottom: 16,
    paddingHorizontal: 30,
    paddingTop: 30
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "rgba(255, 57, 83, 1)",
    padding: 12,
    borderRadius: 5,
    position: "absolute",
    bottom: "6%",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
