let btn = document.querySelector(".btn");
let clip = document.querySelector(".clip");
let close = document.querySelector(".close");
// let video = document.querySelector("video");
const mp3 = document.querySelector("#mp3");
const homeAudioPlay = document.querySelector("#home-audio-play");
const homeLine = document.getElementById("home-line");
const homeLineIn = document.getElementById("home-line-in");
const homeMinute = document.getElementById("home-minute");
const homeSecond = document.getElementById("home-second");
const timeMouse = document.querySelector(".time-mouse");
const timeMouseMinute = document.getElementById("time-mouse-minute");
const timeMouseSecond = document.getElementById("time-mouse-second");
// -----------------------------------------------------------------------------------------------------------
const batafsil = document.querySelector(".team_link");
const closeBatafsil = document.querySelector(".close_batafsil");
// ---
const navbarToggler = document.querySelector(".navbar_open_btnn");
const closeBtn = document.querySelector(".close_btn");
const collapseMenu = document.querySelector(".collapse_menu");
// console.log(batafsil); 

navbarToggler.addEventListener("click", function (event) {
  event.preventDefault();
  navbarToggler.style.display = "none"; 
  closeBtn.style.display = "block"; 
  collapseMenu.style.display = "block"; 
});
// --------
closeBtn.addEventListener("click", function (event) {
  event.preventDefault();
  collapseMenu.style.display = "none";
  navbarToggler.style.display = "block";
  closeBtn.style.display = "none";
});
// -----------------------
batafsil.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".all_card_item").style.display = "block";
  batafsil.style.display = "none";
});

closeBatafsil.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".all_card_item").style.display = "none";
  batafsil.style.display = "block";
});
// ---------------------------------------------------------------------------------------------------------
let isPlay = true;
let clearTime = 0;
let x = 0;
const carusel = document.getElementById("carusel");
let homeI = 0;
let n = 1,
  playn = document.getElementById(`palay${n}`),
  mpn = document.getElementById(`mpn${n}`),
  line = document.querySelector(`#line${n}`),
  lineIn = document.querySelector(`#line-in${n}`),
  id = 0,
  t = true,
  interval = 0;

$(".News_page_carousel").owlCarousel({
  loop: true,
  margin: 10,
  responsiveClass: true,
  nav: false,
  autoplay: true,
  autoplayTimeout: 20000,
  smartSpeed: 700,
  fluidSpeed: 700,
  autoplayHoverPause: false,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 2,
      nav: false,
    },

    1000: {
      items: 3,
      nav: true,
      loop: false,
    },
  },
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("#header");

  header.classList.toggle("bg-light", window.scrollY > 1);
});

// video uchun

const videoPlay = document.querySelector("#video-play");
const videoPause = document.querySelector("#video-pause");
const bgImg = document.querySelector(".open");
const video = document.querySelector("#mp4");

videoPlay.addEventListener("click", function () {
  video.play();
  video.classList.remove("d-none");
  bgImg.classList.add("d-none");
  videoPlay.classList.add("d-none");
  videoPause.classList.remove("d-none");
});

videoPause.addEventListener("click", function () {
  video.classList.add("d-none");
  bgImg.classList.remove("d-none");
  videoPlay.classList.remove("d-none");
  videoPause.classList.add("d-none");
  video.pause();
  video.currentTime = 0;
});

function prev() {
  if (parseInt(mp3.currentTime) > 10) {
    mp3.currentTime = parseInt(mp3.currentTime) - 10;
    isPlay = true;
    play();
  }
}
function next() {
  if (parseInt(mp3.currentTime) < parseInt(mp3.duration) - 10) {
    mp3.currentTime = parseInt(mp3.currentTime) + 10;
    isPlay = true;
    play();
  }
}
function play() {
  mpn.pause();
  t = true;
  if (isPlay) {
    mp3.play();
    clearTime = setInterval(() => {
      findTime();
      homeLineIn.style.width =
        (homeLine.clientWidth * parseInt(mp3.currentTime)) /
          parseInt(mp3.duration) +
        "px";
    }, 1000);
    homeAudioPlay.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    clearInterval(clearTime);
    mp3.pause();
    homeAudioPlay.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
  isPlay = !isPlay;
}

homeLine.onmousemove = (event) => {
  x = event.offsetX;
  timeMouse.style.left = x + "px";
  timeMouse.style.display = "flex";
  let nowTime = Math.floor((parseInt(mp3.duration) * x) / homeLine.clientWidth);
  let m = Math.floor(parseInt(nowTime) / 60);
  let s = parseInt(nowTime) % 60;
  m < 10
    ? (timeMouseMinute.innerHTML = "0" + m)
    : (timeMouseMinute.innerHTML = m);
  s < 10
    ? (timeMouseSecond.innerHTML = "0" + s)
    : (timeMouseSecond.innerHTML = s);
};
homeLine.onmouseleave = (event) => {
  timeMouse.style.display = "none";
};
homeLine.addEventListener("click", function () {
  homeLineIn.style.width = x + "px";
  mp3.currentTime =
    (parseInt(mp3.duration) * homeLineIn.clientWidth) / homeLine.clientWidth;
  findTime();
});

function findTime() {
  let m = Math.floor(parseInt(mp3.currentTime) / 60);
  let s = parseInt(mp3.currentTime) % 60;
  m < 10 ? (homeMinute.innerHTML = "0" + m) : (homeMinute.innerHTML = m);
  s < 10 ? (homeSecond.innerHTML = "0" + s) : (homeSecond.innerHTML = s);
}

setInterval(() => {
  if (homeI == 2) {
    homeI = -1;
  }
  homeI++;
  carusel.style.left = homeI * -100 + "%";
}, 4000);

function findId(index) {
  n = index;
  playn = document.getElementById(`palay${n}`);
  mpn = document.getElementById(`mpn${n}`);
  line = document.querySelector(`#line${n}`);
  lineIn = document.querySelector(`#line-in${n}`);
}
function mpPlay(index) {
  mp3.pause();
  mpn.pause();
  clearInterval(interval);
  playn.innerHTML = `<i class="fa-solid fa-play ms-1"></i>`;
  findId(index);
  if (mpn.currentTime != 0) {
    if (t) {
      mpn.pause();
      clearInterval(interval);
      t = false;
      playn.innerHTML = `<i class="fa-solid fa-play ms-1"></i>`;
    } else {
      t = true;
      mpn.play();
      PlayInterval();
      playn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
  } else {
    mpn.play();
    PlayInterval();
    playn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    t = true;
  }
}
function PlayInterval() {
  interval = setInterval(() => {
    lineIn.style.width =
      Math.floor(
        (line.clientWidth * parseInt(mpn.currentTime)) / parseInt(mpn.duration)
      ) + "px";
  }, 1000);
}
