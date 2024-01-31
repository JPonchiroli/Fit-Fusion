import { initializeApp } from "firebase/app";
import { get, getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence, } from "firebase/auth";
import { getStorage } from 'firebase/storage'
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

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage(app);

export const database = getDatabase(app)

export default app;


