"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'

export class Tooltip extends StripesTheme {

    static defaultProps = {
        show: false,
        duration: 500,
        target: null,
        width: 'auto',
        iconid: null,
        position: 'right',
        type: 'notification'
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: this.getStyles()
        }
    }

    componentDidMount() {
        this.setState({
            target: this.refs.Tooltip.parentNode
        });
        //console.log(this.props.target.getBoundingClientRect());
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var ComponentStyle = {
            transition: 'all .5s .5s',
            position: 'absolute',
            zIndex: spacing.zIndex,
            backgroundColor: color.tooltipBackgroundColor,
            paddingRight: spacing.padding + 'px',
            border: 'solid 1px ' + color.borderColor,
            borderRadius: '2px',
            overflow: 'hidden',
            color: 'black',
            maxWidth: '400px',
            fontSize: spacing.baseFontSize,
            width: this.props.width
        };

        var right = this.props.position === 'right' ? 0 : null;
        var left = this.props.position === 'left' ? 0 : null;
        var styleObj = {
            base: Object.assign({
                    paddingLeft: this.props.iconid ? spacing.padding * 4 + 'px' : spacing.padding + 'px',
                    opacity: this.props.show ? 1 : 0,
                    maxHeight: this.props.show ? '100px' : '0px',
                    paddingTop: this.props.show ? spacing.padding + 'px' : 0,
                    paddingBottom: this.props.show ? spacing.padding + 'px' : 0,
                    right: right,
                    left: left
                }
                , ComponentStyle),
            baseIcon: {
                transition: 'top .5s .5s',
                position: 'absolute',
                left: spacing.padding + 'px',
                top: this.props.show ? spacing.padding + 'px' : 0
            },
            icon: {
                width: spacing.padding*2 + 'px',
                height: spacing.padding*2 + 'px'
            }
        };

        return styleObj;
    }

    render() {
        return (
            <div ref="Tooltip" style={this.state.style.base}>
                {this.props.iconid ? (
                    <Icon style={this.state.style.icon} basestyle={this.state.style.baseIcon} iconid={this.props.iconid} size="medium"/>
                ): null}
                {this.props.children}
            </div>
        )
    }
}