import React from 'react';
import { TextField, Button } from '@material-ui/core';

class Friends extends React.Component {

  findFriend = () => {
    
  }

  submitFriend = (event) => {
    if (event.key === 'Enter') {
      console.log('OOOOOPSIES DOOPSIE: ' + event.target.value);
    }
  };

  render() {
    const searchBox = {
      display: 'flex',
      margin: '0 auto',
      paddingTop: '20px',
      textAlign: 'center',
      width: '70%',
    };

    const search = {
      marginRight: '15px',
      width: '100%',
    };

    return (
      <div style={searchBox}>
        <TextField
          label='Find friends...'
          onChange={this.findFriend}
          onKeyPress={this.submitFriend}
          type='text'
          style={search}
        ></TextField>
        <Button color='primary' onClick={this.submitFriend} variant='contained'>
          Search
        </Button>
      </div>
    );
  }
}

export default Friends;
