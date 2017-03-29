// This file is for the JS that will be needed to run a pomodoro timer.
timerStartValue = Date.now();
timerEndValue = timerStartValue + 1500000;
var outputWithMoment = moment(timerEndValue).format("H:mm:ss A");
$('#endTimerActualTime').html("Your timer will end at "+outputWithMoment);
var countdown = false;

function timer(){
    var timerCountdown = timerEndValue - Date.now();
    var timeOut = msToTime(timerCountdown);
    $('#timerOutput').html(timeOut);
}

//Convert millisecs to minutes and secs:
//(from Stackoverflow:
// http://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript):
function msToTime(duration) {
    var   seconds = parseInt((duration/1000)%60);
    var minutes = parseInt((duration/(1000*60))%60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}

//render function:
function render(){
    now = moment().format("dddd, MMMM Do YYYY, H:mm:ss A");
    //Output to browser:
    $('#realTimeOut').html("The time is "+ moment().format("H:mm:ss A") + " on " + moment().format("dddd, MMMM Do YYYY"));
}

function update(){
    if(countdown === true){
        timer();
    }
}

$('#startTimer').click(function(){
    console.log("click");
    timerStartValue = Date.now();
    timerEndValue = timerStartValue + 1500000;
    var outputWithMoment = moment(timerEndValue).format("H:mm:ss A");
    $('#endTimerActualTime').html("Your timer will end at "+outputWithMoment);
    countdown = true;
    console.log(countdown);
    return countdown;
});

//Main program calls:
// First, call render function to set up the clock on page load:
render();
// then update:
//Actual Time:
setInterval(render, 10);
//The timer:
setInterval(update, 10);
