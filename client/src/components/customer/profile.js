import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions';

import FormGroup from '../common/FormGroup';
import Spinner from '../common/spinner';

import '../common/css/dashboard.css';
import '../common/css/common.css';
import '../common/css/theme.css';
import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { customer, profile } = this.props.customer;
    return (
      <div className="">
        <div className="profile-wrapper">
          <div className="profile-body">
            <div className="profile-body-left">
              <h3>
                <u>Client Info</u>
              </h3>
              <div>
                <span className="profile-category">Name:</span> {customer.name}
              </div>
              <div>
                <span className="profile-category">Phone:</span>{' '}
                {customer.phone}
              </div>
              <div>
                <span className="profile-category">Email:</span>{' '}
                {customer.email}
              </div>
            </div>
            <div className="profile-body-right">
              <img src="https://via.placeholder.com/150" />
            </div>
          </div>
          <div className="profile-footer">
            <div className="row">
              <div className="col-md-4">
                <h1>{customer.count}</h1>
                <button
                  onClick={() => {
                    this.props.addCredit(customer.phone);
                  }}
                  className="btn btn-success"
                >
                  Add Credit
                </button>
              </div>
              <div className="col-md-4">
                <h1> </h1>
              </div>
              <div className="col-md-4">
                <h1>Gold</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, customer }) {
  return { auth, customer };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Profile));
