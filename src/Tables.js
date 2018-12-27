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
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleMouseOver() {
		if (this.props.mouseDown) {
			this.handleClick();
		}
	}

	handleClick() {
		this.props.onClick(this.props.xCoord, this.props.yCoord);
	}

	render() {
		return (
			<td className={this.props.className} onMouseDown={this.handleClick} onMouseOver={this.handleMouseOver} style={{backgroundColor: this.props.on && this.props.color}}></td>
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
	}

	handleClick(i, j) {
		console.log(`hello: ${i}, ${j}`);
		if (this.props.onClick) {
			this.props.onClick(i, j);
		}
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <DraftCell key={`${i},${j}`} yCoord={i} xCoord={j} className="patCell" onClick={this.handleClick} color="black" />;
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
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}
		
	handleMouseDown() {
		this.setState({mouseDown: true});
	}
	handleMouseUp() {
		this.setState({mouseDown: false});
	}
	
	handleClick(i, j) {
		this.setState(state => {
			const newShaftNums = updateArray(state.shaftNums, i, a => j);
			return {shaftNums: newShaftNums};
		});
	}
	
	handleMouseLeave() {
		this.setState({mouseDown: false});
	}
	
	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <DraftCell key={`${i},${j}`} yCoord={i} xCoord={j} mouseDown={this.state.mouseDown} on={this.state.shaftNums[j] === i} className="patCell" onClick={this.handleClick} color="black" />;
			}
			table[this.props.numY - i - 1] = <tr key={`${i}`}>{row}</tr>;
		}
		return (
			<table cellPadding="0" cellSpacing="0" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseLeave={this.handleMouseLeave}><tbody>{table}</tbody></table>
		);
	}
}

export class Treadling extends DraftTable {
	
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
