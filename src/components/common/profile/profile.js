import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { REGISTER_HALL } from '../../../routes';
import profile from './data/profile-actions';
import './profile.scss';

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: profileData = {},
    error = false,
    loading = false
  } = useSelector((state) => state.profileReducer.profileData);
  const { data = {} } = profileData;
  console.log('Data', data);

  useEffect(() => {
    dispatch({
      type: profile.PROFILE_REQUEST,
      payload: id
    });
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <Link to={REGISTER_HALL} className="link">
            <li>Register Hall</li>
          </Link>
          <Link to={`/profile/${id}`} className="link">
            <li>Profile</li>
          </Link>
          <li href="/">Booking Request</li>
          <li href="/">Booking History</li>
        </ul>
      </nav>
      {!loading && (
        <div className="profile-container">
          <h1>Profile Page</h1>
          {/* <div className="profile">{data.user.firstName}</div> */}
        </div>
      )}
    </div>
  );
}

export default Profile;
