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
      setTimeout(async () => resolve(), 5000);
    });

    await page.evaluate(function() {
      document.querySelector('.action-panel-trigger-transcript').click();
    });

    instance.exit();
  } catch(e) {
    callback(e);
  }
};
