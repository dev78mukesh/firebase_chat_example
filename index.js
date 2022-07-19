// Your web app's Firebase configuration
var firebaseConfig = {
  databaseURL: "https://modderstack-e82de-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyCdw4TX4bAbk-J2gWYXAyGXifbfviAxXtA",
  authDomain: "modderstack-e82de.firebaseapp.com",
  projectId: "modderstack-e82de",
  storageBucket: "modderstack-e82de.appspot.com",
  messagingSenderId: "1092207205079",
  appId: "1:1092207205079:web:87f15b47a57e3c60782e92",
  measurementId: "G-PW9XX6F3PV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  console.log(messages);
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
