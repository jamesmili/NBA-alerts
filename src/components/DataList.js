import React, {Component} from 'react';
import axios from "axios";
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import uuid from 'node-uuid';
declare var chrome: any;

export class DataList extends Component{
  constructor(props){
    super(props)
    this.state = {
      posts: []
    }
    this.updateData = this.updateData.bind(this);

    this.updateData();
  }

  componentWillMount(){
    this.updateData();
  }

  updateData(){
    axios.get("https://www.reddit.com/search.json?q=subreddit%3Anba+site%3Atwitter.com&restrict_sr=&sort=new&t=day&limit=13")
    .then(res =>{
      const posts = res.data.data.children.map(obj => obj.data);
      this.setState({posts});
    })
  }

  render(){
    var getTimeStamp = (utc) => {
      var current = new Date(new Date().getTime())
      var postTime = new Date(utc*1000);
      var timeDiff = Math.abs(current.getTime() - postTime.getTime());
      var diffMinutes = Math.floor(timeDiff / 60000);
      var diffHours = Math.floor(diffMinutes / 60);
      var diffDays = Math.floor(diffHours / 60);

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
    var wojBomb = (title) => {
      if (title.includes("[Wojnarowski]")){
        return <Avatar src="img/woj-bomb.png" backgroundColor="white"/>
      }else{
        return <Avatar src="img/nba.png" backgroundColor="white"/>
      }
    }

    var content = {
      height:"360px",
      overflow: "auto"
    }
    var link = {
      textDecoration: "none"
    }

    var newsText = {
      fontSize: "12px",
      height: "10px"

    }

    var timeText = {
      fontSize: "10px"
    }

    var newsClicked = (postURL) => {
      chrome.tabs.create({url: postURL})
    }
    return(
      <List style={content}>
          {!this.state.posts ? <p>No new News </p> :
            this.state.posts.map(post =>
                <ListItem key={uuid()}
                  onTouchTap={() => newsClicked(post.url)}
                  leftAvatar={wojBomb(post.title)}
                  primaryText={
                    <span style={newsText}>{post.title}</span>
                  }
                  secondaryText={
                    getTimeStamp(post.created_utc)
                  }
                  secondaryTextLines={2}/>
              )
          }
        </List>
    )
  }
}

module.exports = DataList
