import React from 'react';
import PatTable from './PatTable.js';
import './styles/styles.scss';

/**
 * App
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
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
