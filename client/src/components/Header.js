import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Payments from './Payments';
import * as actions from '../actions';
import './common/css/common.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isDropdownVisible: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  toggleDropdown() {
    this.setState({
      isDropdownVisible: !this.state.isDropdownVisible
    });
  }

  renderContent() {
    switch (this.props.user) {
      case null:
        return (
          <li>
            <Link className="teal-text" to={'/login'}>
              Login
            </Link>
          </li>
        );
      case false:
        return (
          <li>
            <Link className="teal-text" to={'/login'}>
              Login
            </Link>
          </li>
        );
      default:
        return [
          <li key="2">
            <a
              onClick={this.toggleDropdown}
              className="dropdown-trigger teal-text"
              href="#!"
              data-target="dropdown1"
            >
              {this.props.user.name.substr(
                0,
                this.props.user.name.indexOf(' ')
              )}
              <i className="material-icons right">arrow_drop_down</i>
            </a>
            <ul
              id="dropdown1"
              style={{ width: '120px' }}
              className={
                this.state.isDropdownVisible
                  ? 'dropdown-content header-dorpdown teal-text'
                  : 'hide'
              }
            >
              <li>
                <a onClick={this.goToProfile}>Profile</a>
              </li>
              <li className="divider" />
              <li key="2" style={{ cursor: 'pointer' }}>
                <a onClick={this.logout}>Logout</a>
              </li>
            </ul>
          </li>
        ];
    }
  }

  goToProfile() {
    this.toggleDropdown();
    this.props.history.push(`/profile`);
  }

  logout() {
    this.toggleDropdown();
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <nav className="nav-class">
          <div className="nav-wrapper">
            <div className="container">
              <div>
                <Link
                  to={this.props.auth ? '/dashboard' : '/'}
                  className="left brand-logo"
                >
                  TADDLEText
                </Link>
                <ul className="right">
                  {this.renderContent()}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth, user }) {
  return { auth, user };
}

export default connect(mapStateToProps, actions)(withRouter(Header));
