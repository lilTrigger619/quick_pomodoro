const {
  checkStorage,
  ResetStorage,
  $MenuContainer,
  $MenuBtn,
} = require("./exports");
import { timerSetup } from "./main";
//const { timerSetup } = require("./main");
const $MenuResetBtn = $MenuContainer.querySelector("#menu-reset");
const $AllMenuInputs = $MenuContainer.querySelectorAll(".menu-input-wrapper");
let inputValues = null;

//function definitions.........

// on menu save button click
const MenuReset = () => {
  ResetStorage();
  redrawSettings();
};

//when an input field in the menu is changed
const MenuInputChange = (event) => {
  const { type, name, value, checked } = event.target;
  const settingsObj = parseSettings();
  timerSetup(parseSettings());
  if (type == "checkbox")
    return window.localStorage.setItem(
      "PomoProps",
      JSON.stringify({ ...settingsObj, [name]: checked })
    );
  return window.localStorage.setItem(
    "PomoProps",
    JSON.stringify({ ...settingsObj, [name]: value })
  );
}; //end of MenuInputChange function.

//to parse setttings from the local storage.
export const parseSettings = () => {
  let obj = window.localStorage.getItem("PomoProps");
  obj = JSON.parse(obj);
  return obj;
}; //end of parseSettings.

//to redraw the items on the items screen.
const redrawSettings = () => {
  const SettingsObj = parseSettings();
  for (let key in SettingsObj) {
    const $MenuInputElement = $MenuContainer.querySelector(
      "input[name='" + key + "']"
    );
    $MenuInputElement.type == "checkbox"
      ? ($MenuInputElement.checked = SettingsObj[key])
      : ($MenuInputElement.value = SettingsObj[key]);

    const $OutputElement =
      $MenuInputElement.parentElement.querySelector("p.output-data");
    $OutputElement != null
      ? ($OutputElement.innerText = SettingsObj[key])
      : null;
  }
}; //end of redrawSettings

//end of function definitions ....................
//

//on close button click
$MenuContainer
  .querySelector("#main-activity-menu-close button")
  .addEventListener("click", () => {
    $MenuContainer.classList.toggle("hide");
  }); //end of eventListener.

//on menu show button.
$MenuBtn.addEventListener("click", () => {
  redrawSettings();
  $MenuContainer.classList.toggle("hide");
}); // end of eventListener.

if ($AllMenuInputs != null) {
  $AllMenuInputs.forEach((va, ke) => {
    console.log("input", { va });
    va.querySelector("input").addEventListener("change", MenuInputChange);
  });
} //end of if condition.

$MenuResetBtn.addEventListener("click", MenuReset);

checkStorage();
redrawSettings();

$MenuContainer
  .querySelectorAll("div.menu-input-wrapper > button.edit-input")
  .forEach((Elem) => {
    Elem.addEventListener("click", ({ target }) => {
      //console.log({target})
      target.classList.toggle("hide");
      target.parentElement
        .querySelector("button.done-edit-input")
        .classList.toggle("hide");
      target.parentElement
        .querySelector("input.edit-input")
        .classList.toggle("hide");
      target.parentElement
        .querySelector("p.output-data")
        .classList.toggle("hide");
    });
  });

//repeate for the done button.
$MenuContainer
  .querySelectorAll("div.menu-input-wrapper > button.done-edit-input")
  .forEach((Elem) => {
    Elem.addEventListener("click", ({ target }) => {
      //console.log({target})
      target.classList.toggle("hide");
      target.parentElement
        .querySelector("button.edit-input")
        .classList.toggle("hide");
      target.parentElement
        .querySelector("input.edit-input")
        .classList.toggle("hide");
      target.parentElement
        .querySelector("p.output-data")
        .classList.toggle("hide");
      redrawSettings();
    });
  });
