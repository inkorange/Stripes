"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimePicker = exports.TimeNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

var _Layouts = require('../Layouts');

var _Inputs = require('./Inputs');

var _Buttons = require('./Buttons');

var _Icon = require('../Symbols/Icon');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rads = 2 * Math.PI;

var TimeNode = exports.TimeNode = function (_StripesTheme) {
    _inherits(TimeNode, _StripesTheme);

    function TimeNode(props) {
        _classCallCheck(this, TimeNode);

        var _this = _possibleConstructorReturn(this, (TimeNode.__proto__ || Object.getPrototypeOf(TimeNode)).call(this, props));

        _this.state = {
            hover: false
        };
        return _this;
    }

    _createClass(TimeNode, [{
        key: 'render',
        value: function render() {
            var color = this.getColors()[this.props.type];
            var hourHoverStyle = {
                background: color.backgroundHover
            };
            var hourSelectedStyle = {
                background: color.activeIcon,
                color: 'white',
                cursor: 'default'
            };
            var hourStyle = {
                textAlign: 'center',
                width: '35px',
                height: '35px',
                lineHeight: '35px',
                borderRadius: '50%',
                transition: 'background .5s',
                cursor: 'pointer'
            };

            Object.assign(hourStyle, this.props.style);
            Object.assign(hourHoverStyle, hourStyle);
            Object.assign(hourSelectedStyle, hourStyle);

            return _react2.default.createElement(
                'span',
                {
                    'data-value': this.props.hrLabel,
                    style: this.state.hover && !this.props.selected ? hourHoverStyle : this.props.selected ? hourSelectedStyle : hourStyle,
                    onMouseOver: this.mouseOver, onMouseOut: this.mouseOut,
                    onClick: this.props.onClick
                },
                this.props.children
            );
        }
    }]);

    return TimeNode;
}(_Stripes.StripesTheme);

TimeNode.defaultProps = {
    style: {},
    type: 'default',
    selected: false
};

