"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableBody extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        height: null,
        zebraStripes: false,
        columnMap: null
    }

    constructor(props) {
        super(props);
        this.stripeRows = this.stripeRows.bind(this);
        this.state = {
            style: {}
        }
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
        if(this.props.zebraStripes) {
            this.stripeRows();
        }
    }

    componentDidUpdate(props) {
        if(this.props.zebraStripes) {
            this.stripeRows();
        }
        if(this.props.height !== props.height) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    stripeRows() {
        var color = this.getColors()[this.props.type].row;
        var rows = this.refs.tableBody.getElementsByTagName("TR");

        for (var i = 0; i < rows.length; i = i + 2) {
            rows[i].style.backgroundColor = color.zebraStripe;
        }

        // color.zebraStripe
    }

    getStyles() {
        var color = this.getColors()[this.props.type].row;
        var spacing = this.getSpacing()[this.props.type].row;
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
                <tbody ref="tableBody">
                {this.props.columnMap ? this.extendChildren(this.props.children, { columnMap: this.props.columnMap }) : this.props.children}
                </tbody>
            </table>
            </div>
        )
    }
}