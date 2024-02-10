import { app } from "./firebaseConfig";
import { database } from "./firebaseConfig";
import { ref, set } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";


export const auth = getAuth(app);

export async function registerUser(email, senha, nomeCompleto, altura, peso) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const uid = userCredential.user.uid;

    // Salva informações no Realtime Database
    await saveUserInfo(uid, { email, nomeCompleto, senha, altura, peso });

    console.log(
      "Usuário registrado com sucesso e informações salvas no banco de dados."
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
}

export function saveUserInfo(uid, userInfo) {
  const userRef = ref(database, `usuarios/${uid}`);
  return set(userRef, userInfo);
}

export const login = async (email, senha) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, senha);
    return response.user;
  } catch (error) {
    throw error;
  }
};