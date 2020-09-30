exports.slackSecret = (function() {
  return {
    clientId: '<SLACK_CLIENT_ID>',
    clientSecret: '<SLACK_CLIENT_SECRET>',
    callbackUrl: 'https://<APP_CELL_FQDN>/__/slack/authentication_done',
    botToken: '<SLACK_BOT_TOKEN>',
    verifyToken: '<SLACK_VERIFY_TOKEN>',
  };
})();
