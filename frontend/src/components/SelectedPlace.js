import React, { Fragment } from 'react';

const userPlaceURL = 'http://localhost:4000/user_places/';

class SelectedPlace extends React.Component {
  state = {
    place: null
  };

  componentDidMount = () => {
    this.setState({
      place: this.props.selectedPlace,
    });
  };

  addPlace = () => {
    let user = localStorage.getItem('User');
    let place = this.props.selectedPlace;

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
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        this.props.getUserPlaces(localStorage.getItem('User'));
      });
  };

  render() {
    return (
      <div>
      {this.state.place ? (
        <Fragment>
          Name: {this.state.place.name}
          {console.log(this.state.place)}
          <button onClick={this.addPlace}>Add Place</button>
        </Fragment>
      ) : null}
        {
          //TODO: Add place information before button
          //TODO: update map with new places
        }
        
      </div>
    );
  }
}

export default SelectedPlace;
