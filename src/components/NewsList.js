/*global chrome*/
import React, {Component} from 'react';
import {v1 as uuid} from 'uuid';
import News from 'News';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
var api = require('Api');

export class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      posts: null,
      notification: true
    }
    this.updateData = this.updateData.bind(this);
    this.renderNews = this.renderNews.bind(this);
    this.handleNotification = this.handleNotification.bind(this)
  }

/**
* Configures state before rendering
*/

  componentWillMount(){

    this.updateData();
    chrome.storage.local.get('notification', (data) => {
      if (data.hasOwnProperty('notification')) {
        this.setState({ notification: data.notification })
      }
      else{
        this.setState({ notification: true})
      }
    });
  }

/**
* get data from api and place data in current state
*/

  updateData(){
    this.setState({posts: null})
    api.getTweets().then((data) => {
      this.setState({posts: data})
    });
  }

/**
* Creates the list of news to be rendered
*
* @return ListItem element that contains the news
*/

  renderNews(){

    return(
      !this.state.posts ? <p>No new News </p> :
      this.state.posts.map(posts => <News key={uuid()} posts={posts}/>))
  }

  handleNotification(event){
    this.setState({
      notification: event.target.checked
    }, () =>{
      chrome.storage.local.set({ 'notification': event.target.checked}, function () {
        var enabled = event.target.checked ? 'enabled' : 'disabled'
        console.log("Notification " + enabled);
      });
    })
  }

  render(){
    return(
      <div>
        <div className="content">
          {!this.state.posts
          ? <div className="loading"><CircularProgress size={50} color="#8A8A8A"/></div>
          : <List>{this.renderNews()}</List>
          }
        </div>
        <Divider/>
        <div className="footer">
          <IconButton onClick={() => {this.updateData()}}>
            <AutorenewIcon/>
          </IconButton>
          <FormControlLabel control={
            <Switch
            checked={this.state.notification}
            onChange={this.handleNotification}
            color='primary'/>
          } label="Notification" />
        </div>
      </div>
    )
  }
}

export default NewsList
