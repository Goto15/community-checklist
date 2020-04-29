import React from 'react';
import TextField from '@material-ui/core/TextField';

const geocodingURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const API_Key = '&key=' + process.env.REACT_APP_API_KEY;

class UserLocation extends React.Component{

  getValue = (event) => {
    if (event.key === 'Enter') {
      let address = event.target.value.split(' ').join('+');
      console.log(geocodingURL + address + API_Key);
      fetch(geocodingURL + address + API_Key, {})
        .then((resp) => resp.json())
        .then((json) => {
            json.results.forEach(element => {
              console.log('Address: ' + element.formatted_address);
              console.log('Lat: ' + element.geometry.location.lat);
              console.log('Lat: ' + element.geometry.location.lng);
            })
          }
        )
    }
  };

  render(){
    return(
      <div>
        <TextField
          id='location-change'
          placeholder='Set Your Location...'
          onKeyPress={this.getValue}
        />
      </div>
    )
  }
}

export default UserLocation;