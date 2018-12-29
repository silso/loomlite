export function cursorColorReducer(state = 0, {type, payload}) {
	switch (type) {
		case "updateCursorColor":
			return payload;
			break;
		default:
			return state;
	}
}

export function colorKeyReducer(state = [], {type, payload}) {
	switch (type) {
		case "updateColorKey":
			return payload;
			break;
		default:
			return state;
	}
}
