import querystring from 'querystring';
import request from 'request-promise';
import { parseString } from 'xml2js'
import requestTranscriptParams from './request-transcript-params';

const buildTranscriptUrl = ({ url, params }) => {
  if (params.type === 'track') {
      return `${url}?${querystring.stringify(params)}`;
  }

  const trackParams = [
    'sparams',
    'hl',
    'v',
    'expire',
    'caps',
    'key',
    'asr_langs',
    'signature'
  ].reduce((acc, key) => {
    return { ...acc, ...{ [key]: params[key] } };
  }, {
    type: 'track',
    lang: 'en',
    name: '',
    kind: 'asr',
    fmt: 1
  });

  return `${url}?${querystring.stringify(trackParams)}`;
};

const parseXmlToJson = (xml) => {
  const strip = (s) => s.replace(/[\n\r]/g, ' ').replace(/&#39;/g, '\'');
  return new Promise((resolve, reject) => parseString(xml, (err, result) => {
    if (err) {
      return reject(err);
    } else {
      const transcript = result.transcript.text.map(t => {
        return {
          description: strip(t._),
          time: t.$
        }
      });
      resolve(transcript);
    }
  }));
}

const getParams = (videoId) => {
  return new Promise((resolve, reject) => requestTranscriptParams(videoId, (err, params) => {
    if (err) {
      return reject(err);
    }
    resolve(params);
  }));
}

const getTranscript = async (videoId) => {
  try {
    const params = await getParams(videoId)
    const url = await buildTranscriptUrl(params);
    const xml = await request({ url });
    const transcriptJson = await parseXmlToJson(xml);
    console.log(JSON.stringify(transcriptJson));
  } catch(e) {
    console.error(e)
  }
}

getTranscript('fZKaq623y38');

export default getTranscript;
