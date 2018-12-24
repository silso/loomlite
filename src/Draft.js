import React from "react"
import {Tieup, Threading, Treadling, Drawdown} from './Tables.js';

export default class Draft extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shafts: 4,
			treadles: 6,
			weft: 50,
			warp: 50
		}
	}

	render() {
		return (
			<div className="topTable">
				<table cellPadding="5"><tbody>
					<tr>
						<td><Threading numX="6" numY="4"/></td>
						<td><Tieup numX="50" numY="4"/></td>
					</tr>
					<tr>
						<td><Drawdown numX="6" numY="50"/></td>
						<td><Treadling numX="50" numY="50"/></td>
					</tr>
				</tbody></table>
			</div>
		);
	}
}
