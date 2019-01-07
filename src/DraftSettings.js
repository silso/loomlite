import React from "react";
import img from "../media/settings.png";

export class DraftSettings extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSubmit(e) {
		e.preventDefault();
	}

	render() {
		let inputs = [], i = 0;
		for (let setting in this.props.settings) {
			inputs[i] = [
				<label key={"l"+i} htmlFor={setting}>{setting}</label>,
				<input key={"i"+i} type="text" name={setting} defaultValue={this.props.settings[setting]}/>,
				<br key={"b"+i}/>
			];
			i++;
		}
		return (
			<div>
				<div className="draftSettingsBackdrop" onClick={this.props.onClose}></div>
				<div className="draftSettings">
					<button className="draftSettingsCloseButton" onClick={this.props.onClose}>X</button>
					<form onSubmit={this.handleSubmit}>
						{inputs}
					</form>
				</div>
			</div>
		);
	}
}

export class DraftSettingsButton extends React.Component {
	render() {
		return (
			<button className="draftSettingsOpenButton" onClick={this.props.onClick}>
				<img src={img}/>
			</button>
		);
	}
}
