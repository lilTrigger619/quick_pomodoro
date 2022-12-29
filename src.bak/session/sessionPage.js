const $mainMenu = window.document.querySelector("#mainMenu");
const SessionItemPage = window.document.querySelector("#SessionItemPage");
const $aboutDiv = window.document.querySelector("#sessionItem-content-about");
const $focusSessionDiv = window.document.querySelector(
  "#sessionItem-content-focus_length"
);
const $shortBreakDiv = window.document.querySelector(
  "#sessionItem-content-short_break"
);
const $longBreakDiv = window.document.querySelector(
  "#sessionItem-content-long_break"
);
const $numOfSessionDiv = window.document.querySelector(
  "#sessionItem-content-number_of_focus"
);
const $showNotifDiv = window.document.querySelector(
  "#sessionItem-content-show_notif_container"
);
const $makeNotifSoundDiv = window.document.querySelector(
  "#sessionItem-content-notif_sound_container"
);
console.log("news", $showNotifDiv, $makeNotifSoundDiv);

let FocusOption, AboutOption, ShortBreakOption, LongBreakOption, NumSessions;
//MakeNotifSound,
//ShowNotif

const { ParseSessions } = require("./createNewSession");
let GlobalSessionId = undefined;

const SessionPage = (sessionId) => {
  window.localStorage.setItem("currentSession", sessionId);
  ItemFullPage(_getSavedSession(sessionId), sessionId);
  SessionItemPage.classList.remove("sessionItemPageContainer-hideFirstLoad");
  SessionItemPage.classList.toggle("sessionItemPageContainer-hide"); //remove the hide class.
  SessionItemPage.classList.toggle("sessionItemPageContainer-show"); //remove the show class.
};

// get the particular item selected from the menu.
const _getSavedSession = (sessionId) => {
  let savedItems = window.localStorage.getItem("allSessions");
  savedItems = savedItems.split(", ,").reverse();
  return JSON.parse(savedItems[sessionId]);
};

//push the items into a new div

const ItemFullPage = (_theSessionObj, _theSessionId) => {
  const Header = "<h3>" + _theSessionObj.name + "</h3> \n";
  const DeleteButton = "<button id='deleteSessionItem'>Delete session</button>";
  SessionItemPage.querySelector("#sessionItem-header").innerHTML = Header;
  SessionItemPage.querySelector("#sessionItem-action_buttons").innerHTML =
    DeleteButton;
  GlobalSessionId = _theSessionId;

  //set the props
  $aboutDiv.querySelector("p#entry").textContent = _theSessionObj.about;
  $aboutDiv.querySelector(".input").value = _theSessionObj.about;
  $focusSessionDiv.querySelector(".entry").textContent =
    _theSessionObj.timerFocus;
  $focusSessionDiv.querySelector(".input").value = _theSessionObj.timerFocus;
  $shortBreakDiv.querySelector(".entry").textContent =
    _theSessionObj.timerBreak;
  $shortBreakDiv.querySelector(".input").value = _theSessionObj.timerBreak;
  $longBreakDiv.querySelector(".entry").textContent =
    _theSessionObj.timerLongBreak;
  $longBreakDiv.querySelector(".input").value = _theSessionObj.timerLongBreak;
  $numOfSessionDiv.querySelector(".entry").textContent =
    _theSessionObj.numOfSessions;
  $numOfSessionDiv.querySelector(".input").value = _theSessionObj.numOfSessions;
  //seting the id of the session to all buttons.
  SessionItemPage.querySelectorAll(".edit").forEach(
    (val) => (val.value = _theSessionId)
  );

  //delete the item.
  const DeleteBtn = SessionItemPage.querySelector("#deleteSessionItem");
  DeleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    _deleteItem(_theSessionId);
    SessionItemPage.classList.toggle("sessionItemPageContainer-hide");
    SessionItemPage.classList.toggle("sessionItemPageContainer-show");
    const { RefreshItems } = require("../utils/utils");
    RefreshItems(
      ParseSessions(),
      window.document.querySelector("#mainMenu-item-container")
    );
  });

  //option props
  //edit the about message
  AboutOption.init($aboutDiv, "about");

  //edit the focus session
  FocusOption.init($focusSessionDiv, "timerFocus");

  //short session
  ShortBreakOption.init($shortBreakDiv, "timerBreak");

  //long Break
  LongBreakOption.init($longBreakDiv, "timerLongBreak");

  //number of Sessions.
  NumSessions.init($numOfSessionDiv, "numOfSessions");
  //show notifications.
  //ShowNotif = new OptionProps($showNotifDiv, "showNotif");
  // play notification sound.
  //MakeNotifSound = new OptionProps($makeNotifSoundDiv, "sound");
};

