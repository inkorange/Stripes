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
        placeholder: null,
        date: null
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

        var initialDate = props.date ? props.date : null;

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
        }
    }

    toggleDialog(open) {
        var show = open !== undefined ? open : !this.state.active;
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
            this.refs.Calendar.switchToDate(this.state.date ? this.state.date : new Date());
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
        var dateval = this.state.date ? this.state.date : new Date();
        var year = <div key="yeartitle" onClick={this.showYearPanel} style={this.state.style.year}>{m(dateval).format(this.props.yearFormat)}</div>;
        var date = <div key="datetitle" onClick={this.showCalendar}  style={this.state.style.date}>{m(dateval).format(this.props.dateFormat)}</div>;
        return [year,date];
    }

    getValue() {
        return this.state.date
    }

    setDate(date) {
        this.setState({
            date: date
        });
        this.refs.Dialog.close();
        this.refs.textbox.applyValue(m(date).format(this.props.format));
        this.props.onSet(date);
    }

    setYear(year) {
        var mDate = m(this.state.date ? this.state.date : new Date());
        mDate.year(year);
        this.setState({
            date: new Date(mDate.toString()),
            showCalendar: true,
            showYear: false
        }, this.updateStyles);
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            container: {
                display: 'inline-block',
                margin: spacing.margin*2 + 'px 0',
                width: this.props.width
            },
            base: {
                border: 'none',
                margin: spacing.padding*2 + 'px' + ' 0',
                padding: 0,
                position: 'relative',
                display: this.props.visible ? 'block' : 'none',
                opacity: this.props.disabled ? '.25' : '1.0'
            },
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
        var color = this.getColors()[this.props.type];
        var cleanDate = this.renderCleanDate();
        return (
            <div style={this.state.style.container}>
                <TextBox
                    ref="textbox"
                    value={this.state.date ? m(this.state.date).format(this.props.format) : ""}
                    width="100%"
                    anchor={<Icon iconid="calendar" basestyle={{marginTop:'-5px'}} color={this.state.date ? color.activeIcon : color.inactiveIcon} size="small" />}
                    onClick={this.toggleDialog}
                    readOnly={true}
                    placeholder={this.props.placeholder}
                />
                <Dialog ref="Dialog"
                    modal={true}
                    title={cleanDate}
                    showClose={true}
                    dialogStyle={this.state.style.dialog}
                    cardStyle={this.state.style.dialogcard}
                >
                    {this.state.showYear ? <YearSelector
                        ref="YearSelector"
                        onClick={this.setYear}
                        date={this.state.date ? this.state.date : new Date()}
                        dateConstraint={this.props.dateConstraint}
                    /> : null }
                    {this.state.showCalendar ? <Calendar
                        ref="Calendar"
                        onClick={this.setDate}
                        date={this.state.date ? this.state.date : new Date()}
                        dateConstraint={this.props.dateConstraint}
                    /> : null }
                </Dialog>
            </div>
        )
    }
}