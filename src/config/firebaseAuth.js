import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export const login = async (email, senha) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, senha);
    return response.user;
  } catch (error) {
    throw error;
  }
};
