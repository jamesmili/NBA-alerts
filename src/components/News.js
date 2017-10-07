import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';

//ignores the variable chrome when compiling
declare var chrome: any;

export class News extends Component{
  constructor(props){
    super(props)
    this.getTimeStamp = this.getTimeStamp.bind(this);
  }

  /**
  * Calculates the the time difference between current time
  * and reddit thread posted time
  *
  * @param utc the thread posted time in UTC epoch time
  * @return a <p> element with the time difference between current and posted time
  */

  getTimeStamp(utc){
    var timeText = {
      fontSize: "10px"
    }

    var current = new Date(new Date().getTime())
    var postTime = new Date(utc*1000);
    var timeDiff = Math.abs(current.getTime() - postTime.getTime());
    var diffMinutes = Math.floor(timeDiff / 60000);
    var diffHours = Math.floor(diffMinutes / 60);
    var diffDays = Math.floor(diffHours / 24);

    if (diffDays > 1){
      return (<p style={timeText}>{diffDays} days ago</p>)
    }else if (diffDays === 1){
      return (<p style={timeText}>1 day ago</p>)
    }else{
      if (diffHours > 1){
        return (<p style={timeText}>{diffHours} hours ago</p>)
      }else if (diffHours === 1){
        return (<p style={timeText}>1 hour ago</p>)
      }else{
        if (diffMinutes > 1){
          return (<p style={timeText}>{diffMinutes} minutes ago</p>)
        }else if (diffMinutes === 1){
          return (<p style={timeText}>1 minute ago</p>)
        }else{
          return (<p style={timeText}>just now</p>)
        }
      }
    }
  }

  render(){
    var newsText = {
      fontSize: "12px",
      height: "10px"
    }

    var newsClicked = (postURL) => {
      chrome.tabs.create({url: postURL})
    }

    var post = this.props.posts;
    return(
      <ListItem key={post.id}
        onTouchTap={() => newsClicked(post.url)}
        primaryText={
          <span style={newsText}>{post.title}</span>
        }
        secondaryText={
          this.getTimeStamp(post.created_utc)
        }
        secondaryTextLines={2}/>
    )
  }
}

module.exports = News
