"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Icon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = exports.Icon = function (_StripesTheme) {
    _inherits(Icon, _StripesTheme);

    function Icon(props) {
        _classCallCheck(this, Icon);

        var _this = _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, props));

        _this.state = {
            disabled: props.disabled,
            style: _this.getStyles()
        };
        _this.clickAction = _this.clickAction.bind(_this);
        return _this;
    }

    _createClass(Icon, [{
        key: 'clickAction',
        value: function clickAction(e) {
            this.props.onClick(e);
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];
            var iconSize = '2rem';
            switch (this.props.size) {
                case 'xsmall':
                    iconSize = '1.75rem';
                    break;
                case 'small':
                    iconSize = '2rem';
                    break;
                case 'medium':
                    iconSize = '2.5rem';
                    break;
                case 'large':
                    iconSize = '3.5rem';
                    break;
                default:
                    iconSize = this.props.size;
            }

            var styleObj = {
                Icon: {
                    display: 'inline-block',
                    transition: 'background-color .5s'
                },
                svg: {
                    fill: this.props.color ? this.props.color : color.iconColor,
                    width: iconSize,
                    height: iconSize
                }
            };

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var useTag = '<use xlink:href="#' + this.props.iconid + '" />';
            var styles = this.getStyles();
            var SVGstyle = this.props.style ? Object.assign(this.props.style, styles.svg) : styles.svg;
            var Iconstyle = Object.assign(this.props.basestyle, styles.Icon);

            var svg = _react2.default.createElement('svg', { 'data-id': this.props["data-id"], style: SVGstyle, viewBox: '0 0 100 100', dangerouslySetInnerHTML: { __html: useTag } });
            var enhanced = _react2.default.createElement(
                'div',
                { style: { position: 'relative' } },
                svg,
                _react2.default.createElement('div', { style: { position: 'absolute', cursor: 'pointer', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,.001)' }, className: 'icon-click-target', onClick: this.clickAction })
            );
            return _react2.default.createElement(
                'div',
                { className: 'Icon',
                    title: this.props.title,
                    style: Iconstyle,
                    'data-event-click': this.props["data-event-click"],
                    'data-event-desc': this.props["data-event-desc"],
                    'data-highlight': this.props.highlight,
                    'data-name': this.props.iconid,
                    onClick: this.props.enhancedClick ? null : this.clickAction
                },
                this.props.enhancedClick ? enhanced : svg,
                this.props.children
            );
        }
    }]);

    return Icon;
}(_Stripes.StripesTheme);

Icon.defaultProps = {
    inactive: false,
    enhancedClick: false,
    onClick: function onClick() {
        return false;
    },
    type: 'default',
    basestyle: {},
    style: {},
    size: 'small',
    color: null
};