import React, { Fragment } from 'react';
import NavBar from './components/NavBar';
import MapContainer from './components/MapContainer';
import SelectedPlace from './components/SelectedPlace';
import PlaceInfo from './components/PlaceInfo';
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
      selectedPlace: null
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
            user: {
              gid: json.gid,
              first_name: json.first_name,
              last_name: json.last_name,
              img: json.img,
              email: json.email,
            },
          });
        } else {
          console.log("You haven't signed up yet.");
        }
      });
      this.getUserPlaces(gid);
  };

  getLocalStorage = () => {
    this.fetchUserInfo(localStorage.getItem('User'));
  };

  getUserPlaces = (gid) => {
    fetch(userURL + gid + '/places', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(places => {
        if (places != null){
          this.setState({
            places
          })
        } else {
          console.log('Error getting places.')
        }
      })
  }

  loginUser = (response) => {
    if (response) {
      let currentUser = response.getBasicProfile();
      this.fetchUserInfo(currentUser.getId());
    } else {
      //TODO: Throw error handling here for nonexistant users.
      console.log('No response.');
    }
  };

  logoutUser = () => {
    this.setState({ user: null });
    localStorage.removeItem('User');
  };

  setSelectedPlace = (place) => {
    this.setState({
      selectedPlace: place
    })
  }

  //TODO: Needs more robust error handling
  //TODO: bug where sign in doesn't automatically log user in
  signUpUser = (response) => {
    if (response) {
      response = response.getBasicProfile()
      let newUser = {
          gid: response.getId(),
          first_name: response.getGivenName(),
          last_name: response.getFamilyName(),
          img: response.getImageUrl(),
          email: response.getEmail(),
      }
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
          if (user) {
            this.setState({
              user: newUser
            });
          } else {
            console.log('Unable to create new user.');
          }
        });
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
    const clientID = process.env.REACT_APP_CLIENT_ID

    return (
      <div className='App'>
        {this.state.user ? localStorage.setItem('User', this.state.user.gid) : null}
        <header className='App-header'>
          <NavBar
            clientID={clientID}
            loginUser={this.loginUser}
            signUpUser={this.signUpUser}
            logoutUser={this.logoutUser}
            loggedIn={this.state.user != null}
          />
        </header>
        {this.state.user ? (
          <Fragment>
            <MapContainer 
              style={style}
              user={this.state.user}
              setSelectedPlace={this.setSelectedPlace}
            />
            {this.state.selectedPlace ? (
              <SelectedPlace selectedPlace={this.state.selectedPlace}/> 
              ) : null}
            {this.state.places ? (
              //TODO: Add count and visit date to Place
              this.state.places.map((place, index) => <PlaceInfo key={index} place={place} />)
            ) : null}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

export default App;
