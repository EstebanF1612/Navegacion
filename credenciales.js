// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOzz0zAKyRwCd7xvLL_czTqVgC2AwmC_I",
  authDomain: "crud-react-native-eacb8.firebaseapp.com",
  projectId: "crud-react-native-eacb8",
  storageBucket: "crud-react-native-eacb8.appspot.com",
  messagingSenderId: "308010042214",
  appId: "1:308010042214:web:893211960951754825fea7"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;