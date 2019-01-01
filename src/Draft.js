import React from "react";
import {Coloring, Tieup, Threading, Treadling, Drawdown} from "./Tables.js";
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
			tieup: new Array(initShafts).fill(0).map(() => new Array(initTreadles).fill(false)),
			threading: new Array(initWarp).fill(0),
			treadling: new Array(initWeft).fill(0).map(() => new Array(initTreadles).fill(false)),
			drawdownColors: new Array(initWarp).fill(0).map(() => new Array(initWeft).fill(0))
		}
		this.updateColumn = this.updateColumn.bind(this);
		this.updateRow = this.updateRow.bind(this);
		this.handleClickWarpColor = this.handleClickWarpColor.bind(this);
		this.handleClickThreading = this.handleClickThreading.bind(this);
		this.handleClickWeftColor = this.handleClickWeftColor.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);
	}

	componentDidMount() {
		disableSelection(document.getElementById("topTable"));
	}

	updateColumn(j) {
		this.setState(state => {
			const newDrawdownColors = state.drawdownColors.map((row, rowIndex) => {
				let rowCopy = row.slice();
				const shafts = getColumnFromTable(this.state.tieup, 0);
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
					const shafts = getColumnFromTable(this.state.tieup, 0);
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
						<td><Coloring 
							onClick={this.handleClickWarpColor}
							numX={warp}
							numY="1"
							cursorColor={this.props.cursorColor}
							colorKey={this.props.colorKey}
						/></td>
					</tr>
					<tr>
						<td></td>
						<td><Tieup 
							numX={treadles}
							numY={shafts}
						/></td>
						<td><Threading 
							onClick={this.handleClickThreading}
							numX={warp}
							numY={shafts}
							threading={this.state.threading}
						/></td>
					</tr>
					<tr>
						<td><Coloring
							onClick={this.handleClickWeftColor}
							numX="1"
							numY={weft}
							cursorColor={this.props.cursorColor}
							colorKey={this.props.colorKey}
						/></td>
						<td><Treadling numX={treadles} numY={weft}/></td>
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
