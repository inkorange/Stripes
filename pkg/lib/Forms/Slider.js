"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Slider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = exports.Slider = function (_StripesTheme) {
    _inherits(Slider, _StripesTheme);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

        _this.getValue = _this.getValue.bind(_this);
        _this.pressing = _this.pressing.bind(_this);
        _this.lifting = _this.lifting.bind(_this);
        _this.dragging = _this.dragging.bind(_this);
        _this.state = {
            active: false,
            value: 0,
            pressing: false,
            dragging: false,
            handleX: 0
        };
        return _this;
    }

    _createClass(Slider, [{
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
        key: 'updateStyles',
        value: function updateStyles() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            //var offset = this.props.range[1] - this.props.range[0];
            return this.props.format(this.props.range[1] * (this.state.handleX / 100) - this.props.range[0]);
        }
    }, {
        key: 'pressing',
        value: function pressing(e) {
            var _this2 = this;

            this.setState({
                pressing: true
            }, function () {
                _this2.bindDragEvents();
                _this2.updateStyles();
            });
        }
    }, {
        key: 'lifting',
        value: function lifting() {
            var _this3 = this;

            this.setState({
                pressing: false
            }, function () {
                _this3.removeDragEvents();
                _this3.updateStyles();
            });
        }
    }, {
        key: 'bindDragEvents',
        value: function bindDragEvents() {
            document.addEventListener('mousemove', this.dragging);
            document.addEventListener('mouseup', this.lifting);
        }
    }, {
        key: 'removeDragEvents',
        value: function removeDragEvents() {
            document.removeEventListener('mousemove', this.dragging);
            document.removeEventListener('mouseup', this.lifting);
        }
    }, {
        key: 'dragging',
        value: function dragging(e) {
            e.stopPropagation();
            var handleX = 0;
            if (this.state.pressing) {
                var node = this.refs.slider;

                var x_on_bar = e.pageX - node.offsetLeft;
                handleX = x_on_bar * 100 / node.offsetWidth;
                handleX = handleX < 0 ? 0 : handleX;
                handleX = handleX > 100 ? 100 : handleX;
                //console.log(node.offsetWidth, node.getBoundingClientRect().width);
            }
            this.setState({
                dragging: this.state.pressing,
                handleX: this.state.pressing ? handleX : this.state.handleX
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
                    margin: spacing.margin * 2 + 'px',
                    width: 'calc(' + this.props.width + ' - ' + spacing.margin * 2 + 'px)',
                    position: 'relative',
                    padding: spacing.padding + 'px',
                    height: this.props.handlesize + 'px'
                },
                bar: {
                    height: '6px',
                    backgroundColor: color.inactiveIcon,
                    width: '100%',
                    margin: '3px 0px',
                    borderRadius: spacing.borderRadius + 'px',
                    boxShadow: '0 1px 3px rgba(0,0,0,.25) inset'
                },
                handle: {
                    borderRadius: '50%',
                    backgroundColor: color.activeIcon,
                    position: 'absolute',
                    transition: 'box-shadow .25s',
                    transform: 'translateX(-' + this.props.handlesize / 2 + 'px)',
                    left: this.state.handleX + '%', //'calc(' + this.state.handleX + '% - ' + ((this.state.handleX / 10) - 5) + 'px)',
                    top: this.state.pressing ? '2px' : '1px',
                    width: this.props.handlesize + 'px',
                    height: this.props.handlesize + 'px',
                    boxShadow: this.state.pressing ? '0 3px 6px rgba(0,0,0,.5), 0 2px 2px rgba(255,255,255,.25) inset' : '0 2px 5px rgba(0,0,0,.25)',
                    userSelect: 'none'
                },
                value_box: {
                    opacity: this.state.pressing ? '1.0' : '0',
                    position: 'absolute',
                    top: '-25px',
                    minWidth: '50px',
                    textAlign: 'center',
                    left: this.state.handleX + '%',
                    transform: 'translateX(-50%)',
                    transition: 'opacity .25s ease-in-out .75s',
                    color: 'white',
                    backgroundColor: color.activeIcon,
                    padding: spacing.padding + 'px',
                    userSelect: 'none',
                    borderRadius: spacing.borderRadius + 'px',
                    fontSize: '10px'
                }
            };

            styleObj.container = Object.assign(styleObj.container, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { ref: 'slider',
                    style: this.state.style.container,
                    onMouseDown: this.pressing
                },
                _react2.default.createElement('div', { style: this.state.style.bar }),
                _react2.default.createElement(
                    'div',
                    { style: this.state.style.value_box },
                    this.getValue()
                ),
                _react2.default.createElement('div', {
                    style: this.state.style.handle
                })
            );
        }
    }]);

    return Slider;
}(_Stripes.StripesTheme);

Slider.defaultProps = {
    style: {},
    width: '100%',
    type: 'default',
    disabled: false,
    range: [0, 100],
    snap: 1,
    handlesize: 20,
    showHandleValue: true,
    format: function format(n) {
        return parseInt(n, 10);
    }
};