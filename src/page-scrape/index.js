import request from 'request-promise';
import cheerio from 'cheerio';

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

import phantom from 'phantom';


export const getPageData = async (url) => {
  const instance = await phantom.create();
  const page = await instance.createPage();

  const status = await page.open(url);
  console.log(status);

  await new Promise((resolve) => {
    setTimeout(async () => resolve(), 3000);
  });

  const html = await page.evaluate(() => {
    return document.querySelector('html').innerHTML;
  });

  const $ = cheerio.load(html);
  const links = $('a, source')
    .map(function() {
      return $(this).attr('href') || $(this).attr('src');
    })
    .get()
    .filter((a) => {
      return a.match(/\.ogg/) || a.match(/\.mp[3-4]/);
    });

  await instance.exit();
  return links;
};



