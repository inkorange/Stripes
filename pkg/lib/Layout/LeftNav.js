"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LeftNav = undefined;

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

var LeftNav = exports.LeftNav = function (_StripesTheme) {
    _inherits(LeftNav, _StripesTheme);

    function LeftNav(props) {
        _classCallCheck(this, LeftNav);

        var _this = _possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).call(this, props));

        _this.state = {
            disabled: props.disabled,
            open: props.open,
            style: {}
        };
        _this.focus = _this.focus.bind(_this);
        _this.toggleOnBlur = _this.toggleOnBlur.bind(_this);
        _this.toggleMenu = _this.toggleMenu.bind(_this);
        return _this;
    }

    _createClass(LeftNav, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'toggleMenu',
        value: function toggleMenu(e, open) {
            var _this2 = this;

            this.setState({
                open: open !== undefined ? open : !this.state.open
            }, function () {
                if (_this2.state.open) {
                    _this2.refs.LeftNav.focus();
                }
                _this2.setState({
                    style: _this2.getStyles()
                });
            });
        }
    }, {
        key: 'toggleOnBlur',
        value: function toggleOnBlur(e) {
            var _this3 = this;

            if (this.props.closeOnBlur) {
                setTimeout(function () {
                    var target = document.activeElement;
                    var isNested = _this3.refs.LeftNav.contains(target);
                    if (!isNested) {
                        _this3.toggleMenu(null, false);
                        _this3.props.onBlur();
                    }
                }, 1);
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.refs.Paper.focus();
        }
    }, {
        key: 'close',
        value: function close() {
            this.toggleMenu(null, false);
        }
    }, {
        key: 'open',
        value: function open() {
            this.toggleMenu(null, true);
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.toggleMenu();
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];

            var styleObj = {
                modal: {
                    position: 'fixed',
                    //display: this.state.open ? 'block' : 'none',
                    top: 0,
                    right: this.state.open ? 0 : '100vw',
                    left: 0,
                    bottom: 0,
                    opacity: this.state.open ? 1 : 0,
                    transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                    background: 'rgba(0,0,0,.5)',
                    zIndex: spacing.menuZIndex
                },
                icon: {
                    cursor: 'pointer'
                },
                menu: {
                    width: '250px',
                    background: 'white',
                    position: 'fixed',
                    left: this.state.open ? '0px' : '-260px',
                    top: 0,
                    bottom: 0,
                    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                    outline: 'none',
                    zIndex: spacing.menuZIndex + 1,
                    boxShadow: this.state.open ? '0 0 20px rgba(0,0,0,.5)' : '0 0 0 rgba(0,0,0,0)'
                }
            };
            styleObj.menu = Object.assign(styleObj.menu, this.props.style);

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var navNODE = _react2.default.createElement(
                'section',
                { style: this.state.style.menu, tabIndex: '1', ref: 'LeftNav', key: 'navmenu', onBlur: this.toggleOnBlur },
                this.props.children
            );
            var renderedNODE = this.props.modal ? [_react2.default.createElement('div', { key: 'modalcontainer', style: this.state.style.modal, onClick: this.toggleOnBlur }), navNODE] : navNODE;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Icon.Icon, {
                    basestyle: this.state.style.icon,
                    iconid: 'menu',
                    size: 'large',
                    type: 'primary',
                    onClick: this.toggleMenu
                }),
                renderedNODE
            );
        }
    }]);

    return LeftNav;
}(_Stripes.StripesTheme);

LeftNav.defaultProps = {
    style: {},
    type: 'default',
    modal: false,
    closeOnBlur: true,
    onBlur: function onBlur() {
        return false;
    },
    open: false
};