"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatePicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _Layouts = require('../Layouts');

var _Inputs = require('./Inputs');

var _Calendar = require('../Elements/Calendar');

var _YearSelector = require('../Elements/YearSelector');

var _Icon = require('../Symbols/Icon');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Buttons = require('./Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = exports.DatePicker = function (_StripesTheme) {
    _inherits(DatePicker, _StripesTheme);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this.toggleDialog = _this.toggleDialog.bind(_this);
        _this.renderCleanDate = _this.renderCleanDate.bind(_this);
        _this.setDate = _this.setDate.bind(_this);
        _this.setYear = _this.setYear.bind(_this);
        _this.showCalendar = _this.showCalendar.bind(_this);
        _this.showYearPanel = _this.showYearPanel.bind(_this);
        _this.updateStyles = _this.updateStyles.bind(_this);
        _this.getValue = _this.getValue.bind(_this);

        _this.state = {
            active: false,
            date: null, //new Date(),
            showCalendar: true,
            showYear: false
        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.updateStyles();
            }
        }
    }, {
        key: 'toggleDialog',
        value: function toggleDialog(open) {
            var _this2 = this;

            var show = open !== undefined ? open : !this.state.active;
            this.setState({
                active: show
            }, function () {
                _this2.showCalendar();
                if (open) {
                    _this2.refs.Dialog.open();
                } else {
                    _this2.refs.Dialog.close();
                }
            });
        }
    }, {
        key: 'showCalendar',
        value: function showCalendar() {
            var _this3 = this;

            this.setState({
                showCalendar: true,
                showYear: false
            }, function () {
                _this3.refs.Calendar.switchToDate(_this3.state.date ? _this3.state.date : new Date());
                _this3.updateStyles();
            });
        }
    }, {
        key: 'showYearPanel',
        value: function showYearPanel() {
            this.setState({
                showCalendar: false,
                showYear: true
            }, this.updateStyles);
        }
    }, {
        key: 'updateStyles',
        value: function updateStyles() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'renderCleanDate',
        value: function renderCleanDate() {
            var dateval = this.state.date ? this.state.date : new Date();
            var year = _react2.default.createElement(
                'div',
                { key: 'yeartitle', onClick: this.showYearPanel, style: this.state.style.year },
                (0, _moment2.default)(dateval).format(this.props.yearFormat)
            );
            var date = _react2.default.createElement(
                'div',
                { key: 'datetitle', onClick: this.showCalendar, style: this.state.style.date },
                (0, _moment2.default)(dateval).format(this.props.dateFormat)
            );
            return [year, date];
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.date;
        }
    }, {
        key: 'setDate',
        value: function setDate(date) {
            this.setState({
                date: date
            });
            this.refs.Dialog.close();
            this.refs.textbox.applyValue((0, _moment2.default)(date).format(this.props.format));
        }
    }, {
        key: 'setYear',
        value: function setYear(year) {
            var mDate = (0, _moment2.default)(this.state.date ? this.state.date : new Date());
            mDate.year(year);
            this.setState({
                date: new Date(mDate.toString()),
                showCalendar: true,
                showYear: false
            }, this.updateStyles);
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
                },
                base: {
                    border: 'none',
                    margin: spacing.padding * 2 + 'px' + ' 0',
                    padding: 0,
                    position: 'relative',
                    display: this.props.visible ? 'block' : 'none',
                    opacity: this.props.disabled ? '.25' : '1.0'
                },
                year: {
                    fontSize: spacing.baseFontSize * 1.5 + 'rem',
                    marginBottom: spacing.margin * 4 + 'px',
                    opacity: this.state.showYear ? '1.0' : '.5',
                    cursor: 'pointer'
                },
                date: {
                    fontSize: spacing.baseFontSize * 2 + 'rem',
                    opacity: this.state.showCalendar ? '1.0' : '.5',
                    cursor: 'pointer'
                },
                label: {
                    fontSize: '1.8rem',
                    margin: spacing.padding * 2 + 'px' + ' 0',
                    lineHeight: spacing.padding * 4 + 'px',
                    display: 'block',
                    color: color.textColor
                },
                dialog: {
                    maxWidth: '350px',
                    minWidth: '300px'
                },
                dialogcard: {
                    minHeight: '470px'
                }
            };

            styleObj.container = Object.assign(styleObj.container, this.props.style);

            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            var color = this.getColors()[this.props.type];
            var cleanDate = this.renderCleanDate();
            return _react2.default.createElement(
                'div',
                { style: this.state.style.container },
                _react2.default.createElement(_Inputs.TextBox, {
                    ref: 'textbox',
                    value: (0, _moment2.default)(this.state.date).format(this.props.format),
                    width: this.props.width,
                    anchor: _react2.default.createElement(_Icon.Icon, { iconid: 'calendar', basestyle: { marginTop: '-5px' }, color: this.state.date ? color.activeIcon : color.inactiveIcon, size: 'small' }),
                    onClick: this.toggleDialog,
                    readOnly: true,
                    placeholder: this.props.placeholder
                }),
                _react2.default.createElement(
                    _Layouts.Dialog,
                    { ref: 'Dialog',
                        modal: true,
                        title: cleanDate,
                        showClose: true,
                        dialogStyle: this.state.style.dialog,
                        cardStyle: this.state.style.dialogcard
                    },
                    this.state.showYear ? _react2.default.createElement(_YearSelector.YearSelector, {
                        ref: 'YearSelector',
                        onClick: this.setYear,
                        date: this.state.date ? this.state.date : new Date(),
                        dateConstraint: this.props.dateConstraint
                    }) : null,
                    this.state.showCalendar ? _react2.default.createElement(_Calendar.Calendar, {
                        ref: 'Calendar',
                        onClick: this.setDate,
                        date: this.state.date ? this.state.date : new Date(),
                        dateConstraint: this.props.dateConstraint
                    }) : null
                )
            );
        }
    }]);

    return DatePicker;
}(_Stripes.StripesTheme);

DatePicker.defaultProps = {
    style: {},
    width: '200px',
    depth: 1,
    className: '',
    type: 'default',
    disabled: false,
    visible: true,
    dateConstraint: [null, null], //['2013-11-05','2016-12-25'],
    yearFormat: 'YYYY',
    dateFormat: 'ddd, MMMM D',
    format: 'M/D/YYYY',
    placeholder: null
};