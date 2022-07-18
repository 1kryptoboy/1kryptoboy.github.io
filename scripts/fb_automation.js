
function getUserData(uid) {
  console.log("in getuserdata()")
  firebase.database().ref('users/' + uid).once("value", snap => {
  console.log(snap.val())
  document.getElementById("settings").innerHTML = JSON.stringify(snap.val())
  })
}

function remove_item(useruid,path,child) {
  var db = firebase.database();
  var ref = db.ref();
  var survey=db.ref(path);
  survey.child(child).remove();
}

function write_data(useruid, payload) {
  var write_ref = firebase.database().ref(useruid);
  //testing permission denials, partioning, working so far, 07172022
  //var write_ref = firebase.database().ref("users/Tf0oa6PhbRSwUlWyduj5mOojLZI3");

  write_ref.update (payload);
}

function do_something() {
  //remove_item(useruid, 'users/'+useruid,'test')
  //remove_item(useruid, 'users/'+useruid+'/services','event1')
  write_data('users/'+useruid, payload)

}
