const firebaseConfig = {
  apiKey: "AIzaSyDDNih-_EgGireOAeIbnlPkQyHo8qXlZoo",
  authDomain: "venkat1satna.firebaseapp.com",
  databaseURL: "https://venkat1satna-default-rtdb.firebaseio.com",
  projectId: "venkat1satna",
  storageBucket: "venkat1satna.appspot.com",
  messagingSenderId: "138396132611",
  appId: "1:138396132611:web:68cf2cae88eee09d05f536"
};
var rollinpt = document.getElementById('roll')
var passinpt = document.getElementById('password')
var loader = document.getElementById('ldr')
const msgList = document.getElementById("chats")
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
            document.getElementById('logot').style.display = "block";

            showtitle()
            localStorage.setItem("roll", roll);
            localStorage.setItem("pass", pass);
            localStorage.setItem("name", doc.data().Name);
            localStorage.setItem("class", document.getElementById("cselect").value);
            loader.style.display = "none"
            addtitle(doc.data().class)
            startchat(doc.data().class)

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
  document.getElementById("cselect").value = localStorage.getItem("class");
  login();
  document.getElementById('logot').style.display = "none";
}
var textarea = document.querySelector('textarea');

textarea.addEventListener('input', function() {
  textarea.style.height = 'auto'
  textarea.style.height = (textarea.scrollHeight - 50)+ 'px';
});
function addtitle(classname) {
  document.getElementById("roomname").innerHTML = "Chat Room Class - " + classname;
}

function startchat(classname) {
  const messagesRef = firebase.database().ref(classname);

  // Listen for new messages being added to the database
  messagesRef.on('child_added',
    (data) => {
      // Get the message from the data
      const message = data.val();
      console.log(message)
      // Append the message to the list in the UI
      var msg =  document.createElement('div');
      var msgn =  document.createElement('p');
      var msgcon =  document.createElement('div');
      
      msg.innerHTML=message.Text;
      msgn.innerHTML=message.Name;
      if(message.Sroll == localStorage.getItem("roll")){
      msg.className= 'msgsnt';
      msgcon.className= 'msgconsnt';
      }else{
      msg.className= 'msg';
      msgcon.className= 'msgcon';
      msg.appendChild(msgn);
      }
      
      
      
      msgcon.appendChild(msg);
      msgList.appendChild(msgcon);
     
    });
}
// Send a new message to the database
function sendMessage() {
  const messageInput = document.querySelector('#chtmsg');
  const message = messageInput.value;
  if(message.trim() !== ""){
  const messagesRef = firebase.database().ref(localStorage.getItem("class"));
  messagesRef.push({
    Text: message,
    Time: firebase.database.ServerValue.TIMESTAMP,
    Name: localStorage.getItem("name"),
    Sroll: localStorage.getItem("roll"),
  });
  messageInput.value = '';
    
  }
}
function logout(){
  localStorage.setItem("roll", "" );
  localStorage.setItem("pass", "");
  localStorage.setItem("class", "");
  localStorage.setItem("name", "");
  window.location.reload();
}