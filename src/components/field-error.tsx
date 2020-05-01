import React from 'react';
import './field-error.scss';

export const FieldError: React.FunctionComponent<React.HTMLProps<HTMLParagraphElement>> =
  ({ children }) => (
    <p className="fieldError">{children}</p>
  );