
createChromeNotification()

setInterval(function(){
  createChromeNotification()
}, 30000);

function createChromeNotification(){
  getData()
  .then(info => doesExist(info))
  .then(info => {
    let options = {
      type: "basic",
      title: "Wojbomb",
      message: info.data,
      iconUrl: "woj-bomb.png"
    }
    chrome.notifications.create(options);
    chrome.notifications.onClicked.addListener(function(){
      chrome.tabs.create({url: info.link})
    })
    return info;
  })
  .then(info =>{
    store(info.link)
  })
}

function getData(){
  return new Promise((resolve,reject) => {
    $.getJSON(
      "http://www.reddit.com/r/nba/new.json?sort=new&t=hour",
      function getData(data)
      {
        $.each(
          data.data.children.slice(0, 100),
          function (i, post) {
            if (post.data.title[0] === "[" && post.data.url.includes("twitter")){
              console.log(post.data.url)
              let data = post.data.title;
              let link = post.data.url;
              resolve({data, link});
            }
          }
        )
      }
    )
  })
}

function doesExist(info){
  return new Promise((resolve,reject) =>{
    chrome.storage.local.get(function(data){
      var links = data.links || [];
      if (links.indexOf(info.link) === -1){
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
