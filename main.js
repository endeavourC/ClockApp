const dateInfoCtn = document.querySelector(".wake-info");
let isActive = false;
let waitingClock = null;
let getUserMusic = new Audio("Rumors.mp3");
getUserMusic.loop = true;
getUserMusic.autoplay = false;
const startTime = function(userDate) {
  let time = new Date();
  let currentHours = time.getHours();
  let currentMinutes = time.getMinutes();
  let currentTime = `${leadingZero(currentHours)}:${leadingZero(
    currentMinutes
  )}`;
  checkTime(currentTime, userDate);
};
const leadingZero = function(number) {
  return number > 10 ? number : "0" + number;
};
const checkTime = function(currentTime, userDate) {
  setInfo(userDate);
  if (currentTime === userDate) {
    getUserMusic.play();
    document.querySelector(".none").classList.remove("none");
    clearInterval(waitingClock);
  }
};
const setInfo = function(userDate) {
  dateInfoCtn.innerHTML = `Ustawiłeś budzik na ${userDate}`;
};
const setClock = function() {
  let userDate = document.querySelector(".wake-up-val-input").value;
  if (userDate != "") {
    if (isActive === false) {
      isActive = true;
      waitingClock = setInterval(function() {
        startTime(userDate);
      }, 1000);
    }
  } else {
    alert("Podaj godzinę!");
  }
};
const turnOffClock = function() {
  getUserMusic.pause();
  getUserMusic.currentTime = 0;
};
document.querySelector(".wake-up-btn").addEventListener("click", setClock);
document
  .querySelector("#turn-on-clock")
  .addEventListener("click", turnOffClock);
