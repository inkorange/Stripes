"use strict";

import React from 'react'

import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Slider extends StripesTheme {

    static defaultProps = {
        style: {},
        width: '100%',
        type: 'default',
        disabled: false,
        draggable: true,
        value: 0,
        range: [0,100],
        constraint: [0,100],
        snap: 1,
        handlesize: 20,
        onlyUseHandle: false,
        showHandleValue: true,
        removeActivateTimeout: 2000,
        onChange: () => { return false; },
        format: (n) => { return parseInt(n, 10); },
        onActivate: () => { return false; }
    };

    constructor(props) {
        super(props);
        this.getValue = this.getValue.bind(this);
        this.pressing = this.pressing.bind(this);
        this.lifting = this.lifting.bind(this);
        this.dragging = this.dragging.bind(this);
        this.getPercByValue = this.getPercByValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.activateHandle = this.activateHandle.bind(this);
        this.selectPoint = this.selectPoint.bind(this);
        this.resolveXThroughEvent = this.resolveXThroughEvent.bind(this);
        this.deactivateHandle = this.deactivateHandle.bind(this);

        this.state = {
            active: false,
            value: this.props.value,
            pressing: false,
            isActivated: false,
            dragging: false,
            handleX: this.getPercByValue(this.props.value),
            removeActivation: null
        };

        this.activateTime = new Date().getTime();
        this.pressingTime = new Date().getTime();
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentDidMount() {
        this.refs.handle.addEventListener('touchmove', this.dragging, false);
    }

    componentDidUpdate(props) {
        if(props.disabled !== this.props.disabled) {
            this.updateStyles();
        }
    }

    setValue(val) {
        if(this.state.value !== val) {
            this.setState({
                handleX: this.getPercByValue(val),
                value: val
            },() => {
                this.updateStyles();
            });
        }
    }

    getPercByValue(val) {
        return ((val - this.props.range[0]) / (this.props.range[1]- this.props.range[0])) * 100;
    }

    updateStyles() {
        this.setState({
            style: this.getStyles()
        });
    }

    getValue() {
        return this.props.format(    ((this.props.range[1]-this.props.range[0]) * (this.state.handleX/100)) + this.props.range[0]     );
    }

    pressing(e) {
        if(this.props.disabled) {
            return false;
        }
        this.pressingTime = (new Date().getTime());
        this.activateHandle(e);
        this.setState({
            pressing: true,
            isActivated: true
        }, () => {
            this.props.onActivate();
            this.bindDragEvents();
            this.updateStyles();
        });
    }

    lifting(e) {
        e.preventDefault();
        e.stopPropagation();
        //console.log('lifting: ', (new Date().getTime()) - this.pressingTime);
        //document.getElementById("DebugContainer").innerHTML += " | lifting in " + ((new Date().getTime()) - this.pressingTime);
        this.setState({
            pressing: false,
            isActivated: ((new Date().getTime()) - this.pressingTime) < 200
        }, () => {
            this.removeDragEvents();
            this.updateStyles();
            //this.pressingTime = (new Date().getTime());
        });
    }

    bindDragEvents() {
        document.addEventListener('mousemove', this.dragging);
        document.addEventListener('mouseup', this.lifting);
    }

    removeDragEvents() {
        document.removeEventListener('mousemove', this.dragging);
        document.removeEventListener('mouseup', this.lifting);
    }

    dragging(e) {
        if(this.props.disabled || !this.props.draggable) {
            return false;
        }
        e.stopPropagation();
        let resolvedObj = [null,null];
        if(this.state.pressing) {
            resolvedObj = this.resolveXThroughEvent(e)
        }
        this.setState({
            dragging: this.state.pressing,
            handleX: this.state.pressing ? resolvedObj[0] : this.state.handleX,
            value: resolvedObj[1]
        }, () => {
            this.updateStyles();
            this.props.onChange(this.getValue());
        });
    }

    resolveXThroughEvent(e) {
        let node = this.refs.slider;
        let pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
        let x_on_bar = pageX - node.getBoundingClientRect().left;
        let handleX = x_on_bar * 100 / (node.offsetWidth);
        let value = Math.floor(   ((this.props.range[1]-this.props.range[0]) * (handleX/100)) + this.props.range[0]     );
        if(value <= this.props.constraint[0]) {
            handleX = this.getPercByValue(this.props.constraint[0]);
        } else if(value >= this.props.constraint[1]) {
            handleX = this.getPercByValue(this.props.constraint[1]);
        } else {
            handleX = handleX < 0 ? 0 : handleX;
            handleX = handleX > 100 ? 100 : handleX;
        }
        return [handleX,value];
    }

    activateHandle(e) {
        //console.log('activateHandle: ', (new Date().getTime()) - this.pressingTime);
        if(!this.props.disabled && ((new Date().getTime()) - this.pressingTime) < 200) {
            //document.getElementById("DebugContainer").innerHTML += " | activating";
            //console.log('activating ', this.state.pressing, this.state.isActivated, (!this.state.pressing && !this.state.isActivated));
            clearTimeout(this.state.removeActivation);
            this.setState(
                {
                    isActivated: (!this.state.pressing && !this.state.isActivated),
                    removeActivation: setTimeout(this.deactivateHandle, this.props.removeActivateTimeout)
                },
                this.updateStyles
            );
            this.pressingTime = new Date().getTime();
            if(e) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }

    deactivateHandle() {
        if(this.state.isActivated && ((new Date().getTime()) - this.pressingTime) > 500) {
            //document.getElementById("DebugContainer").innerHTML += " | deactivating in " + ((new Date().getTime()) - this.pressingTime);
            this.setState({isActivated: false}, this.updateStyles);
        }
    }

    selectPoint(e) {
        //document.getElementById("DebugContainer").innerHTML += " | Attempting SelectPoint : " + !this.state.pressing + " | " + this.state.isActivated;
        if(!this.state.pressing && this.state.isActivated && ((new Date().getTime()) - this.pressingTime) > 200) {
            //document.getElementById("DebugContainer").innerHTML += " | SELECTING POINT in " + ((new Date().getTime()) - this.pressingTime);
            let resolvedObj = this.resolveXThroughEvent(e);
            this.setState({
                isActivated: false,
                handleX:resolvedObj[0],
                value: resolvedObj[1]
            }, () => {
                this.updateStyles();
                this.props.onChange(this.getValue());
            });
        }
    }

    getStyles() {
        let color = this.getColors()[this.props.type];
        let spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            container: {
                display: 'inline-block',
                margin: spacing.margin*2 + 'px',
                width: 'calc(' + this.props.width + ' - ' + spacing.margin*2 + 'px)',
                position: 'relative',
                padding: spacing.padding + 'px',
                height: this.props.handlesize + 'px'
            },
            bar: {
                zIndex: 0,
                height: '6px',
                backgroundColor: color.inactiveIcon,
                width: '100%',
                margin: '3px 0px',
                borderRadius: spacing.borderRadius + 'px',
                boxShadow: '0 1px 3px rgba(0,0,0,.25) inset'
            },
            handle: {
                zIndex: 1,
                borderRadius: '50%',
                backgroundColor: this.props.disabled ? color.inactiveIcon : color.activeIcon,
                position: 'absolute',
                transition: 'box-shadow .5s, background-color .5s',
                transform: 'translateX(-'+this.props.handlesize/2+'px)',
                left: this.state.handleX + '%',
                top: this.state.pressing ? '2px' : '1px',
                width: this.props.handlesize + 'px',
                height: this.props.handlesize + 'px',
                boxShadow: this.state.pressing ? '0 3px 6px rgba(0,0,0,.5), 0 2px 2px rgba(255,255,255,.25) inset' : '0 2px 5px rgba(0,0,0,.25)' + (this.state.isActivated ? ', 0 0 0 10px rgba(0,0,0,.15)' : ''),
                userSelect: 'none'
            },
            value_box: {
                opacity: this.state.pressing ? '1.0' : '0',
                position: 'absolute',
                top: '-28px',
                minWidth: '50px',
                textAlign: 'center',
                left: this.state.handleX + '%',
                transform: 'translateX(-50%)',
                transition: 'opacity .25s ease-in-out .75s',
                color: 'white',
                backgroundColor: color.activeIcon,
                padding: spacing.padding + 'px',
                userSelect: 'none',
                borderRadius: spacing.borderRadius + 'px',
                fontSize: spacing.baseFontSize*.75 + 'rem'
            }
        };
        styleObj.container = this.hardExtend(styleObj.container, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <div ref="slider"
                className={this.props.className}
                {...this.getDataSet(this.props)}
                style={this.state.style.container}
                onClick={this.selectPoint}
            >
                <div style={this.state.style.bar}></div>
                {this.props.showHandleValue ? <div style={this.state.style.value_box}>{this.getValue()}</div> : null }
                <div
                    {...this.getDataSet(this.props, ' handle')}
                    ref="handle"
                    /* onClick={this.activateHandle} */
                    onMouseDown={this.pressing}
                    onTouchStart={this.pressing}
                    onTouchEnd={this.lifting}
                    style={this.state.style.handle}
                ></div>
            </div>
        )
    }
}