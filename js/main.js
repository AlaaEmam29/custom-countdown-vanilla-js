"use strict";
const inputContainer = document.querySelector(".input-container");
const countdown = document.querySelector(".countdown");
const complete = document.querySelector(".complete");
const countdownForm = document.querySelector("form");
const titleForm = document.getElementById("title");
const datePickerDOM = document.getElementById("datePicker");
const timesDOM = document.querySelectorAll(".countdown-list li span ");
const completeInfo = document.querySelector(".complete-info");
const countdownTitleDOM = document.querySelector(".countdown-title");
const btnReset = document.querySelector(".btn-reset");
const btnComplete = document.querySelector(".btn-complete");

let localCountDown
let title = "";
let date = "";
let countDownValue;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
let countdownActive;

const today = new Date().toISOString().split("T")[0];
datePickerDOM.setAttribute("min", today);
function updateTime() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const difference = countDownValue - now;

    let times = [
      Math.floor(difference / year),
      Math.floor((difference % year) / day),
      Math.floor((difference % day) / hour),
      Math.floor((difference % hour) / minute),
      Math.floor((difference % minute) / second),
    ];
    inputContainer.hidden = true;
    if (difference < 0) {
        countdown.hidden = true;
        clearInterval(countdownActive);
        completeInfo.textContent = `${title} finished on ${date}`;
        complete.hidden = false;
      } else {
        countdown.hidden = false;
        countdownTitleDOM.textContent = title;
        timesDOM.forEach((time, index) => {
          time.textContent = `${times[index]}`;
        });
    
      }  
  }, second);
}
countdownForm.addEventListener("submit", function (e) {
  e.preventDefault();
  title = e.target.children[1].value;
  date = e.target.children[3].value;
  localCountDown = 
  {
    title,
    date
  }
  if (date === "" || date === undefined) {
    alert("Please Select the data for the countdown");
  } else {
    countDownValue = new Date(date).getTime();
    updateTime();
  }
  localStorage.setItem("countdown", JSON.stringify(localCountDown))
});
function setUpApp() {
  inputContainer.hidden = false;
  countdown.hidden = true;
  complete.hidden = true;

  clearInterval(countdownActive);
  title = "";
  date = "";
  datePickerDOM.value = "";
  titleForm.value = "";
  localStorage.removeItem("countdown")
}
function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
      inputContainer.hidden = true; 
      localCountDown = JSON.parse(localStorage.getItem('countdown'));
      title = localCountDown.title;
      date = localCountDown.date;
      countDownValue = new Date(date).getTime();
      updateTime();
    }
  }
  
  

btnReset.addEventListener("click", setUpApp);
btnComplete.addEventListener("click", setUpApp)
window.addEventListener("DOMContentLoaded",restorePreviousCountdown)