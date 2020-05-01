import React, { forwardRef } from 'react';
import cn from 'classnames';
import './input.scss';

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'ref'> & {
  invalid?: boolean;
  ref?: any
};

export const Input: React.ForwardRefExoticComponent<InputProps> = forwardRef(({
  className = '',
  invalid, ...props
}: InputProps, ref: any) => {
  const clazz = cn('input', invalid ? 'input--invalid' : undefined);
  return <input className={clazz} {...props} ref={ref} />
});
