import React from 'react';
import ForgotForm from '../home/ForgotForm';
import '../common/css/common.css';

const LogIn = () => {
  return (
    <div>
      <div
        className="row justify-content-md-center"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          background: '#f2f2f2',
          padding: '0',
          margin: '0'
        }}
      >
        <div className="col-12 col-md-5 login-page">
          <ForgotForm />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
