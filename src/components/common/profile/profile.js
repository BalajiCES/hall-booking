import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import profile from './data/profile-actions';
import signup from '../../signup/data/signup-actions';
import './profile.scss';

function Profile() {
  const { formInitialValues = {} } = useSelector(
    (state) => state.profileReducer.profileData
  );
  const dispatch = useDispatch();
  const history = useHistory();

  // Profile View
  const { id } = useParams();
  if (id) {
    useEffect(() => {
      dispatch({
        type: profile.PROFILE_REQUEST,
        payload: id
      });
    }, []);
  }

  const validationSchema = yup.object().shape({
    // remove => model
    firstName: yup.string().required('First Name is Required'),
    lastName: yup.string(),
    email: yup
      .string()
      .email('Email is Not Valid')
      .required('Email is Required'),
    gender: yup.string().required('Please Choose your Gender'),
    dob: yup.string().required('Please Choose your DOB'),
    age: yup.number(),
    role: yup.string().required('Please Choose Your Role'),
    password: yup.string().required('Password is Required'),
    passwordConfirm: !id
      ? yup.string().required('Confirm Password is Required')
      : yup.string()
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched
  } = useFormik({
    // create model
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (value) => {
      console.log('values', value);
      if (id) {
        dispatch({
          type: profile.PROFILE_UPDATE_REQUEST,
          payload: value,
          id
        });
      } else {
        dispatch({
          type: signup.SIGNUP_REQUEST,
          payload: value,
          history
        });
      }
    }
  });

  console.log('Values', values, errors);

  const handleChangeDate = (event) => {
    const { value } = event.target;
    setFieldValue('dob', value);
    setFieldTouched('dob', true);
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    setFieldValue('age', age);
    setFieldTouched('age', true);
  };

  return (
    <div className="form-container">
      {id ? <h1> Profile </h1> : <h1>GET STARTED</h1>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">
            First name
            <input
              className="form-contorl"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              onChange={handleChange}
              value={values.firstName}
              onBlur={handleBlur}
            />
          </label>
          {touched.firstName && errors.firstName && (
            <p className="error">{errors.firstName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">
            Last name
            <input
              className="form-contorl"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              onChange={handleChange}
              value={values.lastName}
              onBlur={handleBlur}
            />
          </label>
          {touched.lastName && errors.lastName && (
            <p className="error">{errors.lastName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email
            <input
              className="form-contorl"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              disabled={id}
            />
          </label>
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <p>Choose Gender</p>
          <label htmlFor="male" className="radio-control">
            Male
            <input
              type="radio"
              id="male"
              name="gender"
              onChange={handleChange}
              value="male"
              checked={values.gender === 'male'}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="female" className="radio-control">
            Female
            <input
              type="radio"
              id="female"
              name="gender"
              onChange={handleChange}
              value="female"
              checked={values.gender === 'female'}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="others" className="radio-control">
            Others
            <input
              type="radio"
              id="others"
              name="gender"
              onChange={handleChange}
              value="others"
              checked={values.gender === 'others'}
              onBlur={handleBlur}
            />
          </label>
          {touched.gender && errors.gender && (
            <p className="error">{errors.gender}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dob">
            Date Of Birth
            <input
              type="date"
              name="dob"
              id="dob"
              className="form-contorl"
              onChange={handleChangeDate}
              value={values.dob}
              onBlur={handleBlur}
            />
          </label>
          {touched.dob && errors.dob && <p className="error">{errors.dob}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="age">
            Age
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Your age"
              className="form-contorl"
              onChange={handleChange}
              value={values.age}
              onBlur={handleBlur}
            />
          </label>
          {touched.age && errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="role">
            Role
            <select
              name="role"
              id="role"
              className="select-control"
              onChange={handleChange}
              value={values.role}
              onBlur={handleBlur}
              disabled={id}
            >
              <option>Choose Type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          {touched.role && errors.role && (
            <p className="error">{errors.role}</p>
          )}
        </div>
        {!id && (
          <>
            <div className="form-group">
              <label htmlFor="password">
                Password
                <input
                  className="form-contorl"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                />
              </label>
              {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">
                Confirm Password
                <input
                  className="form-contorl"
                  type="password"
                  name="passwordConfirm"
                  id="confirm-password"
                  placeholder="Enter Confirm Password"
                  onChange={handleChange}
                  value={values.passwordConfirm}
                  onBlur={handleBlur}
                />
              </label>
              {touched.passwordConfirm && errors.passwordConfirm && (
                <p className="error">{errors.passwordConfirm}</p>
              )}
            </div>
          </>
        )}
        <button type="submit">{id ? 'Update' : 'Register'}</button>
      </form>
    </div>
  );
}

export default Profile;
