import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { auth, storage } from "../../../../config/firebaseConfig";
import { recuperaExerciciosDoUsuario } from "../../../../config/firebaseDatabase";
import { getDownloadURL, ref } from "firebase/storage";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function GrupoMuscular() {
  const route = useRoute();
  const [exercicios, setExercicios] = useState([]);
  const [imagensExercicios, setImagensExercicios] = useState([]);
  const navigation = useNavigation();

  const { grupoMuscular } = route.params;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        recuperaExerciciosDoUsuario(grupoMuscular, setExercicios);
      }
    });

    const carregarImagensExercicios = async () => {
      const imagens = await Promise.all(
        exercicios.map(async (exercicio) => {
          try {
            const caminhoRelativo = `${grupoMuscular}/${exercicio.idImagem}`;
            const url = await getDownloadURL(
              ref(storage, `Exercicios/${caminhoRelativo}`)
            );
            return { ...exercicio, urlImagem: url };
          } catch (error) {
            console.log(
              `Imagem não encontrada para o exercício ${exercicio.nome
              } no caminho ${caminhoRelativo}.`
            );
            return { ...exercicio, urlImagem: null };
          }
        })
      );
      setImagensExercicios(imagens);
    };

    carregarImagensExercicios();
    return () => unsubscribe();
  }, [grupoMuscular, exercicios]);

  return (
    <View style={styles.container}>
      <View style={styles.top1}>
        <View>
          <Feather
            name="arrow-left-circle"
            size={30}
            color={"#fff"}
            onPress={() => navigation.navigate("CriarTreino")}
          />
        </View>
      </View>
      <FlatList
        style={styles.flat}
        data={imagensExercicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.treino}>
              {item.urlImagem ? (
                <Image
                  source={{ uri: item.urlImagem }}
                  style={styles.ImageTreino}
                />
              ) : (
                <Text>Imagem não disponível</Text>
              )}
              <Text style={styles.textTreino}>{item.nome}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    width: "100%",
    marginTop: "8%",
  },

  flat: {
    width: "100%",
  },

  treino: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "transparent",

    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: "100%",
  },

  textTreino: {
    color: "#fff",
    marginLeft: 10,
  },

  ImageTreino: {
    width: 100,
    height: 100,
  },

  top1: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
});
