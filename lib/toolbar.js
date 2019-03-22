'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toolbarDraggableItem = require('./toolbar-draggable-item');

var _toolbarDraggableItem2 = _interopRequireDefault(_toolbarDraggableItem);

var _reactBootstrap = require('react-bootstrap');

var _UUID = require('./UUID');

var _UUID2 = _interopRequireDefault(_UUID);

var _store = require('./stores/store.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * <Toolbar />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    var items = _this.props.items ? _this.props.items : _this._defaultItems();
    _this.state = {
      items: items
    };
    _store2.default.subscribe(function (state) {
      return _this.setState({ store: state });
    });
    return _this;
  }

  _createClass(Toolbar, [{
    key: '_defaultItems',
    value: function _defaultItems() {
      return [{
        key: 'Header',
        name: 'Header Text',
        icon: 'fa fa-header',
        static: true,
        content: 'Header Text...',
        elementType: 'noInputElement'
      }, {
        key: 'Label',
        name: 'Label',
        static: true,
        icon: 'fa fa-font',
        content: 'Label Text...',
        elementType: 'noInputElement'
      }, {
        key: 'Paragraph',
        name: 'Paragraph',
        static: true,
        icon: 'fa fa-paragraph',
        content: 'Paragraph Text...',
        elementType: 'noInputElement'
      }, {
        key: 'LineBreak',
        name: 'Line Break',
        static: true,
        icon: 'fa fa-arrows-h',
        elementType: 'noInputElement'
      }, {
        key: 'TextInput',
        canHaveAnswer: true,
        name: 'Text Input',
        label: 'Text Input Label',
        icon: 'fa fa-terminal',
        field_name: 'text_input_',
        elementType: 'simpleInputElement',
        canHaveTooltip: true,
        toolTip: ''
      }, {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: 'Number Input',
        label: 'Number Input Label',
        icon: 'fa fa-plus',
        field_name: 'number_input_',
        elementType: 'simpleInputElement'
      }, {
        key: 'TextArea',
        canHaveAnswer: true,
        name: 'Multi-line Input',
        label: 'Text Area Label',
        icon: 'fa fa-text-height',
        field_name: 'text_area_',
        elementType: 'simpleInputElement'
      }, {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: 'Dropdown',
        icon: 'fa fa-caret-square-o-down',
        label: 'Dropdown Label',
        field_name: 'dropdown_',
        options: [],
        elementType: 'simpleInputElement'
      }, {
        key: 'Tags',
        canHaveAnswer: true,
        name: 'Tags',
        icon: 'fa fa-tags',
        label: 'Tags Label',
        field_name: 'tags_',
        options: [],
        elementType: 'customInputElement'
      }, {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: 'Checkboxes',
        icon: 'fa fa-check-square-o',
        label: 'Checkboxes Label',
        field_name: 'checkboxes_',
        options: [],
        elementType: 'simpleInputElement'
      }, {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: 'Multiple Choice',
        icon: 'fa fa-dot-circle-o',
        label: 'Radio Buttons Label',
        field_name: 'radio_buttons_',
        options: [],
        elementType: 'simpleInputElement'
      }, {
        key: 'Image',
        name: 'Image',
        label: '',
        icon: 'fa fa-photo',
        field_name: 'image_',
        src: '',
        elementType: 'noInputElement'
      }, {
        key: 'Rating',
        canHaveAnswer: true,
        name: 'Rating',
        label: 'Placeholder Label',
        icon: 'fa fa-star',
        field_name: 'rating_',
        elementType: 'customInputElement'
      }, {
        key: 'DatePicker',
        canHaveAnswer: true,
        canDefaultToday: true,
        canReadOnly: true,
        name: 'Date',
        icon: 'fa fa-calendar',
        label: 'Date Picker Label',
        field_name: 'date_picker_',
        elementType: 'customInputElement'
      }, {
        key: 'Signature',
        canReadOnly: true,
        name: 'Signature',
        icon: 'fa fa-pencil-square-o',
        label: 'Signature',
        field_name: 'signature_',
        elementType: 'customInputElement'
      }, {
        key: 'HyperLink',
        name: 'Web site',
        icon: 'fa fa-link',
        static: true,
        content: 'HyperLink here ...',
        href: 'http://www.example.com',
        elementType: 'noInputElement'
      }, {
        key: 'Download',
        name: 'File Attachment',
        icon: 'fa fa-file',
        static: true,
        content: 'File Attachment Label ...',
        field_name: 'download_',
        file_path: '',
        _href: '',
        elementType: 'customInputElement'
      }, {
        key: 'Range',
        name: 'Range',
        icon: 'fa fa-sliders',
        label: 'Range Label',
        field_name: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: 'Easy',
        max_label: 'Difficult',
        elementType: 'customInputElement'
      }, {
        key: 'Camera',
        name: 'Camera',
        icon: 'fa fa-camera',
        label: 'Camera Label',
        field_name: 'camera_',
        elementType: 'simpleInputElement'
      }, {
        key: 'AccordionSection',
        name: 'Accordion Section',
        icon: 'fa fa-columns  fa-rotate-270',
        label: 'Section Label',
        field_name: 'accordionsection_',
        elementType: 'layout',
        components: []
      }, {
        key: 'PeoplePicker',
        canHaveAnswer: true,
        name: 'People Picker',
        icon: 'fa fa-user',
        label: 'People Picker Label',
        field_name: 'peoplepicker_',
        elementType: 'customInputElement'
      }];
    }
  }, {
    key: 'create',
    value: function create(item) {
      var elementOptions = {
        id: _UUID2.default.uuid(),
        element: item.key,
        text: item.name,
        static: item.static,
        required: false,
        dataKey: 'key'
      };

      if (item.static) {
        elementOptions['bold'] = false;
        elementOptions['italic'] = false;
      }

      if (item.helpText) elementOptions['helpText'] = item.helpText;

      if (item.canHaveTooltip) elementOptions['canHaveTooltip'] = item.canHaveTooltip;
      elementOptions['toolTip'] = item.toolTip;

      if (item.canHaveAnswer) elementOptions['canHaveAnswer'] = item.canHaveAnswer;

      if (item.canReadOnly) elementOptions['readOnly'] = false;

      if (item.canDefaultToday) elementOptions['defaultToday'] = false;

      if (item.content) elementOptions['content'] = item.content;

      if (item.href) elementOptions['href'] = item.href;

      if (item.key === "Image") {
        elementOptions['src'] = item.src;
      }

      if (item.key === "Download") {
        elementOptions['_href'] = item._href;
        elementOptions['file_path'] = item.file_path;
      }

      if (item.key === "Range") {
        elementOptions['step'] = item.step;
        elementOptions['default_value'] = item.default_value;
        elementOptions['min_value'] = item.min_value;
        elementOptions['max_value'] = item.max_value;
        elementOptions['min_label'] = item.min_label;
        elementOptions['max_label'] = item.max_label;
      }

      if (item.defaultValue) elementOptions['defaultValue'] = item.defaultValue;

      if (item.field_name) elementOptions['field_name'] = item.field_name + _UUID2.default.uuid();

      if (item.label) elementOptions['label'] = item.label;

      if (item.options) {
        elementOptions['options'] = Toolbar._defaultItemOptions(elementOptions['element']);
      }

      if (item.key === "PeoplePicker") {
        elementOptions['data_source'] = item.data_source;
        elementOptions['data_list'] = item.data_list;
      }

      if (item.key === "AccordionSection") {
        elementOptions['components'] = [];
      }

      return elementOptions;
    }
  }, {
    key: '_onClick',
    value: function _onClick(item) {
      // ElementActions.createElement(this.create(item));
      _store2.default.dispatch('create', this.create(item));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'react-form-builder-toolbar' },
        _react2.default.createElement(
          _reactBootstrap.PanelGroup,
          { accordion: true, defaultActiveKey: '2', id: 'toolbar' },
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { eventKey: '1' },
            _react2.default.createElement(
              _reactBootstrap.Panel.Heading,
              null,
              _react2.default.createElement(
                _reactBootstrap.Panel.Title,
                { toggle: true },
                'Info Elements'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel.Body,
              { collapsible: true },
              _react2.default.createElement(
                'ul',
                { className: 'tool-bar-elements' },
                this.state.items.map(function (item) {
                  if (item.elementType === "noInputElement") {
                    return _react2.default.createElement(_toolbarDraggableItem2.default, { data: item, key: item.key, onClick: _this2._onClick.bind(_this2, item), onCreate: _this2.create });
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { eventKey: '2' },
            _react2.default.createElement(
              _reactBootstrap.Panel.Heading,
              null,
              _react2.default.createElement(
                _reactBootstrap.Panel.Title,
                { toggle: true },
                'General Form Elements'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel.Body,
              { collapsible: true },
              _react2.default.createElement(
                'ul',
                { className: 'tool-bar-elements' },
                this.state.items.map(function (item) {
                  if (item.elementType === "simpleInputElement") {
                    return _react2.default.createElement(_toolbarDraggableItem2.default, { data: item, key: item.key, onClick: _this2._onClick.bind(_this2, item), onCreate: _this2.create });
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { eventKey: '3' },
            _react2.default.createElement(
              _reactBootstrap.Panel.Heading,
              null,
              _react2.default.createElement(
                _reactBootstrap.Panel.Title,
                { toggle: true },
                'Custom Form Elements'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel.Body,
              { collapsible: true },
              _react2.default.createElement(
                'ul',
                { className: 'tool-bar-elements' },
                this.state.items.map(function (item) {
                  if (item.elementType === "customInputElement") {
                    return _react2.default.createElement(_toolbarDraggableItem2.default, { data: item, key: item.key, onClick: _this2._onClick.bind(_this2, item), onCreate: _this2.create });
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { eventKey: '4' },
            _react2.default.createElement(
              _reactBootstrap.Panel.Heading,
              null,
              _react2.default.createElement(
                _reactBootstrap.Panel.Title,
                { toggle: true },
                'Layouts'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel.Body,
              { collapsible: true },
              _react2.default.createElement(
                'ul',
                { className: 'tool-bar-elements' },
                this.state.items.map(function (item) {
                  if (item.elementType === "layout") {
                    return _react2.default.createElement(_toolbarDraggableItem2.default, { data: item, key: item.key, onClick: _this2._onClick.bind(_this2, item), onCreate: _this2.create });
                  }
                })
              )
            )
          )
        )
      );
    }
  }], [{
    key: '_defaultItemOptions',
    value: function _defaultItemOptions(element) {
      switch (element) {
        case "Dropdown":
          return [{ value: '', text: '', key: 'dropdown_option_' + _UUID2.default.uuid() }, { value: '', text: '', key: 'dropdown_option_' + _UUID2.default.uuid() }, { value: '', text: '', key: 'dropdown_option_' + _UUID2.default.uuid() }];
        case "Tags":
          return [{ value: 'place_holder_tag_1', text: 'Place holder tag 1', key: 'tags_option_' + _UUID2.default.uuid() }, { value: 'place_holder_tag_2', text: 'Place holder tag 2', key: 'tags_option_' + _UUID2.default.uuid() }, { value: 'place_holder_tag_3', text: 'Place holder tag 3', key: 'tags_option_' + _UUID2.default.uuid() }];
        case "Checkboxes":
          return [{ value: 'place_holder_option_1', text: 'Place holder option 1', key: 'checkboxes_option_' + _UUID2.default.uuid() }, { value: 'place_holder_option_2', text: 'Place holder option 2', key: 'checkboxes_option_' + _UUID2.default.uuid() }, { value: 'place_holder_option_3', text: 'Place holder option 3', key: 'checkboxes_option_' + _UUID2.default.uuid() }];
        case "RadioButtons":
          return [{ value: 'place_holder_option_1', text: 'Place holder option 1', key: 'radiobuttons_option_' + _UUID2.default.uuid() }, { value: 'place_holder_option_2', text: 'Place holder option 2', key: 'radiobuttons_option_' + _UUID2.default.uuid() }, { value: 'place_holder_option_3', text: 'Place holder option 3', key: 'radiobuttons_option_' + _UUID2.default.uuid() }];
        default:
          return [];
      }
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

exports.default = Toolbar;