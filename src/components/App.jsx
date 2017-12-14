import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from '../actions';
import ReminderList  from './ReminderList.jsx';
import "./App.css";
import { Route,Link, withRouter } from 'react-router-dom';
import { firebaseApp }  from '../config';
import Signup from './Signup.jsx';

class App extends Component{

	constructor(props){
		super(props);
		this.state = {
			text: '',
			addReminder: true,
			id: ''
		}
	}

	addReminder(){
		if(this.state.addReminder){
			this.props.addReminder(this.state.text);
		}
	}

	updateReminder(){
		if(!this.state.addReminder){
			this.props.updateReminder(this.state.id, this.state.text);
			this.setState({addReminder:true});
		}
	}

	showReminderToBeUpdated(id){
		var arrReminders = Object.create(this.props.reminders);
		for (var i = arrReminders.length - 1; i >= 0; --i) {
		    if (arrReminders[i].id === id) {
		        var reminderToBeUpdated = arrReminders.splice(i,1);
		    }
		}
		document.getElementById("reminder").value = reminderToBeUpdated[0].text;
		this.setState({text: this.state.text, addReminder: false, id: reminderToBeUpdated[0].id});

	}

	resetToAddReminder(){
		this.setState({addReminder:true}, () => {
		});
	}

	logOut(){
		firebaseApp.auth().signOut();
	}

	addReminderToState(text){
		this.setState({text:text});
	}



	render(){

		if(this.props.auth){
			let button = null;
			if(this.state.addReminder){
				button =  <button 
							id = "addReminder" 
							type="button" 
							className="btn btn-success form-element" 
							onClick = {() => {this.addReminder()}}>
							Add Reminder
						</button>
			} else{
				button =  <button 
							id = "updateReminder" 
							type="button" 
							className="btn btn-default form-element" 
							onClick = {() => {this.updateReminder()}}>
							Update Reminder
						</button>
			}

			return(
				<div className="container card-app">
					<button className="btn btn-danger logout" onClick= {()=>{this.logOut(false)}}>Logout</button>
					<div className="App">
						<div className="title">Reminder Pro</div>
						<div className="form-inline">
							<div className="form-group">
								<input id = "reminder" className="form-control form-element" placeholder="I have to..." 
								onChange = {(event)=>{this.addReminderToState(event.target.value)}} />
								{button}
							</div>
						</div>
						<div>
							<ReminderList 
								resetToAddReminder = {() => {this.resetToAddReminder()}} 
								reqReminderUpdate = {(id) => {this.showReminderToBeUpdated(id)}}/>
						</div> 
					</div>
				</div>

				
				)
			} else{
				
				return(
					<div className="card">
						<Signup/>
					</div>
					)
				
			}			
		} 
		

} 





//reducers that return state of the app to the component's props
function mapStateToProps(state){
	return {
		auth: state.auth,
		reminders: state.reminders
	}
}

//action creators given to the component's prototype to help trigger a change in state
function mapDispatchToProps(dispatch){
	return {
		...bindActionCreators({addReminder: action.addReminder, updateReminder: action.updateReminder, logUser: action.logUser}, dispatch)};
}

//Make component aware of the action and reducer
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

