// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDJr2d0IH3O8B7Ft0akImn1SdzqHSE3U3Y",
    authDomain: "ssa-furniture.firebaseapp.com",
    projectId: "ssa-furniture",
    storageBucket: "ssa-furniture.appspot.com",
    messagingSenderId: "1050348463474",
    appId: "1:1050348463474:web:5acff70441166b238129eb",
    measurementId: "G-DRJ3RC2EKG"
};

//Get elements

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

//add login event

btnLogin.addEventListener('click', e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise
        .then(e => {
            btnLogout.classList.remove('hide');
        })
        .catch(e => {
        console.log(e.message, 'logged in!');
    })
})

//add signup event

btnSignUp.addEventListener('click', e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //register
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise
        .then(user => console.log(user, 'you are signed up!'))
        .catch(e => {
        console.log(e.message);
    })
})

//add logout (NOT WORKING YET)

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});


// Add a realtime listener (FIX THIS)
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser){
//         console.log(firebaseUser);
//     } else {
//         console.log('not logged in');
//     }
// })


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

//Initialise authentication
// const auth = firebase.auth();
//
// auth.signInWithEmailAndPassword(email,pass);
// auth.createUserWithEmailAndPassword(email,pass);
// auth.onAuthStateChanged(firebaseUser => {
//
// })

