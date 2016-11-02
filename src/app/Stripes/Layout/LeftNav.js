"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class LeftNav extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'default',
        onBlur: () => { return false; },
        open: false
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            open: props.open,
            style: {}
        }
        this.focus = this.focus.bind(this);
        this.toggleOnBlur = this.toggleOnBlur.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    toggleMenu(e,open) {
        this.setState({
            open: open !== undefined ? open : !this.state.open
        }, () => {
            if(this.state.open) {
                this.refs.LeftNav.focus();
            }
            this.setState({
                style: this.getStyles()
            });
        })
    }

    toggleOnBlur(e) {
        setTimeout(() => {
            var target = document.activeElement;
            var isNested = this.refs.LeftNav.contains( target );
            if(!isNested) {
                this.toggleMenu(null, false);
                this.props.onBlur();
            }
        }, 1);
    }

    focus() {
        this.refs.Paper.focus();
    }

    close() {
        this.toggleMenu(null, false);
    }

    open() {
        this.toggleMenu(null, true);
    }

    toggle() {
        this.toggleMenu();
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            icon: {
                cursor: 'pointer'
            },
            menu: {
                width: '250px',
                background: 'white',
                position: 'fixed',
                left: this.state.open ? '0px' : '-260px',
                top: 0,
                bottom: 0,
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                outline: 'none',
                zIndex: spacing.menuZIndex,
                boxShadow: this.state.open ? '0 0 20px rgba(0,0,0,.5)' : '0 0 0 rgba(0,0,0,0)'
            }
        };
        styleObj.menu = Object.assign(styleObj.menu, this.props.style);

        return styleObj;
    }

    render() {
        return (
            <div>
                <Icon
                    basestyle={this.state.style.icon}
                    iconid="menu"
                    size="large"
                    type="primary"
                    onClick={this.toggleMenu}
                />
                <section style={this.state.style.menu} tabIndex="1" ref="LeftNav" onBlur={this.toggleOnBlur}>
                    {this.props.children}
                </section>
            </div>
        )
    }
}