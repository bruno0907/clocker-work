import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDFhuRydIdRt6hjjfJezSDYVacHtT-Ttp8",
  authDomain: "clocker-d96e4.firebaseapp.com",
  projectId: "clocker-d96e4",
  storageBucket: "clocker-d96e4.appspot.com",
  messagingSenderId: "662289166335",
  appId: "1:662289166335:web:8e6dd819ddcf569a5f41ca",
  measurementId: "G-0DXB5M21H9"
};

export default firebase.apps.length 
  ? firebase.app() 
  : firebase.initializeApp(firebaseConfig);
