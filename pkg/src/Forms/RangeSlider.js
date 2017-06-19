"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Slider } from '../Forms/Slider'
import { CheckBox } from '../Forms/Switches'


export class RangeSlider extends StripesTheme {

    static defaultProps = {
        style: {},
        unlimitedStyle: {},
        width: '100%',
        type: 'default',
        disabled: false,
        value: [0,100],
        range: [0,100],
        constraint: [0,100],
        snap: 1,
        handlesize: 20,
        showHandleValue: true,
        showUnlimited: false,
        isUnlimited: false,
        onChange: () => { return false; },
        format: (n) => { return parseInt(n, 10); }
    }

    constructor(props) {
        super(props);
        this.getValue = this.getValue.bind(this);
        this.updateMin = this.updateMin.bind(this);
        this.updateMax = this.updateMax.bind(this);
        this.updateStyles = this.updateStyles.bind(this);
        this.getPercByValue = this.getPercByValue.bind(this);
        this.toggleUnlimited = this.toggleUnlimited.bind(this);
        this.clickSlider = this.clickSlider.bind(this);
        this.reset = this.reset.bind(this);

        this.state = {
            minValue: props.value[0] ? props.value[0]*1 : props.range[0],
            maxValue:  props.isUnlimited || props.value[1]*1 === Infinity ? props.range[1]: props.value[1] ? props.value[1]*1 : props.range[1],
            isUnlimited: props.isUnlimited || props.value[1]*1 === Infinity
        }
    }

    componentWillMount() {
        this.updateStyles();
        if(this.props.isUnlimited) {
            this.toggleUnlimited(true);
        }
    }

    componentWillUpdate(props) {
        if(!props.value.equals(this.props.value) || props.isUnlimited !== this.props.isUnlimited) {
            this.setState({
                minValue: props.value[0] ? props.value[0]*1 : props.range[0],
                maxValue: !props.value[1] || props.value[1]*1 === Infinity ? props.range[1] : props.value[1]*1,
                isUnlimited: props.isUnlimited || (props.value[1]*1 === Infinity)
            }, () => {
                this.updateStyles();
                this.refs.minSlider.setValue(this.state.minValue);
                this.refs.maxSlider.setValue(this.state.maxValue);
            });
        }
    }

    componentDidUpdate(props) {
        if(props.disabled !== this.props.disabled) {
            this.updateStyles();
        }
    }

    getValue() {
        return [this.state.minValue,this.state.isUnlimited ? Infinity : this.state.maxValue];
    }

    getPercByValue(val) {
        return ((val - this.props.range[0]) / (this.props.range[1]- this.props.range[0])) * 100;
    }

    updateMin(val) {
        this.setState({
            minValue: val
        }, ()=> {
            this.props.onChange(this.getValue());
            this.updateStyles();
            setTimeout(this.refs.minSlider.deactivateHandle, 500);
        });
    }

    updateMax(val) {
        this.setState({
            maxValue: val
        }, ()=> {
            this.props.onChange(this.getValue());
            this.updateStyles();
            setTimeout(this.refs.maxSlider.deactivateHandle, 500);
        });
    }

    updateStyles() {
        this.setState({
            style: this.getStyles()
        });
    }

    toggleUnlimited(force) {
        this.updateMax(this.props.range[1]);
        this.setState({
            isUnlimited: force === undefined ? !this.state.isUnlimited : force
        }, () => {
            this.refs.maxSlider.setValue(this.props.range[1]);
        });
    }

    clickSlider(e) {
        e.stopImmediatePropogation;
        this.refs.minSlider.selectPoint(e);
        this.refs.maxSlider.selectPoint(e);
    }

    reset() {
        this.setState({
            minValue: this.props.value[0] ? this.props.value[0]*1 : this.props.range[0],
            maxValue:  this.props.isUnlimited || this.props.value[1]*1 === Infinity ? this.props.range[1]: this.props.value[1] ? this.props.value[1]*1 : this.props.range[1],
            isUnlimited: this.props.isUnlimited || this.props.value[1]*1 === Infinity
        }, () => {
            this.props.onChange(this.getValue());
            var maxNum = this.props.value[1] ? this.props.value[1]*1 : this.props.range[1];
            maxNum = maxNum === Infinity ? this.props.range[1] : maxNum;
            this.refs.minSlider.setValue(this.props.value[0] ? this.props.value[0]*1 : this.props.range[0]);
            this.refs.maxSlider.setValue(maxNum);
            this.updateStyles();
        });
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            container: {
                position: 'relative',
                width: this.props.width,
                height: '40px'
            },
            highlight: {
                position: 'absolute',
                top: (this.props.handlesize - 2) + 'px',
                height: '5px',
                left: this.getPercByValue(this.state.minValue) + 1 + '%',
                width: (this.getPercByValue(this.state.maxValue) - this.getPercByValue(this.state.minValue)) + '%',
                //width: 'calc(' + (this.getPercByValue(this.state.maxValue) - this.getPercByValue(this.state.minValue)) + '% + ' + this.props.handlesize/3 + 'px)',
                backgroundColor: color.activeIcon,
                opacity: this.props.disabled ? '.05' : '.65',
                zIndex: 0,
                boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 5px -2px inset',
                transition: 'background-color .5s, opacity .5s'
            },
            unlimited: {
                padding: this.props.handlesize*1.5 + 'px 0 ' + spacing.padding + 'px 0'
            }
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        styleObj.unlimited = Object.assign(styleObj.unlimited, this.props.unlimitedStyle);
        return styleObj;
    }

    render() {
        var unlimitedDOM = null;
        if(this.props.showUnlimited) {
            unlimitedDOM = (
                <div style={this.state.style.unlimited}>
                    <CheckBox disabled={this.props.disabled} onChange={this.toggleUnlimited} checked={this.state.isUnlimited} label="Unlimited Max" />
                </div>
            );
        }
        //console.log('is this disabled? ', this.state.isUnlimited || this.props.disabled);
        return (
            <div ref="RangeSlider"
                 className={this.props.className}
                 {...this.getDataSet(this.props)}
                 style={this.state.style.container}
                 onClick={this.clickSlider}
            >
                <Slider
                    {...this.getDataSet(this.props, '-minSlider')}
                    style={{position: 'absolute'}}
                    disabled={this.props.disabled}
                    value={this.props.value[0] ? this.props.value[0]*1 : this.props.range[0]}
                    range={this.props.range}
                    constraint={[this.props.range[0],this.state.maxValue - this.props.snap]}
                    snap={this.props.snap}
                    handlesize={this.props.handlesize}
                    showHandleValue={this.props.showHandleValue}
                    onChange={this.updateMin}
                    ref="minSlider" />
                <Slider
                    {...this.getDataSet(this.props, '-maxSlider')}
                    style={{position: 'absolute'}}
                    disabled={this.state.isUnlimited || this.props.disabled}
                    value={this.props.value[1] === Infinity ? this.props.range[1] : this.props.value[1] ? this.props.value[1]*1 : this.props.range[1]}
                    range={this.props.range}
                    constraint={[this.state.minValue + this.props.snap, this.props.range[1]]}
                    snap={this.props.snap}
                    handlesize={this.props.handlesize}
                    showHandleValue={this.props.showHandleValue}
                    onChange={this.updateMax}
                    ref="maxSlider" />
                <div style={this.state.style.highlight} />
                {unlimitedDOM}
            </div>
        )
    }
}