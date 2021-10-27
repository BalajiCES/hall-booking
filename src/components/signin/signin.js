import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import signin from './data/signin-actions';
import { Input } from '../common/Fields/fields';
import errors from '../../const/error';
import routes from '../../routes';
import './signin.scss';

function Signin() {
  const [initialValues] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    email: yup.string().email(errors.email).required(errors.validEmail),
    password: yup.string().required(errors.password)
  });

  const handleSubmit = (values) => {
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
                <Link to={routes.SIGNUP} className="link">
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
