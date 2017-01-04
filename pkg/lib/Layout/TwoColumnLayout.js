"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TwoColumnLayout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TwoColumnLayout = exports.TwoColumnLayout = function (_StripesTheme) {
    _inherits(TwoColumnLayout, _StripesTheme);

    function TwoColumnLayout(props) {
        _classCallCheck(this, TwoColumnLayout);

        var _this = _possibleConstructorReturn(this, (TwoColumnLayout.__proto__ || Object.getPrototypeOf(TwoColumnLayout)).call(this, props));

        _this.state = {
            disabled: props.disabled,
            style: _this.getStyles()
        };
        return _this;
    }

    _createClass(TwoColumnLayout, [{
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type];
            var styleObj = {
                base: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginBottom: spacing.padding + 'px'
                },
                left: {
                    width: this.props.columnOneWidth ? 'calc(' + this.props.columnOneWidth + ' - ' + spacing.padding + 'px)' : 'calc(50% - ' + spacing.padding + 'px)',
                    marginRight: spacing.padding + 'px',
                    textAlign: 'left'

                },
                right: {
                    width: this.props.columnTwoWidth ? 'calc(' + this.props.columnTwoWidth + ' - ' + spacing.padding + 'px)' : 'calc(50% - ' + spacing.padding + 'px)',
                    textAlign: 'left'
                }
            };

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {

            var baseStyle = Object.assign(this.state.style.base, this.props.style);

            return _react2.default.createElement(
                'section',
                { className: 'TwoColumnLayout', style: baseStyle },
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.left, key: 'column1' },
                    this.props.columnOne
                ),
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.right, key: 'column2' },
                    this.props.columnTwo
                )
            );
        }
    }]);

    return TwoColumnLayout;
}(_Stripes.StripesTheme);

TwoColumnLayout.defaultProps = {
    columnOne: '',
    columnTwo: '',
    columnOneWidth: '50%',
    columnTwoWidth: '50%',
    columnOneStyle: {},
    columnTwoStyle: {},
    style: {},
    type: 'default'
};