import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import {BrowserRouter as Router} from 'react-router-dom';
import { firebaseApp }  from './config';
import action from './actions';

const store = createStore(reducer);


ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>, 
document.getElementById("root")
);


firebaseApp.auth().onAuthStateChanged((user) => {
	if(user){
		store.dispatch(action.logUser(true));

	} else{
		store.dispatch(action.logUser(false));
	}
});