var TimePicker = exports.TimePicker = function (_StripesTheme2) {
    _inherits(TimePicker, _StripesTheme2);

    function TimePicker(props) {
        _classCallCheck(this, TimePicker);

        var _this2 = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

        _this2.toggleDialog = _this2.toggleDialog.bind(_this2);
        _this2.renderCleanTime = _this2.renderCleanTime.bind(_this2);
        _this2.setHour = _this2.setHour.bind(_this2);
        _this2.setMinute = _this2.setMinute.bind(_this2);
        _this2.changeMode = _this2.changeMode.bind(_this2);
        _this2.toggleAMPM = _this2.toggleAMPM.bind(_this2);
        _this2.toggleDialog = _this2.toggleDialog.bind(_this2);
        _this2.cancel = _this2.cancel.bind(_this2);
        _this2.setTime = _this2.setTime.bind(_this2);
        _this2.getValue = _this2.getValue.bind(_this2);

        var initialTime = props.time ? props.time : null;
        _this2.state = {
            opentime: initialTime,
            active: false,
            hour: (0, _moment2.default)(initialTime ? initialTime : new Date()).format('h') * 1,
            minute: (0, _moment2.default)(initialTime ? initialTime : new Date()).format('m') * 1,
            time: initialTime,
            mode: 'hour',
            hourhover: false,
            minhover: false,
            amhover: false
        };
        return _this2;
    }

    _createClass(TimePicker, [{
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
            var _this3 = this;

            var show = open !== undefined ? open : !this.state.active;
            this.setState({
                active: show,
                hour: (0, _moment2.default)(this.state.time ? this.state.time : new Date()).format('h') * 1,
                minute: (0, _moment2.default)(this.state.time ? this.state.time : new Date()).format('m') * 1,
                opentime: show ? this.state.time : this.state.opentime
            }, function () {
                if (open) {
                    _this3.updateStyles();
                    _this3.refs.Dialog.open();
                } else {
                    _this3.refs.Dialog.close();
                }
            });
        }
    }, {
        key: 'changeMode',
        value: function changeMode(mode) {
            this.setState({
                mode: mode
            }, this.updateStyles);
        }
    }, {
        key: 'renderCleanTime',
        value: function renderCleanTime() {
            var _this4 = this;

            var timeValue = this.state.time ? this.state.time : new Date();
            return _react2.default.createElement(
                'div',
                { key: 'timetitle', style: this.state.style.time },
                _react2.default.createElement(
                    'span',
                    { style: this.state.hourhover || this.state.mode === 'hour' ? this.state.style.timeparthover : this.state.style.timepart, onMouseOver: function onMouseOver() {
                            _this4.setState({ hourhover: true });
                        }, onMouseOut: function onMouseOut() {
                            _this4.setState({ hourhover: false });
                        }, onClick: function onClick() {
                            _this4.changeMode('hour');
                        } },
                    (0, _moment2.default)(timeValue).format('h')
                ),
                ':',
                _react2.default.createElement(
                    'span',
                    { style: this.state.minhover || this.state.mode === 'minute' ? this.state.style.timeparthover : this.state.style.timepart, onMouseOver: function onMouseOver() {
                            _this4.setState({ minhover: true });
                        }, onMouseOut: function onMouseOut() {
                            _this4.setState({ minhover: false });
                        }, onClick: function onClick() {
                            _this4.changeMode('minute');
                        } },
                    (0, _moment2.default)(timeValue).format('mm')
                ),
                _react2.default.createElement(
                    'span',
                    { style: this.state.amhover ? this.state.style.timeparthover : this.state.style.timepart, onMouseOver: function onMouseOver() {
                            _this4.setState({ amhover: true });
                        }, onMouseOut: function onMouseOut() {
                            _this4.setState({ amhover: false });
                        }, onClick: function onClick() {
                            _this4.toggleAMPM();
                        } },
                    (0, _moment2.default)(timeValue).format('A')
                )
            );
        }
    }, {
        key: 'updateStyles',
        value: function updateStyles() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];
            var hourHandWidth = 10;
            var hourHandHeight = 80;
            var minuteHandWidth = 10;
            var minuteHandHeight = 110;
            var hourHandSVG = btoa('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' + hourHandWidth + ' 200" xml:space="preserve"><polygon fill="' + (this.state.mode === 'hour' ? color.activeIcon : color.inactiveIcon) + '" points="0,' + hourHandHeight + ' ' + hourHandWidth / 2 + ',0 ' + hourHandWidth + ',' + hourHandHeight + ' "/></svg>');
            var minuteHandSVG = btoa('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' + minuteHandWidth + ' 200" xml:space="preserve"><polygon fill="' + (this.state.mode === 'minute' ? color.activeIcon : color.inactiveIcon) + '" points="0,' + minuteHandHeight + ' ' + minuteHandWidth / 2 + ',0 ' + minuteHandWidth + ',' + minuteHandHeight + ' "/></svg>');
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
                time: {
                    fontSize: spacing.baseFontSize * 2 + 'rem'
                },
                label: {
                    fontSize: '1.8rem',
                    margin: spacing.padding * 2 + 'px' + ' 0',
                    lineHeight: spacing.padding * 4 + 'px',
                    display: 'block',
                    color: color.textColor
                },
                dialog: {
                    width: '325px'
                },
                dialogcard: {
                    minHeight: '470px'
                },
                hourContainer: {
                    position: 'relative',
                    width: this.props.selectorDimension + 'px',
                    height: this.props.selectorDimension + 'px',
                    margin: '0 auto'
                },
                hourhand: {
                    position: 'absolute',
                    height: hourHandHeight + 'px',
                    width: hourHandWidth + 'px',
                    top: this.props.selectorDimension / 2 - hourHandHeight + 'px',
                    left: this.props.selectorDimension / 2 - hourHandWidth / 2 + 'px',
                    backgroundImage: 'url(data:image/svg+xml;base64,' + hourHandSVG + ')',
                    backgroundSize: 'cover',
                    transition: 'all .5s'
                },
                minutehand: {
                    position: 'absolute',
                    height: minuteHandHeight + 'px',
                    width: minuteHandWidth + 'px',
                    top: this.props.selectorDimension / 2 - minuteHandHeight + 'px',
                    left: this.props.selectorDimension / 2 - minuteHandWidth / 2 + 'px',
                    backgroundImage: 'url(data:image/svg+xml;base64,' + minuteHandSVG + ')',
                    backgroundSize: 'cover',
                    transition: 'all .5s'
                },
                handcircle: {
                    width: '20px',
                    height: '20px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: this.props.selectorDimension / 2 - 10 + 'px',
                    left: this.props.selectorDimension / 2 - 10 + 'px',
                    boxShadow: '0 2px 5px rgba(0,0,0,.25)'
                },
                timeparthover: {
                    background: color.backgroundHover,
                    cursor: 'pointer',
                    padding: spacing.padding + 'px',
                    borderBottom: 'solid 2px ' + color.iconColor
                },
                timepart: {
                    transform: 'all .3s',
                    cursor: 'pointer',
                    padding: spacing.padding + 'px'
                }
            };
            styleObj.container = Object.assign(styleObj.container, this.props.style);
            return styleObj;
        }
    }, {
        key: 'setHour',
        value: function setHour(e) {
            var _this5 = this;

            var hour = e.target.getAttribute('data-value') * 1;
            this.setState({
                hour: hour,
                time: (0, _moment2.default)(this.state.time ? this.state.time : new Date()).hour(hour).toDate()
            }, function () {
                setTimeout(function () {
                    _this5.setState({
                        mode: 'minute'
                    }, _this5.updateStyles);
                }, 1000);
            });
        }
    }, {
        key: 'setMinute',
        value: function setMinute(e) {
            var minute = e.target.getAttribute('data-value') * 1;
            this.setState({
                minute: minute,
                time: (0, _moment2.default)(this.state.time ? this.state.time : new Date()).minute(minute).toDate()
            }, this.updateStyles);
        }
    }, {
        key: 'toggleAMPM',
        value: function toggleAMPM() {
            var time = (0, _moment2.default)(this.state.time ? this.state.time : new Date());
            var day = time.format('d');
            if ((0, _moment2.default)(time).add('hour', 12).format('d') * 1 > day * 1) {
                time.add('hour', 12);
            } else {
                time.subtract('hour', 12);
            }
            this.setState({
                time: (0, _moment2.default)(time).toDate()
            }, this.updateStyles);
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            var initialTime = this.props.time ? props.time : new Date();
            this.setState({
                time: this.state.opentime,
                mode: 'hour',
                hour: (0, _moment2.default)(initialTime).format('h') * 1,
                minute: (0, _moment2.default)(initialTime).format('m') * 1
            }, this.updateStyles);
            this.toggleDialog(false);
        }
    }, {
        key: 'setTime',
        value: function setTime() {
            this.setState({
                mode: 'hour'
            }, this.updateStyles);

            this.toggleDialog(false);
            this.refs.textbox.applyValue((0, _moment2.default)(this.state.time).format(this.props.format));
            this.props.onSet(this.state.time);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.time;
        }
    }, {
        key: 'getHourHandStyle',
        value: function getHourHandStyle() {
            var _this6 = this;

            var hourhandstyle = this.state.style.hourhand;
            var hourList = this.props[this.props.clockFormat === '12hr' ? 'hours12' : 'hours24'];
            var itemAngle = 360 / hourList.length;
            var selectedAngle = 0;
            hourList.map(function (hr, i) {
                if (hr === _this6.state.hour) {
                    selectedAngle = (i + 1) * itemAngle;
                }
            });
            Object.assign(hourhandstyle, {
                transform: 'Rotate(' + selectedAngle + 'deg)',
                transformOrigin: '50% 100%'
            });
            return hourhandstyle;
        }
    }, {
        key: 'getMinuteHandStyle',
        value: function getMinuteHandStyle() {
            var minutehandstyle = this.state.style.minutehand;
            var itemAngle = 360 / 60;
            var selectedAngle = this.state.minute * itemAngle;
            Object.assign(minutehandstyle, {
                transform: 'Rotate(' + selectedAngle + 'deg)',
                transformOrigin: '50% 100%'
            });
            return minutehandstyle;
        }
    }, {
        key: 'getHourNodes',
        value: function getHourNodes() {
            var hourNodes = [];
            var hourList = this.props[this.props.clockFormat === '12hr' ? 'hours12' : 'hours24'];
            var HRangleSpace = rads / hourList.length;
            var i = hourList.length - 1;
            for (var c = rads / 2; c < rads + rads / 2; c += HRangleSpace) {
                var hrstyle = {
                    position: 'absolute',
                    top: this.props.selectorDimension / 2 * Math.cos(c) + this.props.selectorDimension / 2 - 16,
                    left: this.props.selectorDimension / 2 * Math.sin(c) + this.props.selectorDimension / 2 - 16
                };
                if (hourList[i]) {
                    hourNodes.push(_react2.default.createElement(
                        TimeNode,
                        {
                            style: hrstyle,
                            hrLabel: hourList[i],
                            selected: hourList[i] === this.state.hour,
                            key: "hour" + hourList[i],
                            onClick: this.setHour
                        },
                        hourList[i]
                    ));
                }
                i--;
            };
            return hourNodes;
        }
    }, {
        key: 'getMinuteNodes',
        value: function getMinuteNodes() {
            var minNodes = [];
            var MINangleSpace = rads / 60;
            var min = 60;
            for (var c = rads / 2; c < rads + rads / 2; c += MINangleSpace) {
                var minstyle = {
                    position: 'absolute',
                    top: this.props.selectorDimension / 2 * Math.cos(c) + this.props.selectorDimension / 2 - 16,
                    left: this.props.selectorDimension / 2 * Math.sin(c) + this.props.selectorDimension / 2 - 16,
                    opacity: min % 5 && min !== this.state.minute ? '0' : '1',
                    fontSize: '90%',
                    width: '30px',
                    height: '30px',
                    lineHeight: '30px',
                    zIndex: min % 5 === 0 ? 1 : 0
                };
                if (min < 60) {
                    minNodes.push(_react2.default.createElement(
                        TimeNode,
                        {
                            style: minstyle,
                            hrLabel: min,
                            selected: min === this.state.minute,
                            key: "min" + min,
                            onClick: this.setMinute
                        },
                        min
                    ));
                }
                min--;
            };
            return minNodes;
        }
    }, {
        key: 'render',
        value: function render() {
            var displayTime = (0, _moment2.default)(this.state.time).format(this.props.format);
            var color = this.getColors()[this.props.type];

            var cleanTime = this.renderCleanTime();
            var hourNodes = this.getHourNodes();
            var minNodes = this.getMinuteNodes();

            var handNode = [_react2.default.createElement('div', { key: 'minhand', style: this.getMinuteHandStyle() }), _react2.default.createElement('div', { key: 'hourhand', style: this.getHourHandStyle() }), _react2.default.createElement('div', { key: 'basehand', style: this.state.style.handcircle })];

            var hourContainer = _react2.default.createElement(
                'div',
                { style: this.state.style.hourContainer },
                this.state.mode === 'hour' ? hourNodes : minNodes,
                handNode
            );

            var actionsNode = [_react2.default.createElement(
                _Buttons.FlatButton,
                { key: 'action1', onClick: this.cancel },
                'Cancel'
            ), _react2.default.createElement(
                _Buttons.RaisedButton,
                { key: 'action2', onClick: this.setTime, type: 'primary' },
                'OK'
            )];

            return _react2.default.createElement(
                'div',
                { style: this.state.style.container },
                _react2.default.createElement(_Inputs.TextBox, {
                    ref: 'textbox',
                    value: displayTime,
                    width: this.props.width,
                    anchor: _react2.default.createElement(_Icon.Icon, { iconid: 'clock', basestyle: { marginTop: '-5px' }, color: this.state.time ? color.activeIcon : color.inactiveIcon, size: 'small' }),
                    onClick: this.toggleDialog,
                    readOnly: true,
                    placeholder: this.props.placeholder
                }),
                _react2.default.createElement(
                    _Layouts.Dialog,
                    { ref: 'Dialog',
                        modal: true,
                        title: cleanTime,
                        dialogStyle: this.state.style.dialog,
                        cardStyle: this.state.style.dialogcard,
                        actions: actionsNode
                    },
                    hourContainer
                )
            );
        }
    }]);

    return TimePicker;
}(_Stripes.StripesTheme);

TimePicker.defaultProps = {
    style: {},
    width: '200px',
    type: 'default',
    format: 'h:mm A',
    time: null,
    onSet: function onSet() {
        return false;
    },
    disabled: false,
    clockFormat: '12hr',
    hours12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hours24: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    selectorDimension: 260,
    placeholder: null,
    active: false
};