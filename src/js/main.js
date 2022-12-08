const {
  TimerEngine,
  $SecondsEntry,
  $MinuteEntry,
  $PauseStartBtn,
  $NotiAudio,
} = require("./exports"); //imports

const testEng = new TimerEngine(); //instance of the timer engine.
testEng.setProps(0.5, { htmlMinute: $MinuteEntry, htmlSeconds: $SecondsEntry });
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
        $NotiAudio.play();
      })//end of .then method.
      .catch((err) => console.log("er", err)); //end of .catch method.
    toggle = true;
  }//end of if condition.
  else {
    testEng.draw();
    testEng.pause();
    toggle = false;
  }; //end of else condition.
}); //end of $Pause/start btn eventListener
