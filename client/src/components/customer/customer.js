import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import FormGroup from '../common/FormGroup';

export class customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.checkCustomer(this.state.phoneNumber);
    this.props.toggleCustomerState();
    console.log('ONSUBMIT');
    console.log(this.state.phoneNumber);
  };

  onChange = e => {
    console.log(e.target.value);
    this.setState({ phoneNumber: e.target.value });
  };

  render() {
    return (
      <div style={{ padding: '60px 0' }}>
        <div className="login-form-container">
          <h4>Customer</h4>

          <form className="login-form" onSubmit={this.onSubmit}>
            <FormGroup
              id="forgotEmail"
              type="text"
              label="Phone Number"
              icon="&#xE0BE;"
              onChange={this.onChange}
            />
            <button type="submit">Submit</button>
            <div />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  business: state.business
});

export default connect(
  mapStateToProps,
  actions
)(customer);
