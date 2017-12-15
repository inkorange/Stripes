"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class Tag extends StripesTheme {

    static defaultProps = {
        type: 'default',
        style: {},
        disabled: false,
        onClick: null,
        onRemove: null,
        closeIconID: 'cancel',
        value: null
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: this.getStyles(),
            closed: false
        };
        this.onRemove = this.onRemove.bind(this);
        this.getStyles = this.getStyles.bind(this);
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentDidUpdate(props) {
        if(props.disabled !== this.props.disabled) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    onRemove(e) {
        this.props.onRemove(e, this.props.value);
        e.preventDefault();
        e.stopPropagation();
    }

    close() {
        this.setState({
            closed: true
        });
    }

    getStyles() {
        const color = this.getColors()[this.props.type];
        const spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            container: {
                outline: 'none',
                background: color.inactiveIcon,
                borderRadius: spacing.borderRadius + 'px',
                display: 'inline-block',
                padding: '0 ' + spacing.padding * 2 + 'px',
                margin: '0 ' + spacing.padding + 'px ' + spacing.padding + 'px 0',
                //height: spacing.padding*6 + 'px',
                lineHeight: spacing.padding*5 + 'px',
                position: 'relative',
                fontSize: '1.4rem',
                transition: 'transform .25s',
                overflow: 'hidden',
                opacity: this.props.disabled ? '.5' : '1',
                cursor: this.props.onClick ? 'pointer' : 'default'
            },
            tagtext: {
                paddingRight: this.props.onRemove ? spacing.padding*1.5 + 'px' : '0'
            },
            containerClose: {
                transform: 'scale(0,0)'
            },
            icon: {
                position: 'relative',
                top: '5px',
                right: '0px'
            }
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        styleObj.containerClose = Object.assign(styleObj.containerClose, styleObj.container);
        return styleObj;
    }

    render() {
        return (
            <div {...this.getDataSet(this.props)} style={this.state.closed ? this.state.style.containerClose : this.state.style.container} tabIndex="1" ref="Tag" onClick={this.props.onClick}>
                <span style={this.state.style.tagtext}>{this.props.children}</span>
                {this.props.onRemove ? <Icon style={this.state.style.icon} iconid={this.props.closeIconID} onClick={!this.props.disabled ? this.onRemove : null} size="small"/> : null}
            </div>
        )
    }
}