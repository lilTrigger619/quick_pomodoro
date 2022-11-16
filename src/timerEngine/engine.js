
/*
 * When a timer is completed (focus, break, longbreak), per the user option,
 * when he chooses auto proceed, then the count should auto matically proceeed to
 * the next sesssion. But when the auto proceed checkbox is not checked,
 * on completion of a timer, the session will not continue.
 *
 */

const { ParseSessions } = require("../session/createNewSession");
const {EditStoredItem} = require("../utils/utils");

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
    this.minuteEntry = elem.querySelector("#minute");
    this.secondsEntry = elem.querySelector("#seconds");
    this.currentActivity = undefined;
    this.timer = "";
    this.id = undefined;
  };

  setCurrentId = (id)=>{
    this.id = id;
  };

  focus = () => {
    this.currentActivity = "focus";
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

  breakTime = ()=>{
    this.currentActivity = "break";
    this.timer = setInterval(()=>{
      --this.remainingBreakTime;
      this.minuteEntry.textContent = Math.floor(this.remainingBreakTime/60);
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

  longBreakTime = ()=>{
    this.currentActivity = "long break";
    this.timer = setInterval(()=>{
      --this.remainingLongBreakTime;
      this.minuteEntry.textContent = Math.floor(this.remainingLongBreakTime/60);
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

  pause = ()=>{
    clearInterval(this.timer);
  }


  resume = ()=>{
    switch(this.currentActivity){
      case "focus":
        this.focus()
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
     };
  }

  _done_ = () => {
    clearInterval(this.timer);
    this.remainingFocusTime = this.focusTime;
    this.remainingBreakTime = this.breakTime;
    this.remainingLongBreakTime = this.longBreakTime;
    //this.currentActivity = undefined;
    this._next();
  };

  reset = ()=>{
    this.remainingFocusTime = this.focusTime;
    this.remainingBreakTime = this.breakTime;
    this.remainingLongBreakTime = this.longBreakTime;
    this.currentActivity = undefined;
    clearInterval(this.timer);
  }

  _next = ()=>{
    if(!autoProceed) return "waiting for user interaction";
    if(this.currentActivity == "focus") this.completedFocus++;
    //if (this.completedFocus == 4 ) 
  };

  allSessionComplete = ()=>{
    //edit the session object and increament the session completed.
    EditStoredItem(this.id, {completedSessions: });
    return undefined;
  };

}

export { MainEngine };
