import React from 'react';

const TextAreaField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label className="form-control-label">
        {label}
        <span style={{ color: 'red' }}>*</span>
      </label>
      <textarea {...input} style={{ marginBottom: '5px', height: '50px' }} className="form-control" />
      <div className="text-danger" style={{ marginBottom: '5px', fontSize: '12px' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default TextAreaField;
