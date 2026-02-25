// Import the functions you need from the SDKs you need

  // import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyAaMN_HP5zyJmLzt5x71lz-X2T_JzeQEGs",

    authDomain: "splitbill-1024c.firebaseapp.com",

    projectId: "splitbill-1024c",

    storageBucket: "splitbill-1024c.firebasestorage.app",

    messagingSenderId: "463013198214",

    appId: "1:463013198214:web:26938ce3ead0c2d1395407",

    measurementId: "G-G443CDJNP0"

  };


// 2. INISIALISASI (GAYA LAMA / COMPAT)
// Jangan pakai "import", tapi panggil global variable 'firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase Config Berhasil Dimuat!");
}

// 3. Export variable biar bisa dipake console (Opsional tapi membantu)
const db = firebase.firestore();
const auth = firebase.auth();