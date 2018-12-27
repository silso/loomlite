import React from "react";
import {Coloring, Tieup, Threading, Treadling, Drawdown} from "./Tables.js";
import {updateArray, disableSelection} from "./LoomLib.js";

const initShafts = 4, initTreadles = 6, initWarp = 50, initWeft = 50;

export default class Draft extends React.PureComponent {
	constructor(state) {
		super(state);
		this.state = {
			shafts: initShafts,
			treadles: initTreadles,
			warp: initWarp,
			weft: initWeft,
			cursorColor: 1,
			warpColors: new Array(initWarp).fill(0),
			weftColors: new Array(initWeft).fill(0)
		}
		this.handleClickWarpColor = this.handleClickWarpColor.bind(this);
		this.handleClickWeftColor = this.handleClickWeftColor.bind(this);
	}

	handleClickWarpColor(i, j) {
		this.setState(state => {
			const newWarpColors = updateArray(state.warpColors, j, a => state.cursorColor);
			return {warpColors: newWarpColors};
		});
	}

	handleClickWeftColor(i, j) {
		this.setState(state => {
			const newWeftColors = updateArray(state.weftColors, i, a => state.cursorColor);
			return {weftColors: newWeftColors};
		});
	}

	componentDidMount() {
		disableSelection(document.getElementById("draftTable"));
	}

	render() {
		return (
			<div id="draftTable">
				<table cellPadding="5"><tbody>
					<tr>
						<td></td>
						<td></td>
						<td><Coloring numX={this.state.warp} numY="1" onClick={this.handleClickWarpColor}/></td>
					</tr>
					<tr>
						<td></td>
						<td><Tieup numX={this.state.treadles} numY={this.state.shafts}/></td>
						<td><Threading numX={this.state.warp} numY={this.state.shafts}/></td>
					</tr>
					<tr>
						<td><Coloring numX="1" numY={this.state.weft} onClick={this.handleClickWeftColor}/></td>
						<td><Treadling numX={this.state.treadles} numY={this.state.weft}/></td>
						<td><Drawdown numX={this.state.warp} numY={this.state.weft}/></td>
					</tr>
				</tbody></table>
			</div>
		);
	}
}
