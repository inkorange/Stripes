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
        sortdirection: null,
        className: null,
        field: ''
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

    componentDidUpdate(props, state) {
        this.updateStyling(props !== this.props || this.state.hover !== state.hover);
    }

    onClick(e) {
        if(this.props.onClick) {
            this.props.onClick(this.props.field);
            e.preventDefault();
        }
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type].cell;
        var color = this.getColors()[this.props.type].header;
        var highlightBorder = ', 0 -3px 0px ' + (this.props.sortdirection && this.props.isSortable ? color.highlight : color.border) + ' inset';
        var styleObj = {
            base: {
                boxShadow: (this.state.hover ? '0 -15px 50px -20px rgba(0,0,0,.25) inset' : '0 -5px 10px 0px rgba(0,0,0,0) inset') + highlightBorder,
                transition: '.5s box-shadow',
                padding: spacing.padding + 'px',
                cursor: this.props.onClick || this.props.isSortable ? 'pointer' : 'default',
                position: 'relative',
                whiteSpace: !this.props.wrap ? 'nowrap' : null,
                overflow: 'hidden',
                textOverflow: !this.props.wrap ? 'ellipsis' : null,
                textTransform: 'uppercase',
                fontSize: spacing.fontSize,
                fontWeight: 400,
                maxWidth: 0,
                minWidth: this.props.width,
                width: this.props.width,
                textAlign: 'left',
                lineHeight: spacing.lineHeight,
                color: color.textColor,
                userSelect: 'none',
                backgroundColor: color.backgroundColor
            },
            container: {
                paddingRight: this.props.isSortable ? spacing.padding*3 + 'px ' : null
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
        var sortNODE = this.props.sortdirection && this.props.isSortable ? (
            <SortDirection
                key="sort_direction"
                style={this.state.style.sort.style}
                width={this.state.style.sort.width}
                sortdirection={this.props.sortdirection}
            />
        ) : null;
        return (
            <th onClick={this.onClick}
                data-sortkey={this.props.field}
                data-sortable={this.props.isSortable}
                className={this.props.className}
                onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                style={this.state.style.base}>
                {sortNODE}
                {this.props.children}
            </th>
        )
    }
}