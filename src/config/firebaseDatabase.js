import { database } from "./firebaseConfig";
import { ref, set, onValue, get, push, update } from "firebase/database";

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

export const recuperaInfoUsuario = async (uid) => {
  try {
    const usuarioRef = ref(database, `usuarios/${uid}`);
    const usuarioSnapshot = await get(usuarioRef);

    if (usuarioSnapshot.exists()) {
      const usuarioInfo = usuarioSnapshot.val();

      return {
        email: usuarioInfo.email,
        nomeCompleto: usuarioInfo.nomeCompleto,
        peso: usuarioInfo.peso,
        altura: usuarioInfo.altura,
      };
    } else {
      console.log("Nenhum dado encontrado para o usuário.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao recuperar informações do nó usuarios:", error);
    return null;
  }
};

export const enviarTreino = async (uid, nomeTreino) => {
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
  try {
    const treinoRef = ref(database, `treinos/${usuarioUID}/${treinoUID}`);
    await set(treinoRef, null); // Use set com valor null para remover o nó
    console.log("Treino excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir Treino:", error);
  }
};

export const recuperaExerciciosDoUsuario = async (
  grupoMuscular,
  setExerciciosDoUsuario
) => {
  try {
    const exerciciosRef = ref(database, `exercicios/${grupoMuscular}/`);
    onValue(exerciciosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const exerciciosArray = Object.values(data);
        setExerciciosDoUsuario(exerciciosArray);
      } else {
        console.log(
          "Nenhum exercício encontrado para o grupo muscular:",
          grupoMuscular
        );
      }
    });
  } catch (error) {
    console.error("Erro ao recuperar exercícios do usuário:", error);
  }
};
export const adicionarExercicio = async (
  usuarioUID,
  treinoUid,
  idImagem,
  nomeExercicio
) => {
  try {
    if (usuarioUID) {
      const treinosRef = ref(
        database,
        `treinos/${usuarioUID}/${treinoUid}/exercicios`
      );

      await push(treinosRef, {
        nomeExercicio: nomeExercicio,
        idImagem: idImagem,
      });

      console.log("Exercicio adicionado com sucesso!");
    } else {
      console.error("Usuário não autenticado.");
    }
  } catch (error) {
    console.error("Erro ao adicionar Exercicio:", error);
  }
};

export const adicionarHistorico = async (
  usuarioUID,
  nomeExercicio,
  peso,
  repeticoes
) => {
  try {
    if (usuarioUID) {
      const treinosRef = ref(
        database,
        `historico/${usuarioUID}/${nomeExercicio}/`
      );

      function formatarDataParaString(data) {
        const options = {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
          timeZone: "America/Sao_Paulo",
        };
        return data.toLocaleString("pt-BR", options);
      }

      const dataFormatada = formatarDataParaString(new Date());

      await push(treinosRef, {
        data: dataFormatada,
        peso: parseFloat(peso),
        repeticoes: parseInt(repeticoes),
      });

      console.log("Histórico adicionado com sucesso!");
    } else {
      console.error("Usuário não autenticado.");
    }
  } catch (error) {
    console.error("Erro ao adicionar Histórico:", error);
  }
};

export const carregarHistorico = async (
  usuarioUID,
  nomeExercicio,
  setHistoricoData
) => {
  try {
    const historicoRef = ref(
      database,
      `historico/${usuarioUID}/${nomeExercicio}`
    );

    // Use onValue para observar mudanças nos dados
    onValue(historicoRef, (snapshot) => {
      const historico = snapshot.val();
      if (historico) {
        const historicoArray = Object.values(historico);
        // Ordena a lista de forma decrescente pela data
        const historicoOrdenado = historicoArray.sort(
          (a, b) => new Date(b.data) - new Date(a.data)
        );
        const historicoReverso = historicoOrdenado.reverse(); // Invertendo a ordem
        setHistoricoData(historicoReverso);
      } else {
        setHistoricoData([]);
      }
    });
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
  }
};

export const confirmaEdicao = async (uid, nomeCompleto, peso, altura) => {
  try {
    if (uid) {
      const userRef = ref(database, `usuarios/${uid}`);

      await update(userRef, {
        nomeCompleto,
        peso,
        altura,
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
