import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';

import Nav from './Nav';
import Dashboard from './Dashboard';
import Register from './users/register';
import Login from './users/login';
import Forgot from './users/forgot';
import Reset from './users/reset';
import LoginForm from './home/LoginForm';
import SignUpForm from './home/SignUpForm';
import PrivateRoute from './common/PrivateRoute';

class App extends Component {
  componentDidMount() {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      this.props.setCurrentUser(decoded);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        this.props.logoutUser();
        // Redirect to login
        window.location.href = './login';
      }
    }
  }

  render() {
    return (
      <div style={{ background: '#ffffff', height: '100%' }}>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        <BrowserRouter>
          <div style={{ background: '#ffffff', height: '100%' }}>
            <Nav />
            <div className="container">
              <Route exact path="/" component={LoginForm} />
              <Route exact path="/register" component={SignUpForm} />
              <Route exact path="/resetpassword" component={Forgot} />
              <Route exact path="/resetpassword/:token" component={Reset} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
