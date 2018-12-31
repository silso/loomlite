export const UPDATE_CURSORCOLOR = "cursorColor:updateCursorColor";
export const UPDATE_COLORKEY = "colorKey:updateColorKey";

export function updateCursorColor(newColor) {
	return {
		type: UPDATE_CURSORCOLOR,
		payload: {
			cursorColor: newColor
		}
	}
}

export function updateColorKey(newColor) {
	return {
		type: UPDATE_COLORKEY,
		payload: {
			colorKey: newColor
		}
	}
}
