import React from 'react';
import {
  Button,
  Card,
  Input,
  Link,
  Typography,
} from '@material-ui/core';

const userPlaceURL = 'http://localhost:4000/user_places/';

class SelectedPlace extends React.Component {
  state = {
    place: null,
  };

  componentDidMount = () => {
    this.setState({
      place: this.props.selectedPlace,
    });
  };

  addPlace = () => {
    let user = localStorage.getItem('User');
    let place = this.props.selectedPlace;
    let date = document.getElementById('visit-date').value;

    fetch(userPlaceURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_gid: user,
        place_gid: place.place_id,
        address: place.formatted_address,
        phone: place.formatted_phone_number,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name,
        website: place.website,
        visited: date,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        this.props.getUserPlaces(localStorage.getItem('User'));
      });
  };

  render() {
    const card = {
      maxWidth: '450px',
      margin: '5px',
      padding: '15px',
    };
    //TODO: Add place information before button

    return (
      <div>
        {this.props.selectedPlace ? (
          <Card style={card} variant='outlined'>
            {
              //Add og:image here in CardMedia
            }
            <Typography variant='h5' component='h2'>
              {this.props.selectedPlace.name}
            </Typography>
            <Typography
              gutterBottom
              variant='body2'
              color='textSecondary'
              component='h2'
            >
              {this.props.selectedPlace.address}
            </Typography>
            <Typography variant='subtitle1'>
              {this.props.selectedPlace.phone}
            </Typography>
            <Link 
              target="_blank"
              href={this.props.selectedPlace.website}
              variant='subtitle1'
            >
              Website
            </Link>
            <br />
            <Input 
              type="datetime-local"
            ></Input>
            <br />
            <Button onClick={this.addPlace}>Add Place</Button>
          </Card>
        ) : null}
      </div>
    );
  }
}

export default SelectedPlace;
