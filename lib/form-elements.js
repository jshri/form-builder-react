'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _headerBar = require('./header-bar');

var _headerBar2 = _interopRequireDefault(_headerBar);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Async = require('react-select/lib/Async');

var _Async2 = _interopRequireDefault(_Async);

var _reactSignatureCanvas = require('react-signature-canvas');

var _reactSignatureCanvas2 = _interopRequireDefault(_reactSignatureCanvas);

var _formPlaceHolder = require('./form-place-holder');

var _formPlaceHolder2 = _interopRequireDefault(_formPlaceHolder);

var _reactBootstrapSlider = require('react-bootstrap-slider');

var _reactBootstrapSlider2 = _interopRequireDefault(_reactBootstrapSlider);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _starRating = require('./star-rating');

var _starRating2 = _interopRequireDefault(_starRating);

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactBootstrap = require('react-bootstrap');

var _dropableSection = require('./dropable-section');

var _dropableSection2 = _interopRequireDefault(_dropableSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormElements = {};
var myxss = new _xss2.default.FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol: ['style'],
    ul: ['style'],
    li: [],
    p: ['style'],
    sub: [],
    sup: [],
    div: ['style'],
    em: [],
    strong: [],
    span: ['style']
  }
});

var ComponentLabel = function (_React$Component) {
  _inherits(ComponentLabel, _React$Component);

  function ComponentLabel() {
    _classCallCheck(this, ComponentLabel);

    return _possibleConstructorReturn(this, (ComponentLabel.__proto__ || Object.getPrototypeOf(ComponentLabel)).apply(this, arguments));
  }

  _createClass(ComponentLabel, [{
    key: 'render',
    value: function render() {
      var hasRequiredLabel = this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only;
      var hasToolTip = this.props.data.hasOwnProperty('canHaveTooltip') && this.props.data.canHaveTooltip && this.props.data.toolTip && this.props.data.toolTip.length > 0;
      var toolTilpId = "tooltip-" + this.props.id;
      var tooltip = _react2.default.createElement(
        _reactBootstrap.Tooltip,
        { id: toolTilpId },
        this.props.data.toolTip
      );
      return _react2.default.createElement(
        'label',
        { className: this.props.className || '' },
        _react2.default.createElement('span', { className: 'question-label', dangerouslySetInnerHTML: { __html: myxss.process(this.props.data.label) } }),
        hasRequiredLabel && _react2.default.createElement(
          'span',
          { className: 'label-required label label-danger' },
          'Required'
        ),
        hasToolTip && _react2.default.createElement(
          _reactBootstrap.OverlayTrigger,
          { overlay: tooltip },
          _react2.default.createElement('span', { className: 'fa fa-info-circle component-tooltip' })
        )
      );
    }
  }]);

  return ComponentLabel;
}(_react2.default.Component);

;

var HelpText = function (_React$Component2) {
  _inherits(HelpText, _React$Component2);

  function HelpText() {
    _classCallCheck(this, HelpText);

    return _possibleConstructorReturn(this, (HelpText.__proto__ || Object.getPrototypeOf(HelpText)).apply(this, arguments));
  }

  _createClass(HelpText, [{
    key: 'render',
    value: function render() {
      var hasHelpText = this.props.data.hasOwnProperty('helpText') && this.props.data.helpText && this.props.data.helpText.length > 0;
      return { hasHelpText: _react2.default.createElement(
          'div',
          { className: 'help-text' },
          this.props.data.helpText
        )
      };
    }
  }]);

  return HelpText;
}(_react2.default.Component);

;

