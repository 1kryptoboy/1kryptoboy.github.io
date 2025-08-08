import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.login = async function () {
  const email = document.getElementById("email_field").value;
  const password = document.getElementById("password_field").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Hide modal and reset form
    const modalEl = document.getElementById('loginModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
    document.getElementById("email_field").value = "";
    document.getElementById("password_field").value = "";
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

onAuthStateChanged(auth, (user) => {
  if (window.updateNavAuthBtn) {
    window.updateNavAuthBtn(!!user, user ? user.email : null);
  }
});