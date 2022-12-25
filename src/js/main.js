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
const {parseSettings} = require("./menu");
console.log("setttings", parseSettings());

const testEng = new TimerEngine(); //instance of the timer engine.
testEng.setProps(0.5, 2, {
  htmlMinute: $MinuteEntry,
  htmlSeconds: $SecondsEntry,
});
let toggle = false;
let completed = false;

//when the pause/start btn is clicked.
$PauseStartBtn.addEventListener("click", () => {
  if (!toggle || !testEng.inProgress) {
    testEng.draw();
    testEng
      .start()
      .then((res) => {
        testEng.reset();
        $NotiAudio.loop = true;
        Notify();
        $NotiAudio.play();
        onContinueClick();
      }) //end of .then method.
      .catch((err) => console.log("er", err)); //end of .catch method.
    toggle = true;
  } //end of if condition.
  else {
    testEng.draw();
    testEng.pause();
    toggle = false;
  } //end of else condition.
}); //end of $Pause/start btn eventListener

//callthe ContinueDivclick

function onContinueClick() {
  ContinueDivClick({ message: testEng.sessionType }).then(() => {
  $NotiAudio.loop= false;
    switch (testEng.sessionType) {
      case "Long break":
        //long break;
        testEng.setTimer(10);
        return testEng.start();
        break;
      case "Short break":
        //short break;
        testEng.setTimer(5);
        return testEng.start();
        break;
      case "Focus":
        //focus;
        testEng.setTimer(25);
        testEng.start();
        break;
      default:
        return null;
        break;
    }
    testEng.start;
  });
}

console.log({$TimerDiv})
export function ContinueDivClick({ message }) {
  console.log({message})
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
