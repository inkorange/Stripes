"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dialog = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _Card = require('./Card');

var _Icon = require('../Symbols/Icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = exports.Dialog = function (_StripesTheme) {
    _inherits(Dialog, _StripesTheme);

    function Dialog(props) {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

        _this.toggleDialog = _this.toggleDialog.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.open = _this.open.bind(_this);
        _this.state = {
            open: false,
            style: {}
        };
        return _this;
    }

    _createClass(Dialog, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'toggleDialog',
        value: function toggleDialog(open) {
            var _this2 = this;

            this.setState({
                open: open !== undefined ? open : !this.state.open
            }, function () {
                _this2.setState({
                    style: _this2.getStyles()
                });
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var _this3 = this;

            this.toggleDialog(false);
            setTimeout(function () {
                _this3.refs.dialogContainer.style.display = "none";
            }, 500);
        }
    }, {
        key: 'open',
        value: function open() {
            var _this4 = this;

            this.refs.dialogContainer.style.display = "block";
            setTimeout(function () {
                _this4.toggleDialog(true);
            }, 50);
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type];

            var styleObj = {
                container: {
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    display: 'none',
                    opacity: this.state.open ? 1 : 0,
                    transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                    background: 'rgba(0,0,0,.75)',
                    zIndex: spacing.menuZIndex
                },
                dialog: {
                    width: this.props.width,
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, ' + (this.state.open ? '-50%' : '-80%') + ')',
                    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
                },
                card: {
                    base: {
                        borderRadius: spacing.borderRadius + 'px'
                    },
                    header: {
                        padding: spacing.padding * 7 + "px " + spacing.padding * 4 + "px",
                        borderRadius: spacing.borderRadius + "px " + spacing.borderRadius + "px 0 0"
                    },
                    footer: {
                        padding: spacing.padding * 3 + "px " + spacing.padding * 4 + "px",
                        borderRadius: "0 0 " + spacing.borderRadius + "px " + spacing.borderRadius + "px"
                    },
                    closebutton: {
                        float: 'right',
                        cursor: 'pointer',
                        position: 'absolute',
                        top: "calc(50% - 10px)",
                        right: spacing.padding * 4 + "px "
                    }
                }
            };
            styleObj.container = Object.assign(styleObj.container, this.props.style);
            styleObj.dialog = Object.assign(styleObj.dialog, this.props.dialogStyle);
            styleObj.card.base = Object.assign(styleObj.card.base, this.props.cardStyle);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var titleNode = null;

            if (this.props.title || this.props.showClose) {
                titleNode = _react2.default.createElement(
                    'div',
                    null,
                    this.props.title,
                    this.props.showClose ? _react2.default.createElement(_Icon.Icon, { key: 'titleclose', onClick: this.close, iconid: 'close', color: 'white', size: 'xsmall', basestyle: this.state.style.card.closebutton }) : null
                );
            }
            return _react2.default.createElement(
                'section',
                { style: this.state.style.container, ref: 'dialogContainer', className: 'Dialog' },
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.dialog },
                    _react2.default.createElement(
                        _Card.Card,
                        {
                            title: titleNode,
                            actions: this.props.actions,
                            style: this.state.style.card.base,
                            headerStyle: this.state.style.card.header,
                            footerStyle: this.state.style.card.footer
                        },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return Dialog;
}(_Stripes.StripesTheme);

Dialog.defaultProps = {
    style: {},
    dialogStyle: {},
    cardStyle: {},
    type: 'default',
    showClose: false,
    modal: true,
    title: null,
    actions: null,
    width: '80%'
};