var Header = function (_React$Component3) {
  _inherits(Header, _React$Component3);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var headerClasses = 'dynamic-input ' + this.props.data.element + '-input';
      var classNames = 'static';
      if (this.props.data.bold) {
        classNames += ' bold';
      }
      if (this.props.data.italic) {
        classNames += ' italic';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement('h3', { className: classNames, dangerouslySetInnerHTML: { __html: myxss.process(this.props.data.content) } })
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

var Paragraph = function (_React$Component4) {
  _inherits(Paragraph, _React$Component4);

  function Paragraph() {
    _classCallCheck(this, Paragraph);

    return _possibleConstructorReturn(this, (Paragraph.__proto__ || Object.getPrototypeOf(Paragraph)).apply(this, arguments));
  }

  _createClass(Paragraph, [{
    key: 'render',
    value: function render() {
      var classNames = 'static';
      if (this.props.data.bold) {
        classNames += ' bold';
      }
      if (this.props.data.italic) {
        classNames += ' italic';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement('p', { className: classNames, dangerouslySetInnerHTML: { __html: myxss.process(this.props.data.content) } })
      );
    }
  }]);

  return Paragraph;
}(_react2.default.Component);

var Label = function (_React$Component5) {
  _inherits(Label, _React$Component5);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).apply(this, arguments));
  }

  _createClass(Label, [{
    key: 'render',
    value: function render() {
      var classNames = 'static';
      if (this.props.data.bold) {
        classNames += ' bold';
      }
      if (this.props.data.italic) {
        classNames += ' italic';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'label',
          { className: this.props.className || '' },
          _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: myxss.process(this.props.data.content) } })
        )
      );
    }
  }]);

  return Label;
}(_react2.default.Component);

var LineBreak = function (_React$Component6) {
  _inherits(LineBreak, _React$Component6);

  function LineBreak() {
    _classCallCheck(this, LineBreak);

    return _possibleConstructorReturn(this, (LineBreak.__proto__ || Object.getPrototypeOf(LineBreak)).apply(this, arguments));
  }

  _createClass(LineBreak, [{
    key: 'render',
    value: function render() {

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement('hr', null)
      );
    }
  }]);

  return LineBreak;
}(_react2.default.Component);

var TextInput = function (_React$Component7) {
  _inherits(TextInput, _React$Component7);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this7 = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this7.inputField = _react2.default.createRef();
    return _this7;
  }

  _createClass(TextInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = "text";
      props.className = "form-control";
      props.datakey = this.props.data.dataKey;
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = "disabled";
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return TextInput;
}(_react2.default.Component);

var NumberInput = function (_React$Component8) {
  _inherits(NumberInput, _React$Component8);

  function NumberInput(props) {
    _classCallCheck(this, NumberInput);

    var _this8 = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

    _this8.inputField = _react2.default.createRef();
    return _this8;
  }

  _createClass(NumberInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = "number";
      props.className = "form-control";
      props.name = this.props.data.field_name;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = "disabled";
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return NumberInput;
}(_react2.default.Component);

var TextArea = function (_React$Component9) {
  _inherits(TextArea, _React$Component9);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this9 = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

    _this9.inputField = _react2.default.createRef();
    return _this9;
  }

  _createClass(TextArea, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.className = "form-control";
      props.name = this.props.data.field_name;

      if (this.props.read_only) {
        props.disabled = "disabled";
      }

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement('textarea', props)
        )
      );
    }
  }]);

  return TextArea;
}(_react2.default.Component);

var DatePicker = function (_React$Component10) {
  _inherits(DatePicker, _React$Component10);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this10 = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

    _this10.handleChange = function (dt) {
      if (dt && dt.target) {

        var placeholder = dt && dt.target && dt.target.value === '' ? 'mm/dd/yyyy' : '';
        var formattedDate = dt.target.value ? (0, _moment2.default)(dt.target.value).format('YYYY-MM-DD') : '';

        _this10.setState({
          value: formattedDate,
          internalValue: formattedDate,
          placeholder: placeholder
        });
      } else {
        _this10.setState({
          value: dt ? dt.format('MM/DD/YYYY') : '',
          internalValue: dt,
          placeholder: placeholder
        });
      }
    };

    _this10.inputField = _react2.default.createRef();
    var value = void 0,
        internalValue = void 0;

    if (props.data.defaultToday && (props.defaultValue === '' || props.defaultValue === undefined)) {
      value = (0, _moment2.default)().format('MM/DD/YYYY');
      internalValue = (0, _moment2.default)();
    } else {
      value = props.defaultValue;

      if (props.defaultValue !== '' && props.defaultValue !== undefined) {
        internalValue = (0, _moment2.default)(value, 'MM/DD/YYYY');
      }
    }

    _this10.state = {
      value: value,
      internalValue: internalValue,
      placeholder: 'mm/dd/yyyy',
      defaultToday: props.data.defaultToday
    };
    return _this10;
  }

  _createClass(DatePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      if (this.props.data.defaultToday && !this.state.defaultToday) {
        this.state.value = (0, _moment2.default)().format('MM/DD/YYYY');
        this.state.internalValue = (0, _moment2.default)(this.state.value);
      } else if (!this.props.data.defaultToday && this.state.defaultToday) {
        this.state.value = '';
        this.state.internalValue = undefined;
      }

      this.state.defaultToday = this.props.data.defaultToday;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {};
      props.type = "date";
      props.className = "form-control";
      props.name = this.props.data.field_name;

      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = "disabled";
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement(
            'div',
            null,
            this.props.data.readOnly && _react2.default.createElement('input', { type: 'text',
              name: props.name,
              ref: props.ref,
              readOnly: 'true',
              dateFormat: 'MM/DD/YYYY',
              placeholder: this.state.placeholder,
              value: this.state.value,
              className: 'form-control' }),
            iOS && !this.props.data.readOnly && _react2.default.createElement('input', { type: 'date',
              name: props.name,
              ref: props.ref,
              onChange: this.handleChange,
              dateFormat: 'MM/DD/YYYY',
              placeholder: this.state.placeholder,
              value: this.state.value,
              className: 'form-control' }),
            !iOS && !this.props.data.readOnly && _react2.default.createElement(_reactDatepicker2.default, {
              name: props.name,
              ref: props.ref,
              onChange: this.handleChange,
              selected: this.state.internalValue,
              todayButton: 'Today',
              className: 'form-control',
              isClearable: true,
              dateFormat: 'MM/DD/YYYY',
              placeholderText: 'mm/dd/yyyy' })
          )
        )
      );
    }
  }]);

  return DatePicker;
}(_react2.default.Component);

