//html query exports
const $MainActivity = window.document.querySelector("#main-activity-container");
const $MinuteEntry = $MainActivity.querySelector("#timer-minute");
const $SecondsEntry = $MainActivity.querySelector("#timer-seconds");
const $MenuBtn = $MainActivity.querySelector("#btn-menu");
const $PauseStartBtn = $MainActivity.querySelector("#btn-pause");
const $ResetBtn = $MainActivity.querySelector("#btn-reset");
const $NotiAudio = window.document.documentElement.querySelector("audio");
const $NotifWarnModal = window.document.documentElement.querySelector("#notif-warn");
const $NotifWarnConfirmBtn = $NotifWarnModal.querySelector("button");
const $AlertLog = window.document.documentElement.querySelector("#alerter");

export {
  $MainActivity,
  $MinuteEntry,
  $SecondsEntry,
  $PauseStartBtn,
  $ResetBtn,
  $NotiAudio,
  $NotifWarnModal,
  $NotifWarnConfirmBtn,
  $AlertLog,
};
