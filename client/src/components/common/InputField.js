import React from 'react';

const InputFields = ({ onChange, id, input, label, type, required, meta: { error, touched } }) => {
  return (
    <div>
      <label className="form-control-label">
        {label}
        <span style={{ color: 'red' }}>{required ? '*' : ''}</span>
      </label>
      <input
        onChange={onChange}
        id={id}
        {...input}
        type={type}
        style={{ marginBottom: '5px' }}
        className="form-control"
      />
      <div className="text-danger" style={{ marginBottom: '5px', fontSize: '12px'  }}>
        {touched && error}
      </div>
    </div>
  );
};

export default InputFields;
