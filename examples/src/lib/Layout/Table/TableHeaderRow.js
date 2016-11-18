"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableHeaderRow extends StripesTheme {

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
        var styleObj = {
            base: {
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
                {this.props.children}
            </tr>
        )
    }
}