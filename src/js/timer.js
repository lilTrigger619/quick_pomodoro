class TimerEngine {
  constructor() {
    this.seconds = 0;
    this.remainingSec = 0;
    this.$htmlMinute = null;
    this.$htmlSeconds = null;
    this.inProgress = false;
    this.activeTimer = null;
    this.focusAmt = null;
    this.remainingFocusAmt = 0;
    this.sessionType = "Focus";
    this.isFocus = true;
    this.ctxAnimation = new Object();
    console.log("init");
  } //end of constructor.

  setProps = (minute, focusAmt, { htmlMinute, htmlSeconds }, ctxAnimation) => {
    this.seconds = minute * 60;
    this.remainingSec = this.seconds;
    this.$htmlMinute = htmlMinute;
    this.$htmlSeconds = htmlSeconds;
    this.focusAmt = parseInt(focusAmt);
    this.remainingFocusAmt = this.focusAmt;
    this.ctxAnimation = ctxAnimation;
  }; //end of setProps func.

  setTimer = (minute) => {
    this.seconds = minute * 60;
    this.remainingSec = this.seconds;
  };
  // to trigger the counter
  start = () => {
    console.log("started");
    if (this.inProgress) return "already in progress";
    this.inProgress = true;
    return new Promise((resolve, reject) => {
      this.activeTimer = setInterval(() => {
        --this.remainingSec;
    window.requestAnimationFrame(() =>
      this.ctxAnimation.redraw({
        percent: this.remainingSec / this.seconds,
        color: "red",
      })
    );
        this.draw();
        if (this.remainingSec == 0) {
          this.inProgress = false;
          this.isFocus = !this.isFocus;
          this.validateTimerType();
          clearInterval(this.activeTimer);
          return resolve(true);
        } //end of if statement.
      }, 1000); //end of setTimeout method.
      if (this.activeTimer == null)
        return reject("failed to compele the focus");
    }); //end of promise method.
  }; //end of start func.

  validateTimerType = () => {
    this.sessionType == "Focus" ? --this.remainingFocusAmt : null;
    if (this.remainingFocusAmt != 0 && this.isFocus) {
      this.sessionType = "Focus";
      console.log({ remainingFocusAmt: this.remainingFocusAmt });
    } else if (!this.isFocus && this.remainingFocusAmt != 0) {
      this.sessionType = "Short break";
    } else {
      console.log("long break in the class");
      this.sessionType = "Long break";
      this.remainingFocusAmt = this.focusAmt;
    }
    return;
  };

  draw = () => {
    const Minute = Math.floor(this.remainingSec / 60);
    const Seconds = this.remainingSec % 60;
    this.$htmlMinute.textContent =
      Minute.toString().length == 1 ? "0" + Minute : Minute;
    this.$htmlSeconds.textContent =
      Seconds.toString().length == 1 ? "0" + Seconds : Seconds;
  }; //end of draw func.

  pause = () => {
    clearInterval(this.activeTimer);
    this.draw();
    this.inProgress = false;
    window.requestAnimationFrame(() =>
      this.ctxAnimation.redraw({
        percent: this.remainingSec / this.seconds,
        color: "red",
      })
    );
  }; //end of pause func

  reset = () => {
    this.remainingSec = this.seconds;
    this.draw();
  }; //reset to the default state.
  
  //getters and setters
  /**
  get remainingFocusAmt(){
    return this.remainingFocusAmt;
  }
  set remainingFocusAmt(value){
    return this.remainingFocusAmt=value;
  }
   **/
} //end of class


export default TimerEngine;
