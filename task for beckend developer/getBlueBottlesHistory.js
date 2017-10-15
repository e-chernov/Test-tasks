function getBlueBottlesHistory(redBottles, blueBottles) {
  
  var red = [];
  var blue = [];
  var shift = 0;
  var history = [];
  var historyDetail = {};
  var currentTransactions = [];
  var currentHowMuch;
  
  for (var i = 0; i < redBottles.length; i++) {
    var obj = {
      volume: redBottles[i],
      filling: redBottles[i],
      rest: 0
    };
    red.push(obj);
  }
  
  for (i = 0; i < blueBottles.length; i++) {
    obj = {
      volume: blueBottles[i],
      filling: 0,
      rest: blueBottles[i],
      fillingsNumber: 0
    };
    blue.push(obj);
  }
  

  for (i = 0; i < red.length; i++) {
    if (!blue[i + shift]) break; 
    if (red[i].filling == blue[i + shift].rest) {
      currentHowMuch = red[i].filling;
      red[i].filling = 0;
      red[i].rest = red[i].volume;
      blue[i + shift].filling += currentHowMuch;
      blue[i + shift].rest = blue[i + shift].volume - blue[i + shift].filling;
      blue[i + shift].fillingsNumber += 1;
      historyDetail = {
        fromWhich: i,
        howMuch: currentHowMuch
      };
      currentTransactions.push({
        number: blue[i + shift].fillingsNumber,
        detail: historyDetail
      });
      history[i + shift] = {
        count: blue[i + shift].fillingsNumber,
        transactions: currentTransactions
      };
      currentTransactions = [];
      continue;
    }
    if (red[i].filling > blue[i + shift].rest) {
      currentHowMuch = blue[i + shift].rest;
      red[i].filling -= currentHowMuch;
      red[i].rest = red[i].volume - red[i].filling;
      blue[i + shift].filling += currentHowMuch;
      blue[i + shift].rest = blue[i + shift].volume - blue[i + shift].filling;
      blue[i + shift].fillingsNumber += 1;
      historyDetail = {
        fromWhich: i,
        howMuch: currentHowMuch
      };
      currentTransactions.push({
        number: blue[i + shift].fillingsNumber,
        detail: historyDetail
      });
      history[i + shift] = {
        count: blue[i + shift].fillingsNumber,
        transactions: currentTransactions
      };
      shift++;
      i--;
      currentTransactions = [];
      continue;
    }
    if (red[i].filling < blue[i + shift].rest) {
      currentHowMuch = red[i].filling;
      red[i].filling = 0;
      red[i].rest = red[i].volume;
      blue[i + shift].filling += currentHowMuch;
      blue[i + shift].rest = blue[i + shift].volume - blue[i + shift].filling;
      blue[i + shift].fillingsNumber += 1;
      historyDetail = {
        fromWhich: i,
        howMuch: currentHowMuch
      };
      currentTransactions.push({
        number: blue[i + shift].fillingsNumber,
        detail: historyDetail
      });
      history[i + shift] = {
        count: blue[i + shift].fillingsNumber,
        transactions: currentTransactions
      };
      shift--;
      continue;
    }
  }
  return history; 
}

