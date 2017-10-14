var todayButton = document.getElementById('today-button');
var date = new Date();
var monthElem = document.getElementById('month-elem');
var yearElem = document.getElementById('year-elem');
var leftButton = document.getElementById('left-button');
var rightButton = document.getElementById('right-button');
var table = document.querySelector('table');
var events = [];
var searchElem = document.getElementById('search');
var click = new Event('click');

typeMonth();

createCalendar(date);



searchElem.oninput = function() {
  
  var results = document.getElementById('search-results');
  results.children[0].innerHTML = '';
  
  for (let i = 0; i < events.length; i++) {
    
    if (~events[i].name.indexOf(searchElem.value)) {
      
      var li = document.createElement('li');
      li.innerHTML = events[i].name + '<br>' + formatDate(events[i].date);
      results.children[0].appendChild(li);
      
      li.onclick = function() {
        date = events[i].date;
        createCalendar(date);
        typeMonth();
        results.children[0].innerHTML = '';
        
        var formElem = document.getElementById('form-container');
        
        formElem.style.top = '100px';
        formElem.style.left = '100px';
        
        document.forms[0].elements[0].value = events[i].name;
        document.forms[0].elements[1].value = events[i].participants;
        document.forms[0].elements[2].value = events[i].description;
        
        formElem.style.display = 'initial';
        document.forms[0].elements[0].focus();
      }
    }
  }
  
};




leftButton.onclick = function() {
  date = new Date(date.getFullYear(), date.getMonth() - 1);
  typeMonth();
  createCalendar(date);
};




rightButton.onclick = function() {
  date = new Date(date.getFullYear(), date.getMonth() + 1);
  typeMonth();
  createCalendar(date);
};




todayButton.onclick = function() {
  date = new Date();
  typeMonth();
};




table.onclick = function(event) {
  
  var target = event.target;
  
  while (target != table) {
    
    if (target.tagName == 'TD') {
      
      var formElem = document.getElementById('form-container');
      var tdCoords = target.getBoundingClientRect();
      formElem.style.top = tdCoords.top - 10 + 'px';
      formElem.style.left = tdCoords.left + 20 + 'px';
      
      if (target.style.backgroundColor == 'lightblue') {
        var currentDate = new Date(date.getFullYear(), date.getMonth(), target.getAttribute('date'));
        var currentEvent = searchEventByDate(events, currentDate);
        document.forms[0].elements[0].value = currentEvent.name;
        document.forms[0].elements[1].value = currentEvent.participants;
        document.forms[0].elements[2].value = currentEvent.description;
      }
      
      formElem.style.display = 'initial';
      document.forms[0].elements[0].focus();
      break;
      
    }
    
    target = target.parentNode; 
  }
  
  var close = formElem.firstElementChild;
  close.onclick = function () {
    formElem.style.display = 'none';
    for (var i = 0; i < formElems.length; i++) {
      formElems[i].value = '';
    }
  };
  
  var formElems = document.forms[0].elements;
  var doneButton = document.getElementById('done-button');
  var clearButton = document.getElementById('clear-button');
  
  document.forms[0].onsubmit = function(event) {
      event.preventDefault();
  };
  
  clearButton.onclick = function() {
    for (var i = 0; i < formElems.length; i++) {
      formElems[i].value = '';
    }
  };
  
  doneButton.onclick = function() {
    var eventDate = new Date(date.getFullYear(), date.getMonth(), Number(target.innerHTML));
    var event = {
      date: eventDate,
      name: formElems[0].value,
      participants: formElems[1].value,
      description: formElems[2].value
    };
    events.push(event);
    target.innerHTML += '<br>' + event.name;
    target.style.backgroundColor = 'lightblue';
    target.setAttribute('date', event.date);
    formElem.style.display = 'none';
    for (var i = 0; i < formElems.length; i++) {
      formElems[i].value = '';
    }
  };
  
};




