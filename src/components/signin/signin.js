import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signin from './data/signin-actions';
import './signin.scss';

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const signinReducer = useSelector((state) => state.signinReducer);

  const { loading = false } = signinReducer;

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email is Not Valid')
      .required('Email is Required'),
    password: yup.string().required('Password is Required')
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema,
      onSubmit: (value) => {
        console.log('values', value);
        dispatch({
          type: signin.SIGNIN_REQUEST,
          payload: values,
          history
        });
      }
    });

  return (
    <div className="signin-container">
      <div>
        <h1>Sign Up</h1>
        <p>
          To keep connected with us please login with your personal information
          by name and mobile number
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              Email
              <input
                type="email"
                placeholder="Enter Email"
                id="email"
                className="form-contorl"
                name="email"
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
            <label htmlFor="password">
              Password
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                className="form-contorl"
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
              />
            </label>
            {touched.password && errors.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>

          <div>
            <button type="submit">Submit</button>
            <button type="button" className="secondary">
              <Link to="/signup" className="link">
                Create Account
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
