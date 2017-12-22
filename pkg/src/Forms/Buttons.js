"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'
class FlatButton extends StripesTheme {

    static defaultProps = {
        type: 'default',
        disabled: false,
        label: null,
        style: {},
        icon: null,
        iconColor: 'white',
        onClick: () => { return false; }
    };

    constructor(props) {
        super(props);
        let color = this.getColors()[props.type];
        let component = this.getStyles();
        this.state = {
            hover: false,
            disabled: props.disabled,
            style: Object.assign({
                backgroundColor: color.backgroundColor
            },component.button),
            hoverStyle: Object.assign({
                backgroundColor: color.backgroundHover
            },component.button),
            inkStyle: component.ink
        }
    }

    getStyles() {
        let spacing = this.getSpacing()[this.props.type];
        let color = this.getColors()[this.props.type];
        let styleObj = {
            button: {
                color: color.textColor,
                borderRadius: spacing.borderRadius + 'px',
                fontWeight: 400,
                fontSize: '1.4rem',
                border: 'none',
                verticalAlign: 'middle',
                letterSpacing: '0px',
                textTransform: 'uppercase',
                outline: 'none',
                padding: this.props.icon
                    ? '0px ' + spacing.padding + 'px 0px ' + spacing.padding*4 + 'px'
                    : '0px ' + spacing.padding + 'px',
                margin: spacing.padding + 'px ',
                transition: '.5s background-color',
                opacity: this.props.disabled ? .5 : 1.0,
                cursor: this.props.disabled ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                lineHeight: spacing.padding * 4 + 'px',
                minWidth: spacing.padding * 8 + 'px',
                basePadding: spacing.padding

            },
            ink: this.getBaseStyling(spacing, color).animation.ink,
            iconColor: color.activeIcon
        };
        styleObj.button = Object.assign(styleObj.button, this.props.style);
        return styleObj;
    }

    render() {
        let iconNode = null;
        if(this.props.icon) {
            iconNode = (
                <Icon
                    iconid={this.props.icon}
                    size="small"
                    basestyle={{position: 'absolute', left: this.state.style.basePadding + 'px', top: (this.state.style.basePadding/2) + 'px'}}
                    color={this.props.iconColor ? this.props.iconColor : this.state.style.iconColor}
                />);
        }
        return (
            <button
                {...this.getDataSet(this.props)}
                className="FlatButton"
                style={this.state.hover ? this.state.hoverStyle : this.state.style}
                onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                onMouseDown={this.animateBackground}
                onClick={this.handleClick}
                label={this.props.label}
                tabIndex="0"
            >
                {iconNode}
                {this.props.children}
                <span className='ink' style={this.state.inkStyle}></span>
            </button>
        )
    }

}

class RaisedButton extends StripesTheme {

    static defaultProps = {
        type: 'default',
        disabled: false,
        label: null,
        style: {},
        icon: null,
        iconColor: 'white',
        onClick: () => { return false; }
    }

    constructor(props) {
        super(props);
        let color = this.getColors()[props.type];
        let component = this.getStyles();
        this.state = {
            hover: false,
            disabled: props.disabled,
            style: Object.assign({
                backgroundColor: color.backgroundColor
            },component.button),
            hoverStyle: Object.assign({
                backgroundColor: color.backgroundHover
            },component.button),
            inkStyle: component.ink
        }
    }

    getStyles() {
        let spacing = this.getSpacing()[this.props.type];
        let color = this.getColors()[this.props.type];
        let styleObj = {
            button: {
                color: color.textColor,
                borderRadius: spacing.borderRadius + 'px',
                fontWeight: 400,
                fontSize: '1.4rem',
                border: 'none',
                verticalAlign: 'middle',
                letterSpacing: '0px',
                textTransform: 'uppercase',
                outline: 'none',
                padding: this.props.icon
                    ? '0px ' + spacing.padding + 'px 0px ' + spacing.padding*4 + 'px'
                    : '0px ' + spacing.padding + 'px',
                margin: spacing.padding + 'px ',
                transition: '.5s background-color',
                opacity: this.props.disabled ? .5 : 1.0,
                cursor: this.props.disabled ? 'default' : 'pointer',
                boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
                position: 'relative',
                overflow: 'hidden',
                lineHeight: spacing.padding * 4 + 'px',
                minWidth: spacing.padding * 8 + 'px',
                basePadding: spacing.padding
            },
            ink: this.getBaseStyling(spacing, color).animation.ink,
            iconColor: color.activeIcon
        };
        styleObj.button = Object.assign(styleObj.button, this.props.style);
        return styleObj;
    }

    render() {
        var iconNode = null;
        if(this.props.icon) {
            iconNode = (
                <Icon
                    iconid={this.props.icon}
                    size="small"
                    basestyle={{position: 'absolute', left: this.state.style.basePadding + 'px', top: (this.state.style.basePadding/2) + 'px'}}
                    color={this.props.iconColor ? this.props.iconColor : this.state.style.iconColor}
                />);
        }
        return (
            <button
                {...this.getDataSet(this.props)}
                className="RaisedButton"
                style={this.state.hover ? this.state.hoverStyle : this.state.style}
                onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                onMouseDown={this.animateBackground}
                onClick={this.handleClick}
                label={this.props.label}
            >
                {iconNode}
                {this.props.children}
                <span className='ink' style={this.state.inkStyle}></span>
            </button>
        )
    }

}

module.exports = {
    FlatButton: FlatButton,
    RaisedButton: RaisedButton
}