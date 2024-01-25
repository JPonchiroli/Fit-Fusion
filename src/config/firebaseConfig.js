import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAY6a8E5AUMIAl5wLyaNpuAzdUVVN9GFno",
  authDomain: "fitfusion-8ac23.firebaseapp.com",
  databaseURL: "https://fitfusion-8ac23-default-rtdb.firebaseio.com",
  projectId: "fitfusion-8ac23",
  storageBucket: "fitfusion-8ac23.appspot.com",
  messagingSenderId: "713786136906",
  appId: "1:713786136906:web:c50fa209f66ab8396549b3",
  measurementId: "G-W40DB8902G",
};

export async function registerUser(email, senha, nomeCompleto) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const uid = userCredential.user.uid;

    // Salva informações no Realtime Database
    await saveUserInfo(uid, { email, nomeCompleto, senha });

    console.log(
      "Usuário registrado com sucesso e informações salvas no banco de dados."
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
}

export function saveUserInfo(uid, userInfo) {
  const userRef = ref(getDatabase(app), `usuarios/${uid}`);
  return set(userRef, userInfo);
}

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, getDatabase };
