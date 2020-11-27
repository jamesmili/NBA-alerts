import axios from "axios";

/*
* Retrieves tweets from r/NBA subreddit
* @return an array of tweets
*/

export var getTweets = () => {
  var url = "https://www.reddit.com/r/nba/search.json?q=url%3Atwitter&restrict_sr=on&sort=new&t=week";
  return axios.get(url).then(res =>{
    var posts = []
    res.data.data.children.map(function(obj) {
      if (obj.data.url.includes("twitter")){
        posts.push(obj.data)
      }
    });
    return posts;
  });
}