import React from "react";
const style = require('../themes/GlobalStyles').MainContent;

var MainContent = React.createClass({

	getInitialState: function() {
		return { isloading: true }
	},

	_toggleLoader: function(loading) {
		this.setState({
			isloading: loading
		});
	},

	componentDidMount: function() {
	},

	render() {
		return <section style={style} className={this.props.path + " MainContent " + (this.state.isloading ? "loading" : "")}>
			{this.props.children}
		</section>;
	}
});

module.exports = MainContent;
