/*global _p*/
// eslint-disable-next-line no-unused-vars
function events(request) {
  const reqBody = request.input.readAll();
  const json = JSON.parse(reqBody);
  console.log(JSON.stringify(json));

  if (json.type === 'url_verification') {
    return personium.createResponse(200, {
      challenge: json.challenge,
    });
  } else if (json.type === 'event_callback') {
    return handleEvent(json.event);
  }

  return {
    status: 200,
    headers: {},
    body: ['type does not match any routes: ' + json.type],
  };
}

function getTable(tableName) {
  return _p
    .as('serviceSubject')
    .cell()
    .box()
    .odata('OData')
    .entitySet(tableName);
}

function getEntry(table, __id) {
  try {
    return table.retrieve(__id);
  } catch (e) {
    console.log(JSON.stringify(e));
    if (e.code === 404) {
      return null;
    } else {
      throw e;
    }
  }
}

function deleteEntry(table, __id) {
  return table.del(__id);
}

function updateTableEntry(table, data) {
  var obj;
  try {
    obj = getEntry(table, data.__id);
    obj = table.merge(obj.__id, data, '*');
    // get the final merged reply
    obj = getEntry(table, data.__id);
  } catch (e) {
    // Create a new entry
    obj = table.create(data);
  }
  return obj;
}

function findUserData(slackUserId) {
  const userDataTable = getTable('userData');
  const userData = getEntry(userDataTable, slackUserId);
  return userData;
}

function displayHome(user) {
  const userData = findUserData(user);
  if (!userData) console.log('user not found: ' + user);

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Welcome',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'This is a home for Personium Slack App.',
      },
    },
  ];

  if (!userData) {
    // not associated
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          'Your ID is not associated with Personium Cell. Before using this App, Please associate your ID with your Personium Cell.',
      },
    });
    blocks.push({
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Associate Personium Cell',
          },
          url: 'https://app-personium-lifelog.ohesonium.mydns.jp/__/front/app',
          style: 'primary',
        },
      ],
    });
  }
  blocks.push({
    type: 'divider',
  });

  const view = {
    type: 'home',
    title: {
      type: 'plain_text',
      text: 'personium_app',
    },
    blocks: blocks,
  };

  const args = {
    token: slackSecret.botToken,
    user_id: user,
    view: JSON.stringify(view),
  };

  const contentType = 'application/x-www-form-urlencoded';
  const body = [
    'token=' + slackSecret.botToken,
    'user_id=' + user,
    'view=' + JSON.stringify(view),
  ].join('&');

  const result = personium.httpPOSTMethod(
    'https://slack.com/api/views.publish',
    { Accept: 'application/json' },
    contentType, //'application/json',
    body, // JSON.stringify(args),
    200
  );

  console.log(JSON.stringify(result));

  return {
    status: 200,
    headers: {},
    body: ['displayHome'],
  };
}

function handleEvent(body) {
  const { type, user, channel, tab, text, subtype } = body;
  if (type === 'app_home_opened') {
    return displayHome(user);
  } else {
    console.log('nothing is matched');
    return {
      status: 200,
      headers: {},
      body: ['event.type does not match any routes: ' + type],
    };
  }
}

var personium = require('personium').personium;
var console = require('console').console;

const { slackSecret } = require('slack_secret');
