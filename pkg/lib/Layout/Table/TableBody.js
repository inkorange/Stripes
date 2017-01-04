"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableBody = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Stripes = require('../../Core/Stripes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableBody = exports.TableBody = function (_StripesTheme) {
    _inherits(TableBody, _StripesTheme);

    function TableBody(props) {
        _classCallCheck(this, TableBody);

        var _this = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));

        _this.stripeRows = _this.stripeRows.bind(_this);
        _this.state = {
            style: {}
        };
        return _this;
    }

    _createClass(TableBody, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                style: this.getStyles()
            });
            if (this.props.zebraStripes) {
                this.stripeRows();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.zebraStripes) {
                this.stripeRows();
            }
        }
    }, {
        key: 'stripeRows',
        value: function stripeRows() {
            var color = this.getColors()[this.props.type].row;
            var rows = this.refs.tableBody.getElementsByTagName("TR");

            for (var i = 0; i < rows.length; i = i + 2) {
                rows[i].style.backgroundColor = color.zebraStripe;
            }

            // color.zebraStripe
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var color = this.getColors()[this.props.type].row;
            var spacing = this.getSpacing()[this.props.type].row;
            var styleObj = {
                base: {
                    height: this.props.height,
                    overflow: 'auto'
                    /*
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0 */
                },
                table: {
                    width: '100%'
                }
            };
            styleObj.base = Object.assign(styleObj.base, this.props.style);
            return styleObj;
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { style: this.state.style.base },
                _react2.default.createElement(
                    'table',
                    { style: this.state.style.table },
                    _react2.default.createElement(
                        'tbody',
                        { ref: 'tableBody' },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return TableBody;
}(_Stripes.StripesTheme);

TableBody.defaultProps = {
    style: {},
    type: 'table',
    height: null,
    zebraStripes: false
};