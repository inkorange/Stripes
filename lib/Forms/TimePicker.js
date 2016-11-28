"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Dialog, Paper } from '../Layouts'
import {TextBox} from  './Inputs'
import { Icon } from  '../Symbols/Icon'
import m from 'moment'

const rads = 2*Math.PI;

export class TimePicker extends StripesTheme {

    static defaultProps = {
        style: {},
        width: '200px',
        type: 'default',
        format: 'h:mm A',
        disabled: false,
        clockFormat: '12hr',
        hours12: [12,1,2,3,4,5,6,7,8,9,10,11],
        hours24: [24,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        selectorDimension: 300
    }

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderCleanTime = this.renderCleanTime.bind(this);
        this.state = {
            active: false,
            time: new Date()
        }
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.updateStyles();
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


    renderCleanTime() {
        return <div key="timetitle" style={this.state.style.time}>{m(this.state.time).format(this.props.format)}</div>;
    }

    updateStyles() {
        this.setState({
            style: this.getStyles()
        });
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            container: {
                display: 'inline-block',
                margin: spacing.margin*2 + 'px'
            },
            base: {
                border: 'none',
                margin: spacing.padding*2 + 'px' + ' 0',
                padding: 0,
                position: 'relative',
                display: this.props.visible ? 'block' : 'none',
                opacity: this.props.disabled ? '.25' : '1.0'
            },
            time: {
                fontSize: spacing.baseFontSize * 2 + 'rem',
            },
            label: {
                fontSize: '1.8rem',
                margin: spacing.padding*2 + 'px' + ' 0',
                lineHeight: spacing.padding*4 + 'px',
                display: 'block',
                color: color.textColor
            },
            dialog: {
                width: '325px'
            },
            dialogcard: {
                minHeight: '470px'
            },
            hourContainer: {
                position: 'relative',
                width: this.props.selectorDimension + 'px',
                height: this.props.selectorDimension + 'px'
            }
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);

        return styleObj;
    }

    render() {
        var displayTime = m(this.state.time).format(this.props.format);
        var cleanTime = this.renderCleanTime();
        var hourNodes = [];
        var minNodes = [];
        var hourList = this.props[this.props.clockFormat === '12hr' ? 'hours12' : 'hours24'];
        var angleSpace = rads/hourList.length;
        //hourList.map((hr,i) => {
        var i = 0;
        for (var c = 0; c < rads; c+=angleSpace) {
            var hrstyle = {
                top: this.props.selectorDimension*Math.cos(c),
                left: this.props.selectorDimension*Math.sin(c)
            };
            hourNodes.push(<span data-hr={hourList[i]} style={hrstyle}>{hourList[i]}</span>);
            console.log(i);
            i++;
        };

        var hourContainer = (
            <div style={this.state.style.hourContainer}>
                {hourNodes}
            </div>
        );

        return (
            <div style={this.state.style.container}>
                <TextBox
                    ref="textbox"
                    value={displayTime}
                    width={this.props.width}
                    anchor={<Icon iconid="clock" basestyle={{marginTop:'-5px'}} size="small" />}
                    onClick={this.toggleDialog}
                    readOnly={true}
                />
                <Dialog ref="Dialog"
                        modal={true}
                        title={cleanTime}
                        showClose={true}
                        dialogStyle={this.state.style.dialog}
                        cardStyle={this.state.style.dialogcard}
                >
                    {hourContainer}
                </Dialog>
            </div>
        )
    }
}