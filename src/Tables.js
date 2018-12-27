import React from "react";
import {updateArray} from "./LoomLib.js";

/**
 * DraftCell
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
		this.props.onMouseDown(this.props.yCoord, this.props.xCoord);
		//this.handleClick();
	}

	handleMouseEnter() {
		if (this.props.mouseDown) {
			this.handleClick();
		}
	}

	handleClick() {
		this.props.onClick(this.props.yCoord, this.props.xCoord);
	}

	render() {
		return (
			<td className={this.props.className} onMouseDown={this.handleMouseDown} onMouseEnter={this.handleMouseEnter} style={{backgroundColor:  (this.props.type === 0 && this.props.on) && this.props.color}}>{(this.props.type === 1 && this.props.on) && this.props.yCoord}</td>
		)
	}
}

/**
 * DraftTable
 */
class DraftTable extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			mouseDown: false
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}

	handleMouseDown(i, j) {
		this.setState({mouseDown: true});
		this.handleClick(i, j);
	}
	handleMouseUp() {
		this.setState({mouseDown: false});
	}

	handleClick(i, j) {
		console.log(`hello: ${i}, ${j}`);
		if (this.props.onClick) {
			this.props.onClick(i, j);
		}
	}

	handleMouseLeave() {
		this.setState({mouseDown: false});
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <DraftCell key={`${i},${j}`} yCoord={i} xCoord={j} onMouseDown={this.handleMouseDown} className="draftCell" onClick={this.handleClick} type={0} color="black" />;
			}
			table[i] = <tr key={`${i}`}>{row}</tr>;
		}
		return (
			<table cellPadding="0" cellSpacing="0"><tbody>{table}</tbody></table>
		);
	}
}

export class Coloring extends DraftTable {

}

export class Tieup extends DraftTable {

}

export class Threading extends DraftTable {
	constructor(props) {
		super(props);
		this.state = {
			shaftNums: new Array(this.props.numX).fill(0),
			mouseDown: false
		}
	}

	handleClick(i, j) {
		this.setState(state => {
			const newShaftNums = updateArray(state.shaftNums, j, a => i);
			return {shaftNums: newShaftNums};
		});
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <DraftCell key={`${i},${j}`} yCoord={i} xCoord={j} mouseDown={this.state.mouseDown} onMouseDown={this.handleMouseDown} on={this.state.shaftNums[j] === i} className="draftCell" onClick={this.handleClick} type={1} color="black" />;
			}
			table[this.props.numY - i - 1] = <tr key={`${i}`}>{row}</tr>;
		}
		return (
			<table cellPadding="0" cellSpacing="0" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseLeave={this.handleMouseLeave}><tbody>{table}</tbody></table>
		);
	}
}

export class Treadling extends DraftTable {
	constructor(props) {
		super(props);
		this.state = {
			treadles: new Array(this.props.numY).fill(new Array(this.props.numX).fill(false)),
			mouseDown: false,
			mouseDownOnBlack: false
		}
	}

	handleMouseDown(i, j) {
		this.setState({mouseDown: true});
		this.setState(state => {
			state.mouseDownOnBlack = state.treadles[i][j];
		}, () => {
			this.handleClick(i, j);
		});
	}

	handleClick(i, j) {
		this.setState(state => {
			let newTreadles = [];
			for (let k = 0; k < state.treadles.length; k++) {
				newTreadles[k] = state.treadles[k].slice();
			}
			if (this.state.mouseDownOnBlack) {
				newTreadles[i][j] = false;
			}
			else {
				newTreadles[i][j] = true;
			}
			return {treadles: newTreadles};
		});
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <DraftCell key={`${i},${j}`} yCoord={i} xCoord={j} mouseDown={this.state.mouseDown} onMouseDown={this.handleMouseDown} on={this.state.treadles[i][j]} className="draftCell" onClick={this.handleClick} type={0} color="black" />;
			}
			table[i] = <tr key={`${i}`}>{row}</tr>;
		}
		return (
			<table cellPadding="0" cellSpacing="0" onMouseUp={this.handleMouseUp} onMouseLeave={this.handleMouseLeave}><tbody>{table}</tbody></table>
		);
	}
}

export class Drawdown extends DraftTable {
	/*
	constructor(props) {
		super(props);
		let colors = [];
		for (let i = 0; i < this.props.numY; i++) {
			colors[i] = [];
			for (let j = 0; j < this.props.numX; j++) {
				colors[i][j] = [];
				for (let k = 0; k < 3; k++) {
					colors[i][j][k] = Math.floor(Math.random() * 256);
				}
			}
		}
		this.state = {
			colors: colors,
		}
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <DraftCell key={`${i},${j}`} className="patCell" onClick={this.handleClick(i, j)} color={`rgb(${this.state.colors[i][j][0]},${this.state.colors[i][j][1]},${this.state.colors[i][j][2]})`} />;
			}
			table[i] = <tr key={`${i}`}>{row}</tr>;
		}
		return (
			<table cellPadding="0" cellSpacing="0"><tbody>{table}</tbody></table>
		);
	}
	*/
}
