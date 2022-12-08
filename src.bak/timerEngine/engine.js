/*
 * When a timer is completed (focus, break, longbreak), per the user option,
 * when he chooses auto proceed, then the count should auto matically proceeed to
 * the next sesssion. But when the auto proceed checkbox is not checked,
 * on completion of a timer, the session will not continue.
 *
 * prototype:
 *  pageInit: engineInstance.
 *  onMenuItemSelect: engineInstance.setItem
 *  onStart: egineInstance.focus() -> egineInstance._done() -> engineInstance._next() -> egineInstance.break().
 */

const { ParseSessions } = require("../session/createNewSession");
const { EditStoredItem } = require("../utils/utils");

const parsed = ParseSessions();
console.log("\n sessions from engin \n ", parsed);

class MainEngine {
  constructor(focus_time, amount_of_focus, break_time, long_break_time, elem) {
    this.focusTime = focus_time * 60; //focus time
    this.remainingFocusTime = this.focusTime; //taking from focus time
    this.breakTime = break_time * 60; //brea time (immutable);
    this.remainingBreakTime = this.breakTime; //taking from breaktime (mutable)
    this.longBreakTime = long_break_time * 60; //long break time (immutable)
    this.remainingLongBreakTime = this.longBreakTime; //taking from breaktime (mutable)
    this.totalFocusAmt = amount_of_focus; //amount of focus till break;
    this.completedFocus = 0; //increament on every mini focus completion.
    this.element = elem; //the element object
    this.item = undefined; //the ite id.
    this.busy = false; //when there is an ongoing task.
    this.stagePause = false; //toggle when the pause/resume button is clicked.

    //html entries
    this.minuteEntry = this.element.querySelector("#minute");
    this.secondsEntry = this.element.querySelector("#seconds");
    this.remainingSessionEntry = this.element.querySelector(
      "#main-activity-remaining-sessions #remaining"
    );
    this.totalSessionEntry = this.element.querySelector(
      "#main-activity-remaining-sessions .entry"
    );
    this.sessionNameEntry = this.element.querySelectorAll(
      "#main-activity-data-container h3"
    )[0];
    this.sessionMessageEntry = this.element.querySelectorAll(
      "#main-activity-data-container p"
    )[0];

    this.currentActivity = undefined;
    this.timer = "";
    this.id = undefined;
  }

  //setCurrent id for targeting the item.
  setCurrentId = (id) => {
    this.id = id; //id.
    this.item = parsed[this.id]; //id.
    this.audio = window.document.querySelector("#main-activity-actions > audio");
    this.focusTime = parseInt(this.item.timerFocus) * 60; //(immutable focus time.
    //console.log("current itme", parsed[this.id])
    this.remainingFocusTime = this.focusTime; //(mutable focus time).
    this.breakTime = parseInt(this.item.timerBreak); //immutable breaTime).
    this.remainingBreakTime = this.breakTime; //(mutable breakTime).
    this.longBreakTime = parseInt(this.item.timerLongBreak); //(immutable long breaktime).
    this.remainingLongBreakTime = this.longBreakTime; //(mutable long break time).
    this.totalFocusAmt = parseInt(this.item.numOfSessions); //(immutable total number of focus sesions).
    this.minuteEntry.textContent = Math.floor(this.remainingFocusTime / 60); //html minute entry.
    this.refresh_elem(); //redraw the element data on the screen.
    /**
    const secondsContent = this.remainingFocusTime % 60;
    console.log(secondsContent + "".length);
    this.secondsEntry.textContent =
      secondsContent + "".length == 0 ? "0" + secondsContent : secondsContent;
    console.log("element", this.element);
     **/
  }; //end of set current Id.

  //the focus handler
  focus = () => {
    if (this.busy) return "The engine is busy!";
    this.busy = true;
    this.currentActivity = "focus";
    !this.stagePause ? ++this.completedFocus : undefined; //till break;
    this.stagePause = false;
    this.refresh_elem();
    this.timer = setInterval(() => {
      //console.log("remaining focus timer", this.remainingFocusTime, "focus time", this.focusTime);
      --this.remainingFocusTime;
      this.minuteEntry.textContent = Math.floor(this.remainingFocusTime / 60);
      this.secondsEntry.textContent = this.remainingFocusTime % 60;
      console.log(
        "minute: ",
        this.minuteEntry.textContent,
        "seconds: ",
        this.secondsEntry.textContent
      );
      if (this.remainingFocusTime <= 0) return this._done_();
      return "starting focus session";
    }, 1000);
  }; //end of focus func.

