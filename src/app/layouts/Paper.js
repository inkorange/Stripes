import React from 'react'
const style = require('../themes/GlobalStyles').Paper;

const Paper = React.createClass({

    getDefaultProps: function () {
        return {
            depth: 1,
            style: {},
            className: ''
        };
    },

    getInitialState: function() {
        return {
        };
    },

    componentDidMount: function() {
    },

    render() {

        var baseStyle = this.mergeStyles(style, this.props.style);
        var depth = {
            boxShadow: "0 " + ((this.props.depth*3.5)-1) + "px " + this.props.depth*10 + "px rgba(0,0,0,0." + this.props.depth + "), 0 " + this.props.depth*3 + "px 10px rgba(0,0,0,0.1)"
        };
        baseStyle = this.mergeStyles(baseStyle, depth);

        return (
            <section style={baseStyle} className={"Paper " + this.props.className}>
                {this.props.children}
            </section>
        )
    }

});

module.exports = Paper;