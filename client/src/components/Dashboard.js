import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import Customer from './customer/customer';
import Profile from './customer/profile';
import Spinner from './common/spinner';
import BusinessProfile from './business/businessProfile';

// Material UI Stuff
// import withStyles from '@material-ui/core/styles/withStyles';

import './common/css/dashboard.css';
import './common/css/common.css';
import './common/css/theme.css';

const styles = {};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: false
    };

    this.currentDisplay = this.currentDisplay.bind(this);
    this.toggleCustomerState = this.toggleCustomerState.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  logout() {
    this.props.logoutUser();
  }

  toggleCustomerState() {
    this.setState({
      customer: !this.state.customer
    });
  }

  handleCustomer = () => {
    this.toggleCustomerState();
    this.props.clearCustomer();
  };

  currentDisplay() {
    const { customer, profile } = this.props.customer;

    if (customer !== undefined) {
      switch (this.state.customer) {
        case null:
          return <Spinner />;
        case false:
          return <Customer toggleCustomerState={this.toggleCustomerState} />;
        default:
          return <Profile />;
      }
    } else {
      return <Customer toggleCustomerState={this.toggleCustomerState} />;
    }
  }

  render() {
    const { customer, profile } = this.props.customer;

    return (
      <div>
        <BusinessProfile />
        <div
          className={
            customer !== undefined ? 'row justify-content-md-center' : 'd-none'
          }
          style={{ paddingTop: '10px', paddingBottom: '10px' }}
        >
          <div className="col-md-6 dash-back" onClick={this.handleCustomer}>
            {' '}
            {'<-'} Back{' '}
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-6">{this.currentDisplay()}</div>
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
)(withRouter(Dashboard));
