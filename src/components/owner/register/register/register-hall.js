import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import './register-hall.scss';
import register from '../data/register-actions';
import { AuthID } from '../../../../util/helper-functions';
import { Input, Checkboxes } from '../../../common/Fields/fields';

function RegisterHall() {
  const [initialValues, setinitialValues] = useState({
    hallName: '',
    price: '',
    capacity: '',
    phoneNumber: '',
    type: '',
    onwedBy: AuthID()
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    hallName: yup.string().required('Hall Name is Required'),
    price: yup.number().required('Price is Required'),
    capacity: yup.number().required('Capacity is Required'),
    phoneNumber: yup.number().required('Phone Number is Required'),
    type: yup
      .array()
      .min(1, 'You can not leave this blank')
      .required('Please choose your Hall Type')
      .nullable()
  });

  const handleSubmit = (values) => {
    console.log('values', values);
    dispatch({
      type: register.REGISTER_REQUEST,
      payload: values,
      history
    });
  };

  const hallTypeChoices = [
    { key: 'Ac', value: 'ac' },
    { key: 'Non/Ac', value: 'non-ac' }
  ];

  return (
    <div>
      <div className="register-container">
        <div className="form-container">
          <h1>Register Hall</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
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

                <Checkboxes
                  label="Choose Hall Type"
                  className="radio-control"
                  name="type"
                  options={hallTypeChoices}
                />

                <button type="submit">Register</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RegisterHall;
