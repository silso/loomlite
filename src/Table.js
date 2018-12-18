import React from 'react';

/**
 * Cell
 */
class Cell extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<td class={this.props.class}>
				a
			</td>
		)
	}
}

/**
 * Table
 */
class Table extends React.Component {
	constructor(props) {
		super(props);
		// init
	}

	render() {
		//return (<p>testy test</p>);
		let table = new Array(10);
		for (let i = 0; i < 10; i++) {
			let row = new Array(100);
			for (let j = 0; j < 40; j++) {
				row[j] = <Cell class="cell"/>;
			}
			table[i] = <tr>{row}</tr>;
		}
		return (
			<table><tbody>{table}</tbody></table>
		);
	}
}

export default Table;
