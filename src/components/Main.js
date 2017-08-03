import React, {Component} from 'react';
import NewsList from 'NewsList';
import Divider from 'material-ui/Divider';

export class Main extends Component{
  render(){
    var header = {
      fontFamily: "Chewy",
      textAlign: "center",
      fontSize: "30px",
      overflow: "hidden",
      margin: "0"
    }

    return(
      <div>
      <header>
        <h1 style={header}>NBA News</h1>
      </header>
        <Divider/>
        <NewsList/>
      </div>
    )
  }
}

module.exports = Main
