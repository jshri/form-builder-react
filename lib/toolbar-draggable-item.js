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

var _UUID = require('./UUID');

var _UUID2 = _interopRequireDefault(_UUID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * <ToolbarItem />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */

var cardSource = {
	beginDrag: function beginDrag(props) {
		return {
			id: _UUID2.default.uuid(),
			index: -1,
			data: props.data,
			onCreate: props.onCreate
		};
	}
};

var ToolbarItem = function (_React$Component) {
	_inherits(ToolbarItem, _React$Component);

	function ToolbarItem() {
		_classCallCheck(this, ToolbarItem);

		return _possibleConstructorReturn(this, (ToolbarItem.__proto__ || Object.getPrototypeOf(ToolbarItem)).apply(this, arguments));
	}

	_createClass(ToolbarItem, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    connectDragSource = _props.connectDragSource,
			    data = _props.data,
			    onClick = _props.onClick;

			if (!connectDragSource) return;
			return connectDragSource(_react2.default.createElement(
				'li',
				{ onClick: onClick },
				_react2.default.createElement('i', { className: data.icon }),
				data.name
			));
		}
	}]);

	return ToolbarItem;
}(_react2.default.Component);

exports.default = (0, _reactDnd.DragSource)(_ItemTypes2.default.CARD, cardSource, function (connect) {
	return {
		connectDragSource: connect.dragSource()
	};
})(ToolbarItem);