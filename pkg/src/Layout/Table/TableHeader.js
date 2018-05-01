"use strict";

import React from 'react'
import { StripesTheme } from '../../Core/Stripes'

export class TableHeader extends StripesTheme {

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
        const color = this.getColors()[this.props.type].header;
        const spacing = this.getSpacing()[this.props.type].header;
        let styleObj = {
            base: {
                minHeight: spacing.minHeight + 'px',
                lineHeight: spacing.minHeight + 'px',
                backgroundColor: color.backgroundColor,
                borderBottom: '1px solid ' + color.border
            },
            table: {
                width: '100%'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <table className="TableHeader" {...this.getDataSet(this.props)} style={this.state.style.table}>
                <thead style={this.state.style.base}>
                    {this.props.columnMap ? this.extendChildren(this.props.children, { columnMap: this.props.columnMap }) : this.props.children}
                </thead>
            </table>
        )
    }
}