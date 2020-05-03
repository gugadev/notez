import React from 'react';
import { motion } from 'framer-motion';
import { EditNoteForm } from './components/edit-note-form';
import { pageVariants, pageTransition } from '../../lib/animations';
import './edit-note.scss';


export const EditNoteContainer = () => (
  <motion.div
    style={{ position: 'absolute' }}
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    <article className="app__editNoteContainer">
      <header className="app__editNoteContainer__title">
        <h2>Edit Note</h2>
      </header>
      <EditNoteForm />
    </article>
  </motion.div>
);
