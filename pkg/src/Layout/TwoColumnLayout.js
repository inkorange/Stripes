"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class TwoColumnLayout extends StripesTheme {

    static defaultProps = {
        columnOne: '',
        columnTwo: '',
        columnOneWidth: '50%',
        columnTwoWidth: '50%',
        columnOneStyle: {},
        columnTwoStyle: {},
        gutter: null,
        style: {},
        type: 'default'
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: this.getStyles()
        }
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var gutter = this.props.gutter ? this.props.gutter : spacing.padding;
        var styleObj = {
            base: {
                display: 'flex',
                flexWrap: 'wrap',
                marginBottom: spacing.padding + 'px'
            },
            left: {
                width: this.props.columnOneWidth ? 'calc('+this.props.columnOneWidth+' - ' + gutter/2 + 'px)' : 'calc(50% - ' + gutter/2 + 'px)',
                marginRight:  gutter + 'px',
                textAlign: 'left'

            },
            right: {
                width: this.props.columnTwoWidth ? 'calc('+this.props.columnTwoWidth+' - ' + gutter/2 + 'px)' : 'calc(50% - ' + gutter/2 + 'px)',
                textAlign: 'left'
            }
        }

        return styleObj;
    }

    render() {

        var baseStyle = Object.assign(this.state.style.base, this.props.style);

        return (
            <section className="TwoColumnLayout" style={baseStyle}>
                <div style={this.state.style.left}   key="column1">{this.props.columnOne}</div>
                <div style={this.state.style.right}  key="column2">{this.props.columnTwo}</div>
            </section>
        )
    }
}