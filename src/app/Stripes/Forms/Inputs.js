"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {SelectPanel} from './SelectPanel.js'
import {SuggestionBox} from './SuggestionBox.js'


/* *********************************************************************************************************************
 Component TextBox
 ********************************************************************************************************************* */
class TextBox extends StripesTheme {
    static defaultProps = {
        style:  {},
        type: 'inputs',
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

/* *********************************************************************************************************************
 Component DropDown
 ********************************************************************************************************************* */
class DropDown extends StripesTheme {
    static defaultProps = {
        style:  {},
        type: 'inputs',
        placeholder: 'Select...',
        error: null,
        width: null,
        showEmpty: false,
        onChange: () => { return false; }
    }

    constructor(props) {
        super(props);
        var items = [];
        this.toggleSelect = this.toggleSelect.bind(this);
        this.applyValue = this.applyValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.props.children.map((obj) => {
            var label = obj.props.label ? obj.props.label : obj.props.children;
            items.push({
                checked: obj.props.defaultChecked,
                label: label,
                value: obj.props.value === undefined ? label : obj.props.value
            });
        });
        this.state = {
            style: this.getStyles(),
            items: items,
            active: false,
            value: null,
            label: null
        }
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    applyValue(val) {
        if(val !== undefined) {
            this.setState({
                value: val.value,
                label: val.value ? val.label : null
            }, () => {
                this.refs.input.value = this.state.value ? this.state.label : null;
            });
        }
    }

    getValue() {
        return this.state.value;
    }

    toggleSelect() {
        this.onInputClick();
        this.refs.selectPanel.open();
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = this.getBaseStyling(spacing, color).inputs;

        var input = {
            cursor: 'pointer'
        };

        styleObj.input = Object.assign(styleObj.input, input);
        styleObj.active.on = Object.assign(styleObj.active.on, styleObj.active.base);
        styleObj.active.off = Object.assign(styleObj.active.off, styleObj.active.base);

        return styleObj;
    }


    render() {
        return (
            <div style={this.state.style.container}>
                <input
                    ref="input"
                    placeholder={this.props.placeholder}
                    onClick={this.toggleSelect}
                    style={this.state.style.input}
                    readOnly="readonly"
                />
                <span style={this.state.active ? this.state.style.active.on : this.state.style.active.off}></span>
                <SelectPanel
                    ref="selectPanel"
                    data={this.state.items}
                    onSelect={this.applyValue}
                    onClose={this.onInputBlur}
                />
                <span style={this.state.style.error}>{this.props.error}</span>
            </div>

        )
    }

}

module.exports = {
    TextBox: TextBox,
    TextArea: TextArea,
    DropDown: DropDown
}