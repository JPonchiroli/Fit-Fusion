import { getDatabase, ref, set, onValue, get, push, ove } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebaseConfig";

const Auth = getAuth(app);
const database = getDatabase(app);

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

export const recuperaTreinosDoUsuario = async (uid, setTreinosDoUsuario) => {
  try {
    const snapshot = await ref(getDatabase(), `treinos/${uid}`);
    onValue(snapshot, (data) => {
      if (data.exists()) {
        const treinosUsuarioData = data.val();
        const treinosUsuarioArray = Object.keys(treinosUsuarioData).map(
          (treinoUid) => ({
            treinoUid,
            ...treinosUsuarioData[treinoUid],
          })
        );
        setTreinosDoUsuario(treinosUsuarioArray);
      } else {
        console.log("Nenhum treino encontrado para o usuário.");
      }
    });
  } catch (error) {
    console.error("Erro ao recuperar treinos do usuário:", error);
  }
};

export const recuperaInfoUsuario = async (uid, setUserInfo) => {
  try {
    const usuarioRef = ref(database, `usuarios/${uid}`);
    const usuarioSnapshot = await get(usuarioRef);

    if (usuarioSnapshot.exists()) {
      const usuarioInfo = usuarioSnapshot.val();

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        email: usuarioInfo.email,
        usuario: usuarioInfo.nomeCompleto,
        kg: usuarioInfo.kg,
        altura: usuarioInfo.altura,
      }));
    } else {
      console.log("Nenhum dado encontrado para o usuário.");
    }
  } catch (error) {
    console.error("Erro ao recuperar informações do nó usuarios:", error);
  }
};

export const enviarTreino = async (uid, nomeTreino) => {
  console.log('UID: ' + uid);
  try {
    // Verifique se o usuário está autenticado antes de prosseguir
    if (uid) {
      // Adicione o treino ao nó 'treinos' no Firebase usando o UID do usuário
      const treinosRef = ref(getDatabase(), `treinos/${uid}`);
      
      await push(treinosRef, {
        nomeTreino: nomeTreino,
      });

      console.log("Treino adicionado com sucesso!");
    } else {
      console.error("Usuário não autenticado.");
    }
  } catch (error) {
    console.error("Erro ao adicionar treino:", error);
  }
};

export const deletarTreino = async (usuarioUID, treinoUID) => {
  console.log("UIDS " + usuarioUID, treinoUID)
  try {
    const treinoRef = ref(database, `treinos/${usuarioUID}/${treinoUID}`);
    await set(treinoRef, null); // Use set com valor null para remover o nó
    console.log("Treino excluído com sucesso!");
  } catch (error) {
    console.error('Erro ao excluir Treino:', error);
  }
}