import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
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

  //TODO: add search selection and option to add to places
  //TODO: cull correct fields to pass to setSelectedPlace
  getPlace = () => {
    this.props.setSelectedPlace(this.searchBox.getPlaces()[0]);
  };

  searchLoaded = (ref) => {
    this.searchBox = ref;
  };

  render() {
    let inputStyle = {
      boxSizing: `border-box`,
      border: `1px solid transparent`,
      width: `50%`,
      height: `32px`,
      padding: `0 12px`,
      borderRadius: `3px`,
      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
      fontSize: `14px`,
      outline: `none`,
      textOverflow: `ellipses`,
      position: 'absolute',
      left: '25%',
      top: '1%',
    };

    const api_key = process.env.REACT_APP_API_KEY;

    return (
      <LoadScript
        id='script-loader'
        googleMapsApiKey={api_key}
        libraries={this.state.libraries}
      >
        <StandaloneSearchBox
          onLoad={this.searchLoaded}
          onPlacesChanged={this.getPlace}
          // bounds={[500]}
        >
          <input
            type='text'
            placeholder='Search places near you...'
            style={inputStyle}
          />
        </StandaloneSearchBox>
        <GoogleMap
          id='example-map'
          mapContainerStyle={{
            height: '50vh',
            width: '100vw',
          }}
          zoom={14}
          center={this.state.center}
        >
          {
            //TODO: Only create markers for unique entries
          }
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
