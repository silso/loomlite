import React from "react";
import {WarpColoring, WeftColoring, Tieup, Threading, Treadling, Drawdown} from "./Tables.js";
import {updateArray, disableSelection, getColumnFromTable, quickHash} from "./LoomLib.js";

//forgive my absolute abuse of JSDoc

class DraftChild extends React.PureComponent {
	constructor(state) {
		super(state);
		this.state = {
			//list of hex codes of current colors being used in document. init with white and black.
			colorKey: ["#ffffff", "#000000"],
			//current color based on colorKey. init with 1 meaning black.
			cursorColor: 1,
			//1d array of ints representing the selected warp thread colors. init with all white.
			warpColors: new Array(this.props.warp).fill(0),
			//1d array of ints representing the selected weft thread colors. init with all white.
			weftColors: new Array(this.props.weft).fill(0),
			//2d array of ints (0 or 1) representing the current tieup. init with all 0 (unconnected).
			tieup: new Array(this.props.shafts).fill(0).map(() => new Array(this.props.treadles).fill(0)),
			//1d array of ints representing which shaft each warp color is connected to. init with all 0 (1st shaft).
			threading: new Array(this.props.warp).fill(0),
			//2d array of ints (0 or 1) representing treadling pattern. init with all 0 (no treadle presses).
			treadling: new Array(this.props.weft).fill(0).map(() => new Array(this.props.treadles).fill(0)),
			//2d array of ints representing the current pattern that is woven. init with all white.
			drawdownColors: new Array(this.props.weft).fill(0).map(() => new Array(this.props.warp).fill(0))
		}
		//bind all functions that need access to this
		this.getShafts = this.getShafts.bind(this);
		this.updateColumn = this.updateColumn.bind(this);
		this.updateRow = this.updateRow.bind(this);
		this.handleClickWarpColor = this.handleClickWarpColor.bind(this);
		this.handleClickThreading = this.handleClickThreading.bind(this);
		this.handleClickTieup = this.handleClickTieup.bind(this);
		this.handleClickTreadling = this.handleClickTreadling.bind(this);
		this.handleClickWeftColor = this.handleClickWeftColor.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);
	}

	//disables text selection otherwise messes up dragging in some browsers
	componentDidMount() {
		disableSelection(document.getElementById("topTable"));
	}

	/**
	 * getShafts - return which shafts are raised for a certain weft thread (state of shafts, raised or lowered)
	 *
	 * @param  {int} i - treadle index (row of the weft thread we care about)
	 * @return {Array} array of booleans representing raised shafts
	 */
	getShafts(i) {
		//first, find which treadles are being pressed for this weft thread
		let treadles = [];
		for (let j = 0, len = this.state.treadling[i].length; j < len; j++) {
			if (this.state.treadling[i][j] === 1) {
				treadles.push(j);
			}
		}
		//if no treadles, no shafts
		if (treadles.length === 0) return [];
		//second, OR together the corresponding columns of the tieup to get all the shafts raised
		let shafts = getColumnFromTable(this.state.tieup, treadles[0]);
		for (let j = 1, len = treadles.length; j < len; j++) {
			let addedShaft = getColumnFromTable(this.state.tieup, treadles[j]);
			for (let k = 0, len2 = shafts.length; k < len2; k++) {
				shafts[k] = shafts[k] || addedShaft[k];
			}
		}
		return shafts;
	}

	/**
	 * updateColumn - set one column of state.drawdownColors without touching others
	 *
	 * @param  {int} j - index of warp thread (column)
	 * @return {void}
	 */
	updateColumn(j) {
		this.setState(state => {
			//create a copy of previous state using map() to avoid altering previous state
			const newDrawdownColors = state.drawdownColors.map((row, rowIndex) => {
				let rowCopy = row.slice();
				const shafts = this.getShafts(rowIndex);
				//if this shaft is raised, set the item of this column in the row to the appropriate warp color
				if (shafts[this.state.threading[j]]) {
					rowCopy[j] = this.state.warpColors[j];
				}
				//otherwise, make it weft color (all but one will do this)
				else {
					rowCopy[j] = this.state.weftColors[rowIndex];
				}
				return rowCopy;
			});
			//set state
			return {drawdownColors: newDrawdownColors};
		});
	}

	/**
	 * updateRow - set one row of state.drawdownColors without touching others
	 *
	 * @param  {int} i - index of weft thread (row)
	 * @return {void}
	 */
	updateRow(i) {
		this.setState(state => {
			//create a copy of previous state using map() to avoid altering previous state
			const newDrawdownColors = state.drawdownColors.map((row, rowIndex) => {
				//only edit the row that we care about
				if (rowIndex === i) {
					let rowCopy = row.slice();
					const shafts = this.getShafts(i);
					for (let j = 0, len = rowCopy.length; j < len; j++) {
						//if this shaft is lowered, set this cell to the weft color
						if (!shafts[this.state.threading[j]]) {
							rowCopy[j] = this.state.weftColors[i];
						}
						//otherwise warp color
						else {
							rowCopy[j] = this.state.warpColors[j];
						}
					}
					return rowCopy;
				}
				return row;
			});
			//set state
			return {drawdownColors: newDrawdownColors};
		});
	}

	/**
	 * handleClickWarpColor - update state.warpColors, then update the corresponding column
	 * only called if the click changes something
	 *
	 * @param  {int} i - row index of clicked cell
	 * @param  {int} j - column index of clicked cell
	 * @return {void}
	 */
	handleClickWarpColor(i, j) {
		this.setState(state => {
			//use updateArray to copy state.warpColors with a new value at index j
			const newWarpColors = updateArray(state.warpColors, j, a => this.state.cursorColor);
			return {warpColors: newWarpColors};
		}, () => {
			this.updateColumn(j);
		});
	}

	/**
	 * handleClickThreading - update state.threading, then update the corresponding column
	 * only called if the click changes something
	 *
	 * @param  {int} i - row index of clicked cell
	 * @param  {int} j - column index of clicked cell
	 * @return {void}
	 */
	handleClickThreading(i, j) {
		this.setState(state => {
			const newThreading = updateArray(state.threading, j, a => i);
			return {threading: newThreading};
		}, () => {
			this.updateColumn(j);
		});
	}

	/**
	 * handleClickTieup - update state.tieup then entire drawdown
	 * only called if the click changes something
	 *
	 * @param  {int} i - row index of clicked cell
	 * @param  {int} j - column index of clicked cell
	 * @param  {int} newColors - color the clicked cell is changing to
	 * @return {void}
	 */
	handleClickTieup(i, j, newColor) {
		//first, set state of tieup
		this.setState(state => {
			const newTieup = state.tieup.map((row, rowIndex) => {
				if (i === rowIndex) {
					const rowCopy = updateArray(row, j, a => newColor);
					return rowCopy;
				}
				return row;
			});
			return {tieup: newTieup};
		}, () => {
			//then, update literally the whole drawdown using updateRow
			for (let k = 0, len = this.props.weft; k < len; k++) {
				this.updateRow(k);
			}
		});
	}

	/**
	 * handleClickTreadling - update state.treadling then the corresponding row
	 * only called if the click changes something
	 *
	 * @param  {int} i - row index of clicked cell
	 * @param  {int} j - column index of clicked cell
	 * @param  {int} newColors - color the clicked cell is changing to
	 * @return {void}
	 */
	handleClickTreadling(i, j, newColor) {
		//first, set state of treadling
		this.setState(state => {
			const newTreadling = state.treadling.map((row, rowIndex) => {
				let rowCopy = row.slice();
				if (i === rowIndex) {
					rowCopy[j] = newColor;
				}
				return rowCopy;
			});
			return {treadling: newTreadling};
		}, () => {
			//then, update appropriate row
			this.updateRow(i);
		});
	}

	/**
	 * handleClickWeftColor - update state.weftColors, then update the corresponding row
	 * only called if the click changes something
	 *
	 * @param  {int} i - row index of clicked cell
	 * @param  {int} j - column index of clicked cell
	 * @return {void}
	 */
	handleClickWeftColor(i, j) {
		this.setState(state => {
			//use updateArray to copy state.weftColors with a new value at index i
			const newWeftColors = updateArray(state.weftColors, i, a => this.state.cursorColor);
			return {weftColors: newWeftColors};
		}, () => {
			this.updateRow(i);
		});
	}

	/**
	 * handleColorChange - called when the color picker changes colors, updates state.cursorColor
	 * if the color is not already in state.colorKey, add it to it
	 *
	 * @param  {Event} e - event
	 * @return {void}
	 */
	handleColorChange(e) {
		let newColor = e.target.value;
		let i = this.state.colorKey.indexOf(newColor);
		if (i > -1) {
			this.setState({cursorColor: i});
		}
		else {
			this.setState(state => {
				const newColorIndex = state.colorKey.length;
				const newColorKey = updateArray(state.colorKey, newColorIndex, a => newColor);
				return {
					cursorColor: newColorIndex,
					colorKey: newColorKey
				};
			});
		}
	}

	render() {
		const shafts = this.props.shafts;
		const treadles = this.props.treadles;
		const warp = this.props.warp;
		const weft = this.props.weft;
		//topTable uses direction:rtl, so the cell order in each row is backwards (first <td> is on the right)
		return (
			<div id="topTable">
				<table cellPadding="5"><tbody>
					<tr>
						<td></td>
						<td><form
							id="colorPicker"
							style={{backgroundColor: this.state.colorKey[this.state.cursorColor]}}>
								<input
									type="color"
									onChange={this.handleColorChange}
								/>
						</form></td>
						<td><WarpColoring 
							onClick={this.handleClickWarpColor}
							numX={warp}
							numY="1"
							cellColors={this.state.warpColors}
							cursorColor={this.state.cursorColor}
							colorKey={this.state.colorKey}
						/></td>
					</tr>
					<tr>
						<td></td>
						<td><Tieup 
							onClick={this.handleClickTieup}
							numX={treadles}
							numY={shafts}
							cellColors={this.state.tieup}
						/></td>
						<td><Threading 
							onClick={this.handleClickThreading}
							numX={warp}
							numY={shafts}
							threading={this.state.threading}
						/></td>
					</tr>
					<tr>
						<td><WeftColoring
							onClick={this.handleClickWeftColor}
							numX="1"
							numY={weft}
							cellColors={this.state.weftColors}
							cursorColor={this.state.cursorColor}
							colorKey={this.state.colorKey}
						/></td>
						<td><Treadling
							onClick={this.handleClickTreadling}
							numX={treadles}
							numY={weft}
							cellColors={this.state.treadling}
						/></td>
						<td><Drawdown
							numX={warp}
							numY={weft}
							cursorColor={this.state.cursorColor}
							colorKey={this.state.colorKey}
							drawdownColors={this.state.drawdownColors}
						/></td>
					</tr>
				</tbody></table>
			</div>
		);
	}
}

//container to store the state of the number of warp threads, weft threads, shafts, and treadles
export default class Draft extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			warp: 50,
			weft: 50,
			shafts: 8,
			treadles: 10
		}
	}

	render() {
		const warp = this.state.warp;
		const weft = this.state.weft;
		const shafts = this.state.shafts;
		const treadles = this.state.treadles;
		//the key creates a new DraftChild every time one of the 4 numbers changes
		return (
			<DraftChild
				key={quickHash("" + warp + weft + shafts + treadles).toString()}
				warp={warp}
				weft={weft}
				shafts={shafts}
				treadles={treadles}
			/>
		);
	}
}
