const AppendSessionCard = window.document.querySelector(
  "#addNewSession-cardContainer"
);
AppendSessionCard.hidden = true;
const NewSessionBtn = window.document.querySelector("#addNewSession-button");
const CloseSessionBtn = window.document.querySelector("#closeCard-button");
const AppendSessionBtn = window.document.querySelector("#appendSession");
const AddSessionInput = window.document.querySelector("#addNewSession-input");
const Form = window.document.querySelector("form");


//when the add new session button is clicked
NewSessionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ShowCard(AppendSessionCard);
});
//when the close button of the new session is clicked
CloseSessionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  CloseCard(AppendSessionCard);
});

//when the escape key is pressed close the dialog
window.document.addEventListener("keyup", (e) => {
  e.preventDefault()
  if (e.keyCode == 27 && !AppendSessionCard.hidden)
    return CloseCard(AppendSessionCard);
});

//clear all the input fields when a new session is created
Form.addEventListener("submit",(e)=>{
  e.preventDefault();
  console.log(ValidateInput());
});

const CloseCard=(Elem)=> {
  Elem.hidden = true;
}

const ShowCard=(Elem)=> {
  Elem.hidden = false;
}

const ValidateInput = ()=>AddSessionInput.value.length <= 10 ;
