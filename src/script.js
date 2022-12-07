const $mainMenu = window.document.querySelector("#mainMenu");
const $startPomoBtn = window.document.querySelector("#start_pomodoro");
const $sessionItemPage = window.document.querySelector("#SessionItemPage");
const $mainActivity = window.document.querySelector("#main-activity");
const remainingSessionsDiv = $mainActivity.querySelector(
  "#main-activity-remaining-sessions"
);
const $audio = window.document.querySelector("#main-activity-actions > audio");
$audio.hidden = true;

const { EditStoredItem } = require("./utils/utils");
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
const { MainEngine } = require("./timerEngine/engine");
const EngineHandler = new MainEngine(
  01,
  undefined,
  undefined,
  undefined,
  $mainActivity
); //instance of Timer engine.

//func for starting a new pomo page with the props from the
//previous page
const openPomoPage = () => {
  const AllSes = ParseSessions();
  currentSessionObj = AllSes[window.localStorage.getItem("currentSession")];
  currentSession = window.localStorage.getItem("currentSession");
  EngineHandler.setCurrentId(currentSession); //setting id to the enginehandler to set all the require props

  //set page elements.
  remainingSessionsDiv.querySelector(".entry").textContent =
    currentSessionObj.numOfSessions;
  $sessionItemPage.classList.toggle("sessionItemPageContainer-hide");
  $sessionItemPage.classList.toggle("sessionItemPageContainer-show");
  $mainMenu.classList.add("hide_it");
  $mainActivity.classList.remove("hide_it");
  EditStoredItem(currentSession, { name: "chrome sessions" }); //this is just for testing.
}; //end of openPomoPage function.

$startPomoBtn.addEventListener("click", openPomoPage); //button from the itemProps page to the mainEngine page.

//buttons to control timer.
const $PauseButton = $mainActivity.querySelector("#main-activity-btn-pause");
const $ResumeButton = $mainActivity.querySelector("#main-activity-btn-resume");
const $StartButton = $mainActivity.querySelector("#main-activity-btn-start");
const $RestartButton = $mainActivity.querySelector(
  "#main-activity-btn-restart"
);
const $ResetButton = $mainActivity.querySelector("#main-activity-btn-reset");
const $BackButton = $mainActivity.querySelector("#main-activity-btn-back");
const Pause = () => EngineHandler.pause();
const Resume = () => EngineHandler.resume();
const Start = () => EngineHandler.focus();
const Reset = () => EngineHandler.reset();

//back botton click;
const BackOnClick = () => {
  Reset();

  //show the session item page;
  $sessionItemPage.classList.toggle("sessionItemPageContainer-hide");
  $sessionItemPage.classList.toggle("sessionItemPageContainer-show");
  $mainActivity.classList.add("hide_it");
};//end of backButton onclick.

$PauseButton.addEventListener("click", Pause);
$ResumeButton.addEventListener("click", Resume);
$StartButton.addEventListener("click", Start);
$BackButton.addEventListener("click", BackOnClick);
$ResetButton.addEventListener("click", Reset);

// to request for notification twice recursively.
let notified = 0;
const setNotify = () => {
  try {
    if (window.Notification.permission != "granted") {
      window.Notification.requestPermission().then((permission) => {
        notified++;
        if (permission == "denied") {
          showNotifyWarn();
          notified >= 2 ? null : Notification.requestPermission();
          notified++;
        }
      });
    }
  } catch (err) {
    throw err;
  }
};

const showNotifyWarn = () => {
  window.alert(
    "please note this app may require notification privilages\n in other to notify you during pomodoro session."
  );
};

//get allow notification.
setNotify();

/**
 * always when the permission object of the notification is default
 * show a prompt to the user to accept the notification fot better
 * satisfaction.
 *
 */
