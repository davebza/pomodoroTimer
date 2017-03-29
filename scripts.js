// This file is for the JS that will be needed to run a pomodor timer.

//First, get the current time:

var now = moment();
var time = now._d;

//render function:
function render(){
    now = moment();
    time = now._d;
    //Output to browser:
    $('#realTimeOut').html(time);
    console.log("rendered!");
}

render();
setInterval(render, 1000);
//delta function:

//Then, work elapsed time?
