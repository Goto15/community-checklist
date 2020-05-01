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

  //TODO: Add city/neighborhood
  addPlace = () => {
    let user = localStorage.getItem('User');
    let date = document.getElementById('visit-date').value;

    fetch(userPlaceURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_gid: user,
        place_gid: this.state.place.gid,
        address: this.state.place.address,
        phone: this.state.place.phone,
        lat: this.state.place.lat,
        lng: this.state.place.lng,
        name: this.state.place.name,
        website: this.state.place.website,
        visited: date,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        this.props.getUserPlaces(localStorage.getItem('User'));
        this.props.setSelectedPlace(null)
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
              id='visit-date'
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
