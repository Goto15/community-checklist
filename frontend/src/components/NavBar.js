import React, {Fragment} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import Search from './Search'

class NavBar extends React.Component{
  constructor(){
    super();
    this.state = {
      scope: 'openid profile email'
    }
  }

  render(){
    return(
      <Fragment>
        {
          //<Search/>
        }
        {this.props.loggedIn? (
          <GoogleLogout
            clientId={this.props.clientID}
            buttonText='Log Out'
            onLogoutSuccess={this.props.logoutUser}
            theme={'dark'}
          />
        ) : (
          <Fragment>
            <GoogleLogin
              clientId={this.props.clientID}
              buttonText='Login'
              onSuccess={this.props.loginUser}
              onFailure={this.props.loginUser}
              cookiePolicy={'single_host_origin'}
              scope={this.state.scope}
              theme={'dark'}
            />
            <GoogleLogin
              clientId={this.props.clientID}
              buttonText='Sign Up'
              onSuccess={this.props.signUpUser}
              onFailure={this.props.signUpUser}
              cookiePolicy={'single_host_origin'}
              scope={this.state.scope}
              theme={'dark'}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default NavBar