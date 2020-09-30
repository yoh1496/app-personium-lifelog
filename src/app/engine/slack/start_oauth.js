/*global _p*/
// eslint-disable-next-line no-unused-vars
function start_oauth(request) {
  try {
    personium.validateRequestMethod(['GET'], request);
    // personium.verifyOrigin(request);

    // var state = [moment().valueOf(), '-per'].join('');
    // var setCookieStr = createCookie(state);
    const state = 'hoge';
    const redirectUrl = getRedirectUrl(state);

    return {
      status: 303,
      headers: {
        Location: redirectUrl,
        // 'Set-Cookie': setCookieStr,
      },
      body: [],
    };
  } catch (e) {
    return personium.createErrorResponse(e);
  }
}

function getRedirectUrl(state) {
  return [
    'https://slack.com/oauth/authorize?client_id=',
    slackSecret.clientId,
    '&scope=identify',
    '&redirect_uri=',
    encodeURIComponent(slackSecret.callbackUrl),
  ].join('');
}

var personium = require('personium').personium;
// var jsSHA = require('sha_dev2').jsSHA;
// var moment = require('moment').moment;
const httpClient = new _p.extension.HttpClient();
const { slackSecret } = require('slack_secret');
