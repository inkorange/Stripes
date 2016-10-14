import React from 'react'
import { render } from 'react-dom'

const style = require('../themes/GlobalStyles');

const TwoColumnLayout = React.createClass({

    getDefaultProps: function () {
        return {
            columnOne: '',
            columnTwo: '',
            columnOneWidth: '50%',
            columnTwoWidth: '50%',
            columnOneStyle: {},
            columnTwoStyle: {}
        }
    },

    getInitialState: function () {
        return {
            styleLeft: style.TwoColumnLayout.left,
            styleRight: style.TwoColumnLayout.right
        }
    },

    render() {
        if(this.props.columnOneWidth) {
            Object.assign(this.state.styleLeft, {
                width: 'calc('+this.props.columnOneWidth+' - ' + style.default.mainPadding/2 + 'px)'
            });
        }
        if(this.props.columnTwoWidth) {
            Object.assign(this.state.styleRight, {
                width: 'calc('+this.props.columnTwoWidth+' - ' + style.default.mainPadding/2 + 'px)'
            });
        }
        var styleLeft = this.mergeStyles(this.state.styleLeft, this.props.columnOneStyle);
        var styleRight = this.mergeStyles(this.state.styleRight, this.props.columnTwoStyle);
        var styleMain = this.mergeStyles(style.TwoColumnLayout, this.props.style);

        return (
            <section className="TwoColumnLayout" style={styleMain}>
                <div style={styleLeft}   key="column1">{this.props.columnOne}</div>
                <div style={styleRight}  key="column2">{this.props.columnTwo}</div>
            </section>
        )
    }

});

module.exports = TwoColumnLayout;