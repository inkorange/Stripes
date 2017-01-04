"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Card = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = exports.Card = function (_StripesTheme) {
    _inherits(Card, _StripesTheme);

    function Card(props) {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

        _this.state = {
            disabled: props.disabled,
            style: _this.getStyles()
        };
        return _this;
    }

    _createClass(Card, [{
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];

            var styleObj = {
                base: {
                    transition: "all .25s ease-in-out",
                    zIndex: "2",
                    background: 'white',
                    boxShadow: '0 5px 15px rgba(0,0,0,.5)'
                },
                header: {
                    backgroundColor: color.headerBackgroundColor,
                    padding: spacing.padding * 5 + "px",
                    fontSize: '2rem',
                    color: 'white',
                    zIndex: 1,
                    position: 'relative'
                },
                body: {
                    padding: spacing.padding * 5 + 'px'
                },
                footer: {
                    borderTop: 'solid 1px #ccc',
                    padding: spacing.padding * 2 + 'px ',
                    textAlign: 'right',
                    background: 'white',
                    zIndex: 1
                },
                inactiveScreen: {
                    position: 'absolute',
                    top: '80px',
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: 'white',
                    zIndex: 3,
                    opacity: this.props.inactiveDepth
                }
            };

            if (this.props.fillContainer) {
                styleObj.base.position = 'absolute';
                styleObj.base.bottom = 0;
                styleObj.base.right = 0;
                styleObj.base.left = 0;
                styleObj.base.top = 0;
            }

            if (this.props.forceBottomAlign) {
                styleObj.footer.position = 'fixed';
                styleObj.footer.bottom = 0;
                styleObj.footer.right = 0;
                styleObj.footer.left = 0;
            }

            styleObj.header = Object.assign(styleObj.header, this.props.headerStyle);
            styleObj.footer = Object.assign(styleObj.footer, this.props.footerStyle);

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {

            var containerStyle = Object.assign(this.props.style, this.state.style.base);

            return _react2.default.createElement(
                'section',
                { style: containerStyle, className: 'Card' },
                this.props.title ? _react2.default.createElement(
                    'header',
                    { key: 'card_header', ref: 'card_header', style: this.state.style.header },
                    this.props.title
                ) : null,
                _react2.default.createElement(
                    'div',
                    { key: 'card_body', ref: 'card_body', style: this.state.style.body },
                    this.props.children
                ),
                this.props.actions ? _react2.default.createElement(
                    'footer',
                    { key: 'card_footer', ref: 'card_footer', style: this.state.style.footer },
                    this.props.actions
                ) : null,
                this.props.inactiveDepth > 0 ? _react2.default.createElement('div', { className: 'inactivePanel', style: this.state.style.inactiveScreen }) : null
            );
        }
    }]);

    return Card;
}(_Stripes.StripesTheme);

Card.defaultProps = {
    style: {},
    headerStyle: {},
    footerStyle: {},
    type: 'default',
    title: null,
    actions: null,
    fillContainer: false,
    forceBottomAlign: false,
    inactiveDepth: 0
};