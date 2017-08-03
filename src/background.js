import 'jquery';
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
    let options = {
      type: "basic",
      title: info.title,
      message: info.data,
      iconUrl: info.icon
    }
    link = info.tweet
    chrome.notifications.create(options);
    return info;
  })
  .then(info =>{
    store(info.tweet)
  })
}

/**
* Uses jquery to read JSON from reddit api
*/
function getData(){
  return new Promise((resolve,reject) => {
    $.getJSON("https://www.reddit.com/r/nba/search.json?q=twitter&sort=new&restrict_sr=on&t=day",function getData(data){
        $.each(
          data.data.children,
          function (i, post) {
            if (post.data.title[0] === "["){
              let title = "NBA Alerts"
              let icon = "/img/nba.png"
              if(post.data.url.includes("wojespn")){
                title = "Wojbomb";
                icon = "/img/woj-bomb.png";
              }
                let data = post.data.title;
                let tweet = post.data.url;
                resolve({title,icon,data,tweet});
              }
            }
          )
        }
      )
    })
  }


/**
* Checks if the notification exists in storage
*/
function doesExist(info){
  return new Promise((resolve,reject) =>{
    chrome.storage.local.get('links',function(data){
      var links = data.links || [];
      if (links.indexOf(info.tweet) === -1){
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
  createChromeNotification()
}, 60000);
