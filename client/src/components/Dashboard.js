import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import Customer from './customer/customer';
import Profile from './customer/profile';
import Spinner from './common/spinner';
import BusinessProfile from './business/businessProfile';
import Promos from './business/promos';

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
      customer: false,
      visible: false
    };

    this.currentDisplay = this.currentDisplay.bind(this);
    this.toggleCustomerState = this.toggleCustomerState.bind(this);
    this.showPromos = this.showPromos.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {}

  logout() {
    this.props.logoutUser();
  }

  toggleCustomerState() {
    console.log(this.state.visible);

    this.setState({
      visible: !this.state.visible
    });
    console.log(this.state.visible);
  }

  showPromos() {
    return [].concat(this.props.promo).map(d => (
      <div key={d._id}>
        {d.name} - {d.description}
      </div>
    ));
  }

  handleCustomer = () => {
    this.toggleCustomerState();
    this.props.clearCustomer();
  };

  currentDisplay() {
    const { customer, profile } = this.props.customer;

    if (customer !== undefined) {
      switch (this.state.visible) {
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
        <ul
          class="nav nav-tabs"
          id="myTab"
          role="tablist"
          style={{ marginTop: '20px' }}
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Promo
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Customer
            </a>
          </li>
        </ul>
        <div
          class="tab-content"
          id="myTabContent"
          style={{ border: '1px solid #dcdcdc' }}
        >
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row justify-content-md-center">
              <div className="col-md-4">
                <Promos />
              </div>
              <div className="col-md-4" style={{ borderLeft: '1px solid' }}>
                <div style={{ paddingTop: '40px' }}>
                  <h4>Promo List</h4>
                  {this.showPromos()}
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="row justify-content-md-center">
              <div className="col-md-8">
                <div
                  className={customer !== undefined ? '' : 'd-none'}
                  style={{ paddingTop: '10px', paddingBottom: '10px' }}
                >
                  <div
                    className={
                      this.state.visible ? 'col-md-8 dash-back' : 'd-none'
                    }
                    onClick={this.handleCustomer}
                  >
                    {' '}
                    {'<-'} Back{' '}
                  </div>
                </div>
                {this.currentDisplay()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, customer, promo }) {
  return { auth, customer, promo };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Dashboard));
