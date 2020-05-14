//get the display elements
const hourDisplay = document.getElementById("hour");
const minuteDisplay = document.getElementById("minute");
const secondDisplay = document.getElementById("second");

//get the edit elements
const setTime = document.getElementById("set_time");
const setDisplay1 = document.getElementById("set_display1");
const setDisplay2 = document.getElementById("set_display2");
const setDisplay3 = document.getElementById("set_display3");
const setDisplays = [setDisplay1, setDisplay2, setDisplay3];
const setHour = document.getElementById("set_hour");
const setMinute = document.getElementById("set_minute");
const setSecond = document.getElementById("set_second");
const setInputs = [setHour, setMinute, setSecond];

//get the buttons
const okButton = document.getElementById("ok_button");
const cancelButton = document.getElementById("cancel_button");
const startButton = document.getElementById("start_button");
const stopButton = document.getElementById("stop_button");
const setButton = document.getElementById("set_button");

//the audio for timesup
var timesupAudio = document.getElementById("timesup_audio");
timesupAudio.loop = true; //allow looping

//this class module a timer class
class Timer {
    constructor() {
        //default every attribute to 0
        this.settedHour = 0;
        this.settedMinute = 0;
        this.settedSecond = 0;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.countEnable = false; //default is not counting
    }

    //set the time
    setTime(h, m, s) {
        this.hour = h;
        this.minute = m;
        this.second = s;
    }

    //counting down
    count() {
        //do nothing if it is not counting
        if (!this.countEnable) {
            return;
        }
        //check whether the count is finished
        if (this.hour <= 0 && this.minute <= 0 && this.second <= 0) {
            this.countEnable = false; //change it to not counting
            this.finishedCount(); //call the finished count function
            return;
        }
        this.second--; //decrement the second
        if (this.second < 0) {
            this.second = 59; //wrap around the second
            this.minute--; //decrement the minute
        }
        if (this.minute < 0) {
            this.minute = 59; //wrap around the minute
            this.hour--; //decrement the hour
        }
    }

    //deal with finished the counting
    finishedCount() {
        playAudio(); //play the timesup audio
        //alert the user
        if (window.confirm("Time is up!")) {
            stopCount(); //stop the counting
        } else {
            stopCount(); //stop the counting
        }

    }
}

//the timer object
let timer = new Timer();

var countInterval = null; //later use to set or clear interval for counting

//this function deal with playing the audio
function playAudio() {
    timesupAudio.currentTime = 0; //play from the beginning
    timesupAudio.play();
}

//this function stop playing the audio and reset the audio
function stopAudio() {
    timesupAudio.pause();
    timesupAudio.currentTime = 0;
}


//attach event listener to the setTime element
for (var i = 0; i < setDisplays.length; i++) {
    setDisplays[i].addEventListener("click", editSetting);
}
okButton.addEventListener("click", updateSetting);

//deal with edit setting
function editSetting() {
    setTime.className = "edit"; //add edit class for styling
    for (var i = 0; i < setDisplays.length; i++) {
        setInputs[i].value = setDisplays[i].innerHTML;
    }
}

//deal with update setting
function updateSetting() {
    //check for invalid inputs
    if (!((setHour.value != "" && setHour.value >= 0) &&
            (setMinute.value != "" && setMinute.value >= 0 && setMinute.value < 60) &&
            (setSecond.value != "" && setSecond.value >= 0 && setSecond.value < 60))) {
        alert("Please enter a valid time!");
        return;
    }
    setTime.className = ""; //remove edit class
    for (var i = 0; i < setDisplays.length; i++) {
        value = setInputs[i].value; //get the input value
        setDisplays[i].innerHTML = (value.length == 1) ? ("0" + value) : (value); //set the value with proper format
    }
}

//deal with cancel setting
function cancelSetting() {
    setTime.className = ""; //remove edit class
}
//attach the function to the cancel button
cancelButton.addEventListener("click", cancelSetting);

//deal with set the time
function setTimer() {
    //get the values from the UI
    var h = parseInt(setDisplay1.innerHTML);
    var m = parseInt(setDisplay2.innerHTML);
    var s = parseInt(setDisplay3.innerHTML);
    timer.setTime(h, m, s); //set the timer object
    updateTimerUI(); //update the user interface
}
setButton.addEventListener("click", setTimer); //listen for user event

//this function update the timer UI
function updateTimerUI() {
    hourDisplay.innerHTML = (timer.hour < 10) ? ("0" + timer.hour) : (timer.hour);
    minuteDisplay.innerHTML = (timer.minute < 10) ? ("0" + timer.minute) : (timer.minute);
    secondDisplay.innerHTML = (timer.second < 10) ? ("0" + timer.second) : (timer.second);
}

//start counting
function startCount() {
    //check for empty count
    if (timer.hour === 0 && timer.minute === 0 && timer.second === 0) {
        alert("Please set the time by adjusting the start time and pressing the set button");
        return;
    }

    timer.countEnable = true; //enable counting
    startButton.style.display = "none"; //hide the start button
    stopButton.style.display = "inline-block"; //show the stop button
    //start counting every second
    countInterval = setInterval(function() {
        timer.count(); //let the timer count
        updateTimerUI(); //update the UI
    }, 1000);
}
startButton.addEventListener("click", startCount); //listen for user event

//stop counting
function stopCount() {
    clearInterval(countInterval); //stop the count interval
    timer.countEnable = false; //disable count
    stopButton.style.display = "none"; //hide the stop button
    startButton.style.display = "inline-block"; //show the start button
    stopAudio(); //stop playing audio
}
stopButton.addEventListener("click", stopCount); //listen for user event