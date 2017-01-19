'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-console */

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(videoId, fn) {
    var instance, page, pageUrl, callback;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _phantom2.default.create();

          case 2:
            instance = _context.sent;
            _context.next = 5;
            return instance.createPage();

          case 5:
            page = _context.sent;
            pageUrl = 'https://youtu.be/' + videoId;
            callback = (0, _lodash2.default)(function (error, response) {
              fn(error, response);
              instance.exit();
            });


            try {
              page.on('onResourceRequested', function (requestData) {
                var transcriptUrl = requestData.url;


                if (transcriptUrl.indexOf('timedtext') > -1) {
                  var _transcriptUrl$split = transcriptUrl.split('?'),
                      _transcriptUrl$split2 = _slicedToArray(_transcriptUrl$split, 2),
                      domain = _transcriptUrl$split2[0],
                      qstring = _transcriptUrl$split2[1];

                  var params = _querystring2.default.parse(qstring);

                  console.log('transcript resource found:', transcriptUrl);

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

              page.open(pageUrl).then(function (status) {
                console.log('status:', status, pageUrl);

                if (status !== 'success') {
                  return callback(status);
                }

                setTimeout(function () {
                  page.evaluate(function () {
                    document.querySelector('.yt-uix-button-has-icon').click();
                    document.querySelector('.action-panel-trigger-transcript').click();
                  });
                }, (0, _sek2.default)(10));
              });
            } catch (e) {
              callback(e);
            }

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();