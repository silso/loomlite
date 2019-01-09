import React from "react";
import img from "../media/settings.png";

export class DraftSettings extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	getDraftSettings() {
		let formData = new FormData(document.getElementById("draftSettingsForm"));
		let formDataArray = Array.from(formData.entries());
		let formDataObject = formDataArray.reduce((obj, el) => {
			obj[el[0]] = parseInt(el[1]);
			return obj;
		}, {});
		return formDataObject;
	}

	handleSubmit(e) {
		e.preventDefault();
		let formDataObject = this.getDraftSettings();
		this.props.onSettingsUpdate(formDataObject);
	}

	handleClose() {
		let formDataObject = this.getDraftSettings();
		this.props.onClose(formDataObject);
	}

	render() {
		let inputs = [], i = 0;
		for (let setting in this.props.settings) {
			inputs[i] = [
				<label key={"l"+i} htmlFor={setting}>{setting}</label>,
				<input key={"i"+i} type="number" min="0" max="100" required name={setting} defaultValue={this.props.settings[setting]}/>,
				<br key={"b"+i}/>
			];
			i++;
		}
		return (
			<div>
				<div className="draftSettingsBackdrop" onClick={this.handleClose}></div>
				<div className="draftSettings">
					<button className="draftSettingsCloseButton" onClick={this.handleClose}>X</button>
					<form id="draftSettingsForm" onSubmit={this.handleSubmit}>
						{inputs}
						<button type="submit" style={{display: "none"}}>submit</button>
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
