import React from "react";
import {updateArray} from "./LoomLib.js";

/**
 * DraftCell - base component of all Draft components. This is displayed as one
 * square cell on screen
 * @extends React.Component
 */
class DraftCell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		}
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
	}

	handleMouseDown() {
		this.props.onMouseDown(this.props.pos.y, this.props.pos.x);
	}

	handleMouseEnter() {
		if (this.props.mouseDown) {
			this.handleClick();
		}
	}

	handleClick() { //currently does not run on normal clicks, only on drags
		this.props.onClick(this.props.pos.y, this.props.pos.x);
	}

	render() {
		let color = "white";
		let text = "";
		if (this.props.type === 0) {
			if (this.props.display === 1) {
				color = "black";
			}
		}
		else {
			text = this.props.display;
		}
		return (
			<td
				className={this.props.className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				style={{backgroundColor: color}}
			>{text}</td>
		)
	}
}

/**
 * DraftTable - general form of a table of DraftCells
 * @extends React.Component
 */
class DraftTable extends React.Component {
	constructor(props) {
		super(props);
		this.type = 0;
		this.className = "draftTable";
		this.flipVertically = false;
		this.state = {
			cellColors: [[]],
			mouseDown: false,
			mouseDownOnColor: 0
		}
		this.state.cellColors = new Array(this.props.numY).fill(new Array(this.props.numX).fill(0));
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	clickedCellColor(i, j) {
		return this.state.mouseDownOnColor ? 0 : 1;
	}

	handleMouseDown(i, j) {
		this.setState(state => {
			return ({
				mouseDown: true,
				mouseDownOnColor: this.state.cellColors[i][j]
			});
		}, () => {
			this.handleClick(i, j);
		});
	}

	handleMouseUp() {
		this.setState({mouseDown: false});
	}

	handleMouseLeave() {
		this.setState({mouseDown: false});
	}

	handleClick(i, j) {
//		console.log("clicked", i, j);
		this.setState(state => {
			let newCellColors = [];
			for (let k = 0; k < state.cellColors.length; k++) {
				newCellColors[k] = state.cellColors[k].slice();
			}

			newCellColors[i][j] = this.clickedCellColor(i, j);
			return {cellColors: newCellColors};
		});
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <DraftCell
					key={`${i},${j}`}
					pos={{x: j, y: i}}
					onMouseDown={this.handleMouseDown}
					onClick={this.handleClick}
					mouseDown={this.state.mouseDown}
					display={this.state.cellColors[i][j]}
					className="draftCell"
					type={this.type}
				/>;
			}
			if (this.flipVertically) {
				table[this.props.numY - 1 - i] = <tr key={`${i}`}>{row}</tr>;
			}
			else {
				table[i] = <tr key={`${i}`}>{row}</tr>;
			}
		}
		return (
			<table
				className={this.className}
				cellPadding="0"
				cellSpacing="0"
				onMouseUp={this.handleMouseUp}
				onMouseLeave={this.handleMouseLeave}
			><tbody>{table}</tbody></table>
		);
	}
}

/**
 * Coloring - top left and bottom right tables
 * @extends DraftTable
 */
export class Coloring extends DraftTable {
	constructor(props) {
		super(props);
		this.className = "leftDraftTable";
	}
}

/**
 * Tieup - middle center table
 * @extends DraftTable
 */
export class Tieup extends DraftTable {
	constructor(props) {
		super(props);
		this.flipVertically = true;
	}
}

/**
 * Threading - middle left table
 * @extends DraftTable
 */
export class Threading extends DraftTable {
	constructor(props) {
		super(props);
		//display your number instead of color
		this.type = 1;
		this.className = "leftDraftTable";
		this.flipVertically = true;
		this.state = {
			shaftNums: [],
			mouseDown: false
		}
		this.state.shaftNums = new Array(this.props.numX).fill(0);
	}

	handleMouseDown(i, j) {
		this.setState(state => {
			return ({
				mouseDown: true,
			});
		}, () => {
			this.handleClick(i, j);
		});
	}

	handleClick(i, j) {
//		console.log("clicked", i, j);
		this.setState(state => {
			let newShaftNums = state.shaftNums.slice();

			newShaftNums[j] = i;
			return {shaftNums: newShaftNums};
		});
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				let display = "";
				if (this.state.shaftNums[j] === i) {
					display = i + 1;
				}
				row[j] = <DraftCell
					key={`${i},${j}`}
					pos={{x: j, y: i}}
					onMouseDown={this.handleMouseDown}
					onClick={this.handleClick}
					mouseDown={this.state.mouseDown}
					display={display}
					className="draftCell"
					type={this.type}
				/>;
			}
			if (this.flipVertically) {
				table[this.props.numY - 1 - i] = <tr key={`${i}`}>{row}</tr>;
			}
			else {
				table[i] = <tr key={`${i}`}>{row}</tr>;
			}
		}
		return (
			<table
				className={this.className}
				cellPadding="0"
				cellSpacing="0"
				onMouseUp={this.handleMouseUp}
				onMouseLeave={this.handleMouseLeave}
			><tbody>{table}</tbody></table>
		);
	}
}

/**
 * Treadling - table describing something. bottom center table
 * @extends DraftTable
 */
export class Treadling extends DraftTable {

}

/**
 * Drawdown - shows the pattern. bottom left table
 * @extends DraftTable
 */
export class Drawdown extends DraftTable {
	constructor(props) {
		super(props);
		this.className = "leftDraftTable";
	}
}
