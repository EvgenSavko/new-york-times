import app from 'firebase/app'
import 'firebase/auth'
import '@firebase/firestore'

const config = {
  apiKey: 'AIzaSyAe-Lln1-ppD4m4eqgZoWKKRLEsa9Dppj4',
  authDomain: 'reactnativesignuptest.firebaseapp.com',
  databaseURL: 'https://reactnativesignuptest.firebaseio.com',
  projectId: 'reactnativesignuptest',
  storageBucket: 'reactnativesignuptest.appspot.com',
  messagingSenderId: '996659301708',
  appId: '1:996659301708:web:c2b1c8403042726c4353e9',
  measurementId: 'G-WNRS4LNG5T',
}

// Initialize Firebase
app.initializeApp(config)
let auth = app.auth()
let db = app.firestore()
let usersDB = db.collection('users')

const onAuthStateChanged = () => null

const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)

const signUp = (email, password) => auth.createUserWithEmailAndPassword(email, password)

export { onAuthStateChanged, signUp, signIn, usersDB }

//UPDATE one
// usersDB.doc('mario').update({
//   outfitColor: 'red',
// })

//SET one
// usersDB.doc('mario').set({
//   employment: 'plumber',
//   outfitColor: 'green',
//   specialAttack: 'fireball',
// })

//GET all
// usersDB.get().then(querySnapshot => {
//   querySnapshot.docs.map(function(documentSnapshot) {
//     console.log('documentSnapshot', documentSnapshot.data())
//   })
// })

//GET from id
// usersDB
//   .doc('mario')
//   .get()
//   .then(user => console.log('user', user.data()))
