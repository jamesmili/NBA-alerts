import React, {Component} from 'react';
import NewsList from 'NewsList';
import Divider from '@material-ui/core/Divider';

/*
* Root component responsible for rendering all components
*/

export class Main extends Component{
  constructor(props){
    super(props);
  }
  render(){

  const styles = {
    header: {
      fontFamily: "Chewy",
      textAlign: "center",
      fontSize: "30px",
      margin: "0"
    }
  }

    return(
      <div>
        <header>
          <p style={styles.header}>NBA News</p>
        </header>
        <Divider/>
        <NewsList/>
      </div>
    )
  }
}

export default Main;
