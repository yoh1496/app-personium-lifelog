/*global _p*/
// eslint-disable-next-line no-unused-vars
function register(request) {
  try {
    // personium.validateRequestMethod(['POST'], request);
    // personium.verifyOrigin(request);

    // var params = personium.parseBodyAsQuery(request);
    // // verify parameter information
    // personium.setAllowedKeys(['lineAccessToken', 'cellUrl', 'accessToken']);
    // personium.setRequiredKeys(['lineAccessToken', 'cellUrl', 'accessToken']);
    // personium.validateKeys(params);

    // const lineAccessToken = params.lineAccessToken;
    // const accessToken = params.accessToken;
    // const cellUrl = params.cellUrl;

    // verifyAccessToken(
    //   accessToken,
    //   cellUrl,
    //   'https://app-ishiguro-01.demo-jp.personium.io/'
    // );
    // verifyLineAccessToken(lineAccessToken, '1654428311');

    // const profile = getLineProfile(lineAccessToken);
    // const userId = profile.userId;

    // const userDataTable = getTable('userData');

    // updateTableEntry(userDataTable, {
    //   __id: userId,
    //   targetCell: cellUrl,
    //   registerKey: '',
    //   confirmKey: '',
    //   status: 'active',
    // });

    // deleteEntry(userDataTable, userData.__id);

    // const userData = getEntry(userDataTable, userId);
    // if (!userData || userData.status !== 'active') {
    //   return {
    //     status: 404,
    //     headers: { 'Content-Type': 'text/plain' },
    //     body: ['valid userData not found.'],
    //   };
    // }

    return {
      status: 200,
      headers: {},
      body: [JSON.stringify(slackSecret)],
    };
  } catch (e) {
    // return personium.createErrorResponse(e);
  }
}

// var personium = require('personium').personium;
// var jsSHA = require('sha_dev2').jsSHA;
// var moment = require('moment').moment;
var httpClient = new _p.extension.HttpClient();
const { slackSecret } = require('slack_secret');
