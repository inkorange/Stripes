

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IconMenu = undefined;

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

var IconMenu = exports.IconMenu = function (_StripesTheme) {
    _inherits(IconMenu, _StripesTheme);

    function IconMenu(props) {
        _classCallCheck(this, IconMenu);

        var _this = _possibleConstructorReturn(this, (IconMenu.__proto__ || Object.getPrototypeOf(IconMenu)).call(this, props));

        _this.state = {
            open: false
        };

        _this.toggleMenu = _this.toggleMenu.bind(_this);
        _this.getStyles = _this.getStyles.bind(_this);
        _this.toggleMenuOnBlur = _this.toggleMenuOnBlur.bind(_this);
        return _this;
    }

    _createClass(IconMenu, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'toggleMenu',
        value: function toggleMenu(e, show, focus) {
            var _this2 = this;

            this.setState({
                open: show === undefined ? !this.state.open : show
            }, function () {
                if (_this2.state.open) {
                    _this2.refs.MenuBody.focus();
                }
                _this2.setState({
                    style: _this2.getStyles()
                }, _this2.forceUpdate);
            });
        }
    }, {
        key: 'toggleMenuOnBlur',
        value: function toggleMenuOnBlur(e) {
            return false;
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];
            var styleObj = {
                base: {
                    position: 'relative',
                    display: 'inline'
                },
                icon: {
                    transition: 'all .5s',
                    cursor: 'pointer',
                    padding: spacing.padding,
                    background: this.state.open ? 'white' : 'transparent',
                    boxShadow: this.state.open ? '0 0 5px rgb(200,200,200)' : '0 0 0 rgb(200,200,200)',
                    zIndex: 1
                },
                menu: {
                    position: 'absolute',
                    top: this.props.direction !== 'top' ? '100%' : 'auto',
                    bottom: this.props.direction === 'top' ? 'calc(100% + ' + spacing.padding * 2 + 'px)' : 'auto',
                    left: this.props.direction === 'left' ? 'auto' : 0,
                    right: this.props.direction === 'left' ? 0 : 'auto',
                    transition: 'all .5s',
                    maxHeight: this.state.open ? '800px' : '0',
                    opacity: this.state.open ? '1.0' : '0.0',
                    maxWidth: this.props["max-width"],
                    overflow: 'hidden',
                    padding: 0,
                    minWidth: '200px',
                    outline: 'none',
                    userSelect: 'none',
                    MozUserSelect: 'none',
                    WebkitUserSelect: 'none',
                    msUserSelect: 'none',
                    background: 'white',
                    boxShadow: this.state.open ? '0 3px 5px rgb(200,200,200)' : '0 2px 0 rgb(200,200,200)',
                    zIndex: 2
                }
            };
            styleObj.base = Object.assign(styleObj.base, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                {
                    style: this.state.style.base,
                    disabled: this.props.disabled
                },
                _react2.default.createElement(_Icon.Icon, {
                    iconid: this.props.iconid,
                    size: 'medium',
                    onClick: this.toggleMenu,
                    basestyle: this.state.style.icon
                }),
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.menu,
                        tabIndex: '0',
                        ref: 'MenuBody',
                        onBlur: this.toggleMenuOnBlur
                    },
                    this.props.children
                )
            );
        }
    }]);

    return IconMenu;
}(_Stripes.StripesTheme);

IconMenu.defaultProps = {
    direction: "bottom",
    type: 'default',
    disabled: false,
    iconid: 'filter',
    style: {},
    "max-width": '100%'
};