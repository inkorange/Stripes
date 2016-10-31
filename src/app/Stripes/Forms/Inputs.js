"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {SuggestionBox} from './SuggestionBox.js'

/* *********************************************************************************************************************
 Component TextBox
 ********************************************************************************************************************* */
class TextBox extends StripesTheme {
    static defaultProps = {
        style:  {},
        type: 'inputs',
        defaultChecked: false,
        value: '',
        placeholder: null,
        error: null,
        width: null,
        suggestions: false,
        suggestionData: []
    }

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles(),
            active: false,
            value: ''
        };
        this.onChange = this.onChange.bind(this);
        this.applyValue = this.applyValue.bind(this);
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    onChange(e) {
        var val = e.target.value !== '' ? e.target.value : null;
        if(val !== this.state.value) {
            this.setState({
                value: val
            }, () => {
                if(this.props.suggestions) {
                    this.refs.suggestionBox.updateSearch(val);
                }
            });
        }
    }

    applyValue(val) {
        this.setState({
            value: val
        });
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = this.getBaseStyling(spacing, color).inputs;
        styleObj.active.on = Object.assign(styleObj.active.on, styleObj.active.base);
        styleObj.active.off = Object.assign(styleObj.active.off, styleObj.active.base);

        return styleObj;
    }

    render() {
        if(this.props.suggestions) {
            this.state.style.container.display = "inline-block";
            this.state.style.container.width = this.props.width;
            this.state.style.input.width = "100%";
        }
        return (
            <div style={this.state.style.container}>
                <input
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onClick={this.onInputClick}
                    onBlur={this.onInputBlur}
                    onChange={this.onChange}
                    style={this.state.style.input}
                />
                <span style={this.state.active ? this.state.style.active.on : this.state.style.active.off}></span>
                {this.props.suggestions ? <SuggestionBox ref="suggestionBox" data={this.props.suggestionData} onSelect={this.applyValue} /> : null}
                <span style={this.state.style.error}>{this.props.error}</span>
            </div>
        )
    }

}

/* *********************************************************************************************************************
 Component TextArea
 ********************************************************************************************************************* */
class TextArea extends StripesTheme {
    static defaultProps = {
        style:  {},
        type: 'inputs',
        defaultChecked: false,
        value: '',
        placeholder: null,
        error: null,
        width: null
    }

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles(),
            active: false
        }
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = this.getBaseStyling(spacing, color).inputs;

        styleObj.active.on = Object.assign(styleObj.active.on, styleObj.active.base);
        styleObj.active.off = Object.assign(styleObj.active.off, styleObj.active.base);

        return styleObj;
    }


    render() {
        return (
            <div style={this.state.style.container}>
                <textarea
                    placeholder={this.props.placeholder}
                    onClick={this.onInputClick}
                    onBlur={this.onInputBlur}
                    style={this.state.style.input}
                />
                <span style={this.state.active ? this.state.style.active.on : this.state.style.active.off}></span>
                <span style={this.state.style.error}>{this.props.error}</span>

            </div>
        )
    }

}

module.exports = {
    TextBox: TextBox,
    TextArea: TextArea
    //Item: Item
}