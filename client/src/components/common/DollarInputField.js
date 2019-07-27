import React from 'react';

const DollarInputField = ({
  onChange,
  id,
  input,
  label,
  type,
  required,
  meta: { error, touched }
}) => {
  return (
    <div className="input-group mb-3">
      <label className="form-control-label">
        {label}
        <span style={{ color: 'red' }}>{required ? '*' : ''}</span>
      </label>
      <div
        className="input-group-prepend"
        style={{ font: '12px', margin: '0', height: '30px' }}
      >
        <span className="input-group-text">$</span>
      </div>
      <input
        onChange={onChange}
        id={id}
        {...input}
        type="number"
        min="5"
        style={{ font: '12px', margin: '0', height: '30px' }}
        className="form-control"
      />
      <div
        className="input-group-append"
        style={{ font: '12px', margin: '0', height: '30px' }}
      >
        <span className="input-group-text">.00</span>
      </div>
      <div
        className="text-danger"
        style={{ font: '12px', margin: '0', height: '30px' }}
      >
        {touched && error}
      </div>
    </div>
  );
};

export default DollarInputField;
