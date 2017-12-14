"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Dialog, Paper } from '../Layouts'
import {TextBox} from  './Inputs'
import {Calendar} from  '../Elements/Calendar'
import {YearSelector} from  '../Elements/YearSelector'
import { Icon } from  '../Symbols/Icon'
import m from 'moment'
import {FlatButton, RaisedButton} from './Buttons'

export class DatePicker extends StripesTheme {

    static defaultProps = {
        style: {},
        width: '100%',
        depth: 1,
        className: '',
        type: 'default',
        disabled: false,
        onSet: () => { return false; },
        visible: true,
        dateConstraint: [null,null], //['2013-11-05','2016-12-25'],
        yearFormat: 'YYYY',
        dateFormat: 'ddd, MMMM D',
        format: 'M/D/YYYY',
        baseDateTime: new Date(),
        placeholder: null,
        date: null,
        manual: false,
        errorMessage: 'Invalid Date Format (M/D/YYYY)',
        errorTimeout: 2000
    }

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderCleanDate = this.renderCleanDate.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setYear = this.setYear.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.showYearPanel = this.showYearPanel.bind(this);
        this.updateStyles = this.updateStyles.bind(this);
        this.getValue = this.getValue.bind(this);
        this.pressManualDate = this.pressManualDate.bind(this);
        this.setManualDate = this.setManualDate.bind(this);
        this.inputBlur = this.inputBlur.bind(this);

        let initialDate = props.date ? props.date : null;

        this.state = {
            active: false,
            date: initialDate,
            showCalendar: true,
            showYear: false
        }
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentWillUpdate(props) {
        if(props.date !== this.props.date) {
            this.setState({
                date: props.date
            });
            this.updateStyles();
            this.refs.textbox.applyValue(props.date ? m(props.date).format(this.props.format) : "", true);
        }
    }

    toggleDialog(open) {
        let show = open !== undefined ? open : !this.state.active;
        this.setState({
            active: show
        }, () => {
            this.showCalendar();
            if(open) {
                this.refs.Dialog.open();
            } else {
                this.refs.Dialog.close();
            }
        });
    }

    showCalendar() {
        this.setState({
            showCalendar: true,
            showYear: false
        }, () => {
            this.refs.Calendar.switchToDate(this.state.date ? this.state.date : this.props.baseDateTime);
            this.updateStyles();
        });
    }

    showYearPanel() {
        this.setState({
            showCalendar: false,
            showYear: true
        }, this.updateStyles);
    }

    updateStyles() {
        this.setState({
            style: this.getStyles()
        });
    }

    renderCleanDate() {
        let dateval = this.state.date ? this.state.date : this.props.baseDateTime;
        let year = <div key="yeartitle" onClick={this.showYearPanel} style={this.state.style.year}>{m(dateval).format(this.props.yearFormat)}</div>;
        let date = <div key="datetitle" onClick={this.showCalendar}  style={this.state.style.date}>{m(dateval).format(this.props.dateFormat)}</div>;
        return [year,date];
    }

    getValue() {
        return this.state.date
    }

    inputBlur() {
        this.refs.textbox.blur();
    }

    setDate(date) {
        this.setState({
            date: date,
            inputError: null
        });
        this.refs.Dialog.close();
        this.refs.textbox.applyValue(m(date).format(this.props.format), true);
        this.props.onSet(date);
    }

    setYear(year) {
        let mDate = m(this.state.date ? this.state.date : this.props.baseDateTime);
        mDate.year(year);
        this.setState({
            date: new Date(mDate.toString()),
            showCalendar: true,
            showYear: false
        }, this.updateStyles);
    }

    pressManualDate(e) {
        if(e.keyCode === 13) {
            this.refs.textbox.blur();
        }
    }

