const { SessionPage } = require("../session/sessionPage.js"); //when a menu item is clicked

//refresh looping through everything with inner html

//run when the page loads and when a new item is selected.
const RefreshItems = (parsedItems, MenuItems) => {
  let html = "";

  if (!parsedItems || parsedItems.length <= 0)
    return (MenuItems.innerHTML = "<h3> No sessions </h3>");
  parsedItems.forEach((item, key) => {
    html +=
      "<button class='mainMenu-item' id='item-" +
      key +
      "'" +
      "value='" +
      key +
      "'" +
      ">" +
      "<p>" +
      item.name +
      "</p>" +
      "<p>" +
      item.completedSessions +
      "</p>" +
      "</button> \n";
  });
  MenuItems.innerHTML = html;

  const $ItemsQueried = MenuItems.querySelectorAll(".mainMenu-item");
  if (Boolean($ItemsQueried))
    $ItemsQueried.forEach((val, key) =>
      val.addEventListener("click", (e) => {
        SessionPage(e.target.value);
      })
    );

  /**
   **/
};

const _removeAllChildren = (Elem) => {
  const ElemLen = Elem.childElementCount;
  while (ElemLen > 0) {
    Elem.children;
    for (let index = 0; index < ElemLen; index++) {
      Elem.children[index].remove() ?? "";
    }
  }
};
export { RefreshItems };
