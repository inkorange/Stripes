"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class NavBar extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'navbar',
        title: null,
        leftIcon: null
    }

    constructor(props) {
        super(props);
        this.state = {
            style: {}
        }
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            title: {
                padding: '0 ' + spacing.padding + 'px'
            },
            base: {
                backgroundColor: color.background,
                boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                minHeight: spacing.minHeight + 'px',
                lineHeight: spacing.minHeight + 'px',
                padding: '0 ' + spacing.padding + 'px',
                color: color.textColor,
                fontSize: spacing.fontSize
            },
            rightside: {
                position: 'absolute',
                right: spacing.padding + 'px'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);

        return styleObj;
    }

    render() {
        var Title = this.props.title ? (
            <span style={this.state.style.title}>{this.props.title}</span>
        ) : null;
        return (
            <section style={this.state.style.base}>
                {this.props.leftIcon}
                {Title}
                <div style={this.state.style.rightside}>
                    {this.props.children}
                </div>
            </section>
        )
    }
}