function formatDate(date) {
  var strMonth;
  switch(date.getMonth()) {
                  case 0: strMonth = 'января';
                  break;
                  case 1: strMonth = 'февраля';
                  break;
                  case 2: strMonth = 'марта';
                  break;
                  case 3: strMonth = 'апреля';
                  break;
                  case 4: strMonth = 'мая';
                  break;
                  case 5: strMonth = 'июня';
                  break;
                  case 6: strMonth = 'июля';
                  break;
                  case 7: strMonth = 'августа';
                  break;
                  case 8: strMonth = 'сентября';
                  break;
                  case 9: strMonth = 'октября';
                  break;
                  case 10: strMonth = 'ноября';
                  break;
                  case 11: strMonth = 'декабря';
                  break;
  }
  return date.getDate() + ' ' + strMonth;
}



function searchEventByDate(events, date) {
  for (var i = 0; i < events.length; i++) {
    if (events[i].date.getTime() == date.getTime()) return events[i];
  }
}



function typeMonth() {
  writeMonth(monthElem, date);
  yearElem.innerHTML = date.getFullYear();
}



function createCalendar(date) {
  var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var day = startDate.getDay();

  
  if (!table.rows[5]) {
    var lastRow = table.insertRow(5);
    lastRow.innerHTML = '<td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
  }
  
  var tds = document.querySelectorAll('td');
  
  for (var i = 0; i < tds.length; i++) {
    switch (i) {
      case 0: tds[i].innerHTML = 'Понедельник,';
      break;
      case 1: tds[i].innerHTML = 'Вторник,';
      break;
      case 2:tds[i].innerHTML = 'Среда,';
      break;
      case 3:tds[i].innerHTML = 'Четверг,';
      break;
      case 4:tds[i].innerHTML = 'Пятница,';
      break;
      case 5:tds[i].innerHTML = '<b>Суббота,</b>';
      break;
      case 6:tds[i].innerHTML = '<b>Воскресенье,</b>';
      break;
      default: tds[i].innerHTML = '';
    }
    tds[i].style.backgroundColor = 'white';
  }
  
  var start;
      
  if (day === 0) start = 6;
  else start = day - 1;
      
  var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var lastDay = d.getDate();
  var counter = 1;
      
  for (i = start; i < tds.length; i++) {
    if (counter > lastDay) {
      counter = 1;
      date = new Date(date.getFullYear(), date.getMonth() + 1);
    }
    if (i <= 6) tds[i].innerHTML += '<b>' + counter + '</b>';
    else tds[i].innerHTML = counter;
    var currentDate = new Date(date.getFullYear(), date.getMonth(), counter);

    for (var j = 0; j < events.length; j++) {
      if (events[j].date.getTime() == currentDate.getTime()) {
        tds[i].innerHTML += '<br>' + events[j].name;
        tds[i].style.backgroundColor = 'lightblue';
        tds[i].setAttribute('date', counter);
      }
    }
    counter += 1;
  }
  
  var previousDate = new Date(startDate.getFullYear(), startDate.getMonth(), 0);
  var previousDaysCounter = previousDate.getDate();
  
  for (i = start - 1; i >= 0; i--) {
    tds[i].innerHTML += previousDaysCounter;
    previousDaysCounter -= 1;
  }
  
  
      
  if (Number(tds[35].innerHTML) < 7) table.deleteRow(5);
}



function writeMonth(elem, date) {
  var text;
  switch (date.getMonth()) {
    
    case 0: text = 'Январь';
    break;
    
    case 1: text = 'Февраль';
    break;
    
    case 2: text = 'Март';
    break;
    
    case 3: text = 'Апрель';
    break;
    
    case 4: text = 'Май';
    break;
    
    case 5: text = 'Июнь';
    break;
    
    case 6: text = 'Июль';
    break;
    
    case 7: text = 'Август';
    break;
    
    case 8: text = 'Сентябрь';
    break;
    
    case 9: text = 'Октябрь';
    break;
    
    case 10: text = 'Ноябрь';
    break;
    
    case 11: text = 'Декабрь';
    break;
  }
  elem.innerHTML = text;
} 