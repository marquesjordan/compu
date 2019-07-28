import React, { Component, Fragment } from 'react'
import  {connect} from 'react-redux'

// Actions
import * as actions from '../../actions';

// Components
import FormGroup from '../common/FormGroup';

const classes = {
    saveButton : {

    }
}

export class customer extends Component {
    state = {
        max: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.getBusinessSettings();
    }

    onChange = (e) => {
        this.setState({
            max: e.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <form className="login-form" onSubmit={this.onSubmit}>
                    <h1>Settings: </h1>
                    <FormGroup type="text" label="Max # of Referrals" onChange={this.onChange} />
                    <button className="btn btn-primary" type="submit">Save</button>
                </form>
            </Fragment>
          );
    }
}


const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, actions)(customer);



