"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'
import { Icon } from '../../Symbols/Icon'

export class SortDirection extends StripesTheme {

    static defaultProps = {
        sortdirection: 'asc',
        width: 10,
        type: 'default'
    };

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
        const spacing = this.getSpacing()[this.props.type];
        return {
            base: {
                position: 'absolute',
                left: spacing.padding + 'px',
                top: spacing.padding + 'px',
                bottom: spacing.padding + 'px',
                width: this.props.width + 'px'
            }
        };
    }

    render() {
        let color = this.getColors()[this.props.type];
        return (
            <div style={this.state.style.base}>
                <Icon key="asc"  size={this.props.width + 'px'} color={color.textColor}  iconid={this.props.sortdirection === "asc" ? "up" : "down"} />
            </div>
        )
    }
}
