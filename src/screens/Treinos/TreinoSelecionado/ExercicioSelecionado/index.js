import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { auth } from "./../../../../config/firebaseConfig";
import StyledTextInput from "../../../../components/StyledTextInput";
import {
  adicionarHistorico,
  carregarHistorico,
} from "../../../../config/firebaseDatabase";
import Toast from "react-native-toast-message";

console.disableYellowBox = true;

export default function ExercicioSelecionado({ route }) {
  const { exercicio, treino } = route.params;
  const navigation = useNavigation();
  const [peso, setPeso] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [historicoData, setHistoricoData] = useState(null);

  const usuarioUID = auth.currentUser.uid;
  const nomeExercicio = exercicio.nomeExercicio;
  const nomeTreino = treino.nomeTreino;

  useEffect(() => {
    carregarHistorico(usuarioUID, nomeExercicio, setHistoricoData);
  }, []);

  function handleAdicionarHistorico() {
    if (peso != "" && repeticoes != "") {
      adicionarHistorico(usuarioUID, nomeExercicio, peso, repeticoes);
      setPeso("");
      setRepeticoes("");
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Preencha Todos os Campos",
        theme: "dark",
        progress: undefined,
        visibilityTime: 2000,
      });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
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

        <View style={styles.main}>
          <Image
            source={{ uri: exercicio.urlImagem }}
            style={{ width: 200, height: 200, top: 30 }}
          />
        </View>

        <View style={styles.titulos}>
          <View>
            <Text style={styles.titulo2}>{exercicio.nomeExercicio}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <View>
            <Text style={styles.peso1}>Peso</Text>
            <StyledTextInput
              keyboardType="numeric"
              placeholder="KG"
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              value={peso}
              onChangeText={(text) => setPeso(text)}
            />
          </View>

          <View>
            <Text style={styles.rep1}>Repetições</Text>
            <StyledTextInput
              keyboardType="numeric"
              placeholder="N. Repetições"
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              value={repeticoes}
              onChangeText={(text) => setRepeticoes(text)}
            />
          </View>

          <TouchableOpacity onPress={handleAdicionarHistorico}>
            <Feather name="plus-circle" size={30} color={"#F4485E"} />
          </TouchableOpacity>
        </View>

        <View style={styles.historicoContainer}>
          <Text style={styles.historicoTitulo}>Histórico</Text>
          {historicoData && historicoData.length > 0 ? (
            historicoData.map((item, index) => (
              <View key={index} style={styles.historicoItem}>
                <Text>Data: {item.data}</Text>
                <Text>Peso: {item.peso}</Text>
                <Text>Repetições: {item.repeticoes}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.mensagemNenhumHistorico}>
              Nenhum Histórico Cadastrado
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
    marginTop: 30,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 0,
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
  titlePView: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  main: {
    backgroundColor: "#FFF",
    width: 250,
    alignItems: "center",
    height: 250,
    marginTop: 30,
    borderRadius: 60,
    left: "19%",
  },

  img: {
    width: 200,
    height: 200,
    borderRadius: 60,
    marginTop: 30,
  },

  titulos: {
    alignItems: "center",
  },

  titulo1: {
    fontSize: 20,
    color: "#FFFF",
    marginRight: 170,
  },

  titulo2: {
    fontSize: 30,
    color: "#F4485E",
  },

  info: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
  },

  peso1: {
    textAlign: "center",
    width: 60,
    fontSize: 18,
    color: "#F4485E",
  },

  peso2: {
    backgroundColor: "#DCDCDC",
    width: 60,
    height: 30,
    textAlign: "center",
  },

  rep1: {
    textAlign: "center",
    width: 100,
    fontSize: 18,
    color: "#F4485E",
  },

  rep2: {
    backgroundColor: "#DCDCDC",
    width: 100,
    height: 30,
    textAlign: "center",
  },

  historicoContainer: {
    marginTop: 20,
  },

  historicoTitulo: {
    fontSize: 24,
    color: "#F4485E",
    textAlign: "center",
    marginBottom: 10,
  },

  historicoItem: {
    backgroundColor: "#DCDCDC",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },

  mensagemNenhumHistorico: {
    textAlign: "center",
    color: "#F4485E",
    fontSize: 16,
    marginTop: 10,
  },
});