var Dropdown = function (_React$Component11) {
  _inherits(Dropdown, _React$Component11);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this11 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this11.inputField = _react2.default.createRef();
    return _this11;
  }

  _createClass(Dropdown, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.className = "form-control";
      props.name = this.props.data.field_name;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = "disabled";
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement(
            'select',
            props,
            this.props.data.options.map(function (option) {
              var this_key = 'preview_' + option.key;
              return _react2.default.createElement(
                'option',
                { value: option.value, key: this_key },
                option.text
              );
            })
          )
        )
      );
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

var Signature = function (_React$Component12) {
  _inherits(Signature, _React$Component12);

  function Signature(props) {
    _classCallCheck(this, Signature);

    var _this12 = _possibleConstructorReturn(this, (Signature.__proto__ || Object.getPrototypeOf(Signature)).call(this, props));

    _this12.inputField = _react2.default.createRef();
    _this12.canvas = _react2.default.createRef();
    return _this12;
  }

  _createClass(Signature, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.defaultValue !== undefined && this.props.defaultValue.length > 0 && !this.props.read_only) {
        //let canvas = this.canvas; // this.refs['canvas_'+this.props.data.field_name];
        //canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {};
      props.type = "hidden";
      props.name = this.props.data.field_name;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }
      var pad_props = {};
      pad_props.clearButton = true;
      if (this.props.mutable) {
        pad_props.defaultValue = this.props.defaultValue;
        pad_props.ref = this.canvas;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      var sourceDataURL = void 0;
      if (this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0) {
        sourceDataURL = 'data:image/png;base64,' + this.props.defaultValue;
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0 ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('img', { src: sourceDataURL })
          ) : _react2.default.createElement(_reactSignatureCanvas2.default, pad_props),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return Signature;
}(_react2.default.Component);

var Tags = function (_React$Component13) {
  _inherits(Tags, _React$Component13);

  function Tags(props) {
    _classCallCheck(this, Tags);

    var _this13 = _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));

    _this13.state = { value: _this13.props.defaultValue !== undefined ? _this13.props.defaultValue.split(",") : [] };

    _this13.handleChange = function (e) {
      _this13.setState({ value: e });
    };

    _this13.inputField = _react2.default.createRef();
    return _this13;
  }

  _createClass(Tags, [{
    key: 'render',
    value: function render() {
      var options = this.props.data.options.map(function (option) {
        option.label = option.text;
        return option;
      });
      var props = {};
      props.isMulti = true;
      props.name = this.props.data.field_name;
      props.onChange = this.handleChange;

      props.options = options;
      if (!this.props.mutable) {
        props.value = options[0].text;
      } // to show a sample of what tags looks like
      if (this.props.mutable) {
        props.value = this.state.value;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement(_reactSelect2.default, props)
        )
      );
    }
  }]);

  return Tags;
}(_react2.default.Component);

