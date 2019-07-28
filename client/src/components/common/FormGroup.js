import React from 'react';


const FormGroup = ({
  id,
  type,
  label,
  icon,
  placeholder,
  required,
  onChange,
  errors,
  value
}) => {
  return (
    <div className="form-group">
      <label className="sr-only" htmlFor="name">
        {label} <span>{required ? '' * '' : ''}</span>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={!errors ? 'form-control' : 'form-control is-invalid'}
        placeholder={label}
        onChange={onChange}
        value={value}
      />
      <div className={!errors ? 'd-none' : ''}>
        <small className="text-danger">{errors}</small>
      </div>
    </div>
  );
};

export default FormGroup;
