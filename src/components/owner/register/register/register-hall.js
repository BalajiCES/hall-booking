import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import './register-hall.scss';
import register from '../data/register-actions';
import {
  AuthID,
  getAlertToast,
  getConfirm
} from '../../../../util/helper-functions';
import { Input, Checkboxes, Select } from '../../../common/Fields/fields';
import constant from '../../../../const/const';
import CustomLoader from '../../../../util/common';

function RegisterHall() {
  const {
    loading = false,
    data = {},
    error = false
  } = useSelector((state) => state.registerReducer.registerData);
  const dispatch = useDispatch();
  const history = useHistory();

  // Register View
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    hallName: yup.string().required('Hall Name is Required'),
    price: yup.number().required('Price is Required'),
    capacity: yup.number().required('Capacity is Required'),
    phoneNumber: yup.number().required('Phone Number is Required'),
    event: yup.string().required('Event type is requiured'),
    type: yup
      .array()
      .min(1, 'You can not leave this blank')
      .required('Please choose your Hall Type')
      .nullable()
  });

  const handleSubmit = (values) => {
    console.log('values', values);
    const newValue = { ...values, ownedBy: AuthID() };
    if (id) {
      Swal.fire(
        getConfirm('warning', 'Are you sure do you want to update?')
      ).then((result) => {
        if (result.value) {
          dispatch({
            type: register.REGISTER_UPDATE_REQUEST,
            payload: newValue,
            id,
            history
          });
          Swal.fire(
            getAlertToast('success', 'Your Hall is succesfully updated')
          );
        }
      });
    } else {
      dispatch({
        type: register.REGISTER_REQUEST,
        payload: newValue,
        history
      });
    }
  };

  const hallTypeChoices = [
    { key: 'Ac', value: 'ac' },
    { key: 'Non/Ac', value: 'non-ac' }
  ];

  const eventTypeChoices = [
    { key: 'Choose', value: '' },
    { key: 'Marriage', value: 'Marriage' },
    { key: 'Birthday', value: 'Birthday' },
    { key: 'Custom', value: 'Custom' }
  ];

  useEffect(() => {
    if (id) {
      dispatch({
        type: register.REGISTER_LOADING_REQUEST,
        payload: id
      });
    } else {
      dispatch({
        type: register.REGISTER_RESET_DATA
      });
    }
  }, [id]);

  return (
    <div>
      <div className="register-container">
        {loading && (
          <center>{loading && <CustomLoader loading={loading} />}</center>
        )}
        {error && <center>{Swal.fire(getAlertToast('error', error))}</center>}
        <div className="form-container">
          <h2>Register Hall</h2>

          <Formik
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => {
              const { values } = formik;
              console.log(values);
              return (
                <Form>
                  <div className="input-wrapper">
                    <Input
                      label="Hall name"
                      className="form-control"
                      type="text"
                      name="hallName"
                      id="hallName"
                      placeholder="Enter First Name"
                      disabled={id}
                    />
                  </div>
                  <div className="input-wrapper">
                    <Input
                      label="Price"
                      className="form-control"
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Enter Last Name"
                    />
                  </div>
                  <div className="input-wrapper">
                    <Input
                      label="Capacity"
                      className="form-control"
                      type="number"
                      name="capacity"
                      id="capacity"
                      placeholder="Enter Capacity"
                    />
                  </div>
                  <div className="input-wrapper">
                    <Input
                      label="Phone Number"
                      className="form-control"
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter PhoneNumber"
                    />
                  </div>
                  <div className="input-wrapper">
                    <Select
                      label="Choose Event Type"
                      name="event"
                      options={eventTypeChoices}
                      className="select-control"
                      disabled={id}
                    />
                  </div>

                  {values.event === constant.CUSTOM && (
                    <div className="input-wrapper">
                      <Input
                        label="Enter Event Name"
                        className="form-control"
                        type="text"
                        name="custom"
                        id="custom"
                        placeholder="Enter here..."
                        disabled={id}
                      />
                    </div>
                  )}
                  <div className="input-wrapper">
                    <Checkboxes
                      label="Choose Hall Type"
                      className="radio-control"
                      name="type"
                      options={hallTypeChoices}
                      disabled={id}
                    />
                  </div>

                  <button type="submit" className="primary">
                    {id ? 'Update' : 'Register'}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RegisterHall;