var Checkboxes = function (_React$Component14) {
  _inherits(Checkboxes, _React$Component14);

  function Checkboxes(props) {
    _classCallCheck(this, Checkboxes);

    var _this14 = _possibleConstructorReturn(this, (Checkboxes.__proto__ || Object.getPrototypeOf(Checkboxes)).call(this, props));

    _this14.options = {};
    return _this14;
  }

  _createClass(Checkboxes, [{
    key: 'render',
    value: function render() {
      var self = this;
      var classNames = 'checkbox-label';
      if (this.props.data.inline) {
        classNames += ' option-inline';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, _extends({ className: 'form-label' }, this.props)),
          this.props.data.options.map(function (option) {
            var this_key = 'preview_' + option.key;
            var props = {};
            props.name = 'option_' + option.key;

            props.type = "checkbox";
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
            }
            return _react2.default.createElement(
              'label',
              { className: classNames, key: this_key },
              _react2.default.createElement('input', _extends({ ref: function ref(c) {
                  if (c && self.props.mutable) {
                    self.options['child_ref_' + option.key] = c;
                  }
                } }, props)),
              ' ',
              option.text
            );
          })
        )
      );
    }
  }]);

  return Checkboxes;
}(_react2.default.Component);

var RadioButtons = function (_React$Component15) {
  _inherits(RadioButtons, _React$Component15);

  function RadioButtons(props) {
    _classCallCheck(this, RadioButtons);

    var _this15 = _possibleConstructorReturn(this, (RadioButtons.__proto__ || Object.getPrototypeOf(RadioButtons)).call(this, props));

    _this15.options = {};
    return _this15;
  }

  _createClass(RadioButtons, [{
    key: 'render',
    value: function render() {
      var self = this;
      var classNames = 'radio-label';
      if (this.props.data.inline) {
        classNames += ' option-inline';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, _extends({ className: 'form-label' }, this.props)),
          this.props.data.options.map(function (option) {
            var this_key = 'preview_' + option.key;
            var props = {};
            props.name = self.props.data.field_name;

            props.type = "radio";
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
            }
            return _react2.default.createElement(
              'label',
              { className: classNames, key: this_key },
              _react2.default.createElement('input', _extends({ ref: function ref(c) {
                  if (c && self.props.mutable) {
                    self.options['child_ref_' + option.key] = c;
                  }
                } }, props)),
              ' ',
              option.text
            );
          })
        )
      );
    }
  }]);

  return RadioButtons;
}(_react2.default.Component);

var Image = function (_React$Component16) {
  _inherits(Image, _React$Component16);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var style = this.props.data.center ? { textAlign: 'center' } : null;

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses, style: style },
        !this.props.mutable && _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, required: this.props.data.required }),
        this.props.data.src && _react2.default.createElement('img', { src: this.props.data.src, width: this.props.data.width, height: this.props.data.height }),
        !this.props.data.src && _react2.default.createElement(
          'div',
          { className: 'no-image' },
          'No Image'
        )
      );
    }
  }]);

  return Image;
}(_react2.default.Component);

var Rating = function (_React$Component17) {
  _inherits(Rating, _React$Component17);

  function Rating(props) {
    _classCallCheck(this, Rating);

    var _this17 = _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));

    _this17.inputField = _react2.default.createRef();
    return _this17;
  }

  _createClass(Rating, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.name = this.props.data.field_name;
      props.ratingAmount = 5;

      if (this.props.mutable) {
        props.rating = this.props.defaultValue !== undefined && this.props.defaultValue.length ? parseFloat(this.props.defaultValue, 10) : 0;
        props.editing = true;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement(_starRating2.default, props)
        )
      );
    }
  }]);

  return Rating;
}(_react2.default.Component);

var HyperLink = function (_React$Component18) {
  _inherits(HyperLink, _React$Component18);

  function HyperLink() {
    _classCallCheck(this, HyperLink);

    return _possibleConstructorReturn(this, (HyperLink.__proto__ || Object.getPrototypeOf(HyperLink)).apply(this, arguments));
  }

  _createClass(HyperLink, [{
    key: 'render',
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'a',
            { target: '_blank', href: this.props.data.href },
            this.props.data.content
          )
        )
      );
    }
  }]);

  return HyperLink;
}(_react2.default.Component);

