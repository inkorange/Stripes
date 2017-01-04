"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Calendar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _Icon = require('../Symbols/Icon');

var _Typography = require('../Layout/Typography');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = exports.Calendar = function (_StripesTheme) {
    _inherits(Calendar, _StripesTheme);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.modifyDate = _this.modifyDate.bind(_this);
        _this.selectDate = _this.selectDate.bind(_this);
        _this.switchToDate = _this.switchToDate.bind(_this);
        _this.state = {
            style: _this.getStyles(),
            hover: false
        };
        return _this;
    }

    _createClass(Calendar, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.setState({
                    style: this.getStyles(),
                    date: this.props.date
                });
            }
        }
    }, {
        key: 'modifyDate',
        value: function modifyDate(move, type) {
            this.setState({
                date: (0, _moment2.default)(this.state.date).add(move, type)
            });
        }
    }, {
        key: 'selectDate',
        value: function selectDate(e) {
            var date = new Date(e.target.getAttribute('data-date'));
            if (date) {
                this.props.onClick(date);
            }
        }
    }, {
        key: 'switchToDate',
        value: function switchToDate(date) {
            this.setState({
                date: date
            });
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];
            var styleObj = {
                base: {
                    borderRadius: spacing.borderRadius + 'px'
                },
                label: {
                    fontSize: '1.8rem',
                    margin: spacing.padding * 2 + 'px' + ' 0',
                    lineHeight: spacing.padding * 4 + 'px',
                    display: 'block',
                    color: color.textColor
                },
                months: {
                    display: 'flex',
                    flexWrap: 'wrap'
                },
                montharrowbase: {
                    display: 'inline-block',
                    cursor: 'pointer',
                    flexGrow: 1,
                    width: '10%',
                    textAlign: 'center',
                    padding: spacing.padding * 2 + 'px'
                },
                montharrow: {
                    width: spacing.padding * 4 + 'px'
                },
                monthtitle: {
                    //color: 'white',
                    fontSize: spacing.baseFontSize * 1.25 + 'rem',
                    width: '80%',
                    textAlign: 'center',
                    lineHeight: spacing.padding * 8 + 'px'
                },
                days: {
                    display: 'flex',
                    flexWrap: 'wrap'
                },
                dayitem: {
                    alignItems: 'center',
                    flexFlow: 'column wrap',
                    alignContent: 'stretch',
                    textAlign: 'center',
                    width: 100 / 7 + '%',
                    padding: spacing.padding * 1.5 + 'px',
                    cursor: 'pointer'
                }
            };
            styleObj.dayitemhover = Object.assign({
                backgroundColor: color.backgroundHover
            }, styleObj.dayitem);
            styleObj.dayitemUnavailable = Object.assign({
                opacity: '.33'
            }, styleObj.dayitem);
            styleObj.dayitemSelected = Object.assign({
                color: 'white',
                borderRadius: '50%',
                backgroundColor: color.headerBackgroundColor
            }, styleObj.dayitem);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var month = (0, _moment2.default)(this.state.date).format("MMMM YYYY");
            var calOnFirstDay = (0, _moment2.default)(this.state.date).date(1);
            var calOnLastDay = (0, _moment2.default)(this.state.date).date((0, _moment2.default)(calOnFirstDay).daysInMonth());
            var firstday = (0, _moment2.default)(calOnFirstDay).isoWeekday() - 1;
            //console.log('first day: ', m(calOnFirstDay).isoWeekday());

            var daysOfWeek = [];
            var days = [];
            daysOfWeek.push([_react2.default.createElement(
                'span',
                { key: 'day1', style: this.state.style.dayitem },
                'Sun'
            ), _react2.default.createElement(
                'span',
                { key: 'day2', style: this.state.style.dayitem },
                'Mon'
            ), _react2.default.createElement(
                'span',
                { key: 'day3', style: this.state.style.dayitem },
                'Tue'
            ), _react2.default.createElement(
                'span',
                { key: 'day4', style: this.state.style.dayitem },
                'Wed'
            ), _react2.default.createElement(
                'span',
                { key: 'day5', style: this.state.style.dayitem },
                'Thu'
            ), _react2.default.createElement(
                'span',
                { key: 'day6', style: this.state.style.dayitem },
                'Fri'
            ), _react2.default.createElement(
                'span',
                { key: 'day7', style: this.state.style.dayitem },
                'Sat'
            )]);
            if (firstday == 6) {
                firstday = -1;
            }
            var firstConstraint = this.props.dateConstraint[0] ? (0, _moment2.default)(this.props.dateConstraint[0]) : (0, _moment2.default)('2000-01-01');
            var secondConstraint = this.props.dateConstraint[1] ? (0, _moment2.default)(this.props.dateConstraint[1]) : (0, _moment2.default)('2100-01-01');
            for (var i = firstday * -1; i <= (0, _moment2.default)(calOnFirstDay).daysInMonth(); i++) {
                var _React$createElement;

                var day = i > 0 ? i : '';
                var thisDate = (0, _moment2.default)(calOnFirstDay).date(i);
                var isSelectedDate = thisDate.format("L") === (0, _moment2.default)(this.props.date).format("L");
                var isAvailable = thisDate.isBetween(firstConstraint, secondConstraint, 'day');
                days.push(_react2.default.createElement(
                    _Typography.A,
                    (_React$createElement = {
                        key: "date" + i,
                        style: isSelectedDate ? this.state.style.dayitemSelected : isAvailable ? this.state.style.dayitem : this.state.style.dayitemUnavailable,
                        'data-date': thisDate.toDate().toString(),
                        onClick: i > 0 ? this.selectDate : null
                    }, _defineProperty(_React$createElement, 'data-date', thisDate.toDate().toString()), _defineProperty(_React$createElement, 'disabled', !isAvailable), _React$createElement),
                    day
                ));
            }

            var hasPreviousMonth = calOnFirstDay.isAfter(firstConstraint);
            var hasNextMonth = calOnLastDay.isBefore(secondConstraint);

            return _react2.default.createElement(
                'section',
                {
                    style: this.state.style.base
                },
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.months },
                    hasPreviousMonth ? _react2.default.createElement(_Icon.Icon, {
                        iconid: 'left',
                        style: this.state.style.montharrow,
                        basestyle: this.state.style.montharrowbase,
                        onClick: function onClick() {
                            _this2.modifyDate(-1, 'months');
                        }
                    }) : _react2.default.createElement('div', { style: this.state.style.montharrowbase }),
                    _react2.default.createElement(
                        'div',
                        { style: this.state.style.monthtitle },
                        month
                    ),
                    hasNextMonth ? _react2.default.createElement(_Icon.Icon, {
                        iconid: 'right',
                        style: this.state.style.montharrow,
                        basestyle: this.state.style.montharrowbase,
                        onClick: function onClick() {
                            _this2.modifyDate(1, 'months');
                        }
                    }) : _react2.default.createElement('div', { style: this.state.style.montharrowbase })
                ),
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.days },
                    daysOfWeek
                ),
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.days },
                    days
                )
            );
        }
    }]);

    return Calendar;
}(_Stripes.StripesTheme);

Calendar.defaultProps = {
    style: {},
    date: new Date(),
    type: 'default',
    onClick: null,
    dateConstraint: [null, null]
};