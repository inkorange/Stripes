"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

/* *********************************************************************************************************************
 Component Items
 ********************************************************************************************************************* */
class Item extends StripesTheme {
    static defaultProps = {
        style:  {},
        defaultChecked: false,
        value: null
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div {...this.props.dataset} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }

}

/* *********************************************************************************************************************
Component RadioButtonGroup
********************************************************************************************************************* */
class RadioButtonGroup extends StripesTheme {
    static defaultProps = {
        style: {},
        type: 'switches',
        disabled: false,
        name: null,
        onChange: () => { return false; },
        onClick:  () => { return false; }
    }

    constructor(props) {
        super(props);
        this.updateValue = this.updateValue.bind(this);
        this.setChecked = this.setChecked.bind(this);
        this._setChildrenMap = this._setChildrenMap.bind(this);

        this.state = {
            style: this.getStyles()
        }
    }

    componentWillMount() {
        this._setChildrenMap(this.props.children);
    }

    componentWillUpdate(props) {
        if(props.children !== this.props.children) {
            this._setChildrenMap(props.children);
        }
    }

    _setChildrenMap(childItems) {
        var items = [];
        childItems.map((obj) => {
            items.push({
                dataset: this.getDataSet(obj.props),
                style: obj.props.style,
                checked: obj.props.defaultChecked,
                value: obj.props.value !== null ? obj.props.value : obj.props.children,
                children: obj.props.children
            });
        });
        this.setState({
                items: items
            }, () => { this.setState({style: this.getStyles()})}
        );
    }

    getValues() {
        var values = [];
        this.state.items.map((item, i) => {
            if(item.checked) {
                values.push(item.value);
            }
        });
        return values;
    }

    updateValue(e) {
        if(this.props.disabled) {
            return false;
        }
        var isChanged = true;
        var pos = e.target.getAttribute("data-itemid")*1;
        this.state.items.map((item, i) => {
            if(this.state.items[i].checked && i === pos) {
                isChanged = false;
            }
            this.state.items[i].checked = i === pos ? 'checked' : null;
        });
        if(isChanged) {
            this.props.onChange(e, this.getValues()[0]);
        }
        e.preventDefault();
        this.forceUpdate();
    }

    setChecked(val, checked) {
        this.state.items.map((item, i) => {
            this.state.items[i].checked = item.value == val ? checked : null;
        });
        this.forceUpdate();
    }
    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var baseCheckbox = {
            float: 'left',
            width: spacing.width + 'px', height: spacing.height + 'px',
            border: 'solid 2px ' + color.borderColor,
            transition: '.5s all',
            borderRadius: '50%',
            marginLeft: spacing.margin + 'px',
            backgroundColor: color.fillColor
        }
        var styleObj = {
            group: {
                opacity: this.props.disabled ? '.5' : '1',
                transition: '.5s opacity',
            },
            label: {
                display: 'block',
                cursor:  this.props.disabled ? 'default' : 'pointer',
                padding: spacing.padding*2 + 'px ' + spacing.padding + 'px',
                lineHeight: spacing.height + 'px',
                color: color.textColor,
                fontSize: spacing.fontSize
            },
            input : {
                marginRight: spacing.padding + 'px',
                visibility: 'hidden'
            },
            radio: {
                inactive: Object.assign({
                    boxShadow: '0 0 0 '+ spacing.width/2 +'px white inset, 0 0 0 0 rgba(0,0,0,.15)'
                },baseCheckbox),
                active: Object.assign({
                    boxShadow: '0 0 0 2px white inset, 0 0 0 '+(spacing.width/1.5)+'px rgba(0,0,0,0)'
                },baseCheckbox)
            }
        };

