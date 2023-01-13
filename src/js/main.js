const {
  TimerEngine,
  $SecondsEntry,
  $MinuteEntry,
  $PauseStartBtn,
  $NotiAudio,
  Notify,
  $ContinueDiv,
  $TimerDiv,
} = require("./exports"); //imports
const { parseSettings } = require("./menu"); //imports
const testEng = new TimerEngine(); //instance of the timer engine.

//function definitions.

//setup the props for the timer
export const timerSetup = (_dataStore) => {
  const amtFocus = _dataStore["amt of focus before break"];
  const focus = _dataStore["focus time"];
  testEng.setProps(focus, amtFocus, {
    htmlMinute: $MinuteEntry,
    htmlSeconds: $SecondsEntry,
  });
}; // end of timerSetup function.

//when the continue is tapped after timer completion.
export function ContinueDivClick({ message }) {
  console.log({ message });
  $ContinueDiv.querySelector("span#continue-entry").textContent = message;
  $TimerDiv.parentElement.classList.add("hide");
  $ContinueDiv.classList.remove("hide");
  return new Promise(function (resolve, reject) {
    const resolver = () => {
      $TimerDiv.parentElement.classList.remove("hide");
      $ContinueDiv.classList.add("hide");
      resolve();
      return $ContinueDiv.removeEventListener("click", resolver);
    };
    $ContinueDiv.addEventListener("click", resolver);
  });
}

// Function to show the click to continue on timer completion
function handleClickPromise() {
  $NotiAudio.loop = false;
  switch (testEng.sessionType) {
    case "Long break":
      //long break;
      testEng.setTimer(_dataStore["long break time"]);
      testEng
        .start()
        .then(handleTimerEndPromise) //end of .then method.
        .catch((err) => console.log("er", err)); //end of .catch method.
      break;
    case "Short break":
      //short break;
      testEng.setTimer(_dataStore["break time"]);
      testEng
        .start()
        .then(handleTimerEndPromise) //end of .then method.
        .catch((err) => console.log("er", err)); //end of .catch method.
      break;
    case "Focus":
      //focus;
      testEng.setTimer(_dataStore["focus time"]);
      testEng
        .start()
        .then(handleTimerEndPromise) //end of .then method.
        .catch((err) => console.log("er", err)); //end of .catch method.
      break;
    default:
      testEng.setTimer(_dataStore["focus time"]);
      testEng
        .start()
        .then(handleTimerEndPromise) //end of .then method.
        .catch((err) => console.log("er", err)); //end of .catch method.
      break;
  }
}
//when the timer ends.
const handleTimerEndPromise = () => {
  console.log("got here");
  testEng.reset();
  $NotiAudio.loop = true;
  _dataStore["show notification"] ? Notify() : null;
  _dataStore["play sound"] ? $NotiAudio.play() : null;
  ContinueDivClick({ message: testEng.sessionType }).then(handleClickPromise); //when the continuebtn is clicked timer completion.
};

const pauseStart = () => {
  if (!toggle || !testEng.inProgress) {
    testEng.draw();
    testEng
      .start()
      .then(handleTimerEndPromise) //end of .then method.
      .catch((err) => console.log("er", err)); //end of .catch method.
    toggle = true;
  } //end of if condition.
  else {
    testEng.draw();
    testEng.pause();
    toggle = false;
  } //end of else condition.
};

// end of function definitions ..........................................

const _dataStore = parseSettings();
timerSetup(_dataStore);
console.log({ _dataStore });

let toggle = false; //global state to change when the start button is clicked.
let completed = false; //toggled when a timer is cmpleted.

//when the pause/start btn is clicked.
$PauseStartBtn.addEventListener("click", pauseStart); //end of $Pause/start btn eventListener

//callthe ContinueDivclick
