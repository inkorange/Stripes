"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

class FlatButton extends StripesTheme {

    static defaultProps = {
        type: 'default',
        disabled: false,
        label: null,
        onClick: () => { return false; }
    }

    constructor(props) {
        super(props);
        var color = this.getColors()[props.type];
        var component = this.getStyles();
        this.state = {
            hover: false,
            disabled: props.disabled,
            style: Object.assign({
                backgroundColor: color.backgroundColor
            },component),
            hoverStyle: Object.assign({
                backgroundColor: color.backgroundHover
            },component)
        }
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var styleObj = {
            color: color.textColor,
            borderRadius: spacing.borderRadius + 'px',
            fontWeight: 500,
            fontSize: '1.4rem',
            border: 'none',
            verticalAlign: 'middle',
            letterSpacing: '0px',
            textTransform: 'uppercase',
            outline: 'none',
            padding: spacing.padding * 2 + 'px ' + spacing.padding * 4 + 'px',
            margin: spacing.padding + 'px ',
            transition: '.5s background-color',
            opacity: this.props.disabled ? .5 : 1.0,
            cursor: this.props.disabled ? 'default' : 'pointer'
        }
        return styleObj;
    }

    render() {
        return (
            <button
                className="FlatButton"
                style={this.state.hover ? this.state.hoverStyle : this.state.style}
                onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                onClick={this.handleClick}
                label={this.props.label}
            >
                {this.props.children}
            </button>
        )
    }

}

class RaisedButton extends StripesTheme {

    static defaultProps = {
        type: 'default',
        disabled: false,
        label: null,
        onClick: () => { return false; }
    }

    constructor(props) {
        super(props);
        var color = this.getColors()[props.type];
        var component = this.getStyles();
        this.state = {
            hover: false,
            disabled: props.disabled,
            style: Object.assign({
                backgroundColor: color.backgroundColor
            },component),
            hoverStyle: Object.assign({
                backgroundColor: color.backgroundHover
            },component)
        }
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var styleObj = {
            color: color.textColor,
            borderRadius: spacing.borderRadius + 'px',
            fontWeight: 500,
            fontSize: '1.4rem',
            border: 'none',
            verticalAlign: 'middle',
            letterSpacing: '0px',
            textTransform: 'uppercase',
            outline: 'none',
            padding: spacing.padding * 2 + 'px ' + spacing.padding * 4 + 'px',
            margin: spacing.padding + 'px ',
            transition: '.5s background-color',
            opacity: this.props.disabled ? .5 : 1.0,
            cursor: this.props.disabled ? 'default' : 'pointer',
            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
        }
        return styleObj;
    }

    render() {
        return (
            <button
                className="RaisedButton"
                style={this.state.hover ? this.state.hoverStyle : this.state.style}
                onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                onClick={this.handleClick}
                label={this.props.label}
            >
                {this.props.children}
            </button>
        )
    }

}

module.exports = {
    FlatButton: FlatButton,
    RaisedButton: RaisedButton
    //comp2: Component2
}