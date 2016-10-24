"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Fieldset extends StripesTheme {

    static defaultProps = {
        style: {},
        depth: 1,
        className: '',
        type: 'default',
        disabled: false,
        visible: true
    }

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles()
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            base: {
                border: 'none',
                margin: spacing.padding*2 + 'px' + ' 0',
                padding: 0,
                position: 'relative',
                display: this.props.visible ? 'block' : 'none',
                opacity: this.props.disabled ? '.25' : '1.0'
            },
            label: {
                fontSize: '1.8rem',
                margin: spacing.padding*2 + 'px' + ' 0',
                lineHeight: spacing.padding*4 + 'px',
                display: 'block',
                color: color.textColor
            }
        }

        return styleObj;
    }

    render() {
        var baseStyle = Object.assign(this.state.style.base, this.props.style);
        return (
            <fieldset
                style={baseStyle}
                disabled={this.props.disabled}
            >
                <label style={this.state.style.label}>{this.props.title}</label>
                {this.props.children}
            </fieldset>
        )
    }
}