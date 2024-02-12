import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { auth, storage } from "../../../config/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { deletarTreino } from "../../../config/firebaseDatabase";
import Toast from "react-native-toast-message";

const TreinoSelecionado = ({ route }) => {
  const navigation = useNavigation();

  const { treino } = route.params;
  const nomeTreino = treino.nomeTreino || "Nome do Treino Padrão";
  const exercicios = treino.exercicios || [];
  const usuarioUID = auth.currentUser.uid;
  const [imagensExercicios, setImagensExercicios] = useState([]);
  const treinoUID = treino.treinoUid;

  useEffect(() => {
    // Verifica se 'exercicios' é um array, caso contrário, converte
    const exerciciosArray = Array.isArray(exercicios)
      ? exercicios
      : Object.values(exercicios);

    const carregarImagensExercicios = async () => {
      const imagens = await Promise.all(
        exerciciosArray.map(async (exercicio) => {
          try {
            const caminhosRelativos = [
              "Abdominal",
              "Biceps",
              "Costas",
              "Ombro",
              "Peito",
              "Perna",
              "Triceps",
            ];
            let url = null;

            for (let i = 0; i < caminhosRelativos.length; i++) {
              const caminhoRelativo = `${caminhosRelativos[i]}/${exercicio.idImagem}`;
              try {
                // Use o ref diretamente do pacote de storage
                url = await getDownloadURL(
                  ref(storage, `Exercicios/${caminhoRelativo}`)
                );
                break;
              } catch (error) {}
            }

            return { ...exercicio, urlImagem: url };
          } catch (error) {
            console.error(
              `Erro ao carregar imagem para o exercício ${exercicio.codigoExercicio}: ${error.message}`
            );
            return { ...exercicio, urlImagem: null };
          }
        })
      );
      setImagensExercicios(imagens);
    };

    carregarImagensExercicios();
  }, [exercicios]);

  const handleDelete = () => {
    Alert.alert(
      "Confirmação",
      "Deseja realmente excluir este Treino?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => deleteTreino() },
      ],
      { cancelable: false }
    );
  };

  function deleteTreino() {
    deletarTreino(usuarioUID, treinoUID);
    navigation.goBack();
    Toast.show({
      type: "success",
      position: "top",
      text1: "Treino Excluído com Sucesso!",
      theme: "dark",
      progress: undefined,
      visibilityTime: 2000,
    });
  }

  const handleAdicionarExercicio = () => {
    // Adicione o código para abrir a tela CriarTreino aqui
    navigation.navigate("CriarTreino", { treinoUID: treinoUID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top1}>
        <Feather
          name="arrow-left-circle"
          size={30}
          color={"#fff"}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.titlePView}>
        <Text style={styles.titleP}>{nomeTreino}</Text>
      </View>
      <ScrollView style={styles.scrollviewTreino}>
        {Array.isArray(imagensExercicios) && imagensExercicios.length > 0 ? (
          imagensExercicios.map((exercicio, index) => (
            <View>
              <TouchableOpacity
                key={exercicio.nomeExercicio}
                style={[
                  styles.touchableExercise,
                  {
                    marginBottom:
                      index === imagensExercicios.length - 1 ? "40%" : 10,
                  },
                ]}
                onPress={() => {
                  navigation.navigate("ExercicioSelecionado", {
                    exercicio,
                    treino,
                  });
                }}
              >
                <View style={styles.exercicioItem}>
                  {exercicio.urlImagem ? (
                    <Image
                      source={{ uri: exercicio.urlImagem }}
                      style={{ width: 100, height: 100, marginRight: 10 }}
                    />
                  ) : (
                    <Text style={styles.title}>
                      Imagem não disponível para este exercício.
                    </Text>
                  )}
                  <Text style={styles.title}>{exercicio.nomeExercicio}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.titleSView}>
            <Feather
              style={styles.viewX}
              name="refresh-cw"
              size={110}
              color={"rgba(255, 57, 83, 1)"}
              onPress={() => navigation.navigate("Treinos")}
            />
            <Text style={styles.titleS}>
              Adicione ou Aguarde os Exercícios.
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.adicionarExercicioButton}
        onPress={handleAdicionarExercicio}
      >
        <Text style={styles.adicionarExercicioButtonText}>
          Adicionar Exercício
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.deleteText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#FFF",
    marginTop: 30,
  },
  top1: {
    flexDirection: "row",
    padding: 10,
  },
  title: {
    color: "#FFF",
  },
  titleS: {
    color: "#FFF",
    textAlign: "center",
    justifyContent: "center",
  },
  titleP: {
    color: "#FFF",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
    fontSize: 20,
    paddingBottom: 5,
    borderBottomWidth: 4,
    borderColor: "rgba(255, 57, 83, 1)",
  },
  viewX: {
    marginBottom: 0,
  },
  titleSView: {
    justifyContent: "center",
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  titlePView: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  buttonDelete: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    height: "10%",
    backgroundColor: "rgba(255, 57, 83, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  exercicioItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 20,
  },
  adicionarExercicioButton: {
    position: "absolute",
    top: "80%",
    right: "5%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    zIndex: 1,
  },
  adicionarExercicioButtonText: {
    color: "#000",
    display: "flex",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  touchableExercise: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  lastExerciseStyle: {
    paddingBottom: 10, // Ou qualquer valor desejado para o paddingBottom
  },
  scrollviewTreino: {
    height: "5%",
  },
});

export default TreinoSelecionado;
