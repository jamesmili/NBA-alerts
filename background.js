setInterval(function(){
  getData()
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
}, 60000)


function getData(){
  return new Promise((resolve,reject) => {
    $.getJSON(
      "http://www.reddit.com/r/nba/new.json?sort=new&limit=10&t=hour",
      function getData(data)
      {
        $.each(
          data.data.children.slice(0, 10),
          function (i, post) {
            if (post.data.title[0] === "["){
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

function store(url){
  return new Promise((resolve,reject) => {
    chrome.storage.local.get(function(data){
      var links = data.links || [];
      links.push(url);
      chrome.storage.local.set({links})
    })
  })
}
