"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _Icon = require('../Symbols/Icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = exports.NavBar = function (_StripesTheme) {
    _inherits(NavBar, _StripesTheme);

    function NavBar(props) {
        _classCallCheck(this, NavBar);

        var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

        _this.state = {
            style: {}
        };
        return _this;
    }

    _createClass(NavBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];

            var styleObj = {
                title: {
                    padding: '0 ' + spacing.padding + 'px'
                },
                base: {
                    backgroundColor: color.background,
                    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    minHeight: spacing.minHeight + 'px',
                    lineHeight: spacing.minHeight + 'px',
                    padding: '0 ' + spacing.padding + 'px',
                    color: color.textColor,
                    fontSize: spacing.fontSize
                },
                rightside: {
                    position: 'absolute',
                    right: spacing.padding + 'px'
                }
            };
            styleObj.base = Object.assign(styleObj.base, this.props.style);

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var Title = this.props.title ? _react2.default.createElement(
                'span',
                { style: this.state.style.title },
                this.props.title
            ) : null;
            return _react2.default.createElement(
                'section',
                { style: this.state.style.base },
                this.props.leftIcon,
                Title,
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.rightside },
                    this.props.children
                )
            );
        }
    }]);

    return NavBar;
}(_Stripes.StripesTheme);

NavBar.defaultProps = {
    style: {},
    type: 'navbar',
    title: null,
    leftIcon: null
};