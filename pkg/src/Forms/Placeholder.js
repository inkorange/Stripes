"use strict"

import React from 'react'
import { StripesTheme } from '../Core/Stripes'

export class Placeholder extends StripesTheme {

    static defaultProps = {
        style: {},
        active: false,
        hasValue: false,
        name: '',
        type: 'default'
    };

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles()
        };
        this.getStyles = this.getStyles.bind(this);
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    getStyles() {
        let color = this.getColors()[this.props.type];
        let spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            base: {
                position: 'absolute',
                top: this.props.hasValue ? spacing.padding*-2 + 'px' : spacing.padding + 'px',
                right: 0,
                left: 0,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: this.props.hasValue ? this.props.active ? color.activeIcon : color.placeholderColor : color.placeholderColor,
                cursor: this.props.hasValue ? "pointer" : "default",
                opacity: this.props.active && this.props.hasValue  ? 1 : .5,
                fontSize: this.props.hasValue ? '1.2rem' : spacing.baseFontSize + 'rem',
                transition: 'all .5s'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <label
                onClick={() => {return true;}}
                style={this.state.style.base}
            >
                {this.props.name}
            </label>
        )
    }
}