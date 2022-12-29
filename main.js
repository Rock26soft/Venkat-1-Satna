const firebaseConfig = {
  apiKey: "AIzaSyDDNih-_EgGireOAeIbnlPkQyHo8qXlZoo",
  authDomain: "venkat1satna.firebaseapp.com",
  projectId: "venkat1satna",
  storageBucket: "venkat1satna.appspot.com",
  messagingSenderId: "138396132611",
  appId: "1:138396132611:web:68cf2cae88eee09d05f536",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// Initialize Cloud Firestore and get a reference to the service
function loadpage(pname) {
  fetch("./pages/" + pname + ".html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("pagearea").innerHTML = html;
    })
    .catch((error) => {
      console.warn(error);
    });
  if (pname == "home") {
    loadNotices();
  }
}
function loadNotices() {
  db.collection("Notices")
    .where("visible", "==", true)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var li = document.createElement("li");
        var divc = document.createElement("div");
        var divimgcon = document.createElement("div");

        var divimg = document.createElement("img");
        var divcard = document.createElement("div");
        var ctitle = document.createElement("h2");
        var ctext = document.createElement("p");
        var cbtn = document.createElement("button");
        var div = document.createElement("div");

        li.className = "cards_item";
        divc.className = "card";

        divimg.className = "card_img";
        divimg.setAttribute("src", doc.data().img);

        divcard.className = "card_content";

        ctitle.className = "card_title";
        ctitle.innerHTML = doc.data().title;

        ctext.className = "card_text";
        ctext.innerHTML = doc.data().desc;

        cbtn.className = "btn";
        cbtn.innerHTML = "Read More";

        document.getElementById("listop").appendChild(li);
        li.appendChild(divc);
        divc.appendChild(divimgcon);
        divimgcon.appendChild(divimg);
        divc.appendChild(divcard);
        divcard.appendChild(ctitle);
        divcard.appendChild(ctext);
        divcard.appendChild(cbtn);
        document.getElementById('loader').style.display= "none";


        window.setInterval(changePicture, 1800);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}


const images = [
  "Assets/img1.png",
  "Assets/img2.png", 
  "Assets/img3.png",
  "Assets/img4.png"
];

let i = 0;
function changePicture() {
  i++;
  if (i > images.length - 1) i = 0;
  document.getElementById('backimg').style.backgroundImage = 'url('+images[i]+')';
}