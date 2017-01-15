import querystring from 'querystring';
import request from 'request-promise';
import { parseString } from 'xml2js'
import requestTranscriptParams from './request-transcript-params';

const buildTranscriptUrl = ({ url, params }) => {
  if (params.type === 'track') {
      return `${url}?${querystring.stringify(params)}`;
  } else {
    const keys = [
      'sparams',
      'hl',
      'v',
      'expire',
      'caps',
      'key',
      'asr_langs',
      'signature'
    ];

    const transcriptParams = keys.reduce((acc, key) => {
      return {
        ...acc,
        ...{ [key]: params[key] }
      }
    }, {});

    const trackParams = {
      ...transcriptParams,
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

requestTranscriptParams('fZKaq623y38', (err, params) => {
  const url = buildTranscriptUrl(params);
  const strip = (s) => s.replace(/[\n\r]/g, ' ').replace(/&#39;/g, '\'');

  console.log(params);
  console.log(url);

  request({ url })
    .then((xml) => {
      parseString(xml, (err, result) => {
        if (err) {
          return console.log(err);
        } else {
          const transcript = result.transcript.text.map(t => {
            return {
              description: strip(t._),
              time: t.$
            }
          });
          console.log(JSON.stringify(transcript));
        }
      });
    });
});
