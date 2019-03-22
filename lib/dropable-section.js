'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _ItemTypes = require('./ItemTypes');

var _ItemTypes2 = _interopRequireDefault(_ItemTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dropableElementTarget = {
  canDrop: function canDrop(props, monitor) {
    // You can disallow drop based on props or item
    var item = monitor.getItem();
    // return canMakeChessMove(item.fromPosition, props.position);
  },
  hover: function hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentDidUpdate() to handle enter/leave.

    // You can access the coordinates if you need them
    var clientOffset = monitor.getClientOffset();
    var componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    var isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    var canDrop = monitor.canDrop();
  },
  drop: function drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    var item = monitor.getItem();

    // You can do something with it
    //ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

var DropSection = function (_Component) {
  _inherits(DropSection, _Component);

  function DropSection() {
    _classCallCheck(this, DropSection);

    return _possibleConstructorReturn(this, (DropSection.__proto__ || Object.getPrototypeOf(DropSection)).apply(this, arguments));
  }

  _createClass(DropSection, [{
    key: 'render',
    value: function render() {
      // Your component receives its own props as usual
      var position = this.props.position;

      // These props are injected by React DnD,
      // as defined by your `collect` function above:

      var _props = this.props,
          isOver = _props.isOver,
          canDrop = _props.canDrop,
          connectDropTarget = _props.connectDropTarget;


      return connectDropTarget(_react2.default.createElement(
        'div',
        { className: 'Cell' },
        isOver && canDrop && _react2.default.createElement('div', { 'class': 'green' }),
        !isOver && canDrop && _react2.default.createElement('div', { 'class': 'yellow' }),
        isOver && !canDrop && _react2.default.createElement('div', { 'class': 'red' })
      ));
    }
  }]);

  return DropSection;
}(_react.Component);

DropSection = (0, _reactDnd.DropTarget)(_ItemTypes2.default.CARD, dropableElementTarget, collect)(DropSection);

exports.default = DropSection;