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
                width: this.props.width + 'px'
            },
            asc : {
                display: 'inline-block',
                float: 'right',
                position: 'relative',
                top: spacing.padding + 'px'
            },
            desc: {
                display: 'inline-block',
                float: 'right',
                position: 'relative',
                transform: 'rotate(180deg)',
                top: -(this.props.width *4.5) + 'px'
            }
        }

        //styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        var color = this.getColors()[this.props.type];
        var asccolor = this.props.sortdirection === 'asc' ? color.activeIcon : color.inactiveIcon;
        var desccolor = this.props.sortdirection === 'desc' ? color.activeIcon : color.inactiveIcon;

        return (
            <div style={this.state.style.base}>
                <Icon key="asc"  basestyle={this.state.style.asc}  style={{width: this.props.width + 'px'}} color={asccolor}  iconid="up" />
                <Icon ley="desc" basestyle={this.state.style.desc} style={{width: this.props.width + 'px'}} color={desccolor} iconid="up" />
            </div>
        )
    }
}
