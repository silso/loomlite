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
/**
 * disableSelection
 * source: http://www.dynamicdrive.com/dynamicindex9/noselect.htm
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
