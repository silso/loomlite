import React from "react";
import Draft from "./Draft.js";
import "./styles/styles.scss";

import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {cursorColorReducer, colorKeyReducer} from "./reducers.js";

const allReducers = combineReducers({
	cursorColor: cursorColorReducer,
	colorKey: colorKeyReducer
});

const store = createStore(
	allReducers,
	{
		cursorColor: 1,
		colorKey: ["#ffffff", "#000000"]
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/**
 * App
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		return (
			<Provider store={store}><Draft/></Provider>
		);
  }
}

export default App;
