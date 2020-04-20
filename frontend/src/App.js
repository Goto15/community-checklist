import React from 'react';
import { GoogleLogin } from 'react-google-login';
import logo from './logo.svg';
import './App.css';

const responseGoogle = (response) => {
  console.log(response);
};

function App() {

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <GoogleLogin
          clientId='1026021330056-2m3i4fp29f71cjv3cvledbnqdq4vh9el.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </header>
    </div>
  );
}

export default App;
