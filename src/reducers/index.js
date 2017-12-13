import { constants } from '../constants';

const reminder = (action) => {
	return {
		text: action.text,
		id: Math.random()
	}
}


const reminders = (state=[], action) => {

	let reminders = null;
	switch(action.type){
		case constants.ADD_REMINDER:
			reminders = [...state, reminder(action)];
			return reminders;


		case constants.DELETE_REMINDER:
			reminders = [...state].filter((reminder)=>{
				return reminder.id !== action.id;
			});
			return reminders;


		case constants.UPDATE_REMINDER:
			reminders = [...state].map((reminder) => {
				if(reminder.id===action.id){
					reminder.text = action.text;
				}
				return reminder;
			});
			return reminders;
		default:
			return state;
	}
}

export default reminders;