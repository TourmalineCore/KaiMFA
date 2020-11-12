import React from "react";

import './Input.css';

export const Input = ({
  label,
  type,
  onChange = () => { },
  multiline = false,
  placeholder,
  maxLength,
  dataCy,
}) => {
  return (
    <div className="auth-field">
      <label className="auth-field__label">
        {label}
        <span className="auth-field__required">*</span>
      </label>
      {
        multiline
          ? (
            <textarea
              className="auth-field__input auth-field__input--textarea"
              type={type}
              nav-selectable="true"
              onChange={(e) => {
                const newValue = e.target.value;

                onChange(newValue);
              }}
              autoComplete="new-password"
              rows={5}
              maxLength={maxLength}
              placeholder={placeholder}
              data-cy={dataCy}
            >
            </textarea>
          )
          : (
            <input
              className="auth-field__input"
              type={type}
              nav-selectable="true"
              onChange={(e) => {
                const newValue = e.target.value;

                onChange(newValue);
              }}
              autoComplete="new-password"
              placeholder={placeholder}
              maxLength={maxLength}
              data-cy={dataCy}
            />
          )
      }

    </div>
  );
};
