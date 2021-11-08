import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import profile from './data/profile-actions';
import signup from '../../signup/data/signup-actions';
import { Input, RadioButtons, Select } from '../Fields/fields';
import './profile.scss';
import CustomLoader from '../../../util/common';
import { AuthHeader, getConfirm } from '../../../util/helper-functions';
import errors from '../../../const/error';
import constant from '../../../const/const';
import routes from '../../../routes';

// Destructuring
const {
  firstName,
  email,
  validEmail,
  gender,
  dob,
  role,
  password,
  confirmPassword,
  update
} = errors;
const { DOB, AGE } = constant;
const { PROFILE_REQUEST, PROFILE_DATA_RESET, PROFILE_UPDATE_REQUEST } = profile;
const { SIGNUP_REQUEST } = signup;

// Profile Compoenent
function Profile() {
  const { formInitialValues = {}, loading = false } = useSelector(
    (state) => state.profileReducer.profileData
  );
  const dispatch = useDispatch();
  const history = useHistory();

  // Profile View
  const { id } = useParams();

  // validation schema
  const validationSchema = yup.object().shape({
    firstName: yup.string().required(firstName),
    lastName: yup.string(),
    email: yup.string().email(email).required(validEmail),
    gender: yup.string().required(gender),
    dob: yup.string().required(dob),
    age: yup.number(),
    role: yup.string().required(role),
    password: yup.string().required(password),
    passwordConfirm: !id ? yup.string().required(confirmPassword) : yup.string()
  });

  // onsubmit
  const handleSubmit = (values) => {
    if (id) {
      Swal.fire(getConfirm(constant.SUCCESS, update)).then((result) => {
        if (result.value) {
          dispatch({
            type: PROFILE_UPDATE_REQUEST,
            payload: values,
            id,
            history,
            auth: AuthHeader()
          });
        }
      });
    } else {
      dispatch({
        type: SIGNUP_REQUEST,
        payload: values,
        history
      });
    }
  };

  // Profile details
  const genderChoices = [
    { key: 'Male', value: 'male' },
    { key: 'Female', value: 'female' }
  ];

  const roleChoices = [
    { key: 'Choose Type', value: '' },
    { key: 'Owner', value: 'Owner' },
    { key: 'User', value: 'User' }
  ];

  // Age calculation
  const handleChangeDate = (event, setFieldValue, setFieldTouched) => {
    const { value } = event.target;
    setFieldValue(DOB, value);
    setFieldTouched(DOB, true);
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    setFieldValue(AGE, age);
    setFieldTouched(AGE, true);
  };

  useEffect(() => {
    if (id) {
      dispatch({
        type: PROFILE_REQUEST,
        payload: id
      });
    } else {
      dispatch({
        type: PROFILE_DATA_RESET
      });
    }
  }, [id]);

  return (
    <div className={`${id ? 'profile-container' : 'form-container'}`}>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      <div className="form-container">
        {id ? <h2> Profile </h2> : <h1>GET STARTED</h1>}
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
                <div className="input-wrapper">
                  <Input
                    label="First Name"
                    className="form-control"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                  />
                </div>

                <div className="input-wrapper">
                  <Input
                    label="Last Name"
                    className="form-control"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    label="Email"
                    className="form-control"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    disabled={id}
                  />
                </div>
                <div className="input-wrapper">
                  <RadioButtons
                    label="Choose Gender"
                    className="form-control"
                    name="gender"
                    options={genderChoices}
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    label="Choose Date Of Birth"
                    className="form-control"
                    name="dob"
                    type="date"
                    id="dob"
                    onChange={(event) => {
                      handleChangeDate(event, setFieldValue, setFieldTouched);
                    }}
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    label="Age"
                    className="form-control"
                    name="age"
                    type="number"
                    id="age"
                    placeholder="Enter Age"
                  />
                </div>
                <div className="input-wrapper">
                  <Select
                    label="Role"
                    className="select-control"
                    name="role"
                    id="role"
                    options={roleChoices}
                    disabled={id}
                  />
                </div>

                {!id && (
                  <>
                    <div className="input-wrapper">
                      <Input
                        label="Passowrd"
                        className="form-control"
                        name="password"
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                      />
                    </div>
                    <div className="input-wrapper">
                      <Input
                        label="Confirm Passowrd"
                        className="form-control"
                        name="passwordConfirm"
                        type="password"
                        id="passwordConfirm"
                        placeholder="Enter Confirm Password"
                      />
                    </div>
                  </>
                )}

                <button className="primary" type="submit">
                  {id ? 'Update' : 'Register'}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      {!id ? (
        <p>
          Already having Account
          <Link className="profile-signin" to={routes.HOME}>
            Signin
          </Link>
        </p>
      ) : (
        ''
      )}
    </div>
  );
}

export default Profile;
