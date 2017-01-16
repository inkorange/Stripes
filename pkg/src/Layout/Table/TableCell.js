"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableCell extends StripesTheme {

    static defaultProps = {
        style: {},
        width: null,
        type: 'table',
        onClick: null,
        columnMap: null
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
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        if(this.props.columnMap.length) {
            var width = this.props.columnMap[this.props.index].width;
            Object.assign(styleObj.base, {width: width});
        }
        if(this.props.width) {
            Object.assign(styleObj.base, {width: this.props.width});
        }
        return styleObj;
    }

    render() {
        return (
            <td onClick={this.onClick} className={this.props.columnMap.length ? this.props.columnMap[this.props.index].name : null} style={this.state.style.base}>
                {this.props.children}
            </td>
        )
    }
}