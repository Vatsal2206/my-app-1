import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: 'AIzaSyBIPji6o4yVb9wnd5Gp9LAAL45uQB7Jf_w',
  authDomain: 'covid-helper-36d16.firebaseapp.com',
  projectId: 'covid-helper-36d16',
  storageBucket: 'covid-helper-36d16.appspot.com',
  messagingSenderId: '304622229926',
  appId: '1:304622229926:web:4b5af9cdf5385710921767',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
