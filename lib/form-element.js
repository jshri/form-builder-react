'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _headerBar = require('./header-bar');

var _headerBar2 = _interopRequireDefault(_headerBar);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var SortableItemMixin = require('react-anything-sortable/SortableItemMixin')

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      changedValue: _this.props.data.value,
      data: _this.props.data
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // mixins: [SortableItemMixin],


  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var headerClasses = 'dynamic-input ' + this.props.data.element + '-input';

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_headerBar2.default, { name: this.props.data.text, onDestroy: this.props.onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required }),
        this.props.children
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

_class.defaultProps = {
  className: 'rfb-item'
};
exports.default = _class;