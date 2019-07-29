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
              <img src="data:image/png;base64,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" />
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