var Download = function (_React$Component19) {
  _inherits(Download, _React$Component19);

  function Download() {
    _classCallCheck(this, Download);

    return _possibleConstructorReturn(this, (Download.__proto__ || Object.getPrototypeOf(Download)).apply(this, arguments));
  }

  _createClass(Download, [{
    key: 'render',
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'a',
            { href: this.props.download_path + '?id=' + this.props.data.file_path },
            this.props.data.content
          )
        )
      );
    }
  }]);

  return Download;
}(_react2.default.Component);

var Camera = function (_React$Component20) {
  _inherits(Camera, _React$Component20);

  function Camera(props) {
    _classCallCheck(this, Camera);

    var _this20 = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, props));

    _this20.displayImage = function (e) {
      var self = _this20;
      var target = e.target;
      var file, reader;

      if (target.files && target.files.length) {
        file = target.files[0];
        reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
          self.setState({
            img: reader.result
          });
        };
      }
    };

    _this20.clearImage = function () {
      _this20.setState({
        img: null
      });
    };

    _this20.state = { img: null };
    return _this20;
  }

  _createClass(Camera, [{
    key: 'render',
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';
      var name = this.props.data.field_name;
      var fileInputStyle = this.state.img ? { display: 'none' } : null;
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement(
            'div',
            { className: 'image-upload-container' },
            _react2.default.createElement(
              'div',
              { style: fileInputStyle },
              _react2.default.createElement('input', { name: name, type: 'file', accept: 'image/*', capture: 'camera', className: 'image-upload', onChange: this.displayImage }),
              _react2.default.createElement(
                'div',
                { className: 'image-upload-control' },
                _react2.default.createElement(
                  'div',
                  { className: 'btn btn-default btn-school' },
                  _react2.default.createElement('i', { className: 'fa fa-camera' }),
                  ' Upload Photo'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  'Select an image from your computer or device.'
                )
              )
            ),
            this.state.img && _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('img', { src: this.state.img, height: '100', className: 'image-upload-preview' }),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'div',
                { className: 'btn btn-school btn-image-clear', onClick: this.clearImage },
                _react2.default.createElement('i', { className: 'fa fa-times' }),
                ' Clear Photo'
              )
            )
          )
        )
      );
    }
  }]);

  return Camera;
}(_react2.default.Component);

var Range = function (_React$Component21) {
  _inherits(Range, _React$Component21);

  function Range(props) {
    _classCallCheck(this, Range);

    var _this21 = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, props));

    _this21.changeValue = function (e) {
      var target = e.target;

      _this21.setState({
        value: target.value
      });
    };

    _this21.inputField = _react2.default.createRef();
    _this21.state = {
      value: props.defaultValue !== undefined ? parseInt(props.defaultValue, 10) : parseInt(props.data.default_value, 10)
    };
    return _this21;
  }

  _createClass(Range, [{
    key: 'render',
    value: function render() {
      var props = {};
      var name = this.props.data.field_name;

      props.type = "range";
      props.list = "tickmarks_" + name;
      props.min = this.props.data.min_value;
      props.max = this.props.data.max_value;
      props.step = this.props.data.step;

      props.value = this.state.value;
      props.change = this.changeValue;

      if (this.props.mutable) {
        props.ref = this.inputField;
      }

      var datalist = [];
      for (var i = parseInt(props.min_value, 10); i <= parseInt(props.max_value, 10); i += parseInt(props.step, 10)) {
        datalist.push(i);
      }

      var oneBig = 100 / (datalist.length - 1);

      var _datalist = datalist.map(function (d, idx) {
        return _react2.default.createElement(
          'option',
          { key: props.list + '_' + idx },
          d
        );
      });

      var visible_marks = datalist.map(function (d, idx) {
        var option_props = {};
        var w = oneBig;
        if (idx === 0 || idx === datalist.length - 1) w = oneBig / 2;
        option_props.key = props.list + '_label_' + idx;
        option_props.style = { width: w + '%' };
        if (idx === datalist.length - 1) option_props.style = { width: w + '%', textAlign: 'right' };
        return _react2.default.createElement(
          'label',
          option_props,
          d
        );
      });

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement(
            'div',
            { className: 'range' },
            _react2.default.createElement(
              'div',
              { className: 'clearfix' },
              _react2.default.createElement(
                'span',
                { className: 'pull-left' },
                this.props.data.min_label
              ),
              _react2.default.createElement(
                'span',
                { className: 'pull-right' },
                this.props.data.max_label
              )
            ),
            _react2.default.createElement(_reactBootstrapSlider2.default, props)
          ),
          _react2.default.createElement(
            'div',
            { className: 'visible_marks' },
            visible_marks
          ),
          _react2.default.createElement('input', { name: name, value: this.state.value, type: 'hidden' }),
          _react2.default.createElement(
            'datalist',
            { id: props.list },
            _datalist
          )
        )
      );
    }
  }]);

  return Range;
}(_react2.default.Component);

