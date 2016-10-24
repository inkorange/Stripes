"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

/* *********************************************************************************************************************
 Component RadioButton
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
            <div style={this.props.style}>
                {this.props.children}
            </div>
        )
    }

}

/* *********************************************************************************************************************
Component RadioButton
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
        var items = [];
        this.updateValue = this.updateValue.bind(this);
        this.setChecked = this.setChecked.bind(this);

        this.props.children.map((obj) => {
            items.push({
                style: obj.props.style,
                checked: obj.props.defaultChecked,
                value: obj.props.value ? obj.props.value : obj.props.children,
                children: obj.props.children
            });
        });
        this.state = {
            style: this.getStyles(),
            items: items
        }
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
        var pos = e.target.getAttribute("data-itemid")*1;
        this.state.items.map((item, i) => {
            this.state.items[i].checked = i === pos ? 'checked' : null;
        });
        //e.stopImmediatePropagation;
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
                <label data-itemid={i} checked={item.checked ? 'checked' : null} onClick={this.updateValue} key={"label" + i} style={Object.assign(item.style, this.state.style.label)}>
                    <div style={item.checked ? this.state.style.radio.active : this.state.style.radio.inactive}></div>
                    <input
                        data-itemid={i}
                        name={this.props.name}
                        disabled={this.props.disabled}
                        onChange={this.props.onChange}
                        style={this.state.style.input}
                        checked={item.checked ? 'checked' : null}
                        type="radio"
                        value={item.value}
                    />
                    {item.children}
                </label>);
        });
        return (
            <div style={Object.assign(this.props.style, this.state.style.group)}>
                {itemNodes}
            </div>
        )
    }

}

/* *********************************************************************************************************************
 CheckBox RadioButton
 ********************************************************************************************************************* */
class CheckBoxGroup extends StripesTheme {
    static defaultProps = {
        style: {},
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
                style: obj.props.style,
                checked: obj.props.defaultChecked,
                value: obj.props.value ? obj.props.value : obj.props.children,
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
            float: 'left',
            width: spacing.width + 'px', height: spacing.height + 'px',
            border: 'solid 2px ' + color.borderColor,
            transition: '.5s all',
            borderRadius: spacing.borderRadius + 'px',
            marginLeft: spacing.margin + 'px',
            backgroundColor: color.fillColor,
            backgroundImage: color.checkImage,
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
            },
            input : {
                marginRight: spacing.padding + 'px',
                visibility: 'hidden'
            },
            checkbox: {
                inactive: Object.assign({
                            boxShadow: '0 0 0 '+spacing.width/2+'px white inset, 0 0 0 0 rgba(0,0,0,.15)'
                        },baseCheckbox),
                active: Object.assign({
                            boxShadow: '0 0 0 0 white inset, 0 0 0 '+(spacing.width/1.5)+'px rgba(0,0,0,0)'
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
                <label key={"label" + i} style={Object.assign(item.style, this.state.style.label)}>
                    <div style={item.checked ? this.state.style.checkbox.active : this.state.style.checkbox.inactive}></div>
                    <input
                        data-itemid={i}
                        disabled={this.props.disabled}
                        onChange={this.props.onChange}
                        onClick={this.updateValue}
                        style={this.state.style.input}
                        checked={item.checked ? 'checked' : null}
                        type="checkbox"
                        value={item.value}
                    />
                    {item.children}
                </label>);
        });
        return (
            <div style={Object.assign(this.props.style, this.state.style.group)}>
                {itemNodes}
            </div>
        )
    }

}

module.exports = {
    RadioButtonGroup: RadioButtonGroup,
    CheckBoxGroup: CheckBoxGroup,
    Item: Item
}