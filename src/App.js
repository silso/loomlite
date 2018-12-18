import React from 'react';
import Table from './Table.js';
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
		return <Table/>
  }
}
export default App;
