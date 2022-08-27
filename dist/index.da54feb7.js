class Pomo {
    constructor(minutePlaceholder, secondsPlaceholder, progress){
        this.level = 0;
        this.completedSessions = 0;
        this.minutePlaceholder = minutePlaceholder;
        this.secondsPlaceholder = secondsPlaceholder;
        this.Max_Level = 4;
        this.MiliDay = 86400000;
        this.MiliHour = 1 / 24 * this.MiliDay;
        this.progressBar = progress;
        this.remainingTime = 0;
        this.Future25 = 0;
        this.countDown = 0;
    }
    calcProgress = (presentTimeStamp, FutureTime)=>{
        const ComputedFutureTime = FutureTime - presentTimeStamp;
        this.remainingTime = this.remainingTime - 1000;
        const Diff = this.remainingTime / ComputedFutureTime * 100;
        this.progressBar.style.width = Diff + "%";
    };
    //this.longBreak = ()=>{
    //  const theTime = {
    //    hours: 0,
    //    minutes: 0,
    //    seconds: 0,
    //  };
    //};
    //this.shortBreak = ()=>{};
    focusSession = ()=>{
        const MaxProgressWidth = 20; //in rem;
        this.progressBar.style.width = "100%";
        this.level++;
        let Diff, progressWidth;
        const PomoSlice = 25 / 60 * this.MiliHour;
        const MiliNow = Date.now();
        const Future25 = MiliNow + PomoSlice;
        this.Future25 = Future25;
        this.remainingTime = Future25 - MiliNow;
        this.countDown = setInterval(()=>{
            Diff = new Date(Future25 - Date.now());
            this.minutePlaceholder.textContent = Diff.getMinutes();
            this.secondsPlaceholder.textContent = Diff.getSeconds();
            this.calcProgress(MiliNow, Future25);
            if (Future25 <= Date.now()) {
                clearInterval(this.countDown);
                this.minutePlaceholder.textContent = "00";
                this.secondsPlaceholder.textContent = "00";
            }
        }, 1000);
    };
    //pause focus session
    pauseFocusSession = ()=>{
        clearInterval(this.countDown);
    };
}

//# sourceMappingURL=index.da54feb7.js.map
