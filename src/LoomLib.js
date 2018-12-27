import React from "react"

/**
 * updateArray
 * @param a input array to be updated
 * @param i index of element in array a to be updated
 * @param fn function to be called on element a[i]
 */

export function updateArray(a, i, fn) {
	return a.map((item, j) => {
		if (j === i) {
			return fn(item);
		}
		else {
			return item;
		}
	});
}
