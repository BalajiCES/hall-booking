import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import './register-hall.scss';
import register from './data/register-actions';
import { AuthID } from '../../../util/helper-functions';

function RegisterHall() {
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

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        hallName: '',
        price: '',
        capacity: '',
        phoneNumber: '',
        type: '',
        onwedBy: AuthID()
      },
      validationSchema,
      onSubmit: (value) => {
        console.log('values', value);
        dispatch({
          type: register.REGISTER_REQUEST,
          payload: value,
          history
        });
      }
    });

  console.log('values', values);

  return (
    <div>
      <div className="register-container">
        <div className="form-container">
          <h1>Register Hall</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="hallName">
                Hall name
                <input
                  className="form-contorl"
                  type="text"
                  name="hallName"
                  id="hallName"
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  value={values.hallName}
                  onBlur={handleBlur}
                />
              </label>
              {touched.hallName && errors.hallName && (
                <p className="error">{errors.hallName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="price">
                Price
                <input
                  className="form-contorl"
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                  value={values.price}
                  onBlur={handleBlur}
                />
              </label>
              {touched.price && errors.price && (
                <p className="error">{errors.price}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="capacity">
                Capacity
                <input
                  className="form-contorl"
                  type="number"
                  name="capacity"
                  id="capacity"
                  placeholder="Enter Capacity"
                  onChange={handleChange}
                  value={values.capacity}
                  onBlur={handleBlur}
                />
              </label>
              {touched.capacity && errors.capacity && (
                <p className="error">{errors.capacity}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                Phone Number
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Your phoneNumber"
                  className="form-contorl"
                  onChange={handleChange}
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                />
              </label>
              {touched.phoneNumber && errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
            </div>

            {/* <div className="form-group">
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  className="select-control"
                  onChange={handleChange}
                  value={values.status}
                  onBlur={handleBlur}
                >
                  <option>Choose Type</option>
                  <option value="admin">Available</option>
                  <option value="user">Occupied</option>
                  <option value="user">Selected</option>
                </select>
              </label>
              {touched.status && errors.status && (
                <p className="error">{errors.status}</p>
              )}
            </div> */}

            <div className="form-group">
              <p>Choose Hall Type</p>
              <label htmlFor="ac" className="radio-control">
                AC
                <input
                  type="checkbox"
                  id="ac"
                  name="type"
                  onChange={handleChange}
                  value="ac"
                  onBlur={handleBlur}
                />
              </label>
              <label htmlFor="non-ac" className="radio-control">
                Non -A/C
                <input
                  type="checkbox"
                  id="non-ac"
                  name="type"
                  onChange={handleChange}
                  value="non-ac"
                  onBlur={handleBlur}
                />
              </label>
              {touched.type && errors.type && (
                <p className="error">{errors.type}</p>
              )}
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterHall;
