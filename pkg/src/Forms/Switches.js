"use strict";

import React from 'react'
import { StripesTheme } from '../Core/Stripes'
import { autobind } from 'core-decorators';

/* *********************************************************************************************************************
 Component Items
 ********************************************************************************************************************* */
class Item extends StripesTheme {
    static defaultProps = {
        style:  null,
        defaultChecked: false,
        value: null,
        disabled: false,
        className: null
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div {...this.props} {...this.props.dataset} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }

}

/* *********************************************************************************************************************
Component RadioButtonGroup
********************************************************************************************************************* */
@autobind
class RadioButtonGroup extends StripesTheme {
    static defaultProps = {
        style: {},
        type: 'switches',
        disabled: false,
        name: null,
        onChange: () => { return false; },
        onClick:  () => { return false; }
    };

    constructor(props) {
        super(props);
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
        let items = [];
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
        let values = [];
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
        let isChanged = true;
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
        let spacing = this.getSpacing()[this.props.type];
        let color = this.getColors()[this.props.type];
        let baseCheckbox = {
            float: 'left',
            width: spacing.width + 'px', height: spacing.height + 'px',
            border: 'solid 2px ' + color.fillColor,
            transition: '.5s all',
            borderRadius: '50%',
            marginLeft: spacing.margin + 'px',
            backgroundColor: color.fillColor
        };
        return {
            group: {
                opacity: this.props.disabled ? '.5' : '1',
                transition: '.5s opacity',
            },
            label: {
                display: 'block',
                cursor:  this.props.disabled ? 'default' : 'pointer',
                padding: spacing.padding + 'px 0',
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
    }

    render() {
        var itemNodes = [];
        this.state.items.map((item, i) => {
            itemNodes.push(
                <label data-itemid={i} checked={item.checked ? 'checked' : null} key={"label" + i} style={this.hardExtend(item.style, this.state.style.label)}>
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
            <div {...this.getDataSet(this.props)} style={this.hardExtend(this.props.style, this.state.style.group)}>
                {itemNodes}
            </div>
        )
    }
    // checked={item.checked ? 'checked' : null} // not sure I need this anymore.
}

/* *********************************************************************************************************************
 CheckBox Single Component
 ********************************************************************************************************************* */
@autobind
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
        value: '',
        className: null
    };

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles(),
            checked: this.props.checked
        };
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
                this.props.onChange(this.state.checked, this.props.value, this.props);
        });
    }

    getStyles() {
        const spacing = this.getSpacing()[this.props.type];
        const color = this.getColors()[this.props.type];
        let baseCheckbox = {
            float: this.props.align,
            width: spacing.width + 'px', height: spacing.height + 'px',
            border: 'solid 2px ' + (this.props.invertColors ? color.fillColorSecondary : color.fillColor),
            transition: '.5s all',
            borderRadius: spacing.borderRadius + 'px',
            backgroundColor: (this.props.invertColors ? color.fillColorSecondary : color.fillColor),
            backgroundImage: color.checkImage(this.props.invertColors ? color.fillCheckColorSecondary : color.fillCheckColor),
            backgroundSize: 'cover'
        };
        return {
            label: {
                opacity: this.props.disabled ? '.5' : '1',
                //color: color.textColor,
                transition: '.5s opacity',
                display: 'block',
                cursor:  this.props.disabled ? 'default' : 'pointer',
                padding: this.props.label ? spacing.padding + 'px ' + spacing.padding + 'px ' + spacing.padding + 'px 0' : 0
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
    }

    render() {
        const checked = this.state.checked ? {checked: 'checked'} : null;
        return (
            <label className={this.props.className} style={this.hardExtend(this.props.style, this.state.style.label)} {...this.mouseEventProps(this.props)}>
                <div style={this.state.checked ? this.state.style.checkbox.active : this.state.style.checkbox.inactive}></div>
                <input
                    {...this.getDataSet(this.props)}
                    disabled={this.props.disabled}
                    onChange={this.updateValue}
                    style={this.state.style.input}
                    {...checked}
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
@autobind
class CheckBoxGroup extends StripesTheme {
    static defaultProps = {
        align: 'left',
        style: {},
        invertColors: false,
        type: 'switches',
        disabled: false,
        onChange: () => { return false; }
    };

    constructor(props) {
        super(props);
        this.state = {
            style: this.getStyles(),
            items: this.resolveChildren()
        };
    }

    resolveChildren() {
        let items = [];
        this.props.children.map((obj) => {
            items.push({
                dataset: this.getDataSet(obj.props),
                style: obj.props.style,
                className: obj.props.className,
                checked: obj.props.defaultChecked,
                value: obj.props.value !== null ? obj.props.value : obj.props.children,
                children: obj.props.children,
                disabled: obj.props.disabled
            });
        });
        return items;
    }

    getValues() {
        let values = [];
        this.state.items.map((item, i) => {
            if(item.checked) {
                values.push(item.value);
            }
        });
        return values;
    }

    updateValue(checked, value, props) {
        if(this.props.disabled) {
            return false;
        }
        let pos = props["data-itemid"];
        this.state.items[pos].checked = !this.state.items[pos].checked;
        this.forceUpdate();
        this.props.onChange(checked, this.getValues(), props);
    }

    setChecked(val, checked) {
        this.state.items.map((item, i) => {
            if(item.value === val) {
                this.state.items[i].checked = checked;
            }
        });
        this.forceUpdate();
    }

    getStyles() {
        const spacing = this.getSpacing()[this.props.type];
        const color = this.getColors()[this.props.type];
        let baseCheckbox = {
            float: this.props.align,
            width: spacing.width + 'px', height: spacing.height + 'px',
            border: 'solid 2px ' + (this.props.invertColors ? color.fillColorSecondary : color.fillColor),
            transition: '.5s all',
            borderRadius: spacing.borderRadius + 'px',
            marginLeft: spacing.margin + 'px',
            backgroundColor: (this.props.invertColors ? color.fillColorSecondary : color.fillColor),
            backgroundImage: color.checkImage(this.props.invertColors ? color.fillCheckColorSecondary : color.fillCheckColor),
            backgroundSize: 'cover'
        };
        return {
            group: {
                opacity: this.props.disabled ? '.5' : '1',
                transition: '.5s opacity'
            },
            label: {
                display: 'block',
                cursor:  this.props.disabled ? 'default' : 'pointer',
                padding: spacing.padding*2 + 'px ' + spacing.padding + 'px',
            },
            labelDisabled : {
                display: 'block',
                cursor:  this.props.disabled ? 'default' : 'pointer',
                padding: spacing.padding*2 + 'px ' + spacing.padding + 'px',
                opacity: '.5'
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
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles(),
                items: props.children !== this.props.children ? this.resolveChildren() : this.state.items
            });
        }
    }

    render() {
        let itemNodes = [];
        this.state.items.map((item, i) => {
            itemNodes.push(
                <CheckBox
                    key={"label" + i}
                    checked={item.checked ? 'checked' : null}
                    {...item.dataset}
                    data-itemid={i}
                    className={item.className}
                    disabled={item.disabled}
                    onChange={this.updateValue}
                    value={item.value ? item.value : ''}
                    label={item.children}
                />
            );
        });
        return (
            <div {...this.getDataSet(this.props)} style={this.hardExtend(this.props.style, this.state.style.group)}>
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
};