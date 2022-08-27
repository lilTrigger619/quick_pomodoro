const SessionItemPage = window.document.querySelector("#SessionItemPage");

const SessionPage = (sessionId)=>{
  SessionItemPage.classList.toggle("SessionItemPage-show");
  console.log(SessionItemPage, sessionId);
} 

export {SessionPage};
