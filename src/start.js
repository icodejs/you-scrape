/*
more
yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay yt-uix-menu-trigger yt-uix-tooltip
*/

/*
menu
yt-uix-menu-content yt-ui-menu-content yt-uix-kbd-nav
*/

/*
  transcript button
  yt-ui-menu-item has-icon yt-uix-menu-close-on-select action-panel-trigger action-panel-trigger-transcript
*/

/*
  transcript-scrollbox

  #transcript-scrollbox

  or

  #watch-actions-transcript
*/

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


  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });


  // await page.on('onError', function(msg, trace) {
  //   var msgStack = ['ERROR: ' + msg];

  //   if (trace && trace.length) {
  //     msgStack.push('TRACE:');
  //     trace.forEach(function(t) {
  //       msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
  //     });
  //   }

  //   console.error(msgStack.join('\n'));
  // });

  const status = await page.open(url);
  console.log(status);




  await page.evaluate(function() {
    return document.querySelector('.yt-uix-button-has-icon').click();
  });

  await page.evaluate(function() {
    return document.querySelector('.action-panel-trigger-transcript').click();
  });

  const t = await new Promise((resolve) => {
    setTimeout(async () => {
      const x = await page.evaluate(function() {
        return document.querySelector('#watch-actions-transcript').innerHTML;
      });
      resolve(x);
    }, 2000);
  });


  await page.evaluate(function() {
    return document.querySelector('.action-panel-trigger-transcript').click();
  });

  console.log(t);

  await instance.exit();
}());
