import { ref, set } from "firebase/database"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseConfig";

const Auth = getAuth(app);

export async function registerUser(email, senha, nomeCompleto) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      Auth,
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


export const login = async (email, senha) => {
  try {
    const response = await signInWithEmailAndPassword(Auth, email, senha);
    return response.user;
  } catch (error) {
    throw error;
  }
};
