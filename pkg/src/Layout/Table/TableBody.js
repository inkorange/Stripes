"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class TableBody extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        height: 'auto',
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
            setTimeout(() => {
                this.stripeRows();
            },250);
        }
        if(this.props.height !== props.height) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    stripeRows() {
        const color = this.getColors()[this.props.type].row;
        const rows = this.refs.tableBody.getElementsByTagName("TR");
        for (let i = 0; i < rows.length; i = i + 2) {
            rows[i].style.backgroundColor = color.zebraStripe;
        }
    }

    getStyles() {
        let styleObj = {
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