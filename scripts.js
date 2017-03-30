//Start time & end time in millisecs:
var timeStart;
var timeEnd;
var sessionType;
//Track whether we're counting down or not:
var countdown = false;
// time unit in millisecs for the countdown:
const twentyFiveMins = 1500000;
const fiveMins = 300000;
//time left on the clock in millisecs:
var timerCountdown;
//pause duration variables, in millisecs:
var pauseAt;
var unpauseAt;

//Start the timer on start button click:
$('#startTimer').click(function timerStart(){
    timeStart = Date.now();
    timeEnd = timeStart + twentyFiveMins;
    sessionType = "work";
    outputFormattedEndTime(sessionType);
    countdown = true;
    return countdown;
});

//Start the timer on start button click:
$('#break').click(function takeABreak(){
    timeStart = Date.now();
    timeEnd = timeStart + fiveMins;
    sessionType = "break";
    outputFormattedEndTime(sessionType);
    countdown = true;
    return countdown;
});

//on click pause button, halt timer, and reset the end value:
$('#pauseTimer').click(function(){
    if(countdown === true){
        pauseAt = Date.now();
        countdown = false;
        $('#endTimerActualTime').html("<h2>Timer paused.</h2>");
    }else if(countdown === false && timerCountdown > 0){
        unpauseAt = Date.now();
        var pauseDuration = unpauseAt - pauseAt;
        timeEnd = timeEnd + pauseDuration;
        outputFormattedEndTime(sessionType);
        countdown = true;
    }
});

//On click stop button, end timer and reset, and clear the actual end time area of the browser:
$('#stopTimer').click(function(){
    countdown = false;
    $('#endTimerActualTime').html("");
    $('#timerOutput').html("25:00");
});

//this function outputs the actual end time of the timer to the browser on timer start click:
function outputFormattedEndTime(sessionType){
    var formattedEndTime = moment(timeEnd).format("H:mm:ss A");
    if (sessionType == "work"){
        $('#endTimerActualTime').html("<h2>Your work session ends at "+formattedEndTime+"</h2>");
    }else if (sessionType == "break"){
        $('#endTimerActualTime').html("<h2>Your break ends at "+formattedEndTime+"</h2>");
    }

}

//Send the updated timer values to the browser in human readable format:
function outputCurrentTimerValue(timerCountdown){
    var timeOut = msToTime(timerCountdown);
    $('#timerOutput').html(timeOut);
}

//this function converts millisec to human readable time:
function msToTime(duration) {
    var   seconds = parseInt((duration/1000)%60);
    var minutes = parseInt((duration/(1000*60))%60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}

//Update the countdown timer if there is time left, and output to browser:
function timer(){
    timerCountdown = timeEnd - Date.now();
    if (timerCountdown > 0) {
        outputCurrentTimerValue(timerCountdown);
    } else if (timerCountdown < 0){
        countdown = false;
        return countdown;
    }
}

//output the real time to browser:
function renderActualTime(){
    now = moment().format("dddd, MMMM Do YYYY, H:mm:ss A");
    //Output to browser:
    $('#realTimeOut').html("<p><h2>"+ moment().format("H:mm:ss A") + "</h2></p><p><h2>" + moment().format("dddd, MMMM Do YYYY")+"</h2></p>");
}

//this function is called every 100 millisecs (by setInterval) - update real time and call timer() if countdown = true:
function main(){
    renderActualTime();
    if (countdown === true){
        timer();
    }
}

//main program:
setInterval(main, 100);
