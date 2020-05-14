//find the display element
const hourDisplay = document.getElementById("hour_display");
const minuteDisplay = document.getElementById("minute_display");
const secondDisplay = document.getElementById("second_display");
const millisecondDisplay = document.getElementById("millisecond_display");

//find the buttons
const startButton = document.getElementById("start_button");
const stopButton = document.getElementById("stop_button");
const resetButton = document.getElementById("reset_button");

var displayInterval = null; //hold the display interval

var startTime = null; //hold the start time
var stopTime = null; //hold the stop time
var durationStopped = 0; //hold the stop duration


//update the dislay UI for the stopwatch
function updateStopwatchUI(dateObject) {
    //get the time from the date object
    hour = dateObject.getUTCHours();
    minute = dateObject.getUTCMinutes();
    second = dateObject.getUTCSeconds();
    millisecond = dateObject.getUTCMilliseconds();
    hourDisplay.innerHTML = (hour < 10) ? ("0" + hour) : (hour);
    minuteDisplay.innerHTML = (minute < 10) ? ("0" + minute) : (minute);
    secondDisplay.innerHTML = (second < 10) ? ("0" + second) : (second);
    millisecondDisplay.innerHTML = (millisecond < 10) ? ("0" + millisecond) : (millisecond);
}

//deal with start button click
function startCount() {
    startButton.style.display = "none"; //hide the start button
    stopButton.style.display = "inline-block"; //show the stop button

    if (startTime === null) {
        startTime = new Date(); //get the start time
    }

    if (stopTime !== null) {
        durationStopped += (new Date() - stopTime);
    }

    displayInterval = setInterval(function() {
        var currentTime = new Date(); //get the current time
        //get the counted time
        var countedTime = new Date(currentTime - startTime - durationStopped);
        updateStopwatchUI(countedTime); //update the stopwatch UI
    }, 10);
}
startButton.addEventListener("click", startCount);

//deal with stop button click
function stopCount() {
    stopButton.style.display = "none"; //hide the stop button
    startButton.style.display = "inline-block"; //show the start button
    stopTime = new Date(); //get the stop time
    clearInterval(displayInterval); //clear the count interval
}
stopButton.addEventListener("click", stopCount);

//deal with reset button click
function resetCount() {
    clearInterval(displayInterval);
    durationStopped = 0;
    startTime = null;
    stopTime = null;
    stopButton.style.display = "none"; //hide the stop button
    startButton.style.display = "inline-block"; //show the start button
    updateStopwatchUI(new Date(0)); //update the stopwatch UI with zero time
}
resetButton.addEventListener("click", resetCount);