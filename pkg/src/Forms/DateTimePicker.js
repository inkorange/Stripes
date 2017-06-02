"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { DatePicker } from  './DatePicker'
import { TwoColumnLayout } from  '../Layouts'
import { TimePicker } from  './TimePicker'
import { flattenDate, addTimeToDate, mergeDates } from './DateHelpers';
import m from 'moment'

export class DateTimePicker extends StripesTheme {

    static defaultProps = {
        style: {},
        datewidth: '60%',
        timewidth: '40%',
        type: 'default',
        disabled: false,
        visible: true,
        onChange: null,
        dateConstraint: [null,null], //['2013-11-05','2016-12-25'],
        yearFormat: 'YYYY',
        dateFormat: 'ddd, MMMM D',
        format: 'M/D/YYYY',
        placeholder: ['Date','Time'],
        value: null,
        manual: false
    }

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            value: this.props.value ? new Date(this.props.value) : null,
            style: this.getStyles()
        }

        this.fireCallback = this.fireCallback.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setTime = this.setTime.bind(this);
        this.setDateTime = this.setDateTime.bind(this);
    }

    getValue() {
        return this.state.value
    }

    setDateTime(datetime) {
        this.setState({
            value: datetime ? new Date(datetime) : null
        });
    }

    setDate(date) {
        console.log(date, this.state.value);
        this.setState({
            value: mergeDates(date, this.state.value)
        }, this.fireCallback);
    }

    setTime(time) {
        this.setState({
            value: addTimeToDate(this.state.value, time)
        }, this.fireCallback);
    }

    fireCallback() {
        if(this.props.onChange) {
            this.props.onChange({
                [this.props.id]: this.state.value
            });
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            container: {
                display: 'block',
                margin: spacing.margin*2 + 'px'
            }
        }
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <div style={this.state.style.container} {...this.getDataSet(this.props)} className={this.props.className}>
                <TwoColumnLayout
                    columnOne={
                        <DatePicker
                            {...this.getDataSet(this.props, '-DatePicker')}
                            ref="datePicker"
                            placeholder={this.props.placeholder[0]}
                            onSet={this.setDate}
                            active={this.props.active}
                            date={m(new Date(this.state.value)).isSame('1900-01-01', 'year') ? null : this.state.value}
                            manual={this.props.manual}
                        />}
                    columnTwo={
                        <TimePicker
                            {...this.getDataSet(this.props, '-TimePicker')}
                            ref="timePicker"
                            placeholder={this.props.placeholder[1]}
                            onSet={this.setTime}
                            active={this.props.active}
                            time={this.state.value}
                            manual={this.props.manual}
                        />}
                    gutter="5"
                    columnOneWidth={this.props.datewidth}
                    columnTwoWidth={this.props.timewidth}
                    />
            </div>
        )
    }
}