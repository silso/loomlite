import {UPDATE_CURSORCOLOR, UPDATE_COLORKEY} from "./actions.js"

export function cursorColorReducer(state = 0, {type, payload}) {
	switch (type) {
		case UPDATE_CURSORCOLOR:
			return payload.cursorColor;
			break;
		default:
			return state;
	}
}

export function colorKeyReducer(state = [], {type, payload}) {
	switch (type) {
		case UPDATE_COLORKEY:
			return state.concat([payload.colorKey]);
			break;
		default:
			return state;
	}
}
