/*global _p*/
// Output logs to Event
exports.console = (function() {
  const console = console || {};

  console.log = function(str) {
    const appCell = _p.as('serviceSubject').cell();
    appCell.event.post({
      Type: 'console.log',
      Object: str,
      Info: 'infoData',
    });
  };
  return console;
})();
