const P = require('bluebird');

'use strict';

var saveLogs = (sources, i, logStorage) => {
  return sources[i].popAsync().then(val => {
    if (val) {
      logStorage.push(val);
      return saveLogs(sources, i, logStorage);
    } else if (sources[i + 1]) {
      return saveLogs(sources, i + 1, logStorage);
    } else {
      return P.all(logStorage);
    }
  }).catch(err => { throw err; });
};


module.exports = (sources, printer) => {
  let logStorage = [];
  saveLogs(sources, 0, logStorage).then(logStorage => {

    logStorage.sort((a, b) => {
      return a.date - b.date;
    });

    for (var i = 0; i < logStorage.length; i++) {
      printer.print(logStorage[i]);
    }
  }).catch(err => { throw err; });
};

