import React, {Component} from 'react';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import uuid from 'node-uuid';
import News from 'News';

var api = require('Api');

export class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      posts: []
    }
    this.updateData = this.updateData.bind(this);
    this.renderNews = this.renderNews.bind(this);
  }

  /**
   * Configures state before rendering
   */

  componentWillMount(){
    this.updateData();
  }

/**
* get data from api and place data in current state
*/

  updateData(){
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
