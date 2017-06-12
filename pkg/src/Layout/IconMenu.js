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
        iconColor: [null,null],                       // [closed, open]
        backgroundColor: ['transparent', 'white'],    // [closed, open]
        contentStyle: {},
        iconStyle: {},
        "max-width": null,
        onChange: null,
        constrainHeight: false
    }

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            maxHeight: null
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.toggleMenuOnBlur = this.toggleMenuOnBlur.bind(this);
        this.isOpen = this.isOpen.bind(this);
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    toggleMenu(show) {
        this.setState({
            open: show === undefined || typeof show === "object" ? !this.state.open : show
        }, () => {
            if(this.state.open) {
                this.refs.MenuBody.focus();
            }
            this.setState({
                maxHeight: this.props.constrainHeight ? window.innerHeight - this.refs.MenuBody.getBoundingClientRect().top - 10 : null
            }, () => {
                this.setState({
                    style: this.getStyles()
                },this.forceUpdate);
            });
            if(this.props.onChange) {
                this.props.onChange(this.state.open);
            }
        });
    }

    toggleMenuOnBlur(e) {
        return false;
    }

    isOpen() {
        return this.state.open;
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
                background: this.state.open ? this.props.backgroundColor[1] : this.props.backgroundColor[0],
                boxShadow: this.state.open ? '0 0 5px rgba(0,0,0,.5)' : '0 0 0 rgba(0,0,0,0)',
                zIndex: 1
            },
            content: {
                position: 'absolute',
                top: this.props.direction !== 'top' ? '100%' : null,
                bottom: this.props.direction === 'top' ? 'calc(100% + ' + spacing.padding*2 + 'px)' : null,
                left: this.props.direction === 'left' ? null : 0,
                right: this.props.direction === 'left' ? 0 : null,
                transition: 'all .5s',
                maxHeight: this.state.open ? this.state.maxHeight ? this.state.maxHeight : '800px' : '0',
                opacity: this.state.open ? '1.0' : '0.0',
                maxWidth: this.props["max-width"],
                overflow: this.props.constrainHeight ? 'auto' : 'hidden',
                padding: 0,
                minWidth: '200px',
                outline: 'none',
                userSelect: 'none',
                MozUserSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                background: 'white',
                boxShadow: this.state.open ? '0 3px 5px rgba(0,0,0,.5)' : '0 2px 0 rgba(0,0,0,0)',
                zIndex: 2,
                lineHeight: '1em'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        styleObj.content = Object.assign(styleObj.content, this.props.contentStyle);
        styleObj.icon = Object.assign(styleObj.icon, this.props.iconStyle);
        return styleObj;
    }

    render() {
        return (
            <section
                style={this.state.style.base}
                disabled={this.props.disabled}
                {...this.getDataSet(this.props)}
            >
                <Icon
                    iconid={this.props.iconid}
                    color={this.state.open ? this.props.iconColor[1] : this.props.iconColor[0]}
                    size="medium"
                    onClick={this.toggleMenu}
                    basestyle={this.state.style.icon}
                />
                <div style={this.state.style.content}
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