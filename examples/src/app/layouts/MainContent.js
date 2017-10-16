import React from "react";
const style = require('../themes/GlobalStyles').MainContent;

export class MainContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isloading: true
		}
	}

	render() {
		return <section style={style} className={"MainContent " + (this.state.isloading ? "loading" : "")}>
			{this.props.children}
		</section>;
	}

}