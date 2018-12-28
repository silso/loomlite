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
			weftColors: new Array(initWeft).fill(0),
			tieup: new Array(initShafts).fill(new Array(initTreadles).fill(false)),
			threading: new Array(initWarp).fill(0),
			treadling: new Array(initWeft).fill(new Array(initTreadles).fill(false))
		}
		this.handleClickWarpColor = this.handleClickWarpColor.bind(this);
		this.handleClickWeftColor = this.handleClickWeftColor.bind(this);
	}

	componentDidMount() {
		disableSelection(document.getElementById("topTable"));
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
						<td></td>
						<td><Coloring numX={warp} numY="1" onClick={this.handleClickWarpColor}/></td>
					</tr>
					<tr>
						<td></td>
						<td><Tieup numX={treadles} numY={shafts}/></td>
						<td><Threading numX={warp} numY={shafts}/></td>
					</tr>
					<tr>
						<td><Coloring numX="1" numY={weft} onClick={this.handleClickWeftColor}/></td>
						<td><Treadling numX={treadles} numY={weft}/></td>
						<td><Drawdown
							numX={warp}
							numY={weft}
							warpColors={this.state.warpColors}
							weftColors={this.state.weftColors}
							tieup={this.state.tieup}
							threading={this.state.threading}
							treadling={this.state.treadling}
						/></td>
					</tr>
				</tbody></table>
			</div>
		);
	}
}
