"use strict"

import React from 'react'
import { render } from 'react-dom'
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
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: {}
        }
    }

    componentDidMount() {
        var alertNODE = this.refs.Alert;
        this.setState({
            style: this.getStyles()
        });
        alertNODE.addEventListener("transitionend", () => {
            this.state.style.display = this.props.show ? 'inline-block' : 'none';
            if(alertNODE.style.opacity == 0) {
                alertNODE.style.display = 'none';
            }
        }, false);
    }

    componentDidUpdate(props) {
        if(this.props.show!=props.show) {
            this.setState({
                style: this.getStyles()
            }, () => {
                //console.log(props.show);
                //this.animateShow(this.refs.Alert, props.show);
            });

        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var alertNODE = this.refs.Alert;
        var parentNODE = alertNODE.parentNode;
        var styleObj = {
            transition: '1s opacity',
            height: (this.props.height + spacing.padding*2) + 'px',
            lineHeight: (this.props.height) + 'px',
            position: 'absolute',
            backgroundColor: color.backgroundColor,
            color: 'white',
            padding: spacing.padding + 'px ' + spacing.padding*2 + 'px',
            whiteSpace: 'nowrap',
            borderRadius: '4px',
            opacity: this.props.show ? 1 : 0,
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