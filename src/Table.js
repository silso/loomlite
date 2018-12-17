import React from 'react';

/**
 * Table
 */
class Table extends React.Component {
	constructor(props) {
		super(props);
		// init
	}

	renderCell() {
		return (
			<Cell/>
		);
	}

	render() {
		return (
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 10; j++) {
					this.renderCell();
				}
			}
		);
	}
}
