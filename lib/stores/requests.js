'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = post;
exports.get = get;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'OPTIONS': ''
};

function post(url, data) {
    return (0, _isomorphicFetch2.default)(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(function (response) {
        return response;
    });
}

function get(url) {
    return (0, _isomorphicFetch2.default)(url, {
        method: 'GET',
        headers: headers
    }).then(function (response) {
        return response.json();
    });
}