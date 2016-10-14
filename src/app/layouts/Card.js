import React from 'react'
import { render } from 'react-dom'

const style = require('../themes/GlobalStyles').Card;

const Card = React.createClass({

    getDefaultProps: function () {
        return {
            title: null,
            actions: null,
            fillContainer: false,
            forceBottomAlign: false,
            inactiveDepth: 0
        };
    },

    getInitialState: function() {
        return {
        };
    },

    componentDidMount: function() {
    },

    render() {
        var forceBottomStyle = {
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0
        };
        var fillContainerStyle = {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            top: 0
        };

        var baseStyle = style;
        var footerStyle = style.footer;
        var inactiveStyle = style.inactiveScreen;

        if(this.props.forceBottomAlign) {
            footerStyle = this.mergeStyles(footerStyle, forceBottomStyle);
        }
        if(this.props.fillContainer) {
            baseStyle = this.mergeStyles(baseStyle, fillContainerStyle);
        }
        if(this.props.style) { // adding styles from the caller
            baseStyle = this.mergeStyles(baseStyle, this.props.style);
        }

        inactiveStyle = this.mergeStyles(inactiveStyle, {opacity: this.props.inactiveDepth});

        return (
            <section style={baseStyle} className="Card">
                {this.props.title ? (
                <header key="card_header" ref="card_header" style={style.header}>{this.props.title}</header>
                ) : null}
                <div key="card_body" ref="card_body" style={style.body}>
                {this.props.children}
                </div>
                {this.props.actions ? (
                <footer key="card_footer" ref="card_footer" style={footerStyle}>
                    {this.props.actions}
                </footer>
                ) : null }
                {this.props.inactiveDepth > 0 ? (
                <div className="inactivePanel" style={inactiveStyle}></div>
                ): null}
            </section>
        )
    }

});

module.exports = Card;