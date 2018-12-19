import React from 'react';
import PatTable from './PatTable.js';
import './styles/styles.scss';

/**
 * App
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDownCount: 0,
    };
		this.handleClick = this.handleClick.bind(this);
		this.handleUnclick = this.handleUnclick.bind(this);
  }

	handleClick(e) {
		if (e.button === 0) {
			this.setState({mouseDownCount: this.state.mouseDownCount + 1});
			console.log(this.state.mouseDownCount);
		}
	}

	handleUnclick(e) {
		if (e.button === 0) {
			this.setState({mouseDownCount: this.state.mouseDownCount - 1});
			console.log(this.state.mouseDownCount);
		}
	}

	componentDidMount() {
		document.body.addEventListener('mousedown', this.handleClick);
		document.body.addEventListener('mouseup', this.handleUnclick);
	}

	componentWillUnmount() {
		document.body.removeEventListener('mousedown', this.handleClick);
		document.body.removeEventListener('mouseup', this.handleUnclick);
	}

  render() {
		return (
			<div className="topTable">
				<table><tbody>
					<tr>
						<td><PatTable numX="6" numY="4"/></td>
						<td><PatTable numX="50" numY="4"/></td>
					</tr>
					<tr>
						<td><PatTable numX="6" numY="50"/></td>
						<td><PatTable numX="50" numY="50"/></td>
					</tr>
				</tbody></table>
			</div>
		);
  }
}

export default App;
