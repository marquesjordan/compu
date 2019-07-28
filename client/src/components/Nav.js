import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import './common/css/theme.css';

class Nav extends Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutUser();
  }

  renderContent() {
    if (_.isEmpty(this.props.user)) {
      return [
        <ul key="1" className="nav navbar-nav">
          <li className="nav-item">
            <a className="nav-link login-trigger" href="/">
              Log in
            </a>
          </li>
          <li key="2" className="nav-item nav-item-cta last">
            <a className="btn-signup" href="register">
              Sign Up
            </a>
          </li>
        </ul>
      ];
    } else {
      switch (this.props.user) {
        case null:
          return [
            <ul key="1" className="nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link login-trigger" href="/">
                  Log in
                </a>
              </li>
              <li key="2" className="nav-item nav-item-cta last">
                <a className="btn-signup" href="register">
                  Sign Up
                </a>
              </li>
            </ul>
          ];
        case false:
          return [
            <ul className="nav navbar-nav">
              <li key="1" className="nav-item">
                <a className="nav-link login-trigger" href="/">
                  Log in
                </a>
              </li>
              <li key="2" className="nav-item nav-item-cta last">
                <a className="btn-signup" href="/register">
                  Sign Up
                </a>
              </li>
            </ul>
          ];
        default:
          return [
            <ul key="1" className="nav navbar-nav">
              <li className="nav-item nav-item-cta last">
                <a className="btn-logout" href="#" onClick={this.logout}>
                  Logout
                </a>
              </li>
            </ul>
          ];
      }
    }
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="/docs/4.0/assets/brand/bootstrap-solid.svg"
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            Comp-U-Code
          </a>
          <nav className="main-nav navbar navbar-right navbar-expand-md">
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-collapse"
            >
              <span> </span>
              <span> </span>
              <span> </span>
            </button>
            <div id="navbar-collapse" className="navbar-collapse collapse">
              {this.renderContent()}
            </div>
          </nav>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth, user }) {
  return { auth, user };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Nav));
