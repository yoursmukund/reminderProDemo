import { firebaseApp } from '../config';

class AuthService {

	signIn(email, password){

		var authState;
		
		return firebaseApp.auth().signInWithEmailAndPassword(email, password)
		.then(()=>{
			return "signed in"
		}).catch(()=>{
			return "not signed in"
		});

	}

	signUp(email, password){

	}


}

export default AuthService;