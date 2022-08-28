
const {SessionPage} = require("../session/sessionPage.js");

const RefreshItems = (parsedItems, MenuItems) => {
  const Parent = MenuItems.parentElement;
  const MenuItemsId = MenuItems.id;
  MenuItems.remove();
  const AddButton = Parent.querySelector("button");
  const AddButtonId = AddButton.id;
  AddButton.remove()
  const NewMenuItems = document.createElement("div");
  const NewButton = document.createElement("button");
  NewMenuItems.id = MenuItemsId;
  NewButton.id = AddButtonId;
  NewButton.textContent = "+";
  NewButton.onclick = ()=>{
    //todo ...
    const {ShowCard} = require("../session/createNewSession");
    const AddNewSessionCard = window.document.querySelector(".addNewSession-cardContainer-hide");
    ShowCard(AddNewSessionCard);
  }
  parsedItems.forEach((item, key) => {
    const Button = window.document.createElement("button");
    Button.classList.add("mainMenu-item");
    const Name = document.createElement("p");
    const Completed = document.createElement("p");
    Name.textContent = item.name;
    Completed.textContent = item.completedSessions;
    Button.append(Name, Completed);
    Button.onclick = ()=>SessionPage(key);
    NewMenuItems.append(Button);
  });
  Parent.appendChild(NewMenuItems);
  Parent.appendChild(NewButton);
};

const ShowItems = (parsedItems, MenuItems) => {
  parsedItems.forEach((item, key) => {
    console.log("item", item, "Key", key);
    const Button = window.document.createElement("button");
    Button.classList.add("mainMenu-item");
    const Name = document.createElement("p");
    const Completed = document.createElement("p");
    Name.textContent = item.name;
    Completed.textContent = item.completedSessions;
    Button.append(Name, Completed);
    MenuItems.append(Button);
    MenuItems;
  });
};


const _removeAllChildren = (Elem)=>{
  const ElemLen = Elem.childElementCount;
  while(ElemLen > 0){
    Elem.children
    for (let index = 0; index < ElemLen; index++){
      Elem.children[index].remove() ?? "";
    }
  }
};
export {RefreshItems, ShowItems}
