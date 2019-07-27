import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';

import './common/css/dashboard.css';
import './common/css/common.css';
import './common/css/theme.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  logout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="">
        <div className="dash-wrapper">HELLO WORLD</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Dashboard));
