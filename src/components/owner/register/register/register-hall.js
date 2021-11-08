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
  AuthHeader,
  getAlertToast,
  getConfirm
} from '../../../../util/helper-functions';
import { Input, Select, RadioButtons } from '../../../common/Fields/fields';
import constant from '../../../../const/const';
import CustomLoader from '../../../../util/common';
import errors from '../../../../const/error';

// Destructuring
const { SUCCESS, CUSTOM } = constant;
const {
  REGISTER_UPDATE_REQUEST,
  REGISTER_REQUEST,
  REGISTER_LOADING_REQUEST,
  REGISTER_RESET_DATA
} = register;
const { hallName, price, capacity, event, type, update } = errors;

// RegisterHall component
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

  // validation Schema
  const validationSchema = yup.object().shape({
    hallName: yup.string().required(hallName),
    price: yup.number().required(price),
    capacity: yup.number().required(capacity),
    event: yup.string().required(event),
    type: yup.string().required(type)
  });

  // onSubmit
  const handleSubmit = (values) => {
    const newValue = { ...values, ownedBy: AuthID() };
    if (id) {
      Swal.fire(getConfirm(SUCCESS, update)).then((result) => {
        const { value } = result;
        if (value) {
          dispatch({
            type: REGISTER_UPDATE_REQUEST,
            payload: newValue,
            id,
            history,
            auth: AuthHeader()
          });
        }
      });
    } else {
      dispatch({
        type: REGISTER_REQUEST,
        payload: newValue,
        history,
        auth: AuthHeader()
      });
    }
  };

  const hallTypeChoices = [
    { key: 'Ac', value: 'ac' },
    { key: 'Non/Ac', value: 'nonAc' }
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
        type: REGISTER_LOADING_REQUEST,
        payload: id
      });
    } else {
      dispatch({
        type: REGISTER_RESET_DATA
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
              const { event: events } = values;
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
                    <Select
                      label="Choose Event Type"
                      name="event"
                      options={eventTypeChoices}
                      className="select-control"
                      disabled={id}
                    />
                  </div>

                  {events === CUSTOM && (
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
                    <RadioButtons
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
