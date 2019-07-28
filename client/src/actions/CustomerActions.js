import axios from 'axios';

import {
    CHECK_CUSTOMER,
} from './types';


export const checkCustomer = (value) => async dispatch => {
    console.log("ACTION CALLED : "); 
    console.log(value); /// 1234567

    const res = await axios.post(`/api/getCustomer`, {phone: value});


  
    // dispatch({ type: CHECK_CUSTOMER, payload: res.data });
};
