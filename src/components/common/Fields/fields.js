import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

function Input(props) {
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

Input.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

function RadioButtons(props) {
  const { label, className, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {(formik) => {
          const { field } = formik;
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

RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

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

Select.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

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
                  checked={field?.value?.includes(option.value)}
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

Checkboxes.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export { Input, RadioButtons, Select, Checkboxes };
