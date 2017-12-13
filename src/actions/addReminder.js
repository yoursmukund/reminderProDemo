import {constants} from '../constants';

export const addReminder = (text) => {
	const action = {
		type: constants.ADD_REMINDER,
		text: text
	}

	return action;
}