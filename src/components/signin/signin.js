import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Input } from '../common/Fields/fields';
import signin from './data/signin-actions';
import errors from '../../const/error';
import routes from '../../routes';
import './signin.scss';

// destructuring
const { SIGNUP } = routes;
const { SIGNIN_REQUEST } = signin;
const { email, validEmail, password } = errors;

function Signin() {
  const [initialValues] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();

  // validation schema
  const validationSchema = yup.object().shape({
    email: yup.string().email(email).required(validEmail),
    password: yup.string().required(password)
  });

  // onsubmit
  const handleSubmit = (values) => {
    dispatch({
      type: SIGNIN_REQUEST,
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
                <Link to={SIGNUP} className="link">
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
