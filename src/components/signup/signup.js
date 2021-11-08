import React from 'react';
import image from '../../assets/login.svg';
import Profile from '../common/profile/profile';
import './signup.scss';

function Signup() {
  return (
    <>
      <div className="login-container">
        <div
          className="image-background"
          style={{ backgroundImage: `url(${image})` }}
        >
          {' '}
        </div>
        <Profile />
      </div>
    </>
  );
}

export default Signup;
