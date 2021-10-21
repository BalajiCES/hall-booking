import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import './register-hall.scss';
import register from '../data/register-actions';
import { AuthID } from '../../../../util/helper-functions';
import { Input, Checkboxes, Select } from '../../../common/Fields/fields';
import constant from '../../../../const/const';

function RegisterHall() {
  const { data = {} } = useSelector(
    (state) => state.registerReducer.registerData
  );
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
    if (!id) {
      dispatch({
        type: register.REGISTER_REQUEST,
        payload: newValue,
        history
      });
    } else {
      dispatch({
        type: register.REGISTER_UPDATE_REQUEST,
        payload: newValue,
        id,
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
    }
  }, [id]);

  return (
    <div>
      <div className="register-container">
        <div className="form-container">
          <h1>Register Hall</h1>

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
                  <Input
                    label="Hall name"
                    className="form-control"
                    type="text"
                    name="hallName"
                    id="hallName"
                    placeholder="Enter First Name"
                  />

                  <Input
                    label="Price"
                    className="form-control"
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter Last Name"
                  />

                  <Input
                    label="Capacity"
                    className="form-control"
                    type="number"
                    name="capacity"
                    id="capacity"
                    placeholder="Enter Capacity"
                  />

                  <Input
                    label="Phone Number"
                    className="form-control"
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter PhoneNumber"
                  />

                  <Select
                    label="Choose Event Type"
                    name="event"
                    options={eventTypeChoices}
                    className="select-control"
                  />

                  {values.event === constant.CUSTOM && (
                    <Input
                      label="Enter Event Name"
                      className="form-control"
                      type="text"
                      name="custom"
                      id="custom"
                      placeholder="Enter here..."
                    />
                  )}

                  <Checkboxes
                    label="Choose Hall Type"
                    className="radio-control"
                    name="type"
                    options={hallTypeChoices}
                  />

                  <button type="submit">{id ? 'Update' : 'Register'}</button>
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
