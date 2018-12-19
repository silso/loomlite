import React from 'react';

/**
 * PatCell
 */
class PatCell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: this.props.color,
		};
	}

	handleClick() {
		this.setState({color: "red"});
	}

	render() {
		return (
			<td className={this.props.className} onClick={() => this.handleClick()} style={{backgroundColor: this.state.color, borderRight: (this.props.border ? "1px solid black" : "none")}}></td>
		)
	}
}

/**
 * PatTable
 */
class PatTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let table = new Array(this.props.numY);
		for (let i = 0; i < this.props.numY; i++) {
			let row = new Array(this.props.numX);
			for (let j = 0; j < this.props.numX; j++) {
				/*
				let c = [];
				for (let k = 0; k < 3; k++) {
					c[k] = Math.floor(Math.random() * 256);
				}
				*/
				row[j] = <PatCell key={`${i},${j}`} className="patCell" color={/*`rgb(${c[0]},${c[1]},${c[2]})`*/"white"} border={Math.floor(Math.random()*2)}/>;
			}
			table[i] = <tr key={`${i}`}>{row}</tr>;
		}
		return (
			<table cellPadding="0" cellSpacing="0"><tbody>{table}</tbody></table>
		);
	}
}

export default PatTable;
