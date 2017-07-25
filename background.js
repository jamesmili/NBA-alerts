var link = "";

createChromeNotification()
setInterval(function(){
  createChromeNotification()
}, 2000);

function createChromeNotification(){
  getData()
  .then(info => doesExist(link))
  .then(info => {
    let options = {
      type: "basic",
      title: info.title,
      message: info.data,
      iconUrl: info.icon
    }
    var link = info.link
    chrome.notifications.create(options);
    return info;
  })
  .then(info =>{
    store(link)
  })
}

chrome.notifications.onClicked.addListener(function(){
  chrome.tabs.create({url:link});
});

function getData(){
  return new Promise((resolve,reject) => {
    $.getJSON(
      "http://www.reddit.com/r/nba/new.json?sort=new&t=hour'",
      function getData(data)
      {
        $.each(
          data.data.children.slice(0, 100),
          function (i, post) {
            if (post.data.title[0] === "[" && post.data.url.includes("twitter")){
              if (post.data.title.includes('Wojnarowski')){
                let title = "Wojbomb"
                let icon = "woj-bomb.png"
                let data = post.data.title;
                link = post.data.url;
                resolve({title,icon,data});
              }else{
                let title = "NBA Alerts"
                let icon = "nba.png"
                let data = post.data.title;
                link = post.data.url;
                resolve({title,icon,data});
              }
            }else{
              reject('No new tweets')
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
