"use strict"

import React from 'react'
import { render } from 'react-dom'
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
        icons: ["minus","add"],
        onClick: () => { return false; }
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: {},
            show: this.props.initialShow
        }
        this.onClick = this.onClick.bind(this);
        this.changeShow = this.changeShow.bind(this);
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentDidUpdate(props,state) {
        if(state.show !== this.state.show) {
            this.animateSlide(this.refs.ShowHideContent, this.state.show);
        }
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
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            base: {
                outline: 'none'
            },
            content: {
                display: this.state.show ? 'block' : 'none'
            },
            icon: {
                float: 'right'
            },
            toggler: {
                cursor: 'pointer',
                display: 'block',
                userSelect: 'none'
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