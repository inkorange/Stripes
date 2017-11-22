"use strict"

import React from 'react'
import { StripesTheme } from '../Core/Stripes'

export class Alert extends StripesTheme {

    static defaultProps = {
        onClick: function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        },
        position: 'left',
        type: 'notification',
        height: 26,
        show: true
    };

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
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
        const color = this.getColors()[this.props.type];
        const spacing = this.getSpacing()[this.props.type];
        let alertNODE = this.refs.Alert;
        let parentNODE = alertNODE.parentNode;
        let styleObj = {
            opacity: this.props.show ? 1 : 0,
            visibility: this.props.show ? 'visible' : 'hidden',
            transition: 'visibility 0s linear 0.25s,opacity 0.25s linear',
            transitionDelay: '0s',
            height: (this.props.height + spacing.padding*2) + 'px',
            lineHeight: (this.props.height) + 'px',
            position: 'absolute',
            backgroundColor: color.backgroundColor,
            color: 'white',
            padding: spacing.padding + 'px ' + spacing.padding*2 + 'px',
            whiteSpace: 'nowrap',
            borderRadius: '4px',
            display: 'inline-block',
            right: this.props.position === 'left' ? (parentNODE.offsetWidth + 10) + 'px' : null,
            left: this.props.position === 'right' ? (parentNODE.offsetWidth + 10) + 'px' : null,
            top: 'calc(50% - ' + (this.props.height + spacing.padding*2)/2 + 'px)'
        };
        return styleObj;
    }

    render() {
        return (
            <div {...this.getDataSet(this.props)} ref="Alert" onClick={this.props.onClick} style={this.state.style}>
                {this.props.children}
            </div>
        )
    }
}