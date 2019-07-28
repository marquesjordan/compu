import axios from 'axios';

import {
    GET_BUSINESS_SETTINGS,
} from './types';


export const getBusinessSettings = ( ) => (dispatch) => {
    console.log("GET BUSINESS SETTINGS ACTION : "); 
    
    axios.get(`/api/getBusinessSettings`)
        .then(settings => {
            console.log(settings);
            dispatch({
                type: GET_BUSINESS_SETTINGS,
                data: settings
            })
        })
        .catch(err => {
            console.log("Problem getting business settings...");
        })
};
