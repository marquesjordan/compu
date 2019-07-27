import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import FormGroup from '../common/FormGroup';

import '../common/css/common.css';
import '../common/css/theme.css';
import * as actions from '../../actions';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!!this.props.auth && this.props.auth.isAuthenticated) {
      var mask = document.querySelector('div.modal-backdrop');

      if (mask) {
        mask.remove();
      }

      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors !== prevProps.errors) {
      if (
        this.props.errors.error &&
        this.props.errors.error !== prevProps.errors.error
      ) {
        this.setState({
          errors: this.props.errors.error
        });
      }
      this.props.history.push('/login');
    }
  }

  onSignUpSubmit() {
    const userData = {
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      phone: this.state.phone,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(userData, this.props.history);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { handleSubmit } = this.props;
    const { errors } = this.state;

    return (
      <div className="container" style={{ paddingTop: '50px' }}>
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="login-form-container">
              <form
                className="login-form"
                onSubmit={handleSubmit(this.onSignUpSubmit.bind(this))}
              >
                <FormGroup
                  id="name"
                  type="text"
                  label="Your Full Name"
                  icon="&#xE7FD;"
                  required={true}
                  onChange={this.onChange}
                  errors={this.state.errors.name}
                />
                <FormGroup
                  id="phone"
                  type="phone"
                  label="Mobile No. (10 Digits)"
                  icon="&#9742;"
                  required={true}
                  onChange={this.onChange}
                  errors={this.state.errors.phone}
                />
                <FormGroup
                  id="email"
                  type="email"
                  label="Your Email"
                  icon="&#xE0BE;"
                  required={true}
                  onChange={this.onChange}
                  errors={this.state.errors.email}
                />
                <FormGroup
                  id="password"
                  type="password"
                  label="Create a Password"
                  icon="&#xE897;"
                  required={true}
                  onChange={this.onChange}
                  errors={this.state.errors.password}
                />
                <FormGroup
                  id="password2"
                  type="password"
                  label="Repeat Password"
                  icon="&#xE897;"
                  required={true}
                  onChange={this.onChange}
                  errors={this.state.errors.password2}
                />
                <div className="legal-note">
                  By signing up, you agree to our{' '}
                  <a href="/terms">terms of services</a> and{' '}
                  <a href="/privacy">privacy policy</a>.
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-primary btn-cta"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ errors, auth }) {
  return { errors, auth };
}

SignUpForm = connect(
  mapStateToProps,
  actions
)(withRouter(SignUpForm));

export default reduxForm({
  form: 'signUpForm',
  destroyOnUnmount: true
})(SignUpForm);
