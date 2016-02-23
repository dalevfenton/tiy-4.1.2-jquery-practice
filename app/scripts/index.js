
//import jquery and jquery-ui libraries
var $ = require('jquery');
        require('jquery-ui');

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
