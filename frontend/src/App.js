import React from 'react';
import NavBar from './components/NavBar';
import MapContainer from './components/MapContainer';
import SelectedPlace from './components/SelectedPlace';
import PlaceInfo from './components/PlaceInfo';
import UserLocation from './components/UserLocation';
import './App.css';
require('dotenv').config();

const userURL = 'http://localhost:4000/users/';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      places: null,
      scope: 'openid profile email',
      selectedPlace: null,
    };
  }

  componentDidMount = () => {
    this.checkForUser();
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
      .then((json) => {
        if (json != null) {
          this.setState({
            user: json
          });
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
    } else {
      //TODO: Throw error handling here for nonexistant users.
      console.log('No response.');
    }
  };

  logoutUser = () => {
    this.setState({ user: null });
    localStorage.removeItem('User');
  };

  //Takes a Google response and returns User info.
  parseUserInfo = (response) => {
    let userInfo = null;

    if (response) {
      let basicProfile = response.getBasicProfile();
      console.log(basicProfile)
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

  setSelectedPlace = (place) => {
    this.setState({
      selectedPlace: place,
    });
  };

  //TODO: Needs more robust error handling
  //TODO: Add some welcome screen and set user location
  signUpUser = (response) => {
    let newUser = this.parseUserInfo(response);
    if (newUser) {
      fetch(userURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gid: newUser.gid,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          img: newUser.img,
          email: newUser.email,
        }),
      })
        .then((resp) => resp.json())
        .then((user) => {
          console.log(user);
          if (user) {
            this.setState({
              user: newUser,
            });
          } else {
            console.log('Unable to create new user.');
          }
        });
      this.setState({ newUser: true });
      this.fetchUserInfo(newUser.gid);
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
        />
        <div className='content'>
          {(this.state.user && (this.state.user.lat === null)) ? (
              <UserLocation
                user={this.state.user}
              /> 
          ) : (
            <div>
              {this.state.user ? (
                <MapContainer
                  style={style}
                  user={this.state.user}
                  setSelectedPlace={this.setSelectedPlace}
                />
              ) : null}
              {this.state.selectedPlace != null? (
                <SelectedPlace
                  selectedPlace={this.state.selectedPlace}
                  getUserPlaces={this.getUserPlaces}
                  parseUserInfo={this.parseUserInfo}
                />
              ) : null}
              { //TODO: Add count and visit date to Place
                this.state.user && this.state.places ? 
                  (this.state.places.map((place, index) => (
                    <PlaceInfo key={index} place={place} />
                  ))): null
              } 
            </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
