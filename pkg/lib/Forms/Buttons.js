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

var FlatButton = function (_StripesTheme) {
    _inherits(FlatButton, _StripesTheme);

    function FlatButton(props) {
        _classCallCheck(this, FlatButton);

        var _this = _possibleConstructorReturn(this, (FlatButton.__proto__ || Object.getPrototypeOf(FlatButton)).call(this, props));

        var color = _this.getColors()[props.type];
        var component = _this.getStyles();
        _this.state = {
            hover: false,
            disabled: props.disabled,
            style: Object.assign({
                backgroundColor: color.backgroundColor
            }, component.button),
            hoverStyle: Object.assign({
                backgroundColor: color.backgroundHover
            }, component.button),
            inkStyle: component.ink
        };
        return _this;
    }

    _createClass(FlatButton, [{
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type];
            var color = this.getColors()[this.props.type];
            var styleObj = {
                button: {
                    color: color.textColor,
                    borderRadius: spacing.borderRadius + 'px',
                    fontWeight: 500,
                    fontSize: '1.4rem',
                    border: 'none',
                    verticalAlign: 'middle',
                    letterSpacing: '0px',
                    textTransform: 'uppercase',
                    outline: 'none',
                    padding: spacing.padding * 2 + 'px ' + spacing.padding * 4 + 'px',
                    margin: spacing.padding + 'px ',
                    transition: '.5s background-color',
                    opacity: this.props.disabled ? .5 : 1.0,
                    cursor: this.props.disabled ? 'default' : 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                },
                ink: this.getBaseStyling(spacing, color).animation.ink
            };
            styleObj.button = Object.assign(styleObj.button, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'button',
                {
                    className: 'FlatButton',
                    style: this.state.hover ? this.state.hoverStyle : this.state.style,
                    onMouseOver: this.mouseOver, onMouseOut: this.mouseOut,
                    onMouseDown: this.animateBackground,
                    onClick: this.handleClick,
                    label: this.props.label
                },
                this.props.children,
                _react2.default.createElement('span', { className: 'ink', style: this.state.inkStyle })
            );
        }
    }]);

    return FlatButton;
}(_Stripes.StripesTheme);

FlatButton.defaultProps = {
    type: 'default',
    disabled: false,
    label: null,
    style: {},
    onClick: function onClick() {
        return false;
    }
};

var RaisedButton = function (_StripesTheme2) {
    _inherits(RaisedButton, _StripesTheme2);

    function RaisedButton(props) {
        _classCallCheck(this, RaisedButton);

        var _this2 = _possibleConstructorReturn(this, (RaisedButton.__proto__ || Object.getPrototypeOf(RaisedButton)).call(this, props));

        var color = _this2.getColors()[props.type];
        var component = _this2.getStyles();
        _this2.state = {
            hover: false,
            disabled: props.disabled,
            style: Object.assign({
                backgroundColor: color.backgroundColor
            }, component.button),
            hoverStyle: Object.assign({
                backgroundColor: color.backgroundHover
            }, component.button),
            inkStyle: component.ink
        };
        return _this2;
    }

    _createClass(RaisedButton, [{
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type];
            var color = this.getColors()[this.props.type];
            var styleObj = {
                button: {
                    color: color.textColor,
                    borderRadius: spacing.borderRadius + 'px',
                    fontWeight: 500,
                    fontSize: '1.4rem',
                    border: 'none',
                    verticalAlign: 'middle',
                    letterSpacing: '0px',
                    textTransform: 'uppercase',
                    outline: 'none',
                    padding: spacing.padding * 2 + 'px ' + spacing.padding * 4 + 'px',
                    margin: spacing.padding + 'px ',
                    transition: '.5s background-color',
                    opacity: this.props.disabled ? .5 : 1.0,
                    cursor: this.props.disabled ? 'default' : 'pointer',
                    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
                    position: 'relative',
                    overflow: 'hidden'
                },
                ink: this.getBaseStyling(spacing, color).animation.ink
            };
            styleObj.button = Object.assign(styleObj.button, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'button',
                {
                    className: 'RaisedButton',
                    style: this.state.hover ? this.state.hoverStyle : this.state.style,
                    onMouseOver: this.mouseOver, onMouseOut: this.mouseOut,
                    onMouseDown: this.animateBackground,
                    onClick: this.handleClick,
                    label: this.props.label
                },
                this.props.children,
                _react2.default.createElement('span', { className: 'ink', style: this.state.inkStyle })
            );
        }
    }]);

    return RaisedButton;
}(_Stripes.StripesTheme);

RaisedButton.defaultProps = {
    type: 'default',
    disabled: false,
    label: null,
    style: {},
    onClick: function onClick() {
        return false;
    }
};


module.exports = {
    FlatButton: FlatButton,
    RaisedButton: RaisedButton
};