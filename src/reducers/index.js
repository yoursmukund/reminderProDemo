import reminders from "./reminderReducers";
import auth from "./authReducers";
import { combineReducers } from 'redux';

export default combineReducers({
	auth, reminders
});