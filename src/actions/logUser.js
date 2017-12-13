import {constants} from '../constants';

export const logUser = (isAuthenticated) => {
	const action = {
		type: constants.SIGNED_IN,
		isAuthenticated: isAuthenticated
	}
	console.log("signed in action emitted", action);
	return action;
}