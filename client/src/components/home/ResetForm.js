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

class ResetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetPassword: '',
      resetPassword2: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
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

      if(nextProps.errors && nextProps.errors.error && nextProps.errors.error.sent) {
        this.props.history.push('/dashboard');
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      password: this.state.resetPassword,
      password2: this.state.resetPassword2
    };

    this.props.resetPassword(userData, this.props.match.params.token);
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
          <h1>Reset Password</h1>

          <form className="login-form" onSubmit={this.onSubmit}>
            <FormGroup
              id="resetPassword"
              type="password"
              label="Create a New Password"
              icon="&#xE897;"
              required={true}
              onChange={this.onChange}
              errors={this.state.errors.password}
            />
            <FormGroup
              id="resetPassword2"
              type="password"
              label="Repeat Password"
              icon="&#xE897;"
              required={true}
              onChange={this.onChange}
              errors={this.state.errors.password2}
            />
            <button type="submit" className="btn btn-cta btn-block btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ errors, auth }) {
  return { errors, auth };
}

ResetForm = connect(
  mapStateToProps,
  actions
)(withRouter(ResetForm));

export default reduxForm({
  form: 'resetForm',
  destroyOnUnmount: true
})(ResetForm);