    setManualDate() {
        let dateValue = isNaN(this.refs.textbox.getValue()*1) ? this.refs.textbox.getValue() : this.refs.textbox.getValue()*1;
        let slashCount = dateValue.toString().indexOf("/") > 0 ? (dateValue.match(/\//g) || []).length : 0;
        dateValue = slashCount === 1 ? dateValue + '/' + (new Date().getFullYear()): dateValue;
        let datesMatch = m(new Date(dateValue)).format(this.props.format) === m(this.state.date).format(this.props.format);
        let isValid = m(new Date(dateValue)).isValid();
        let strippedSlashes = !isNaN(dateValue) ? dateValue :
                              dateValue && isNaN(dateValue) ? dateValue.replace(/\//g, '') : "";
        let throwTimedError = (message) => {
            this.setState({
                inputError: message ? message : this.props.errorMessage
            });
            setTimeout(() => {
                this.refs.textbox.applyValue(this.state.date ? m(this.state.date).format(this.props.format) : '', true);
                this.setState({
                    inputError: null
                });
            }, this.props.errorTimeout);
        };

        if (datesMatch) {
            if(!isValid || (dateValue && (strippedSlashes.length === 0 || isNaN(strippedSlashes)))) {
                throwTimedError();
            }
            return false;
        }

        if(dateValue) {
            let val = this.refs.textbox.getValue();
            val = val.replace(/\s/g, '');
            // this allows the user to enter a millisecond date
            if (isValid && !isNaN(dateValue) && (dateValue.toString().length >= 12 && dateValue.toString().length < 14)) { // this is a valid milisecond time
                this.setState({
                    date: new Date(dateValue),
                    inputError: null
                }, () => {
                    this.props.onSet(this.state.date);
                });
            // otherwise if it has no slashes or it's invalid we throw an error
            } else if (val.indexOf('/') < 0 || !isValid) {
                throwTimedError();
            } else if(isValid && this.props.dateConstraint[0] && m(new Date(dateValue)).isBefore(m(this.props.dateConstraint[0]))) {
                throwTimedError("Date must be after " + this.props.dateConstraint[0]);
            } else if(isValid && this.props.dateConstraint[1] && m(new Date(dateValue)).isAfter(m(this.props.dateConstraint[1]))) {
                throwTimedError("Date must be before " + this.props.dateConstraint[1]);
            } else { // finally, its a standard 1/1/1 input, so we create the date the old fashioned way
                val = slashCount === 1 ? val + '/' + (new Date().getFullYear()): val;
                let m_date = m(new Date(val));
                let matches = (val.match(/\//g) || []);
                let validParts = val.split('/').length && (val.split('/')[0] && val.split('/')[1] && val.split('/')[2]) ? true : false;
                if(matches.length === 1 || val.substring(val.length-1) === '/' || val.substring(0,1) === '/' || !validParts) {
                    m_date.year(m().year());
                }
                this.setState({
                    date: m_date.toDate(),
                    inputError: null
                }, () => {
                    this.props.onSet(this.state.date);
                });
            }
        } else {
            if(!isValid && (this.refs.textbox.getValue() || strippedSlashes.length === 0)) {
                throwTimedError();
            } else {
                this.setState({
                    date: null,
                    inputError: null
                }, () => {
                    this.refs.textbox.applyValue("", true);
                    this.props.onSet(this.state.date);
                });
            }
        }
        return false;
    }


    getStyles() {
        let color = this.getColors()[this.props.type];
        let spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            container: {
                display: 'inline-block',
                //margin: spacing.margin*2 + 'px 0',
                width: this.props.width,
                lineHeight: '1em'
            },
            /*
            base: {
                border: 'none',
                margin: spacing.padding*2 + 'px' + ' 0',
                padding: 0,
                position: 'relative',
                display: this.props.visible ? 'block' : 'none',
                opacity: this.props.disabled ? '.25' : '1.0'
            },*/
            year: {
                fontSize: spacing.baseFontSize * 1.5 + 'rem',
                marginBottom: spacing.margin*4 + 'px',
                opacity: this.state.showYear ? '1.0' : '.5',
                cursor: 'pointer'
            },
            date: {
                fontSize: spacing.baseFontSize * 2 + 'rem',
                opacity: this.state.showCalendar ? '1.0' : '.5',
                cursor: 'pointer'
            },
            label: {
                fontSize: '1.8rem',
                margin: spacing.padding*2 + 'px' + ' 0',
                lineHeight: spacing.padding*4 + 'px',
                display: 'block',
                color: color.textColor
            },
            dialog: {
                maxWidth: '350px',
                minWidth: '300px'
            },
            dialogcard: {
                minHeight: '470px'
            }
        }

        styleObj.container = Object.assign(styleObj.container, this.props.style);

        return styleObj;
    }

    render() {
        let color = this.getColors()[this.props.type];
        let cleanDate = this.renderCleanDate();
        return (
            <div style={this.state.style.container} {...this.getDataSet(this.props)}>
                <TextBox
                    ref="textbox"
                    value={this.state.date ? m(this.state.date).format(this.props.format) : ""}
                    width="100%"
                    anchor={<Icon iconid="calendar" onClick={this.props.manual ? this.toggleDialog : null} basestyle={{marginTop:'-5px'}} color={this.state.date ? color.activeIcon : color.inactiveIcon} size="small" />}
                    onClick={this.props.manual ? null : this.toggleDialog}
                    onKeyUp={this.props.manual ? this.pressManualDate : null}
                    onBlur={this.props.manual ? this.setManualDate : null}
                    readOnly={this.props.manual ? null : true}
                    placeholder={this.props.placeholder}
                    error={this.state.inputError}
                />
                <Dialog ref="Dialog"
                    {...this.getDataSet(this.props, '-dialog')}
                    modal={true}
                    title={cleanDate}
                    showClose={true}
                    onClose={this.inputBlur}
                    dialogStyle={this.state.style.dialog}
                    cardStyle={this.state.style.dialogcard}
                >
                    {this.state.showYear ? <YearSelector
                        ref="YearSelector"
                        onClick={this.setYear}
                        date={this.state.date ? this.state.date : this.props.baseDateTime}
                        dateConstraint={this.props.dateConstraint}
                    /> : null }
                    {this.state.showCalendar ? <Calendar
                        ref="Calendar"
                        onClick={this.setDate}
                        date={this.state.date ? this.state.date : this.props.baseDateTime}
                        dateConstraint={this.props.dateConstraint}
                    /> : null }
                </Dialog>
            </div>
        )
    }
}