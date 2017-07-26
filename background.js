var link = "";

createChromeNotification()
setInterval(function(){
  createChromeNotification()
}, 30000);

function createChromeNotification(){
  getData()
  .then(info => doesExist(info.tweet))
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

chrome.notifications.onClicked.addListener(function(){
  chrome.tabs.create({url:link});
});

function getData(){
  return new Promise((resolve,reject) => {
    $.getJSON("http://www.reddit.com/r/nba/new.json?sort=new&t=hour'",function getData(data){
        $.each(
          data.data.children,
          function (i, post) {
            if (post.data.title[0] === "[" && post.data.url.includes("twitter")){
              let title = "NBA Alerts"
              let icon = "nba.png"
              if(post.data.url.includes("Wojnarowski")){
                title = "Wojbomb";
                icon = "woj-bomb.png";
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

function doesExist(url){
  return new Promise((resolve,reject) =>{
    chrome.storage.local.get(function(data){
      var links = url|| [];
      if (links.indexOf(url) === -1){
        resolve(info);
      }else{
        reject('Notification was already seen');
      }
    })
  })
}

function store(url){
  return new Promise((resolve,reject) => {
    chrome.storage.local.get(function(data){
      var links = data.links || [];
      links.push(url);
      chrome.storage.local.set({links})
    })
  })
}
