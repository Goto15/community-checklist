import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';

const geocodingURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const API_Key = '&key=' + process.env.REACT_APP_API_KEY;

class UserLocation extends React.Component{

  getValue = (event) => {
    if (event.key === 'Enter') {
      let address = event.target.value.split(' ').join('+');
      fetch(geocodingURL + address + API_Key, {})
        .then((resp) => resp.json())
        .then((json) => {
          if(json != null){
              let zip = null;
              json.results[0].address_components.forEach(component => {
                if(component.types[0] === 'postal_code'){
                  zip = component.long_name
                }
              })
              this.props.setUser({
                ...this.props.user,
                lat: json.results[0].geometry.location.lat,
                lng: json.results[0].geometry.location.lng,
                zip: zip
              })
            }
        })
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