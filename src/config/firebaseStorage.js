import storage from "./firebaseConfig";
import { ref, getDownloadURL } from "@react-native-firebase/storage";

export const recuperarImagemExercicio = async () => {
  const imageRef = ref(storage, "Exercicios/Abdominal/abdominal.gif");
  console.log("RED da imagem:", imageRef);
  // Obter a URL de download da imagem
  getDownloadURL(imageRef)
    .then((url) => {
      // Faça algo com a URL da imagem (exibição ou processamento adicional)
      console.log("URL da imagem:", url);
    })
    .catch((error) => {
      console.error("Erro ao recuperar a imagem:", error);
    });
};
