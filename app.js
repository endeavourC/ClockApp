class Clock {
  constructor() {
    this.dateInfo = document.querySelector(".wake-info");
    this.isActive = false;
    this.waitingClock = null;
    this.getUserMusic = null;
    this.wakeUpBtn = document.querySelector("#wake-up-btn");
    this.turnOffBtn = document.querySelector("#turn-on-clock");
    this.userDate = null;
    this.currentTime = null;
    this.audioPath = "Rumors.mp3";
    this.songContainer = document.querySelector(".music-container");
    this.exitSetSong = document.querySelector(".fas");
    this.setSongBtn = document.querySelector("#set-music-btn");
    this.songs = document.querySelectorAll("div.song");
    this.hiddenBtn = document.querySelector(".none");
    this.render();
  }
  render() {
    this.wakeUpBtn.addEventListener("click", this.setClock.bind(this));
    this.turnOffBtn.addEventListener("click", this.turnOffClock.bind(this));
    this.setSongBtn.addEventListener(
      "click",
      this.showSongContainer.bind(this)
    );
    this.exitSetSong.addEventListener(
      "click",
      this.exitShowContainer.bind(this)
    );
    this.songs.forEach(song => {
      song.addEventListener("click", this.setClickedSong.bind(this));
    });
  }
  showSongContainer() {
    this.songContainer.classList.add("active");
  }
  exitShowContainer() {
    this.songContainer.classList.remove("active");
  }
  setClickedSong(ev) {
    this.songs.forEach(song => song.classList.remove("active"));
    ev.target.classList.add("active");
    if (ev.target.nodeName == "DIV") {
      this.audioPath = ev.target.dataset.title;
      console.log(this.audioPath);
    }
  }
  startTime(userDate) {
    let time = new Date();
    let currentHours = time.getHours();
    let currentMinutes = time.getMinutes();
    let currentTime = `${this.leadingZero(currentHours)}:${this.leadingZero(
      currentMinutes
    )}`;
    this.checkTime(currentTime, userDate);
  }
  leadingZero(number) {
    return number > 10 ? number : "0" + number;
  }
  checkTime(currentTime, userDate) {
    this.setInfo(userDate);
    if (currentTime === userDate) {
      this.getUserMusic = new Audio(`songs/${this.audioPath}`);
      this.getUserMusic.loop = true;
      this.getUserMusic.autoplay = false;
      this.getUserMusic.play();
      this.hiddenBtn.classList.remove("none");
      clearInterval(this.waitingClock);
    }
  }
  setInfo(userDate) {
    this.dateInfo.innerHTML = `Ustawiłeś budzik na ${userDate}`;
  }
  setClock() {
    this.userDate = document.querySelector(".wake-up-val-input").value;
    if (this.userDate != "") {
      if (this.isActive == false) {
        this.waitingClock = setInterval(() => {
          this.startTime(this.userDate);
        }, 1000);
        this.isActive = true;
      }
    } else {
      alert("Podaj godzinę!");
    }
  }
  turnOffClock() {
    this.getUserMusic.pause();
    this.getUserMusic.currentTime = 0;
  }
}
const clock = new Clock();
