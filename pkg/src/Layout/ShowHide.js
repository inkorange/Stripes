"use strict";

import React from 'react'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'

export class ShowHide extends StripesTheme {

    static defaultProps = {
        style: {},
        initialShow: false,
        label: '',
        type: 'default',
        disabled: false,
        labelStyle: {},
        contentStyle: {},
        maxOverflow: '100vh',
        icons: ["minus","add"],
        onClick: () => { return false; }
    };

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: {},
            show: this.props.initialShow
        };
        this.onClick = this.onClick.bind(this);
        this.changeShow = this.changeShow.bind(this);
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    onClick() {
        this.props.onClick();
    }

    changeShow() {
        this.setState({
            show: !this.state.show
        }, () => {
            this.setState({
                style: this.getStyles()
            });
            this.props.onClick();
        });
    }

    getStyles() {
        const spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            base: {
                outline: 'none'
            },
            content: {
                overflow: 'hidden',
                maxHeight: this.state.show ? this.props.maxOverflow : '0',
                transition: 'all .5s'
            },
            icon: {
                float: 'right'
            },
            toggler: {
                cursor: 'pointer',
                display: 'block',
                userSelect: 'none',
                padding: spacing.padding*3 + 'px'
            }
        };
        styleObj.toggler = Object.assign(styleObj.toggler, this.props.labelStyle);
        styleObj.content = Object.assign(styleObj.content, this.props.contentStyle);
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <section {...this.getDataSet(this.props)} style={this.state.style.base} tabIndex="1">
                <label onClick={this.changeShow} style={this.state.style.toggler}>
                    {this.props.label}
                    <Icon
                        iconid={this.state.show ? this.props.icons[0] : this.props.icons[1]}
                        size="small"
                        basestyle={this.state.style.icon}
                    />
                </label>
                <div ref="ShowHideContent" style={this.state.style.content}>
                    {this.props.children}
                </div>
            </section>
        )
    }
}