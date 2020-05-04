import React from 'react';
import { Link, Popover, Typography } from '@material-ui/core';
import { AccountCircleSharp } from '@material-ui/icons';
import { GoogleLogout } from 'react-google-login';

class AccountSettings extends React.Component {
  
  state = {
    anchorEl: null
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }
  
  render() {
    const basicBehavior = {
      cursor: 'pointer',
    };

    const popTopStyle = {
      paddingLeft: '15px',
      paddingRight: '15px',
      paddingTop: '15px'
    }

    const popBotStyle = {
      paddingBottom: '15px',
      textAlign: 'center'
    }

    const open = this.state.anchorEl;
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        <AccountCircleSharp 
          style={{fontSize: 35}}
          onClick={this.handleClick}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography style={popTopStyle}>
            Account Settings
          </Typography>
          <hr/>
          <div style={popBotStyle}>
            <GoogleLogout
              clientId={this.props.clientID}
              buttonText='Log Out'
              onLogoutSuccess={this.props.logoutUser}
              render={(renderProps) => (
                <Link
                  color="primary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={basicBehavior}
                >
                  Logout
                </Link>
              )}
            />
          </div>
        </Popover>
      </div>
    );
  }
}

export default AccountSettings;
