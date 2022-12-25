const { checkStorage, ResetStorage, $MenuContainer, $MenuBtn } = require("./exports");
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
  for (let key in SettingsObj)
    $MenuContainer.querySelector("input[name='" + key + "']").type == "checkbox"
      ?
      $MenuContainer.querySelector("input[name='" + key + "']").checked = SettingsObj[key]
      :
      $MenuContainer.querySelector("input[name='" + key + "']").value = SettingsObj[key]
}; //end of redrawSettings

//end of function definitions ....................
//

//on close button click
$MenuContainer.querySelector("#main-activity-menu-close button").addEventListener("click", ()=>{
  $MenuContainer.classList.toggle("hide");
}) //end of eventListener.

//on menu show button.
$MenuBtn.addEventListener("click", ()=>$MenuContainer.classList.toggle("hide"))

if ($AllMenuInputs != null) {
  $AllMenuInputs.forEach((va, ke) => {
    console.log("input", { va });
    va.querySelector("input").addEventListener("change", MenuInputChange);
  });
} //end of if condition.

$MenuResetBtn.addEventListener("click",MenuReset)

checkStorage();
redrawSettings();
