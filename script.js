//time stamp
const Minute = window.document.getElementById("minute");
const Seconds = window.document.getElementById("seconds");
const Progress = window.document.getElementsByClassName("meter")[0];

class Pomo {
  constructor(minutePlaceholder, secondsPlaceholder, progress) {
    this.level = 0;
    this.completedSessions = 0;
    this.minutePlaceholder = minutePlaceholder;
    this.secondsPlaceholder = secondsPlaceholder;
    this.Max_Level = 4;
    this.MiliDay = 86400000;
    this.MiliHour = (1 / 24) * this.MiliDay;
    this.progressBar = progress;
    this.currentProgressWidth = 0;
  }

  calcProgress = (partValue, wholeValue)=>{
    const MaxProgressWidth = 20; //in rem;
    this.progressBar.style.width = MaxProgressWidth+"rem";
    const Diff = ((partValue / wholeValue)*100)
    this.currentProgressWidth = ((Diff/100) * MaxProgressWidth);
    this.progressBar.style.width = this.currentProgressWidth+"rem";
    console.log("this. new Rem", this.progressBar.style.width)
    console.log("current width", this.currentProgressWidth);
  }

  //this.longBreak = ()=>{
  //  const theTime = {
  //    hours: 0,
  //    minutes: 0,
  //    seconds: 0,
  //  };
  //};

  //this.shortBreak = ()=>{};

  focusSession = () => {
    this.level ++;
    let Diff, progressWidth;
    const PomoSlice = (25 / 60) * this.MiliHour;
    const MiliNow = Date.now();
    const Future25 = MiliNow + PomoSlice;
    let countDown = setInterval(() => {
      Diff = new Date(Future25 - Date.now());
      this.minutePlaceholder.textContent = Diff.getMinutes();
      this.secondsPlaceholder.textContent = Diff.getSeconds();
      this.calcProgress(Date.now(), Future25);
      if (Future25 == MiliNow) clearInterval(countDown);
    }, 1000);
  };
}

const Init = new Pomo(Minute, Seconds, Progress);
Init.focusSession();
