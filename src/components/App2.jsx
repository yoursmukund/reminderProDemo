import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from '../actions';
import "./App.css";
import { firebaseApp }  from '../config';
import Signup from './Signup.jsx';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';



class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			labels: []
		}

		this.data = {
			labels: [],
			datasets: [
			{	
				data: [],
				label: 'Node Statistics for 172.30.56.60',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
			}]
		};
	}


	logOut(){
		firebaseApp.auth().signOut();
	}

	getData(){
		var self = this;
		const socket = io("http://localhost:3001");
		socket.on('connect', function(){
			socket.on('graphDataResponse', function(data){
				var dates = [];
				var readiops = [];
				for(var i=0; i<data.length; i++){
					console.log("data received ", data[i]);
					readiops.push(data[i].readiops);
					dates.push(data[i].timestamp);
				}
				self.setState({data: readiops, labels: dates});
			});
		setInterval(()=>{
			var currentDate = Date.now();
			var oldDate = currentDate - 120000;
			socket.emit('getGraphData', {currentDate: currentDate, oldDate: oldDate});
		}, 120000);
		});
		
		
	}

	composeChartObject(){
		console.log("state ", this.data);
		this.data.datasets[0].data = this.state.data;
		this.data.labels = this.state.labels;
		return this.data;
	}

	componentDidMount(){
		this.getData();
	}

	render(){
		if(this.props.auth){
			return(
				<div className="container card-app">
					<button className="btn btn-danger logout" onClick= {()=>{this.logOut(false)}}>Logout</button>
					<div className="App">
						<Chart data = {()=>{return this.composeChartObject()}}/>
					</div>
				</div>
				);
		}else{
			return(
				<div className="card">
					<Signup/>
				</div>
			);
		}
	}
}

//Functional component for chart
function Chart(props){
	return(
		 <Line data={props.data} />
	);
}

//Reducers that return state of the app to the component's props
function mapStateToProps(state){
	return {
		auth: state.auth
	}
}

//Action creators given to the component's prototype to help trigger a change in state
function mapDispatchToProps(dispatch){
	return {
		...bindActionCreators({logUser: action.logUser}, dispatch)};
}

//Make component aware of the action and reducer
export default connect(mapStateToProps, mapDispatchToProps)(App);