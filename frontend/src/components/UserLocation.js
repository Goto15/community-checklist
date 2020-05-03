import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';

const geocodingURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const API_Key = '&key=' + process.env.REACT_APP_API_KEY;

class UserLocation extends React.Component{

  getValue = (event) => {
    if (event.key === 'Enter' || event.nativeEvent.type === 'click') {
      let address = document.getElementById('location-change').value;
      fetch(geocodingURL + address + API_Key, {})
        .then((resp) => resp.json())
        .then((json) => {
          if(json != null){
              let zip = null;
              console.log(json)
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

    const style = {
      marginTop: '10%',
      textAlign: 'center'
    }

    const addressStyle = {
      marginBottom: '50px'
    }

    const inputStyle = {
      marginBottom: '25px',
      width: '66%'
    }

    const button = {
      width: '44%'
    }

    return(
      <div style={style}>
        <Typography 
          variant="h1"
          style={addressStyle}>
          Input Your Address
        </Typography>
        <TextField
          id='location-change'
          placeholder='Set Your Location...'
          onKeyPress={this.getValue}
          style={inputStyle}
        />
        <br/>
        <Button 
          color="primary" 
          id="add-submit-btn"
          onClick={this.getValue}
          style={button} 
          variant="contained">
          Submit
        </Button>
      </div>
    )
  }
}

export default UserLocation;