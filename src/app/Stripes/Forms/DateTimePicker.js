import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

// models
const Global = require('../../models/Global');
const Store = require('../../models/Store');
import { flattenDate, addTimeToDate, mergeDates } from '../../helpers/DataHelpers';
import m from 'moment'

// layouts
const style = require('../../themes/GlobalStyles');

// elements
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('./TimePicker');
const Icon = require('../Icon/Icon');

const DateTimePicker = React.createClass({
    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            value: ''
        }
    },

    getDefaultProps: function () {
        return {
            changeFn: null
        }
    },

    componentDidMount: function() {
        this._setDateTime(this.props.value);
    },

    _setDateTime: function(date) {
        //console.log(this.props.id, date);
        this.setState({
            value: date ? new Date(date) : ""
        });
    },

    _updateTime: function(e, time) {
        //console.log('in date picker time: ', time);
        this.setState({
            value: addTimeToDate(this.state.value, time)
        }, this._fireCallback);
    },

    _updateDate: function(e, date) {
        //console.log('updating: ', date);
        this.setState({
            value: mergeDates(date, this.state.value)
        }, this._fireCallback);
    },

    _fireCallback: function() {
        this.props.changeFn({
            [this.props.id]: this.state.value
        });
    },

    setDateTime: function(date) {
        this._setDateTime(date);
    },

    render() {
        var DateValue = new Date(this.state.value);
        return (
            <section className="DateTimePicker" style={{position: 'relative', overflow: 'hidden'}}>
                <Icon
                    iconid="clock"
                    color={this.state.value ? style.default.activeColor : style.default.iconColor}
                    size="small"
                    basestyle={{
                        position: 'absolute',
                        left: 'calc(100% - 25px)',
                        top: '12px'
                    }}
                />
                <Icon
                    iconid="calendar"
                    color={this.state.value ? style.default.activeColor : style.default.iconColor}
                    size="small"
                    basestyle={{
                        position: 'absolute',
                        left: 'calc(60% - 30px)',
                        top: '12px'
                    }}
                />
                <DatePicker
                    textFieldStyle={{width : '100%'}}
                    hintText={this.props.label}
                    ref={this.props.id + '-date'}
                    onChange={this._updateDate}
                    value={m(new Date(this.state.value)).isSame('1900-01-01', 'year') ? null : this.state.value}
                    autoOk={true}
                    className="DatePicker"
                    mode={window.breakpoint.height <= 575 ? "landscape" : "portrait"}
                    style={
                        {width: '60%', float:'left', cursor: 'pointer'}
                    }
                />
                <TimePicker
                    format="ampm"
                    hintText="Time"
                    ref={this.props.id + '-time'}
                    defaultTime={this.props.value && m(new Date(this.props.value)).format('hh:mm a') !== "12:00 am" ? new Date(this.props.value) : null}
                    value={this.state.value && m(new Date(this.state.value)).format('hh:mm a') !== "12:00 am" ? DateValue : ""}
                    onChange={this._updateTime}
                    dialogStyle={{background:'red'}}
                    textFieldStyle={
                        {marginLeft: '2%', width: '38%', float:'left', cursor: 'pointer'}
                    }
                />
            </section>
        )
    }

});

module.exports = DateTimePicker;
