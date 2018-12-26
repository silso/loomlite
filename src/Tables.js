import React from 'react';

/**
 * DraftCell
 */
class DraftCell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		}
	}

	handleClick() {
		console.log("i was clicked");
		this.setState({clicked: !this.state.clicked});
		this.props.onClick();
	}

	render() {
		return (
			<td className={this.props.className} onClick={() => this.handleClick()} style={{backgroundColor: this.state.clicked && this.props.color}}></td>
		)
	}
}

/**
 * DraftTable
 */
class DraftTable extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick(i, j) {
		return () => {
			console.log(`hello: ${i}, ${j}`);
			this.props.onClick(i, j);
		}
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <DraftCell key={`${i},${j}`} className="patCell" onClick={this.handleClick(i, j)} color="black" />;
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
