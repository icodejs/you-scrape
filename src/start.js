import phantom from 'phantom';
import querystring from 'querystring';

export default async function(callback) {
  try {
    const url = 'https://youtu.be/fZKaq623y38';
    const instance = await phantom.create();
    const page = await instance.createPage();

    page.on('onResourceRequested', function(requestData) {
      const { url } = requestData;
      if (url.indexOf('timedtext') > -1) {
        const [ domain, qstring ] = url.split('?');
        const params = querystring.parse(qstring);

        callback(null, {
          url: domain,
          params
        });
      }
    });

    page.on('onError', function(msg, trace) {
      let msgStack = ['ERROR: ' + msg];

      if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
          msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
        });
      }

      callback(msgStack.join('\n'));
      return instance.exit();
    });

    const status = await page.open(url);
    console.log('status:', status);

    if (status !== 'success') {
      callback(status);
      return instance.exit();
    }

    // await page.evaluate(function() {
    //   document.querySelector('.action-panel-trigger-transcript').click();
    // });

    await new Promise((resolve) => {
      setTimeout(async () => resolve(), 10000);
    });

    await page.evaluate(function() {
      document.querySelector('.yt-uix-button-has-icon').click();
      document.querySelector('.action-panel-trigger-transcript').click();
    });

    instance.exit();
  } catch(e) {
    callback(e);
  }
};
