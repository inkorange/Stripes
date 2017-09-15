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
        iconSize: 'medium',
        iconColor: [null,null],                       // [closed, open]
        backgroundColor: ['transparent', 'white'],    // [closed, open]
        contentStyle: {},
        iconStyle: {},
        "max-width": null,
        onChange: null,
        constrainHeight: false,
        closeOnBlur: false
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            maxHeight: null
        };

        this.blurTime = new Date();

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

    componentDidUpdate(props) {
        if(this.props.disabled !== props.disabled || this.props.style !== props.style) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    toggleMenu(show) {
        var timeDelta = (new Date().getTime()) - this.blurTime.getTime();
        this.setState({
            open: (timeDelta > 0 && timeDelta < 200) ? false :
                show === undefined || typeof show === "object" ? !this.state.open : show
        }, () => {
            if (this.state.open) {
                this.refs.MenuBody.focus();
            }
            this.setState({
                maxHeight: this.props.constrainHeight ? window.innerHeight - this.refs.MenuBody.getBoundingClientRect().top - 10 : null
            }, () => {
                this.setState({
                    style: this.getStyles()
                }, this.forceUpdate);
            });
            if (this.props.onChange) {
                this.props.onChange(this.state.open);
            }
            this.blurTime = new Date();
        });

    }

    toggleMenuOnBlur(e) {
        e.preventDefault();
        e.stopPropagation();
        if(this.props.closeOnBlur) {
            setTimeout(() => {
                var target = document.activeElement;
                var isNested = this.refs.MenuBody.contains(target);
                if (!isNested) {
                    this.toggleMenu(false);
                }
            }, 150);
        }
    }

    isOpen() {
        return this.state.open;
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            base: {
                position: 'relative',
                display: 'inline',
                opacity: this.props.disabled ? '.5' : '1'
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
                    {...this.getDataSet(this.props, ' Icon')}
                    iconid={this.props.iconid}
                    color={this.state.open ? this.props.iconColor[1] : this.props.iconColor[0]}
                    size={this.props.iconSize}
                    onClick={!this.props.disabled ? this.toggleMenu : null}
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