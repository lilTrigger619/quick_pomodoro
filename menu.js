const MenuItems = window.document.querySelector("#mainMenu-item-container");
const { ParseSessions } = require("./createNewSession");
const Items = ParseSessions();
const {RefreshItems} = require("./utils");
RefreshItems(Items,MenuItems);
