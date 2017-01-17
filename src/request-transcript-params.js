import phantom from 'phantom';
import sek from 'sek';
import querystring from 'querystring';
import once from 'lodash.once';

export default async function(videoId, fn) {
  const callback = once(fn);

  try {
    const instance = await phantom.create();
    const page = await instance.createPage();
    const pageUrl = `https://youtu.be/${videoId}`;

    page.on('onResourceRequested', function(requestData) {
      const { url: transcriptUrl } = requestData;
      if (transcriptUrl.indexOf('timedtext') > -1) {
        const [ domain, qstring ] = transcriptUrl.split('?');
        const params = querystring.parse(qstring);
        console.log('transcript resource found:', transcriptUrl);
        callback(null, {
          url: domain,
          params
        });
      }
    });

    page.on('onError', function(msg, trace) {
      let msgStack = [`ERROR: ${msg}`];

      if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
          msgStack.push(` -> ${t.file}: ${t.line} ${t.function}`);
        });
      }

      callback(msgStack.join('\n'));
      return instance.exit();
    });

    const status = await page.open(pageUrl);
    console.log('status:', status, pageUrl);

    if (status !== 'success') {
      callback(status);
      return instance.exit();
    }

    await new Promise((resolve) => {
      setTimeout(async () => resolve(), sek(10));
    });

    await page.evaluate(function() {
      document.querySelector('.yt-uix-button-has-icon').click();
      document.querySelector('.action-panel-trigger-transcript').click();
    });

    instance.exit();
  } catch (e) {
    callback(e);
  }
};
