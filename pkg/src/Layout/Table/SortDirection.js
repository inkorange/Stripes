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
            base: {
                position: 'absolute',
                right: spacing.padding + 'px',
                top: spacing.padding + 'px',
                bottom: spacing.padding + 'px',
                width: this.props.width + 'px'
            },
            asc : {
                position: 'absolute',
                top: spacing.padding/2 + 'px'
            },
            desc: {
                position: 'absolute',
                transform: 'rotate(180deg)',
                top: (spacing.padding/2 + (this.props.width*1.5)) + 'px'
            }
        }
        return styleObj;
    }

    render() {
        var color = this.getColors()[this.props.type];
        var asccolor = this.props.sortdirection === 'asc' ? color.activeIcon : color.inactiveIcon;
        var desccolor = this.props.sortdirection === 'desc' ? color.activeIcon : color.inactiveIcon;

        return (
            <div style={this.state.style.base}>
                <Icon key="asc"  basestyle={this.state.style.asc}  size={this.props.width + 'px'} color={asccolor}  iconid="up" />
                <Icon key="desc" basestyle={this.state.style.desc} size={this.props.width + 'px'} color={desccolor} iconid="up" />
            </div>
        )
    }
}
