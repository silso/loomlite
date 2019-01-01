import React from "react";
import {WarpColoring, WeftColoring, Tieup, Threading, Treadling, Drawdown} from "./Tables.js";
import {updateArray, disableSelection, getColumnFromTable} from "./LoomLib.js";

import {connect} from "react-redux";
import {updateCursorColor, updateColorKey} from "./actions.js";

const initShafts = 4, initTreadles = 6, initWarp = 50, initWeft = 50;

class Draft extends React.PureComponent {
	constructor(state) {
		super(state);
		this.state = {
			shafts: initShafts,
			treadles: initTreadles,
			warp: initWarp,
			weft: initWeft,
			warpColors: new Array(initWarp).fill(0),
			weftColors: new Array(initWeft).fill(0),
			tieup: new Array(initShafts).fill(0).map(() => new Array(initTreadles).fill(0)),
			threading: new Array(initWarp).fill(0),
			treadling: new Array(initWeft).fill(0).map(() => new Array(initTreadles).fill(0)),
			drawdownColors: new Array(initWarp).fill(0).map(() => new Array(initWeft).fill(0))
		}
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

	componentDidMount() {
		disableSelection(document.getElementById("topTable"));
	}

	getShafts(i) {
		let treadles = [];
		for (let j = 0, len = this.state.treadling[i].length; j < len; j++) {
			if (this.state.treadling[i][j] === 1) {
				treadles.push(j);
			}
		}
		console.log("treadles:", treadles);
		if (treadles.length === 0) return [];
		let shafts = getColumnFromTable(this.state.tieup, treadles[0]);
		for (let j = 1, len = treadles.length; j < len; j++) {
			let addedShaft = getColumnFromTable(this.state.tieup, treadles[j]);
			for (let k = 0, len2 = shafts.length; k < len2; k++) {
				shafts[k] = shafts[k] || addedShaft[k];
			}
		}
		console.log("shafts:", shafts);
		return shafts;
	}

	updateColumn(j) {
		this.setState(state => {
			const newDrawdownColors = state.drawdownColors.map((row, rowIndex) => {
				let rowCopy = row.slice();
				const shafts = this.getShafts(rowIndex);
				if (shafts[this.state.threading[j]]) {
					rowCopy[j] = this.state.warpColors[j];
				}
				else {
					rowCopy[j] = this.state.weftColors[rowIndex];
				}
				return rowCopy;
			});
			return {drawdownColors: newDrawdownColors};
		});
	}

	updateRow(i) {
		this.setState(state => {
			const newDrawdownColors = state.drawdownColors.map((row, rowIndex) => {
				if (rowIndex === i) {
					let rowCopy = row.slice();
					const shafts = this.getShafts(i);
					for (let j = 0, len = rowCopy.length; j < len; j++) {
						if (!shafts[this.state.threading[j]]) {
							rowCopy[j] = this.state.weftColors[i];
						}
						else {
							rowCopy[j] = this.state.warpColors[j];
						}
					}
					return rowCopy;
				}
				return row;
			});
			return {drawdownColors: newDrawdownColors};
		});
	}

	handleClickWarpColor(i, j) {
		this.setState(state => {
			const newWarpColors = updateArray(state.warpColors, j, a => this.props.cursorColor);
			return {warpColors: newWarpColors};
		}, () => {
			this.updateColumn(j);
		});
	}

	handleClickThreading(i, j) {
		this.setState(state => {
			const newThreading = updateArray(state.threading, j, a => i);
			return {threading: newThreading};
		}, () => {
			this.updateColumn(j);
		});
	}

	handleClickTieup(i, j, newColor) {
		this.setState(state => {
			const newTieup = state.tieup.map((row, rowIndex) => {
				let rowCopy = row.slice();
				if (i === rowIndex) {
					rowCopy[j] = newColor;
				}
				return rowCopy;
			});
			return {tieup: newTieup};
		}, () => {
			for (let k = 0, len = this.state.weft; k < len; k++) {
				this.updateRow(k);
			}
		});
	}

	handleClickTreadling(i, j, newColor) {
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
			this.updateRow(i);
		});
	}

	handleClickWeftColor(i, j) {
		this.setState(state => {
			const newWeftColors = updateArray(state.weftColors, i, a => this.props.cursorColor);
			return {weftColors: newWeftColors};
		}, () => {
			this.updateRow(i);
		});
	}

	handleColorChange(e) {
		let newColor = e.target.value;
		let i = this.props.colorKey.indexOf(newColor);
		if (i > -1) {
			this.props.onUpdateCursorColor(i);
		}
		else {
			this.props.onUpdateCursorColor(this.props.colorKey.length);
			this.props.onUpdateColorKey(newColor);
		}
	}

	render() {
		const shafts = this.state.shafts;
		const treadles = this.state.treadles;
		const warp = this.state.warp;
		const weft = this.state.weft;
		return (
			<div id="topTable">
				<table cellPadding="5"><tbody>
					<tr>
						<td></td>
						<td><form
							id="colorPicker"
							style={{backgroundColor: this.props.colorKey[this.props.cursorColor]}}>
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
							cursorColor={this.props.cursorColor}
							colorKey={this.props.colorKey}
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
							cursorColor={this.props.cursorColor}
							colorKey={this.props.colorKey}
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
							cursorColor={this.props.cursorColor}
							colorKey={this.props.colorKey}
							drawdownColors={this.state.drawdownColors}
						/></td>
					</tr>
				</tbody></table>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cursorColor: state.cursorColor,
	colorKey: state.colorKey
});

const mapDispatchToProps = {
	onUpdateCursorColor: updateCursorColor,
	onUpdateColorKey: updateColorKey
};

export default connect(mapStateToProps, mapDispatchToProps)(Draft);
