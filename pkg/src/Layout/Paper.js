"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Paper extends StripesTheme {

    static defaultProps = {
        style: {},
        depth: 1,
        type: 'default',
        onBlur: () => { return false; }
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled
        }
        this.focus = this.focus.bind(this);
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    focus() {
        this.refs.Paper.focus();
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            outline: 'none',
            background: 'white',
            borderRadius: '2px',
            display: 'inline-block',
            padding: spacing.padding*2 + 'px',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            boxShadow: "0 " + ((this.props.depth * 3.5) - 1) + "px " + this.props.depth * 10 + "px rgba(0,0,0,0." + this.props.depth + "), 0 " + this.props.depth * 3 + "px 10px rgba(0,0,0,0.1)"
        }
        return Object.assign(styleObj, this.props.style);
    }

    render() {
        return (
            <section {...this.getDataSet(this.props)} style={this.state.style} tabIndex="1" ref="Paper" onBlur={this.props.onBlur}>
                {this.props.children}
            </section>
        )
    }
}