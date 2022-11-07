const AppendSessionCard = window.document.querySelector(
  ".addNewSession-cardContainer-hide"
);
const NewSessionBtn = window.document.querySelector("#addNewSession-button");
const CloseSessionBtn = window.document.querySelector("#closeCard-button");
const AppendSessionBtn = window.document.querySelector("#appendSession");
const AddSessionInput = window.document.querySelector("#addNewSession-input");
const Form = window.document.querySelector("form");

//when the close button of the new session is clicked
CloseSessionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  CloseCard(AppendSessionCard);
});

//when the escape key is pressed close the dialog
window.document.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode == 27 && !AppendSessionCard.classList.contains("show"))
    return CloseCard(AppendSessionCard);
});

//Button to submit the session input form
Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const MenuItems = window.document.querySelector("#mainMenu-item-container");
  const {RefreshItems} = require("../utils/utils");
  if (!ValidateInput()) return AddSessionInput.classList.add("is-invalid");
  const NewSession = {
    name: AddSessionInput.value,
    about: "",
    completedSessions: 0,
    currentSessionNum: 0,
    timerFocus: 25,
    timerBreak: 5,
    timerLongBreak: 15,
    numOfSessions: 4,
    showNotif: false,
    sound: false,
  };

  let allSessions = window.localStorage.getItem("allSessions");
  if (allSessions) {
    Save(allSessions, NewSession);
  } else {
    const Items = [];
    Items.push(JSON.stringify(NewSession));
    window.localStorage.setItem("allSessions", Items);
  }
  RefreshItems(ParseSessions(), MenuItems);
  ShowToast(AddSessionInput.value);
  CloseCard(AppendSessionCard);
});

const CloseCard = (Elem) => {
  if (
    !Elem.classList.contains("addNewSession-cardContainer-show") &&
    Elem.classList.contains("addNewSession-cardContainer-hide")
  )
    return;
  AddSessionInput.value = "";
  Elem.classList.remove("addNewSession-cardContainer-show");
  AddSessionInput.classList.remove("is-invalid");
  Elem.classList.add("addNewSession-cardContainer-hide");
};

const ShowCard = (Elem) => {
  if (
    !Elem.classList.contains("addNewSession-cardContainer-hide") &&
    Elem.classList.contains("addNewSession-cardContainer-show")
  )
    return;
  Elem.classList.remove("addNewSession-cardContainer-hide");
  Elem.classList.add("addNewSession-cardContainer-show");
};

//when the add new session button is clicked
NewSessionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ShowCard(AppendSessionCard);
});

//validation
const ValidateInput = () =>
  AddSessionInput.value.length <= 20 &&
  AddSessionInput.value != "" &&
  AddSessionInput.value.indexOf(" ") == -1 && 
  AddSessionInput.value.indexOf(",") == -1;

//save the item to localstorage
const Save = (oldItems, newItem) => {
  const AllItems = oldItems.split(", ,");
  let serializeItems = [];
  serializeItems.push(
    AllItems.map((values, key) => {
      if (key == 0) return values;
      return " ," + values;
    })
  );
  serializeItems.push(" ," + JSON.stringify(newItem));
  window.localStorage.setItem("allSessions", serializeItems);
};

//show the toast function
const ShowToast = (sessionName)=>{
  const bootstrap = require("bootstrap");
  const ToastItem = document.querySelector("#toastItem");
  if(ToastItem){
    const ToastBody = ToastItem.querySelector("#toast_body");
    ToastBody.textContent= "Session created: "+sessionName;
    let toast = new bootstrap.Toast(ToastItem);
    toast.show();
  }
}

//parse all items in the localstorage
export const ParseSessions = ()=>{
  let allItems = window.localStorage.getItem("allSessions");
  if(!allItems) return [];
  allItems = allItems.split(", ,");
  const Obj = allItems.map(vv=>{
    return JSON.parse(vv);
  });
  return Obj.reverse();
}

export {ShowCard}
