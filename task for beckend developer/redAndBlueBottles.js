var redBottles = [4, 2, 3];
var blueBottles = [3, 2, 1];

var historyArray = getBlueBottlesHistory(redBottles, blueBottles);

for (var i = 0; i < historyArray.length; i++) {
  console.log( 'В позицию №' + i + ' совершено' + historyArray[i].count +
                ' переливаний.');
  for (var j = 0; j < historyArray[i].transactions.length; j++) {
    console.log('№' + historyArray[i].transactions[j].number + ') Из позиции ' +
                historyArray[i].transactions[j].detail.fromWhich +
                ' перелито ' + historyArray[i].transactions[j].detail.howMuch);
  }
}

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

