"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectPanel = exports.SelectPanel = function (_StripesTheme) {
    _inherits(SelectPanel, _StripesTheme);

    function SelectPanel(props) {
        _classCallCheck(this, SelectPanel);

        var _this = _possibleConstructorReturn(this, (SelectPanel.__proto__ || Object.getPrototypeOf(SelectPanel)).call(this, props));

        _this.state = {
            style: {},
            value: null,
            show: _this.props.show
        };

        _this.state = {
            style: _this.getStyles()
        };

        _this.getStyles = _this.getStyles.bind(_this);
        _this.moveHighlight = _this.moveHighlight.bind(_this);
        _this.applyValue = _this.applyValue.bind(_this);
        _this.updateSelected = _this.updateSelected.bind(_this);
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.keyboardListeners = _this.keyboardListeners.bind(_this);
        return _this;
    }

    _createClass(SelectPanel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                style: this.getStyles()
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props) {
            if (props !== this.props) {
                this.setState({
                    style: this.getStyles()
                });
            }
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type];
            var spacing = this.getSpacing()[this.props.type];

            var styleObj = {
                results: {
                    position: 'absolute',
                    top: '32px',
                    minWidth: '100%',
                    maxWidth: '100vw',
                    left: 0,
                    transition: 'all .3s',
                    maxHeight: this.state.show ? '500px' : '0px',
                    overflow: 'hidden',
                    opacity: this.state.show ? '1.0' : '0.25',
                    background: 'white',
                    padding: this.state.show ? '10px' : '0 10px',
                    fontSize: '1.6rem',
                    zIndex: spacing.menuZIndex,
                    borderRadius: '0 0 2px 2px',
                    boxShadow: '0 2px 10px rgba(0,0,0,.5)',
                    outline: 'none'
                },
                resultsul: {
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    maxHeight: '300px',
                    overflow: 'auto'
                },
                resultsli: {
                    padding: '10px',
                    margin: '0',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                },
                resultsp: {
                    color: 'black',
                    padding: '15px 15px 5px 15px',
                    margin: '10px -10px 0 -10px',
                    borderTop: '1px solid ' + color.borderColor
                }
            };
            return styleObj;
        }
    }, {
        key: 'moveHighlight',
        value: function moveHighlight(mod, e) {
            var _this2 = this;

            if (this.props.data.length) {
                // only if there are results
                this.refs.panelcontainer.focus();
                var newSelect = this.state.selected + mod;
                newSelect = newSelect < 0 ? this.props.data.length - 1 : newSelect;
                newSelect = newSelect >= this.props.data.length ? 0 : newSelect;
                this.setState({
                    selected: newSelect
                }, function () {
                    _this2.refs.panelcontainer.getElementsByTagName("LI")[newSelect].scrollIntoView({ block: "end", behavior: "smooth" });
                });
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        }
    }, {
        key: 'applyValue',
        value: function applyValue(selectedid, e) {
            var _this3 = this;

            if (this.props.data.length) {
                selectedid = selectedid ? selectedid : this.state.selected;
                this.props.onSelect(this.props.data[selectedid]);
                this.setState({
                    value: this.props.data[selectedid].label,
                    show: false
                }, function () {
                    _this3.setState({
                        style: _this3.getStyles()
                    });
                });
            }
        }
    }, {
        key: 'updateSelected',
        value: function updateSelected(newSelect) {
            this.setState({
                selected: newSelect
            });
        }
    }, {
        key: 'keyboardListeners',
        value: function keyboardListeners(e) {
            switch (e.keyCode) {
                case 13:
                    // enter
                    this.applyValue(null, e);
                    break;
                case 38:
                    // up
                    this.moveHighlight(-1, e);
                    break;
                case 40:
                    // down
                    this.moveHighlight(1, e);
                    break;
            }
        }
    }, {
        key: 'open',
        value: function open(willFocus) {
            var _this4 = this;

            this.setState({
                show: true,
                selected: 0
            }, function () {
                if (willFocus === undefined || willFocus) {
                    _this4.refs.panelcontainer.focus();
                }
                window.addEventListener('keydown', _this4.keyboardListeners);
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var _this5 = this;

            this.setState({
                show: false
            }, function () {
                _this5.props.onClose();
                _this5.setState({
                    style: _this5.getStyles()
                });
            });
            window.removeEventListener('keydown', this.keyboardListeners);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var resultsDOM = [];
            var color = this.getColors()[this.props.type];
            this.props.data.map(function (v, i) {
                var activeStyling = {
                    background: color.highlightColor,
                    boxShadow: "2px 0 0 " + color.highlightBorderColor + " inset"
                };
                var resultslistyle = Object.assign(_this6.state.selected === i ? activeStyling : v.value ? {} : { opacity: '.5' }, _this6.state.style.resultsli);

                resultsDOM.push(_react2.default.createElement(
                    'li',
                    { key: "item-" + i, onClick: function onClick() {
                            _this6.applyValue(i);
                        }, onMouseOver: function onMouseOver() {
                            _this6.updateSelected(i);
                        }, 'data-selected': _this6.state.selected === i, style: resultslistyle },
                    v.label
                ));
            });

            var summaryNode = this.props.showSummary ? _react2.default.createElement(
                'p',
                { key: 'summary', style: this.state.style.resultsp },
                'There are ',
                this.props.data ? this.props.data.length : 'NO',
                ' results'
            ) : null;
            return _react2.default.createElement(
                'section',
                { style: this.state.style.results, className: 'SelectPanel', tabIndex: '1', ref: 'panelcontainer', onBlur: this.close },
                _react2.default.createElement(
                    'ul',
                    { style: this.state.style.resultsul },
                    resultsDOM
                ),
                summaryNode
            );
        }
    }]);

    return SelectPanel;
}(_Stripes.StripesTheme);

SelectPanel.defaultProps = {
    style: {},
    type: 'inputs',
    selected: null,
    showSummary: false,
    data: [],
    show: false,
    onClose: function onClose() {}
};