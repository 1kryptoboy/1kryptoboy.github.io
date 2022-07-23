firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("login_div_reset_password").style.display = "none";
    document.getElementById('nav_bar').classList.remove("w3-hide")

    var user = firebase.auth().currentUser;
    if(user != null){
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome back " + email_id;
    }

  } else {
    // No user is signed in.
    //document.getElementById("user_div").style.display = "block";
    //document.getElementById("login_div").style.display = "block";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById('nav_bar').classList.remove("w3-block")
    document.getElementById('nav_bar').classList.add("w3-hide")
  }
});

function login(){
  //console.log("is login even kicking off")
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  //console.log(userEmail)
  //console.log(userPass)
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
    // ...
  });
}

function logout(){
  firebase.auth().signOut();
}
