import React from 'react';
import { Button, Popover, Typography } from '@material-ui/core';

const friendsURL = 'http://localhost:4000/friends/';

class FriendInfo extends React.Component {
  state = {
    anchorEl: null,
  };

  makeFriends = () => {
    let friendship = {
      friend_one: localStorage.getItem('User'),
      friend_two: this.props.user.gid,
    };

    fetch(friendsURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friend: friendship,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          anchorEl: document.getElementById(
            'add-friend' + this.props.user.full_name
          ),
        });
        this.props.resetSearchResults();
      });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const container = {
      float: 'left',
      height: '270px',
      margin: '25px',
      textAlign: 'center',
      width: '150px',
    };

    const image = {
      borderRadius: '50%',
      height: '128px',
      width: '128px',
    };

    const name = {
      color: '#232323',
      marginBottom: '10px',
    };

    return (
      <div style={container} onClick={this.selectFriend}>
        <img
          alt={this.props.user.full_name}
          src={this.props.user.img}
          style={image}
          title={this.props.user.full_name}
        />
        <Typography style={name} variant='h6'>
          {this.props.user.full_name}
        </Typography>
        <Button
          id={'add-friend' + this.props.user.full_name}
          color='primary'
          onClick={this.makeFriends}
          variant='contained'
        >
          Add Friend
        </Button>
        <Popover
          id={id}
          open={open}
          onClose={this.handleClose}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          You're now friends with {this.props.user.full_name}!
        </Popover>
      </div>
    );
  }
}

export default FriendInfo;
