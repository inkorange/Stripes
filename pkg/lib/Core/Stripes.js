'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StripesTheme = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.Stripes = Stripes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var palette = {};
var spacing = {};

function Stripes(config) {
    /* default constructor */
    var _init = function _init() {
        palette = config.palette;
        spacing = config.spacing;
    };

    _init();
}

var StripesTheme = exports.StripesTheme = function (_React$Component) {
    _inherits(StripesTheme, _React$Component);

    function StripesTheme(props) {
        _classCallCheck(this, StripesTheme);

        var _this = _possibleConstructorReturn(this, (StripesTheme.__proto__ || Object.getPrototypeOf(StripesTheme)).call(this, props));

        _this.getTheme = _this.getTheme.bind(_this);
        _this.mouseOver = _this.mouseOver.bind(_this);
        _this.mouseOut = _this.mouseOut.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.resolveStyling = _this.resolveStyling.bind(_this);
        _this.onInputClick = _this.onInputClick.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.getBaseStyling = _this.getBaseStyling.bind(_this);
        return _this;
    }

    _createClass(StripesTheme, [{
        key: 'getBaseStyling',
        value: function getBaseStyling(spacing, color) {
            return {
                inputs: { // input shared styling ****************************************************
                    container: {
                        display: 'inline',
                        position: 'relative',
                        borderBottom: spacing.underlineHeight + 'px solid ' + (this.props.error ? color.inactiveUnderErrorlineColor : color.inactiveUndlerlineColor),
                        paddingBottom: spacing.margin * 2 + 'px',
                        transition: 'all 0.3s ease-in-out 0s'
                    },
                    input: {
                        fontSize: spacing.fontSize,
                        padding: spacing.margin * 1.5 + 'px ' + spacing.margin * +'px',
                        color: color.textColor,
                        border: 'none',
                        outline: 'none',
                        width: this.props.width,
                        resize: 'vertical',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        cursor: this.props.onClick ? 'pointer' : 'default'
                    },
                    anchor: {
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        transform: 'translateY(-50%)',
                        cursor: this.props.onClick && !this.props.disabled ? 'pointer' : 'default'
                    },
                    active: {
                        base: {
                            position: 'absolute',
                            width: '100%',
                            height: spacing.underlineHeight + 'px',
                            bottom: '-' + spacing.underlineHeight + 'px',
                            left: 0,
                            backgroundColor: this.props.error ? color.underErrorlineColor : color.underlineColor,
                            transition: 'all 0.3s ease-in-out 0s'

                        },
                        on: {
                            visibility: 'visible',
                            transform: 'scaleX(1)'
                        },
                        off: {
                            visibility: 'hidden',
                            transform: 'scaleX(0)'
                        }
                    },
                    error: {
                        display: this.props.error ? 'block' : 'none',
                        fontSize: spacing.errorFontSize,
                        position: 'absolute',
                        bottom: spacing.margin * -4 + 'px',
                        right: 0,
                        maxWidth: '100%',
                        color: color.underErrorlineColor
                    }
                },
                animation: {
                    ink: {
                        display: 'block',
                        position: 'absolute',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '100%',
                        transform: 'scale(0)'
                    },
                    visibility: {
                        opacity: 1.0
                    }
                }
            };
        }
    }, {
        key: 'getTheme',
        value: function getTheme() {
            return {
                palette: palette,
                spacing: spacing
            };
        }
    }, {
        key: 'getColors',
        value: function getColors() {
            return palette;
        }
    }, {
        key: 'getSpacing',
        value: function getSpacing() {
            return spacing;
        }
    }, {
        key: 'mouseOver',
        value: function mouseOver() {
            this.setState({ hover: true });
        }
    }, {
        key: 'mouseOut',
        value: function mouseOut() {
            this.setState({ hover: false });
        }
    }, {
        key: 'onInputClick',
        value: function onInputClick(e) {
            var _this2 = this;

            this.setState({
                active: true
            }, function () {
                if (_this2.props.onClick) {
                    _this2.props.onClick(e);
                }
            });
        }
    }, {
        key: 'onInputBlur',
        value: function onInputBlur(e) {
            this.setState({
                active: false
            });
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            if (!this.state.disabled) {
                this.props.onClick();
            }
        }
    }, {
        key: 'resolveStyling',
        value: function resolveStyling(obj) {
            Object.keys(obj).map(function (k, v) {
                var val = obj[k];
                console.log(val);
            });
            return obj;
        }
    }, {
        key: 'flattenDate',
        value: function flattenDate(date) {
            return date;
        }
    }, {
        key: 'addTimeToDate',
        value: function addTimeToDate(date, datetime, ignoreDate) {
            /*
             if the ignoreDate flag is passed in as true, it will set the binding date for the time to be 1900.
             Being 1900 has it not show in the view, this is important in cases where we want to distinguish between
             setting just a date ... or setting just a time.
             Otherwise, the date will be set to the current date when the time is set.
             */
            var m_dateTime = m(datetime);
            var m_date = m(date ? date : ignoreDate ? new Date(1900, 0, 1) : new Date());
            m_date.hours(m_dateTime.hours());
            m_date.minutes(m_dateTime.minutes());
            //console.log("getting time from date...   ", m_date);
            return m_date.toDate();
        }
    }, {
        key: 'mergeDates',
        value: function mergeDates(date, datewithtime) {
            if (datewithtime) {
                var m_dateTime = m(datewithtime);
                var m_date = m(date);
                m_date.hour(m_dateTime.format('HH'));
                m_date.minute(m_dateTime.format('mm'));
                return m_date.toDate();
            } else {
                return date;
            }
        }
    }, {
        key: 'animateBackground',
        value: function animateBackground(e) {
            var target = e.target;
            var inkNode = target.querySelector('.ink');
            if (!inkNode) {
                return false;
            }
            var aniTiming = {
                duration: 400,
                iterations: 1
            };
            var aniExplode = [{ opacity: 1, transform: 'scale(0)' }, { opacity: 0, transform: 'scale(2.5)' }];
            var d = Math.max(target.offsetWidth, target.offsetHeight);
            var x = e.pageX - target.offsetLeft - inkNode.clientWidth / 2;
            var y = e.pageY - target.offsetTop - inkNode.clientHeight / 2;
            inkNode.style.height = d + "px";
            inkNode.style.width = d + "px";
            inkNode.style.top = y + "px";
            inkNode.style.left = x + "px";

            inkNode.animate(aniExplode, aniTiming);
        }
    }, {
        key: 'animateShow',
        value: function animateShow(node, direction) {
            var aniTiming = {
                duration: 500,
                iterations: 1,
                fill: 'both'
            };
            var aniExplode = [{ opacity: 0 }, { opacity: 1 }];
            var animation = node.animate(aniExplode, aniTiming);
            animation.pause(); // must pause out of the gate or it will just run.

            if (direction) {
                animation.play();
            } else {
                animation.reverse();
            }
        }
    }]);

    return StripesTheme;
}(_react2.default.Component);

module.exports = {
    Stripes: Stripes,
    StripesTheme: StripesTheme
};