import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import profile from './data/profile-actions';
import signup from '../../signup/data/signup-actions';
import { Input, RadioButtons, Select } from '../Fields/fields';
import './profile.scss';

function Profile() {
  const { formInitialValues = {} } = useSelector(
    (state) => state.profileReducer.profileData
  );
  const dispatch = useDispatch();
  const history = useHistory();

  // Profile View
  const { id } = useParams();

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

  const handleSubmit = (values) => {
    console.log('values', values);
    if (id) {
      dispatch({
        type: profile.PROFILE_UPDATE_REQUEST,
        payload: values,
        id
      });
    } else {
      dispatch({
        type: signup.SIGNUP_REQUEST,
        payload: values,
        history
      });
    }
  };

  const genderChoices = [
    { key: 'Male', value: 'male' },
    { key: 'Female', value: 'female' }
  ];

  const roleChoices = [
    { key: 'Choose Type', value: '' },
    { key: 'Admin', value: 'admin' },
    { key: 'User', value: 'user' }
  ];

  const handleChangeDate = (event, setFieldValue, setFieldTouched) => {
    const { value } = event.target;
    setFieldValue('dob', value);
    setFieldTouched('dob', true);
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    setFieldValue('age', age);
    setFieldTouched('age', true);
  };

  useEffect(() => {
    if (id) {
      dispatch({
        type: profile.PROFILE_REQUEST,
        payload: id
      });
    } else {
      dispatch({
        type: profile.PROFILE_DATA_RESET
      });
    }
  }, [id]);

  return (
    <div className="form-container">
      {id ? <h1> Profile </h1> : <h1>GET STARTED</h1>}
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          const { setFieldValue, setFieldTouched } = formik;
          return (
            <Form>
              <Input
                label="First Name"
                className="form-control"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
              />
              <Input
                label="Last Name"
                className="form-control"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
              />
              <Input
                label="Email"
                className="form-control"
                name="email"
                id="email"
                type="email"
                placeholder="Enter Email"
                disabled={id}
              />

              <RadioButtons
                label="Choose Gender"
                className="form-control"
                name="gender"
                options={genderChoices}
              />

              <Input
                label="Choose Date Of Birth"
                className="form-control"
                name="dob"
                type="date"
                id="dob"
                onChange={
                  (event) =>
                    handleChangeDate(event, setFieldValue, setFieldTouched)
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              />

              <Input
                label="Age"
                className="form-control"
                name="age"
                type="number"
                id="age"
                placeholder="Enter Age"
              />

              <Select
                label="Role"
                className="select-control"
                name="role"
                id="role"
                options={roleChoices}
                disabled={id}
              />

              {!id && (
                <>
                  <Input
                    label="Passowrd"
                    className="form-control"
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                  />

                  <Input
                    label="Confirm Passowrd"
                    className="form-control"
                    name="passwordConfirm"
                    type="password"
                    id="passwordConfirm"
                    placeholder="Enter Confirm Password"
                  />
                </>
              )}

              <button type="submit">{id ? 'Update' : 'Register'}</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Profile;
