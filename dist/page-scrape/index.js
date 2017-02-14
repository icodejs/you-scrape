'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPageData = undefined;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// export const getPageData = async (url) => {
//   const html = await request({ url });
//   console.log(html);
//   const $ = cheerio.load(html);

//   const [ href ] = $('a').map(function() {
//     return $(this).attr('href');
//   }).get().filter((a) => a.match(/\.mp[3-4]/));

//   return href;
// };


/* eslint-disable no-console */

var getPageData = exports.getPageData = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(url) {
    var instance, page, status, html, $, links;
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
            _context2.next = 8;
            return page.open(url);

          case 8:
            status = _context2.sent;

            console.log(status);

            _context2.next = 12;
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
                }, _callee, undefined);
              })), 3000);
            });

          case 12:
            _context2.next = 14;
            return page.evaluate(function () {
              return document.querySelector('html').innerHTML;
            });

          case 14:
            html = _context2.sent;
            $ = _cheerio2.default.load(html);
            links = $('a, source').map(function () {
              return $(this).attr('href') || $(this).attr('src');
            }).get().filter(function (a) {
              return a.match(/\.ogg/) || a.match(/\.mp[3-4]/);
            });
            _context2.next = 19;
            return instance.exit();

          case 19:
            return _context2.abrupt('return', links);

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getPageData(_x) {
    return _ref.apply(this, arguments);
  };
}();