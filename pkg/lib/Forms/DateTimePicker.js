"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DateTimePicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _DatePicker = require('./DatePicker');

var _TimePicker = require('./TimePicker');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePicker = exports.DateTimePicker = function (_StripesTheme) {
    _inherits(DateTimePicker, _StripesTheme);

    function DateTimePicker(props) {
        _classCallCheck(this, DateTimePicker);

        var _this = _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this, props));

        _this.state = {
            active: false,
            datetime: null };
        return _this;
    }

    _createClass(DateTimePicker, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {}
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.datetime;
        }
    }, {
        key: 'setDate',
        value: function setDate(date) {
            console.log("date is set: ", date);
        }
    }, {
        key: 'setTime',
        value: function setTime(time) {
            console.log("time is set: ", time);
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];
            var styleObj = {
                container: {
                    display: 'inline-block',
                    margin: spacing.margin * 2 + 'px'
                }
            };
            styleObj.container = Object.assign(styleObj.container, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var style = this.getStyles();
            return _react2.default.createElement(
                'div',
                { style: style },
                _react2.default.createElement(_DatePicker.DatePicker, {
                    width: this.props.datewidth,
                    placeholder: this.props.placeholder[0],
                    onSet: this.setDate,
                    active: this.props.active
                }),
                _react2.default.createElement(_TimePicker.TimePicker, {
                    width: this.props.timewidth,
                    placeholder: this.props.placeholder[1],
                    onSet: this.setTime,
                    active: this.props.active
                })
            );
        }
    }]);

    return DateTimePicker;
}(_Stripes.StripesTheme);

DateTimePicker.defaultProps = {
    style: {},
    datewidth: '150px',
    timewidth: '150px',
    type: 'default',
    disabled: false,
    visible: true,
    dateConstraint: [null, null], //['2013-11-05','2016-12-25'],
    yearFormat: 'YYYY',
    dateFormat: 'ddd, MMMM D',
    format: 'M/D/YYYY',
    placeholder: [null, null]
};