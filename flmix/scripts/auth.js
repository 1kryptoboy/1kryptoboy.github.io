// filepath: my-firebase-app/my-firebase-app/scripts/auth.js
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  const userDiv = document.getElementById("user_div");
  const loginDiv = document.getElementById("login_div");
  const userPara = document.getElementById("user_para");

  if (user) {
    // User is signed in
    userDiv.style.display = "block";
    loginDiv.style.display = "none";
    userPara.innerHTML = "Welcome back, " + user.email;
  } else {
    // No user is signed in
    userDiv.style.display = "none";
    loginDiv.style.display = "block";
  }
});

// Function to log in the user
export function login() {
  const userEmail = document.getElementById("email_field").value;
  const userPass = document.getElementById("password_field").value;

  signInWithEmailAndPassword(auth, userEmail, userPass)
    .catch((error) => {
      const errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
}

// Function to log out the user
export function logout() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.error("Sign-out error: ", error);
  });
}