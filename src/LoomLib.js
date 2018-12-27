import React from "react"

/**
 * updateArray - takes in an array, and returns a copy-by-value'd array with a
 * given index replaced with a given value
 *
 * @param {Array} a input array to be updated
 * @param {int} i index of element in array a to be updated
 * @param {Function} fn function to be called on element a[i]
 */

export function updateArray(a, i, fn) {
	const list = a.slice();
	list[i] = fn(list[i]);
	return list;
	/*
	return a.map((item, j) => {
		if (j === i) {
			return fn(item);
		}
		else {
			return item;
		}
	});
	*/
}

/**
 * disableSelection - Disables the ability to select (drag highlight) within
 * the selected area
 * source: http://www.dynamicdrive.com/dynamicindex9/noselect.htm
 *
 * @param  {Object} target this is the html node within which selection is disabled
 * @return {type}        null
 */
export function disableSelection(target){

	if (typeof target.onselectstart!="undefined") //IE route
		target.onselectstart=function(){return false}

	else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
		target.style.MozUserSelect="none"

	else //All other route (ie: Opera)
		target.onmousedown=function(){return false}

	target.style.cursor = "default"
}
