'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('./stores/store');

var _store2 = _interopRequireDefault(_store);

var _formElementsEdit = require('./form-elements-edit');

var _formElementsEdit2 = _interopRequireDefault(_formElementsEdit);

var _sortableFormElements = require('./sortable-form-elements');

var SortableFormElements = _interopRequireWildcard(_sortableFormElements);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * <Preview />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */

var PlaceHolder = SortableFormElements.PlaceHolder;

var Preview = function (_React$Component) {
  _inherits(Preview, _React$Component);

  function Preview(props) {
    _classCallCheck(this, Preview);

    var _this = _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).call(this, props));

    var onLoad = props.onLoad,
        onPost = props.onPost;

    _store2.default.setExternalHandler(onLoad, onPost);

    _this.state = {
      data: [],
      answer_data: {}
    };

    var loadData = _this.props.url ? _this.props.url : _this.props.data ? _this.props.data : [];
    var saveUrl = _this.props.saveUrl ? _this.props.saveUrl : '';

    _store2.default.dispatch('load', { loadData: loadData, saveUrl: saveUrl });
    var update = _this._onChange.bind(_this);
    _store2.default.subscribe(function (state) {
      return update(state.data);
    });

    _this.moveCard = _this.moveCard.bind(_this);
    _this.insertCard = _this.insertCard.bind(_this);
    return _this;
  }

  _createClass(Preview, [{
    key: '_setValue',
    value: function _setValue(text) {
      return text.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
    }
  }, {
    key: 'updateElement',
    value: function updateElement(element) {
      var data = this.state.data;
      var found = false;

      for (var i = 0, len = data.length; i < len; i++) {
        if (element.id === data[i].id) {
          data[i] = element;
          found = true;
          break;
        }
      }

      if (found) {
        _store2.default.dispatch('updateOrder', data);
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(data) {
      var _this2 = this;

      var answer_data = {};

      data.forEach(function (item) {
        if (item && item.readOnly && _this2.props.variables[item.variableKey]) {
          answer_data[item.field_name] = _this2.props.variables[item.variableKey];
        }
      });

      this.setState({
        data: data,
        answer_data: answer_data
      });
    }
  }, {
    key: '_onDestroy',
    value: function _onDestroy(item) {
      _store2.default.dispatch('delete', item);
    }
  }, {
    key: 'insertCard',
    value: function insertCard(item, hoverIndex, hoverElement) {
      var data = this.state.data;

      data.splice(hoverIndex, 0, item);
      this.saveData(item, hoverIndex, hoverIndex, hoverElement);
    }
  }, {
    key: 'moveCard',
    value: function moveCard(dragIndex, hoverIndex, hoverElement) {
      var data = this.state.data;

      var dragCard = data[dragIndex];
      this.saveData(dragCard, dragIndex, hoverIndex, hoverElement);
    }
  }, {
    key: 'cardPlaceHolder',
    value: function cardPlaceHolder(dragIndex, hoverIndex) {
      // Dummy
    }
  }, {
    key: 'saveData',
    value: function saveData(dragCard, dragIndex, hoverIndex) {
      console.log("dragCard", dragCard);
      console.log("dragIndex", dragIndex);
      console.log("hoverIndex", hoverIndex);
      console.log(this.state);

      var newData = (0, _immutabilityHelper2.default)(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      });
      this.setState(newData);
      _store2.default.dispatch('updateOrder', newData.data);
    }

    /*
    saveData(dragCard, dragIndex, hoverIndex, hoverElement) {
     var newData = "";
     console.log("dragCard",dragCard);
     console.log("dragIndex",dragIndex);
     console.log("hoverIndex",hoverIndex);
     console.log("HoverItemElement",hoverElement);
     console.log(this.state);
     if (hoverElement === "AccordionSection"){
       console.log(this.state.data[hoverIndex]);
       newData =	update(this.state.data[hoverIndex], {
         components: {
           $push: [dragCard]
         },
       });
       newData =	update(this.state, {
         data: {
           $splice:[[dragIndex, 1]] 
         },
       });
     }
     else{
       newData =	update(this.state, {
         data: {
           $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
         },
       });
     }
     this.setState(newData)
     store.dispatch('updateOrder', newData.data);
    }
    */

  }, {
    key: 'getElement',
    value: function getElement(item, index) {
      var SortableFormElement = SortableFormElements[item.element];
      return _react2.default.createElement(SortableFormElement, { id: item.id, index: index, moveCard: this.moveCard, insertCard: this.insertCard, mutable: false, parent: this.props.parent, editModeOn: this.props.editModeOn, isDraggable: true, key: item.id, sortData: item.id, data: item, _onDestroy: this._onDestroy });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var classes = this.props.className;
      if (this.props.editMode) {
        classes += ' is-editing';
      }
      var data = this.state.data.filter(function (x) {
        return !!x;
      });
      var items = data.map(function (item, index) {
        return _this3.getElement(item, index);
      });
      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: 'edit-form' },
          this.props.editElement !== null && _react2.default.createElement(_formElementsEdit2.default, { showCorrectColumn: this.props.showCorrectColumn, files: this.props.files, manualEditModeOff: this.props.manualEditModeOff, preview: this, element: this.props.editElement, updateElement: this.updateElement })
        ),
        _react2.default.createElement(
          'div',
          { className: 'Sortable' },
          items
        ),
        _react2.default.createElement(PlaceHolder, { id: 'form-place-holder', show: items.length == 0, index: items.length, moveCard: this.cardPlaceHolder, insertCard: this.insertCard })
      );
    }
  }]);

  return Preview;
}(_react2.default.Component);

exports.default = Preview;

Preview.defaultProps = { showCorrectColumn: false, files: [], editMode: false, editElement: null, className: 'react-form-builder-preview' };