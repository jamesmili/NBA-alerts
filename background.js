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

})

setInterval(function(){


 }, 2000)

function getData(){
  return new Promise((resolve,reject) => {
    $.getJSON(
      "https://www.reddit.com/r/nba/search.json?q=%5Bwojnarowski%5D&sort=new&restrict_sr=on&t=all",
      function getData(data)
      {
        $.each(
          data.data.children.slice(0, 10),
          function (i, post) {
            if (post.data.title.includes("[Wojnarowski]")){
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
