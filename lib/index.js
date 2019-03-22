'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _store = require('./stores/store');

var _store2 = _interopRequireDefault(_store);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * <ReactFormBuilder />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var ReactFormBuilder = function (_React$Component) {
  _inherits(ReactFormBuilder, _React$Component);

  function ReactFormBuilder(props) {
    _classCallCheck(this, ReactFormBuilder);

    var _this = _possibleConstructorReturn(this, (ReactFormBuilder.__proto__ || Object.getPrototypeOf(ReactFormBuilder)).call(this, props));

    _this.state = {
      editMode: false,
      editElement: null
    };
    _this.onDocumentClick = _this.editModeOff.bind(_this);
    document.addEventListener("click", _this.onDocumentClick, false);
    return _this;
  }

  _createClass(ReactFormBuilder, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onDocumentClick, false);
    }
  }, {
    key: 'editModeOn',
    value: function editModeOn(data, e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.state.editMode) {
        this.setState({ editMode: !this.state.editMode, editElement: null });
      } else {
        this.setState({ editMode: !this.state.editMode, editElement: data });
      }
    }
  }, {
    key: 'manualEditModeOff',
    value: function manualEditModeOff() {
      if (this.state.editMode) {
        this.setState({
          editMode: false,
          editElement: null
        });
      }
    }
  }, {
    key: 'editModeOff',
    value: function editModeOff(e) {
      var click_is_outside_menu = !(e.target && e.target.closest(".edit-form")) && e.screenX > 0;

      if (click_is_outside_menu) {
        //this.manualEditModeOff();
      }
    }
  }, {
    key: 'render',
    value: function render() {

      var toolbarProps = {};
      if (this.props.toolbarItems) toolbarProps.items = this.props.toolbarItems;
      return _react2.default.createElement(
        'div',
        { className: 'clearfix container-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'react-form-builder' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_toolbar2.default, this.props.toolbarItems),
            _react2.default.createElement(_preview2.default, { files: this.props.files,
              manualEditModeOff: this.manualEditModeOff.bind(this),
              parent: this,
              url: this.props.url,
              saveUrl: this.props.saveUrl,
              onLoad: this.props.onLoad,
              onPost: this.props.onPost,
              editModeOn: this.editModeOn,
              editMode: this.state.editMode,
              variables: this.props.variables,
              editElement: this.state.editElement })
          )
        )
      );
    }
  }]);

  return ReactFormBuilder;
}(_react2.default.Component);

var FormBuilders = {};

FormBuilders.ReactFormBuilder = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(ReactFormBuilder);
FormBuilders.ReactFormGenerator = _form2.default;
FormBuilders.ElementStore = _store2.default;

module.exports = FormBuilders;