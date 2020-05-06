import React from 'react';
import { Fragment } from 'react';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import MapContainer from './components/MapContainer';
import SelectedPlace from './components/SelectedPlace';
import PlaceInfo from './components/PlaceInfo';
import UserLocation from './components/UserLocation';
import './App.css';
import Friends from './components/Friends';
require('dotenv').config();

const userURL = 'http://localhost:4000/users/';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: null,
      friendsPlaces: null,
      user: null,
      places: null,
      scope: 'openid profile email',
      selectedPlace: null,
      social: false,
    };
  }

  componentDidMount = () => {
    this.checkForUser();
    this.setFriendsPlaces();
  };

  /* User persistence and handle local storage information */
  checkForUser = () => {
    let loggedUserId = localStorage.getItem('User');
    if (loggedUserId) {
      this.fetchUserInfo(loggedUserId);
      this.getUserPlaces(loggedUserId);
    }
  };

  fetchUserInfo = (gid) => {
    fetch(userURL + gid, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user != null) {
          this.setState({ user });
        } else {
          console.log("You haven't signed up yet.");
        }
      });
  };

  getUserPlaces = (gid) => {
    fetch(userURL + gid + '/places', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((places) => {
        if (places != null) {
          this.setState({
            places,
          });
        } else {
          console.log('Error getting places.');
        }
      });
  };

  loginUser = (response) => {
    let user = this.parseUserInfo(response);
    if (user) {
      this.fetchUserInfo(user.gid);
      this.getUserPlaces(user.gid);
    } else {
      //TODO: Throw error handling here for nonexistant users.
      console.log('No response.');
    }
  };

  logoutUser = () => {
    console.log('Logging out');
    this.setState({
      user: null,
      selectedPlace: null,
      social: null,
      places: null,
      friends: null,
      friendsPlaces: null,
    });
    localStorage.removeItem('User');
  };

  //Takes a Google response and returns User info.
  parseUserInfo = (response) => {
    let userInfo = null;

    if (response) {
      let basicProfile = response.getBasicProfile();
      userInfo = {
        gid: basicProfile.getId(),
        first_name: basicProfile.getGivenName(),
        last_name: basicProfile.getFamilyName(),
        img: basicProfile.getImageUrl(),
        email: basicProfile.getEmail(),
      };
    }

    return userInfo;
  };

  setFriendsPlaces = () => {
    let user = localStorage.getItem('User');
    fetch(userURL + user + '/friendplaces', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((places) => {
        this.setState({
          friendsPlaces: places,
        });
      });
  };

  setSelectedPlace = (place) => {
    this.setState({
      selectedPlace: place,
    });
  };

  closeSelectedPlace = () => {
    this.setState({
      selectedPlace: null,
    });
  };

  setSocial = () => {
    this.setState({
      places: null,
      selectedPlace: null,
      social: true,
    });
  };

  unsetSocial = () => {
    this.setState({
      social: false,
    });

    this.getUserPlaces(this.state.user.gid);
  };

  setUser = (user) => {
    this.setState({ user });
    fetch(userURL + user.gid, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: user.lat,
        lng: user.lng,
        zip: user.zip,
      }),
    });
  };

  //TODO: Needs more robust error handling
  signUpUser = (response) => {
    let user = this.parseUserInfo(response);
    if (user) {
      fetch(userURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      })
        .then((resp) => resp.json())
        .then((user) => {
          if (user) {
            this.setState({
              user,
            });
          } else {
            console.log('Unable to create new user.');
          }
        });
      this.fetchUserInfo(user.gid);
    } else {
      //TODO: throw errors for handling existing users.
      console.log('No response.');
    }
  };

  render() {
    const style = {
      height: '50vh',
      width: '100vw',
    };

    const visitedGrid = {
      marginLeft: '2%',
      width: '100vw',
    };

    const clientID = process.env.REACT_APP_CLIENT_ID;

    return (
      <div>
        {this.state.user ? localStorage.setItem('User', this.state.user.gid) : null}
        <NavBar
          clientID={clientID}
          loginUser={this.loginUser}
          signUpUser={this.signUpUser}
          logoutUser={this.logoutUser}
          loggedIn={this.state.user != null}
          setSocial={this.setSocial}
          social={this.state.social}
          unsetSocial={this.unsetSocial}
          user={this.state.user}
        />
        <div className='content'>
          {this.state.user === null ? <Landing /> : null}
          {this.state.user && this.state.user.lat === null ? (
            //TODO: List out possibilities
            <UserLocation user={this.state.user} setUser={this.setUser} />
          ) : (
            <div>
              {this.state.user ? (
                <MapContainer
                  style={style}
                  user={this.state.user}
                  setSelectedPlace={this.setSelectedPlace}
                  places={this.state.places}
                  friendsPlaces={this.state.friendsPlaces}
                  social={this.state.social}
                />
              ) : null}
              {this.state.selectedPlace != null ? (
                <SelectedPlace
                  closeSelectedPlace={this.closeSelectedPlace}
                  selectedPlace={this.state.selectedPlace}
                  getUserPlaces={this.getUserPlaces}
                  parseUserInfo={this.parseUserInfo}
                  setSelectedPlace={this.setSelectedPlace}
                />
              ) : null}
              {
                //TODO: Add count to Place
                this.state.user && this.state.places ? (
                  <Fragment>
                    <div style={{ textAlign: 'center' }}>
                      <h2>Visited</h2>
                    </div>
                    <div className='visited-cards' style={visitedGrid}>
                      {this.state.places
                        .map((place, index) => (
                          <PlaceInfo
                            key={index}
                            place={place}
                            refreshPlaces={this.getUserPlaces}
                            usergid={this.state.user.gid}
                          />
                        ))
                        .reverse()}
                    </div>
                  </Fragment>
                ) : null
              }
              {this.state.social ? <Friends></Friends> : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
