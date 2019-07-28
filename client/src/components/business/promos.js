import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import FormGroup from '../common/FormGroup';

export class Promos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promoName: '',
      redemption: 0,
      description: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPromos();
  }

  onSubmit = e => {
    e.preventDefault();

    const promoObj = {
      name: this.state.promoName,
      redemption: this.state.redemption,
      description: this.state.description
    };
    this.props.createPromo(promoObj);
  };

  onChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div style={{ padding: '40px 0' }}>
        <div className="login-form-container">
          <h4>Promo</h4>
          <form className="login-form" onSubmit={this.onSubmit}>
            <FormGroup
              id="promoName"
              type="text"
              label="Promo Name"
              icon="&#xE0BE;"
              value={this.state.promoName}
              onChange={this.onChange}
            />
            <FormGroup
              id="redemption"
              type="number"
              label="Number of Credits to Redeem"
              icon="&#xE0BE;"
              value={this.state.redemption}
              onChange={this.onChange}
            />
            <FormGroup
              id="description"
              type="text"
              label="Promo Description"
              icon="&#xE0BE;"
              value={this.state.description}
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

function mapStateToProps({ auth, customer, promo }) {
  return { auth, customer, promo };
}

export default connect(
  mapStateToProps,
  actions
)(Promos);
