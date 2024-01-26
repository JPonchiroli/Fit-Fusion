import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { recuperaTreinosDoUsuario } from "../../config/firebaseAuth";
import { auth } from "../../config/firebaseConfig"
import { Feather } from "@expo/vector-icons";

export default function Treinos() {
  const navigation = useNavigation();

  const usuarioUID = auth.currentUser.uid;
  const [treinosDoUsuario, setTreinosDoUsuario] = useState([]);
  const [nomeTreino, setNomeTreino] = useState("");
  const [nomeTreinoContainerVisible, setNomeTreinoContainerVisible] = useState(false);
  const user = auth.currentUser;


  var number = 0
  const getRandomNumber = () => number + 1;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserInfo(user);
        console.log("USUARIO" + user);

        const { database } = await initializeFirebase(); // Use a função inicializada
        // Substitua a chamada da função recuperaTreinosDoUsuario
        recuperaTreinosDoUsuario(user.uid, setTreinosDoUsuario, database);
      }
    });

    // Cleanup do event listener quando o componente for desmontado

    return () => {
      // Use a instância de autenticação diretamente de firebaseAuth11111
      const treinosRef = database.ref(`treinos/${user.uid}`);
      treinosRef.off('value');
    };
  }, [user]); // Adicionando usuarioUID como dependência para recriar o event listener se o UID do usuário mudar

  /*const enviarTreino = () => {
    if (nomeTreino === '') {
      Alert.alert("Erro", "Preencha o nome do treino");
      return;
    }
    // Verifique se o usuário está autenticado antes de prosseguir
    if (user) {
      // Adicione o treino ao nó 'treinos' no Firebase usando o UID do usuário
      firebase
        .database()
        .ref(`treinos/${user.uid}`)
        .push({
          nomeTreino: nomeTreino,
        })
        .then(() => {
          console.log("Treino adicionado com sucesso!");
          // Limpe o estado após adicionar o treino, se necessário
          setNomeTreino("");
          setNomeTreinoContainerVisible(false);
        })
        .catch((error) => {
          console.error("Erro ao adicionar treino:", error);
        });
    } else {
      console.error("Usuário não autenticado.");
    }
  };*/

  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          width: '100%',
          height: '100%',
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={['#000', '#0f0f0f', 'rgba(15, 15, 15, 0.88)', '#121212', '#252525']}
      >

        <View style={styles.titleContainer}>

          <Text style={styles.title}>Treinos</Text>

          {nomeTreinoContainerVisible && (
            <View style={styles.nomeTreinoContainer}>
              <Text style={styles.nomeTreinoTitle}>Informe o nome do Treino</Text>
              <TextInput
                style={styles.nomeTreinoInput}
                placeholder="Nome do Treino"
                placeholderTextColor={"rgba(255, 255, 255, 0.24)"}
                color={"#fff"}
                onChangeText={(text) => setNomeTreino(text)}
              />
              <TouchableOpacity
                style={styles.nomeTreinoTouchable}
              //onPress={enviarTreino}
              >
                <Text style={styles.nomeTreinoTitle}>Enviar</Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView
            horizontal={false} // Enable horizontal scrolling
            style={styles.menuTreino}
            height='80%'
            width='90%'
          >
            <View>
              {treinosDoUsuario.length > 0 ? (
                treinosDoUsuario.map((treino) => (
                  <TouchableOpacity style={styles.touchable} key={treino.uid} onPress={() => navigation.navigate('TreinoSelecionado', { treino })}>
                    <Text style={styles.titleNumber}>{getRandomNumber()}</Text>
                    <Text style={styles.title}>{treino.nomeTreino}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Não há treinos disponíveis.</Text>
              )}
            </View>


          </ScrollView>
          <View style={styles.touchable2}>
            <TouchableOpacity onPress={() => setNomeTreinoContainerVisible(true)}>
              <Feather style={styles.criarTreinoButton}
                name="plus"
                size={30}
                color={"rgba(255, 57, 83, 1)"}

              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    color: '#FFF'
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
    color: '#fff',
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 57, 83, 1)',
    padding: 15,
    borderRadius: 250,
    fontWeight: 'bold',
    width: '18%',
    textAlign: 'center',
    justifyContent: 'center',

  },
  touchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: '#fff',
    margin: 5,
    padding: 30

  },

  touchable2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    margin: 5,
    padding: 30

  },
  criarTreinoButton: {
    backgroundColor: '#fff',
    borderRadius: 150,
    padding: 10,

  },
});
