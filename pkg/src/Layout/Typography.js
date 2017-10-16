"use strict"

import React from 'react'
import { render } from 'react-dom'
import Stripes from '../Core/Stripes'

class Title extends Stripes.StripesTheme {

    static defaultProps = {
        type: 'typography',
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
            lineHeight: spacing.baseFontSize*2 + 'rem',
            padding: '0px',
            margin: spacing.margin * 2 + 'px ' + '0px'
        }
        return this.hardExtend(styleObj, this.props.style);
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

class A extends Stripes.StripesTheme {

    static defaultProps = {
        type: 'typography',
        style: {},
        href: "#",
        target: null,
        disabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
        this._clickAction = this._clickAction.bind(this);
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var styleObj = {
            base: {
                color: color.aColor,
                textDecoration: 'none',
                fontWeight: 200,
                cursor: this.props.disabled ? 'default' : 'pointer'
            },
            hover: {
                color: color.aHoverColor,
                textDecoration: 'none',
                fontWeight: 200
            }
        }
        styleObj.base = this.hardExtend(styleObj.base, this.props.style);
        styleObj.hover = this.hardExtend(styleObj.hover, this.props.style);
        return styleObj;
    }

    _clickAction(e) {
        if(!this.props.disabled) {
            this.props.onClick(e);
        }
        e.preventDefault();
        return false;
    }

    render() {
        var style = this.getStyles();
        var dataprops = {};
        Object.keys(this.props).map((k) => {
            if(k.indexOf('data-') >= 0) {
                dataprops[k] = this.props[k];
            }
        });
        return (
            <a
                style={!this.props.disabled && this.state.hover ? style.hover : style.base}
                href={this.props.href}
                target={this.props.target}
                {...dataprops}
                onClick={this._clickAction}
                onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
            >
                {this.props.children}
            </a>
        )
    }
}

class H1 extends Stripes.StripesTheme{

    static defaultProps = {
        type: 'typography',
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
            lineHeight: spacing.baseFontSize*2 + 'rem',
            padding: '0px',
            margin: spacing.margin * 1.5 + 'px ' + '0px'
        }

        return this.hardExtend(styleObj, this.props.style);
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

class H2 extends Stripes.StripesTheme {

    static defaultProps = {
        type: 'typography',
        style: {}
    }

    constructor(props) {
        super(props);
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var styleObj = {
            color: color.H2Color,
            fontWeight: 200,
            fontSize: spacing.baseFontSize*1.5 + 'rem',
            lineHeight: spacing.baseFontSize*1.75 + 'rem',
            padding: '0px',
            margin: spacing.margin * 1.25 + 'px ' + '0px'
        }
        return this.hardExtend(styleObj, this.props.style);
    }

    render() {
        var style = this.getStyles();
        return (
            <h2
                style={style}
            >
                {this.props.children}
            </h2>
        )
    }
}

class H3 extends Stripes.StripesTheme {

    static defaultProps = {
        type: 'typography',
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
            lineHeight: spacing.baseFontSize*1.5 + 'rem',
            padding: '0px',
            margin: spacing.padding + 'px ' + '0px'
        }
        return this.hardExtend(styleObj, this.props.style);
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
    H2: H2,
    Title: Title,
    A: A
    //comp2: Component2
}