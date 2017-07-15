var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'Ok79uJKb56v8r128AssSFnzqF',
  consumer_secret: 'rRC7cGcfFFW3HviwzRcNPeqf29qXiPix4xxtntu1dgZNwYgu0S',
  access_token_key: '4061490593-R6yU3JGhWsZBdXARXQ1Zvy6DdyWvBgUhpzgGfA2',
  access_token_secret: '6h63nrICrxo5BHnIeNvyVsEiLxeRcHLnYCgrfFDVD80fA'
});

var params = {screen_name: 'wojespn'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
    }
  }
});
