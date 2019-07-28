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
    this.state = {
      credits:
        this.props.customer && this.props.customer.customer
          ? this.props.customer.customer.count
          : 0
    };

    this.addCredit = this.addCredit.bind(this);
    this.listPromos = this.listPromos.bind(this);
    this.promoClicked = this.promoClicked.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { customer } = this.props.customer;
    if (this.state.credits === undefined && customer) {
      this.setState({
        credits: customer.count
      });
    }
  }

  promoClicked(data) {
    debugger;

    const obj = {
      promoId: data.target.id,
      customer: this.props.customer.customer
    };

    this.props.subtractCredit(obj);
  }

  addCredit(phoneNumber) {
    this.setState({
      credits: this.state.credits + 1
    });
    this.props.addCredit(phoneNumber);
  }

  listPromos() {
    return [].concat(this.props.promo).map(d => (
      <div
        className="profile-promo"
        id={d._id}
        key={d._id}
        onClick={e => this.promoClicked(e)}
      >
        credits: {d.redemption} - {d.description}
      </div>
    ));
  }

  render() {
    const { customer, profile } = this.props.customer;
    return (
      <div className="" style={{ paddingBottom: '60px' }}>
        <div className="profile-wrapper">
          <div className="profile-body">
            <div className="profile-body-left">
              <h3>
                <u>Client Info</u>
              </h3>
              <div>
                <span className="profile-category">Name:</span>{' '}
                {customer ? customer.name : ''}
              </div>
              <div>
                <span className="profile-category">Phone:</span>{' '}
                {customer ? customer.phone : ''}
              </div>
              <div>
                <span className="profile-category">Email:</span>{' '}
                {customer ? customer.email : ''}
              </div>
            </div>
            <div className="profile-body-right">
              <img src="https://via.placeholder.com/150" />
            </div>
          </div>
          <div className="profile-footer">
            <div className="row">
              <div className="col-md-4">
                <h1>{this.state.credits}</h1>
                <button
                  onClick={() => {
                    this.addCredit(customer.phone);
                  }}
                  className="btn btn-success"
                >
                  Add Credit
                </button>
              </div>
              <div
                className="col-md-8 profile-promo-cont"
                style={{ padding: '10px 0', cursor: 'pointer' }}
              >
                {this.listPromos()}
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
)(withRouter(Profile));
