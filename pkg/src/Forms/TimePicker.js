"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Dialog, Paper } from '../Layouts'
import {TextBox} from  './Inputs'
import {FlatButton, RaisedButton} from './Buttons'
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
            cursor: 'default'
        };
        var hourStyle = {
            textAlign: 'center',
            width: '35px',
            height: '35px',
            lineHeight: '35px',
            borderRadius: '50%',
            transition: 'background .5s',
            cursor: 'pointer',
            color: color.idleColor
        };

        Object.assign(hourStyle, this.props.style);
        Object.assign(hourHoverStyle, hourStyle);
        Object.assign(hourSelectedStyle, hourStyle);
        hourSelectedStyle.color = 'white';

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
        width: '100%',
        type: 'default',
        format: 'h:mm A',
        hourFormat: 'h',
        minuteFormat: 'mm',
        errorMessage: 'Invalid Time Format (h:mm A)',
        time: null,
        onSet: () => { return false; },
        disabled: false,
        clockFormat: '12hr',
        hours12: [1,2,3,4,5,6,7,8,9,10,11,12],
        hours24: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        selectorDimension: 260,
        placeholder: "Time",
        active: false,
        manual: false
    }

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderCleanTime = this.renderCleanTime.bind(this);
        this.setHour = this.setHour.bind(this);
        this.hardSetTime = this.hardSetTime.bind(this);
        this.setMinute = this.setMinute.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.toggleAMPM = this.toggleAMPM.bind(this);
        this.cancel = this.cancel.bind(this);
        this.setTime = this.setTime.bind(this);
        this.setManualTime = this.setManualTime.bind(this);
        this.pressManualTime = this.pressManualTime.bind(this);
        this.getValue = this.getValue.bind(this);
        this.resolveClickPoint = this.resolveClickPoint.bind(this);
        this.inputBlur = this.inputBlur.bind(this);

        var initialTime = props.time ? props.time : null;
        this.state = {
            opentime: initialTime,
            active: false,
            hour: m(initialTime ? initialTime : new Date()).format(this.props.hourFormat)*1,
            minute: m(initialTime ? initialTime : new Date()).format(this.props.minuteFormat)*1,
            time: initialTime,
            mode: 'hour',
            hourhover: false,
            minhover: false,
            amhover: false,
            inputError: null
        }
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentWillUpdate(props) {
        if(props.time !== this.props.time) {
            var updatedTime = null;
            if(props.time) {
                var m_propTime = m(props.time);
                if(m_propTime.hours() === 0 && m_propTime.minutes() === 0 && m_propTime.seconds() === 0) {
                    updatedTime = null;
                } else {
                    updatedTime = props.time
                }
            }
            this.setState({
                time: updatedTime
            });
            this.refs.textbox.applyValue(props.time ? m(props.time).format(this.props.format) : "", true);
            this.updateStyles();
        }
    }

    toggleDialog(open) {
        var show = open !== undefined ? open : !this.state.active;
        this.setState({
            active: show,
            hour: m(this.state.time ? this.state.time : new Date()).format(this.props.hourFormat)*1,
            minute: m(this.state.time ? this.state.time : new Date()).format(this.props.minuteFormat)*1,
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
        var timeValue = this.state.time ? this.state.time : new Date();
        return (
            <div key="timetitle" style={this.state.style.time}>
                <span style={this.state.hourhover || this.state.mode === 'hour' ? this.state.style.timeparthover : this.state.style.timepart} onMouseOver={()=> {this.setState({hourhover: true})}} onMouseOut={()=> {this.setState({hourhover: false})}} onClick={()=> {this.changeMode('hour')}}>{m(timeValue).format(this.props.hourFormat)}</span>
                :
                <span style={this.state.minhover || this.state.mode === 'minute' ? this.state.style.timeparthover : this.state.style.timepart}  onMouseOver={()=> {this.setState({minhover: true})}} onMouseOut={()=> {this.setState({minhover: false})}} onClick={()=> {this.changeMode('minute')}}>{m(timeValue).format(this.props.minuteFormat)}</span>
                {this.props.clockFormat === "12hr" ?
                <span style={this.state.amhover ? this.state.style.timeparthover : this.state.style.timepart}  onMouseOver={()=> {this.setState({amhover: true})}} onMouseOut={()=> {this.setState({amhover: false})}} onClick={()=> {this.toggleAMPM()}}>{m(timeValue).format('A')}</span>
                    : null}

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
                margin: spacing.margin*2 + 'px 0',
                width: this.props.width,
                lineHeight: '1em',
                userSelect: 'none'
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
        var newTime = this.state.time ? m(this.state.time) : m(new Date());
        newTime.hour(hour);
        this.setState({
            hour: hour,
            time: newTime.toDate(),
            inputError: null
        }, () => {
            setTimeout(() => {
                this.setState({
                    mode: 'minute'
                }, this.updateStyles)
            }, 500);
        });
    }

    setMinute(e) {
        var minute = e.target.getAttribute('data-value')*1;
        var newTime = this.state.time ? m(this.state.time) : m(new Date());
        newTime.minute(minute);
        this.setState({
            minute: minute,
            time: newTime.toDate(),
            inputError: null
        }, this.updateStyles);
    }

    toggleAMPM(cb) {
        var time = m(this.state.time ? this.state.time : new Date());
        var day = time.format('d');
        if(m(time).add(12,'hour').format('d')*1 > day*1) {
            time.add(12,'hour');
        } else {
            time.subtract(12, 'hour');
        }
        this.setState({
            time: m(time).toDate()
        }, ()=> {
            if(cb) { cb(); }
            this.updateStyles();
        });
    }

    inputBlur() {
        this.refs.textbox.blur();
    }

    cancel() {
        var initialTime = this.props.time ? this.props.time : new Date();
        this.setState({
            time: this.state.opentime,
            mode: 'hour',
            hour: m(initialTime).format('h')*1,
            minute: m(initialTime).format('m')*1
        }, this.updateStyles);
        this.toggleDialog(false);
    }

    setTime() {
        this.setState({
            mode: 'hour'
        }, this.updateStyles);

        if(this.state.time) {
            this.refs.textbox.applyValue(m(this.state.time).format(this.props.format), true);
            this.props.onSet(this.state.time);
        } else {
            var now = new Date();
            this.setState({
                time: now,
                inputError: null
            }, () => {
                this.refs.textbox.applyValue(m(this.state.time).format(this.props.format), true);
                this.props.onSet(this.state.time);
            });
        }

        this.toggleDialog(false);
    }

    hardSetTime(hour, minute, AMPM) {
        var newTime = this.state.time ? m(this.state.time) : m(new Date());
        newTime.hour(hour);
        newTime.minute(minute);
        newTime.second(0);
        if(newTime.isValid() && !isNaN(newTime) ) {
            if (AMPM || this.props.clockFormat === "12hr") {
                if (AMPM === 'PM') {
                    if (hour < 12) {
                        hour = hour + 12;
                    }
                } else {
                    if (hour >= 12) {
                        hour = hour - 12;
                    }
                }
                newTime.hour(hour);
            }
            this.setState({
                hour: hour,
                minute: minute,
                time: newTime.toDate(),
                inputError: null
            }, () => {
                this.props.onSet(this.state.time);
                //this.refs.textbox.applyValue(m(this.state.time).format(this.props.format));
                this.updateStyles();
            });
        } else {
            this.setState({
                inputError: this.props.errorMessage
            });
        }
    }

    pressManualTime(e) {
        if(e.keyCode === 13) {
            this.refs.textbox.blur();
            //this.setManualTime();
        }
    }

    setManualTime() {

        var isValid = () => {
            var tempDateTime = m();
            var timeObj = this.refs.textbox.getValue() ? this.refs.textbox.getValue().toUpperCase() : '';
            // lets test it out *******************
            if( !this.refs.textbox.getValue()) {
                return false;
            }
            timeObj = timeObj.replace(/\s|PM|AM/g, '');
            if(timeObj.indexOf(':') >= 0) {
                var hour = timeObj.split(':')[0] * 1;
                var minute = timeObj.split(':')[1] * 1;
                // lets test it out *******************
                if (isNaN(hour) || isNaN(minute)) {
                    return false;
                }
                tempDateTime.hour(timeObj.split(':')[0] * 1);
                tempDateTime.minute(timeObj.split(':')[1] * 1);
            } else if(timeObj.length > 0 && !isNaN(timeObj*1)) {
                tempDateTime.hour(timeObj);
            } else {
                return false;
            }
            return tempDateTime.isValid()
        };
        var timeVal = this.refs.textbox.getValue();
        var timesMatch = timeVal == m(this.state.time).format(this.props.format);
        if(timesMatch) {
            return false;
        }
        var isValid = isValid();
        if(isValid && timeVal) {
            var val = timeVal.toUpperCase();
            var ampm = val.indexOf('AM') >= 0 ? 'AM' : val.indexOf('PM') >= 0 ? 'PM' : false;
            val = val.replace(/\s|PM|AM/g, '');
            if (val.indexOf(':') < 0) {
                if(val.length > 0 && !isNaN(val*1)) {
                    this.hardSetTime(val*1, 0, ampm);
                } else {
                    this.setState({
                        inputError: this.props.errorMessage
                    });
                    setTimeout(() => {
                        this.refs.textbox.applyValue({value: m(this.state.time).format(this.props.format)}, true);
                        this.setState({
                            inputError: null
                        });
                    }, 1500);
                }
            } else { // conditional to actually traverse the string and set the time....
                var hr = val.split(':')[0] * 1;
                var min = val.split(':')[1] * 1;
                this.hardSetTime(hr, min, ampm);
            }
        } else {
            if(!isValid && timeVal) {
                this.setState({
                    inputError: this.props.errorMessage
                });
                setTimeout(() => {
                    this.setState({
                        inputError: null
                    });
                    this.refs.textbox.applyValue(this.state.time ? m(this.state.time).format(this.props.format) : '', true);
                }, 1500);
            } else if(!timeVal) {
                this.setState({
                    hour: m().hour,
                    minute: m().minute,
                    time: null,
                    inputError: null
                }, () => {
                    this.props.onSet(this.state.time);
                    this.refs.textbox.applyValue("", true);
                    this.updateStyles();
                });
            } else {
                this.refs.textbox.applyValue({value: this.state.time ? m(this.state.time).format(this.props.format) : null}, true);
            }
        }
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

    resolveClickPoint(e) {
        var containerNode = document.getElementsByClassName('handContainer')[0];
        var width = containerNode.clientWidth;
        var height = containerNode.clientHeight;
        var ypos = e.clientY;// - offsets.top;
        var xpos = e.clientY;// - offsets.left;
        var x = (xpos - width/2)/(width/2);
        var y = ((height/2) - ypos)/(height/2);
        var angle = (Math.atan2(x,y) * 180 / Math.PI);

        if(x < 0 && y > 0) {
            angle = 360+angle;
        }
        if(x < 0 && y < 0) {
            angle = 360+angle;
        }
        return true;
        //console.log(angle, [width,height], [xpos,ypos], [x,y]);
    }

    render() {
        var displayTime = this.state.time ? m(this.state.time).format(this.props.format) : "";

        var color = this.getColors()[this.props.type];

        var cleanTime = this.renderCleanTime();
        var hourNodes = this.getHourNodes();
        var minNodes = this.getMinuteNodes();

        var handNode = [
            <div key="minhand" style={this.getMinuteHandStyle()}></div>,
            <div key="hourhand" style={this.getHourHandStyle()}></div>,
            <div key="basehand" style={this.state.style.handcircle}></div>
        ];
        var hourContainer = (
            <div style={this.state.style.hourContainer} onClick={this.resolveClickPoint} className="handContainer" >
                {this.state.mode === 'hour' ? hourNodes : minNodes}
                {handNode}
            </div>
        );

        var actionsNode = [
            <FlatButton key="action1" onClick={this.cancel}>Cancel</FlatButton>,
            <RaisedButton key="action2" onClick={this.setTime} type="primary">OK</RaisedButton>
        ];

        return (
            <div style={this.state.style.container} {...this.getDataSet(this.props)}>
                <TextBox
                    ref="textbox"
                    value={displayTime}
                    width="100%"
                    anchor={<Icon iconid="clock" onClick={this.props.manual ? this.toggleDialog : null} basestyle={{marginTop:'-5px'}} color={this.state.time ? color.activeIcon : color.inactiveIcon} size="small" />}
                    onClick={this.props.manual ? null : this.toggleDialog}
                    readOnly={this.props.manual ? null : true}
                    placeholder={this.props.placeholder}
                    onKeyUp={this.props.manual ? this.pressManualTime : null}
                    onBlur={this.props.manual ? this.setManualTime : null}
                    error={this.state.inputError}
                />
                <Dialog ref="Dialog"
                        modal={true}
                        title={cleanTime}
                        dialogStyle={this.state.style.dialog}
                        cardStyle={this.state.style.dialogcard}
                        actions={actionsNode}
                        onClose={this.inputBlur}
                >
                    {hourContainer}
                </Dialog>
            </div>
        )
    }
}