"use strict"

import React from 'react'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'
import { A } from  '../Layout/Typography'
import m from 'moment'

export class Calendar extends StripesTheme {

    static defaultProps = {
        style: {},
        date: new Date(),
        type: 'default',
        onClick: null,
        dateConstraint: [null,null]
    };

    constructor(props) {
        super(props);
        this.modifyDate = this.modifyDate.bind(this);
        this.selectDate = this.selectDate.bind(this);
        this.switchToDate = this.switchToDate.bind(this);
        this.getDate = this.getDate.bind(this);
        this.state = {
            style: this.getStyles(),
            hover: false
        }
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles(),
                date: this.props.date
            });
        }
    }

    modifyDate(move, type) {
        this.setState({
            date: m(this.state.date).add(move, type)
        });
    }

    selectDate(e) {
        e.preventDefault();
        let date = new Date(e.target.getAttribute('data-date'));
        if(date) {
            this.props.onClick(date);
        }
        return false;
    }

    switchToDate(date) {
        this.setState({
            date: date
        });
    }

    getDate() {
        return this.state.date;
    }

    getStyles() {
        const color = this.getColors()[this.props.type];
        const spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            base: {
                borderRadius: spacing.borderRadius + 'px',
                userSelect: 'none'
            },
            label: {
                fontSize: '1.8rem',
                margin: spacing.padding*2 + 'px' + ' 0',
                lineHeight: spacing.padding*4 + 'px',
                display: 'block',
                color: color.textColor
            },
            months: {
                display: 'flex'
            },
            montharrowbase: {
                display: 'inline-block',
                cursor: 'pointer',
                flexGrow: 1,
                width: '30px',
                textAlign: 'center',
                padding: spacing.padding + 'px',
            },
            montharrow: {
                width: spacing.padding + 'px'
            },
            monthtitle: {
                fontSize: spacing.baseFontSize-.2 + 'rem',
                fontWeight: 600,
                width: '80%',
                textAlign: 'center',
                lineHeight: spacing.padding*4+2 + 'px',
                color: color.idleColor
            },
            days: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            dayitem: {
                alignItems: 'center',
                flexFlow: 'column wrap',
                alignContent: 'stretch',
                textAlign: 'center',
                width: 100/7 + '%',
                //height: '100%',
                fontSize: spacing.baseFontSize-.2 + 'rem',
                padding: spacing.padding * 2 + 'px ' + spacing.padding * 1.5 + 'px',
                cursor: 'pointer',
                color: 'black'
            }

        };
        styleObj.dayHeader = Object.assign({opacity: '.5'}, styleObj.dayitem);
        styleObj.dayitemhover = Object.assign({
            backgroundColor: color.backgroundHover
        }, styleObj.dayitem);
        styleObj.dayitemUnavailable = Object.assign({
            opacity: '.33'
        }, styleObj.dayitem);
        styleObj.dayitemSelected = Object.assign({
            borderRadius: '100%',
            backgroundColor: color.headerBackgroundColor
        }, styleObj.dayitem);
        styleObj.dayitemSelected.color = 'white';
        return styleObj;
    }

    render() {
        let month = m(this.state.date).format("MMMM YYYY");
        let calOnFirstDay = m(this.state.date).date(1);
        let calOnLastDay = m(this.state.date).date(m(calOnFirstDay).daysInMonth());
        let firstday = m(calOnFirstDay).isoWeekday() - 1;
        //console.log('first day: ', m(calOnFirstDay).isoWeekday());

        let daysOfWeek = [];
        let days = [];
        daysOfWeek.push([
            <span key="day1" style={this.state.style.dayHeader}>S</span>,
            <span key="day2" style={this.state.style.dayHeader}>M</span>,
            <span key="day3" style={this.state.style.dayHeader}>T</span>,
            <span key="day4" style={this.state.style.dayHeader}>W</span>,
            <span key="day5" style={this.state.style.dayHeader}>T</span>,
            <span key="day6" style={this.state.style.dayHeader}>F</span>,
            <span key="day7" style={this.state.style.dayHeader}>S</span>
        ]);
        if(firstday == 6) {
            firstday = -1;
        }
        let firstConstraint = this.props.dateConstraint[0] ? m(this.props.dateConstraint[0]) : m('2000-01-01');
        let secondConstraint = this.props.dateConstraint[1] ? m(this.props.dateConstraint[1]) : m('2100-01-01');
        for (let i = firstday*-1; i <= m(calOnFirstDay).daysInMonth(); i++) {
            let day = i > 0 ? i : '';
            let thisDate = m(calOnFirstDay).date(i);
            let isSelectedDate = thisDate.format("L") === m(this.props.date).format("L");
            let isAvailable = thisDate.isBetween(firstConstraint, secondConstraint, 'day');
            days.push(
                <A
                    key={"date" + i}
                    style={isSelectedDate && day ? this.state.style.dayitemSelected : isAvailable ? this.state.style.dayitem : this.state.style.dayitemUnavailable}
                    data-date={thisDate.toDate().toString()}
                    onClick={ i > 0 && day ? this.selectDate : null}
                    data-date={thisDate.toDate().toString()}
                    disabled={!isAvailable || !day}
                >
                    {day}
                </A>
          );
        }

        let hasPreviousMonth = calOnFirstDay.isAfter(firstConstraint);
        let hasNextMonth = calOnLastDay.isBefore(secondConstraint);

        return (
            <section
                style={this.state.style.base}
                {...this.getDataSet(this.props)}
            >
                <div style={this.state.style.months}>
                    {hasPreviousMonth ? <Icon
                        key="ileft"
                        iconid="left"
                        style={this.state.style.montharrow}
                        basestyle={this.state.style.montharrowbase}
                        color="black"
                        onClick={() => { this.modifyDate(-1, 'months'); }}
                    /> : <div key="month" style={this.state.style.montharrowbase}/> }
                    <div style={this.state.style.monthtitle}>{month}</div>
                    {hasNextMonth ? <Icon
                        key="iright"
                        iconid="right"
                        color="black"
                        style={this.state.style.montharrow}
                        basestyle={this.state.style.montharrowbase}
                        onClick={() => { this.modifyDate(1, 'months'); }}
                    /> : <div style={this.state.style.montharrowbase}/> }
                </div>
                <div style={this.state.style.days}>
                    {daysOfWeek}
                </div>
                <div style={this.state.style.days}>
                    {days}
                </div>
            </section>
        )
    }
}