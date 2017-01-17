'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranscript = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var buildTranscriptUrl = function buildTranscriptUrl(_ref) {
  var url = _ref.url,
      params = _ref.params;

  if (params.type === 'track') {
    return url + '?' + _querystring2.default.stringify(params);
  }

  var trackParams = ['sparams', 'hl', 'v', 'expire', 'caps', 'key', 'asr_langs', 'signature'].reduce(function (acc, key) {
    return (0, _extends4.default)({}, acc, (0, _defineProperty3.default)({}, key, params[key]));
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
  return new _promise2.default(function (resolve, reject) {
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
  return new _promise2.default(function (resolve, reject) {
    return (0, _requestTranscriptParams2.default)(videoId, function (err, params) {
      if (err) {
        return reject(err);
      }
      resolve(params);
    });
  });
};

var getTranscript = exports.getTranscript = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(videoId) {
    var params, url, xml;
    return _regenerator2.default.wrap(function _callee$(_context) {
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