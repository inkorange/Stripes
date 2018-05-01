"use strict";

import React from 'react'
import { StripesTheme } from '../../Core/Stripes'

export class TableHeaderRow extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        columnMap: null
    };

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
        const spacing = this.getSpacing()[this.props.type].row;
        let styleObj = {
            base: {
                boxShadow: '0 5px 5px rgba(0,0,0,.05)',
                height: spacing.minHeight + 'px'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <tr style={this.state.style.base}>
                {this.extendChildren(this.props.children, { columnMap: this.props.columnMap })}
            </tr>
        )
    }
}