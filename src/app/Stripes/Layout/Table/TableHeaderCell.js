"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'
import { SortDirection } from './SortDirection'

export class TableHeaderCell extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        onClick: null,
        isSortable: false,
        sort_direction: null
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
                cursor: this.props.onClick ? 'pointer' : 'default'
            },
            sort: {
                style: {
                    float: 'right'
                },
                width: spacing.sortWidth
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        var sortNODE = this.props.isSortable ? (
            <SortDirection
                style={this.state.style.sort.style}
                width={this.state.style.sort.width}
                direction={this.props.sort_direction}
            />
        ) : null;

        return (
            <td onClick={this.onClick} style={this.state.style.base}>
                {sortNODE}
                {this.props.children}
            </td>
        )
    }
}