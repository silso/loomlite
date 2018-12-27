import React from "react";
import Draft from "./Draft.js";
import "./styles/styles.scss";

/**
 * App
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		return (
			<Draft/>
		);
  }
}

export default App;
