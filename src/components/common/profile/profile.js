import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import profile from './data/profile-actions';
import signup from '../../signup/data/signup-actions';
import { Input, RadioButtons, Select } from '../Fields/fields';
import './profile.scss';
import CustomLoader from '../../../util/common';
import { getAlertToast, getConfirm } from '../../../util/helper-functions';
import errors from '../../../const/error';
import constant from '../../../const/const';

function Profile() {
  const { formInitialValues = {}, loading = false } = useSelector(
    (state) => state.profileReducer.profileData
  );
  const dispatch = useDispatch();
  const history = useHistory();

  // Profile View
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    // remove => model
    firstName: yup.string().required(errors.firstName),
    lastName: yup.string(),
    email: yup.string().email(errors.email).required(errors.validEmail),
    gender: yup.string().required(errors.gender),
    dob: yup.string().required(errors.dob),
    age: yup.number(),
    role: yup.string().required(errors.role),
    password: yup.string().required(errors.password),
    passwordConfirm: !id
      ? yup.string().required(errors.confirmPassword)
      : yup.string()
  });

  const handleSubmit = (values) => {
    if (id) {
      Swal.fire(getConfirm(constant.SUCCESS, errors.update)).then((result) => {
        if (result.value) {
          dispatch({
            type: profile.PROFILE_UPDATE_REQUEST,
            payload: values,
            id,
            history
          });
          Swal.fire(getAlertToast(constant.SUCCESS, errors.profileSucess));
        }
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
    { key: 'Owner', value: 'Owner' },
    { key: 'User', value: 'User' }
  ];

  const handleChangeDate = (event, setFieldValue, setFieldTouched) => {
    const { value } = event.target;
    setFieldValue(constant.DOB, value);
    setFieldTouched(constant.DOB, true);
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    setFieldValue(constant.AGE, age);
    setFieldTouched(constant.AGE, true);
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
    </div>
  );
}

export default Profile;
