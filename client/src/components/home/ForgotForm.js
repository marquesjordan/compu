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

class ForgotForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forgotEmail: '',
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
      email: this.state.forgotEmail.toLowerCase()
    };

    this.props.forgotPassword(userData);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { handleSubmit } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <div className="login-form-container">
          <h1>Forgot Password</h1>

          <div
            className={
              this.state.errors && this.state.errors.sent
              ? 'alert alert-success' : 'd-none'}
            role="alert"
          >
            Check Your Email To Reset Password
          </div>

          <form className="login-form" onSubmit={this.onSubmit}>
            <FormGroup
              id="forgotEmail"
              type="email"
              label="Your Email"
              icon="&#xE0BE;"
              required={true}
              onChange={this.onChange}
              errors={this.state.errors.email}
            />
            <button type="submit"
              className={
                this.state.errors && !this.state.errors.sent
                ? 'btn btn-cta btn-block btn-primary' : 'd-none'}
            >
              Submit
            </button>
            <div className={
              this.state.errors && this.state.errors.sent
              ? 'text-center"' : 'd-none'}
            >
              <img className="tick-icon"
                src={process.env.PUBLIC_URL + '/img/tick.svg'}
                alt=""
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ errors, auth }) {
  return { errors, auth };
}

ForgotForm = connect(
  mapStateToProps,
  actions
)(withRouter(ForgotForm));

export default reduxForm({
  form: 'forgotForm',
  destroyOnUnmount: true
})(ForgotForm);
