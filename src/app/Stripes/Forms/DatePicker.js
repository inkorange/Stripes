"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Dialog, Paper } from '../Layouts'
import {TextBox} from  '../Forms/Inputs'
import {Calendar} from  '../Elements/Calendar'
import { Icon } from  '../Symbols/Icon'
import m from 'moment'
import {FlatButton, RaisedButton} from '../Forms/Buttons'

export class DatePicker extends StripesTheme {

    static defaultProps = {
        style: {},
        depth: 1,
        className: '',
        type: 'default',
        disabled: false,
        visible: true,
        yearFormat: 'YYYY',
        dateFormat: 'ddd, MMMM D',
        format: 'M/D/YYYY'
    }

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderCleanDate = this.renderCleanDate.bind(this);
        this.setDate = this.setDate.bind(this);
        this.state = {
            active: false,
            date: new Date(),
            showDate: true,
            showYear: false
        }
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    toggleDialog(open) {
        var show = open !== undefined ? open : !this.state.active;
        this.setState({
            active: show
        }, () => {
            if(open) {
                this.refs.Dialog.open();
            } else {
                this.refs.Dialog.close();
            }
        });
    }

    renderCleanDate() {
        var year = <div key="yeartitle" style={this.state.style.year}>{m(this.state.date).format(this.props.yearFormat)}</div>;
        var date = <div key="datetitle" style={this.state.style.date}>{m(this.state.date).format(this.props.dateFormat)}</div>;
        return [year,date];
    }

    setDate(date) {
        this.setState({
            date: date
        });
        this.refs.Dialog.close();
        this.refs.textbox.applyValue(m(date).format(this.props.format));
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
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
                opacity: this.state.showDate ? '1.0' : '.5',
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
                //width: '50%',
                maxWidth: '350px',
                minWidth: '300px'
            }
        }

        return styleObj;
    }

    render() {
        var cleanDate = this.renderCleanDate();
        return (
            <div>
                <TextBox
                    ref="textbox"
                    value={m(this.state.date).format(this.props.format)}
                    width={"300px"}
                    anchor={<Icon iconid="calendar" basestyle={{marginTop:'-5px'}} size="small" />}
                    onClick={this.toggleDialog}
                />
                <Dialog ref="Dialog"
                    modal={true}
                    title={cleanDate}
                    showClose={true}
                    dialogStyle={this.state.style.dialog}
                >
                    <Calendar
                        onClick={this.setDate}
                        date={this.state.date}
                    />
                </Dialog>
            </div>
        )
    }
}