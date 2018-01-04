"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
let animator = null;

export class ProgressSpinner extends StripesTheme {

    static defaultProps = {
        style: {},
        size: 125,
        type: 'default',
        strokeDasharray: [50,50],
        show: true
    };

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles(),
            strokeOffset: this.props.size*3,
            strokeDasharray: [this.props.size/2,this.props.size/2],
            strokeWidth: this.props.size*.10
        }
    }

    componentDidMount() {
        animator = setInterval(() => {
                this.setState({
                        strokeOffset: this.state.strokeOffset + (this.props.size/8)
                    }, this.setState({
                        style: this.getStyles()
                    })
                )
        }, 100);
    }

    componentDidUpdate(props) {
        if(this.props.show !== props.show) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    componentWillUnmount() {
        clearInterval(animator);
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            base: {
                position: 'absolute',
                top: 'calc(50% - '+this.props.size/2+'px)',
                left: 'calc(50% - '+this.props.size/2+'px)',
                width: this.props.size + 'px',
                height: this.props.size + 'px',
                display: this.props.show ? 'block' : 'none'
            },
            spinner1: {
                transition: 'all .2s',
                fill: 'none',
                opacity: '.25',
                stroke: color.iconColor,
                strokeWidth: this.state ? this.state.strokeWidth*.4 : 7,
                strokeDashoffset: this.state ? this.state.strokeOffset : 0,
                strokeDasharray: this.props.strokeDasharray,
                strokeLinecap: "round"
            },
            spinner2: {
                transition: 'all .2s',
                fill: 'none',
                stroke: color.iconColor,
                opacity: '.25',
                strokeWidth: this.state ? this.state.strokeWidth*.75 : 12,
                strokeDashoffset: this.state ? this.state.strokeOffset *.9 : 0,
                strokeDasharray: this.props.strokeDasharray,
                strokeLinecap: "round"
            },
            spinner3: {
                transition: 'all .2s',
                fill: 'none',
                stroke: color.iconColor,
                opacity: '.25',
                strokeWidth: this.state ? this.state.strokeWidth : 20,
                strokeDashoffset: this.state ? this.state.strokeOffset * 1.2 : 0,
                strokeDasharray: this.props.strokeDasharray,
                strokeLinecap: "round"
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        var Spinners = [
            <circle key="spin1" style={this.state.style.spinner1} cx={this.props.size/2} cy={this.props.size/2} r={this.props.size/3}/>,
            <circle key="spin2" style={this.state.style.spinner2} cx={this.props.size/2} cy={this.props.size/2} r={this.props.size/3}/>,
            <circle key="spin3" style={this.state.style.spinner3} cx={this.props.size/2} cy={this.props.size/2} r={this.props.size/3}/>
        ]
        return (
            <div style={this.state.style.base}>
                <svg stroke="blue" viewBox={"0 0 "+this.props.size+" " + this.props.size} xmlns="http://www.w3.org/2000/svg">
                    {Spinners}
                </svg>
            </div>
        )
    }
}