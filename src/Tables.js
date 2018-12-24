import React from 'react';

/**
 * PatCell
 */
class PatCell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick() {
		this.setState({color: this.props.color});
	}

	render() {
		return (
			<td className={this.props.className} onClick={() => this.handleClick()} style={{backgroundColor: this.state.color}}></td>
		)
	}
}

/**
 * PatTable
 */
class PatTable extends React.Component {
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
			colors: colors
		}
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				row[j] = <PatCell key={`${i},${j}`} className="patCell" color={`rgb(${this.state.colors[i][j][0]},${this.state.colors[i][j][1]},${this.state.colors[i][j][2]})`} />;
			}
			table[i] = <tr key={`${i}`}>{row}</tr>;
		}
		return (
			<table cellPadding="0" cellSpacing="0"><tbody>{table}</tbody></table>
		);
	}
}

export default PatTable;
