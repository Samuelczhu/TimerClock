//find all the element
const HOUR = document.getElementById("hour");
const MINUTE = document.getElementById("minute");
const SECOND = document.getElementById("second");

//update the clock per 1 second
setInterval(updateClock, 1000);

//function to update to the current time
function updateClock() {
    //get the current date
    let date = new Date();
    //find the current hour, minute, and second
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    //update the time with formatted time
    HOUR.innerHTML = (hour < 10) ? ("0" + hour) : (hour);
    MINUTE.innerHTML = (minute < 10) ? ("0" + minute) : (minute);
    SECOND.innerHTML = (second < 10) ? ("0" + second) : (second);
}

//update the clock after loading the page
updateClock();