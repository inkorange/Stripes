"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Slider extends StripesTheme {

    static defaultProps = {
        style: {},
        width: '100%',
        type: 'default',
        disabled: false,
        value: 0,
        range: [0,100],
        constraint: [0,100],
        snap: 1,
        handlesize: 20,
        showHandleValue: true,
        removeActivateTimeout: 2000,
        onChange: () => { return false; },
        format: (n) => { return parseInt(n, 10); }
    }

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
        }
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
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
        this.setState({
            pressing: true
            //isActivated: false
        }, () => {
            this.bindDragEvents();
            this.updateStyles();
        });
    }

    lifting() {
        this.setState({
            pressing: false
        }, () => {
            this.removeDragEvents();
            this.updateStyles();
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
        if(this.props.disabled) {
            return false;
        }
        e.stopPropagation();
        var resolvedObj = [null,null];
        if(this.state.pressing) {
            resolvedObj = this.resolveXThroughEvent(e)
        }
        this.setState({
            dragging: this.state.pressing,
            //isActivated: false,
            handleX: this.state.pressing ? resolvedObj[0] : this.state.handleX,
            value: resolvedObj[1]
        }, () => {
            this.updateStyles();
            this.props.onChange(this.getValue());
        });
    }

    resolveXThroughEvent(e) {
        var node = this.refs.slider;
        var x_on_bar = e.pageX - node.getBoundingClientRect().left;
        var handleX = x_on_bar * 100 / (node.offsetWidth);
        var value = Math.floor(   ((this.props.range[1]-this.props.range[0]) * (handleX/100)) + this.props.range[0]     );
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
        if(!this.props.disabled) {
            clearTimeout(this.state.removeActivation);
            //alert(!this.state.pressing + " | " + !this.state.isActivated);
            this.setState(
                {
                    isActivated: (!this.state.pressing && !this.state.isActivated),
                    removeActivation: setTimeout(this.deactivateHandle, this.props.removeActivateTimeout)
                },
                this.updateStyles
            );
        }
    }

    deactivateHandle() {
        this.setState({isActivated: false},this.updateStyles);
    }

    selectPoint(e) {
        if(!this.state.pressing && this.state.isActivated) {
            var resolvedObj = this.resolveXThroughEvent(e);
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
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
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
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <div ref="slider"
                className={this.props.className}
                {...this.getDataSet(this.props)}
                style={this.state.style.container}
                onMouseDown={this.pressing}
                onMouseUp={this.release}
                onClick={this.selectPoint}
            >
                <div style={this.state.style.bar}></div>
                {this.props.showHandleValue ? <div style={this.state.style.value_box}>{this.getValue()}</div> : null }
                <div
                    onClick={this.activateHandle}
                    style={this.state.style.handle}
                ></div>
            </div>
        )
    }
}