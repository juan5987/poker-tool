import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import './confirmationcheck.scss';

const ConfirmationCheck = () => {

    const confirmationCode = useParams().confirmationCode;
    const dispatch = useDispatch();
    dispatch({type:"CONFIRM_REGISTRATION", confirmationCode});

    return (
        <Redirect to="/" />
    )
}


export default ConfirmationCheck;