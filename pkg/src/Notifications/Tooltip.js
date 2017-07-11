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
        height: '100px',
        iconid: null,
        position: 'right',
        type: 'notification',
        style: {}
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

    componentDidUpdate(props) {
        if(props.show !== this.props.show) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var ComponentStyle = {
            transition: 'all .25s '+this.props.duration+'ms',
            position: 'absolute',
            zIndex: spacing.zIndex,
            backgroundColor: color.tooltipBackgroundColor,
            border: 'solid 1px ' + color.borderColor,
            borderRadius: '2px',
            overflowX: 'hidden',
            overflowY: 'auto',
            color: color.textColor,
            maxWidth: this.props.width,
            fontSize: spacing.baseFontSize + 'rem',
            width: this.props.width
        };

        var right = this.props.position === 'right' ? 0 : null;
        var left = this.props.position === 'left' ? 0 : null;
        var styleObj = {
            base: Object.assign({
                    paddingLeft: this.props.iconid ? spacing.padding * 12 + 'px' : spacing.padding*3 + 'px',
                    opacity: this.props.show ? 1 : 0,
                    maxHeight: this.props.show ? this.props.height : '0px',
                    paddingTop: this.props.show ? spacing.padding*3 + 'px' : 0,
                    paddingRight: this.props.show ? spacing.padding*3 + 'px' : 0,
                    paddingBottom: this.props.show ? spacing.padding*3 + 'px' : 0,
                    right: right,
                    left: left
                }
                , ComponentStyle),
            baseIcon: {
                transition: 'top .25s '+this.props.duration+'ms',
                position: 'absolute',
                left: spacing.padding*3 + 'px',
                top: this.props.show ? spacing.padding*3 + 'px' : 0
            },
            icon: {
                width: spacing.padding*2 + 'px',
                height: spacing.padding*2 + 'px'
            }
        };

        styleObj.base = Object.assign(styleObj.base, this.props.style);

        return styleObj;
    }

    render() {
        return (
            <div {...this.getDataSet(this.props)} ref="Tooltip" style={this.state.style.base}>
                {this.props.iconid ? (
                    <Icon basestyle={this.state.style.baseIcon} iconid={this.props.iconid} size="large"/>
                ): null}
                {this.props.children}
            </div>
        )
    }
}