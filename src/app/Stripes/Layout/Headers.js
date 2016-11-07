"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

class Title extends StripesTheme {

    static defaultProps = {
        type: 'headers',
        style: {}
    }

    constructor(props) {
        super(props);
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var styleObj = {
            color: color.H1Color,
            fontWeight: 200,
            fontSize: spacing.baseFontSize*2 + 'rem',
            padding: '0px',
            margin: spacing.margin * 2 + 'px ' + '0px'
        }
        return Object.assign(styleObj, this.props.style);
    }

    render() {
        var style = this.getStyles();
        return (
            <header
                style={style}
            >
                {this.props.children}
            </header>
        )
    }
}

class H1 extends StripesTheme {

    static defaultProps = {
        type: 'headers',
        style: {}
    }

    constructor(props) {
        super(props);
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var styleObj = {
            color: color.H1Color,
            fontWeight: 200,
            fontSize: spacing.baseFontSize*1.75 + 'rem',
            padding: '0px',
            margin: spacing.margin * 1.5 + 'px ' + '0px',
        }

        return Object.assign(styleObj, this.props.style);
    }

    render() {
        var style = this.getStyles();
        return (
            <h1
                style={style}
            >
                {this.props.children}
            </h1>
        )
    }
}

class H3 extends StripesTheme {

    static defaultProps = {
        type: 'headers',
        style: {}
    }

    constructor(props) {
        super(props);
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var styleObj = {
            color: color.H3Color,
            fontWeight: 200,
            fontSize: spacing.baseFontSize*1.25 + 'rem',
            padding: '0px',
            margin: spacing.padding + 'px ' + '0px',
        }
        return Object.assign(styleObj, this.props.style);
    }

    render() {
        var style = this.getStyles();
        return (
            <h3
                style={style}
            >
                {this.props.children}
            </h3>
        )
    }
}

module.exports = {
    H1: H1,
    H3: H3,
    Title: Title
    //comp2: Component2
}