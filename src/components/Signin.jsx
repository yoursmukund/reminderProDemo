import React, {Component} from 'react';
import AuthService from '../services/authService';

class Signin extends Component{
	constructor(props){
		super(props);
		this.state ={
			error: '',
			email: '',
			password: ''
		}
	}

	signIn(){
		var authService = new AuthService();
		var authState = authService.signIn(this.state.email, this.state.password);
	}

	setEmail(email){
		this.setState({email: email});
	}

	setPassword(password){
		this.setState({password: password});
	}


	render(){
		return (
			<div className="App">
				<div className="form-inline">
					<h3>Sign in</h3>
					<div className="form-group">
						<input type= "email" className="form-control form-element" placeholder="Email" 
						onChange = {(event) => {this.setEmail(event.target.value)}}/>
						<input type="password" className="form-control form-element" placeholder="Password" 
						onChange = {(event) => {this.setPassword(event.target.value)}}/>
						<button className="btn btn-primary form-element" onClick ={()=>{this.signIn()}}>Sign in</button>
						<a href="#" onClick={()=>{this.props.backToSignUp()}}>Sign up</a>
					</div>
				</div>
				<p style={{color: 'red'}}>{this.state.error}</p>
			</div>
		)	
	}
}

export default Signin;