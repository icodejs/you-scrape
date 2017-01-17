'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranscript = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _xml2js = require('xml2js');

var _striptags = require('striptags');

var _striptags2 = _interopRequireDefault(_striptags);

var _requestTranscriptParams = require('./request-transcript-params');

var _requestTranscriptParams2 = _interopRequireDefault(_requestTranscriptParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildTranscriptUrl = function buildTranscriptUrl(_ref) {
  var url = _ref.url,
      params = _ref.params;

  if (params.type === 'track') {
    return url + '?' + _querystring2.default.stringify(params);
  }

  var trackParams = ['sparams', 'hl', 'v', 'expire', 'caps', 'key', 'asr_langs', 'signature'].reduce(function (acc, key) {
    return _extends({}, acc, _defineProperty({}, key, params[key]));
  }, {
    type: 'track',
    lang: 'en',
    name: '',
    kind: 'asr',
    fmt: 1
  });

  return url + '?' + _querystring2.default.stringify(trackParams);
};

var parseXmlToJson = function parseXmlToJson(xml) {
  var strip = function strip(s) {
    return s.replace(/[\n\r]/g, ' ').replace(/&#39;/g, '\'');
  };
  return new Promise(function (resolve, reject) {
    return (0, _xml2js.parseString)(xml, function (err, result) {
      if (err) {
        return reject(err);
      } else {
        var transcript = result.transcript.text.map(function (t) {
          return {
            text: strip((0, _striptags2.default)(t._)),
            time: t.$
          };
        });
        resolve(transcript);
      }
    });
  });
};

var getParams = function getParams(videoId) {
  return new Promise(function (resolve, reject) {
    return (0, _requestTranscriptParams2.default)(videoId, function (err, params) {
      if (err) {
        return reject(err);
      }
      resolve(params);
    });
  });
};

var getTranscript = exports.getTranscript = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(videoId) {
    var params, url, xml;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getParams(videoId);

          case 2:
            params = _context.sent;
            _context.next = 5;
            return buildTranscriptUrl(params);

          case 5:
            url = _context.sent;
            _context.next = 8;
            return (0, _requestPromise2.default)({ url: url });

          case 8:
            xml = _context.sent;
            _context.next = 11;
            return parseXmlToJson(xml);

          case 11:
            return _context.abrupt('return', _context.sent);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTranscript(_x) {
    return _ref2.apply(this, arguments);
  };
}();