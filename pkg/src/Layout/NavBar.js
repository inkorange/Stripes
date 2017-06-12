"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class NavBar extends StripesTheme {

    static defaultProps = {
        style: {},          // Object: style override for this instance
        type: 'navbar',     // String: reference to style category reference
        title: null,        // String: Left-side title text string displayed within the navbar
        leftIcon: null,     // React Component: Icon to be shown on the left, usually with an action attached to it, but can be static
        fixed: false,        // Boolean: Will fix the navbar to the top of the page
        className: null     // Adds a class name to the root.
    }

    constructor(props) {
        super(props);
        this.state = {
            style: {}   // stateful style across this instance
        }
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
        if(this.props.fixed) {
            var parent = this.refs.NavBar.parentNode;
            parent.setAttribute("style", "padding-top: " + this.refs.NavBar.clientHeight + "px");
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            title: {
                padding: this.props.leftIcon ? '0 ' + spacing.padding + 'px' : 0
            },
            base: {
                backgroundColor: color.background,
                boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
                position: 'relative',
                zIndex: 2,
                width: '100%',
                display: 'flex',
                minHeight: spacing.minHeight + 'px',
                //lineHeight: spacing.minHeight + 'px',
                padding: '0 ' + spacing.padding + 'px',
                fontSize: spacing.fontSize
            },
            rightside: {
                position: 'absolute',
                color: color.textColor,
                right: spacing.padding + 'px',
                top: 0,
                lineHeight: spacing.minHeight + 'px'
            },
            span: {
                lineHeight: spacing.minHeight + 'px',
                color: color.textColor
            }
        };
        if(this.props.fixed) {
            styleObj.base.position = "fixed";
            styleObj.base.top = "0";
        }
        styleObj.base = Object.assign(styleObj.base, this.props.style);

        return styleObj;
    }

    render() {
        var Title = this.props.title ? (
            <span style={this.state.style.title}>{this.props.title}</span>
        ) : null;
        return (
            <section {...this.getDataSet(this.props)} ref="NavBar" className={this.props.className} style={this.state.style.base}>
                {this.props.leftIcon}
                <span style={this.state.style.span}>{Title}</span>
                <div style={this.state.style.rightside}>
                    {this.props.children}
                </div>
            </section>
        )
    }
}