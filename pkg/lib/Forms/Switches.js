"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* *********************************************************************************************************************
 Component Items
 ********************************************************************************************************************* */
var Item = function (_StripesTheme) {
    _inherits(Item, _StripesTheme);

    function Item(props) {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));
    }

    _createClass(Item, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { style: this.props.style },
                this.props.children
            );
        }
    }]);

    return Item;
}(_Stripes.StripesTheme);

/* *********************************************************************************************************************
Component RadioButton
********************************************************************************************************************* */


Item.defaultProps = {
    style: {},
    defaultChecked: false,
    value: null
};

var RadioButtonGroup = function (_StripesTheme2) {
    _inherits(RadioButtonGroup, _StripesTheme2);

    function RadioButtonGroup(props) {
        _classCallCheck(this, RadioButtonGroup);

        var _this2 = _possibleConstructorReturn(this, (RadioButtonGroup.__proto__ || Object.getPrototypeOf(RadioButtonGroup)).call(this, props));

        var items = [];
        _this2.updateValue = _this2.updateValue.bind(_this2);
        _this2.setChecked = _this2.setChecked.bind(_this2);

        _this2.props.children.map(function (obj) {
            items.push({
                style: obj.props.style,
                checked: obj.props.defaultChecked,
                value: obj.props.value ? obj.props.value : obj.props.children,
                children: obj.props.children
            });
        });
        _this2.state = {
            style: _this2.getStyles(),
            items: items
        };
        return _this2;
    }

    _createClass(RadioButtonGroup, [{
        key: 'getValues',
        value: function getValues() {
            var values = [];
            this.state.items.map(function (item, i) {
                if (item.checked) {
                    values.push(item.value);
                }
            });
            return values;
        }
    }, {
        key: 'updateValue',
        value: function updateValue(e) {
            var _this3 = this;

            if (this.props.disabled) {
                return false;
            }
            var pos = e.target.getAttribute("data-itemid") * 1;
            this.state.items.map(function (item, i) {
                _this3.state.items[i].checked = i === pos ? 'checked' : null;
            });
            //e.stopImmediatePropagation;
            this.forceUpdate();
        }
    }, {
        key: 'setChecked',
        value: function setChecked(val, checked) {
            var _this4 = this;

            this.state.items.map(function (item, i) {
                _this4.state.items[i].checked = item.value == val ? checked : null;
            });
            this.forceUpdate();
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
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
            };
            var styleObj = {
                group: {
                    opacity: this.props.disabled ? '.5' : '1',
                    transition: '.5s opacity'
                },
                label: {
                    display: 'block',
                    cursor: this.props.disabled ? 'default' : 'pointer',
                    padding: spacing.padding * 2 + 'px ' + spacing.padding + 'px'
                },
                input: {
                    marginRight: spacing.padding + 'px',
                    visibility: 'hidden'
                },
                radio: {
                    inactive: Object.assign({
                        boxShadow: '0 0 0 ' + spacing.width / 2 + 'px white inset, 0 0 0 0 rgba(0,0,0,.15)'
                    }, baseCheckbox),
                    active: Object.assign({
                        boxShadow: '0 0 0 2px white inset, 0 0 0 ' + spacing.width / 1.5 + 'px rgba(0,0,0,0)'
                    }, baseCheckbox)
                }
            };

            return styleObj;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.setState({
                    style: this.getStyles()
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var itemNodes = [];
            this.state.items.map(function (item, i) {
                itemNodes.push(_react2.default.createElement(
                    'label',
                    { 'data-itemid': i, checked: item.checked ? 'checked' : null, onClick: _this5.updateValue, key: "label" + i, style: Object.assign(item.style, _this5.state.style.label) },
                    _react2.default.createElement('div', { style: item.checked ? _this5.state.style.radio.active : _this5.state.style.radio.inactive }),
                    _react2.default.createElement('input', {
                        'data-itemid': i,
                        name: _this5.props.name,
                        disabled: _this5.props.disabled,
                        onChange: _this5.props.onChange,
                        style: _this5.state.style.input,
                        checked: item.checked ? 'checked' : null,
                        type: 'radio',
                        value: item.value
                    }),
                    item.children
                ));
            });
            return _react2.default.createElement(
                'div',
                { style: Object.assign(this.props.style, this.state.style.group) },
                itemNodes
            );
        }
    }]);

    return RadioButtonGroup;
}(_Stripes.StripesTheme);

/* *********************************************************************************************************************
 CheckBox RadioButton
 ********************************************************************************************************************* */


RadioButtonGroup.defaultProps = {
    style: {},
    type: 'switches',
    disabled: false,
    name: null,
    onChange: function onChange() {
        return false;
    },
    onClick: function onClick() {
        return false;
    }
};

var CheckBoxGroup = function (_StripesTheme3) {
    _inherits(CheckBoxGroup, _StripesTheme3);

    function CheckBoxGroup(props) {
        _classCallCheck(this, CheckBoxGroup);

        var _this6 = _possibleConstructorReturn(this, (CheckBoxGroup.__proto__ || Object.getPrototypeOf(CheckBoxGroup)).call(this, props));

        var items = [];
        _this6.props.children.map(function (obj) {
            items.push({
                style: obj.props.style,
                checked: obj.props.defaultChecked,
                value: obj.props.value ? obj.props.value : obj.props.children,
                children: obj.props.children
            });
        });
        _this6.state = {
            style: _this6.getStyles(),
            items: items
        };

        _this6.updateValue = _this6.updateValue.bind(_this6);
        _this6.setChecked = _this6.setChecked.bind(_this6);
        return _this6;
    }

    _createClass(CheckBoxGroup, [{
        key: 'getValues',
        value: function getValues() {
            var values = [];
            this.state.items.map(function (item, i) {
                if (item.checked) {
                    values.push(item.value);
                }
            });
            return values;
        }
    }, {
        key: 'updateValue',
        value: function updateValue(e) {
            if (this.props.disabled) {
                return false;
            }
            var pos = e.target.getAttribute("data-itemid");
            this.state.items[pos].checked = !this.state.items[pos].checked;
            //e.stopImmediatePropagation;
            this.forceUpdate();
        }
    }, {
        key: 'setChecked',
        value: function setChecked(val, checked) {
            var _this7 = this;

            this.state.items.map(function (item, i) {
                if (item.value == val) {
                    _this7.state.items[i].checked = checked;
                }
            });
            this.forceUpdate();
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
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
            };
            var styleObj = {
                group: {
                    opacity: this.props.disabled ? '.5' : '1',
                    transition: '.5s opacity'
                },
                label: {
                    display: 'block',
                    cursor: this.props.disabled ? 'default' : 'pointer',
                    padding: spacing.padding * 2 + 'px ' + spacing.padding + 'px'
                },
                input: {
                    marginRight: spacing.padding + 'px',
                    visibility: 'hidden'
                },
                checkbox: {
                    inactive: Object.assign({
                        boxShadow: '0 0 0 ' + spacing.width / 2 + 'px white inset, 0 0 0 0 rgba(0,0,0,.15)'
                    }, baseCheckbox),
                    active: Object.assign({
                        boxShadow: '0 0 0 0 white inset, 0 0 0 ' + spacing.width / 1.5 + 'px rgba(0,0,0,0)'
                    }, baseCheckbox)
                }
            };

            return styleObj;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.setState({
                    style: this.getStyles()
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var itemNodes = [];
            this.state.items.map(function (item, i) {
                itemNodes.push(_react2.default.createElement(
                    'label',
                    { key: "label" + i, style: Object.assign(item.style, _this8.state.style.label) },
                    _react2.default.createElement('div', { style: item.checked ? _this8.state.style.checkbox.active : _this8.state.style.checkbox.inactive }),
                    _react2.default.createElement('input', {
                        'data-itemid': i,
                        disabled: _this8.props.disabled,
                        onChange: _this8.props.onChange,
                        onClick: _this8.updateValue,
                        style: _this8.state.style.input,
                        checked: item.checked ? 'checked' : null,
                        type: 'checkbox',
                        value: item.value
                    }),
                    item.children
                ));
            });
            return _react2.default.createElement(
                'div',
                { style: Object.assign(this.props.style, this.state.style.group) },
                itemNodes
            );
        }
    }]);

    return CheckBoxGroup;
}(_Stripes.StripesTheme);

CheckBoxGroup.defaultProps = {
    style: {},
    type: 'switches',
    disabled: false,
    onChange: function onChange() {
        return false;
    },
    onClick: function onClick() {
        return false;
    }
};


module.exports = {
    RadioButtonGroup: RadioButtonGroup,
    CheckBoxGroup: CheckBoxGroup,
    Item: Item
};