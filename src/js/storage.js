const initData = require("./default.json");
console.log({initData});

export function checkStorage(){
  const store =window.localStorage.getItem("PomoProps");
  if(store != null) return JSON.parse(store);
  return window.localStorage.setItem("PomoProps", JSON.stringify(initData));
};

export function ResetStorage(){
  return window.localStorage.setItem("PomoProps", JSON.stringify(initData))
}

