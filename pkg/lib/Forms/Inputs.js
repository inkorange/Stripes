"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _SelectPanel = require('./SelectPanel.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* *********************************************************************************************************************
 Component TextBox
 ********************************************************************************************************************* */
var TextBox = function (_StripesTheme) {
    _inherits(TextBox, _StripesTheme);

    function TextBox(props) {
        _classCallCheck(this, TextBox);

        var _this = _possibleConstructorReturn(this, (TextBox.__proto__ || Object.getPrototypeOf(TextBox)).call(this, props));

        var suggestionItems = [];

        _this.state = {
            style: _this.getStyles(),
            active: false,
            value: '',
            suggestionItems: []
        };
        _this.onChange = _this.onChange.bind(_this);
        _this.applyValue = _this.applyValue.bind(_this);
        _this.onCompleteInputBlur = _this.onCompleteInputBlur.bind(_this);
        return _this;
    }

    _createClass(TextBox, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.setState({
                    style: this.getStyles(),
                    value: this.props.value
                });
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var _this2 = this;

            var val = e.target.value !== '' ? e.target.value : null;
            if (val !== this.state.value) {
                this.setState({
                    value: val,
                    suggestionItems: this.getSuggestions(val)
                }, function () {
                    if (_this2.props.showSuggestions && _this2.state.suggestionItems.length) {
                        _this2.refs.selectPanel.open(false);
                    } else if (_this2.refs.selectPanel) {
                        _this2.refs.selectPanel.close();
                    }
                });
            }
            if (this.props.onChange) {
                this.props.onChange(e, val);
            }
        }
    }, {
        key: 'getSuggestions',
        value: function getSuggestions(term) {
            if (!term) {
                return [];
            }
            term = term.toUpperCase();
            var results = [];
            this.props.suggestionData.map(function (v) {
                if (v.toUpperCase().indexOf(term) >= 0) {
                    results.push({
                        label: v,
                        value: v
                    });
                }
            });

            return this.sortResults(results);
        }
    }, {
        key: 'sortResults',
        value: function sortResults(results) {
            return results.sort(function (a, b) {
                return a.code > b.code ? 1 : b.code > a.code ? -1 : 0;
            });
        }
    }, {
        key: 'applyValue',
        value: function applyValue(val) {
            var _this3 = this;

            if (val !== undefined) {
                this.setState({
                    value: val.value
                }, function () {
                    _this3.refs.input.value = _this3.state.value ? _this3.state.value : null;
                    _this3.refs.input.focus();
                });
            }
        }
    }, {
        key: 'onCompleteInputBlur',
        value: function onCompleteInputBlur(e) {
            var _this4 = this;

            setTimeout(function () {
                var target = document.activeElement;
                //console.log(target, target.className);
                if (target.className !== "SelectPanel" && _this4.props.showSuggestions) {
                    _this4.refs.selectPanel.close();
                    _this4.onInputBlur(e);
                } else if (!_this4.props.showSuggestions) {
                    _this4.onInputBlur(e);
                }
            }, 1);
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];
            var styleObj = this.getBaseStyling(spacing, color).inputs;
            styleObj.active.on = Object.assign(styleObj.active.on, styleObj.active.base);
            styleObj.active.off = Object.assign(styleObj.active.off, styleObj.active.base);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.suggestions) {
                this.state.style.container.display = "inline-block";
                this.state.style.container.width = this.props.width;
                this.state.style.input.width = "100%";
            }
            var anchorNode = null;
            if (this.props.anchor) {
                anchorNode = _react2.default.createElement(
                    'div',
                    { onClick: this.onInputClick, style: this.state.style.anchor },
                    this.props.anchor
                );
            }
            return _react2.default.createElement(
                'div',
                { style: this.state.style.container },
                _react2.default.createElement('input', {
                    ref: 'input',
                    disabled: this.props.disabled ? 'disabled' : null,
                    readOnly: this.props.readOnly ? 'readonly' : null,
                    placeholder: this.props.placeholder,
                    onClick: this.onInputClick,
                    onBlur: this.onCompleteInputBlur,
                    onChange: this.onChange,
                    style: this.state.style.input
                }),
                anchorNode,
                _react2.default.createElement('span', { style: this.state.active ? this.state.style.active.on : this.state.style.active.off }),
                this.props.showSuggestions ? _react2.default.createElement(_SelectPanel.SelectPanel, {
                    ref: 'selectPanel',
                    data: this.state.suggestionItems,
                    onSelect: this.applyValue,
                    onClose: this.onInputBlur
                }) : null,
                _react2.default.createElement(
                    'span',
                    { style: this.state.style.error },
                    this.props.error
                )
            );
        }
    }]);

    return TextBox;
}(_Stripes.StripesTheme);

