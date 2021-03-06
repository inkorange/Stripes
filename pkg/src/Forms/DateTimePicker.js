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
        timeFormat: 'hh:mm a',
        format: 'M/D/YYYY',
        baseDateTime: new Date(),
        placeholder: ['Date','Time'],
        clockFormat: '12hr',
        value: null,
        manual: false,
        dateErrorMsg: 'Invalid Date Format (M/D/YYYY)',
        timeErrorMsg: 'Invalid Time Format (h:mm A)'
    };

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            value: this.props.value ? new Date(this.props.value) : null,
        };
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
        this.setState({
            value: mergeDates(date, this.state.value, this.props.baseDateTime)
        }, this.fireCallback);
    }

    setTime(time) {
        this.setState({
            value: addTimeToDate(this.state.value, time, this.props.baseDateTime)
        }, this.fireCallback);
    }

    fireCallback() {
        if(this.props.onChange) {
            this.props.onChange({
                [this.props.id]: this.state.value
            });
        }
    }

    render() {
        let spacing = this.getSpacing()[this.props.type];
        return (
            <div style={this.props.style} {...this.getDataSet(this.props)} className={this.props.className}>
                <TwoColumnLayout
                    columnOne={
                        <DatePicker
                            {...this.getDataSet(this.props, ' DatePicker')}
                            ref="datePicker"
                            baseDateTime={this.props.baseDateTime}
                            placeholder={this.props.placeholder[0]}
                            onSet={this.setDate}
                            active={this.props.active}
                            date={m(new Date(this.state.value)).isSame('1900-01-01', 'year') ? null : this.state.value}
                            manual={this.props.manual}
                            format={this.props.format}
                            dateConstraint={this.props.dateConstraint}
                            errorMessage={this.props.dateErrorMsg}
                            style={{marginRight: 0}}
                            textboxStyle={{marginRight: 0, width: '100%'}}
                        />}
                    columnTwo={
                        <TimePicker
                            {...this.getDataSet(this.props, ' TimePicker')}
                            ref="timePicker"
                            baseDateTime={this.props.baseDateTime}
                            placeholder={this.props.placeholder[1]}
                            onSet={this.setTime}
                            active={this.props.active}
                            time={this.state.value}
                            manual={this.props.manual}
                            clockFormat={this.props.clockFormat}
                            format={this.props.timeFormat}
                            hourFormat={this.props.clockFormat === '12hr' ? 'h' : 'HH'}
                            errorMessage={this.props.timeErrorMsg ? this.props.timeErrorMsg : (this.props.clockFormat === '12hr' ? 'Invalid Time Format (hh:mm)' : 'Invalid Time Format (HH:mm)')}
                            textboxStyle={{marginRight: 0, width: '100%'}}
                        />}
                    gutter={spacing.margin}
                    columnOneWidth={this.props.datewidth}
                    columnTwoWidth={this.props.timewidth}
                    />
            </div>
        )
    }
}