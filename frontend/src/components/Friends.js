import React, { Fragment } from 'react';
import FriendInfo from './FriendInfo';
import { TextField, Button } from '@material-ui/core';

const findFriends = 'http://localhost:4000/search/users/';

class Friends extends React.Component {
  state = {
    searchResults: null,
  };

  findFriend = (event) => {
    fetch(findFriends + event.target.value, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          searchResults: json,
        });
      });
  };

  render() {
    const searchBox = {
      display: 'flex',
      margin: '0 auto',
      paddingBottom: '35px',
      paddingTop: '20px',
      textAlign: 'center',
      width: '70%',
    };

    const search = {
      marginRight: '15px',
      width: '100%',
    };

    const profiles = {
      margin: '0 auto',
      width: '80%',
    };

    return (
      <Fragment>
        <div style={searchBox}>
          <TextField
            label='Find friends...'
            onChange={this.findFriend}
            type='text'
            style={search}
          />
        </div>
        <div style={profiles}>
          {this.state.searchResults
            ? this.state.searchResults.map((user, index) => {
                return <FriendInfo user={user} key={index} />;
              })
            : null}
        </div>
      </Fragment>
    );
  }
}

export default Friends;
