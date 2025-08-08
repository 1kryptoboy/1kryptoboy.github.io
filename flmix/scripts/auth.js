// filepath: my-firebase-app/my-firebase-app/scripts/auth.js
import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Make login and logout available globally for HTML onclick
window.login = async function () {
  const email = document.getElementById("email_field").value;
  const password = document.getElementById("password_field").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

window.logout = async function () {
  try {
    await signOut(auth);
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
};

// Listen for auth state changes and update UI
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("user_para").innerText = "Welcome back " + user.email;
  } else {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});