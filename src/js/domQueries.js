//html query exports
const $MainActivity = window.document.querySelector("#main-activity-container");
const $MinuteEntry = $MainActivity.querySelector("#timer-minute");
const $SecondsEntry = $MainActivity.querySelector("#timer-seconds");
const $MenuBtn = $MainActivity.querySelector("#btn-menu");
const $PauseStartBtn = $MainActivity.querySelector("#btn-pause");
const $ResetBtn = $MainActivity.querySelector("#btn-reset");
const $NotiAudio = window.document.documentElement.querySelector("audio");
const $NotifWarnModal =
  window.document.documentElement.querySelector("#notif-warn");

const $NotifWarnConfirmBtn = $NotifWarnModal.querySelector("button");
const $AlertLog = window.document.documentElement.querySelector("#alerter");
const $ContinueDiv = $MainActivity.querySelector(
  "div#main-activity-continueBtn"
);
const $TimerDiv = $MainActivity.querySelector("#main-activity-timerDiv");
const $AnimationCanvas = $MainActivity.querySelector("#main-activity-svg-container");
const $MenuContainer = window.document.documentElement.querySelector(".main-activity-menu-container");
const $RoundsDoneEntry = $MainActivity.querySelector("#rounds-done-entry");
const $RoundsRemainingEntry = $MainActivity.querySelector("#rounds-entry");

export {
  $MainActivity,
  $MinuteEntry,
  $SecondsEntry,
  $PauseStartBtn,
  $MenuBtn,
  $ResetBtn,
  $NotiAudio,
  $NotifWarnModal,
  $NotifWarnConfirmBtn,
  $AlertLog,
  $ContinueDiv,
  $TimerDiv,
  $MenuContainer,
  $AnimationCanvas,
  $RoundsDoneEntry,
  $RoundsRemainingEntry,
};
