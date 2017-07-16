var jquery = require('jquery');

var options = {
  type: "basic",
  title: "NBA Alerts",
  message: "hello",
  iconUrl: "Twitter_Logo_White_On_Blue.png"
}

chrome.notifications.create(options,{
  jquery.getJSON(
    "http://www.reddit.com/r/nba/new.json?sort=new&limit=1&t=hour",
    function foo(data)
    {
      jquery.each(
        data.data.children.slice(0, 10),
        function (i, post) {
          options.message = post.data.title;
        }
      )
    }
  )
});
