"use strict"

import React from 'react'
import { StripesTheme } from '../Core/Stripes'
import {SelectPanel} from './SelectPanel.js'
import {Placeholder} from './Placeholder.js'
import {Icon} from  '../Symbols/Icon'

let tabIndex = 0;
/* *********************************************************************************************************************
 Component TextBox
 ********************************************************************************************************************* */
class TextBox extends StripesTheme {
    static defaultProps = {
        style:  {},
        type: 'inputs',
        value: '',
        placeholder: null,
        dropOffset: 35,
        error: null,
        width: null,
        showSuggestions: false,
        suggestionData: [],
        inputType: 'text',
        anchor: null,
        name: null,
        onClick: null,
        onBlur: null,
        onKeyUp: null,
        onKeyPress: () => { return true; },
        onChange: null,
        disabled: false,
        readOnly: false
    };

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles(),
            active: false,
            suggestionItems: [],
            value: props.value
        };
        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.applyValue = this.applyValue.bind(this);
        this.onCompleteInputBlur = this.onCompleteInputBlur.bind(this);
        this.blur = this.blur.bind(this);
        this.inputKeyPress = this.inputKeyPress.bind(this);
        this.tabIndex = tabIndex++;
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    componentWillUpdate(props) {
        if(props.value !== this.props.value) {
            this.setState({
                value: props.value
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
        let val = e.target.value !== '' ? e.target.value : null;
        this.setState({
            suggestionItems: this.getSuggestions(val),
            value: val
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
        let results = [];
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
            let resval = val.value ? val.value : val ? val : '';
            this.refs.input.value = resval;
            this.setState({
                value: resval
            }, ()=> {
                if(!stopFocus) {
                    this.refs.input.focus();
                } else {
                    this.refs.input.parentNode.focus();
                }
            });
        }
    }

    onCompleteInputBlur(e) {
        setTimeout(() => {
            let target = document.activeElement;
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
        this.refs.input.parentNode.focus();
        this.setState({
            active: false
        });
    }

    focus() {
        this.refs.input.focus();
        this.setState({
            active: true
        });
    }

    inputKeyPress(e) {
        if(e.charCode === 13) {
            if(this.props.onBlur) {
                this.refs.input.parentNode.focus();
                this.props.onBlur();
            }
        }
        this.props.onKeyPress();
    }

    getStyles() {
        const color = this.getColors()[this.props.type];
        const spacing = this.getSpacing()[this.props.type];
        let styleObj = this.getBaseStyling(spacing, color).inputs;
        let input = {
            cursor: 'pointer',
            backgroundColor: 'transparent',
            position: 'relative',
            lineHeight: spacing.baseFontSize + 'rem',
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        styleObj.input = Object.assign(styleObj.input, input);
        styleObj.active.on = Object.assign(styleObj.active.on, styleObj.active.base);
        styleObj.active.off = Object.assign(styleObj.active.off, styleObj.active.base);
        return styleObj;
    }



    render() {
        if(this.props.suggestions) {
            this.state.style.container.display = "inline-block";
            this.state.style.input.width = "100%";
        }
        let anchorNode = null;
        if(this.props.anchor) {
            anchorNode = <div onClick={this.onInputClick} style={this.state.style.anchor}>{this.props.anchor}</div>
        }
        return (
            <div ref="input_container" style={this.state.style.container} tabIndex="1000">
                <Placeholder active={this.state.active} hasValue={this.state.value !== null && this.state.value !== ""} name={this.props.placeholder} />
                <input
                    {...this.getDataSet(this.props)}
                    ref="input"
                    type={this.props.inputType}
                    name={this.props.name}
                    disabled={this.props.disabled ? 'disabled' : null}
                    readOnly={this.props.readOnly ? 'readonly' : null}
                    onClick={this.onInputClick}
                    onKeyUp={this.props.onKeyUp}
                    onKeyPress={this.inputKeyPress}
                    onBlur={this.onCompleteInputBlur}
                    onChange={this.onChange}
                    style={this.state.style.input}
                    tabIndex={this.tabIndex}
                />
                {anchorNode}
                <span style={this.state.active ? this.state.style.active.on : this.state.style.active.off}></span>
                <span style={this.state.style.error}>{this.props.error}</span>
                {this.props.showSuggestions ?
                    <SelectPanel
                        {...this.getDataSet(this.props, 'SuggestionsPanel')}
                        ref="selectPanel"
                        data={this.state.suggestionItems}
                        onSelect={this.applyValue}
                        onClose={this.onInputBlur}
                        dropOffset={this.props.dropOffset}
                    />
                    : null}
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
        disabled: false,
        readOnly: false,
        type: 'inputs',
        value: '',
        placeholder: null,
        onChange: null,
        error: null,
        width: null
    };

    constructor(props) {
        super(props);

        this.getValue = this.getValue.bind(this);
        this.applyValue = this.applyValue.bind(this);
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
        let val = e.target.value !== '' ? e.target.value : null;
        if(val !== this.state.value) {
            this.setState({
                value: val
            });
        }
        if(this.props.onChange) {
            this.props.onChange(e, val);
        }
    }

    applyValue(val, stopFocus) {
        if(val !== undefined) {
            let resval = val.value ? val.value : val ? val : '';
            this.refs.input.value = resval;
            this.setState({
                value: resval
            }, ()=> {
                if(!stopFocus) {
                    this.refs.input.focus();
                } else {
                    this.refs.input.parentNode.focus();
                }
            });
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
        let color = this.getColors()[this.props.type];
        let spacing = this.getSpacing()[this.props.type];
        let styleObj = this.getBaseStyling(spacing, color).inputs;
        let input = {
            overflow: 'auto'
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        styleObj.input = Object.assign(styleObj.input, input);
        styleObj.active.on = Object.assign(styleObj.active.on, styleObj.active.base);
        styleObj.active.off = Object.assign(styleObj.active.off, styleObj.active.base);
        return styleObj;
    }


    render() {
        return (
            <div style={this.state.style.container}>
                <Placeholder active={this.state.active} hasValue={this.state.value !== null && this.state.value !== ""} name={this.props.placeholder} />
                <textarea
                    {...this.getDataSet(this.props)}
                    onClick={this.onInputClick}
                    onBlur={this.onInputBlur}
                    onChange={this.onChange}
                    style={this.state.style.input}
                    value={this.state.value}
                    ref="input"
                    disabled={this.props.disabled ? 'disabled' : null}
                    readOnly={this.props.readOnly ? 'readonly' : null}
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
        className: null,
        type: 'inputs',
        placeholder: null,
        error: null,
        width: null,
        iconStyle: {},
        showFocus: true,
        value: null,
        disabled: false,
        onChange: () => { return false; }
    };

    constructor(props) {
        super(props);
        this.openSelect = this.openSelect.bind(this);
        this.applyValue = this.applyValue.bind(this);
        this.getValue = this.getValue.bind(this);
        let resolvedMap = this.resolveItemMap(this.props.children);
        this.state = {
            style: this.getStyles(),
            items: resolvedMap.items,
            active: false,
            label: resolvedMap.currentCheckedLabel,
            value: resolvedMap.currentCheckedValue,
            inputWidth: this.props.width
        }
    }

    resolveItemMap(children) {
        let items = [];
        let currentCheckedValue = null;
        let currentCheckedLabel = null;
        children.map((obj) => {
            let label = obj.props.label ? obj.props.label : obj.props.children;
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
            let resolvedMap = this.resolveItemMap(this.props.children);
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
                label: val.label,
                active: false
            }, () => {
                this.refs.input.value = this.state.value ? this.state.label : null;
            });
            this.props.onChange(val.value, val.label);
        }
    }

    getValue() {
        return this.state.value;
    }

    openSelect(e) {
        if(!this.props.disabled) {
            this.setState({
                inputWidth: this.refs.DropDown.offsetWidth + 'px'
            }, () => {
                this.onInputClick();
                this.refs.selectPanel.open();
            });
        }
    }

    getStyles() {
        let color = this.getColors()[this.props.type];
        let spacing = this.getSpacing()[this.props.type];
        let styleObj = this.getBaseStyling(spacing, color).inputs;
        let baseicon = {
            position: 'absolute',
            right: '0',
            top: spacing.padding + 'px',
            height: '20px',
            opacity: this.props.disabled ? '.5' : '1.0'
        };
        let icon = {
            fill: color.placeholderColor
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        styleObj.baseicon = baseicon;
        styleObj.icon = Object.assign(icon, this.props.iconStyle);
        styleObj.active.on = this.props.showFocus ? Object.assign(styleObj.active.on, styleObj.active.base) : {display: 'none'};
        styleObj.active.off = this.props.showFocus ? Object.assign(styleObj.active.off, styleObj.active.base) : {display: 'none'};
        styleObj.dropOffset = spacing.padding*4.5 + 2;
        return styleObj;
    }

    render() {
        return (
            <div ref="DropDown" className={this.props.className ? this.props.className : ''} style={this.state.style.container} {...this.getDataSet(this.props)}>
                {this.props.placeholder ?
                <Placeholder active={this.state.active} hasValue={this.state.value !== null && this.state.value !== ""} name={this.props.placeholder} />
                : null}
                <input
                    ref="input"
                    onClick={this.openSelect}
                    style={this.state.style.input}
                    readOnly="readonly"
                    value={this.state.label ? this.state.label : ""}
                />
                <Icon
                    basestyle={this.state.style.baseicon}
                    onClick={this.openSelect}
                    iconid={!this.state.active ? "dropdown":"dropup"}
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
                    width={this.state.inputWidth}
                    dropOffset={this.state.style.dropOffset}
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