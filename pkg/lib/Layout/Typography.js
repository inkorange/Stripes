"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _Stripes2 = _interopRequireDefault(_Stripes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_Stripes$StripesTheme) {
    _inherits(Title, _Stripes$StripesTheme);

    function Title(props) {
        _classCallCheck(this, Title);

        return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).call(this, props));
    }

    _createClass(Title, [{
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type];
            var color = this.getColors()[this.props.type];
            var styleObj = {
                color: color.H1Color,
                fontWeight: 200,
                fontSize: spacing.baseFontSize * 2 + 'rem',
                lineHeight: spacing.baseFontSize * 1.75 + 'rem',
                padding: '0px',
                margin: spacing.margin * 2 + 'px ' + '0px'
            };
            return Object.assign(styleObj, this.props.style);
        }
    }, {
        key: 'render',
        value: function render() {
            var style = this.getStyles();
            return _react2.default.createElement(
                'header',
                {
                    style: style
                },
                this.props.children
            );
        }
    }]);

    return Title;
}(_Stripes2.default.StripesTheme);

Title.defaultProps = {
    type: 'typography',
    style: {}
};

var A = function (_Stripes$StripesTheme2) {
    _inherits(A, _Stripes$StripesTheme2);

    function A(props) {
        _classCallCheck(this, A);

        var _this2 = _possibleConstructorReturn(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, props));

        _this2.state = {
            hover: false
        };
        return _this2;
    }

    _createClass(A, [{
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type];
            var color = this.getColors()[this.props.type];
            var styleObj = {
                base: {
                    color: color.aColor,
                    textDecoration: 'none',
                    fontWeight: 200
                },
                hover: {
                    color: color.aHoverColor,
                    textDecoration: 'none',
                    fontWeight: 200
                }
            };
            styleObj.base = Object.assign(styleObj.base, this.props.style);
            styleObj.hover = Object.assign(styleObj.hover, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var style = this.getStyles();
            var dataprops = {};
            Object.keys(this.props).map(function (k) {
                if (k.indexOf('data-') >= 0) {
                    dataprops[k] = _this3.props[k];
                }
            });
            return _react2.default.createElement(
                'a',
                _extends({
                    style: !this.props.disabled && this.state.hover ? style.hover : style.base,
                    href: this.props.href,
                    target: this.props.target
                }, dataprops, {
                    onClick: !this.props.disabled ? this.props.onClick : function () {
                        return false;
                    },
                    onMouseOver: this.mouseOver, onMouseOut: this.mouseOut
                }),
                this.props.children
            );
        }
    }]);

    return A;
}(_Stripes2.default.StripesTheme);

A.defaultProps = {
    type: 'typography',
    style: {},
    href: "#",
    target: null,
    disabled: false
};

var H1 = function (_Stripes$StripesTheme3) {
    _inherits(H1, _Stripes$StripesTheme3);

    function H1(props) {
        _classCallCheck(this, H1);

        return _possibleConstructorReturn(this, (H1.__proto__ || Object.getPrototypeOf(H1)).call(this, props));
    }

    _createClass(H1, [{
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type];
            var color = this.getColors()[this.props.type];
            var styleObj = {
                color: color.H1Color,
                fontWeight: 200,
                fontSize: spacing.baseFontSize * 1.75 + 'rem',
                padding: '0px',
                margin: spacing.margin * 1.5 + 'px ' + '0px'
            };

            return Object.assign(styleObj, this.props.style);
        }
    }, {
        key: 'render',
        value: function render() {
            var style = this.getStyles();
            return _react2.default.createElement(
                'h1',
                {
                    style: style
                },
                this.props.children
            );
        }
    }]);

    return H1;
}(_Stripes2.default.StripesTheme);

H1.defaultProps = {
    type: 'typography',
    style: {}
};

var H3 = function (_Stripes$StripesTheme4) {
    _inherits(H3, _Stripes$StripesTheme4);

    function H3(props) {
        _classCallCheck(this, H3);

        return _possibleConstructorReturn(this, (H3.__proto__ || Object.getPrototypeOf(H3)).call(this, props));
    }

    _createClass(H3, [{
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type];
            var color = this.getColors()[this.props.type];
            var styleObj = {
                color: color.H3Color,
                fontWeight: 200,
                fontSize: spacing.baseFontSize * 1.25 + 'rem',
                padding: '0px',
                margin: spacing.padding + 'px ' + '0px'
            };
            return Object.assign(styleObj, this.props.style);
        }
    }, {
        key: 'render',
        value: function render() {
            var style = this.getStyles();
            return _react2.default.createElement(
                'h3',
                {
                    style: style
                },
                this.props.children
            );
        }
    }]);

    return H3;
}(_Stripes2.default.StripesTheme);

H3.defaultProps = {
    type: 'typography',
    style: {}
};


module.exports = {
    H1: H1,
    H3: H3,
    Title: Title,
    A: A
    //comp2: Component2
};