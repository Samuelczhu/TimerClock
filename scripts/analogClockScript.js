//get the html elements
const SECOND = document.getElementById("second");
const MINUTE = document.getElementById("minute");
const HOUR = document.getElementById("hour");

//update the clock every 1 sec
setInterval(updateClock, 1000);

function updateClock() {
    //get the current time
    let date = new Date();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let hour = date.getHours();
    //rotate the corresponding html element
    //For second hand: 1 second correspond to 6 degree
    SECOND.style.transform = "rotate(" + (second * 6) + "deg)";
    //For minute hand: 1 second correspond to 0.1 degree
    MINUTE.style.transform = "rotate(" + ((second + minute * 60) * 0.1) + "deg)";
    //For hour hand: 1 second correspond to 1/240 degree
    HOUR.style.transform = "rotate(" + ((second + minute * 60 + hour * 3600) / 120) + "deg)";
}

//update the clock after loading the page
updateClock();