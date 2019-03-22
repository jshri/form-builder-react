'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _beedle = require('beedle');

var _beedle2 = _interopRequireDefault(_beedle);

var _requests = require('./requests');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _data = [];
var _saveUrl = void 0;
var _onPost = void 0;
var _onLoad = void 0;

var store = new _beedle2.default({
    actions: {
        setData: function setData(context, data) {
            _data = data;
            context.commit('setData', _data);
        },
        load: function load(context, _ref) {
            var _this = this;

            var urlOrData = _ref.loadData,
                saveUrl = _ref.saveUrl;

            _saveUrl = saveUrl;
            if (_onLoad) {
                _onLoad().then(function (x) {
                    return _this.setData(context, x);
                });
            } else {
                if (typeof urlOrData == 'string' || urlOrData instanceof String) {
                    (0, _requests.get)(urlOrData).then(function (x) {
                        return _this.setData(context, x);
                    });
                } else {
                    this.setData(context, urlOrData);
                }
            }
        },
        create: function create(context, element) {
            _data.push(element);
            context.commit('setData', _data);
            this.save();
        },
        delete: function _delete(context, element) {
            var index = _data.indexOf(element);
            _data.splice(index, 1);
            context.commit('setData', _data);
            this.save();
        },
        updateOrder: function updateOrder(context, elements) {
            _data = elements;
            context.commit('setData', _data);
            this.save();
        },
        save: function save() {
            if (_onPost) {
                _onPost({ task_data: _data });
            } else if (_saveUrl) {
                (0, _requests.post)(_saveUrl, { task_data: _data });
            }
        }
    },

    mutations: {
        setData: function setData(state, payload) {
            state.data = payload;
            return state;
        }
    },

    initialState: {
        data: []
    }
});

store.setExternalHandler = function (onLoad, onPost) {
    _onLoad = onLoad;
    _onPost = onPost;
};

exports.default = store;