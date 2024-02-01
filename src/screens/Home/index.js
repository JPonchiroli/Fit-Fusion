import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { recuperaTreinosDoUsuario, recuperaInfoUsuario } from "../../config/firebaseDatabase";
import { auth } from "../../config/firebaseConfig";
import { Feather } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [treinosDoUsuario, setTreinosDoUsuario] = useState([]);
  const [exerciciosDoUsuario, setExerciciosDoUsuario] = useState([]);
  const trainingImages = [
    require('./../../img/Imagens-fig/0.png'),
    require('./../../img/Imagens-fig/1.png'),
    require('./../../img/Imagens-fig/2.png'),
    require('./../../img/Imagens-fig/3.png'),
    require('./../../img/Imagens-fig/4.png'),
    require('./../../img/Imagens-fig/5.png'),
    require('./../../img/Imagens-fig/6.png'),
    require('./../../img/Imagens-fig/7.png'),
    require('./../../img/Imagens-fig/8.png'),
    require('./../../img/Imagens-fig/9.png'),
    require('./../../img/Imagens-fig/10.png'),
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * trainingImages.length);
    return trainingImages[randomIndex];
  };

  const selectedImage = getRandomImage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserInfo(user);

        // Substitua o código abaixo para usar as novas funções
        recuperaInfoUsuario(user.uid, setUserInfo);

        // Substitua a chamada da função recuperaTreinosDoUsuario
        recuperaTreinosDoUsuario(user.uid, setTreinosDoUsuario);
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

        <LinearGradient
          style={{
            width: '100%',
            height: 110,

            borderRadius: 10,
            justifyContent: 'center', // Align content in the center vertically
            padding: 20, // Add some padding for better appearance
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(245,90,110,1)', 'rgba(244,72,94,1)', 'rgba(219,64,84,1)']}
        >
          <View style={styles.header}>
            <Image source={require('./../../img/BODY_IMG.png')} style={styles.headerImage} />
          </View>
        </LinearGradient>

        <View style={styles.treinoss}>
          <Text style={styles.titleSection}>Meus Treinos</Text>
          <Text style={styles.subTitleSection}>Aqui está listado todos os seus treinos</Text>
          <View style={styles.divider}></View>
          <ScrollView
  horizontal={true} // Enable horizontal scrolling
  style={styles.scrollViewMenu}
>
  {treinosDoUsuario
    .map((treino, index) => treinosDoUsuario[treinosDoUsuario.length - 1 - index]) // Mapeia de trás para frente
    .map((treino, index) => (
      <TouchableOpacity
        style={styles.touchableItem}
        key={treino.uid}
        onPress={() => navigation.navigate('TreinoSelecionado', { treino })}
      >
        <ImageBackground
          source={getRandomImage()}
          style={styles.backgroundImage}
          imageStyle={styles.imageStyle}
        >
          <LinearGradient
            style={styles.linearGradientOverlay}
            colors={['rgba(9, 9, 9, 9)', 'transparent']} // Inverta as cores aqui
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.titleCardSubtitle}>A seguir:</Text>
            <Text style={styles.titleCard}>{treino.nomeTreino}</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    ))}
</ScrollView>

        </View>


        <View style={styles.treinoss}>
          <Text style={styles.titleSection}>Minha conta</Text>
          <Text style={styles.subTitleSection}>Aqui está o status de sua conta</Text>
          <View style={styles.divider}></View>
          <View style={styles.AcountContainer}>

            <Feather
              style={{ marginTop: 10 }}
              name="user"
              size={80}
              color={"rgba(255, 57, 83, 1)"}

            />
            {userInfo && (
              <>
                <View style={styles.AcountTextContainer}>
                  <Text style={styles.title0}>Nome: {userInfo.usuario}</Text>
                  <Text style={styles.title0}>Peso: {userInfo.kg} kg</Text>
                  <Text style={styles.title0}>Altura: {userInfo.altura} m</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  imageStyle: {
    borderRadius: 10, // Aplique o borderRadius aqui
  },
  AcountContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'

  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
    borderWidth: 4,
    borderColor: 'rgba(255, 57, 83, 1)',
  },
  AcountTextContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // ou 'contain' dependendo do seu requisito
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 20
  },
  headerImage: {
    width: '25%',
    height: '100%',
    marginBottom: 20,
  },
  titleSection: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  subTitleSection: {
    color: '#d4d4d4',
    fontSize: 16,
  },
  linearGradientOverlay: {
    position: 'absolute',
    bottom: 0, // Ajuste conforme necessário
    left: 0,   // Ajuste conforme necessário
    width: '100%',
    padding: 30, // Ajuste conforme necessário
  },
  treinoss: {
    padding: 20,
    margin: 10,
  },
  title0: {
    color: "#FFF",
  },
  divider: {
    borderBottomColor: '#d4d4d4', // Set the color of the divider line
    borderBottomWidth: 0.2,     // Set the thickness of the divider line
    marginVertical: 10,       // Adjust the vertical spacing as needed
  },
  touchableItem: {
    background: 'transparent',
    borderRadius: 10,
    margin: 5,
    height: 200,
    width: 300,
    justifyContent: "center",
    alignItems: 'center',
  },
  scrollViewMenu: {
    flexDirection: 'row',
  },
  titleCard: {
    color: '#d6d6d6',
    fontSize: 18,
    position: 'absolute',
    bottom: 10, // ajuste conforme necessário
    left: 10,  // ajuste conforme necessário
  },
  titleCardSubtitle: {
    color: '#FFF',
    fontSize: 18,
    position: 'absolute',
    bottom: 30, // ajuste conforme necessário
    left: 10,  // ajuste conforme necessário
  }
});
