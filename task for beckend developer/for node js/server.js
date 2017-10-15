var module = require('./getBlueBottlesHistory');

var history = module.getBlueBottlesHistory([1, 2, 3, 4], [4, 3, 2, 1]);

console.log(history.length);
