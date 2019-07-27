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

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: '',
      loginPassword: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.auth && nextProps.auth.isAuthenticated) {
      var mask = document.querySelector('div.modal-backdrop');
      if (mask) {
        mask.remove();
      }

      this.props.history.push('/dashboard'); // push user to dashboard when they login
    }

    if (!_.isEmpty(nextProps.errors)) {
      this.setState({
        errors: nextProps.errors.error
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.loginEmail.toLowerCase(),
      password: this.state.loginPassword
    };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

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
              <form className="login-form" onSubmit={this.onSubmit}>
                <FormGroup
                  id="loginEmail"
                  type="email"
                  label="Your Email"
                  icon="&#xE0BE;"
                  required={true}
                  onChange={this.onChange}
                  errors={errors ? errors.email : ''}
                />
                <FormGroup
                  id="loginPassword"
                  type="password"
                  label="Enter Your Password"
                  icon="&#xE897;"
                  required={true}
                  onChange={this.onChange}
                  errors={errors ? errors.password : ''}
                />
                <div className="extra">
                  <div className="forgotten-password">
                    <a href="/resetpassword">Forgotten password?</a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-cta btn-block btn-primary"
                >
                  Log in
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

LoginForm = connect(
  mapStateToProps,
  actions
)(withRouter(LoginForm));

export default reduxForm({
  form: 'loginForm',
  destroyOnUnmount: true
})(LoginForm);
