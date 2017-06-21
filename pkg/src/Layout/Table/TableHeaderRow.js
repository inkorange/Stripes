"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableHeaderRow extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        columnMap: null
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

    getStyles() {
        var spacing = this.getSpacing()[this.props.type].row;
        var styleObj = {
            base: {
                boxShadow: '0 3px 0 rgba(0,0,0,.1)',
                height: spacing.minHeight + 'px'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <tr
                style={this.state.style.base}
            >
                {this.extendChildren(this.props.children, { columnMap: this.props.columnMap })}
            </tr>
        )
    }
}