        return styleObj;
    }

    render() {
        var itemNodes = [];
        this.state.items.map((item, i) => {
            itemNodes.push(
                <label data-itemid={i} checked={item.checked ? 'checked' : null} key={"label" + i} style={Object.assign(item.style, this.state.style.label)}>
                    <div style={item.checked ? this.state.style.radio.active : this.state.style.radio.inactive}></div>
                    <input
                        {...item.dataset}
                        data-itemid={i}
                        name={this.props.name}
                        disabled={this.props.disabled}
                        onClick={this.updateValue}
                        style={this.state.style.input}
                        type="radio"
                        value={item.value}
                    />
                    {item.children}
                </label>);
        });
        return (
            <div {...this.getDataSet(this.props)} style={Object.assign(this.props.style, this.state.style.group)}>
                {itemNodes}
            </div>
        )
    }
    // checked={item.checked ? 'checked' : null} // not sure I need this anymore.
}

/* *********************************************************************************************************************
 CheckBox Single Component
 ********************************************************************************************************************* */
class CheckBox extends StripesTheme {
    static defaultProps = {
        align: 'left',
        checked: false,
        disabled: false,
        invertColors: false,
        label: '',
        onChange: () => { return false; },
        style: {},
        type: 'switches',
        value: ''
    }

    constructor(props) {
        super(props);
        var items = [];

        this.state = {
            style: this.getStyles(),
            checked: this.props.checked
        }

        this.updateValue = this.updateValue.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    componentWillUpdate(props) {
        if(props.checked !== this.state.checked || props.disabled !== this.state.disabled) {
            this.setState({
                checked: props.checked,
                disabled: props.disabled !== this.state.disabled ? props.disabled : this.state.disabled
            }, this.setState({
                style: this.getStyles()
            }));
        }
    }

    getValue() {
        return this.state.checked ? this.props.value : null;
    }

    isChecked() {
        return this.state.checked;
    }

    updateValue() {
        this.setState({
            checked: !this.state.checked
        }, () => {
                this.props.onChange(this.state.checked, this.props.value);
        });
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var baseCheckbox = {
            float: this.props.align,
            width: spacing.width + 'px', height: spacing.height + 'px',
            border: 'solid 2px ' + (this.props.invertColors ? color.fillColorSecondary : color.fillColor),
            transition: '.5s all',
            borderRadius: spacing.borderRadius + 'px',
            marginLeft: spacing.margin + 'px',
            backgroundColor: (this.props.invertColors ? color.fillColorSecondary : color.fillColor),
            backgroundImage: color.checkImage(this.props.invertColors ? color.fillCheckColorSecondary : color.fillCheckColor),
            backgroundSize: 'cover'
        }
        var styleObj = {
            label: {
                opacity: this.props.disabled ? '.5' : '1',
                //color: color.textColor,
                transition: '.5s opacity',
                display: 'block',
                cursor:  this.props.disabled ? 'default' : 'pointer',
                padding: this.props.label ? spacing.padding*2 + 'px ' + spacing.padding + 'px' : '0px'
            },
            input : {
                marginRight: spacing.padding + 'px',
                visibility: 'hidden'
            },
            checkbox: {
                inactive: Object.assign({
                    boxShadow: '0 0 0 '+spacing.width/2+'px '+(this.props.invertColors ? color.fillColor : color.fillColorSecondary)+' inset, 0 0 0 0 rgba(0,0,0,.15)'
                },baseCheckbox),
                active: Object.assign({
                    boxShadow: '0 0 0 0 '+(this.props.invertColors ? color.fillColor : color.fillColorSecondary)+' inset, 0 0 0 '+(spacing.width/1.5)+'px rgba(0,0,0,0)'
                },baseCheckbox)
            }
        };

        return styleObj;
    }

    render() {
        return (
            <label style={Object.assign(this.props.style, this.state.style.label)} {...this.mouseEventProps(this.props)}>
                <div style={this.state.checked ? this.state.style.checkbox.active : this.state.style.checkbox.inactive}></div>
                <input
                    {...this.getDataSet(this.props)}
                    disabled={this.props.disabled}
                    onChange={this.updateValue}
                    style={this.state.style.input}
                    checked={this.state.checked ? 'checked' : null}
                    type="checkbox"
                    value={this.props.value}
                />
                {this.props.label}
            </label>
        )
    }

}

/* *********************************************************************************************************************
 CheckBox Group
 ********************************************************************************************************************* */
class CheckBoxGroup extends StripesTheme {
    static defaultProps = {
        align: 'left',
        style: {},
        invertColors: false,
        type: 'switches',
        disabled: false,
        onChange: () => { return false; },
        onClick:  () => { return false; }
    }

