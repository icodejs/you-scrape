'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

var _sek = require('sek');

var _sek2 = _interopRequireDefault(_sek);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _lodash = require('lodash.once');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(videoId, fn) {
    var _this = this;

    var callback, _ret;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            callback = (0, _lodash2.default)(fn);
            _context3.prev = 1;
            return _context3.delegateYield(_regenerator2.default.mark(function _callee2() {
              var instance, page, status;
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _phantom2.default.create();

                    case 2:
                      instance = _context2.sent;
                      _context2.next = 5;
                      return instance.createPage();

                    case 5:
                      page = _context2.sent;


                      page.on('onResourceRequested', function (requestData) {
                        var transcriptUrl = requestData.url;

                        if (transcriptUrl.indexOf('timedtext') > -1) {
                          var _transcriptUrl$split = transcriptUrl.split('?'),
                              _transcriptUrl$split2 = (0, _slicedToArray3.default)(_transcriptUrl$split, 2),
                              domain = _transcriptUrl$split2[0],
                              qstring = _transcriptUrl$split2[1];

                          var params = _querystring2.default.parse(qstring);

                          callback(null, {
                            url: domain,
                            params: params
                          });
                        }
                      });

                      page.on('onError', function (msg, trace) {
                        var msgStack = ['ERROR: ' + msg];

                        if (trace && trace.length) {
                          msgStack.push('TRACE:');
                          trace.forEach(function (t) {
                            msgStack.push(' -> ' + t.file + ': ' + t.line + ' ' + t.function);
                          });
                        }

                        callback(msgStack.join('\n'));
                        return instance.exit();
                      });

                      _context2.next = 10;
                      return page.open('https://youtu.be/' + videoId);

                    case 10:
                      status = _context2.sent;

                      if (!(status !== 'success')) {
                        _context2.next = 14;
                        break;
                      }

                      callback(status);
                      return _context2.abrupt('return', {
                        v: instance.exit()
                      });

                    case 14:
                      _context2.next = 16;
                      return new _promise2.default(function (resolve) {
                        setTimeout((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                          return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  return _context.abrupt('return', resolve());

                                case 1:
                                case 'end':
                                  return _context.stop();
                              }
                            }
                          }, _callee, _this);
                        })), (0, _sek2.default)(10));
                      });

                    case 16:
                      _context2.next = 18;
                      return page.evaluate(function () {
                        document.querySelector('.yt-uix-button-has-icon').click();
                        document.querySelector('.action-panel-trigger-transcript').click();
                      });

                    case 18:

                      instance.exit();

                    case 19:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this);
            })(), 't0', 3);

          case 3:
            _ret = _context3.t0;

            if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt('return', _ret.v);

          case 6:
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t1 = _context3['catch'](1);

            callback(_context3.t1);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();