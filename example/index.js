const ys = require('../dist/you-scrape');
const ps = require('../dist/page-scrape');

ps.getPageData('http://nodeup.com/')
    .then((data) => console.log(JSON.stringify(data)))
    .catch(console.error);

// ys.getTranscript('O14yjsulv7w')
//   .then((data) => console.log(JSON.stringify(data)))
//   .catch(console.error);
