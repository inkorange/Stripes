"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Dialog, Paper } from '../Layouts'
import {TextBox} from  './Inputs'
import {FlatButton, RaisedButton} from '../Forms/Buttons'
import { Icon } from  '../Symbols/Icon'
import m from 'moment'

const rads = 2*Math.PI;

export class TimeNode extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'default',
        selected: false
    }

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }
    render() {
        var color = this.getColors()[this.props.type];
        var hourHoverStyle = {
            background: color.backgroundHover
        };
        var hourSelectedStyle = {
            background: color.activeIcon,
            color: 'white',
            cursor: 'default'
        };
        var hourStyle = {
            textAlign: 'center',
            width: '35px',
            height: '35px',
            lineHeight: '35px',
            borderRadius: '50%',
            transition: 'background .5s',
            cursor: 'pointer'
        };

        Object.assign(hourStyle, this.props.style);
        Object.assign(hourHoverStyle, hourStyle);
        Object.assign(hourSelectedStyle, hourStyle);

        return (
            <span
                data-value={this.props.hrLabel}
                style={this.state.hover && !this.props.selected ? hourHoverStyle : this.props.selected ? hourSelectedStyle : hourStyle}
                onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </span>
        )
    };
}





export class TimePicker extends StripesTheme {

    static defaultProps = {
        style: {},
        width: '200px',
        type: 'default',
        format: 'h:mm A',
        time: null,
        onSet: () => { return false; },
        disabled: false,
        clockFormat: '12hr',
        hours12: [1,2,3,4,5,6,7,8,9,10,11,12],
        hours24: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        selectorDimension: 260
    }

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderCleanTime = this.renderCleanTime.bind(this);
        this.setHour = this.setHour.bind(this);
        this.setMinute = this.setMinute.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.toggleAMPM = this.toggleAMPM.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.cancel = this.cancel.bind(this);
        this.setTime = this.setTime.bind(this);
        this.getValue = this.getValue.bind(this);

