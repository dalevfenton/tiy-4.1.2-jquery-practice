
//import jquery and jquery-ui libraries
var $ = require('jquery');
        require('jquery-ui');
  var keyboard = {0: { keyDisplay:'&#96;', keyCode:'192', altDisplay: '~'},
  1: { keyDisplay:'1', keyCode:'49', altDisplay: '!'},
  2: { keyDisplay:'2', keyCode:'50', altDisplay: '@'},
  3: { keyDisplay:'3', keyCode:'55', altDisplay: '#'},
  4: { keyDisplay:'4', keyCode:'54', altDisplay: '$'},
  5: { keyDisplay:'5', keyCode:'53', altDisplay: '%'},
  6: { keyDisplay:'6', keyCode:'52', altDisplay: '^'},
  7: { keyDisplay:'7', keyCode:'51', altDisplay: '&'},
  8: { keyDisplay:'8', keyCode:'50', altDisplay: '*'},
  9: { keyDisplay:'9', keyCode:'49', altDisplay: '('},
  10: { keyDisplay:'0', keyCode:'48', altDisplay: ')'},
  11: { keyDisplay:'&ndash;', keyCode:'189', altDisplay: '_'},
  12: { keyDisplay:'&#61;', keyCode:'187', altDisplay: '+'},
  13: { keyDisplay:'delete', keyCode:'8', extraClass:'three-halfs row-last', screenVal:true },
  14: { keyDisplay:'tab', keyCode:'9', extraClass:'three-halfs', screenVal:true},
  15: { keyDisplay:'q', keyCode:'81', hasCaps: true},
  16: { keyDisplay:'w', keyCode:'87', hasCaps: true},
  17: { keyDisplay:'e', keyCode:'69', hasCaps: true},
  18: { keyDisplay:'r', keyCode:'82', hasCaps: true},
  19: { keyDisplay:'t', keyCode:'84', hasCaps: true},
  20: { keyDisplay:'y', keyCode:'89', hasCaps: true},
  21: { keyDisplay:'u', keyCode:'85', hasCaps: true},
  22: { keyDisplay:'i', keyCode:'73', hasCaps: true},
  23: { keyDisplay:'o', keyCode:'79', hasCaps: true},
  24: { keyDisplay:'p', keyCode:'80', hasCaps: true},
  25: { keyDisplay:'&#91;', keyCode:'219', altDisplay: '{'},
  26: { keyDisplay:'&#93;', keyCode:'221', altDisplay: '}'},
  27: { keyDisplay:'&#92;', keyCode:'220', extraClass:'row-last', altDisplay: '|' },
  28: { keyDisplay:'caps lock', keyCode:'20', extraClass:'seven-quarters', screenVal:true},
  29: { keyDisplay:'a', keyCode:'65', hasCaps: true},
  30: { keyDisplay:'s', keyCode:'83', hasCaps: true},
  31: { keyDisplay:'d', keyCode:'68', hasCaps: true},
  32: { keyDisplay:'f', keyCode:'70', hasCaps: true},
  33: { keyDisplay:'g', keyCode:'71', hasCaps: true},
  34: { keyDisplay:'h', keyCode:'72', hasCaps: true},
  35: { keyDisplay:'j', keyCode:'74', hasCaps: true},
  36: { keyDisplay:'k', keyCode:'75', hasCaps: true},
  37: { keyDisplay:'l', keyCode:'76', hasCaps: true},
  38: { keyDisplay:'&#59;', keyCode:'186', altDisplay: ':'},
  39: { keyDisplay:'&#39;', keyCode:'222', altDisplay: '"'},
  40: { keyDisplay:'return', keyCode:'13', extraClass:'seven-quarters row-last', screenVal:true},
  41: { keyDisplay:'shift', keyCode:'16', extraClass:'double-wide', screenVal:true},
  42: { keyDisplay:'z', keyCode:'90', hasCaps: true},
  43: { keyDisplay:'x', keyCode:'88', hasCaps: true},
  44: { keyDisplay:'c', keyCode:'67', hasCaps: true},
  45: { keyDisplay:'v', keyCode:'86', hasCaps: true},
  46: { keyDisplay:'b', keyCode:'66', hasCaps: true},
  47: { keyDisplay:'n', keyCode:'78', hasCaps: true},
  48: { keyDisplay:'m', keyCode:'77', hasCaps: true},
  49: { keyDisplay:'&#44;', keyCode:'188', altDisplay: '<'},
  50: { keyDisplay:'&#46;', keyCode:'190', altDisplay: '>'},
  51: { keyDisplay:'&#47;', keyCode:'191', altDisplay: '?'},
  52: { keyDisplay:'shift', keyCode:'16', extraClass:'double-wide row-last', screenVal:true},
  53: { keyDisplay:'space', keyCode:'32', extraClass:'full-width row-last', screenVal:true}};

//------------------------------ACCORDION NAV-BAR-------------------------------
//set up accordion for the nav bar area
$('#accordion').accordion({
  header: 'h3',
  heightStyle: "content"
});



