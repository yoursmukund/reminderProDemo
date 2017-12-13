import React, {Component} from 'react';
import { firebaseApp }  from '../config';

class Signin extends Component{
	constructor(props){
		super(props);
	}

	signIn(){
		firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error)=>{
			console.log(error);
		});
	}


	render(){
		return (

			<div className="form-inline">
				<h2>Sign in</h2>
				<div className="form-group">
					<input type= "email" className="form-control" placeholder="email" 
					onChange = {event => {this.setState({email: event.target.value})}}/>
					<input type="password" className="form-control" 
					onChange = {event => {this.setState({password: event.target.value})}}/>
					<button onClick ={this.signIn()}>Sign in</button>
				</div>
			</div>
		)	
	}
}

export default Signin;