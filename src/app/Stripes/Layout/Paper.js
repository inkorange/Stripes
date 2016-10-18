"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Paper extends StripesTheme {

    static defaultProps = {
        style: {},
        depth: 1,
        className: '',
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
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            background: 'white',
            borderRadius: '2px',
            display: 'inline-block',
            padding: spacing.padding*2 + 'px',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            boxShadow: "0 " + ((this.props.depth * 3.5) - 1) + "px " + this.props.depth * 10 + "px rgba(0,0,0,0." + this.props.depth + "), 0 " + this.props.depth * 3 + "px 10px rgba(0,0,0,0.1)"
        }

        return styleObj;
    }

    render() {
        var baseStyle = Object.assign(this.state.style, this.props.style);
        return (
            <section style={baseStyle} className={"Paper " + this.props.className}>
                {this.props.children}
            </section>
        )
    }
}