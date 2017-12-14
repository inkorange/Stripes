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
        title: null,
        disabled: false,
        visible: true
    };

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles()
        }
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    getStyles() {
        const color = this.getColors()[this.props.type];
        const spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            base: {
                border: 'none',
                margin: '0 0 ' + spacing.margin*2 + 'px 0',
                padding: 0,
                display: this.props.visible ? 'block' : 'none',
                opacity: this.props.disabled ? '.25' : '1.0'
            },
            label: {
                fontSize: '1.8rem',
                marginBottom: spacing.margin + 'px',
                lineHeight: spacing.padding*2 + 'px',
                display: 'block',
                color: color.textColor
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <fieldset
                style={this.state.style.base}
                disabled={this.props.disabled}
                {...this.getDataSet(this.props)}
                className={this.props.className}
            >
                <label style={this.state.style.label}>{this.props.title}</label>
                {this.props.children}
            </fieldset>
        )
    }
}