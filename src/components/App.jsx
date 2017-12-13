import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from '../actions';
import ReminderList  from './ReminderList.jsx';
import "./App.css";


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
			console.log("Current state is ", this.state.addReminder);
		});
	}


	render(){

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
			<div className="App">
				<div className="title" >Reminder Pro</div>
				<div className="form-inline">
					<div className="form-group">
						<input id = "reminder" className="form-control form-element" placeholder="I have to..." 
						onChange = {(event)=>{this.setState({text:event.target.value})}} />
						{button}
					</div>
				</div>
				<div>
					<ReminderList 
						resetToAddReminder = {() => {this.resetToAddReminder()}} 
						reqReminderUpdate = {(id) => {this.showReminderToBeUpdated(id)}}/>
				</div>
			</div>

			
			)
	}

} 





//reducers that return state of the app to the component's props
function mapStateToProps(state){
	return {
		reminders: state
	}
}

//action creators given to the component's prototype to help trigger a change in state
function mapDispatchToProps(dispatch){
	return {
		...bindActionCreators({addReminder: action.addReminder, updateReminder: action.updateReminder}, dispatch)};
}

//Make component aware of the action and reducer
export default connect(mapStateToProps, mapDispatchToProps)(App);