//delete an item in the session page
const _deleteItem = (id) => {
  const AllSessionsArr = ParseSessions();
  let newSessions = AllSessionsArr.filter((item, key) => key != id);
  newSessions.reverse();
  let arr = "";
  for (let i = 0; i < newSessions.length; i++) {
    i != 0
      ? (arr += ", ," + JSON.stringify(newSessions[i]))
      : (arr += JSON.stringify(newSessions[i]));
  }

  window.localStorage.setItem("allSessions", arr);
};

//go back to mainMenu
const _backToMenu = window.document.querySelector("#sessionItemPageBacktBtn");
_backToMenu.addEventListener("click", (e) => {
  e.preventDefault();
  SessionItemPage.classList.toggle("sessionItemPageContainer-hide");
  $mainMenu.classList.remove("hide_it");
  SessionItemPage.classList.toggle("sessionItemPageContainer-show");
  FocusOption.removeListeners();
  AboutOption.removeListeners();
  ShortBreakOption.removeListeners();
  LongBreakOption.removeListeners();
  NumSession.removeListeners();
});

//update or edit item on the session page
/**
const updateSession = (number)=>{
  const parsed = ParseSessions();
  console.log(parsed);
}
 **/

class OptionProps {
  init = (PropContainer, query) => {
    this.inputValue = "";
    this.query = query;
    this.onChange = false;
    this.container = PropContainer;
    this.editButton = this.container.querySelector("button.edit");
    this.id = this.editButton.value;
    this.doneButton = this.container.querySelector("button.done");
    this.input = this.container.querySelector(".input");
    this.entry = this.container.querySelector(".entry");
    this.container.addEventListener("mouseenter", this._onmouseEnter);
    this.container.addEventListener("mouseleave", this._onmouseLeave);
    this.editButton.addEventListener("click", this.makeEdit);
    this.doneButton.addEventListener("click", this.makeDone);
    this.input.addEventListener("change", this._onchange);
  };

  _onchange = (e) => {
    this.inputValue = e.target.value;
    this.entry.textContent = this.inputValue;
  };

  _onmouseEnter = () => {
    !this.onChange ? this.editButton.classList.remove("hide_it") : undefined;
  };

  _onmouseLeave = () => {
    this.editButton.classList.add("hide_it");
  };

  makeEdit = () => {
    this.onChange = true;
    this.editButton.classList.add("hide_it");
    this.input.classList.remove("hide_it");
    this.doneButton.classList.remove("hide_it");
  };

  makeDone = () => {
    this.onChange = false;
    this.input.classList.add("hide_it");
    this.doneButton.classList.add("hide_it");
    this.editButton.classList.remove("hide_it");
    this.editItem();
  };

  editItem = () => {
    const parsed = ParseSessions();
    const Item = parsed[this.id];
    Item[this.query] = this.inputValue;
    this.input.value = Item[this.query];
    //set is back to local storage
    //first reverse the item
    const RePush = [];
    RePush.push(
      parsed.reverse().map((val, key) => {
        if (key == 0) return JSON.stringify(val);
        return " ," + JSON.stringify(val);
      })
    );
    window.localStorage.setItem("allSessions", RePush);
  };

  removeListeners = () => {
    this.container.removeEventListener("mouseenter", this._onmouseEnter);
    this.container.removeEventListener("mouseleave", this._onmouseLeave);

    this.editButton.removeEventListener("click", this.makeEdit);
    this.doneButton.removeEventListener("click", this.makeDone);
    this.input.removeEventListener("change", this._onchange);
  };
}
//instantiating
FocusOption = new OptionProps($focusSessionDiv, "timerFocus");
AboutOption = new OptionProps($aboutDiv, "about");
ShortBreakOption = new OptionProps($shortBreakDiv, "timerBreak");
LongBreakOption = new OptionProps($longBreakDiv, "timerLongBreak");
NumSessions = new OptionProps($numOfSessionDiv, "numOfSessions");

export { SessionPage };
