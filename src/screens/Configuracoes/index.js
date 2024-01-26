import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { recuperaInfoUsuario } from "../../config/firebaseAuth";
import { auth } from "../../config/firebaseConfig"
import { auth as firebaseAuth1 } from "../../config/firebaseConfig"

export default function Configuracoes() {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    usuario: '',
    kg: '',
    altura: '',
  });
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [kg, setKg] = useState('');
  const [altura, setAltura] = useState('');
  const [editavel, setEditavel] = useState(false);


  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = firebaseAuth1.onAuthStateChanged(async (user) => {
      if (user) {
        setUserInfo(user);

        // Substitua o código abaixo para usar as novas funções
        recuperaInfoUsuario(user.uid, setUserInfo);
      }
    });
  }, []);

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


        <View style={styles.AcountTextContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Nome Completo:</Text>
            <TextInput
              style={editavel ? styles.inputEditavel : styles.inputNaoEditavel}
              value={userInfo.usuario}
              onChangeText={(text) => setNomeCompleto(text)}
              editable={editavel}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Email:</Text>
            <TextInput
              style={styles.title}
              value={userInfo.email}
              onChangeText={(text) => setEmail(text)}
              editable={editavel}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Peso (kg):</Text>
            <TextInput
              style={editavel ? styles.inputEditavel : styles.inputNaoEditavel}
              value={userInfo.kg}
              onChangeText={(text) => setKg(text)}
              editable={editavel}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Altura (m):</Text>
            <TextInput
              style={editavel ? styles.inputEditavel : styles.inputNaoEditavel}
              value={userInfo.altura}
              onChangeText={(text) => setAltura(text)}
              editable={editavel}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.botao, styles.logoutButton]} onPress={logout}>
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    color: "#FFF",
    textAlign: "center",
  },
  inputNaoEditavel: {
    color: "#FFF",
    textAlign: "center",
    borderBottomColor: '#000',
    borderBottomWidth: 0,
    borderBottomStyle: 'solid',
    padding: 1
  },
  inputEditavel: {
    color: "#FFF",
    textAlign: "center",
    borderBottomColor: "#FFF",
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    padding: 1
  },
  AcountTextContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    paddingTop: 30
  },
  AcountContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30
  },
  botao: {
    backgroundColor: 'rgba(255, 57, 83, 1)',
    padding: 10,
    alignItems: 'center',
    width: '40%',
    borderRadius: 30,
    marginBottom: 10,
  },
  logoutText: {
    fontWeight: "bold",
    color: '#fff',
  },
});
