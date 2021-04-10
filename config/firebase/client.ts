import firebaseClient from 'firebase/app'
import 'firebase/auth'

const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

firebaseClient.apps.length 
? firebaseClient.app() 
: firebaseClient.initializeApp(firebaseClientConfig);

export const persistenceMode = firebaseClient.auth.Auth.Persistence.LOCAL

export const getToken = () => firebaseClient.auth().currentUser?.getIdToken()

export { firebaseClient }