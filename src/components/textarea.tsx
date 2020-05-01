import React, { forwardRef } from 'react';
import cn from 'classnames';
import './textarea.scss';

type TextAreaProps = Omit<React.HTMLProps<HTMLTextAreaElement>, 'ref'> & {
  invalid?: boolean;
  ref?: any;
};

export const TextArea: React.ForwardRefExoticComponent<TextAreaProps> = forwardRef(({
  className = '',
  invalid, ...props
}: TextAreaProps, ref: any) => {
  const clazz = cn('textarea', invalid ? 'textarea--invalid' : undefined);
  return <textarea ref={ref} className={clazz} cols={4} rows={3} {...props} />
});
