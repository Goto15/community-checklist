import React, { Fragment } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 3,
  },
}));

class NavBar extends React.Component {
  classes = useStyles;

  constructor() {
    super();
    this.state = {
      scope: 'openid profile email',
    };
  }

  render() {
    return (
      <AppBar position='static'>
        <Toolbar >
          <Typography variant='h5' syle={{width: '60%'}} className={this.classes.title}>
            Community Checklist
          </Typography>
          {
            //<Search/>
          }
          {
            //TODO: Set default value to current address
          }
          {/*
            <TextField
              id='location-change'
              placeholder='Change your location'
              onKeyPress={this.getValue}
            />
            */}
            <div syle={{width: '40%'}} >
                {this.props.loggedIn ? (
                <GoogleLogout syle={{float:"right"}}
                  clientId={this.props.clientID}
                  buttonText='Log Out'
                  onLogoutSuccess={this.props.logoutUser}
                  theme={'dark'}
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      variant='outlined'
                    >
                      Logout
                    </Button>
                  )}
                />
              ) : (
                <Fragment>
                  <GoogleLogin syle={{float:"right"}}
                    clientId={this.props.clientID}
                    onSuccess={this.props.loginUser}
                    onFailure={this.props.loginUser}
                    cookiePolicy={'single_host_origin'}
                    scope={this.state.scope}
                    render={(renderProps) => (
                      <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        variant='outlined'
                      >
                        Login
                      </Button>
                    )}
                  />
                  <GoogleLogin syle={{float:"right"}}
                    clientId={this.props.clientID}
                    onSuccess={this.props.signUpUser}
                    onFailure={this.props.signUpUser}
                    cookiePolicy={'single_host_origin'}
                    scope={this.state.scope}
                    render={(renderProps) => (
                      <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        variant='outlined'
                      >
                        SignUp
                      </Button>
                    )}
                  />
                </Fragment>
              )}
            </div>
          
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