        var initialTime = props.time ? props.time : new Date();
        this.state = {
            opentime: initialTime,
            active: false,
            hour: m(initialTime).format('h')*1,
            minute: m(initialTime).format('m')*1,
            time: initialTime,
            mode: 'hour',
            hourhover: false,
            minhover: false,
            amhover: false
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
            active: show,
            hour: m(this.state.time).format('h')*1,
            minute: m(this.state.time).format('m')*1,
            opentime: show ? this.state.time : this.state.opentime
        }, () => {
            if(open) {
                this.updateStyles();
                this.refs.Dialog.open();
            } else {
                this.refs.Dialog.close();
            }
        });
    }

    changeMode(mode) {
        this.setState({
            mode: mode
        }, this.updateStyles);
    }

    renderCleanTime() {
        return (
            <div key="timetitle" style={this.state.style.time}>
                <span style={this.state.hourhover || this.state.mode === 'hour' ? this.state.style.timeparthover : this.state.style.timepart} onMouseOver={()=> {this.setState({hourhover: true})}} onMouseOut={()=> {this.setState({hourhover: false})}} onClick={()=> {this.changeMode('hour')}}>{m(this.state.time).format('h')}</span>
                :
                <span style={this.state.minhover || this.state.mode === 'minute' ? this.state.style.timeparthover : this.state.style.timepart}  onMouseOver={()=> {this.setState({minhover: true})}} onMouseOut={()=> {this.setState({minhover: false})}} onClick={()=> {this.changeMode('minute')}}>{m(this.state.time).format('mm')}</span>
                <span style={this.state.amhover ? this.state.style.timeparthover : this.state.style.timepart}  onMouseOver={()=> {this.setState({amhover: true})}} onMouseOut={()=> {this.setState({amhover: false})}} onClick={()=> {this.toggleAMPM()}}>{m(this.state.time).format('A')}</span>

            </div>);
    }

    updateStyles() {
        this.setState({
            style: this.getStyles()
        });
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var hourHandWidth = 10;
        var hourHandHeight = 80;
        var minuteHandWidth = 10;
        var minuteHandHeight = 110;
        var hourHandSVG = btoa('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 '+hourHandWidth+' 200" xml:space="preserve"><polygon fill="'+ (this.state.mode === 'hour' ? color.activeIcon : color.inactiveIcon) +'" points="0,'+hourHandHeight+' '+hourHandWidth/2+',0 '+hourHandWidth+','+hourHandHeight+' "/></svg>');
        var minuteHandSVG = btoa('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 '+minuteHandWidth+' 200" xml:space="preserve"><polygon fill="'+ (this.state.mode === 'minute' ? color.activeIcon : color.inactiveIcon) +'" points="0,'+minuteHandHeight+' '+minuteHandWidth/2+',0 '+minuteHandWidth+','+minuteHandHeight+' "/></svg>');
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
                height: this.props.selectorDimension + 'px',
                margin: '0 auto'
            },
            hourhand: {
                position: 'absolute',
                height: hourHandHeight + 'px',
                width: hourHandWidth + 'px',
                top: this.props.selectorDimension/2 - hourHandHeight + 'px',
                left: this.props.selectorDimension/2 - (hourHandWidth/2) + 'px',
                backgroundImage: 'url(data:image/svg+xml;base64,' + hourHandSVG + ')',
                backgroundSize: 'cover',
                transition: 'all .5s'
            },
            minutehand: {
                position: 'absolute',
                height: minuteHandHeight + 'px',
                width: minuteHandWidth + 'px',
                top: this.props.selectorDimension/2 - minuteHandHeight + 'px',
                left: this.props.selectorDimension/2 - (minuteHandWidth/2) + 'px',
                backgroundImage: 'url(data:image/svg+xml;base64,' + minuteHandSVG + ')',
                backgroundSize: 'cover',
                transition: 'all .5s'
            },
            handcircle: {
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: this.props.selectorDimension/2 - 10 + 'px',
                left: this.props.selectorDimension/2 - 10 + 'px',
                boxShadow: '0 2px 5px rgba(0,0,0,.25)'
            },
            timeparthover: {
                background: color.backgroundHover,
                cursor: 'pointer',
                padding: spacing.padding + 'px',
                borderBottom: 'solid 2px ' + color.iconColor
            },
            timepart: {
                transform: 'all .3s',
                cursor: 'pointer',
                padding: spacing.padding + 'px'
            }
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        return styleObj;
    }

    setHour(e) {
        var hour = e.target.getAttribute('data-value')*1;
            this.setState({
                hour: hour,
                time: m(this.state.time).hour(hour).toDate()
            }, () => {
                setTimeout(() => {
                    this.setState({
                        mode: 'minute'
                    }, this.updateStyles)
                }, 1000);
            });
    }

    setMinute(e) {
        var minute = e.target.getAttribute('data-value')*1;
        this.setState({
            minute: minute,
            time: m(this.state.time).minute(minute).toDate()
        }, this.updateStyles);

    }

    toggleAMPM() {
        var time = m(this.state.time);
        var day = time.format('d');
        if(m(time).add('hour', 12).format('d')*1 > day*1) {
            time.add('hour', 12);
        } else {
            time.subtract('hour', 12);
        }
        this.setState({
            time: m(time).toDate()
        }, this.updateStyles);
    }

    cancel() {
        var initialTime = this.props.time ? props.time : new Date();
        this.setState({
            time: this.state.opentime,
            mode: 'hour',
            hour: m(initialTime).format('h')*1,
            minute: m(initialTime).format('m')*1
        }, this.updateStyles);
        this.toggleDialog(false);
    }

    setTime() {
        this.props.onSet();
        this.setState({
            mode: 'hour'
        }, this.updateStyles);

        this.toggleDialog(false);
        this.refs.textbox.applyValue(m(this.state.time).format(this.props.format));
    }

    getValue() {
        return this.state.time;
    }

    getHourHandStyle() {
        var hourhandstyle = this.state.style.hourhand;
        var hourList = this.props[this.props.clockFormat === '12hr' ? 'hours12' : 'hours24'];
        var itemAngle = 360/hourList.length;
        var selectedAngle = 0;
        hourList.map((hr,i) => {
            if(hr===this.state.hour) {
                selectedAngle = (i+1)*itemAngle;
            }
        });
        Object.assign(hourhandstyle, {
            transform: 'Rotate('+selectedAngle+'deg)',
            transformOrigin: '50% 100%'
        });
        return hourhandstyle;
    }

    getMinuteHandStyle() {
        var minutehandstyle = this.state.style.minutehand;
        var itemAngle = 360/60;
        var selectedAngle = (this.state.minute)*itemAngle;
        Object.assign(minutehandstyle, {
            transform: 'Rotate('+selectedAngle+'deg)',
            transformOrigin: '50% 100%'
        });
        return minutehandstyle;
    }

    getHourNodes() {
        var hourNodes = [];
        var hourList = this.props[this.props.clockFormat === '12hr' ? 'hours12' : 'hours24'];
        var HRangleSpace = rads/hourList.length;
        var i = hourList.length - 1;
        for (var c = rads/2; c < rads + (rads/2); c+=HRangleSpace) {
            var hrstyle = {
                position: 'absolute',
                top: this.props.selectorDimension/2*Math.cos(c) + this.props.selectorDimension/2 - 16,
                left: this.props.selectorDimension/2*Math.sin(c) + this.props.selectorDimension/2 - 16
            };
            if(hourList[i]) {
                hourNodes.push(
                    <TimeNode
                        style={hrstyle}
                        hrLabel={hourList[i]}
                        selected={hourList[i]===this.state.hour}
                        key={"hour"+hourList[i]}
                        onClick={this.setHour}
                    >
                        {hourList[i]}
                    </TimeNode>
                );
            }
            i--;
        };
        return hourNodes;
    }

    getMinuteNodes() {
        var minNodes = [];
        var MINangleSpace = rads/60;
        var min = 60;
        for (var c = rads/2; c < rads + (rads/2); c+=MINangleSpace) {
            var minstyle = {
                position: 'absolute',
                top: this.props.selectorDimension/2*Math.cos(c) + this.props.selectorDimension/2 - 16,
                left: this.props.selectorDimension/2*Math.sin(c) + this.props.selectorDimension/2 - 16,
                opacity: min%5 && min!==this.state.minute ? '0' : '1',
                fontSize: '90%',
                width: '30px',
                height: '30px',
                lineHeight: '30px',
                zIndex: min%5 === 0 ? 1 : 0
            };
            if(min < 60) {
                minNodes.push(
                    <TimeNode
                        style={minstyle}
                        hrLabel={min}
                        selected={min===this.state.minute}
                        key={"min"+min}
                        onClick={this.setMinute}
                    >
                        {min}
                    </TimeNode>
                );
            }
            min--;
        };
        return minNodes;
    }

    render() {
        var displayTime = m(this.state.time).format(this.props.format);
        var cleanTime = this.renderCleanTime();
        var hourNodes = this.getHourNodes();
        var minNodes = this.getMinuteNodes();

        var handNode = [
            <div key="minhand" style={this.getMinuteHandStyle()}></div>,
            <div key="hourhand" style={this.getHourHandStyle()}></div>,
            <div key="basehand" style={this.state.style.handcircle}></div>
        ];

        var hourContainer = (
            <div style={this.state.style.hourContainer}>
                {this.state.mode === 'hour' ? hourNodes : minNodes}
                {handNode}
            </div>
        );

        var actionsNode = [
            <FlatButton key="action1" onClick={this.cancel}>Cancel</FlatButton>,
            <RaisedButton key="action2" onClick={this.setTime} type="primary">OK</RaisedButton>
        ];

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
                        dialogStyle={this.state.style.dialog}
                        cardStyle={this.state.style.dialogcard}
                        actions={actionsNode}
                >
                    {hourContainer}
                </Dialog>
            </div>
        )
    }
}