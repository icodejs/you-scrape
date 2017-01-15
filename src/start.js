import querystring from 'querystring';
import request from 'request-promise';
import { parseString } from 'xml2js'
import requestTranscriptParams from './request-transcript-params';

const buildTranscriptUrl = ({ url, params }) => {
  if (params.type === 'track') {
      return `${url}?${querystring.stringify(params)}`;
  } else {
    const {
      sparams,
      hl,
      v,
      expire,
      caps,
      key,
      asr_langs,
      signature,
    } = params;

    const trackParams = {
      ...{
        sparams,
        hl,
        v,
        expire,
        caps,
        key,
        asr_langs,
        signature,
      },
      ...{
        lang: 'en',
        name: '',
        kind: 'asr',
        fmt: 1
      }
    }
    return `${url}?${querystring.stringify(trackParams)}`;
  }
};

requestTranscriptParams('https://youtu.be/fZKaq623y38', (err, params) => {
  const url = buildTranscriptUrl(params);

  console.log(params);
  console.log(url);

  request({ url })
    .then((xml) => {
      parseString(xml, (err, result) => {
        if (err) {
          return console.log(err);
        } else {
          console.log(JSON.stringify(result));
        }
      });
    });
});
