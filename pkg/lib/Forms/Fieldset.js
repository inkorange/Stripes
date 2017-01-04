"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Fieldset = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fieldset = exports.Fieldset = function (_StripesTheme) {
    _inherits(Fieldset, _StripesTheme);

    function Fieldset(props) {
        _classCallCheck(this, Fieldset);

        var _this = _possibleConstructorReturn(this, (Fieldset.__proto__ || Object.getPrototypeOf(Fieldset)).call(this, props));

        _this.state = {
            style: _this.getStyles()
        };
        return _this;
    }

    _createClass(Fieldset, [{
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
            var styleObj = {
                base: {
                    border: 'none',
                    margin: spacing.padding * 2 + 'px' + ' 0',
                    padding: 0,
                    position: 'relative',
                    display: this.props.visible ? 'block' : 'none',
                    opacity: this.props.disabled ? '.25' : '1.0'
                },
                label: {
                    fontSize: '1.8rem',
                    margin: spacing.padding * 2 + 'px' + ' 0',
                    lineHeight: spacing.padding * 4 + 'px',
                    display: 'block',
                    color: color.textColor
                }
            };

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var baseStyle = Object.assign(this.state.style.base, this.props.style);
            return _react2.default.createElement(
                'fieldset',
                {
                    style: baseStyle,
                    disabled: this.props.disabled
                },
                _react2.default.createElement(
                    'label',
                    { style: this.state.style.label },
                    this.props.title
                ),
                this.props.children
            );
        }
    }]);

    return Fieldset;
}(_Stripes.StripesTheme);

Fieldset.defaultProps = {
    style: {},
    depth: 1,
    className: '',
    type: 'default',
    disabled: false,
    visible: true
};