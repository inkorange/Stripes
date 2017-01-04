"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableHeaderCell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../../Core/Stripes');

var _SortDirection = require('./SortDirection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeaderCell = exports.TableHeaderCell = function (_StripesTheme) {
    _inherits(TableHeaderCell, _StripesTheme);

    function TableHeaderCell(props) {
        _classCallCheck(this, TableHeaderCell);

        var _this = _possibleConstructorReturn(this, (TableHeaderCell.__proto__ || Object.getPrototypeOf(TableHeaderCell)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.state = {
            style: {}
        };
        return _this;
    }

    _createClass(TableHeaderCell, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            if (this.props.onClick) {
                this.props.onClick();
                e.preventDefault();
            }
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var spacing = this.getSpacing()[this.props.type].cell;
            var styleObj = {
                base: {
                    padding: spacing.padding + 'px',
                    cursor: this.props.onClick || this.props.isSortable ? 'pointer' : 'default',
                    position: 'relative'
                },
                sort: {
                    style: {
                        float: 'right'
                    },
                    width: spacing.sortWidth
                }
            };
            styleObj.base = Object.assign(styleObj.base, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {

            var sortNODE = this.props.isSortable ? _react2.default.createElement(_SortDirection.SortDirection, {
                style: this.state.style.sort.style,
                width: this.state.style.sort.width,
                sortdirection: this.props.sortdirection
            }) : null;

            return _react2.default.createElement(
                'td',
                { onClick: this.onClick, style: this.state.style.base },
                sortNODE,
                this.props.children
            );
        }
    }]);

    return TableHeaderCell;
}(_Stripes.StripesTheme);

TableHeaderCell.defaultProps = {
    style: {},
    type: 'table',
    onClick: null,
    isSortable: false,
    sortdirection: 'asc'
};