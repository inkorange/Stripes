"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'
import { SortDirection } from './SortDirection'

export class TableHeaderCell extends StripesTheme {

    static defaultProps = {
        style: {},
        wrap: false,
        width: null,
        type: 'table',
        onClick: null,
        isSortable: false,
        sortdirection: 'asc',
        columnMap: null
    }

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            style: {}
        }
    }

    componentWillMount() {
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
                cursor: this.props.onClick || this.props.isSortable ? 'pointer' : 'default',
                position: 'relative',
                maxWidth: '0',
                whiteSpace: !this.props.wrap ? 'nowrap' : null,
                overflow: 'hidden',
                textOverflow: !this.props.wrap ? 'ellipsis' : null,
                fontSize: spacing.fontSize
            },
            sort: {
                style: {
                    float: 'right'
                },
                width: spacing.sortWidth
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        if(this.props.columnMap) {
            var width = this.props.columnMap[this.props.index].width;
            Object.assign(styleObj.base, {width: width});
        }
        if(this.props.width) {
            Object.assign(styleObj.base, {width: this.props.width});
        }
        return styleObj;
    }

    render() {
        var sortNODE = this.props.isSortable ? (
            <SortDirection
                style={this.state.style.sort.style}
                width={this.state.style.sort.width}
                sortdirection={this.props.sortdirection}
            />
        ) : null;
        return (
            <td onClick={this.onClick} className={this.props.columnMap ? this.props.columnMap[this.props.index].name : null} style={this.state.style.base}>
                {sortNODE}
                {this.props.children}
            </td>
        )
    }
}