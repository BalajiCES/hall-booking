import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import signup from './data/signup-actions';
import image from '../../assets/login.svg';
import './signup.scss';

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();

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
    passwordConfirm: yup.string().required('Confirm Password is Required')
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
    initialValues: {
      // remove => model
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dob: '',
      age: '',
      role: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema,
    onSubmit: (value) => {
      console.log('values', value);
      dispatch({
        type: signup.SIGNUP_REQUEST,
        payload: value,
        history
      });
    }
  });

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
    <div className="login-container">
      <div
        className="image-background"
        style={{ backgroundImage: `url(${image})` }}
      >
        {' '}
      </div>
      <div className="form-container">
        <h1>GET STARTED</h1>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
