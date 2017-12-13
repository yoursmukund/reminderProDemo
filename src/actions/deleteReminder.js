import {constants} from '../constants';

export const deleteReminder = (id) => {
	const action = {
		type: constants.DELETE_REMINDER,
		id: id
	}

	return action;
}