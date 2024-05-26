import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDe2SvdTWStaDl4j94ExOFCAHtSXYtTl6s",
  authDomain: "react-netflix-clone-7a912.firebaseapp.com",
  projectId: "react-netflix-clone-7a912",
  storageBucket: "react-netflix-clone-7a912.appspot.com",
  messagingSenderId: "315732338802",
  appId: "1:315732338802:web:59f4f5624ab1a5d810faeb",
  measurementId: "G-S27E381QC5"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);