class TimerEngine {
  constructor() {
    this.seconds = 0;
    this.remainingSec = 0;
    this.$htmlMinute = null;
    this.$htmlSeconds = null;
    this.inProgress = false;
    this.activeTimer = null;
    console.log("init")
  } //end of constructor.

  setProps = (minute, { htmlMinute, htmlSeconds }) => {
    this.seconds = minute * 60;
    this.remainingSec = this.seconds;
    this.$htmlMinute = htmlMinute;
    this.$htmlSeconds = htmlSeconds;
    console.log("this", this);
  }; //end of setProps func.

  // to trigger the counter
  start = () => {
    console.log("started")
    if (this.inProgress) return "already in progress";
    this.inProgress = true;
    return new Promise((resolve, reject) => {
      this.activeTimer = setInterval(() => {
        --this.remainingSec;
        this.draw();
        if (this.remainingSec == 0) {
          this.inProgress = false;
          clearInterval(this.activeTimer);
          return resolve(true);
        } //end of if statement.
      }, 1000); //end of setTimeout method.
      if(this.activeTimer == null) return reject("failed to compele the focus");
    }); //end of promise method.
  }; //end of start func.

  draw = () => {
    const Minute = Math.floor(this.remainingSec / 60)
    const Seconds = this.remainingSec % 60
    this.$htmlMinute.textContent = Minute.toString().length == 1 ? "0"+Minute : Minute;
    this.$htmlSeconds.textContent = Seconds.toString().length == 1 ? "0"+Seconds: Seconds;
  }; //end of draw func.

  pause = () => {
    clearInterval(this.activeTimer);
    this.draw();
    this.inProgress = false;
  }; //end of pause func

  reset = () => {
    this.remainingSec = this.seconds;
    this.draw();
  }; //reset to the default state.
}; //end of class

export default TimerEngine;
