const firebaseConfig = {
  apiKey: "AIzaSyDDNih-_EgGireOAeIbnlPkQyHo8qXlZoo",
  authDomain: "venkat1satna.firebaseapp.com",
  projectId: "venkat1satna",
  storageBucket: "venkat1satna.appspot.com",
  messagingSenderId: "138396132611",
  appId: "1:138396132611:web:68cf2cae88eee09d05f536",
};
var rollinpt = document.getElementById('roll')
var passinpt = document.getElementById('password')
var loader = document.getElementById('ldr')
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
    document.getElementById('chatbox').style.display = "none";
function hidetitle() {
  document.getElementById('title').style.display = "none";
}
function showtitle() {
  document.getElementById('title').style.display = "flex";
}
function login () {
  if (rollinpt.value.trim() !== "") {
    loader.style.display = "inline-block"
    var roll = rollinpt.value.trim();
    var pass = passinpt.value.trim();
    var docRef = db.collection("user").doc(roll);


    docRef.get().then((doc) => {

      if (doc.exists) {

        if (doc.data().pass == pass) {
          if (doc.data().class == document.getElementById("cselect").value) {
            document.getElementById('logbox').style.display = "none";
            document.getElementById('chatbox').style.display = "flex";

            showtitle()
            localStorage.setItem("roll", roll);
            localStorage.setItem("pass", pass);
            loader.style.display = "none"

          } else {
            alert("Class not registered with this account")}

        } else {
          alert("Wrong Password")

        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        alert("Account not Made Contact Anuj")

      }
    }).catch((error) => {

      console.log("Error getting document:", error);
      alert("Error : Fill correct info")

    });
  }

}
function oncreate() {
  rollinpt.value = localStorage.getItem("roll");
  passinpt.value = localStorage.getItem("pass");
  login();
}