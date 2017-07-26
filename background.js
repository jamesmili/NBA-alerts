var link = "";
var news = [];

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
      title: info.title,
      message: info.data,
      iconUrl: info.icon
    }
    link = info.tweet
    chrome.notifications.create(options);
    return info;
  })
}

chrome.notifications.onClicked.addListener(function(){
  chrome.tabs.create({url:link});
});

function getData(){
  return new Promise((resolve,reject) => {
    $.getJSON("https://www.reddit.com/search.json?q=subreddit%3Anba+site%3Atwitter.com&sort=new&restrict_sr=&t=hour&limit=5'",function getData(data){
        $.each(
          data.data.children,
          function (i, post) {
            if (post.data.title[0] === "["){
              let title = "NBA Alerts"
              let icon = "nba.png"
              if(post.data.url.includes("wojespn")){
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

function doesExist(info){
  return new Promise((resolve,reject) =>{
    if(news.includes(info.tweet)){
      reject('Notification was already seen')
    }else{
      storeTweets(info.tweet)
      resolve(info)
    }
  })
}

function storeTweets(tweet){
  if (news.length === 5){
    news.splice(0,1)
  }
  news.push(tweet)
  console.log(news)
}
