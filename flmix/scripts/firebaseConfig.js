// filepath: my-firebase-app/my-firebase-app/scripts/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBeUpN7tq6sgvGdtXKn871vCs9vzQg4aIs",
  authDomain: "flmix-6c0ea.firebaseapp.com",
  projectId: "flmix-6c0ea",
  storageBucket: "flmix-6c0ea.appspot.com",
  messagingSenderId: "573602314144",
  appId: "1:573602314144:web:2450e286c0d1ac0fb416c5",
  measurementId: "G-GL8BE5ZTWN"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);