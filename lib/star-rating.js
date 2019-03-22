'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * <StarRating
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   ratingAmount={number} - the rating amount (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={string} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */

var StarRating = function (_React$Component) {
  _inherits(StarRating, _React$Component);

  function StarRating(props) {
    _classCallCheck(this, StarRating);

    var _this = _possibleConstructorReturn(this, (StarRating.__proto__ || Object.getPrototypeOf(StarRating)).call(this, props));

    _this.state = {
      ratingCache: {
        pos: 0,
        rating: 0
      },
      editing: props.editing || true,
      stars: 5,
      rating: 0,
      pos: 0,
      glyph: _this.getStars()
    };
    return _this;
  }

  /**
   * Gets the stars based on ratingAmount
   * @return {string} stars
   */


  _createClass(StarRating, [{
    key: 'getStars',
    value: function getStars() {
      var stars = '';
      var numRating = this.props.ratingAmount;
      for (var i = 0; i < numRating; i++) {
        stars += '\u2605';
      }
      return stars;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.min = 0;
      this.max = this.props.ratingAmount || 5;
      if (this.props.rating) {

        this.state.editing = this.props.editing || false;
        var ratingVal = this.props.rating;
        this.state.ratingCache.pos = this.getStarRatingPosition(ratingVal);
        this.state.ratingCache.rating = ratingVal;

        this.setState({
          ratingCache: this.state.ratingCache,
          rating: ratingVal,
          pos: this.getStarRatingPosition(ratingVal)
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.root = _reactDom2.default.findDOMNode(this.rootNode);
      this.ratingContainer = _reactDom2.default.findDOMNode(this.node);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      delete this.root;
      delete this.ratingContainer;
    }
  }, {
    key: 'getPosition',
    value: function getPosition(e) {
      return e.pageX - this.root.getBoundingClientRect().left;
    }
  }, {
    key: 'applyPrecision',
    value: function applyPrecision(val, precision) {
      return parseFloat(val.toFixed(precision));
    }
  }, {
    key: 'getDecimalPlaces',
    value: function getDecimalPlaces(num) {
      var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    }
  }, {
    key: 'getWidthFromValue',
    value: function getWidthFromValue(val) {
      var min = this.min,
          max = this.max;
      if (val <= min || min === max) {
        return 0;
      }
      if (val >= max) {
        return 100;
      }
      return val / (max - min) * 100;
    }
  }, {
    key: 'getValueFromPosition',
    value: function getValueFromPosition(pos) {
      var precision = this.getDecimalPlaces(this.props.step);
      var maxWidth = this.ratingContainer.offsetWidth;
      var diff = this.max - this.min;
      var factor = diff * pos / (maxWidth * this.props.step);
      factor = Math.ceil(factor);
      var val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
      val = Math.max(Math.min(val, this.max), this.min);
      return val;
    }
  }, {
    key: 'calculate',
    value: function calculate(pos) {
      var val = this.getValueFromPosition(pos),
          width = this.getWidthFromValue(val);

      width += '%';
      return { width: width, val: val };
    }
  }, {
    key: 'getStarRatingPosition',
    value: function getStarRatingPosition(val) {
      var width = this.getWidthFromValue(val) + '%';
      return width;
    }
  }, {
    key: 'getRatingEvent',
    value: function getRatingEvent(e) {
      var pos = this.getPosition(e);
      return this.calculate(pos);
    }
  }, {
    key: 'getSvg',
    value: function getSvg() {
      return _react2.default.createElement(
        'svg',
        { className: 'react-star-rating__star', viewBox: '0 0 286 272', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement(
          'g',
          { stroke: 'none', 'stroke-width': '1', fill: 'none', 'fill-rule': 'evenodd' },
          _react2.default.createElement('polygon', { id: 'star-flat', points: '143 225 54.8322122 271.352549 71.6707613 173.176275 0.341522556 103.647451 98.9161061 89.3237254 143 0 187.083894 89.3237254 285.658477 103.647451 214.329239 173.176275 231.167788 271.352549 ' })
        )
      );
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({
        pos: this.state.ratingCache.pos,
        rating: this.state.ratingCache.rating
      });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      // get hover position
      var ratingEvent = this.getRatingEvent(e);
      this.updateRating(ratingEvent.width, ratingEvent.val);
    }
  }, {
    key: 'updateRating',
    value: function updateRating(width, val) {
      this.setState({
        pos: width,
        rating: val
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props) {
        this.updateRating(this.getStarRatingPosition(nextProps.rating), nextProps.rating);
        return true;
      } else {
        return nextState.ratingCache.rating !== this.state.ratingCache.rating || nextState.rating !== this.state.rating;
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {

      // is it disabled?
      if (this.props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }

      var ratingCache = {
        pos: this.state.pos,
        rating: this.state.rating,
        caption: this.props.caption,
        name: this.props.name
      };

      this.setState({
        ratingCache: ratingCache
      });

      this.props.onRatingClick(e, ratingCache);
    }
  }, {
    key: 'treatName',
    value: function treatName(title) {
      if (typeof title === 'string') {
        return title.toLowerCase().split(' ').join('_');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _cx,
          _this2 = this;

      var caption = null;
      var classes = (0, _classnames2.default)((_cx = {
        'react-star-rating__root': true,
        'rating-disabled': this.props.disabled
      }, _defineProperty(_cx, 'react-star-rating__size--' + this.props.size, this.props.size), _defineProperty(_cx, 'rating-editing', this.state.editing), _cx));

      // is there a caption?
      if (this.props.caption) {
        caption = _react2.default.createElement(
          'span',
          { className: 'react-rating-caption' },
          this.props.caption
        );
      }

      // are we editing this rating?
      var starRating;
      if (this.state.editing) {
        starRating = _react2.default.createElement(
          'div',
          { ref: function ref(c) {
              return _this2.node = c;
            },
            className: 'rating-container rating-gly-star',
            'data-content': this.state.glyph,
            onMouseMove: this.handleMouseMove.bind(this),
            onMouseLeave: this.handleMouseLeave.bind(this),
            onClick: this.handleClick.bind(this) },
          _react2.default.createElement('div', { className: 'rating-stars', 'data-content': this.state.glyph, style: { width: this.state.pos } })
        );
      } else {
        starRating = _react2.default.createElement(
          'div',
          { ref: function ref(c) {
              return _this2.node = c;
            }, className: 'rating-container rating-gly-star', 'data-content': this.state.glyph },
          _react2.default.createElement('div', { className: 'rating-stars', 'data-content': this.state.glyph, style: { width: this.state.pos } })
        );
      }

      return _react2.default.createElement(
        'span',
        { className: 'react-star-rating' },
        _react2.default.createElement(
          'span',
          { ref: function ref(c) {
              return _this2.rootNode = c;
            }, style: { cursor: 'pointer' }, className: classes },
          starRating,
          _react2.default.createElement('input', _defineProperty({ type: 'number', name: this.props.name, value: this.state.ratingCache.rating, style: { display: 'none !important' }, min: this.min, max: this.max, readOnly: true }, 'style', {
            width: 65
          }))
        )
      );
    }
  }]);

  return StarRating;
}(_react2.default.Component);

exports.default = StarRating;


StarRating.propTypes = {
  name: _propTypes2.default.string.isRequired,
  caption: _propTypes2.default.string,
  ratingAmount: _propTypes2.default.number.isRequired,
  rating: _propTypes2.default.number,
  onRatingClick: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  editing: _propTypes2.default.bool,
  size: _propTypes2.default.string
};

StarRating.defaultProps = {
  step: 0.5,
  ratingAmount: 5,
  onRatingClick: function onRatingClick() {},

  disabled: false
};