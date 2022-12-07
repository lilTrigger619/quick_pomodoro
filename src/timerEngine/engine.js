/*
 * When a timer is completed (focus, break, longbreak), per the user option,
 * when he chooses auto proceed, then the count should auto matically proceeed to
 * the next sesssion. But when the auto proceed checkbox is not checked,
 * on completion of a timer, the session will not continue.
 *
 */

const { ParseSessions } = require("../session/createNewSession");
const { EditStoredItem } = require("../utils/utils");

const parsed = ParseSessions();
console.log("\n sessions from engin \n ", parsed);

class MainEngine {
  constructor(focus_time, amount_of_focus, break_time, long_break_time, elem) {
    this.focusTime = focus_time * 60;
    this.remainingFocusTime = this.focusTime;
    this.breakTime = break_time * 60;
    this.remainingBreakTime = this.breakTime;
    this.longBreakTime = long_break_time * 60;
    this.remainingLongBreakTime = this.longBreakTime;
    this.totalFocusAmt = amount_of_focus;
    this.completedFocus = 0;
    this.element = elem;
    this.item = undefined;
    //html entries
    this.minuteEntry = this.element.querySelector("#minute");
    this.secondsEntry = this.element.querySelector("#seconds");
    this.remainingSessionEntry = this.element.querySelector("#main-activity-remaining-sessions #remaining");
    this.totalSessionEntry = this.element.querySelector("#main-activity-remaining-sessions .entry");
    this.sessionNameEntry = this.element.querySelectorAll("#main-activity-data-container h3")[0];
    this.sessionMessageEntry = this.element.querySelectorAll("#main-activity-data-container p")[0];


    this.currentActivity = undefined;
    this.timer = "";
    this.id = undefined;
  }

  setCurrentId = (id) => {
    this.id = id;
    this.item = parsed[this.id];
    this.focusTime = parseInt(this.item.timerFocus) * 60;
    console.log("current itme", parsed[this.id])
    this.remainingFocusTime = this.focusTime;
    this.breakTime = parseInt(this.item.timerBreak);
    this.remainingBreakTime = this.breakTime;
    this.longBreakTime = parseInt(this.item.timerLongBreak);
    this.remainingLongBreakTime = this.longBreakTime;
    this.totalFocusAmt = parseInt(this.item.numOfSessions);
    this.minuteEntry.textContent = Math.floor(this.remainingFocusTime / 60);
    this.refresh_elem();
    /**
    const secondsContent = this.remainingFocusTime % 60;
    console.log(secondsContent + "".length);
    this.secondsEntry.textContent =
      secondsContent + "".length == 0 ? "0" + secondsContent : secondsContent;
    console.log("element", this.element);
     **/
  };

  focus = () => {
    this.currentActivity = "focus";
    ++this.completedFocus;
    const aud = new Audio("../../notify_sound.wav")
    aud.play();
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
  };

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
  };

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
      if (this.remainingLongBreakTime <= 0) return this._done_();
    }, 1000);
  };

  pause = () => {
    clearInterval(this.timer);
  };

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
  };

  _done_ = () => {

    clearInterval(this.timer);
    this.remainingFocusTime = this.focusTime;
    this.remainingBreakTime = this.breakTime;
    this.remainingLongBreakTime = this.longBreakTime;
    //this.currentActivity = undefined;
    const aud = new Audio("../notify_sound.wav")
    aud.play();
    this._next();
  };

  reset = () => {
    this.remainingFocusTime = this.focusTime;
    this.remainingBreakTime = this.breakTime;
    this.remainingLongBreakTime = this.longBreakTime;
    this.currentActivity = undefined;
    clearInterval(this.timer);
  };

  _next = () => {
    //if (!autoProceed) return "waiting for user interaction";
    //if (this.currentActivity == "focus") this.completedFocus++;
    this.refresh_elem();
    //if (this.completedFocus == 4 )
    switch (this.currentActivity) {
      case "focus":
        if(this.completedFocus == this.totalFocusAmt){
          this.longBreakTime();   
        }else{
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
  };

  allSessionComplete = () => {
    //edit the session object and increament the session completed.
    //EditStoredItem(this.id, {completedSessions: });
    return undefined;
  };

  refresh_elem = ()=>{
    //minute and seconds element.
    this.minuteEntry.textContent = Math.floor(this.remainingFocusTime / 60);
    const secondsContent = this.remainingFocusTime % 60;
    this.secondsEntry.textContent =
      secondsContent + "".length == 0 ? "0" + secondsContent : secondsContent;

    // remaining amout of sessions.
    let remaining_sessions = this.element.querySelector("#main-activity-remaining-sessions");
    console.log("remaining_sessions", this.remainingSessionEntry, this.totalSessionEntry, this.sessionNameEntry, this.sessionMessageEntry);
    this.remainingSessionEntry.textContent = this.completedFocus;
    this.totalSessionEntry.textContent = this.totalFocusAmt;
    this.sessionNameEntry.textContent = this.item.name;
    this.sessionMessageEntry.textContent = this.item.about;
  };
}


export { MainEngine };