var AccordionSection = function (_React$Component22) {
  _inherits(AccordionSection, _React$Component22);

  function AccordionSection() {
    _classCallCheck(this, AccordionSection);

    return _possibleConstructorReturn(this, (AccordionSection.__proto__ || Object.getPrototypeOf(AccordionSection)).apply(this, arguments));
  }

  _createClass(AccordionSection, [{
    key: 'render',
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'div',
            { className: 'panel panel-default' },
            _react2.default.createElement(
              'div',
              { className: 'panel-heading' },
              _react2.default.createElement(ComponentLabel, this.props)
            ),
            _react2.default.createElement(
              'div',
              { className: 'panel-body' },
              _react2.default.createElement(_dropableSection2.default, null)
            )
          )
        )
      );
    }
  }]);

  return AccordionSection;
}(_react2.default.Component);

var PeoplePicker = function (_React$Component23) {
  _inherits(PeoplePicker, _React$Component23);

  function PeoplePicker(props) {
    _classCallCheck(this, PeoplePicker);

    var _this23 = _possibleConstructorReturn(this, (PeoplePicker.__proto__ || Object.getPrototypeOf(PeoplePicker)).call(this, props));

    _this23.UsersList = [];

    _this23.filterUsers = function (inputValue) {
      if (inputValue) {
        return _this23.UsersList.filter(function (i) {
          return i.label.toLowerCase().includes(inputValue.toLowerCase());
        });
      }
      return _this23.UsersList;
    };

    _this23.loadOptions = function (inputValue, callback) {
      setTimeout(function () {
        callback(_this23.filterUsers(inputValue));
      }, 1000);
    };

    _this23.inputField = _react2.default.createRef();
    return _this23;
  }

  _createClass(PeoplePicker, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.className = "form-control-people";
      props.name = this.props.data.field_name;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = "disabled";
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, { parent: this.props.parent, editModeOn: this.props.editModeOn, data: this.props.data, onDestroy: this.props._onDestroy, onEdit: this.props.onEdit, 'static': this.props.data.static, required: this.props.data.required })
        ),
        _react2.default.createElement(
          'div',
          { className: 'nopadding' },
          _react2.default.createElement(ComponentLabel, this.props),
          _react2.default.createElement(_Async2.default, _extends({}, props, { isSearchable: true, isClearable: true, loadOptions: this.loadOptions }))
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log(this.props);
      if (this.props.data.data_source === undefined || this.props.data.data_source === "SPSiteUsersList") {
        this.RetrieveSPUsers();
      } else if (this.props.data.data_source === "SPCustomList") {
        this.UsersList = [];
      }
    }
  }, {
    key: 'RetrieveSPUsers',
    value: function RetrieveSPUsers() {
      var _this24 = this;

      var spRequest = new XMLHttpRequest();
      spRequest.open('GET', "/sites/dev-jay/_api/web/SiteUserInfoList/items?$filter=UserName ne null and EMail ne null &$top=5000", true);
      spRequest.setRequestHeader("Accept", "application/json");

      spRequest.onreadystatechange = function () {
        if (spRequest.readyState === 4 && spRequest.status === 200) {
          var result = JSON.parse(spRequest.responseText);
          _this24.UsersList = result.value.map(function (user) {
            var item = {
              label: user.Title,
              value: user.Id
            };

            if (user.EMail) {
              item = { label: user.Title + " (" + user.EMail + ")",
                value: user.Id };
            }

            return item;
          });
        } else if (spRequest.readyState === 4 && spRequest.status !== 200) {
          console.log('Data Request Error Occured !');
        }
      };

      spRequest.send();
    }
  }]);

  return PeoplePicker;
}(_react2.default.Component);

FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.Label = Label;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.Range = Range;
FormElements.AccordionSection = AccordionSection;
FormElements.PeoplePicker = PeoplePicker;

module.exports = FormElements;