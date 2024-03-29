/* eslint-disable no-console */

import phantom from 'phantom';
import sek from 'sek';
import querystring from 'querystring';
import once from 'lodash.once';

const onResourceRequested = (callback) => (requestData) => {
  const { url: transcriptUrl } = requestData;

  if (transcriptUrl.indexOf('timedtext') > -1) {
    const [ domain, qstring ] = transcriptUrl.split('?');
    const params = querystring.parse(qstring);

    console.log('transcript resource found:', transcriptUrl);
    callback(null, { url: domain, params });
  }
};

const onError = (callback) => (msg, trace) => {
  let msgStack = [`ERROR: ${msg}`];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(` -> ${t.file}: ${t.line} ${t.function}`);
    });
  }

  callback(msgStack.join('\n'));
};

export default async function(videoId, fn) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const pageUrl = `https://youtu.be/${videoId}`;
  const callback = once((error, response) => {
    fn(error, response);
    instance.exit();
  });

  try {
    page.on('onResourceRequested', onResourceRequested(callback));
    page.on('onError', onError(callback));

    page.open(pageUrl).then((status) => {
      console.log('status:', status, pageUrl);

      if (status !== 'success') {
        return callback(status);
      }

      setTimeout(() => {
        page.evaluate(function() {
          document.querySelector('.yt-uix-button-has-icon').click();
          document.querySelector('.action-panel-trigger-transcript').click();
        });
      }, sek(10));
    })
    .catch(callback);
  } catch (e) {
    callback(e);
  }
};
