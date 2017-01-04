"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabMenu = undefined;

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

var TabMenu = exports.TabMenu = function (_StripesTheme) {
    _inherits(TabMenu, _StripesTheme);

    function TabMenu(props) {
        _classCallCheck(this, TabMenu);

        var _this = _possibleConstructorReturn(this, (TabMenu.__proto__ || Object.getPrototypeOf(TabMenu)).call(this, props));

        _this.clickItem = _this.clickItem.bind(_this);

        var selected = 0;
        _this.props.children.map(function (item, pos) {
            if (item.props.selected) {
                selected = pos;
            }
        });
        _this.state = {
            style: {},
            selected: selected
        };
        return _this;
    }

    _createClass(TabMenu, [{
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
            var itemCount = this.props.children.length;

            var itemBase = {
                padding: "0px " + spacing.padding + "px",
                minHeight: spacing.minHeight + 'px',
                lineHeight: spacing.minHeight + 'px',
                color: color.textColor,
                fontSize: spacing.fontSize,
                flexGrow: 1,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'opacity .3s'
            };
            var styleObj = {
                base: {
                    backgroundColor: color.background,
                    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexWrap: 'nowrap'
                },
                item: Object.assign({ opacity: .5 }, itemBase),
                selecteditem: Object.assign({ opacity: 1 }, itemBase),
                indicator: {
                    transition: 'left .5s',
                    position: 'absolute',
                    left: 100 / itemCount * this.state.selected + '%',
                    bottom: 0,
                    height: spacing.indicatorHeight + 'px',
                    width: 100 / itemCount + "%",
                    backgroundColor: color.indicator
                },
                content: {}
            };
            //styleObj.selecteditem = styleObj.item;
            //styleObj.selecteditem.opacity = 1;
            styleObj.base = Object.assign(styleObj.base, this.props.style);

            return styleObj;
        }
    }, {
        key: 'clickItem',
        value: function clickItem(e) {
            var _this2 = this;

            var pos = e.target.getAttribute("data-itemid") * 1;
            this.setState({
                selected: pos
            }, function () {
                _this2.setState({
                    style: _this2.getStyles()
                });
                _this2.props.onClick();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var items = [];
            var content = [];
            this.props.children.map(function (item, pos) {
                items.push(_react2.default.createElement(
                    'div',
                    { onClick: _this3.clickItem, 'data-itemid': pos, key: "item" + pos, style: pos == _this3.state.selected ? _this3.state.style.selecteditem : _this3.state.style.item },
                    item.props.label
                ));
                content.push(item.props.children ? item.props.children : null);
            });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    { style: this.state.style.base },
                    items,
                    _react2.default.createElement('span', { ref: 'selected', style: this.state.style.indicator })
                ),
                _react2.default.createElement(
                    'section',
                    null,
                    content[this.state.selected]
                )
            );
        }
    }]);

    return TabMenu;
}(_Stripes.StripesTheme);

TabMenu.defaultProps = {
    style: {},
    type: 'tabmenu',
    title: null,
    leftIcon: null,
    onClick: function onClick() {}
};