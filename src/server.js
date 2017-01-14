require('babel-core/register');
require('babel-polyfill');

const scrape = require('./start').default;

scrape((err, result) => {
  console.log(result);
});
