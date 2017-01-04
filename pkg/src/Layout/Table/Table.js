"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'

export class Table extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'table',
        width: '100%',
        height: null
    }

    constructor(props) {
        super(props);
        this.state = {
            style: {}
        }
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            base: {
                width: this.props.width,
                height: this.props.height,
                position: 'relative'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <div style={this.state.style.base}>
                {this.props.children}
            </div>
        )
    }
}

// {React.cloneElement(this.props.children, { fixedHeight: this.props.height })}