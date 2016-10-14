import React from "react";
const style = require('../themes/GlobalStyles').MainContent;

var MainContent = React.createClass({

	getInitialState: function() {
		return { isloading: true }
	},

	_toggleLoader: function(loading) {
		//console.log('should toggle loader....');
		this.setState({
			isloading: loading
		});
	},

	componentDidMount: function() {
		Store.subscribe(['loading'], this._toggleLoader);
	},

	render() {
		return <section style={style} className={this.props.path + " MainContent " + (this.state.isloading ? "loading" : "")}>
			<img className="fedex-logo" src="./images/fedextla.svg" />
			{this.props.children}
		</section>;
	}
});

module.exports = MainContent;
