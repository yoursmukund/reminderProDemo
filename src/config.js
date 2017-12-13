import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD0Qk6dpP-eDoRZhyej2KRQbzImcIkrthM",
    authDomain: "reminderpro-10a3f.firebaseapp.com",
    databaseURL: "https://reminderpro-10a3f.firebaseio.com",
    projectId: "reminderpro-10a3f",
    storageBucket: "reminderpro-10a3f.appspot.com",
    messagingSenderId: "157023268644"
  };
  
  export const firebaseApp = firebase.initializeApp(config);