import React from 'react';
import { Button, Typography } from '@material-ui/core';

const friendsURL = 'http://localhost:4000/friends/';

class FriendInfo extends React.Component {
  makeFriends = () => {
    let friendship = {
      friend_one: localStorage.getItem('User'),
      friend_two: this.props.user.gid,
    }

    fetch(friendsURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friend: friendship
      }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json));
  };

  render() {
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
          src={this.props.user.img}
          style={image}
          title={this.props.user.full_name}
        />
        {console.log(this.props.user.gid)}
        <Typography style={name} variant='h6'>
          {this.props.user.full_name}
        </Typography>
        <Button color='primary' onClick={this.makeFriends} variant='contained'>
          Add Friend
        </Button>
      </div>
    );
  }
}

export default FriendInfo;
