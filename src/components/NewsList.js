import React, {Component} from 'react';
import axios from "axios";
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import uuid from 'node-uuid';

//ignores the variable chrome when compiling
declare var chrome: any;

export class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      posts: []
    }
    this.updateData = this.updateData.bind(this);
    this.getTimeStamp = this.getTimeStamp.bind(this);
    this.renderNews = this.renderNews.bind(this);

    this.updateData();
  }

  /**
   * Configures state before rendering
   */

  componentWillMount(){
    this.updateData();
  }

/**
* Uses axios library to get JSON from the reddit api and
* is placed in an array in state
*/

  updateData(){
    axios.get("https://www.reddit.com/r/nba/search.json?q=twitter&sort=new&restrict_sr=on&t=day")
    .then(res =>{
      let posts = []
      res.data.data.children.map(function(obj) {
        if (obj.data.title.includes("[")){
          posts.push(obj.data)
        }
      });
      this.setState({posts});
    })
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

/**
* Creates the list of news to be rendered
*
* @return ListItem element that contains the news
*/

  renderNews(){

    var newsClicked = (postURL) => {
      chrome.tabs.create({url: postURL})
    }

    var newsText = {
      fontSize: "12px",
      height: "10px"

    }
    return(
      !this.state.posts ? <p>No new News </p> :
      this.state.posts.map(post =>
          <ListItem key={uuid()}
            onTouchTap={() => newsClicked(post.url)}
            primaryText={
              <span style={newsText}>{post.title}</span>
            }
            secondaryText={
              this.getTimeStamp(post.created_utc)
            }
            secondaryTextLines={2}/>
        ))
  }

  render(){

    var content = {
      height:"360px",
      overflow: "auto",
      padding: "0"
    }

    return(
      <List style={content}>
        {this.renderNews()}
        </List>
    )
  }
}

module.exports = NewsList