//-----------------------------CALENDAR DATEPICKER------------------------------
//list of month names to pull based on month index provided by getMonth
var monthNames = ["January", "February", "March","April", "May", "June","July", "August", "September","October", "November", "December"];
var selectedDate;
//from stackOverflow answerby flyswat
// @: http://stackoverflow.com/questions/315760/what-is-the-best-way-to-determine-the-number-of-days-in-a-month-with-javascript
function daysInMonth(month,year) {
   return new Date(year, month+1, 0).getDate();
}
function drawCalendar(month, year){
  //set month and year in out header to display correctly
  $('.month-name').html(monthNames[month]);
  $('.year-num').html(year);
  $('.dates-row').html('');
  //find the number of days in the selected month
  var numDays = daysInMonth(month, year);
  //find what day of the week is the first on the month so we can pad earlier days
  var firstDay = new Date(year, month, 1).getDay();
  //find the last day of the previous month so we can pad from the right number
  var prevMonLastDate = new Date(year, month-1, 0).getDate();

  //we use count to pad days at the end so that we know how many days we've gone through
  var count = 1;
  //add padding days to the start of the first row
  while( firstDay > 1){
    $('.dates-row').prepend('<div class="date other-month"><span>' + prevMonLastDate + '</span></div>');
    prevMonLastDate--;
    firstDay--;
    count++;
  }
  //add days of the current month
  var dayNum = 1;
  while( numDays > 0 ){
    $('.dates-row').append('<div class="date"><span>' + dayNum + '</span></div>');
    numDays--;
    dayNum++;
    count ++;
  }
  //pad days at end of the last week
  dayNum = 1;
  while( (count-1) % 7 !== 0 ){
    $('.dates-row').append('<div class="date other-month"><span>' + dayNum + '</span></div>');
    numDays--;
    dayNum++;
    count ++;
  }
  //add click handler to add class on date for style and set variable to return
  //if our application needs to store that value
  $('.date').click(function(){
    $('.date').removeClass('date-selected');
    $(this).addClass('date-selected');
    selectedDate = [curDate.getFullYear(), curDate.getMonth(), $(this).find('span').html()];
    console.log('current selected date that would be returned on form submit: ', selectedDate);
  });
}

//initialize our datepicker with current date
var curDate = new Date();
drawCalendar(curDate.getMonth(), curDate.getFullYear());


//event handlers to rebuild datepicker when inputs are clicked
$('.prev-month').click(function(){
  curDate = new Date(curDate.getFullYear(), curDate.getMonth()-1, 1 );
  drawCalendar(curDate.getMonth(), curDate.getFullYear());
});
$('.next-month').click(function(){
  curDate = new Date(curDate.getFullYear(), curDate.getMonth()+1, 1 );
  drawCalendar(curDate.getMonth(), curDate.getFullYear());
});


//-----------------------------ON SCREEN KEYBOARD-------------------------------
var capsOn = false;
var shiftDown = false;
function classAddRemove(toRemove, propName, className){
  $.each(keyboard, function(value){
    if(keyboard[value][propName] === true){
      var select = '#keyboard-' + value;
      if(toRemove){
        $(select).removeClass(className);
      }else{
        $(select).addClass(className);
      }
    }
  });
}
function classAddRemoveSingle(){

}
function altDisp( toAdd ){
  $.each(keyboard, function(value){
    var select = '#keyboard-' + value;
    if(keyboard[value].altDisplay !== undefined){
      if(shiftDown){
        $(select).html(keyboard[value].altDisplay);
      }else{
        $(select).html(keyboard[value].keyDisplay);
      }
    }else if(keyboard[value].hasCaps !== undefined){
      if(capsOn || shiftDown){
        console.log('inside has caps check');
        console.log(capsOn);
        console.log(shiftDown);
        classAddRemove(false, 'hasCaps', 'caps-on');
      }else{
        classAddRemove(true, 'hasCaps', 'caps-on');
      }
    }
  });
}
function handleKeyInput(keyID){
  keyID = keyID.slice(9);
  if(keyboard[keyID].screenVal === undefined ){
    if(shiftDown || capsOn ){
      var curSelector = '#keyboard-' + keyID;
      var curValue =  $(curSelector)[0].innerText;
      $('#keyboard-display').append(curValue);
      if(shiftDown){
        shiftDown = false;
        altDisp(0);
      }
    }else{
      $('#keyboard-display').append(keyboard[keyID].keyDisplay);
    }
  }else{
    //run switch on special cases
    switch(keyID){
      case '13':
        //delete key
        var curHTML =  $('#keyboard-display').html();
        $('#keyboard-display').html(curHTML.slice(0, curHTML.length-1));
        break;
      case '14':
        //tab key
        $('#keyboard-display').append(Array(5).join('&nbsp;'));
        break;
      case '28':
        //caps lock key
        if(capsOn){
          capsOn = false;
          classAddRemove(true, 'hasCaps', 'caps-on');
        }else{
          capsOn = true;
          classAddRemove(false, 'hasCaps', 'caps-on');
        }
        break;
      case '41' || '52':
        //shift key
        if(shiftDown){
          //unset alternate key displays and switch flag
          shiftDown = false;
          altDisp();
        }else{
          //set alternate key values
          shiftDown = true;
          altDisp();
        }
        break;
      case '40':
        //return key
        //tab key
        $('#keyboard-display').append('</br>');
        break;
    }
  }
}
$.each(keyboard, function(value){
  $('#keys').append('<div id="keyboard-' + value + '" class="keyboard-key">' + keyboard[value].keyDisplay + '</div>');
  var selector = '#keyboard-' + value;
  $(selector).click(function(){
    handleKeyInput(event.target.id);
  });
  if(keyboard[value].extraClass !== undefined){
    $(selector).addClass(keyboard[value].extraClass);
  }
});
