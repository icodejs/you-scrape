const ys = require('../dist/you-scrape');

ys.getTranscript('O14yjsulv7w')
  .then((data) => console.log(JSON.stringify(data)))
  .catch(console.error);
