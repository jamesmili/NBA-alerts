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
      if (current.getDate() > postTime.getDate()){
        var hours = 24 - (postTime.getHours() - current.getHours())
        if (hours > 0){
          return (<p style={timeText}>{current.getDate()-postTime.getDate()} day ago</p>)
        }else{
          return (<p style={timeText}>{hours} hours ago</p>)
        }
      }else if (current.getDate() === postTime.getDate()){
        var hours = current.getHours() - postTime.getHours()
        if (hours == 0){
          var minutes = current.getMinutes() - postTime.getMinutes()
          if (minutes == 0){
            return (<p style={timeText}>Just now</p>)
          }else if (minutes == 1){
            return (<p style={timeText}>{minutes} minute ago</p>)
          }else{
            return (<p style={timeText}>{minutes} minutes ago</p>)
          }
        }else if (hours == 1){
          return (<p style={timeText}>{hours} hour ago</p>)
        }else{
          return (<p style={timeText}>{hours} hours ago</p>)
        }
      }
    }
    var wojBomb = (title) => {
      if (title.includes("[Wojnarowski]")){
        return <Avatar src="./src/img/woj-bomb.png" backgroundColor="white"/>
      }else{
        return <Avatar src="./src/img/nba.png" backgroundColor="white"/>
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
                  primaryText={
                    <span style={newsText}>{post.title}</span>}
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
