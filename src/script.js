const $mainMenu = window.document.querySelector("#mainMenu");
const $startPomoBtn = window.document.querySelector("#start_pomodoro");
const $sessionItemPage = window.document.querySelector("#SessionItemPage");
const $mainActivity = window.document.querySelector("#main-activity");
const remainingSessionsDiv = $mainActivity.querySelector("#main-activity-remaining-sessions");
const {EditStoredItem} = require("./utils/utils");
const { ParseSessions } = require("./session/createNewSession");
let currentSession = "";
let currentSessionObj = "";

//time stamp
const Minute = window.document.getElementById("minute");
const Seconds = window.document.getElementById("seconds");
const Progress = window.document.getElementsByClassName("meter")[0];

/**
const Init = new Pomo(Minute, Seconds, Progress);
Init.focusSession();
 **/
const  {MainEngine} = require("./timerEngine/engine");
const eng = new MainEngine(01, undefined, undefined, undefined, $mainActivity );
const openPomoPage = ()=>{
  const AllSes = ParseSessions();
  currentSessionObj = AllSes[window.localStorage.getItem("currentSession")]
  currentSession = window.localStorage.getItem("currentSession");
  eng.setCurrentId(currentSession);
  
  //set page elements.
  remainingSessionsDiv.querySelector(".entry").textContent = currentSessionObj.numOfSessions; 

  $sessionItemPage.classList.toggle("sessionItemPageContainer-hide");
  $sessionItemPage.classList.toggle("sessionItemPageContainer-show");
  $mainMenu.classList.add("hide_it");
  $mainActivity.classList.remove("hide_it");
  EditStoredItem(currentSession, {name: "chrome sessions"});
};
$startPomoBtn.addEventListener("click", openPomoPage);

const $PauseButton = $mainActivity.querySelector("#main-activity-btn-pause");
const $ResumeButton = $mainActivity.querySelector("#main-activity-btn-resume");
const $StartButton = $mainActivity.querySelector("#main-activity-btn-start");
const $RestartButton = $mainActivity.querySelector("#main-activity-btn-restart");
const $ResetButton = $mainActivity.querySelector("#main-activity-btn-reset");
const $BackButton = $mainActivity.querySelector("#main-activity-btn-back");
const Pause = ()=> eng.pause(); 
const Resume = ()=> eng.resume();
const Start = ()=> eng.focus();
const Reset = ()=>eng.reset();
//const Reset = ()=> window
console.log(eng.focus()); //sta
//back botton click;
const BackOnClick = ()=>{
  //remove all event listener of the content
  //no need to remove the listeners
  /**
  $PauseButton.removeEventListener("click",Pause);
  $ResumeButton.removeEventListener("click", Resume);
  $StartButton.removeEventListener("click", Start);
  $BackButton.removeEventListener("click", BackOnClick);
   **/

  //reset the timer to stop the counter();
  Reset()

  //show the session item page;
  $sessionItemPage.classList.toggle("sessionItemPageContainer-hide");
  $sessionItemPage.classList.toggle("sessionItemPageContainer-show");
  $mainActivity.classList.add("hide_it");
};



$PauseButton.addEventListener("click", Pause );
$ResumeButton.addEventListener("click", Resume );
$StartButton.addEventListener("click", Start);
$BackButton.addEventListener("click",BackOnClick);
