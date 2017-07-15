var options = {
  type: "basic",
  title: "NBA Alerts",
  message: "hello",
  iconUrl: "Twitter_Logo_White_On_Blue.png"
}

chrome.notifications.create(options,callback);

function callback(){
  console.log("Popup");
}
