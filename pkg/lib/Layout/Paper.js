"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Paper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paper = exports.Paper = function (_StripesTheme) {
    _inherits(Paper, _StripesTheme);

    function Paper(props) {
        _classCallCheck(this, Paper);

        var _this = _possibleConstructorReturn(this, (Paper.__proto__ || Object.getPrototypeOf(Paper)).call(this, props));

        _this.state = {
            disabled: props.disabled
        };
        _this.focus = _this.focus.bind(_this);
        return _this;
    }

    _createClass(Paper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.refs.Paper.focus();
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];

            var styleObj = {
                outline: 'none',
                background: 'white',
                borderRadius: '2px',
                display: 'inline-block',
                padding: spacing.padding * 2 + 'px',
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                boxShadow: "0 " + (this.props.depth * 3.5 - 1) + "px " + this.props.depth * 10 + "px rgba(0,0,0,0." + this.props.depth + "), 0 " + this.props.depth * 3 + "px 10px rgba(0,0,0,0.1)"
            };
            return Object.assign(styleObj, this.props.style);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { style: this.state.style, tabIndex: '1', ref: 'Paper', onBlur: this.props.onBlur, className: "Paper " + this.props.className },
                this.props.children
            );
        }
    }]);

    return Paper;
}(_Stripes.StripesTheme);

Paper.defaultProps = {
    style: {},
    depth: 1,
    className: '',
    type: 'default',
    onBlur: function onBlur() {
        return false;
    }
};