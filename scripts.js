// This file is for the JS that will be needed to run a pomodoro timer.

//First, get the current time:
var timerStartValue = Date.now();
console.log(timerStartValue);
var timerEndValue = timerStartValue + 1500000;
var outputWithMoment = moment(timerEndValue).format("H:mm:ss:SSS");
console.log(timerEndValue, outputWithMoment);

function timer(){
    var timerCountdown = timerEndValue - Date.now();
    var timeOutput = msToTime(timerCountdown);
    $('#timerOutput').html(timeOutput);
}

//Convert millisecs to minutes and secs (from Stackoverflow):
function msToTime(duration) {
        var   seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)

        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return minutes + ":" + seconds
    }

//render function:
function render(){
    now = moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
    //Output to browser:
    $('#realTimeOut').html(now);
}


//Main program calls:

// First, call render function to set up the clock on page load
render();
// then update:
//Actual Time:
setInterval(render, 10);
//The timer:
setInterval(timer, 10);
