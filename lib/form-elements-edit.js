'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dynamicOptionList = require('./dynamic-option-list');

var _dynamicOptionList2 = _interopRequireDefault(_dynamicOptionList);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _reactBootstrap = require('react-bootstrap');

var _draftJs = require('draft-js');

var _draftjsToHtml = require('draftjs-to-html');

var _draftjsToHtml2 = _interopRequireDefault(_draftjsToHtml);

var _reactDraftWysiwyg = require('react-draft-wysiwyg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript']
  }
};

var FormElementsEdit = function (_React$Component) {
  _inherits(FormElementsEdit, _React$Component);

  function FormElementsEdit(props) {
    _classCallCheck(this, FormElementsEdit);

    var _this = _possibleConstructorReturn(this, (FormElementsEdit.__proto__ || Object.getPrototypeOf(FormElementsEdit)).call(this, props));

    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }

  _createClass(FormElementsEdit, [{
    key: 'toggleRequired',
    value: function toggleRequired() {
      var this_element = this.state.element;
    }
  }, {
    key: 'editElementProp',
    value: function editElementProp(elemProperty, targProperty, e) {
      var _this2 = this;

      // elemProperty could be content or label
      // targProperty could be value or checked
      var this_element = this.state.element;
      this_element[elemProperty] = e.target[targProperty];
      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        if (targProperty === 'checked') {
          _this2.updateElement();
        };
      });
    }
  }, {
    key: 'editElementPropValue',
    value: function editElementPropValue(elemProperty, targPropertyValue, e) {
      var _this3 = this;

      var this_element = this.state.element;
      this_element[elemProperty] = targPropertyValue;
      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        if (targPropertyValue) {
          _this3.updateElement();
        };
      });
    }
  }, {
    key: 'onEditorStateChange',
    value: function onEditorStateChange(index, property, editorContent) {

      var html = (0, _draftjsToHtml2.default)((0, _draftJs.convertToRaw)(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
      var this_element = this.state.element;
      this_element[property] = html;

      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: 'updateElement',
    value: function updateElement() {
      var this_element = this.state.element;
      // to prevent ajax calls with no change
      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({ dirty: false });
      }
    }
  }, {
    key: 'convertFromHTML',
    value: function convertFromHTML(content) {
      var newContent = (0, _draftJs.convertFromHTML)(content);
      if (!newContent.contentBlocks) {
        // to prevent crash when no contents in editor
        return _draftJs.EditorState.createEmpty();
      }
      var contentState = _draftJs.ContentState.createFromBlockArray(newContent);
      return _draftJs.EditorState.createWithContent(contentState);
    }
  }, {
    key: 'render',
    value: function render() {
      var this_checked = this.props.element.hasOwnProperty('required') ? this.props.element.required : false;
      var this_read_only = this.props.element.hasOwnProperty('readOnly') ? this.props.element.readOnly : false;
      var this_default_today = this.props.element.hasOwnProperty('defaultToday') ? this.props.element.defaultToday : false;
      var this_checked_inline = this.props.element.hasOwnProperty('inline') ? this.props.element.inline : false;
      var this_checked_bold = this.props.element.hasOwnProperty('bold') ? this.props.element.bold : false;
      var this_checked_italic = this.props.element.hasOwnProperty('italic') ? this.props.element.italic : false;
      var this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
      var this_checked_page_break = this.props.element.hasOwnProperty('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
      var this_checked_alternate_form = this.props.element.hasOwnProperty('alternateForm') ? this.props.element.alternateForm : false;

      var this_checked_data_source = this.props.element.hasOwnProperty('data_source') ? this.props.element.data_source : 'SPSiteUsersList';

      var this_files = this.props.files.length ? this.props.files : [];
      if (this_files.length < 1 || this_files.length > 0 && this_files[0].id !== "") this_files.unshift({ id: '', file_name: '' });

      var editorState = void 0;
      if (this.props.element.hasOwnProperty('content')) {
        editorState = this.convertFromHTML(this.props.element.content);
      }
      if (this.props.element.hasOwnProperty('label')) {
        editorState = this.convertFromHTML(this.props.element.label);
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'clearfix' },
          _react2.default.createElement(
            'h4',
            { className: 'pull-left' },
            this.props.element.text
          ),
          _react2.default.createElement('i', { className: 'pull-right fa fa-times dismiss-edit', onClick: this.props.manualEditModeOff })
        ),
        _react2.default.createElement(
          _reactBootstrap.Tabs,
          { defaultActiveKey: 1, id: 'elementsProperties' },
          _react2.default.createElement(
            _reactBootstrap.Tab,
            { eventKey: 1, title: 'General' },
            this.props.element.hasOwnProperty('content') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { className: 'control-label' },
                'Text to display:'
              ),
              _react2.default.createElement(_reactDraftWysiwyg.Editor, {
                toolbar: toolbar,
                defaultEditorState: editorState,
                onBlur: this.updateElement.bind(this),
                onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'content') })
            ),
            this.props.element.hasOwnProperty('static') && this.props.element.static && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { className: 'control-label' },
                'Text Style'
              ),
              _react2.default.createElement(
                'div',
                { className: 'checkbox' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement('input', { type: 'checkbox', checked: this_checked_bold, value: true, onChange: this.editElementProp.bind(this, 'bold', 'checked') }),
                  'Bold'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'checkbox' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement('input', { type: 'checkbox', checked: this_checked_italic, value: true, onChange: this.editElementProp.bind(this, 'italic', 'checked') }),
                  'Italic'
                )
              )
            ),
            this.props.element.hasOwnProperty('file_path') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { className: 'control-label', htmlFor: 'fileSelect' },
                'Choose file:'
              ),
              _react2.default.createElement(
                'select',
                { id: 'fileSelect', className: 'form-control', defaultValue: this.props.element.file_path, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'file_path', 'value') },
                this_files.map(function (file) {
                  var this_key = 'file_' + file.id;
                  return _react2.default.createElement(
                    'option',
                    { value: file.id, key: this_key },
                    file.file_name
                  );
                })
              )
            ),
            this.props.element.hasOwnProperty('href') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(_reactTextareaAutosize2.default, { type: 'text', className: 'form-control', defaultValue: this.props.element.href, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'href', 'value') })
            ),
            this.props.element.hasOwnProperty('src') && _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label', htmlFor: 'srcInput' },
                  'Link to:'
                ),
                _react2.default.createElement('input', { id: 'srcInput', type: 'text', className: 'form-control', defaultValue: this.props.element.src, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'src', 'value') })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'div',
                  { className: 'checkbox' },
                  _react2.default.createElement(
                    'label',
                    null,
                    _react2.default.createElement('input', { type: 'checkbox', checked: this_checked_center, value: true, onChange: this.editElementProp.bind(this, 'center', 'checked') }),
                    'Center?'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-3' },
                  _react2.default.createElement(
                    'label',
                    { className: 'control-label', htmlFor: 'elementWidth' },
                    'Width:'
                  ),
                  _react2.default.createElement('input', { id: 'elementWidth', type: 'text', className: 'form-control', defaultValue: this.props.element.width, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'width', 'value') })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-3' },
                  _react2.default.createElement(
                    'label',
                    { className: 'control-label', htmlFor: 'elementHeight' },
                    'Height:'
                  ),
                  _react2.default.createElement('input', { id: 'elementHeight', type: 'text', className: 'form-control', defaultValue: this.props.element.height, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'height', 'value') })
                )
              )
            ),
            this.props.element.hasOwnProperty('label') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                null,
                'Display Label'
              ),
              _react2.default.createElement(_reactDraftWysiwyg.Editor, {
                toolbar: toolbar,
                defaultEditorState: editorState,
                onBlur: this.updateElement.bind(this),
                onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'label') }),
              this.props.element.hasOwnProperty('defaultToday') && _react2.default.createElement(
                'div',
                { className: 'checkbox' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement('input', { type: 'checkbox', checked: this_default_today, value: true, onChange: this.editElementProp.bind(this, 'defaultToday', 'checked') }),
                  'Default to Today?'
                )
              ),
              (this.state.element.element === 'RadioButtons' || this.state.element.element === 'Checkboxes') && _react2.default.createElement(
                'div',
                { className: 'checkbox' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement('input', { type: 'checkbox', checked: this_checked_inline, value: true, onChange: this.editElementProp.bind(this, 'inline', 'checked') }),
                  'Display horizonal'
                )
              )
            ),
            this.state.element.element === 'Signature' && this.props.element.readOnly ? _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { className: 'control-label', htmlFor: 'variableKey' },
                'Variable Key:'
              ),
              _react2.default.createElement('input', { id: 'variableKey', type: 'text', className: 'form-control', defaultValue: this.props.element.variableKey, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'variableKey', 'value') }),
              _react2.default.createElement(
                'p',
                { className: 'help-block' },
                'This will give the element a key that can be used to replace the content with a runtime value.'
              )
            ) : _react2.default.createElement('div', null),
            this.props.element.hasOwnProperty('helpText') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', defaultValue: this.props.element.helpText, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'helpText', 'value') })
            ),
            this.props.element.hasOwnProperty('canHaveTooltip') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                null,
                'Tooltip'
              ),
              _react2.default.createElement('input', { type: 'text', className: 'form-control', defaultValue: this.props.element.toolTip, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'toolTip', 'value') })
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Tab,
            { eventKey: 2, title: 'Data' },
            this.props.element.hasOwnProperty('datakey') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { className: 'control-label' },
                'Key:'
              ),
              _react2.default.createElement('input', { type: 'text', className: 'form-control', defaultValue: this.props.element.dataKey, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'dataKey', 'value') })
            ),
            this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty('options') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { className: 'control-label', htmlFor: 'correctAnswer' },
                'Correct Answer'
              ),
              _react2.default.createElement('input', { id: 'correctAnswer', type: 'text', className: 'form-control', defaultValue: this.props.element.correct, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'correct', 'value') })
            ),
            this.props.element.hasOwnProperty('options') && _react2.default.createElement(_dynamicOptionList2.default, { showCorrectColumn: this.props.showCorrectColumn, data: this.props.preview.state.data, updateElement: this.props.updateElement, preview: this.props.preview, element: this.props.element, key: this.props.element.options.length }),
            this.props.element.hasOwnProperty('step') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'div',
                { className: 'form-group-range' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label', htmlFor: 'rangeStep' },
                  'Step'
                ),
                _react2.default.createElement('input', { id: 'rangeStep', type: 'number', className: 'form-control', defaultValue: this.props.element.step, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'step', 'value') })
              )
            ),
            this.props.element.hasOwnProperty('min_value') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'div',
                { className: 'form-group-range' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label', htmlFor: 'rangeMin' },
                  'Min'
                ),
                _react2.default.createElement('input', { id: 'rangeMin', type: 'number', className: 'form-control', defaultValue: this.props.element.min_value, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'min_value', 'value') }),
                _react2.default.createElement('input', { type: 'text', className: 'form-control', defaultValue: this.props.element.min_label, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'min_label', 'value') })
              )
            ),
            this.props.element.hasOwnProperty('max_value') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'div',
                { className: 'form-group-range' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label', htmlFor: 'rangeMax' },
                  'Max'
                ),
                _react2.default.createElement('input', { id: 'rangeMax', type: 'number', className: 'form-control', defaultValue: this.props.element.max_value, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'max_value', 'value') }),
                _react2.default.createElement('input', { type: 'text', className: 'form-control', defaultValue: this.props.element.max_label, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'max_label', 'value') })
              )
            ),
            this.props.element.hasOwnProperty('default_value') && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'div',
                { className: 'form-group-range' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label', htmlFor: 'defaultSelected' },
                  'Default Selected'
                ),
                _react2.default.createElement('input', { id: 'defaultSelected', type: 'number', className: 'form-control', defaultValue: this.props.element.default_value, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'default_value', 'value') })
              )
            ),
            this.state.element.element === 'PeoplePicker' && this.props.element.hasOwnProperty('data_source') && _react2.default.createElement(
              'div',
              { className: 'radio' },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  'Source'
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'label',
                  { className: 'normal' },
                  _react2.default.createElement('input', { name: 'peopleSource', type: 'radio', checked: this_checked_data_source === 'SPPeoplePicker', value: 'SPPeoplePicker', onChange: this.editElementPropValue.bind(this, 'data_source', 'SPPeoplePicker') }),
                  'Native SharePoint People Picker'
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'label',
                  { className: 'normal' },
                  _react2.default.createElement('input', { name: 'peopleSource', type: 'radio', checked: this_checked_data_source === 'SPSiteUsersList', value: 'SPSiteUsersList', onChange: this.editElementPropValue.bind(this, 'data_source', 'SPSiteUsersList') }),
                  'SharePoint User List'
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'label',
                  { className: 'normal' },
                  _react2.default.createElement('input', { name: 'peopleSource', type: 'radio', checked: this_checked_data_source === 'SPCustomList', value: 'SPCustomList', onChange: this.editElementPropValue.bind(this, 'data_source', 'SPCustomList') }),
                  'Custom List'
                )
              )
            ),
            this.state.element.element === 'PeoplePicker' && this.props.element.hasOwnProperty('data_source') && this_checked_data_source === 'SPCustomList' && _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'source site' }),
              _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'source list' }),
              _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'filter condition' }),
              _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'data field' })
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Tab,
            { eventKey: 3, title: 'Validation' },
            _react2.default.createElement(
              'div',
              { className: 'checkbox normal' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: this_checked, value: true, onChange: this.editElementProp.bind(this, 'required', 'checked') }),
                'Required'
              )
            ),
            this.props.element.hasOwnProperty('readOnly') && _react2.default.createElement(
              'div',
              { className: 'checkbox' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: this_read_only, value: true, onChange: this.editElementProp.bind(this, 'readOnly', 'checked') }),
                'Read only'
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Tab,
            { eventKey: 4, title: 'Print' },
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { className: 'control-label' },
                'Print Options'
              ),
              _react2.default.createElement(
                'div',
                { className: 'checkbox' },
                _react2.default.createElement(
                  'label',
                  { className: 'normal' },
                  _react2.default.createElement('input', { type: 'checkbox', checked: this_checked_page_break, value: true, onChange: this.editElementProp.bind(this, 'pageBreakBefore', 'checked') }),
                  'Page Break Before Element?'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { className: 'control-label' },
                'Alternate/Signature Page'
              ),
              _react2.default.createElement(
                'div',
                { className: 'checkbox' },
                _react2.default.createElement(
                  'label',
                  { className: 'normal' },
                  _react2.default.createElement('input', { type: 'checkbox', checked: this_checked_alternate_form, value: true, onChange: this.editElementProp.bind(this, 'alternateForm', 'checked') }),
                  'Display on alternate/signature Page?'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return FormElementsEdit;
}(_react2.default.Component);

exports.default = FormElementsEdit;

FormElementsEdit.defaultProps = { className: 'edit-element-fields' };