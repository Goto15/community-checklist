import React, { Fragment } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      scope: 'openid profile email',
    };
  }

  render() {
    return (
      <AppBar>
        <Toolbar>
          {
            //<Search/>
          }
          {
            //TODO: Set default value to current address
          }
          {
            /*
            <TextField
              id='location-change'
              placeholder='Change your location'
              onKeyPress={this.getValue}
            />
            */
          }
          {this.props.loggedIn ? (
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
                onSuccess={this.props.loginUser}
                onFailure={this.props.loginUser}
                cookiePolicy={'single_host_origin'}
                scope={this.state.scope}
                render={renderProps => (
                  <Button 
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    variant="outlined"
                  >
                    Login
                  </Button>
                )}
              />
              <GoogleLogin
                clientId={this.props.clientID}
                onSuccess={this.props.signUpUser}
                onFailure={this.props.signUpUser}
                cookiePolicy={'single_host_origin'}
                scope={this.state.scope}
                render={renderProps => (
                  <Button 
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    variant="outlined"
                  >
                    SignUp
                  </Button>
                )}
              />
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
