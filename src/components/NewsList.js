import React, {Component} from 'react';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import uuid from 'node-uuid';
import News from 'News';
import IconButton from 'material-ui/IconButton';
import AutoRenew from 'material-ui/svg-icons/action/autorenew';
import Divider from 'material-ui/Divider';
import RefreshIndicator from 'material-ui/RefreshIndicator';

var api = require('Api');

export class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      posts: null
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


  render(){
    const styles = {
      content:{
        height: "330px",
        overflow: "auto",
        padding: "0px"
      },
      button:{
        height: "40px",
        width: "40px",
        padding: "10px"
      },
      icon:{
        height: "20px",
        width: "20px"
      }
    }
    return(
      <div>
        <div style={styles.content}>
          {!this.state.posts
          ? <RefreshIndicator size={50} left={165} top={165} loadingColor="#8A8A8A" status="loading" style={styles.refresh}/>
          : <List>{this.renderNews()}</List>
          }
        </div>
        <Divider/>
        <IconButton iconStyle={styles.icon} style={styles.button} onClick={() => {this.updateData()}}>
          <AutoRenew/>
        </IconButton>
      </div>
    )
  }
}

module.exports = NewsList
