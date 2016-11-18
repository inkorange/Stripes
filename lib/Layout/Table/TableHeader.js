"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableHeader extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table'
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
        var color = this.getColors()[this.props.type].header;
        var spacing = this.getSpacing()[this.props.type].header;
        var styleObj = {
            base: {
                minHeight: spacing.minHeight + 'px',
                lineHeight: spacing.minHeight + 'px',
                backgroundColor: color.backgroundColor,
                borderBottom: '2px solid ' + color.border
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
            <table style={this.state.style.table}>
                <thead style={this.state.style.base}>
                    {this.props.children}
                </thead>
            </table>
        )
    }
}