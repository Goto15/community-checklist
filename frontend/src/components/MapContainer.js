import React from 'react';
import MapSearch from './MapSearch';
import {
  GoogleMap,
  LoadScript,
  Marker,
  // StandaloneSearchBox,
} from '@react-google-maps/api';
require('dotenv').config();

const userURL = 'http://localhost:4000/users/';

class MapContainer extends React.Component {
  state = {
    //Map State
    //TODO:Pull from User location
    center: {
      lat: 30.2672,
      lng: -97.7431,
    },
    places: [],
    //Marker and Info Window State
    activeMarker: {},
    libraries: ['places'],
  };

  componentDidMount = () => {
    this.fetchUserPlaces();
  };

  //TODO: expose this to parent
  fetchUserPlaces = () => {
    fetch(userURL + this.props.user.gid + '/places', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((places) => {
        this.setState({ places });
      });
  };

  onMarkerClick = (marker, place) => {
    this.props.setSelectedPlace(place);
    this.setState({
      activeMarker: marker,
    });
  };

  render() {
    const api_key = process.env.REACT_APP_API_KEY;

    //TODO: Only create markers for unique entries
    return (
      <LoadScript
        id='script-loader'
        googleMapsApiKey={api_key}
        libraries={this.state.libraries}
      >
        <GoogleMap
          id='example-map'
          mapContainerStyle={{
            height: '50vh',
            width: '100vw',
          }}
          zoom={14}
          center={this.state.center}
        >
          <MapSearch 
            setSelectedPlace={this.props.setSelectedPlace}
          />
          {this.state.places.map((p, index) => {
            return (
              <Marker
                key={index}
                position={{
                  lat: p.lat,
                  lng: p.lng,
                }}
                onClick={(event) => this.onMarkerClick(event, p)}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapContainer;
