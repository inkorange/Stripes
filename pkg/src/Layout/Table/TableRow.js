"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableRow extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        onClick: null,
        hoverHighlight: true
    }

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = {
            style: {},
            hover: false
        }
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    onClick(e) {
        if(this.props.onClick) {
            this.props.onClick();
            e.preventDefault();
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type].row;
        var spacing = this.getSpacing()[this.props.type].row;
        var styleObj = {
            base: {
                borderBottom: '1px solid ' + color.border,
                cursor: this.props.onClick ? 'pointer' : 'default',
                transition: 'box-shadow .25s',
                minHeight: spacing.minHeight + 'px'
            }
        };
        styleObj.hover = Object.assign({boxShadow: '0 0 '+spacing.minHeight*2+'px 10px ' + color.hoverColor + " inset"}, styleObj.base);
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <tr
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                onClick={this.onClick}
                style={this.state.hover ? this.state.style.hover : this.state.style.base}
            >
                {this.props.children}
            </tr>
        )
    }
}