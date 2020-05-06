import React from 'react';
import { Link, Popover, Typography } from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';

class AccountSettings extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const basicBehavior = {
      cursor: 'pointer',
    };

    const popTopStyle = {
      paddingLeft: '15px',
      paddingRight: '15px',
      paddingTop: '15px',
    };

    const popBotStyle = {
      paddingBottom: '15px',
      textAlign: 'center',
    };

    const image = {
      border: '3px solid #ffffff',
      borderRadius: '50%',
      height: '36px',
      marginLeft: '10px',
      width: '36px',
    };

    const open = this.state.anchorEl;
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        {this.props.user.img ? (
          <img alt="User Settings" src={this.props.user.img} style={image} onClick={this.handleClick} />
        ) : null}
        { 
          //<AccountCircleSharp style={{ fontSize: 35 }} onClick={this.handleClick} />
        }
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
          <Typography style={popTopStyle}>Account Settings</Typography>
          <hr />
          <div style={popBotStyle}>
            <GoogleLogout
              clientId={this.props.clientID}
              buttonText='Log Out'
              onLogoutSuccess={this.props.logoutUser}
              render={(renderProps) => (
                <Link
                  color='primary'
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
