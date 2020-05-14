//deal with the header
const dropDownIcon = document.getElementById("dropdown_icon");
const menuBar = document.getElementById("menu_bar");

//show or hide the menubar base on click
dropDownIcon.addEventListener("click", function() {
    menuBar.className = (menuBar.className === "mobile") ? ("") : ("mobile");
});