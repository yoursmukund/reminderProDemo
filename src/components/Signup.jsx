import React, {Component} from 'react';
import { firebaseApp }  from '../config';
import { connect } from 'react-redux';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import Signin from './Signin';

class Signup extends Component{
	constructor(props){
		super(props);
		this.state = {
			showSignUp: true,
			error: ''
		}
	}

	signUp(){
		firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
		}).catch((error)=>{
			this.setState({error:error.toString()});
		});
	}

	setEmail(email){
		this.setState({email: email});
	}

	setPassword(password){
		this.setState({password: password});
	}

	showSignIn(){
		this.setState({showSignUp:false});
	}

	showSignUp(){
		this.setState({showSignUp:true});
	}


	render(){

		if(this.state.showSignUp){
			return (
			<div className="App">
				<div className="form-inline">

					<h3>Sign Up</h3>
					<div className="form-group">
						<input type= "email" className="form-control form-element" placeholder="Email" 
						onChange = {(event) => {this.setEmail(event.target.value)}}/>
						<input type="password" className="form-control form-element" placeholder="Password" 
						onChange = {(event) => {this.setPassword(event.target.value)}} />
						<button className="btn btn-primary form-element" onClick ={()=>{this.signUp()}}>Sign Up</button>
						<a href="#" onClick={()=>{this.showSignIn()}}>Sign in</a>
					</div>
				</div>
				<p style={{color: 'red'}}>{this.state.error}</p>
			</div>
			)
		} else{
			return(
				<Signin backToSignUp={()=>{this.showSignUp()}}/>
				);
		}

		
	}
}

//reducers that return state of the app to the component's props
function mapStateToProps(state){
	return {
		auth: state.auth
	}
}

//Make component aware of the action and reducer
export default withRouter(connect(mapStateToProps, null)(Signup));
