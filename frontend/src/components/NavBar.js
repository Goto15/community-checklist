import React from 'react';
import Login from './Login';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountSettings from './AccountSettings';

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
              <div>
              {/*
                <Link>Social</Link>
              */}
                <AccountSettings
                  clientId={this.props.clientID}
                  logoutUser={this.props.logoutUser}
                />
              </div>
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
