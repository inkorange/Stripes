"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

class H1 extends StripesTheme {

    static defaultProps = {
        type: 'default'
    }

    constructor(props) {
        super(props);
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors();
        var styleObj = {
            color: color.H1Color,
            fontWeight: 200,
            fontSize: '2.5rem',
            padding: '0px',
            margin: spacing.padding * 2 + 'px ' + '0px',
        }
        return styleObj;
    }

    render() {
        var style = this.getStyles();
        return (
            <h1
                className="FlatButton"
                style={style}
            >
                {this.props.children}
            </h1>
        )
    }
}

class H3 extends StripesTheme {

    static defaultProps = {
        type: 'default'
    }

    constructor(props) {
        super(props);
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors();
        var styleObj = {
            color: color.H3Color,
            fontWeight: 200,
            fontSize: '2.1rem',
            padding: '0px',
            margin: spacing.padding * 2 + 'px ' + '0px',
        }
        return styleObj;
    }

    render() {
        var style = this.getStyles();
        return (
            <h3
                className="FlatButton"
                style={style}
            >
                {this.props.children}
            </h3>
        )
    }
}

module.exports = {
    H1: H1,
    H3: H3
    //comp2: Component2
}