import React, {Component} from 'react';
import { firebaseApp }  from '../config';

class Signup extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	signUp(){
		firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error)=>{
			console.log(error);
		});
	}

	render(){
		console.log(this.props);
		return (
			<div className="form-inline App">
				<h2>Sign Up</h2>
				<div className="form-group">
					<input type= "email" className="form-control form-element" placeholder="email" 
					onChange = {event => {this.setState({email: event.target.value})}}/>
					<input type="password" className="form-control form-element" placeholder="Password" 
					onChange = {event => {this.setState({password: event.target.value})}}/>
					<button className="btn btn-primary form-element" onClick ={()=>{this.signUp()}}>Sign Up</button>
				</div>
			</div>
			)
	}
}

export default Signup;