  //short breatime handler.
  breakTime = () => {
    this.currentActivity = "break";
    this.refresh_elem();
    this.timer = setInterval(() => {
      --this.remainingBreakTime;
      this.minuteEntry.textContent = Math.floor(this.remainingBreakTime / 60);
      this.secondsEntry.textContent = this.remainingBreakTime % 60;
      console.log(
        " break minute: ",
        this.minuteEntry.textContent,
        " break seconds: ",
        this.secondsEntry.textContent
      );
      if (this.remainingBreakTime <= 0) return this._done_();
    }, 1000);
  }; //end of short break func.

  //long breatime handler.
  longBreakTime = () => {
    this.currentActivity = "long break";
    this.refresh_elem();
    this.timer = setInterval(() => {
      --this.remainingLongBreakTime;
      this.minuteEntry.textContent = Math.floor(
        this.remainingLongBreakTime / 60
      );
      this.secondsEntry.textContent = this.remainingLongBreakTime % 60;
      console.log(
        " break minute: ",
        this.minuteEntry.textContent,
        " break seconds: ",
        this.secondsEntry.textContent
      );
      if (this.remainingLongBreakTime <= 0) return this._done_(); //when done.
    }, 1000);
  }; //end of long breaktime func.

  //pause handler.
  pause = () => {
    if (this.stagePause) return "already paused";
    clearInterval(this.timer);
    this.busy = false;
    return this.stagePause = true;
  }; //end of pause func.

  //resume handler.
  resume = () => {
    switch (this.currentActivity) {
      case "focus":
        this.focus();
        break;
      case "break":
        this.breakTime();
        break;
      case "long break":
        this.longBreakTime();
        break;
      default:
        this.focus();
        break;
    }
  }; //end of resume func.

  //done inner func.
  _done_ = () => {
    this.audio.loop = true;
    this.audio.play();
    this.audio.loop=false;
    //make a promise that will wait for user
    //input to stop the audio and move to next
    //timer.
    clearInterval(this.timer);
    this.busy = false;
    this.remainingFocusTime = this.focusTime;
    this.remainingBreakTime = this.breakTime;
    this.remainingLongBreakTime = this.longBreakTime;
    //this.currentActivity = undefined;
    this._next();
  }; //end of _done inner func.

  //reset handler for reseting everything to default.
  reset = () => {
    this.remainingFocusTime = this.focusTime;
    this.remainingBreakTime = this.breakTime;
    this.remainingLongBreakTime = this.longBreakTime;
    this.completedFocus = 0;
    this.currentActivity = undefined;
    this.busy = false;
    clearInterval(this.timer);
    this.refresh_elem();
  }; //end of  reset func.

  //_next inner func.
  _next = () => {
    //if (!autoProceed) return "waiting for user interaction";
    //if (this.currentActivity == "focus") this.completedFocus++;
    this.refresh_elem();
    //if (this.completedFocus == 4 )
    switch (this.currentActivity) {
      case "focus":
        if (this.completedFocus == this.totalFocusAmt) {
          this.longBreakTime();
        } else {
          this.breakTime();
        }
        break;
      case "break":
        this.focus();
        break;
      case "long break":
        this.completedFocus = 0;
        this.focus();
        break;
      default:
        return undefined;
        break;
    }
    this.refresh_elem();
  }; //end of _next inner func.

  //all sessions complelete handler
  allSessionComplete = () => {
    //edit the session object and increament the session completed.
    //EditStoredItem(this.id, {completedSessions: });
    return undefined;
  }; //end of allSessionsComplete func.

  // redraw elements on screen.
  refresh_elem = () => {
    //minute and seconds element.
    this.minuteEntry.textContent = Math.floor(this.remainingFocusTime / 60);
    const secondsContent = this.remainingFocusTime % 60;
    this.secondsEntry.textContent =
      secondsContent + "".length == 0 ? "0" + secondsContent : secondsContent;

    // remaining amout of sessions.
    let remaining_sessions = this.element.querySelector(
      "#main-activity-remaining-sessions"
    );
    console.log(
      "remaining_sessions",
      this.remainingSessionEntry,
      this.totalSessionEntry,
      this.sessionNameEntry,
      this.sessionMessageEntry
    );
    this.remainingSessionEntry.textContent = this.completedFocus;
    this.totalSessionEntry.textContent = this.totalFocusAmt;
    this.sessionNameEntry.textContent = this.item.name;
    this.sessionMessageEntry.textContent = this.item.about;
  }; //end of refresh_elem func.
}

export { MainEngine };
