"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YearSelector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _Icon = require('../Symbols/Icon');

var _Typography = require('../Layout/Typography');

var _SelectPanel = require('../Forms/SelectPanel.js');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearSelector = exports.YearSelector = function (_StripesTheme) {
    _inherits(YearSelector, _StripesTheme);

    function YearSelector(props) {
        _classCallCheck(this, YearSelector);

        var _this = _possibleConstructorReturn(this, (YearSelector.__proto__ || Object.getPrototypeOf(YearSelector)).call(this, props));

        _this.selectYear = _this.selectYear.bind(_this);
        _this.positionSelection = _this.positionSelection.bind(_this);
        _this.state = {
            style: _this.getStyles(),
            hover: false
        };
        return _this;
    }

    _createClass(YearSelector, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.positionSelection();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.setState({
                    style: this.getStyles(),
                    date: this.props.date
                }, this.positionSelection);
            }
        }
    }, {
        key: 'positionSelection',
        value: function positionSelection() {
            if (!this.state.date) {
                return false;
            }
            var selected = this.refs.yearHolder.querySelectorAll('[data-year="' + (0, _moment2.default)(this.state.date).format("YYYY") + '"]')[0];
            var fromtop = selected.offsetTop;
            var height = this.refs.yearHolder.clientHeight;
            this.refs.yearHolder.scrollTop = fromtop - height / 2 + selected.clientHeight / 2;
        }
    }, {
        key: 'selectYear',
        value: function selectYear(e) {
            var year = e.target.getAttribute('data-year') * 1;
            if (year) {
                this.props.onClick(year);
            }
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];
            var styleObj = {
                yearcontainer: {
                    margin: 0,
                    padding: 0,
                    overflow: 'auto',
                    position: 'absolute',
                    top: '130px',
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                yearitem: {
                    display: 'block',
                    listStyle: 'none',
                    textAlign: 'center',
                    padding: spacing.padding * 4 + 'px',
                    fontSize: spacing.baseFontSize * 1.5 + 'rem',
                    cursor: 'pointer'
                }
            };

            styleObj.yearitemhover = Object.assign({
                color: 'blue'
            }, styleObj.yearitem);

            styleObj.yearitemselected = Object.assign({
                color: color.headerBackgroundColor,
                backgroundColor: 'white',
                boxShadow: '0 0 10px rgba(0,0,0,.25)'
            }, styleObj.yearitem);

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var year = (0, _moment2.default)(this.state.date).format("YYYY");
            var firstConstraint = this.props.dateConstraint[0] ? (0, _moment2.default)(this.props.dateConstraint[0]) : (0, _moment2.default)('2000-01-01');
            var secondConstraint = this.props.dateConstraint[1] ? (0, _moment2.default)(this.props.dateConstraint[1]) : (0, _moment2.default)('2100-01-01');
            var yearNode = [];
            var startYear = (0, _moment2.default)().format("YYYY") * 1 - 50;
            var endYear = year * 1 + 50;
            for (var yr = startYear; yr <= endYear; yr++) {
                if (yr >= firstConstraint.format("YYYY") * 1 && yr <= secondConstraint.format("YYYY") * 1) {
                    yearNode.push(_react2.default.createElement(
                        'li',
                        {
                            key: "year" + yr,
                            'data-year': yr,
                            onClick: this.selectYear,
                            style: year == yr ? this.state.style.yearitemselected : this.state.style.yearitem,
                            onMouseOver: this.mouseOver, onMouseOut: this.mouseOut
                        },
                        yr
                    ));
                }
            }

            return _react2.default.createElement(
                'ul',
                { ref: 'yearHolder', style: this.state.style.yearcontainer },
                yearNode
            );
        }
    }]);

    return YearSelector;
}(_Stripes.StripesTheme);

YearSelector.defaultProps = {
    style: {},
    date: new Date(),
    type: 'default',
    onClick: null,
    dateConstraint: [null, null]
};