import React from 'react';
import {
  Button,
  Card,
  Link,
  TextField,
  Typography,
  CardActionArea,
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
    let notes = document.getElementById('notes').value;

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
        notes: notes,
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
      margin: '0 auto',
      marginTop: '18px',
      minWidth: '60%',
      padding: '15px',
      width: '50%'
    };

    const leftSide = {
      display: 'grid',
      float: 'left',
      maxWidth: '50%'
    }

    const rightSide = {
      display: 'grid',
      float: 'right'
    }

    const spacing = {
      marginBottom: '15px'
    }
    //TODO: Add place information before button

    let currentTime = new Date().toLocaleString();

    return (
      <div>
        {this.props.selectedPlace ? (
          <Card style={card} variant='outlined'>
            {
              //Add og:image here in CardMedia
            }
            <div style={leftSide}>
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
              <CardActionArea>
                <Link 
                  target="_blank"
                  href={this.props.selectedPlace.website}
                  variant='subtitle1'
                >
                  Website
                </Link>
              </CardActionArea>
            </div>
            <div style={rightSide}>
              <TextField 
                id='visit-date'
                style={spacing}
                type="datetime-local"
                defaultValue={currentTime}
              ></TextField>
              <TextField
                id="notes"
                label="Notes"
                multiline
                rows={4}
                style={spacing}
                variant="outlined"
              />
              <Button 
                color="primary" 
                onClick={this.addPlace} 
                variant="contained"
              >
                Add Place
              </Button>
            </div>
          </Card>
        ) : null}
      </div>
    );
  }
}

export default SelectedPlace;
