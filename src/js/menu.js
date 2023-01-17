const {
  checkStorage,
  ResetStorage,
  $MenuContainer,
  $MenuBtn,
} = require("./exports");
import { timerSetup as redrawView } from "./main";
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
  if (type == "checkbox") {
    redrawView({ ...settingsObj, [name]: checked });
    return window.localStorage.setItem(
      "PomoProps",
      JSON.stringify({ ...settingsObj, [name]: checked })
    );
  }
  redrawView({ ...settingsObj, [name]: value });
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
    if ($MenuInputElement.type == "checkbox")
      $MenuInputElement.checked = SettingsObj[key];
    else {
      $MenuInputElement.value = SettingsObj[key];
      $MenuInputElement.style.backgroundSize =
        (parseInt(SettingsObj[key]) / $MenuInputElement.max) * 100 + "% 100%";
      const $OutputElement =
        $MenuInputElement.parentElement.querySelector(".output-data");

      if ($OutputElement != null) {
        if (parseInt(SettingsObj[key]) > 60)
          $OutputElement.value = `0${parseInt(
            parseInt(SettingsObj[key]) / 60
          )} : ${
            parseInt(SettingsObj[key]) % 60 > 9
              ? parseInt(SettingsObj[key]) % 60
              : "0" + (parseInt(SettingsObj[key]) % 60)
          } : 00`;
        else
          $OutputElement.value = `${
            parseInt(SettingsObj[key]) > 9
              ? parseInt(SettingsObj[key])
              : "0" + parseInt(SettingsObj[key])
          } : 00`;
      }
      if ($MenuInputElement.name == "amt of focus before break") {
        $OutputElement.value = SettingsObj[key];
      }
    }
  }
}; //end of redrawSettings

const RangeChange = ({ target }) => {
  console.log({ target }, target.type);
  if (target.type == "checkbox") return;
  target.style.backgroundSize = (target.value / target.max) * 100 + "% 100%";
  let outputValue;
  if (parseInt(target.value) > 60)
    outputValue = ` 0${parseInt(target.value / 60)} : ${
      parseInt(target.value) % 60 > 9
        ? target.value % 60
        : "0" + (target.value % 60)
    } : 00`;
  else
    outputValue = `${
      target.value.length > 1
        ? parseInt(target.value)
        : "0" + parseInt(target.value)
    } : 00`;
  if (target.name == "amt of focus before break")
    target.parentElement.querySelector("output.output-data").value =
      target.value;
  else
    target.parentElement.querySelector("output.output-data").value =
      outputValue;
};

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
    va.querySelector("input").addEventListener("input", RangeChange);
  });
} //end of if condition.

$MenuResetBtn.addEventListener("click", MenuReset);

checkStorage();
redrawSettings();
/**
  // on menu edit button
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
  * **/
