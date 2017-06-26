"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {SelectPanel} from './SelectPanel.js'
import {Icon} from  '../Symbols/Icon'

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
        showSuggestions: false,
        suggestionData: [],
        anchor: null,
        onClick: null,
        onBlur: null,
        onKeyUp: null,
        onKeyPress: null,
        onChange: null,
        disabled: false,
        readOnly: false
    }

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles(),
            active: false,
            suggestionItems: [],
            bbb: ''
        };
        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.applyValue = this.applyValue.bind(this);
        this.onCompleteInputBlur = this.onCompleteInputBlur.bind(this);
        this.blur = this.blur.bind(this);
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    componentDidMount() {
        this.refs.input.value = this.props.value ? this.props.value : '';
    }

    getValue() {
        return this.refs.input.value;
    }

    onChange(e) {
        var val = e.target.value !== '' ? e.target.value : null;
        this.setState({
            suggestionItems: this.getSuggestions(val)
        }, () => {
            if(this.props.showSuggestions && this.state.suggestionItems.length) {
                this.refs.selectPanel.open(false);
            } else if(this.refs.selectPanel) {
                this.refs.selectPanel.close();
            }
        });
        if(this.props.onChange) {
            this.props.onChange(e, val);
        }
    }

    getSuggestions(term) {
        if(!term) {
            return [];
        }
        term = term.toUpperCase();
        var results = [];
        this.props.suggestionData.map((v) => {
            if(v.toUpperCase().indexOf(term) >= 0) {
                results.push({
                    label: v,
                    value: v
                });
            }
        });

        return this.sortResults(results);
    }

    sortResults(results) {
        return results.sort(function(a,b) {return (a.code > b.code) ? 1 : ((b.code > a.code) ? -1 : 0);} );
    }

    applyValue(val, stopFocus) {
        if(val !== undefined) {
            this.refs.input.value = val.value ? val.value : val ? val : '';
            if(!stopFocus) {
                this.refs.input.focus();
            } else {
                this.refs.input.blur();
            }
        }
    }

    onCompleteInputBlur(e) {
        setTimeout(() => {
            var target = document.activeElement;
            if(target.className !== "SelectPanel" && this.props.showSuggestions) {
                this.refs.selectPanel.close();
                this.onInputBlur(e);
            } else if(!this.props.showSuggestions) {
                this.onInputBlur(e);
            }
            if(this.props.onBlur) {
                this.props.onBlur();
            }
        }, 1);
    }

    blur() {
        this.refs.input.blur();
        this.setState({
            active: false
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
        var anchorNode = null;
        if(this.props.anchor) {
            anchorNode = <div onClick={this.onInputClick} style={this.state.style.anchor}>{this.props.anchor}</div>
        }

        return (
            <div style={this.state.style.container}>
                <input
                    {...this.getDataSet(this.props)}
                    ref="input"
                    disabled={this.props.disabled ? 'disabled' : null}
                    readOnly={this.props.readOnly ? 'readonly' : null}
                    placeholder={this.props.placeholder}
                    onClick={this.onInputClick}
                    onKeyUp={this.props.onKeyUp}
                    onKeyPress={this.props.onKeyPress}
                    onBlur={this.onCompleteInputBlur}
                    onChange={this.onChange}
                    style={this.state.style.input}
                    tabIndex="1"
                />
                {anchorNode}
                <span style={this.state.active ? this.state.style.active.on : this.state.style.active.off}></span>
                {this.props.showSuggestions ?
                    <SelectPanel
                        {...this.getDataSet(this.props, '-SuggestionsPanel')}
                        ref="selectPanel"
                        data={this.state.suggestionItems}
                        onSelect={this.applyValue}
                        onClose={this.onInputBlur}
                    />
                    : null}
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
        onChange: null,
        error: null,
        width: null
    }

    constructor(props) {
        super(props);

        this.getValue = this.getValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.blur = this.blur.bind(this);

        this.state = {
            style: this.getStyles(),
            active: false,
            value: this.props.value
        }
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
            });
        }
        if(this.props.onChange) {
            this.props.onChange(e, val);
        }
    }

    getValue() {
        return this.state.value;
    }

    blur() {
        this.refs.input.blur();
        this.setState({
            active: false
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
        return (
            <div style={this.state.style.container}>
                <textarea
                    {...this.getDataSet(this.props)}
                    placeholder={this.props.placeholder}
                    onClick={this.onInputClick}
                    onBlur={this.onInputBlur}
                    onChange={this.onChange}
                    style={this.state.style.input}
                    value={this.state.value}
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
        iconStyle: {},
        value: null,
        onChange: () => { return false; }
    }

    constructor(props) {
        super(props);
        this.toggleSelect = this.toggleSelect.bind(this);
        this.applyValue = this.applyValue.bind(this);
        this.getValue = this.getValue.bind(this);
        var resolvedMap = this.resolveItemMap(this.props.children);
        this.state = {
            style: this.getStyles(),
            items: resolvedMap.items,
            active: false,
            label: resolvedMap.currentCheckedLabel,
            value: resolvedMap.currentCheckedValue
        }
    }

    resolveItemMap(children) {
        var items = [];
        var currentCheckedValue = null;
        var currentCheckedLabel = null;
        children.map((obj) => {
            var label = obj.props.label ? obj.props.label : obj.props.children;
            if(obj.props.defaultChecked) {
                currentCheckedLabel = label;
                currentCheckedValue = obj.props.value === undefined ? label : obj.props.value;
            }
            items.push({
                checked: obj.props.defaultChecked,
                label: label,
                value: obj.props.value === undefined ? label : obj.props.value,
                ...this.getDataSet(obj.props)
            });
        });
        return {items: items, currentCheckedLabel: currentCheckedLabel, currentCheckedValue: currentCheckedValue};
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            var resolvedMap = this.resolveItemMap(this.props.children);
            this.setState({
                style: this.getStyles(),
                items: resolvedMap.items,
                label: resolvedMap.currentCheckedLabel,
                value: resolvedMap.currentCheckedValue
            }, () => {
                this.resolveItemMap(props.children);
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
            this.props.onChange(val.value, val.label);
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
        var container = {
            lineHeight: '25px'
        };
        var input = {
            cursor: 'pointer',
            backgroundColor: 'transparent'
        };
        var baseicon = {
            position: 'absolute',
            right: '0',
            top: '-2px',
            height: '20px'
        };
        var icon = {
            fill: color.inactiveIcon
        };

        styleObj.container = Object.assign(styleObj.container, container);
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        styleObj.input = Object.assign(styleObj.input, input);
        styleObj.baseicon = baseicon;
        styleObj.icon = Object.assign(icon, this.props.iconStyle);
        styleObj.active.on = Object.assign(styleObj.active.on, styleObj.active.base);
        styleObj.active.off = Object.assign(styleObj.active.off, styleObj.active.base);

        return styleObj;
    }

    render() {
        return (
            <div style={this.state.style.container} {...this.getDataSet(this.props)}>
                <input
                    ref="input"
                    placeholder={this.props.placeholder}
                    onClick={this.toggleSelect}
                    style={this.state.style.input}
                    readOnly="readonly"
                    value={this.state.label ? this.state.label : ""}
                />
                <Icon
                    basestyle={this.state.style.baseicon}
                    iconid="down"
                    size="15px"
                    type="primary"
                    style={this.state.style.icon}
                />
                <span style={this.state.active ? this.state.style.active.on : this.state.style.active.off}></span>
                <SelectPanel
                    ref="selectPanel"
                    data={this.state.items}
                    {...this.getDataSet(this.props, '-SelectPanel')}
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