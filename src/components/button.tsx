import React from 'react';
import './button.scss';

type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'type'> & {
  type?: 'button' | 'submit' | 'reset' | undefined;
  kind?: 'primary' | 'secondary';
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  type = 'button',
  children,
  kind = 'primary',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`btn btn--${kind}`}
    {...props}
  >
    {children}
  </button>
);
