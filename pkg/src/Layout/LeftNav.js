"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class LeftNav extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'default',
        modal: false,
        color: 'black',
        icon: 'menu',
        iconstyle: {},
        closeOnBlur: true,
        className: null,
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
        this.isOpen = this.isOpen.bind(this);
        this.updateStyles = this.updateStyles.bind(this);
        this.toggleOnBlur = this.toggleOnBlur.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentWillUpdate(props) {
        if(props.open !== this.props.open) {
            this.toggleMenu(props.open);
        }
    }

    toggleMenu(open) {
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
        e.preventDefault();
        e.stopPropagation();
        if(this.props.closeOnBlur) {
            setTimeout(() => {
                var target = document.activeElement;
                var isNested = this.refs.LeftNav.contains(target);
                if (!isNested) {
                    this.toggleMenu(null, false);
                    this.props.onBlur();
                }
            }, 150);
        }
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

    isOpen() {
        return this.state.open;
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            modal: {
                position: 'fixed',
                //display: this.state.open ? 'block' : 'none',
                top: 0,
                right: this.state.open ? 0 : '100vw',
                left: 0,
                bottom: 0,
                opacity: this.state.open ? 1 : 0,
                transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                background: 'rgba(0,0,0,.5)',
                zIndex: spacing.menuZIndex
            },
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
                zIndex: spacing.menuZIndex + 1,
                boxShadow: this.state.open ? '0 0 20px rgba(0,0,0,.5)' : '0 0 0 rgba(0,0,0,0)'
            }
        };
        styleObj.menu = Object.assign(styleObj.menu, this.props.style);
        styleObj.icon = Object.assign(styleObj.icon, this.props.iconstyle);

        return styleObj;
    }

    updateStyles() {
        this.setState({
            style: this.getStyles()
        });
    }

    render() {
        var navNODE = (
            <section {...this.getDataSet(this.props)} className={this.props.className} style={this.state.style.menu} tabIndex="1" ref="LeftNav" key="navmenu" onBlur={this.toggleOnBlur}>
                {this.props.children}
            </section>
        );
        var renderedNODE = this.props.modal ? [
            (<div key="modalcontainer" style={this.state.style.modal} onClick={this.toggleOnBlur}></div>),
            navNODE
        ] : navNODE;
        return (
            <div>
                <Icon
                    {...this.getDataSet(this.props, '-MenuToggle')}
                    basestyle={this.state.style.icon}
                    iconid={this.props.icon}
                    size="medium"
                    type="primary"
                    color={this.props.color}
                    onClick={this.toggleMenu}
                />
                {renderedNODE}
            </div>
        )
    }
}