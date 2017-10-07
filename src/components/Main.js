import React, {Component} from 'react';
import NewsList from 'NewsList';
import Divider from 'material-ui/Divider';

/*
* Root component responsible for rendering all components
*/

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
          <p style={header}>NBA News</p>
        </header>
        <Divider/>
        <NewsList/>
      </div>
    )
  }
}

module.exports = Main
