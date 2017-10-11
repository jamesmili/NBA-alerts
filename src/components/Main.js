import React, {Component} from 'react';
import NewsList from 'NewsList';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import logo from '../img/nba.png';

//ignores the variable chrome when compiling
declare var chrome: any;

/*
* Root component responsible for rendering all components
*/

export class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      enable: false
    }
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  togglePopUp(event, isInputChecked){
    this.setState({enable: !isInputChecked})
    console.log(isInputChecked)
    console.log(this.state.enable)
    console.log("///////")
  }
  render(){

  const styles = {
    header: {
      fontFamily: "Chewy",
      textAlign: "center",
      fontSize: "30px",
      overflow: "hidden",
      margin: "0"
    },
    footer:{
      height:"10px"
    },
    toggle: {
      fontSize: "15px",
      maxWidth: 100
    }
  }

    return(
      <div>
        <header>
          <p style={styles.header}>NBA News</p>
        </header>
        <Divider/>
        <NewsList/>
        <Divider/>
        <footer style={styles.footer}>
          <Checkbox label="Notifications"
          defaultChecked={true}
          style={styles.toggle}
          onCheck={this.togglePopUp}
          />
        </footer>
      </div>
    )
  }
}

module.exports = Main
