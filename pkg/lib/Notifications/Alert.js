"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Alert = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Alert = exports.Alert = function (_StripesTheme) {
    _inherits(Alert, _StripesTheme);

    function Alert(props) {
        _classCallCheck(this, Alert);

        var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

        _this.state = {
            disabled: props.disabled,
            style: {}
        };
        return _this;
    }

    _createClass(Alert, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var alertNODE = this.refs.Alert;
            this.setState({
                style: this.getStyles()
            });
            alertNODE.addEventListener("transitionend", function () {
                if (alertNODE.style.opacity == 0) {
                    alertNODE.style.display = 'none';
                }
            }, false);
            this.animateShow(this.refs.Alert, this.props.show);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(props) {
            if (this.props.show != props.show) {
                this.animateShow(this.refs.Alert, props.show);
            }
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];

            var alertNODE = this.refs.Alert;
            var parentNODE = alertNODE.parentNode;
            var styleObj = {
                height: this.props.height + spacing.padding * 2 + 'px',
                lineHeight: this.props.height + 'px',
                position: 'absolute',
                backgroundColor: color.backgroundColor,
                color: 'white',
                padding: spacing.padding + 'px ' + spacing.padding * 2 + 'px',
                whiteSpace: 'nowrap',
                borderRadius: '4px',
                opacity: 0,
                display: this.props.show ? 'inline-block' : 'none',
                right: this.props.position === 'left' ? parentNODE.offsetWidth + 10 + 'px' : null,
                left: this.props.position === 'right' ? parentNODE.offsetWidth + 10 + 'px' : null,
                top: 'calc(50% - ' + (this.props.height + spacing.padding * 2) / 2 + 'px)'
            };
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { ref: 'Alert', onClick: this.props.onClick, style: this.state.style },
                this.props.children
            );
        }
    }]);

    return Alert;
}(_Stripes.StripesTheme);

Alert.defaultProps = {
    onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    },
    position: 'left',
    type: 'notification',
    height: 26,
    show: true
};