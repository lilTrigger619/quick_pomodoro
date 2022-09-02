const SessionItemPage = window.document.querySelector("#SessionItemPage");
const $aboutDiv = window.document.querySelector("#sessionItem-content-about");
const { ParseSessions } = require("./createNewSession");
let GlobalSessionId = undefined;

const SessionPage = (sessionId) => {
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
  console.log('session page', SessionItemPage);
  $aboutDiv.querySelector("p#entry").textContent=_theSessionObj.about;
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
  SessionItemPage.classList.toggle("sessionItemPageContainer-show");
});

//update or edit item on the session page
/**
const updateSession = (number)=>{
  const parsed = ParseSessions();
  console.log(parsed);
}
 **/

//edit the about session.
let onAboutEdit = false;
const $aboutDivEditBtn = $aboutDiv.querySelector("button#aboutEdit");
const $aboutDivDoneEdit = $aboutDiv.querySelector("button#done");
const $aboutDivInput = $aboutDiv.querySelector("textarea");
console.log("input", $aboutDivEditBtn);
$aboutDiv.addEventListener("mouseover", (e) => {
  !onAboutEdit ? $aboutDivEditBtn.classList.toggle("hide_it") : "";
});
$aboutDivEditBtn.addEventListener("click", (e) => {
  $aboutDivEditBtn.classList.add("hide_it");
  $aboutDivInput.classList.toggle("hide_it");
  const parsed = ParseSessions();
  $aboutDivInput.value = parsed[GlobalSessionId].about;
  $aboutDivDoneEdit.classList.toggle("hide_it");
  onAboutEdit = true;
});
$aboutDivDoneEdit.addEventListener("click", (e) => {
  $aboutDivInput.classList.toggle("hide_it");
  $aboutDivDoneEdit.classList.toggle("hide_it");
  onAboutEdit = false;
});
$aboutDivInput.addEventListener("change", (e) => {
  e.preventDefault();
  const { value } = e.target;
  const parsed = ParseSessions();
  const Item = parsed[GlobalSessionId];
  console.log("item", Item);
  Item.about = value;
  //set is back to local storage
  //first reverse the item
  const RePush = [];
  RePush.push(
    parsed.reverse().map((val, key) => {
      if (key == 0) return JSON.stringify(val);
      return " ," + JSON.stringify(val);
    })
  );
  window.localStorage.setItem("allSessions",RePush);
  $aboutDiv.querySelector("p#entry").texkkktContent=value;
});


//edit the ... session


export { SessionPage };
