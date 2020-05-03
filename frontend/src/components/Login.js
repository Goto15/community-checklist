import React from 'react';
import { Link } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';

class Login extends React.Component {
  render() {
    const linkPadding = {
      paddingRight: '20px',
      color: '#ffffff',
      cursor: 'pointer'
    }
    const basicBehavior = {
      color: '#ffffff',
      cursor: 'pointer'
    }
    return (
      <div style={{ display: 'contents' }}>
        <GoogleLogin
          clientId={this.props.clientID}
          onSuccess={this.props.loginUser}
          onFailure={this.props.loginUser}
          cookiePolicy={'single_host_origin'}
          scope={this.props.scope}
          render={(renderProps) => (
            <Link
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={linkPadding}
            >
              Login
            </Link>
          )}
        />
        <br/>
        <GoogleLogin
          clientId={this.props.clientID}
          onSuccess={this.props.signUpUser}
          onFailure={this.props.signUpUser}
          cookiePolicy={'single_host_origin'}
          scope={this.props.scope}
          render={(renderProps) => (
            <Link
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              color='textSecondary'
              style={basicBehavior}
            >
              SignUp
            </Link>
          )}
        />
      </div>
    );
  }
}

export default Login;
