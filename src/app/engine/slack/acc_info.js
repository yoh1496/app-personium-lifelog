exports.accInfo = (function() {
  /*
   * Begin of your Personium app configurations
   */
  var rootUrl = 'https://app-personium-lifelog.ohesonium.mydns.jp'; // for example: https://demo.personium.io
  var appCellName = 'app-personium-lifelog'; // for example: app-minimal
  /*
   * End of your Personium app configurations
   */

  /*
   * Don't modify anything from here on
   */
  var accInfo = {};
  var appCellUrl = [rootUrl, ''].join('/'); // always with ending slash
  accInfo.APP_CELL_URL = appCellUrl;
  accInfo.APP_CELL_ADMIN_INFO = {
    cellUrl: appCellName,
  };

  return accInfo;
})();
