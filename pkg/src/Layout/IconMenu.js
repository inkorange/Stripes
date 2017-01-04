


"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class IconMenu extends StripesTheme {

    static defaultProps = {
        direction: "bottom",
        type: 'default',
        disabled: false,
        iconid: 'filter',
        style: {},
        "max-width": '100%'
    }

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.toggleMenuOnBlur = this.toggleMenuOnBlur.bind(this);
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    toggleMenu(e, show, focus) {
        this.setState({
            open: show === undefined ? !this.state.open : show
        }, () => {
            if(this.state.open) {
                this.refs.MenuBody.focus();
            }
            this.setState({
                style: this.getStyles()
            },this.forceUpdate);
        });
    }

    toggleMenuOnBlur(e) {
        return false;
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            base: {
                position: 'relative',
                display: 'inline'
            },
            icon: {
                transition: 'all .5s',
                cursor: 'pointer',
                padding: spacing.padding,
                background: this.state.open ? 'white' : 'transparent',
                boxShadow: this.state.open ? '0 0 5px rgb(200,200,200)' : '0 0 0 rgb(200,200,200)',
                zIndex: 1
            },
            menu: {
                position: 'absolute',
                top: this.props.direction !== 'top' ? '100%' : 'auto',
                bottom: this.props.direction === 'top' ? 'calc(100% + ' + spacing.padding*2 + 'px)' : 'auto',
                left: this.props.direction === 'left' ? 'auto' : 0,
                right: this.props.direction === 'left' ? 0 : 'auto',
                transition: 'all .5s',
                maxHeight: this.state.open ? '800px' : '0',
                opacity: this.state.open ? '1.0' : '0.0',
                maxWidth: this.props["max-width"],
                overflow: 'hidden',
                padding: 0,
                minWidth: '200px',
                outline: 'none',
                userSelect: 'none',
                MozUserSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                background: 'white',
                boxShadow: this.state.open ? '0 3px 5px rgb(200,200,200)' : '0 2px 0 rgb(200,200,200)',
                zIndex: 2
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <section
                style={this.state.style.base}
                disabled={this.props.disabled}
            >
                <Icon
                    iconid={this.props.iconid}
                    size="medium"
                    onClick={this.toggleMenu}
                    basestyle={this.state.style.icon}
                />
                <div style={this.state.style.menu}
                     tabIndex="0"
                     ref="MenuBody"
                     onBlur={this.toggleMenuOnBlur}
                >
                    {this.props.children}
                </div>
            </section>
        )
    }
}