"use strict";

import React from 'react'
import { StripesTheme } from '../Core/Stripes'

export class Debug extends StripesTheme {

    static defaultProps = {
        style: {},
        className: 'Debug'
    };

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    getStyles() {
        let styleObj = {
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 4000,
            padding: '20px',
            background: 'rgba(0,0,0,.75)',
            color: 'white'
        };
        styleObj = this.hardExtend(styleObj, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <div ref="Debug"
                 id="DebugContainer"
                 className={this.props.className}
                 style={this.state.style}
            >
                listening...
            </div>
        )
    }
}