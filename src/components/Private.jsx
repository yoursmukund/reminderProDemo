import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class Private extends Component{
  constructor(props){
    super(props);
  }

  render(){

    return(<Route path={this.props.path} render={() => {
          if(this.props.fakeAuth.isAuthenticated){

          }else{
            return(

              <Redirect to={{pathname: '/login', state: { from: this.props.location }}}/>

            )
          }
        }}/>)
  }

}

export default Private;