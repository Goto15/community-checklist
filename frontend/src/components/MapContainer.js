import React from 'react';
import MapSearch from './MapSearch';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
//import './MapContainer.css';
require('dotenv').config();

const userURL = 'http://localhost:4000/users/';
const api_key = process.env.REACT_APP_API_KEY;

class MapContainer extends React.Component {
  state = {
    //Map State
    center: {
      lat: 30.2672,
      lng: -97.7431,
    },
    //Marker and Info Window State
    activeMarker: {},
    libraries: ['places'],
  };

  componentDidMount = () => {
    this.fetchUserPlaces();
    this.setState({
      center: {
        lat: this.props.user.lat,
        lng: this.props.user.lng,
      },
    });
  };

  adjustMarkerIcon = () => {
    document.getElementsByClassName('markerTime');
  };

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
            height: '55vh',
            width: '99vw',
          }}
          zoom={14}
          center={this.state.center}
        >
          <MapSearch setSelectedPlace={this.props.setSelectedPlace} />
          {this.props.places
            ? this.props.places.map((p, index) => {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: p.lat,
                      lng: p.lng,
                    }}
                    title={p.name}
                    onClick={(event) => this.onMarkerClick(event, p)}
                  />
                );
              })
            : null}
          {this.props.friendsPlaces && this.props.social
            ? this.props.friendsPlaces.map((f) =>
                f.places.map((p, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: p.lat,
                        lng: p.lng,
                      }}
                      title={f.friend.full_name}
                      onClick={(event) => this.onMarkerClick(event, p)}
                    />
                  );
                })
              )
            : null}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapContainer;
