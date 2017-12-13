import { constants } from '../constants';

const auth = (state = null, action) => {
	var newState = null;

	switch(action.type){
		case constants.SIGNED_IN:
			newState = action.isAuthenticated;
			return newState;
		default:
			return state;
	}
}

export default auth;