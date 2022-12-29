
export function Notify() {
  if (window.Notification.permission != "granted") return;

  return new window.Notification("Timer is up!");
}
