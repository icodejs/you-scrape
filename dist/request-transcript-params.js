'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

var _sek = require('sek');

var _sek2 = _interopRequireDefault(_sek);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _lodash = require('lodash.once');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(videoId, fn) {
    var _this = this;

    var callback, _ret;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            callback = (0, _lodash2.default)(fn);
            _context3.prev = 1;
            return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
              var instance, page, status;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
                              _transcriptUrl$split2 = _slicedToArray(_transcriptUrl$split, 2),
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

                      console.log('status: ', status);

                      if (!(status !== 'success')) {
                        _context2.next = 15;
                        break;
                      }

                      callback(status);
                      return _context2.abrupt('return', {
                        v: instance.exit()
                      });

                    case 15:
                      _context2.next = 17;
                      return new Promise(function (resolve) {
                        setTimeout(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                          return regeneratorRuntime.wrap(function _callee$(_context) {
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

                    case 17:
                      _context2.next = 19;
                      return page.evaluate(function () {
                        document.querySelector('.yt-uix-button-has-icon').click();
                        document.querySelector('.action-panel-trigger-transcript').click();
                      });

                    case 19:

                      instance.exit();

                    case 20:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this);
            })(), 't0', 3);

          case 3:
            _ret = _context3.t0;

            if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
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