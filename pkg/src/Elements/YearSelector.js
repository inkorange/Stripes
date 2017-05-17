"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'
import { A } from  '../Layout/Typography'
import {SelectPanel} from '../Forms/SelectPanel.js'
import m from 'moment'

export class YearSelector extends StripesTheme {

    static defaultProps = {
        style: {},
        date: new Date(),
        type: 'default',
        onClick: null,
        dateConstraint: [null,null]
    }

    constructor(props) {
        super(props);
        this.selectYear = this.selectYear.bind(this);
        this.positionSelection = this.positionSelection.bind(this);
        this.state = {
            style: this.getStyles(),
            hover: false
        }
    }

    componentDidMount() {
        this.positionSelection();

    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles(),
                date: this.props.date
            },this.positionSelection);
        }
    }

    positionSelection() {
        if(!this.state.date) {
            return false;
        }
        var selected = this.refs.yearHolder.querySelectorAll('[data-year="'+m(this.state.date).format("YYYY")+'"]')[0];
        var fromtop = selected.offsetTop;
        var height = this.refs.yearHolder.clientHeight;
        this.refs.yearHolder.scrollTop = (fromtop - height/2 + selected.clientHeight/2);
    }

    selectYear(e) {
        var year = e.target.getAttribute('data-year')*1;
        if(year) {
            this.props.onClick(year);
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            yearcontainer: {
                margin: 0,
                padding: 0,
                overflow: 'auto',
                position: 'absolute',
                top: '130px',
                right: 0,
                left: 0,
                bottom: 0,
                lineHeight: '1em'
            },
            yearitem: {
                display: 'block',
                listStyle: 'none',
                textAlign: 'center',
                padding: spacing.padding*4 + 'px',
                fontSize: spacing.baseFontSize*1.5 + 'rem',
                cursor: 'pointer',
                color: color.idleColor
            }
        }

        styleObj.yearitemhover = Object.assign({
            color: 'blue'
        }, styleObj.yearitem);

        styleObj.yearitemselected = Object.assign({
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(0,0,0,.25)'
        }, styleObj.yearitem);
        styleObj.yearitemselected.color = color.headerBackgroundColor;

        return styleObj;
    }

    render() {
        var year = m(this.state.date).format("YYYY");
        var firstConstraint = this.props.dateConstraint[0] ? m(this.props.dateConstraint[0]) : m('2000-01-01');
        var secondConstraint = this.props.dateConstraint[1] ? m(this.props.dateConstraint[1]) : m('2100-01-01');
        var yearNode = [];
        var startYear = m().format("YYYY")*1 - 50;
        var endYear = year*1 + 50;
        for(var yr = startYear; yr <= endYear; yr++) {
            if(yr >= firstConstraint.format("YYYY")*1 && yr <= secondConstraint.format("YYYY")*1) {
                yearNode.push(<li
                    key={"year" + yr}
                    data-year={yr}
                    onClick={this.selectYear}
                    style={year == yr ? this.state.style.yearitemselected : this.state.style.yearitem}
                    onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                    >
                        {yr}
                    </li>);
            }
        }

        return (
            <ul {...this.getDataSet(this.props)} ref="yearHolder" style={this.state.style.yearcontainer}>
                {yearNode}
            </ul>
        )
    }
}