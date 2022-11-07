const $mainMenu = window.document.querySelector("#mainMenu");
const $startPomoBtn = window.document.querySelector("#start_pomodoro");
const $sessionItemPage = window.document.querySelector("#SessionItemPage");
const $mainActivity = window.document.querySelector("#main-activity");

//time stamp
const Minute = window.document.getElementById("minute");
const Seconds = window.document.getElementById("seconds");
const Progress = window.document.getElementsByClassName("meter")[0];

/**
const Init = new Pomo(Minute, Seconds, Progress);
Init.focusSession();
 **/
const openPomoPage = ()=>{
  $sessionItemPage.classList.toggle("sessionItemPageContainer-hide");
  $sessionItemPage.classList.toggle("sessionItemPageContainer-show");
  $mainMenu.classList.add("hide_it");
  $mainActivity.classList.remove("hide_it");
};

$startPomoBtn.addEventListener("click", openPomoPage);



const startEngine = ()=>{ };
