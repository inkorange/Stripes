"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableBody extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        height: null
    }

    constructor(props) {
        super(props);
        console.log(props);
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
                height: this.props.height,
                overflow: 'auto'
                /*
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0 */
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
            <div style={this.state.style.base}>
            <table style={this.state.style.table}>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
            </div>
        )
    }
}