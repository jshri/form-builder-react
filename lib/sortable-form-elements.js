'use strict';

var _sortableElement = require('./sortable-element');

var _sortableElement2 = _interopRequireDefault(_sortableElement);

var _formElements = require('./form-elements');

var _formPlaceHolder = require('./form-place-holder');

var _formPlaceHolder2 = _interopRequireDefault(_formPlaceHolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormElements = {};

FormElements.Header = (0, _sortableElement2.default)(_formElements.Header);
FormElements.Paragraph = (0, _sortableElement2.default)(_formElements.Paragraph);
FormElements.Label = (0, _sortableElement2.default)(_formElements.Label);
FormElements.LineBreak = (0, _sortableElement2.default)(_formElements.LineBreak);
FormElements.TextInput = (0, _sortableElement2.default)(_formElements.TextInput);
FormElements.NumberInput = (0, _sortableElement2.default)(_formElements.NumberInput);
FormElements.TextArea = (0, _sortableElement2.default)(_formElements.TextArea);
FormElements.Dropdown = (0, _sortableElement2.default)(_formElements.Dropdown);
FormElements.Signature = (0, _sortableElement2.default)(_formElements.Signature);
FormElements.Checkboxes = (0, _sortableElement2.default)(_formElements.Checkboxes);
FormElements.DatePicker = (0, _sortableElement2.default)(_formElements.DatePicker);
FormElements.RadioButtons = (0, _sortableElement2.default)(_formElements.RadioButtons);
FormElements.Image = (0, _sortableElement2.default)(_formElements.Image);
FormElements.Rating = (0, _sortableElement2.default)(_formElements.Rating);
FormElements.Tags = (0, _sortableElement2.default)(_formElements.Tags);
FormElements.HyperLink = (0, _sortableElement2.default)(_formElements.HyperLink);
FormElements.Download = (0, _sortableElement2.default)(_formElements.Download);
FormElements.Camera = (0, _sortableElement2.default)(_formElements.Camera);
FormElements.Range = (0, _sortableElement2.default)(_formElements.Range);
FormElements.PlaceHolder = (0, _sortableElement2.default)(_formPlaceHolder2.default);
FormElements.AccordionSection = (0, _sortableElement2.default)(_formElements.AccordionSection);
FormElements.PeoplePicker = (0, _sortableElement2.default)(_formElements.PeoplePicker);

module.exports = FormElements;