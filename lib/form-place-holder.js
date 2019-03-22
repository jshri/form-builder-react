'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PLACE_HOLDER = 'form-place-holder';

var PlaceHolder = function (_React$Component) {
  _inherits(PlaceHolder, _React$Component);

  function PlaceHolder() {
    _classCallCheck(this, PlaceHolder);

    return _possibleConstructorReturn(this, (PlaceHolder.__proto__ || Object.getPrototypeOf(PlaceHolder)).apply(this, arguments));
  }

  _createClass(PlaceHolder, [{
    key: 'render',
    value: function render() {
      return this.props.show && _react2.default.createElement(
        'div',
        { className: PLACE_HOLDER },
        _react2.default.createElement(
          'div',
          null,
          this.props.text
        )
      );
    }
  }]);

  return PlaceHolder;
}(_react2.default.Component);

exports.default = PlaceHolder;


PlaceHolder.propTypes = {
  text: _propTypes2.default.string,
  show: _propTypes2.default.bool
};

PlaceHolder.defaultProps = {
  text: 'Drop an item here ....',
  show: false
};