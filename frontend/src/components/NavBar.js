import React from 'react';
import Login from './Login';
import { AppBar, Toolbar, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogout } from 'react-google-login';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
    const logoStyle = {
      minWidth: '90%',
    }

    const basicBehavior = {
      color: '#ffffff',
      cursor: 'pointer'
    }

    return (
      <div className={this.classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <div style={logoStyle}>
              <Typography
                variant='h5'
                className={this.classes.title}
              >
                Community Checklist
              </Typography>
            </div>
            {this.props.loggedIn ? (
              /*
                props
                clientId={this.props.clientID}
                logoutUser={this.props.logoutUser}

                location change component possibly
              */
              <GoogleLogout
                clientId={this.props.clientID}
                buttonText='Log Out'
                onLogoutSuccess={this.props.logoutUser}
                render={(renderProps) => (
                  <Link
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={basicBehavior}
                  >
                    Logout
                  </Link>
                )}
              />
            ) : (
              <Login
                clientID={this.props.clientID}
                loginUser={this.props.loginUser}
                scope={this.state.scope}
                signUpUser={this.props.signUpUser}
              />
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
