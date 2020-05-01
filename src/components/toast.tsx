import React, {
  useState,
  forwardRef,
  FunctionComponent,
  useImperativeHandle
} from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as SadFace } from '../icons/sad.svg';
import { ReactComponent as HappyFace } from '../icons/happy.svg';
import { ReactComponent as Info } from '../icons/info.svg';
import './toast.scss';

export type ToastProps = Omit<React.HTMLProps<HTMLDivElement>, 'ref'> & {
  opStatus?: 'success' | 'danger' | 'info';
  title?: string;
  message?: string;
  onClose?: () => void;
  ref?: any
}

export type ToastElement = React.HTMLProps<HTMLDivElement> & {
  show: () => void;
  hide: () => void;
}

function getIconByOpStatus(opStatus: 'success' | 'danger' | 'info' = 'info') {
  if (opStatus === 'success') {
    return <HappyFace width={50} height={50} />;
  }
  if (opStatus === 'danger') {
    return <SadFace width={50} height={50} />;
  }
  if (opStatus === 'info') {
    return <Info width={50} height={50} />;
  }
}

export const Toast: FunctionComponent<ToastProps> = forwardRef<ToastElement, ToastProps>((props: ToastProps, ref) => {
  const { opStatus = 'info', title, message, onClose } =  props;
  const [show, shouldShow] = useState(false);

  const hide = () => {
    shouldShow(false);
    onClose && onClose(); 
  };

  useImperativeHandle(ref, () => ({
    show() {
      shouldShow(true);
    },
    hide() {
      shouldShow(false);
    }
  }));

  return (
    <AnimatePresence initial={false}>
      { show ? (
        <motion.div
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            // ref={ref as RefObject<HTMLDivElement>}
            className={cn('toast', `toast--${opStatus}`)}
          >
            <span
              role="button"
              className="toast__closeBtn"
              onClick={hide}
            >&times;</span>
            <figure className="toast__icon">
              {getIconByOpStatus(opStatus)}
            </figure>
            <article className="toast__content">
              <h4 className="toast__content__title">{title}</h4>
              <p className="toast__content__message">{message}</p>
            </article>
          </motion.div>
      ) : null }
    </AnimatePresence>
  )
});
