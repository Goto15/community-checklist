import React from 'react';
import { Button, Card, CardMedia, Typography } from '@material-ui/core';

class FriendInfo extends React.Component {
  render() {
    const container = {
      textAlign: 'center',
      width: '200px'
    }
    const image = {
      borderRadius: '50%',
      height: '128px',
      width: '128px',
    };

    const name = {
      color: '#232323',
    };
    return (
      <div style={container}>
        <img
          src={this.props.user.img}
          style={image}
          title={this.props.user.full_name}
        />
        <Typography style={name} variant='h5'>
          {this.props.user.full_name}
        </Typography>
      </div>
    );
  }
}

export default FriendInfo;
