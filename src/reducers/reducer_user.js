import { SET_LOCAL_USER, INVALIDATE_LOCAL_USER } from '../actions/actions_user';

const INITIAL_STATE = { 
	status: "unauthorized",
	data: null
};


export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
	case SET_LOCAL_USER:
		const newState = {
			status: "authorized",
			data: action.data
		}
		return { ...state, ...newState};
	case INVALIDATE_LOCAL_USER:
		return { ...state, ...INITIAL_STATE};
	default:
		return state;
	}
}