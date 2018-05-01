"use strict";

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableCell extends StripesTheme {

    static defaultProps = {
        style: {},
        wrap: false,
        width: null,
        type: 'table',
        className: null,
        children: null
    };

    constructor(props) {
        super(props);
        this.state = {
            style: {}
        }
    }

    shouldComponentUpdate(props) {
        return props.children && (props.children !== this.props.children);
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
        const spacing = this.getSpacing()[this.props.type].cell;
        let styleObj = {
            base: {
                padding: spacing.padding + 'px ' + spacing.padding*2 + 'px ' + spacing.padding + 'px ' + spacing.padding*3 + 'px',
                //verticalAlign: 'top',
                cursor: this.props.onClick ? 'pointer' : 'default',
                position: 'relative',
                //maxWidth: 0,
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
            <td className={this.props.className} style={this.state.style.base} {...this.getDataSet(this.props)}>
                {this.props.children}
            </td>
        )
    }
}