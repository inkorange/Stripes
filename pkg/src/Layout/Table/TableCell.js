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
        className: null
    }

    constructor(props) {
        super(props);
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

    getStyles() {
        var spacing = this.getSpacing()[this.props.type].cell;
        var styleObj = {
            base: {
                padding: spacing.padding + 'px',
                cursor: this.props.onClick ? 'pointer' : 'default',
                position: 'relative',
                maxWidth: 0,
                width: this.props.width,
                minWidth: this.props.width,
                whiteSpace: !this.props.wrap ? 'nowrap' : null,
                overflow: 'hidden',
                textOverflow: !this.props.wrap ? 'ellipsis' : null,
                fontSize: spacing.fontSize
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <td className={this.props.className} style={this.state.style.base}>
                {this.props.children}
            </td>
        )
    }
}