'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _fbemitter = require('fbemitter');

var _formValidator = require('./form-validator');

var _formValidator2 = _interopRequireDefault(_formValidator);

var _formElements = require('./form-elements');

var FormElements = _interopRequireWildcard(_formElements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * <Form />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */

var ReactForm = function (_React$Component) {
  _inherits(ReactForm, _React$Component);

  function ReactForm(props) {
    _classCallCheck(this, ReactForm);

    var _this = _possibleConstructorReturn(this, (ReactForm.__proto__ || Object.getPrototypeOf(ReactForm)).call(this, props));

    _this.inputs = {};

    _this.emitter = new _fbemitter.EventEmitter();
    return _this;
  }

  _createClass(ReactForm, [{
    key: '_checkboxesDefaultValue',
    value: function _checkboxesDefaultValue(item) {
      var _this2 = this;

      var defaultChecked = [];
      item.options.forEach(function (option) {
        defaultChecked.push(_this2.props.answer_data['option_' + option.key]);
      });
      return defaultChecked;
    }
  }, {
    key: '_getItemValue',
    value: function _getItemValue(item, ref) {
      var $item = {
        element: item.element,
        value: ''
      };
      if (item.element === 'Rating') {
        $item.value = ref.inputField.current.state.rating;
      } else {
        if (item.element === 'Tags') {
          $item.value = ref.inputField.current.state.value;
        } else if (item.element === 'DatePicker') {
          $item.value = ref.state.value;
        } else if (ref && ref.inputField) {
          $item = _reactDom2.default.findDOMNode(ref.inputField.current);
          $item.value = $item.value.trim();
        }
      }
      return $item;
    }
  }, {
    key: '_isIncorrect',
    value: function _isIncorrect(item) {
      var incorrect = false;
      if (item.canHaveAnswer) {
        var ref = this.inputs[item.field_name];
        if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
          item.options.forEach(function (option) {
            var $option = _reactDom2.default.findDOMNode(ref.options['child_ref_' + option.key]);
            if (option.hasOwnProperty('correct') && !$option.checked || !option.hasOwnProperty('correct') && $option.checked) {
              incorrect = true;
            }
          });
        } else {
          var $item = this._getItemValue(item, ref);
          if (item.element === 'Rating') {
            if ($item.value.toString() !== item.correct) {
              incorrect = true;
            }
          } else if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase()) {
            incorrect = true;
          }
        }
      }
      return incorrect;
    }
  }, {
    key: '_isInvalid',
    value: function _isInvalid(item) {
      var invalid = false;
      if (item.required === true) {
        var ref = this.inputs[item.field_name];
        if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
          var checked_options = 0;
          item.options.forEach(function (option) {
            var $option = _reactDom2.default.findDOMNode(ref.options['child_ref_' + option.key]);
            if ($option.checked) {
              checked_options += 1;
            }
          });
          if (checked_options < 1) {
            // errors.push(item.label + ' is required!');
            invalid = true;
          }
        } else {
          var $item = this._getItemValue(item, ref);
          if (item.element === 'Rating') {
            if ($item.value === 0) {
              invalid = true;
            }
          } else if ($item.value === undefined || $item.value.length < 1) {
            invalid = true;
          }
        }
      }
      return invalid;
    }
  }, {
    key: '_collect',
    value: function _collect(item) {
      var itemData = { name: item.field_name };
      var $item = {};
      var ref = this.inputs[item.field_name];
      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        var checked_options = [];
        item.options.forEach(function (option) {
          var $option = _reactDom2.default.findDOMNode(ref.options['child_ref_' + option.key]);
          if ($option.checked) {
            checked_options.push(option.key);
          }
        });
        itemData.value = checked_options;
      } else {
        if (!ref) return;
        itemData.value = this._getItemValue(item, ref).value;
      }
      return itemData;
    }
  }, {
    key: '_collectFormData',
    value: function _collectFormData(data) {
      var _this3 = this;

      var formData = [];
      data.forEach(function (item) {
        var item_data = _this3._collect(item);
        if (item_data) {
          formData.push(item_data);
        }
      });
      return formData;
    }
  }, {
    key: '_getSignatureImg',
    value: function _getSignatureImg(item) {
      var ref = this.inputs[item.field_name];
      var $canvas_sig = ref.canvas.current;
      var base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
      var isEmpty = $canvas_sig.isEmpty();
      var $input_sig = _reactDom2.default.findDOMNode(ref.inputField.current);
      if (isEmpty) {
        $input_sig.value = '';
      } else {
        $input_sig.value = base64;
      }
      return true;
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();

      var errors = this.validateForm();
      // Publish errors, if any.
      this.emitter.emit('formValidation', errors);

      // Only submit if there are no errors.
      if (errors.length < 1) {
        var onSubmit = this.props.onSubmit;

        if (onSubmit) {
          var data = this._collectFormData(this.props.data);
          onSubmit(data);
        } else {
          var $form = _reactDom2.default.findDOMNode(this.form);
          $form.submit();
        }
      }
    }
  }, {
    key: 'validateForm',
    value: function validateForm() {
      var _this4 = this;

      var errors = [];
      var data_items = this.props.data;

      if (this.props.display_short) {
        data_items = this.props.data.filter(function (i) {
          return i.alternateForm === true;
        });
      }

      data_items.forEach(function (item) {
        if (item.element === 'Signature') {
          _this4._getSignatureImg(item);
        }

        if (_this4._isInvalid(item)) {
          errors.push(item.label + ' is required!');
        }

        if (_this4.props.validateForCorrectness && _this4._isIncorrect(item)) {
          errors.push(item.label + ' was answered incorrectly!');
        }
      });

      return errors;
    }
  }, {
    key: '_getSavedAnswer',
    value: function _getSavedAnswer(sourceList, elementName) {
      console.log('get saved answer');
      if (sourceList && elementName && Array.isArray(sourceList)) {
        var savedAnswer = sourceList.filter(function (answerData) {
          return answerData.name == elementName;
        });
        if (savedAnswer && savedAnswer[0]) {
          return savedAnswer[0].value;
        }
      }
    }
  }, {
    key: 'getInputElement',
    value: function getInputElement(item) {
      var _this5 = this;

      var Input = FormElements[item.element];
      return _react2.default.createElement(Input, {
        handleChange: this.handleChange,
        ref: function ref(c) {
          return _this5.inputs[item.field_name] = c;
        },
        mutable: true,
        key: 'form_' + item.id,
        data: item,
        read_only: this.props.read_only,
        defaultValue: this._getSavedAnswer(this.props.answer_data, item.field_name) });
    }
  }, {
    key: 'getSimpleElement',
    value: function getSimpleElement(item) {
      var Element = FormElements[item.element];
      return _react2.default.createElement(Element, { mutable: true, key: 'form_' + item.id, data: item });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var data_items = this.props.data;

      if (this.props.display_short) {
        data_items = this.props.data.filter(function (i) {
          return i.alternateForm === true;
        });
      }

      data_items.forEach(function (item) {
        if (item.readOnly && item.variableKey && _this6.props.variables[item.variableKey]) {
          _this6.props.answer_data[item.field_name] = _this6.props.variables[item.variableKey];
        }
      });

      var items = data_items.map(function (item) {
        switch (item.element) {

          case 'TextInput':
          case 'NumberInput':
          case 'TextArea':
          case 'Dropdown':
          case 'DatePicker':
          case 'RadioButtons':
          case 'Rating':
          case 'Tags':
          case 'Range':
            return _this6.getInputElement(item);
          case 'Signature':
            return _react2.default.createElement(_formElements.Signature, { ref: function ref(c) {
                return _this6.inputs[item.field_name] = c;
              }, read_only: _this6.props.read_only || item.readOnly, mutable: true, key: 'form_' + item.id, data: item, defaultValue: _this6.props.answer_data[item.field_name] });
          case 'Checkboxes':
            return _react2.default.createElement(_formElements.Checkboxes, { ref: function ref(c) {
                return _this6.inputs[item.field_name] = c;
              }, read_only: _this6.props.read_only, handleChange: _this6.handleChange, mutable: true, key: 'form_' + item.id, data: item, defaultValue: _this6._checkboxesDefaultValue(item) });
          case 'Image':
            return _react2.default.createElement(_formElements.Image, { ref: function ref(c) {
                return _this6.inputs[item.field_name] = c;
              }, handleChange: _this6.handleChange, mutable: true, key: 'form_' + item.id, data: item, defaultValue: _this6.props.answer_data[item.field_name] });
          case 'Download':
            return _react2.default.createElement(_formElements.Download, { download_path: _this6.props.download_path, mutable: true, key: 'form_' + item.id, data: item });
          default:
            return _this6.getSimpleElement(item);
        }
      });

      var formTokenStyle = {
        display: 'none'
      };

      var actionName = this.props.action_name ? this.props.action_name : 'Submit';
      var backName = this.props.back_name ? this.props.back_name : 'Cancel';

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_formValidator2.default, { emitter: this.emitter }),
        _react2.default.createElement(
          'div',
          { className: 'react-form-builder-form' },
          _react2.default.createElement(
            'form',
            { encType: 'multipart/form-data', ref: function ref(c) {
                return _this6.form = c;
              }, action: this.props.form_action, onSubmit: this.handleSubmit.bind(this), method: this.props.form_method },
            this.props.authenticity_token && _react2.default.createElement(
              'div',
              { style: formTokenStyle },
              _react2.default.createElement('input', { name: 'utf8', type: 'hidden', value: '\u2713' }),
              _react2.default.createElement('input', { name: 'authenticity_token', type: 'hidden', value: this.props.authenticity_token }),
              _react2.default.createElement('input', { name: 'task_id', type: 'hidden', value: this.props.task_id })
            ),
            items,
            _react2.default.createElement(
              'div',
              { className: 'btn-toolbar' },
              !this.props.hide_actions && _react2.default.createElement(
                'a',
                { href: '#', className: 'btn btn-success', onClick: this.handleSubmit.bind(this) },
                actionName
              ),
              !this.props.hide_actions && this.props.back_action && _react2.default.createElement(
                'a',
                { href: this.props.back_action, className: 'btn btn-danger btn-big' },
                backName
              )
            )
          )
        )
      );
    }
  }]);

  return ReactForm;
}(_react2.default.Component);

exports.default = ReactForm;


ReactForm.defaultProps = { validateForCorrectness: false };