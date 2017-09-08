'use strict';

module.exports = (logSources, printer) => {
  
  var merged = [];
  for (var i = 0; i < logSources.length; i++) {
    while (!logSources[i].drained) {
      var test = logSources[i].pop();
      // dont push if pop returns false
      if (!!test) {
        merged.push(test);
      }
    }
  }
  merged.sort((a, b) => {
    return a.date - b.date;
  });
  
  for (var i = 0; i < merged.length; i++) {
    printer.print(merged[i]);
  }
};