/* *********************************************************************************************************************
 Component TextArea
 ********************************************************************************************************************* */


TextBox.defaultProps = {
    style: {},
    type: 'inputs',
    value: '',
    placeholder: null,
    error: null,
    width: null,
    showSuggestions: false,
    suggestionData: [],
    anchor: null,
    onClick: null,
    onChange: null,
    disabled: false,
    readOnly: false
};

var TextArea = function (_StripesTheme2) {
    _inherits(TextArea, _StripesTheme2);

    function TextArea(props) {
        _classCallCheck(this, TextArea);

        var _this5 = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

        _this5.state = {
            style: _this5.getStyles(),
            active: false
        };
        return _this5;
    }

    _createClass(TextArea, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.setState({
                    style: this.getStyles()
                });
            }
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];
            var styleObj = this.getBaseStyling(spacing, color).inputs;

            styleObj.active.on = Object.assign(styleObj.active.on, styleObj.active.base);
            styleObj.active.off = Object.assign(styleObj.active.off, styleObj.active.base);

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: this.state.style.container },
                _react2.default.createElement('textarea', {
                    placeholder: this.props.placeholder,
                    onClick: this.onInputClick,
                    onBlur: this.onInputBlur,
                    style: this.state.style.input
                }),
                _react2.default.createElement('span', { style: this.state.active ? this.state.style.active.on : this.state.style.active.off }),
                _react2.default.createElement(
                    'span',
                    { style: this.state.style.error },
                    this.props.error
                )
            );
        }
    }]);

    return TextArea;
}(_Stripes.StripesTheme);

/* *********************************************************************************************************************
 Component DropDown
 ********************************************************************************************************************* */


TextArea.defaultProps = {
    style: {},
    type: 'inputs',
    value: '',
    placeholder: null,
    error: null,
    width: null
};

var DropDown = function (_StripesTheme3) {
    _inherits(DropDown, _StripesTheme3);

    function DropDown(props) {
        _classCallCheck(this, DropDown);

        var _this6 = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));

        var items = [];
        _this6.toggleSelect = _this6.toggleSelect.bind(_this6);
        _this6.applyValue = _this6.applyValue.bind(_this6);
        _this6.getValue = _this6.getValue.bind(_this6);
        _this6.props.children.map(function (obj) {
            var label = obj.props.label ? obj.props.label : obj.props.children;
            items.push({
                checked: obj.props.defaultChecked,
                label: label,
                value: obj.props.value === undefined ? label : obj.props.value
            });
        });
        _this6.state = {
            style: _this6.getStyles(),
            items: items,
            active: false,
            value: null,
            label: null
        };
        return _this6;
    }

    _createClass(DropDown, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.setState({
                    style: this.getStyles()
                });
            }
        }
    }, {
        key: 'applyValue',
        value: function applyValue(val) {
            var _this7 = this;

            if (val !== undefined) {
                this.setState({
                    value: val.value,
                    label: val.value ? val.label : null
                }, function () {
                    _this7.refs.input.value = _this7.state.value ? _this7.state.label : null;
                });
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value;
        }
    }, {
        key: 'toggleSelect',
        value: function toggleSelect() {
            this.onInputClick();
            this.refs.selectPanel.open();
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
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
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: this.state.style.container },
                _react2.default.createElement('input', {
                    ref: 'input',
                    placeholder: this.props.placeholder,
                    onClick: this.toggleSelect,
                    style: this.state.style.input,
                    readOnly: 'readonly'
                }),
                _react2.default.createElement('span', { style: this.state.active ? this.state.style.active.on : this.state.style.active.off }),
                _react2.default.createElement(_SelectPanel.SelectPanel, {
                    ref: 'selectPanel',
                    data: this.state.items,
                    onSelect: this.applyValue,
                    onClose: this.onInputBlur
                }),
                _react2.default.createElement(
                    'span',
                    { style: this.state.style.error },
                    this.props.error
                )
            );
        }
    }]);

    return DropDown;
}(_Stripes.StripesTheme);

DropDown.defaultProps = {
    style: {},
    type: 'inputs',
    placeholder: 'Select...',
    error: null,
    width: null,
    showEmpty: false,
    onChange: function onChange() {
        return false;
    }
};


module.exports = {
    TextBox: TextBox,
    TextArea: TextArea,
    DropDown: DropDown
};