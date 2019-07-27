import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    const data = {
      description: this.props.description,
      amount: this.props.amount
    };

    const onToken = (amount, description, creditValue) => token => {
      token['description'] = description;
      token['amount'] = amount;
      token['creditValue'] = creditValue;
      this.props.handleToken(token);
    };

    return (
      <StripeCheckout
        name="TaddleText"
        description={this.props.description}
        amount={this.props.amount}
        ComponentClass="div"
        token={onToken(
          this.props.amount,
          this.props.description,
          this.props.creditValue
        )}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button
          onFocus={this.props.onFocus}
          className="btn btn-primary"
          style={{ padding: '0px 7px' }}
        >
          {this.props.stringAmount}
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
