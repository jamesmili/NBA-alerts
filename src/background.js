var api = require('Api');
/**
* Global variable for chrome.notification.onClicked.addListener
*/
var link = "";

/**
* Creates chrome notification
*/
function createChromeNotification(){
  getData()
  .then(info => doesExist(info))
  .then(info => {
    console.log(info)
    let options = {
      type: "basic",
      title: "NBA Alert",
      message: info[0].title,
      iconUrl: "img/nba.png"
    }
    link = info[0].url
    chrome.notifications.create(options);
    return info;
  })
  .then(info =>{
    store(info[0].url)
  })
}

/**
* Uses jquery to read JSON from reddit api
*/
function getData(){
  return api.getTweets()
}


/**
* Checks if the notification exists in storage
*/
function doesExist(info){
  return new Promise((resolve,reject) =>{
    chrome.storage.local.get('links',function(data){
      var links = data.links || [];
      if (links.indexOf(info[0].url) === -1){
        resolve(info);
      }else{
        reject('Notification was already seen');
      }
    })
  })
}

/**
* Stores the url of notifications that was displayed in storage
*/
function store(url){
  return new Promise((resolve,reject) => {
    chrome.storage.local.get('links',function(data){
      var links = data.links || [];
      links.push(url);
      chrome.storage.local.set({links})
    })
  })
}

/**
* if user clicks on notification open to a new tab with URL
*/
chrome.notifications.onClicked.addListener(function(){
  chrome.tabs.create({url:link});
});

/**
* Run function every minute to see if there are any new news
*/
createChromeNotification()
setInterval(function(){
  console.log("Checking")
  createChromeNotification()
}, 60000);
