// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBcMWh88iYR-ku2WmNW0U6lKVARRU9QQGo",
    authDomain: "chat-app-55e54.firebaseapp.com",
    projectId: "chat-app-55e54",
    storageBucket: "chat-app-55e54.appspot.com",
    messagingSenderId: "808215597018",
    appId: "1:808215597018:web:3da7b8446c971097f7fae3",
    measurementId: "G-2Y6T5CY7L9"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseApp)
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  export {auth, signInWithPopup, provider}
  export default db