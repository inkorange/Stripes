"use strict"

import React from 'react'
import { StripesTheme } from '../../Core/Stripes'

export class TableBody extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        height: 'auto',
        zebraStripes: false,
        columnMap: null,
        disabled: false
    };

    constructor(props) {
        super(props);
        this.stripeRows = this.stripeRows.bind(this);
        this.state = {
            style: {}
        }
    }

    shouldComponentUpdate(props) {
        return (props.children && props.children !== this.props.children);
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
        if(this.props.height !== props.height || this.props.disabled !== props.disabled) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    stripeRows() {
        if(!this.refs.tableBody) {
            return false;
        }
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
                width: '100%',
                overflowX: 'auto'
            },
            table: {
                width: '100%'
            },
            disabled: {
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                background: 'rgba(255,255,255,.5)',
                overflow: 'hidden'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <div className="TableBody" style={this.state.style.base}>
                <table style={this.state.style.table} {...this.getDataSet(this.props)}>
                    <tbody ref="tableBody">
                    {this.props.columnMap ? this.extendChildren(this.props.children, { columnMap: this.props.columnMap }) : this.props.children}
                    {this.props.disabled ? <div style={this.state.style.disabled}></div> : null}
                    </tbody>
                </table>
            </div>
        )
    }
}