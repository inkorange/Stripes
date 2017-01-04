"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SortDirection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../../Core/Stripes');

var _Icon = require('../../Symbols/Icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SortDirection = exports.SortDirection = function (_StripesTheme) {
    _inherits(SortDirection, _StripesTheme);

    function SortDirection(props) {
        _classCallCheck(this, SortDirection);

        var _this = _possibleConstructorReturn(this, (SortDirection.__proto__ || Object.getPrototypeOf(SortDirection)).call(this, props));

        _this.state = {
            style: {}
        };
        return _this;
    }

    _createClass(SortDirection, [{
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
                base: {
                    position: 'absolute',
                    right: spacing.padding + 'px',
                    top: spacing.padding + 'px',
                    width: this.props.width + 'px'
                },
                asc: {
                    display: 'inline-block',
                    float: 'right',
                    position: 'relative',
                    top: spacing.padding + 'px'
                },
                desc: {
                    display: 'inline-block',
                    float: 'right',
                    position: 'relative',
                    transform: 'rotate(180deg)',
                    top: -(this.props.width * 4.5) + 'px'
                }
            };

            //styleObj.base = Object.assign(styleObj.base, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var color = this.getColors()[this.props.type];
            var asccolor = this.props.sortdirection === 'asc' ? color.activeIcon : color.inactiveIcon;
            var desccolor = this.props.sortdirection === 'desc' ? color.activeIcon : color.inactiveIcon;

            return _react2.default.createElement(
                'div',
                { style: this.state.style.base },
                _react2.default.createElement(_Icon.Icon, { key: 'asc', basestyle: this.state.style.asc, style: { width: this.props.width + 'px' }, color: asccolor, iconid: 'up' }),
                _react2.default.createElement(_Icon.Icon, { ley: 'desc', basestyle: this.state.style.desc, style: { width: this.props.width + 'px' }, color: desccolor, iconid: 'up' })
            );
        }
    }]);

    return SortDirection;
}(_Stripes.StripesTheme);

SortDirection.defaultProps = {
    sortdirection: 'asc',
    width: 10,
    type: 'default'
};