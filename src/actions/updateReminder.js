import {constants} from '../constants';

export const updateReminder = (id, text) => {
	const action = {
		type: constants.UPDATE_REMINDER,
		id: id,
		text: text
	}
	console.log("update action emitted", action);
	return action;
}