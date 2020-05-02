import React, { FunctionComponent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './loader.scss';

type LoaderProps = {
  show: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({ show }) => (
  <AnimatePresence>
    { show && (
      <div className="loader">
        <motion.span
          className="loader__spin"
          animate={{
            rotate: 360
          }}
          transition={{
            loop: Infinity,
            duration: 1,
            ease: "linear"
          }}
        />
      </div>
    )}
  </AnimatePresence>
);