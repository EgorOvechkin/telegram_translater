'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translate = translate;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = (0, _es6Promisify2.default)(_request2.default.post);

var app = (0, _express2.default)();

function translate(text) {
  request('https://translate.yandex.net//api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20170326T141009Z.afd6d8e4e238cde0.83e36ba00fd16f9ba8df819f0d5a4ae4042b58df&&text=' + text).then(function (response) {
    console.log('>>>', response.body);
    return response.body;
  })
  // if (!error && response.statusCode == 200) {
  // }
  .catch(function (err) {
    return console.log(err);
  });
}