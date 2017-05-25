"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableCell extends StripesTheme {

    static defaultProps = {
        style: {},
        wrap: false,
        width: null,
        type: 'table',
        onClick: null,
        className: null
    }

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            style: {}
        }
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentWillUpdate(props) {
        this.updateStyling(props !== this.props);
    }

    onClick(e) {
        if(this.props.onClick) {
            this.props.onClick();
            e.preventDefault();
        }
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type].cell;
        var styleObj = {
            base: {
                padding: spacing.padding + 'px',
                cursor: this.props.onClick ? 'pointer' : 'default',
                position: 'relative',
                maxWidth: '0',
                whiteSpace: !this.props.wrap ? 'nowrap' : null,
                overflow: 'hidden',
                textOverflow: !this.props.wrap ? 'ellipsis' : null,
                fontSize: spacing.fontSize
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        if(this.props.width) {
            Object.assign(styleObj.base, {width: this.props.width});
        }
        return styleObj;
    }

    render() {
        return (
            <td onClick={this.onClick} className={this.props.className} style={this.state.style.base}>
                {this.props.children}
            </td>
        )
    }
}