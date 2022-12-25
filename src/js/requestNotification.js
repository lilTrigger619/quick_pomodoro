const {
  $NotifWarnModal,
  $NotifWarnConfirmBtn,
  $AlertLog,
} = require("./exports");
console.log("aa", $AlertLog);

//1.Do the following when the user has not already selected
//  a notification option from the prompt.
//2.show alert on timeout.
//3.when the ok button is clicked on the $NotifDiv prompt requestNotification Access

if (window.Notification.permission === "default") {
  //show notification wanning modal.
  setTimeout(() => {
    const Props = {
      message:
        " Please select allow on the prompt" +
        " to enable push notifications for " +
        "this app to work more efficiently. ",
      open: true,
      clickEvent: requestNotification,
    };
    toggleModal({ ...Props });
  }, [2000]);
} //end if.

//function to show warning modal with message header and click event.
function toggleModal({ header, message, clickEvent, open }) {
  const $Header = $NotifWarnModal.querySelector(".c_modal-header");
  const $Message = $NotifWarnModal.querySelector(".c_modal-body");
  const $HeaderInput = window.document.createElement("h2");
  const $MessageInput = window.document.createElement("p");
  const $ConstantMessage = window.document.createElement("p");
  const $Ruler = window.document.createElement("hr");

  $HeaderInput.textContent = header ?? "Warning!";
  $MessageInput.textContent = message ?? "";
  $ConstantMessage.textContent = "Click ok to continue...";
  $Header.append($HeaderInput, $Ruler);
  $Message.append($MessageInput, $ConstantMessage);
  open
    ? $NotifWarnModal.classList.remove("hide")
    : $NotifWarnModal.classList.add("hide");
  $NotifWarnConfirmBtn.addEventListener("click", clickEvent);
} //end of toggleModal func.

//function to show the alert box.
function toggleAlertDiv({ message, type }) {
  $AlertLog.classList.className = "hide alert alert-" + type;
  const $closeAlert = $AlertLog.querySelector("button");
  $AlertLog.insertAdjacentHTML("afterbegin", message);
  $AlertLog.classList.remove("hide");
  const handler = () => {
    $AlertLog.classList.add("hide");
    return $closeAlert.removeEventListener("click", handler);
  };
  const TT = setTimeout(handler, 5000);
  $closeAlert.addEventListener("click", handler);
} //end of toggleAlertDiv

//function to request for notification.
function requestNotification(e) {
  e?.preventDefault();
  window.Notification.requestPermission()
    .then((res) => {
      const Props = {
        message:
          "<strong>Notification was not enabled" +
          "</strong>You may not recieve any notification " +
          " from this app.",
        type: "warning",
      };
      if (res !== "granted") toggleAlertDiv({ ...Props });
    })
    .catch((err) => console.log({ err }));
  $NotifWarnModal.classList.add("hide");
} //end of requestNotification func.

