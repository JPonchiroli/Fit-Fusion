import {database} from './firebaseConfig'
import { ref, set, onValue, get, push } from "firebase/database";

export const recuperaTreinosDoUsuario = async (uid, setTreinosDoUsuario) => {
  try {
    const snapshot = await ref(database, `treinos/${uid}`);
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
      const treinosRef = ref(database, `treinos/${uid}`);
      
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