"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class MenuItem extends StripesTheme {

    static defaultProps = {
        hover: false,
        style: {},
        type: 'default',
        title: '',
        icon: null,
        onClick: () => { return false; }
    }

    constructor(props) {
        super(props);
        var component = this.getStyles();
        this.state = {
            style: {},
            inkStyle: Object.assign(component.ink, {background: '#dbdbdb'})
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
        var base = {
            margin: spacing.margin + "px " + spacing.margin*2 + "px",
            height: '48px',
            lineHeight: '48px',
            cursor: 'pointer',
            transition: '.5s color',
            clear: 'both',
            position: 'relative',
            overflow: 'hidden',
            userSelect: 'none'
        };
        var styleObj = {
            base: {
                color: color.idleColor
            },
            hover: {
                color: color.activeIcon
            },
            icon: {
                float: 'left',
                cursor: 'pointer',
                padding: spacing.padding + "px",
                marginRight: spacing.margin*2 + "px",
                marginTop: '2px'
            },
            iconIdleColor:  color.idleColor,
            iconHoverColor: color.activeIcon,
            ink: this.getBaseStyling(spacing, color).animation.ink
        };

        styleObj.base = Object.assign(styleObj.base, base);
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        styleObj.hover = Object.assign(styleObj.hover, base);

        return styleObj;
    }

    render() {
        return (
            <div
                 style={this.state.hover ? this.state.style.hover : this.state.style.base}
                 onClick={this.props.onClick}
                 onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                 onMouseDown={this.animateBackground}
                 {...this.getDataSet(this.props)}
            >
                <span className='ink' style={this.state.inkStyle}></span>
                {this.props.icon ?
                    <Icon
                        basestyle={this.state.style.icon}
                        iconid={this.props.icon}
                        size="medium"
                        type="primary"
                        color={this.state.hover ? this.state.style.iconHoverColor : this.state.style.iconIdleColor}
                    />
                : null}
                {this.props.title}

            </div>
        )
    }
}