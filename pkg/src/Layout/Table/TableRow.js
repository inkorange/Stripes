"use strict";

import React from 'react'
import { StripesTheme } from '../../Core/Stripes'

export class TableRow extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        onClick: null,
        hoverHighlight: true,
        columnMap: null,
        className: ''
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = {
            style: {},
            hover: false
        }
    }

    shouldComponentUpdate(props, state) {
        return (props.children && props.children !== this.props.children || state.hover !== this.state.hover);
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    onClick(e) {
        this.props.onClick(e,this.props.model);
    }

    getStyles() {
        let color = this.getColors()[this.props.type].row;
        let spacing = this.getSpacing()[this.props.type].row;
        let styleObj = {
            base: {
                borderBottom: '1px solid ' + color.border,
                cursor: this.props.onClick ? 'pointer' : 'default',
                transition: 'box-shadow .25s',
                height: spacing.minHeight + 'px',
                backgroundColor: color.backgroundColor
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
                className={this.props.className}
            >
                {this.props.columnMap ? this.extendChildren(this.props.children, { columnMap: this.props.columnMap }) : this.props.children}
            </tr>
        )
    }
}