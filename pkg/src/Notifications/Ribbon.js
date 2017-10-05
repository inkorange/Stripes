"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class Ribbon extends StripesTheme {

    static defaultProps = {
        onClick: function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        },
        iconid: null,
        position: 'top',
        type: 'notification',
        show: true,
        height: '50px',
        style: {},
        contentStyle: {}
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

    componentDidUpdate(props) {
        if(this.props.show!=props.show) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            base: {
                transition: '1s all',
                position: 'fixed',
                backgroundColor: color.alertBackgroundColor,
                color: color.altTextColor,
                lineHeight: this.props.height,
                padding: '0px ' + spacing.padding*4 + 'px 0 ' + (spacing.padding*4+(this.props.iconid ? 40 : 0)) + 'px',
                right: 0,
                left: 0,
                top: this.props.position === 'top' ? (this.props.show ? 0 : '-100%') : 'auto',
                bottom: this.props.position === 'bottom' ? (this.props.show ? 0 : '-100%') : 'auto',
                fontStyle: 'italic',
                margin: "0 0 0 0",
                zIndex: spacing.zIndex
            },
            content: {
                fontSize: spacing.baseFontSize*1.25 + 'rem'
            },
            baseicon: {
                position:'absolute',
                top: '8px',
                left: spacing.padding*4 + 'px'
            },
            icon: {
                fill: color.altTextColor
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        styleObj.content = Object.assign(styleObj.content, this.props.contentStyle);
        return styleObj;
    }

    render() {
        return (
            <div {...this.getDataSet(this.props)} ref="Ribbon" onClick={this.props.onClick} style={this.state.style.base}>
                <div style={this.state.style.content}>{this.props.children}
                    {this.props.iconid ? <Icon size="30px" color="" style={this.state.style.icon} basestyle={this.state.style.baseicon} iconid={this.props.iconid} /> : null}
                </div>
            </div>
        )
    }
}