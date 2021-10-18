/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, ErrorMessage } from 'formik';
// import './fields.scss';

function Input(props) {
  // console.log('Props', props);
  const { name, className, label, ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <Field name={name} className={className} {...rest} />
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

function RadioButtons(props) {
  const { label, className, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {(formik) => {
          const { field } = formik;
          // console.log('Field', field);
          return options.map((option) => (
            <div key={option.key} className="form-group ">
              <label htmlFor={option.value}>
                <input
                  type="radio"
                  {...field}
                  {...rest}
                  id={option.value}
                  value={option.value}
                  checked={field.value === option.value}
                />
                {option.key}
              </label>
            </div>
          ));
        }}
      </Field>
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

function Select(props) {
  const { label, className, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest} className={className}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </Field>
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

function Checkboxes(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {(formik) => {
          const { field } = formik;
          return options.map((option) => (
            <div key={option.key}>
              <label htmlFor={option.value}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                {option.key}
              </label>
            </div>
          ));
        }}
      </Field>
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

export { Input, RadioButtons, Select, Checkboxes };
