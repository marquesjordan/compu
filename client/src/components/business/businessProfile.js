import React, { Component, Fragment } from 'react'
import  { connect } from 'react-redux'

// Redux Actions
import * as actions from '../../actions';

// Components

// Static Profile Asset
import profileImage from '../../assets/dragon.png'

// Styles
import './businessProfile.css';

export class businessProfile extends Component {
    state = {
        max: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    onChange = (e) => {
        
    }

    render() {
        return (
            <Fragment>
                <div className="card" >
                    <img src={profileImage} className="card-img-top cardImage" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </Fragment>
          );
    }
}


const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, actions)(businessProfile);



