"use strict";

import React from 'react'
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
        field: '',
        ignoreHover: false
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            style: {}
        }
    }
/*
    shouldComponentUpdate(props, state) {

        return (
            props.children !== this.props.children ||
            state.hover !== this.state.hover ||
            props.sortdirection !== this.props.sortdirection
        );

    }      */

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentDidUpdate(props, state) {
        this.updateStyling(props !== this.props || props.sortdirection !== this.props.sortdirection || this.state.hover !== state.hover);
    }

    onClick(e) {
        if(this.props.onClick) {
            this.props.onClick(this.props.field);
            e.preventDefault();
        }
    }

    getStyles() {
        const spacing = this.getSpacing()[this.props.type].cell;
        const color = this.getColors()[this.props.type].header;
        let highlightBorder = ', 0 -1px 0px ' + (this.props.sortdirection && this.props.isSortable ? color.highlight : color.border) + ' inset';
        let styleObj = {
            base: {
                boxShadow: (!this.props.ignoreHover && this.state.hover ? '0 -10px 40px -20px rgba(0,0,0,.25) inset' : '0 -1px 0px 0px rgba(0,0,0,0) inset') + highlightBorder,
                transition: 'all .5s',
                opacity: (!this.props.ignoreHover && this.state.hover) || (this.props.sortdirection && this.props.isSortable) ? '1' : '.75',
                padding: spacing.padding + 'px ' + spacing.padding*2 + 'px ' + spacing.padding + 'px ' + spacing.padding*3 + 'px',
                cursor: this.props.onClick || this.props.isSortable ? 'pointer' : 'default',
                position: 'relative',
                whiteSpace: !this.props.wrap ? 'nowrap' : null,
                overflow: 'hidden',
                textOverflow: !this.props.wrap ? 'ellipsis' : null,
                textTransform: 'uppercase',
                fontSize: spacing.fontSize,
                fontWeight: 400,
                //maxWidth: 0,
                minWidth: this.props.width,
                width: this.props.width,
                textAlign: 'left',
                lineHeight: spacing.lineHeight,
                color: color.textColor,
                userSelect: 'none',
                verticalAlign: 'top',
                backgroundColor: color.backgroundColor
            },
            container: {
                paddingRight: this.props.isSortable ? spacing.padding*3 + 'px ' : null
            },
            sort: {
                style: {
                    float: 'left'
                }
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        let sortNODE = this.props.sortdirection && this.props.isSortable ? (
            <SortDirection
                key="sort_direction"
                style={this.state.style.sort.style}
                sortdirection={this.props.sortdirection}
            />
        ) : null;
        return (
            <th onClick={this.onClick}
                {...this.getDataSet(this.props)}
                data-sort={this.props.sortdirection}
                data-sortkey={this.props.field}
                data-sortable={this.props.isSortable}
                className={this.props.className}
                onMouseOver={!this.props.isAction ? this.mouseOver : null} onMouseOut={this.mouseOut}
                style={this.state.style.base}>
                {sortNODE}
                {this.props.children}
            </th>
        )
    }
}