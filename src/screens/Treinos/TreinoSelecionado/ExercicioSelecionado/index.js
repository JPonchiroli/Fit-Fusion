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

console.disableYellowBox = true;

export default function ExercicioSelecionado({ route }) {
  const { exercicio, treino } = route.params;
  const navigation = useNavigation();
  const [peso, setPeso] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [historicoData, setHistoricoData] = useState(null);
  const [reloadPage, setReloadPage] = useState(false);

  const usuarioUID = auth.currentUser.uid;
  const nomeExercicio = exercicio.nomeExercicio;
  const nomeTreino = treino.nomeTreino;

  console.log("Usuario UID: " + usuarioUID);
  console.log("Exercicio: " + exercicio.nomeTreino);
  console.log("Treino: " + nomeTreino);
  /*
    useEffect(() => {
      
        const carregarHistorico = async () => {
            try {
                const historicoRef = firebase.database().ref(`historico/${usuarioUID}/${nomeExercicio}`);
                historicoRef.on('value', (snapshot) => {
                    const historico = snapshot.val();
                    if (historico) {
                        const historicoArray = Object.values(historico);
                        // Ordena a lista de forma decrescente pela data
                        const historicoOrdenado = historicoArray.sort((a, b) => new Date(b.data) - new Date(a.data));
                        const historicoReverso = historicoOrdenado.reverse(); // Invertendo a ordem
                        setHistoricoData(historicoReverso);
                    } else {
                        setHistoricoData([]);
                    }
                });
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
            }
        };

        carregarHistorico();
    }, [usuarioUID, nomeExercicio, reloadPage]);

    const adicionarHistorico = async () => {
        try {
            const historicoRef = firebase
                .database()
                .ref(`historico/${usuarioUID}/${nomeExercicio}`);

            function formatarDataParaString(data) {
                const options = {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                    timeZone: 'America/Sao_Paulo'
                };
                return data.toLocaleString('pt-BR', options);
            }

            const dataFormatada = formatarDataParaString(new Date());

            const novoHistorico = {
                data: dataFormatada,
                peso: `${peso} Kg`,
                repeticoes: repeticoes,
            };

            await historicoRef.push(novoHistorico);

            setPeso('');
            setRepeticoes('');

            console.log('Histórico adicionado com sucesso!');
            setReloadPage((prev) => !prev);
        } catch (error) {
            console.error('Erro ao adicionar histórico:', error);
        }
    };
*/

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
          <View style={styles.peso}>
            <Text style={styles.peso1}>Peso</Text>
            <StyledTextInput
              placeholder="KG"
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              value={peso}
              onChangeText={(text) => setPeso(text)}
            />
          </View>

          <View style={styles.rep}>
            <Text style={styles.rep1}>Repetições</Text>
            <StyledTextInput
              placeholder="N. Repetições"
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              value={repeticoes}
              onChangeText={(text) => setRepeticoes(text)}
            />
          </View>

          <TouchableOpacity
          //onPress={adicionarHistorico}
          >
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
