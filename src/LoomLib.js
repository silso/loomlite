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
export function disableSelection(target) {
	if (typeof target.onselectstart!="undefined") //IE route
		target.onselectstart=function(){return false}

	else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
		target.style.MozUserSelect="none"

	else //All other route (ie: Opera)
		target.onmousedown=function(){return false}

	target.style.cursor = "default"
}

/**
 * exportgetColumnFromTable() Returns by value a column from a table
 *
 * @param {Array} a - input array
 * @param {int} i - index of column
 *
 * @return {Array}
 */
export function getColumnFromTable(a, i) {
	return a.map(row => {
		return row[i];
	});
}

/**
 * quickHash() Fast insecure hash function used to detect changes in strings
 * source: https://gist.github.com/iperelivskiy/4110988#gistcomment-2591235
 *
 * @param {string} s - input string
 *
 * @return {int}
 */
export function quickHash(s) {
	let h = 1;
	for (let i = 0; i < s.length; i++)
		h = Math.imul(h + s.charCodeAt(i) | 0, 2654435761);
	return (h^h >>> 17) >>> 0;
}
