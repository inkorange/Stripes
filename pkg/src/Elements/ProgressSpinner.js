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
        strokeDasharray: [50,50]
    }

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles(),
            strokeOffset: 500,
            strokeDasharray: [50,50]
        }
    }

    componentDidMount() {
        animator = setInterval(() => {
                this.setState({
                        strokeOffset: this.state.strokeOffset + 25,
                        //strokeDasharray: [this.state.strokeDasharray[0] + 5, this.state.strokeDasharray[0] + 20]
                    }, this.setState({
                        style: this.getStyles()
                    })
                )
        }, 100);
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
                height: this.props.size + 'px'
            },
            spinner1: {
                transition: 'all .2s',
                fill: 'none',
                opacity: '.25',
                stroke: color.iconColor,
                strokeWidth: '5',
                strokeDashoffset: this.state ? this.state.strokeOffset : 0,
                strokeDasharray: this.props.strokeDasharray,
                strokeLinecap: "round"
            },
            spinner2: {
                transition: 'all .2s',
                fill: 'none',
                stroke: color.iconColor,
                opacity: '.25',
                strokeWidth: '12',
                strokeDashoffset: this.state ? this.state.strokeOffset *.9 : 0,
                strokeDasharray: this.props.strokeDasharray,
                strokeLinecap: "round"
            },
            spinner3: {
                transition: 'all .2s',
                fill: 'none',
                stroke: color.iconColor,
                opacity: '.25',
                strokeWidth: '20',
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
            <circle key="spin1" style={this.state.style.spinner1} cx={this.props.size/2} cy={this.props.size/2} r={this.props.size/2 - 15}/>,
            <circle key="spin2" style={this.state.style.spinner2} cx={this.props.size/2} cy={this.props.size/2} r={this.props.size/2 - 15}/>,
            <circle key="spin3" style={this.state.style.spinner3} cx={this.props.size/2} cy={this.props.size/2} r={this.props.size/2 - 15}/>
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