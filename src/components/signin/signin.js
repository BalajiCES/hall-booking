import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signin from './data/signin-actions';
import { Input } from '../common/Fields/fields';
import './signin.scss';

function Signin() {
  const [initialValues, setinitialValues] = useState({
    email: '',
    password: ''
  });
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

  const handleSubmit = (values) => {
    console.log('values', values);
    dispatch({
      type: signin.SIGNIN_REQUEST,
      payload: values,
      history
    });
  };
  return (
    <div className="signin-container">
      <div>
        <h1>Sign In</h1>
        <p>
          To keep connected with us please login with your personal information
          by email and password
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Input
                label="Email"
                className="form-control"
                name="email"
                type="email"
                id="email"
                placeholder="Enter Email"
              />

              <Input
                label="Password"
                className="form-control"
                name="password"
                type="password"
                id="password"
                placeholder="Enter Password"
              />

              <button type="submit" className="primary">
                Submit
              </button>
              <button type="button" className="secondary">
                <Link to="/signup" className="link">
                  Create Account
                </Link>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signin;
