const MenuItems = window.document.querySelector("#mainMenu-item-container");
const { ParseSessions } = require("../session/createNewSession");
const Items = ParseSessions();
const {RefreshItems} = require("../utils/utils");
RefreshItems(Items,MenuItems);
