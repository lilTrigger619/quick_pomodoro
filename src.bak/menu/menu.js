const MenuItems = window.document.querySelector("#mainMenu-item-container");
const { ParseSessions } = require("../session/createNewSession");
const Items = ParseSessions();
const {RefreshItems} = require("../utils/utils");
RefreshItems(Items,MenuItems);


//delete all sessions created.
const DeleteAllBtn = document.querySelector("#deleteAllSessions");
DeleteAllBtn.addEventListener("click", e=>{
  e.preventDefault();
  window.localStorage.removeItem("allSessions");
  RefreshItems(Items,MenuItems);
  window.location.reload();
});
