import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
//import firebase from "../../../../firebaseConnection";
import Toast from 'react-native-toast-message';

export default function DetalhesExercicio() {

    const route = useRoute();
    const navigation = useNavigation();
    // const user = firebase.auth().currentUser;
    const [ultimoTreinoId, setUltimoTreinoId] = useState(null);
    const { exercicio } = route.params || {};
    console.log('Exercicios:', exercicio);

    /*
    const obterUltimoTreinoId = async () => {
      try {
        const treinosRef = firebase.database().ref(`treinos/${user.uid}`);
        const query = treinosRef.orderByChild("timestamp").limitToLast(1);
        const snapshot = await query.once("value");
  
        if (snapshot.exists()) {
          const treinoMaisRecente = snapshot.val();
          const keys = Object.keys(treinoMaisRecente);
          const ultimoTreinoId = keys.length > 0 ? keys[0] : null;
  
          setUltimoTreinoId(ultimoTreinoId);
        }
      } catch (error) {
        console.error("Erro ao obter o último treino:", error);
      }
    };
  
    useEffect(() => {
      obterUltimoTreinoId();
    }, [user]);
  
    const adicionarAoTreino = async () => {
      try {
        if (ultimoTreinoId) {
          const exerciciosRef = firebase.database().ref(`treinos/${user.uid}/${ultimoTreinoId}/exercicios`);
    
          // Verifica se o exercício já existe no treino atual
          const snapshot = await exerciciosRef.orderByChild("nomeExercicio").equalTo(exercicio.nome).once("value");
          if (snapshot.exists()) {
            console.log("Exercício já está no treino.");
            Toast.show({
              type: 'info',
              position: 'top',
              text1: 'Exercício já está no treino!',
              visibilityTime: 1000,
            });
          } else {
            // Adiciona o exercício ao treino
            exerciciosRef.push({
              nomeExercicio: exercicio.nome,
              idImagem: exercicio.idImagem,
            });
    
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Exercício adicionado!',
              visibilityTime: 5000,
            });
    
            console.log("Exercício adicionado ao treino com sucesso!");
          }
        } else {
          console.error("Nenhum treino encontrado para adicionar o exercício.");
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Erro ao adicionar o exercício!',
            visibilityTime: 1000,
          });
        }
      } catch (error) {
        console.error("Erro ao adicionar exercício ao treino:", error);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Erro ao adicionar o exercício!',
          visibilityTime: 1000,
        });
      }
    };
    */

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
            
      {exercicio.imagemUrl ? (
        <Image source={{ uri: exercicio.imagemUrl }} style={styles.image} />
      ) : (
        <Text>Erro ao carregar imagem</Text>
      )}
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{exercicio.ativacao}</Text>
        <Text style={styles.description}>{exercicio.execucao}</Text>
      </ScrollView>
      <TouchableOpacity /*onPress={adicionarAoTreino}*/ style={styles.addButton}>
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
        paddingBottom: '1%',
        marginBottom: '2%',
        borderColor: 'rgba(255, 57, 83, 1)',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 2,
        marginTop: "3%",
    },
    descriptionContainer: {
        flex: 1,
        height: '10%',
        marginBottom: 16,
        padding: 30,

    },
    description: {
        color: "#fff",
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 8,
    },
    addButton: {
        backgroundColor: "rgba(255, 57, 83, 1)",
        padding: 12,
        borderRadius: 5,
        position: "absolute",
        bottom: '6%',
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