    constructor(props) {
        super(props);
        var items = [];
        this.props.children.map((obj) => {
            items.push({
                dataset: this.getDataSet(obj.props),
                style: obj.props.style,
                checked: obj.props.defaultChecked,
                value: obj.props.value !== null ? obj.props.value : obj.props.children,
                children: obj.props.children
            });
        });
        this.state = {
            style: this.getStyles(),
            items: items
        }

        this.updateValue = this.updateValue.bind(this);
        this.setChecked = this.setChecked.bind(this);
    }

    getValues() {
        var values = [];
        this.state.items.map((item, i) => {
            if(item.checked) {
                values.push(item.value);
            }
        });
        return values;
    }

    updateValue(e) {
        if(this.props.disabled) {
            return false;
        }
        var pos = e.target.getAttribute("data-itemid");
        this.state.items[pos].checked = !this.state.items[pos].checked;
        //e.stopImmediatePropagation;
        this.forceUpdate();
    }

    setChecked(val, checked) {
        this.state.items.map((item, i) => {
            if(item.value == val) {
                this.state.items[i].checked = checked;
            }
        });
        this.forceUpdate();
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];
        var color = this.getColors()[this.props.type];
        var baseCheckbox = {
            float: this.props.align,
            width: spacing.width + 'px', height: spacing.height + 'px',
            border: 'solid 2px ' + (this.props.invertColors ? color.fillColorSecondary : color.fillColor),
            transition: '.5s all',
            borderRadius: spacing.borderRadius + 'px',
            marginLeft: spacing.margin + 'px',
            backgroundColor: (this.props.invertColors ? color.fillColorSecondary : color.fillColor),
            backgroundImage: color.checkImage(this.props.invertColors ? color.fillCheckColorSecondary : color.fillCheckColor),
            backgroundSize: 'cover'
        }
        var styleObj = {
            group: {
                opacity: this.props.disabled ? '.5' : '1',
                transition: '.5s opacity'
            },
            label: {
                display: 'block',
                cursor:  this.props.disabled ? 'default' : 'pointer',
                padding: spacing.padding*2 + 'px ' + spacing.padding + 'px',
                //color: color.textColor
            },
            input : {
                marginRight: spacing.padding + 'px',
                visibility: 'hidden'
            },
            checkbox: {
                inactive: Object.assign({
                    boxShadow: '0 0 0 '+spacing.width/2+'px '+(this.props.invertColors ? color.fillColor : color.fillColorSecondary)+' inset, 0 0 0 0 rgba(0,0,0,.15)'
                },baseCheckbox),
                active: Object.assign({
                    boxShadow: '0 0 0 0 '+(this.props.invertColors ? color.fillColor : color.fillColorSecondary)+' inset, 0 0 0 '+(spacing.width/1.5)+'px rgba(0,0,0,0)'
                },baseCheckbox)
            }
        };

        return styleObj;
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    render() {
        var itemNodes = [];
        this.state.items.map((item, i) => {
            itemNodes.push(
                <label key={"label" + i} style={Object.assign(item.style, this.state.style.label)} {...this.mouseEventProps(this.props)}>
                    <div style={item.checked ? this.state.style.checkbox.active : this.state.style.checkbox.inactive}></div>
                    <input
                        {...item.dataset}
                        data-itemid={i}
                        disabled={this.props.disabled}
                        onChange={this.handleSwitchOnChange}
                        onClick={this.updateValue}
                        style={this.state.style.input}
                        checked={item.checked ? 'checked' : null}
                        type="checkbox"
                        value={item.value ? item.value : ''}
                    />
                    {item.children}
                </label>);
        });
        return (
            <div {...this.getDataSet(this.props)} style={Object.assign(this.props.style, this.state.style.group)}>
                {itemNodes}
            </div>
        )
    }

}

module.exports = {
    RadioButtonGroup: RadioButtonGroup,
    CheckBoxGroup: CheckBoxGroup,
    CheckBox: CheckBox,
    Item: Item
}