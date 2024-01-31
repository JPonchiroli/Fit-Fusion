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
  const navigation = useNavigation();

  const { grupoMuscular } = route.params;

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //const grupoMuscular = "Peito"
        recuperaExerciciosDoUsuario(grupoMuscular, setExercicios);
      }
    });
    /*
    const fetchExercicios = async () => {
      try {
        const databaseRef = firebase.database().ref("exercicios/Peito");
        const snapshot = await databaseRef.once("value");

        if (snapshot.exists()) {
          const exercicios = snapshot.val();
          const exerciciosArray = await Promise.all(
            Object.keys(exercicios).map(async (key) => {
              const exercicio = exercicios[key];
              try {
                const imagemRef = firebase
                  .storage()
                  .ref(`Exercicios/Peito/${exercicio.idImagem}`);
                const url = await imagemRef.getDownloadURL();
                return {
                  id: key,
                  ...exercicio,
                  imagemUrl: url,
                };
              } catch (error) {
                console.error("Erro ao obter URL da imagem:", error);
                return {
                  id: key,
                  ...exercicio,
                  imagemUrl: null,
                  error: "Erro ao obter URL da imagem",
                };
              }
            })
          );

          setExerciciosPeito(exerciciosArray);
        }
      } catch (error) {
        console.error("Erro ao recuperar dados do Realtime Database:", error);
      }
    };

    fetchExercicios();
    */
  }, []);

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
        data={exercicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          /*onPress={() => {
              // Navegar para a próxima tela passando dados do exercício
              navigation.navigate("DetalheExercicio", {
                exercicio: item,
              });
              
            }}
            */
          >
            <View style={styles.treino}>
              {/*{item.imagemUrl ? (
                <Image
                  source={{ uri: item.imagemUrl }}
                  style={styles.ImageTreino}
                />
              ) : (
                <Text>Erro ao carregar imagem</Text>
              )}
              */}
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
