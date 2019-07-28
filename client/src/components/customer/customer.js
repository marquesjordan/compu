import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import FormGroup from '../common/FormGroup';

export class customer extends Component {
<<<<<<< HEAD
    state = {
        phoneNumber: '',
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.props.checkCustomer(this.state.phoneNumber);
        console.log("ONSUBMIT");
        console.log(this.state.phoneNumber);
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({ phoneNumber: e.target.value });
    }

    render() {
        return (
            <div>
              <div className="login-form-container">
                <h1>Insert Number</h1>

                <form className="login-form" onSubmit={this.onSubmit}>
                  <FormGroup
                    id="forgotEmail"
                    type="text"
                    label="Phone Number"
                    icon="&#xE0BE;"
                    onChange={this.onChange} 
                    />
                  <button type="submit">Submit</button>
                  <div>
                  </div>
                </form>
              </div>
            </div>
          );
    }
=======
  state = {
    phoneNumber: ''
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.checkCustomer(this.state.phoneNumber);
    this.props.toggleCustomerState();
  };

  onChange = e => {
    console.log(e.target.value);
    this.setState({ phoneNumber: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="login-form-container">
          <h1>Insert Number</h1>

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
>>>>>>> 5ce4acda85c0b3d544cd360e92b9e1e915362e46
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  actions
)(customer);
