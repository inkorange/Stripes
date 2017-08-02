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
    }

    getStyles() {
        var styleObj = {
            base: {
                height: this.props.height,
                overflow: 'auto',
                width: '100%'
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
            <table style={this.state.style.table} {...this.getDataSet(this.props)}>
                <tbody ref="tableBody">
                {this.props.columnMap ? this.extendChildren(this.props.children, { columnMap: this.props.columnMap }) : this.props.children}
                </tbody>
            </table>
            </div>
        )
    }
}