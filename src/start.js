import phantom from 'phantom';

(async function() {
  const url = 'https://youtu.be/fZKaq623y38';
  const instance = await phantom.create();
  const page = await instance.createPage();

  await page.on('onInitialized', () => console.log('page initialized'));

  page.evaluate(function() {
    var create = document.createElement;
    document.createElement = function(tag) {
      var elem = create.call(document, tag);
      if (tag === 'video') {
        elem.canPlayType = function() { return 'probably'; };
      }
      return elem;
    };
  });

  page.evaluate(function() {
    window.navigator = {
      plugins: { 'Shockwave Flash': { description: 'Shockwave Flash 11.2 e202' } },
      mimeTypes: { 'application/x-shockwave-flash': { enabledPlugin: true } }
    };
  });

  // await page.on('onResourceRequested', function(requestData) {
  //   console.info('Requesting', requestData.url);
  // });

  const status = await page.open(url);
  console.log(status);


  const html = await page.evaluate(function() {
    return document.querySelector('.add-to-widget').innerHTML;
  });
  console.log(html);

  await instance.exit();
}());
