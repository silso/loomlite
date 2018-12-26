import React from "react"
import {Coloring, Tieup, Threading, Treadling, Drawdown} from './Tables.js';

const initShafts = 4, initTreadles = 6, initWarp = 50, initWeft = 50;

export default class Draft extends React.Component {
	constructor(state) {
		super(state);
		this.state = {
			shafts: initShafts,
			treadles: initTreadles,
			warp: initWarp,
			weft: initWeft,
			warpColors: new Array(initWarp).fill(0),
			weftColors: new Array(initWeft).fill(0)
		}
	}

	handleClickWarpColor(i, j) {
		this.setState(state => {
			const newWarpColors = state.warpColors.map((color, k) => {
				if (k === i) {
					return color + 1;
				}
				else {
					return color;
				}
			});
			return {warpColors: newWarpColors};
		});
	}

	render() {
		return (
			<div className="topTable">
				<table cellPadding="5"><tbody>
					<tr>
						<td></td>
						<td></td>
						<td><Coloring numX={this.state.warp} numY="1" onClick={this.handleClickWarpColor.bind(this)}/></td>
					</tr>
					<tr>
						<td></td>
						<td><Tieup numX={this.state.treadles} numY={this.state.shafts}/></td>
						<td><Threading numX={this.state.warp} numY={this.state.shafts}/></td>
					</tr>
					<tr>
						<td><Coloring numX="1" numY={this.state.weft}/></td>
						<td><Treadling numX={this.state.treadles} numY={this.state.weft}/></td>
						<td><Drawdown numX={this.state.warp} numY={this.state.weft}/></td>
					</tr>
				</tbody></table>
			</div>
		);
	}
}
