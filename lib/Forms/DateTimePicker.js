"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { DatePicker } from  '../Forms/DatePicker'
import { TimePicker } from  '../Forms/TimePicker'
import m from 'moment'

export class DateTimePicker extends StripesTheme {

    static defaultProps = {
        style: {},
        datewidth: '150px',
        timewidth: '150px',
        type: 'default',
        disabled: false,
        visible: true,
        dateConstraint: [null,null], //['2013-11-05','2016-12-25'],
        yearFormat: 'YYYY',
        dateFormat: 'ddd, MMMM D',
        format: 'M/D/YYYY',
        placeholder: [null,null]
    }

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            datetime: null, //new Date(),
        }
    }

    componentWillMount() {
    }

    componentDidUpdate(props) {
    }

    getValue() {
        return this.state.datetime
    }

    setDate(date) {
        console.log("date is set: ", date);
    }

    setTime(time) {
        console.log("time is set: ", time);
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            container: {
                display: 'inline-block',
                margin: spacing.margin*2 + 'px'
            }
        }
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        return styleObj;
    }

    render() {
        var style = this.getStyles();
        return (
            <div style={style}>
                <DatePicker
                    width={this.props.datewidth}
                    placeholder={this.props.placeholder[0]}
                    onSet={this.setDate}
                    active={this.props.active}
                />
                <TimePicker
                    width={this.props.timewidth}
                    placeholder={this.props.placeholder[1]}
                    onSet={this.setTime}
                    active={this.props.active}
                />
            </div>
        )
    }
}